import Types "../types/video";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";

module {
  // Fetch raw JSON from API: ac=list (categories + list)
  public func fetchCategoryList(apiBaseUrl : Text, transform : OutCall.Transform) : async Text {
    let url = apiBaseUrl # "?ac=list";
    await OutCall.httpGetRequest(url, [], transform);
  };

  // Fetch raw JSON from API: ac=list&t=typeId&pg=page
  public func fetchVideoList(
    apiBaseUrl : Text,
    typeId : Types.TypeId,
    page : Nat,
    transform : OutCall.Transform
  ) : async Text {
    let url = apiBaseUrl # "?ac=list&t=" # typeId.toText() # "&pg=" # page.toText();
    await OutCall.httpGetRequest(url, [], transform);
  };

  // Fetch raw JSON from API: ac=detail&ids=vodId
  public func fetchVideoDetail(
    apiBaseUrl : Text,
    vodId : Types.VodId,
    transform : OutCall.Transform
  ) : async Text {
    let url = apiBaseUrl # "?ac=detail&ids=" # vodId.toText();
    await OutCall.httpGetRequest(url, [], transform);
  };

  // --- JSON text parsing utilities ---

  // Extract Nat value for a key from JSON-like text by scanning digits after the key
  // e.g., extractInt(text, "pagecount") => ?42
  public func extractInt(text : Text, key : Text) : ?Nat {
    let searchKey = "\"" # key # "\":";
    let parts = text.split(#text searchKey);
    let iter = parts;
    switch (iter.next()) {
      case null null;
      case (?_first) {
        switch (iter.next()) {
          case null null;
          case (?rest) {
            extractLeadingNat(rest.trimStart(#char ' '));
          };
        };
      };
    };
  };

  // Extract a leading natural number from a text string
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

  // Extract string value for a key from JSON-like text
  // e.g., extractText(text, "type_name") => ?"电影"
  public func extractText(text : Text, key : Text) : ?Text {
    let searchKey = "\"" # key # "\":\"";
    let parts = text.split(#text searchKey);
    let iter = parts;
    switch (iter.next()) {
      case null null;
      case (?_first) {
        switch (iter.next()) {
          case null null;
          case (?rest) {
            var result = "";
            var prev : Char = ' ';
            var done = false;
            for (c in rest.toIter()) {
              if (not done) {
                if (c == '\"' and prev != '\\') {
                  done := true;
                } else {
                  result := result # Text.fromChar(c);
                  prev := c;
                };
              };
            };
            if (done) ?result else null;
          };
        };
      };
    };
  };

  // --- Play URL normalization ---

  // Remove escape sequences and trim whitespace
  public func normalizePlayUrl(url : Text) : Text {
    let s = url.replace(#text "\\\"", "\"");
    let s2 = s.replace(#text "\\'", "'");
    let s3 = s2.replace(#text "\\\\", "\\");
    s3.trim(#char ' ');
  };

  // From a single episode segment (e.g. "title$url"), extract and normalize the URL
  public func extractPlayUrl(segment : Text) : Text {
    let parts = segment.split(#char '$');
    var last = segment;
    for (p in parts) {
      last := p;
    };
    normalizePlayUrl(last);
  };

  // Sanitize a full play string: "ep1$url1#ep2$url2#..."
  // Preserves episode labels, cleans each URL
  public func sanitizePlayString(playStr : Text) : Text {
    let episodesIter = playStr.split(#char '#');
    let sanitized = episodesIter.map(func seg {
      let parts = seg.split(#char '$');
      var title = "";
      var url = "";
      var count = 0;
      for (p in parts) {
        if (count == 0) { title := p }
        else { url := p };
        count := count + 1;
      };
      if (count <= 1) {
        normalizePlayUrl(seg)
      } else {
        title # "$" # normalizePlayUrl(url)
      };
    });
    sanitized.join("#");
  };
};
