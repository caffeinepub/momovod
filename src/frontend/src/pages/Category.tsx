import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import { Film } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { CategoryNav } from "../components/CategoryNav";
import { Layout } from "../components/Layout";
import { Pagination } from "../components/Pagination";
import { VideoCard } from "../components/VideoCard";
import { useCategories, useVideosByCategory } from "../hooks/useBackend";

const PAGE_SIZE = 24;

export default function CategoryPage() {
  const { typeId } = useParams({ from: "/category/$typeId" });
  const [page, setPage] = useState(1);
  const typeIdBig = BigInt(typeId);

  const { data: categories = [] } = useCategories();
  const { data: paginated, isLoading } = useVideosByCategory(
    typeIdBig,
    page,
    PAGE_SIZE,
  );

  const category = categories.find((c) => c.type_id === typeIdBig);
  const videos = paginated?.items ?? [];
  const total = Number(paginated?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function handlePageChange(newPage: number) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Layout activeTypeId={typeId}>
      {/* Category Header */}
      <section className="bg-card border-b border-border/40 py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-5 h-5 text-primary" />
            <h1 className="font-display text-2xl italic text-foreground">
              {category ? category.type_name : "分类浏览"}
            </h1>
            {total > 0 && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                共 {total} 部
              </span>
            )}
          </div>
          <CategoryNav activeTypeId={typeId} variant="horizontal" />
        </div>
      </section>

      {/* Video Grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: PAGE_SIZE }, (_, i) => `cat-skel-${i}`).map(
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {videos.map((v, idx) => (
                <motion.div
                  key={v.vod_id.toString()}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  <VideoCard video={v} />
                </motion.div>
              ))}
            </div>
            <div className="mt-10">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </motion.div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4"
            data-ocid="category-empty-state"
          >
            <Film className="w-12 h-12 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">该分类暂无视频</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
