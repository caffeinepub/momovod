import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { VideoInfo } from "../types";

interface VideoCardProps {
  video: VideoInfo;
}

export function VideoCard({ video }: VideoCardProps) {
  const {
    vod_id,
    vod_name,
    vod_pic,
    vod_score,
    vod_year,
    vod_remarks,
    type_name,
  } = video;

  return (
    <Link
      to="/video/$vodId"
      params={{ vodId: vod_id.toString() }}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      data-ocid={`video-card-${vod_id}`}
    >
      <div className="card-hover rounded-sm overflow-hidden bg-card border border-border/40">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          {vod_pic ? (
            <img
              src={vod_pic}
              alt={vod_name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground text-xs">暂无封面</span>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
          {/* Score badge */}
          {vod_score && vod_score !== "0" && (
            <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
              <Star className="w-2.5 h-2.5 text-primary fill-primary" />
              <span className="text-xs text-primary font-medium">
                {vod_score}
              </span>
            </div>
          )}
          {/* Remarks badge */}
          {vod_remarks && (
            <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-1.5 py-0.5 rounded-sm font-medium truncate max-w-[70%]">
              {vod_remarks}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-2.5 space-y-1">
          <h3
            className="font-body text-sm font-medium text-foreground truncate leading-tight"
            title={vod_name}
          >
            {vod_name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {vod_year && <span>{vod_year}</span>}
            {vod_year && type_name && <span className="text-border">·</span>}
            {type_name && <span className="truncate">{type_name}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
