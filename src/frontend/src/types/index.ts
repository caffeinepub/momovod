// Re-export backend types for convenience
export type {
  Category,
  VideoInfo,
  VideoUpdateFields,
  ScrapeStatus,
  ApiConfig,
  PaginatedVideos,
  VodId,
  TypeId,
} from "../backend.d.ts";

// Parsed play source
export interface PlaySource {
  label: string;
  episodes: PlayEpisode[];
}

export interface PlayEpisode {
  title: string;
  url: string;
}
