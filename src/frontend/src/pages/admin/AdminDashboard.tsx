import { Link } from "@tanstack/react-router";
import { ArrowRight, Clapperboard, Clock, Folders, Radio } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import {
  useApiConfig,
  useCategories,
  useScrapeStatus,
} from "../../hooks/useBackend";
import AdminGate from "./AdminGate";
import { AdminLayout } from "./AdminLayout";

function formatTime(ts: bigint | undefined): string {
  if (!ts) return "从未";
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString("zh-CN");
}

function ScrapeStatusBadge({
  kind,
}: {
  kind: string | undefined;
}) {
  switch (kind) {
    case "idle":
      return (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/60" />
          空闲
        </span>
      );
    case "running":
      return (
        <span className="inline-flex items-center gap-1.5 text-sm text-primary animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary" />
          采集中
        </span>
      );
    case "completed":
      return (
        <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          已完成
        </span>
      );
    case "error":
      return (
        <span className="inline-flex items-center gap-1.5 text-sm text-destructive">
          <span className="w-2 h-2 rounded-full bg-destructive" />
          出错
        </span>
      );
    default:
      return <span className="text-sm text-muted-foreground">—</span>;
  }
}

export default function AdminDashboard() {
  const { data: categories, isLoading: loadingCats } = useCategories();
  const { data: scrapeStatus, isLoading: loadingStatus } = useScrapeStatus();
  const { data: apiConfig, isLoading: loadingConfig } = useApiConfig();

  const totalCategories = categories?.length ?? 0;
  const totalVideos =
    scrapeStatus?.__kind__ === "completed"
      ? Number(
          (
            scrapeStatus as {
              completed: { totalVideos: bigint; totalCategories: bigint };
            }
          ).completed.totalVideos,
        )
      : null;

  return (
    <AdminGate>
      <AdminLayout>
        <div className="p-6 space-y-6 max-w-4xl">
          {/* Header */}
          <div>
            <h1 className="font-display text-2xl italic text-foreground">
              控制台
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">站点数据概览</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Categories */}
            <Card className="border-border/60 bg-card">
              <CardHeader className="pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  分类总数
                </CardTitle>
                <Folders className="w-4 h-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                {loadingCats ? (
                  <Skeleton className="h-7 w-12" />
                ) : (
                  <p className="text-2xl font-semibold text-foreground">
                    {totalCategories}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Videos */}
            <Card className="border-border/60 bg-card">
              <CardHeader className="pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  视频总数
                </CardTitle>
                <Clapperboard className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                {loadingStatus ? (
                  <Skeleton className="h-7 w-16" />
                ) : (
                  <p className="text-2xl font-semibold text-foreground">
                    {totalVideos ?? "—"}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-border/60 bg-card">
              <CardHeader className="pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  采集状态
                </CardTitle>
                <Radio className="w-4 h-4 text-violet-400" />
              </CardHeader>
              <CardContent className="pt-2">
                {loadingStatus ? (
                  <Skeleton className="h-5 w-14" />
                ) : (
                  <ScrapeStatusBadge kind={scrapeStatus?.__kind__} />
                )}
              </CardContent>
            </Card>

            {/* Last time */}
            <Card className="border-border/60 bg-card">
              <CardHeader className="pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  最后采集
                </CardTitle>
                <Clock className="w-4 h-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                {loadingConfig ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  <p className="text-sm text-foreground">
                    {formatTime(apiConfig?.lastScrapeTime)}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/60 bg-card">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Radio className="w-4 h-4 text-primary" />
                  数据采集
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  配置采集接口并触发数据同步，将视频信息从上游拉取到本站。
                </p>
                <Button
                  asChild
                  size="sm"
                  className="gap-1.5"
                  data-ocid="dashboard-goto-scraper"
                >
                  <Link to="/momoazz/scraper">
                    前往采集管理
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clapperboard className="w-4 h-4 text-primary" />
                  影片管理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  浏览、编辑、删除已采集的影片信息，维护播放地址。
                </p>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  data-ocid="dashboard-goto-videos"
                >
                  <Link to="/momoazz/videos">
                    前往影片管理
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* API config */}
          <Card className="border-border/60 bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                当前采集接口
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingConfig ? (
                <Skeleton className="h-4 w-64" />
              ) : (
                <code className="text-sm font-mono text-primary">
                  {apiConfig?.apiBaseUrl || "未配置"}
                </code>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminGate>
  );
}
