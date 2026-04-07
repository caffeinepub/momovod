import Types "../types/video";
import VideoLib "../lib/video";
import Map "mo:core/Map";

// Public video query API (no auth required)
mixin (
  videos : Map.Map<Types.VodId, Types.Video>,
  categories : Map.Map<Types.TypeId, Types.Category>
) {
  public query func getCategories() : async [Types.Category] {
    VideoLib.listCategories(categories);
  };

  public query func getVideosByCategory(typeId : Types.TypeId, page : Nat, pageSize : Nat) : async Types.PaginatedVideos {
    VideoLib.getVideosByCategory(videos, typeId, page, pageSize);
  };

  public query func getVideoById(vodId : Types.VodId) : async ?Types.VideoInfo {
    VideoLib.getVideoById(videos, vodId);
  };

  public query func searchVideos(keyword : Text) : async [Types.VideoInfo] {
    VideoLib.searchVideos(videos, keyword);
  };
};
