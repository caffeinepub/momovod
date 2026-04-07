import Types "../types/video";
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";

module {
  public type VideoMap = Map.Map<Types.VodId, Types.Video>;
  public type CategoryMap = Map.Map<Types.TypeId, Types.Category>;

  // Convert mutable Video to shared VideoInfo
  public func toInfo(v : Types.Video) : Types.VideoInfo {
    {
      vod_id = v.vod_id;
      vod_name = v.vod_name;
      vod_pic = v.vod_pic;
      vod_score = v.vod_score;
      vod_play_from = v.vod_play_from;
      vod_play_url = v.vod_play_url;
      type_id = v.type_id;
      type_name = v.type_name;
      vod_remarks = v.vod_remarks;
      vod_actor = v.vod_actor;
      vod_director = v.vod_director;
      vod_area = v.vod_area;
      vod_year = v.vod_year;
      vod_content = v.vod_content;
    };
  };

  // List all categories
  public func listCategories(categories : CategoryMap) : [Types.Category] {
    categories.values().toArray();
  };

  // Get videos by category with pagination
  public func getVideosByCategory(
    videos : VideoMap,
    typeId : Types.TypeId,
    page : Nat,
    pageSize : Nat
  ) : Types.PaginatedVideos {
    let allMatching = List.empty<Types.VideoInfo>();
    for ((_id, v) in videos.entries()) {
      if (v.type_id == typeId) {
        allMatching.add(toInfo(v));
      };
    };

    let total = allMatching.size();
    let safePageSize = if (pageSize == 0) 20 else pageSize;
    let start = page * safePageSize;
    let end_ = if (start + safePageSize > total) total else start + safePageSize;
    let items = if (start >= total) {
      [];
    } else {
      allMatching.sliceToArray(start.toInt(), end_.toInt());
    };
    { items; total; page; pageSize = safePageSize };
  };

  // Get a single video by id
  public func getVideoById(videos : VideoMap, vodId : Types.VodId) : ?Types.VideoInfo {
    switch (videos.get(vodId)) {
      case (?v) ?toInfo(v);
      case null null;
    };
  };

  // Search videos by vod_name (case-insensitive contains)
  public func searchVideos(videos : VideoMap, keyword : Text) : [Types.VideoInfo] {
    let lowerKw = keyword.toLower();
    let results = List.empty<Types.VideoInfo>();
    for ((_id, v) in videos.entries()) {
      if (v.vod_name.toLower().contains(#text lowerKw)) {
        results.add(toInfo(v));
      };
    };
    results.toArray();
  };

  // Update video fields (partial update)
  public func updateVideo(
    videos : VideoMap,
    vodId : Types.VodId,
    fields : Types.VideoUpdateFields
  ) : Bool {
    switch (videos.get(vodId)) {
      case null false;
      case (?v) {
        switch (fields.vod_name) { case (?s) v.vod_name := s; case null {} };
        switch (fields.vod_pic) { case (?s) v.vod_pic := s; case null {} };
        switch (fields.vod_score) { case (?s) v.vod_score := s; case null {} };
        switch (fields.vod_play_from) { case (?s) v.vod_play_from := s; case null {} };
        switch (fields.vod_play_url) { case (?s) v.vod_play_url := s; case null {} };
        switch (fields.type_name) { case (?s) v.type_name := s; case null {} };
        switch (fields.vod_remarks) { case (?s) v.vod_remarks := s; case null {} };
        switch (fields.vod_actor) { case (?s) v.vod_actor := s; case null {} };
        switch (fields.vod_director) { case (?s) v.vod_director := s; case null {} };
        switch (fields.vod_area) { case (?s) v.vod_area := s; case null {} };
        switch (fields.vod_year) { case (?s) v.vod_year := s; case null {} };
        switch (fields.vod_content) { case (?s) v.vod_content := s; case null {} };
        true;
      };
    };
  };

  // Delete a video
  public func deleteVideo(videos : VideoMap, vodId : Types.VodId) : Bool {
    switch (videos.get(vodId)) {
      case null false;
      case (?_) {
        videos.remove(vodId);
        true;
      };
    };
  };

  // Upsert a video (used during scraping)
  public func upsertVideo(videos : VideoMap, video : Types.Video) {
    switch (videos.get(video.vod_id)) {
      case null {
        videos.add(video.vod_id, video);
      };
      case (?existing) {
        existing.vod_name := video.vod_name;
        existing.vod_pic := video.vod_pic;
        existing.vod_score := video.vod_score;
        existing.vod_play_from := video.vod_play_from;
        existing.vod_play_url := video.vod_play_url;
        existing.type_name := video.type_name;
        existing.vod_remarks := video.vod_remarks;
        existing.vod_actor := video.vod_actor;
        existing.vod_director := video.vod_director;
        existing.vod_area := video.vod_area;
        existing.vod_year := video.vod_year;
        existing.vod_content := video.vod_content;
      };
    };
  };

  // Upsert a category
  public func upsertCategory(categories : CategoryMap, category : Types.Category) {
    categories.add(category.type_id, category);
  };
};
