import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Film, Search as SearchIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { VideoCard } from "../components/VideoCard";
import { useSearchVideos } from "../hooks/useBackend";

export default function SearchPage() {
  const { q } = useSearch({ from: "/search" });
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(q ?? "");

  useEffect(() => {
    setInputValue(q ?? "");
  }, [q]);

  const keyword = q?.trim() ?? "";
  const { data: results, isLoading, isFetching } = useSearchVideos(keyword);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      navigate({ to: "/search", search: { q: trimmed } });
    }
  }

  function clearSearch() {
    setInputValue("");
    navigate({ to: "/search", search: { q: "" } });
  }

  const showResults = keyword.length > 0;
  const isEmpty =
    showResults && !isLoading && (!results || results.length === 0);
  const hasResults = showResults && results && results.length > 0;

  return (
    <Layout>
      {/* Search header */}
      <section className="bg-card border-b border-border/40 py-8">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <h1 className="font-display text-2xl italic text-foreground mb-4 text-center">
            搜索影视
          </h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入影片名称、演员、导演..."
                className="pl-10 pr-9 bg-background border-border/60 h-11 text-sm focus-visible:ring-primary"
                autoFocus
                data-ocid="search-input"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label="清除搜索"
                  data-ocid="search-clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              className="h-11 px-6 gradient-accent border-0"
              data-ocid="search-submit"
            >
              搜索
            </Button>
          </form>
          {!keyword && (
            <p className="text-center text-xs text-muted-foreground/60 mt-3">
              支持按影片名称、演员、导演搜索
            </p>
          )}
        </div>
      </section>

      {/* Results area */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Status bar */}
        {showResults && (
          <div className="flex items-center gap-2 mb-5 text-sm text-muted-foreground">
            <SearchIcon className="w-3.5 h-3.5" />
            <span>
              {isFetching
                ? `正在搜索 "${keyword}"...`
                : hasResults
                  ? `"${keyword}" 的搜索结果（共 ${results.length} 部）`
                  : `未找到 "${keyword}" 的相关结果`}
            </span>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }, (_, i) => `search-skel-${i}`).map(
              (k) => (
                <div key={k} className="space-y-2">
                  <Skeleton className="aspect-[2/3] rounded-sm" />
                  <Skeleton className="h-3 w-3/4 rounded-sm" />
                  <Skeleton className="h-2 w-1/2 rounded-sm" />
                </div>
              ),
            )}
          </div>
        )}

        {/* Results grid */}
        <AnimatePresence mode="wait">
          {hasResults && !isLoading && (
            <motion.div
              key={keyword}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {results.map((v, idx) => (
                  <motion.div
                    key={v.vod_id.toString()}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                  >
                    <VideoCard video={v} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
            data-ocid="search-empty-state"
          >
            <Film className="w-14 h-14 text-muted-foreground/25" />
            <p className="text-foreground font-medium">未找到相关影视</p>
            <p className="text-muted-foreground text-sm text-center max-w-xs">
              请尝试换个关键词，或检查拼写是否正确
            </p>
            <Button
              variant="outline"
              onClick={clearSearch}
              className="mt-2"
              data-ocid="search-empty-clear"
            >
              清除搜索
            </Button>
          </motion.div>
        )}

        {/* Idle state */}
        {!showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
            data-ocid="search-idle-state"
          >
            <SearchIcon className="w-14 h-14 text-muted-foreground/20" />
            <p className="text-muted-foreground text-sm">输入关键词开始搜索</p>
          </motion.div>
        )}
      </section>
    </Layout>
  );
}
