import Types "../types/video";
import VideoLib "../lib/video";
import ScraperLib "../lib/scraper";
import Map "mo:core/Map";
import List "mo:core/List";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Error "mo:core/Error";


// Admin-only API (owner principal check required)
mixin (
  videos : Map.Map<Types.VodId, Types.Video>,
  categories : Map.Map<Types.TypeId, Types.Category>,
  apiConfig : { var apiBaseUrl : Text; var lastScrapeTime : ?Types.Timestamp },
  scrapeStatus : { var status : Types.ScrapeStatus },
  owner : { var principal : ?Principal }
) {

  // --- Transform callback required by http-outcalls ---
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Check owner authorization, trap if not authorized
  func assertOwner(caller : Principal) {
    switch (owner.principal) {
      case (?p) {
        if (not Principal.equal(p, caller)) Runtime.trap("Unauthorized");
      };
      case null Runtime.trap("No owner set");
    };
  };

  // --- Owner management ---
  public shared ({ caller }) func claimOwner() : async Bool {
    switch (owner.principal) {
      case null {
        owner.principal := ?caller;
        true;
      };
      case (?existing) {
        Principal.equal(existing, caller);
      };
    };
  };

  // --- API config ---
  public shared ({ caller }) func setApiConfig(url : Text) : async () {
    assertOwner(caller);
    apiConfig.apiBaseUrl := url;
  };

  public query func getApiConfig() : async Types.ApiConfig {
    { apiBaseUrl = apiConfig.apiBaseUrl; lastScrapeTime = apiConfig.lastScrapeTime };
  };

  // --- Scrape status ---
  public query func getScrapeStatus() : async Types.ScrapeStatus {
    scrapeStatus.status;
  };

  // --- Scrape trigger ---
  public shared ({ caller }) func triggerScrape() : async () {
    assertOwner(caller);
    if (apiConfig.apiBaseUrl == "") Runtime.trap("API base URL not configured");
    scrapeStatus.status := #running;
    ignore runScrape();
  };

  func runScrape() : async () {
    let apiBase = apiConfig.apiBaseUrl;
    try {
      let categoryJson = await ScraperLib.fetchCategoryList(apiBase, transform);
      parseAndStoreCategories(categoryJson);

      let subCats = List.empty<Types.Category>();
      for ((_id, cat) in categories.entries()) {
        if (cat.type_pid != 0) subCats.add(cat);
      };

      for (cat in subCats.values()) {
        try {
          let page1Json = await ScraperLib.fetchVideoList(apiBase, cat.type_id, 1, transform);
          let pageCount = switch (ScraperLib.extractInt(page1Json, "pagecount")) {
            case (?n) n;
            case null 1;
          };
          parseAndStoreVideos(page1Json);

          var pg = 2;
          while (pg <= pageCount) {
            let pageJson = await ScraperLib.fetchVideoList(apiBase, cat.type_id, pg, transform);
            parseAndStoreVideos(pageJson);
            pg := pg + 1;
          };
        } catch (_err) {};
      };

      apiConfig.lastScrapeTime := ?(Time.now());
      scrapeStatus.status := #completed({
        totalVideos = videos.size();
        totalCategories = categories.size();
      });
    } catch (e) {
      scrapeStatus.status := #error("Scrape failed: " # e.message());
    };
  };

  // Parse JSON "class" array and upsert categories
  // Splits on "\"type_id\":" to process each object fragment
  func parseAndStoreCategories(json : Text) {
    let entries = json.split(#text "\"type_id\":");
    var first = true;
    for (entry in entries) {
      if (first) { first := false }
      else {
        let typeId = extractLeadingNat(entry.trimStart(#char ' '));
        switch (typeId) {
          case null {};
          case (?tid) {
            let typePid = switch (ScraperLib.extractInt(entry, "type_pid")) {
              case (?n) n;
              case null 0;
            };
            let typeName = switch (ScraperLib.extractText(entry, "type_name")) {
              case (?s) s;
              case null "";
            };
            VideoLib.upsertCategory(categories, {
              type_id = tid;
              type_pid = typePid;
              type_name = typeName;
            });
          };
        };
      };
    };
  };

  // Parse JSON "list" array and upsert videos
  func parseAndStoreVideos(json : Text) {
    let entries = json.split(#text "\"vod_id\":");
    var first = true;
    for (entry in entries) {
      if (first) { first := false }
      else {
        let vodId = extractLeadingNat(entry.trimStart(#char ' '));
        switch (vodId) {
          case null {};
          case (?vid) {
            let vodName = switch (ScraperLib.extractText(entry, "vod_name")) { case (?s) s; case null "" };
            let vodPic = switch (ScraperLib.extractText(entry, "vod_pic")) { case (?s) s; case null "" };
            let vodScore = switch (ScraperLib.extractText(entry, "vod_score")) { case (?s) s; case null "" };
            let rawPlayFrom = switch (ScraperLib.extractText(entry, "vod_play_from")) { case (?s) s; case null "" };
            let rawPlayUrl = switch (ScraperLib.extractText(entry, "vod_play_url")) { case (?s) s; case null "" };
            let typeId = switch (ScraperLib.extractInt(entry, "type_id")) { case (?n) n; case null 0 };
            let typeName = switch (ScraperLib.extractText(entry, "type_name")) { case (?s) s; case null "" };
            let vodRemarks = switch (ScraperLib.extractText(entry, "vod_remarks")) { case (?s) s; case null "" };
            let vodActor = switch (ScraperLib.extractText(entry, "vod_actor")) { case (?s) s; case null "" };
            let vodDirector = switch (ScraperLib.extractText(entry, "vod_director")) { case (?s) s; case null "" };
            let vodArea = switch (ScraperLib.extractText(entry, "vod_area")) { case (?s) s; case null "" };
            let vodYear = switch (ScraperLib.extractText(entry, "vod_year")) { case (?s) s; case null "" };
            let vodContent = switch (ScraperLib.extractText(entry, "vod_content")) { case (?s) s; case null "" };
            let sanitizedPlayUrl = ScraperLib.sanitizePlayString(rawPlayUrl);

            VideoLib.upsertVideo(videos, {
              vod_id = vid;
              var vod_name = vodName;
              var vod_pic = vodPic;
              var vod_score = vodScore;
              var vod_play_from = rawPlayFrom;
              var vod_play_url = sanitizedPlayUrl;
              type_id = typeId;
              var type_name = typeName;
              var vod_remarks = vodRemarks;
              var vod_actor = vodActor;
              var vod_director = vodDirector;
              var vod_area = vodArea;
              var vod_year = vodYear;
              var vod_content = vodContent;
            });
          };
        };
      };
    };
  };

  // Extract leading Nat from text
  func extractLeadingNat(text : Text) : ?Nat {
    var digits = "";
    for (c in text.toIter()) {
      if (c >= '0' and c <= '9') {
        digits := digits # Text.fromChar(c);
      } else if (digits.size() > 0) {
        return Nat.fromText(digits);
      };
    };
    Nat.fromText(digits);
  };

  // --- Video management (admin) ---
  public shared ({ caller }) func updateVideo(vodId : Types.VodId, fields : Types.VideoUpdateFields) : async Bool {
    assertOwner(caller);
    VideoLib.updateVideo(videos, vodId, fields);
  };

  public shared ({ caller }) func deleteVideo(vodId : Types.VodId) : async Bool {
    assertOwner(caller);
    VideoLib.deleteVideo(videos, vodId);
  };
};
