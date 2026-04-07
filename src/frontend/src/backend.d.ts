import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface PaginatedVideos {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<VideoInfo>;
}
export interface VideoUpdateFields {
    type_name?: string;
    vod_remarks?: string;
    vod_area?: string;
    vod_name?: string;
    vod_actor?: string;
    vod_pic?: string;
    vod_year?: string;
    vod_content?: string;
    vod_score?: string;
    vod_play_url?: string;
    vod_play_from?: string;
    vod_director?: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Timestamp = bigint;
export type ScrapeStatus = {
    __kind__: "idle";
    idle: null;
} | {
    __kind__: "completed";
    completed: {
        totalVideos: bigint;
        totalCategories: bigint;
    };
} | {
    __kind__: "error";
    error: string;
} | {
    __kind__: "running";
    running: null;
};
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Category {
    type_name: string;
    type_pid: TypeId;
    type_id: TypeId;
}
export interface ApiConfig {
    apiBaseUrl: string;
    lastScrapeTime?: Timestamp;
}
export type VodId = bigint;
export interface VideoInfo {
    type_name: string;
    vod_remarks: string;
    vod_area: string;
    vod_id: VodId;
    vod_name: string;
    vod_actor: string;
    vod_pic: string;
    vod_year: string;
    vod_content: string;
    vod_score: string;
    vod_play_url: string;
    vod_play_from: string;
    vod_director: string;
    type_id: TypeId;
}
export interface http_header {
    value: string;
    name: string;
}
export type TypeId = bigint;
export interface backendInterface {
    claimOwner(): Promise<boolean>;
    deleteVideo(vodId: VodId): Promise<boolean>;
    getApiConfig(): Promise<ApiConfig>;
    getCategories(): Promise<Array<Category>>;
    getScrapeStatus(): Promise<ScrapeStatus>;
    getVideoById(vodId: VodId): Promise<VideoInfo | null>;
    getVideosByCategory(typeId: TypeId, page: bigint, pageSize: bigint): Promise<PaginatedVideos>;
    searchVideos(keyword: string): Promise<Array<VideoInfo>>;
    setApiConfig(url: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    triggerScrape(): Promise<void>;
    updateVideo(vodId: VodId, fields: VideoUpdateFields): Promise<boolean>;
}
