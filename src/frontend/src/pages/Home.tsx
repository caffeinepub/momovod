import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Film, Play, Search, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { CategoryNav } from "../components/CategoryNav";
import { Layout } from "../components/Layout";
import { Pagination } from "../components/Pagination";
import { VideoCard } from "../components/VideoCard";
import { useCategories, useVideosByCategory } from "../hooks/useBackend";
import type { VideoInfo } from "../types";

const PAGE_SIZE = 24;

function useFeaturedVideos(page: number) {
  const { data: categories = [] } = useCategories();
  const firstSubCat = categories.find((c) => c.type_pid !== 0n) ?? null;
  const { data: paginated, isLoading } = useVideosByCategory(
    firstSubCat?.type_id ?? null,
    page,
    PAGE_SIZE,
  );
  return {
    videos: paginated?.items ?? [],
    total: Number(paginated?.total ?? 0),
    isLoading,
  };
}

function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/search", search: { q: query.trim() } });
    }
  }

  return (
    <section
      className="relative min-h-[58vh] flex items-center justify-center overflow-hidden"
      data-ocid="hero-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(var(--primary)/0.15),transparent_60%)]" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-1 rounded-full text-xs text-primary mb-6">
            <Film className="w-3 h-3" />
            <span>影视资源聚合平台</span>
          </div>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl italic text-foreground mb-3 leading-none tracking-tight">
            Momo<span className="text-primary">Vod</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            海量影视资源，多线路播放，随时随地畅享精彩
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSearch}
          className="flex gap-2 max-w-lg mx-auto"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索电影、电视剧、综艺..."
              className="pl-10 bg-card border-border/60 h-11 text-sm focus-visible:ring-primary"
              data-ocid="hero-search-input"
            />
          </div>
          <Button
            type="submit"
            className="h-11 px-6 gradient-accent border-0 hover:opacity-90 transition-smooth"
            data-ocid="hero-search-btn"
          >
            搜索
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

function VideoGrid({
  videos,
  isLoading,
  total,
  page,
  onPageChange,
}: {
  videos: VideoInfo[];
  isLoading: boolean;
  total: number;
  page: number;
  onPageChange: (p: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="font-display text-xl italic text-foreground">
            最新上映
          </h2>
          <div className="flex-1 h-px bg-border/40 ml-2" />
          {total > 0 && (
            <span className="text-xs text-muted-foreground">共 {total} 部</span>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }, (_, i) => `vcard-skel-${i}`).map(
              (k) => (
                <div key={k} className="space-y-2">
                  <Skeleton className="aspect-[2/3] rounded-sm" />
                  <Skeleton className="h-3 w-3/4 rounded-sm" />
                  <Skeleton className="h-2 w-1/2 rounded-sm" />
                </div>
              ),
            )}
          </div>
        ) : videos.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {videos.map((v, idx) => (
                <motion.div
                  key={v.vod_id.toString()}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  <VideoCard video={v} />
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            data-ocid="home-empty-state"
          >
            <Play className="w-12 h-12 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">暂无视频资源</p>
            <p className="text-xs text-muted-foreground/60">
              请前往后台采集视频内容
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { videos, total, isLoading } = useFeaturedVideos(page);

  function handlePageChange(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Layout>
      <HeroSection />

      {/* Category nav bar */}
      <section className="bg-card border-y border-border/40 py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <CategoryNav variant="horizontal" />
        </div>
      </section>

      <VideoGrid
        videos={videos}
        isLoading={isLoading}
        total={total}
        page={page}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}
