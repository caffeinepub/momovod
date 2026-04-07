import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import {
  Calendar,
  ChevronRight,
  Film,
  MapPin,
  Play,
  Star,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { useVideoById } from "../hooks/useBackend";
import type { PlayEpisode, PlaySource } from "../types";

// ── Play URL parsing helpers ──────────────────────────────────────────────────
function extractPlayUrl(raw: string): string {
  const normalized = raw.replace(/\\"/g, '"').replace(/\\'/g, "'").trim();
  const parts = normalized.split("$").filter(Boolean);
  return parts[parts.length - 1] ?? normalized;
}

function parsePlaySources(playFrom: string, playUrl: string): PlaySource[] {
  const labels = playFrom
    .split("$$$")
    .map((s) => s.trim())
    .filter(Boolean);
  const urlGroups = playUrl
    .split("$$$")
    .map((s) => s.trim())
    .filter(Boolean);

  return labels.map((label, idx) => {
    const group = urlGroups[idx] ?? "";
    const episodes: PlayEpisode[] = group
      .split("#")
      .filter(Boolean)
      .map((chunk) => {
        const sepIdx = chunk.indexOf("$");
        if (sepIdx === -1) return { title: "播放", url: extractPlayUrl(chunk) };
        const title = chunk.slice(0, sepIdx).trim() || "播放";
        const url = extractPlayUrl(chunk.slice(sepIdx + 1));
        return { title, url };
      });
    return { label, episodes };
  });
}

function isM3u8(url: string): boolean {
  return url.includes(".m3u8") || url.includes("m3u8");
}

// ── Embedded Player ───────────────────────────────────────────────────────────
interface PlayerProps {
  episode: PlayEpisode;
  sourceLabel: string;
}

function VideoPlayer({ episode, sourceLabel }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { url } = episode;
  const useNative = isM3u8(url);

  useEffect(() => {
    if (!useNative || !videoRef.current) return;
    const video = videoRef.current;
    // Safari / iOS native HLS
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      return;
    }
    // Other browsers: attempt direct assignment and let browser handle
    video.src = url;
  }, [url, useNative]);

  return (
    <div
      className="bg-black rounded-sm overflow-hidden"
      data-ocid="video-player"
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-card/80 border-b border-border/30">
        <Play className="w-3 h-3 text-primary" />
        <span className="text-xs text-muted-foreground">
          {sourceLabel} · {episode.title}
        </span>
      </div>
      {useNative ? (
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full aspect-video"
          data-ocid="video-element"
        >
          <source src={url} type="application/x-mpegURL" />
          <source src={url} />
          <track kind="captions" />
          您的浏览器不支持视频播放
        </video>
      ) : (
        <iframe
          src={url}
          title={episode.title}
          allowFullScreen
          className="w-full aspect-video border-0"
          data-ocid="video-iframe"
          sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
        />
      )}
    </div>
  );
}

// ── Episode Grid ──────────────────────────────────────────────────────────────
function EpisodeList({
  episodes,
  activeIdx,
  onSelect,
}: {
  episodes: PlayEpisode[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}) {
  if (episodes.length <= 1) return null;
  return (
    <ScrollArea className="h-48 rounded-sm border border-border/40">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 p-2">
        {episodes.map((ep, idx) => (
          <Button
            key={`ep-${idx}-${ep.title}`}
            variant={idx === activeIdx ? "default" : "ghost"}
            size="sm"
            onClick={() => onSelect(idx)}
            className="h-7 text-xs px-1 truncate"
            data-ocid={`episode-btn-${idx}`}
          >
            {ep.title}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function VideoDetailPage() {
  const { vodId } = useParams({ from: "/video/$vodId" });
  const { data: video, isLoading } = useVideoById(BigInt(vodId));

  const [activeSourceIdx, setActiveSourceIdx] = useState(0);
  const [activeEpisodeIdx, setActiveEpisodeIdx] = useState(0);

  const sources = useMemo<PlaySource[]>(() => {
    if (!video) return [];
    return parsePlaySources(video.vod_play_from, video.vod_play_url);
  }, [video]);

  function selectSource(idx: number) {
    setActiveSourceIdx(idx);
    setActiveEpisodeIdx(0);
  }

  if (isLoading) return <DetailSkeleton />;

  if (!video) {
    return (
      <Layout>
        <div
          className="flex flex-col items-center justify-center py-32 gap-4"
          data-ocid="video-not-found"
        >
          <Film className="w-12 h-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">视频不存在或已被删除</p>
        </div>
      </Layout>
    );
  }

  const activeSource = sources[activeSourceIdx] ?? null;
  const activeEpisode = activeSource?.episodes[activeEpisodeIdx] ?? null;

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Left sidebar: poster + meta */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="rounded-sm overflow-hidden aspect-[2/3] bg-muted relative">
              {video.vod_pic ? (
                <img
                  src={video.vod_pic}
                  alt={video.vod_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Film className="w-12 h-12 text-muted-foreground/30" />
                </div>
              )}
              {video.vod_score && video.vod_score !== "0" && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-sm">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-sm font-medium text-primary">
                    {video.vod_score}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              {(video.type_name || video.vod_remarks) && (
                <div className="flex flex-wrap items-center gap-2">
                  {video.type_name && (
                    <Badge variant="secondary" className="text-xs">
                      {video.type_name}
                    </Badge>
                  )}
                  {video.vod_remarks && (
                    <Badge
                      variant="outline"
                      className="text-xs text-primary border-primary/40"
                    >
                      {video.vod_remarks}
                    </Badge>
                  )}
                </div>
              )}
              {video.vod_year && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{video.vod_year}</span>
                </div>
              )}
              {video.vod_area && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{video.vod_area}</span>
                </div>
              )}
              {video.vod_director && (
                <div className="flex items-start gap-1.5 text-muted-foreground">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>
                    <span className="text-foreground/70">导演：</span>
                    {video.vod_director}
                  </span>
                </div>
              )}
              {video.vod_actor && (
                <div className="flex items-start gap-1.5 text-muted-foreground">
                  <User className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span className="line-clamp-4">{video.vod_actor}</span>
                </div>
              )}
            </div>
          </motion.aside>

          {/* Right: title + player + sources + episodes */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 min-w-0"
          >
            <div>
              <h1 className="font-display text-3xl italic text-foreground mb-2">
                {video.vod_name}
              </h1>
              {video.vod_content && (
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {video.vod_content.replace(/<[^>]+>/g, "")}
                </p>
              )}
            </div>

            {/* Source selector */}
            {sources.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  播放线路
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="source-selector"
                >
                  {sources.map((src, idx) => (
                    <Button
                      key={`src-${idx}-${src.label}`}
                      variant={idx === activeSourceIdx ? "default" : "outline"}
                      size="sm"
                      onClick={() => selectSource(idx)}
                      data-ocid={`source-btn-${idx}`}
                    >
                      {src.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Episode list */}
            {activeSource && activeSource.episodes.length > 1 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  选集（{activeSource.episodes.length} 集）
                </p>
                <EpisodeList
                  episodes={activeSource.episodes}
                  activeIdx={activeEpisodeIdx}
                  onSelect={setActiveEpisodeIdx}
                />
              </div>
            )}

            {/* Player */}
            {activeEpisode ? (
              <VideoPlayer
                episode={activeEpisode}
                sourceLabel={activeSource?.label ?? ""}
              />
            ) : (
              <div
                className="aspect-video bg-card border border-border/40 rounded-sm flex flex-col items-center justify-center gap-3"
                data-ocid="no-source-state"
              >
                <Play className="w-12 h-12 text-muted-foreground/30" />
                <p className="text-muted-foreground text-sm">暂无可用播放源</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

function DetailSkeleton() {
  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <div className="space-y-3">
            <Skeleton className="aspect-[2/3] rounded-sm" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-9 w-32" />
            <Skeleton className="aspect-video w-full rounded-sm" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
