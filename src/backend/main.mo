import Types "types/video";
import VideoMixin "mixins/video-api";
import AdminMixin "mixins/admin-api";
import Map "mo:core/Map";

actor {
  // --- Stable state ---
  let videos = Map.empty<Types.VodId, Types.Video>();
  let categories = Map.empty<Types.TypeId, Types.Category>();

  let apiConfig = {
    var apiBaseUrl = "";
    var lastScrapeTime : ?Types.Timestamp = null;
  };

  let scrapeStatus = {
    var status : Types.ScrapeStatus = #idle;
  };

  let owner = {
    var principal : ?Principal = null;
  };

  // --- Mixin composition ---
  include VideoMixin(videos, categories);
  include AdminMixin(videos, categories, apiConfig, scrapeStatus, owner);
};
