import Common "common";

module {
  public type VodId = Common.VodId;
  public type TypeId = Common.TypeId;
  public type Timestamp = Common.Timestamp;

  public type Category = {
    type_id : TypeId;
    type_pid : TypeId;
    type_name : Text;
  };

  public type Video = {
    vod_id : VodId;
    var vod_name : Text;
    var vod_pic : Text;
    var vod_score : Text;
    var vod_play_from : Text;
    var vod_play_url : Text;
    type_id : TypeId;
    var type_name : Text;
    var vod_remarks : Text;
    var vod_actor : Text;
    var vod_director : Text;
    var vod_area : Text;
    var vod_year : Text;
    var vod_content : Text;
  };

  // Shared (immutable) version for API boundary
  public type VideoInfo = {
    vod_id : VodId;
    vod_name : Text;
    vod_pic : Text;
    vod_score : Text;
    vod_play_from : Text;
    vod_play_url : Text;
    type_id : TypeId;
    type_name : Text;
    vod_remarks : Text;
    vod_actor : Text;
    vod_director : Text;
    vod_area : Text;
    vod_year : Text;
    vod_content : Text;
  };

  public type VideoUpdateFields = {
    vod_name : ?Text;
    vod_pic : ?Text;
    vod_score : ?Text;
    vod_play_from : ?Text;
    vod_play_url : ?Text;
    type_name : ?Text;
    vod_remarks : ?Text;
    vod_actor : ?Text;
    vod_director : ?Text;
    vod_area : ?Text;
    vod_year : ?Text;
    vod_content : ?Text;
  };

  public type ScrapeStatus = {
    #idle;
    #running;
    #error : Text;
    #completed : { totalVideos : Nat; totalCategories : Nat };
  };

  public type ApiConfig = {
    apiBaseUrl : Text;
    lastScrapeTime : ?Timestamp;
  };

  public type PaginatedVideos = {
    items : [VideoInfo];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };
};
