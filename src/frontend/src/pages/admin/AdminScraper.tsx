import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Play,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useApiConfig,
  useScrapeStatus,
  useSetApiConfig,
  useTriggerScrape,
} from "../../hooks/useBackend";
import AdminGate from "./AdminGate";
import { AdminLayout } from "./AdminLayout";

function ScrapeStatusBadge({
  status,
}: {
  status: {
    __kind__: string;
    error?: string;
    completed?: { totalVideos: bigint; totalCategories: bigint };
  } | null;
}) {
  if (!status) return <Badge variant="secondary">未知</Badge>;
  switch (status.__kind__) {
    case "idle":
      return <Badge variant="secondary">空闲</Badge>;
    case "running":
      return (
        <Badge variant="default" className="gap-1 animate-pulse">
          <Loader2 className="w-3 h-3 animate-spin" />
          采集中
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="gap-1 text-primary border-primary/40"
        >
          <CheckCircle className="w-3 h-3" />
          已完成
        </Badge>
      );
    case "error":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="w-3 h-3" />
          错误
        </Badge>
      );
    default:
      return <Badge variant="secondary">未知</Badge>;
  }
}

export default function AdminScraperPage() {
  const { data: config } = useApiConfig();
  const { data: status } = useScrapeStatus();
  const setConfig = useSetApiConfig();
  const triggerScrape = useTriggerScrape();

  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    if (config?.apiBaseUrl) setApiUrl(config.apiBaseUrl);
  }, [config]);

  const handleSaveConfig = async () => {
    if (!apiUrl.trim()) {
      toast.error("请输入采集接口地址");
      return;
    }
    try {
      await setConfig.mutateAsync(apiUrl.trim());
      toast.success("采集接口地址已保存");
    } catch {
      toast.error("保存失败，请重试");
    }
  };

  const handleStartScrape = async () => {
    if (!config?.apiBaseUrl) {
      toast.error("请先设置采集接口地址");
      return;
    }
    try {
      await triggerScrape.mutateAsync();
      toast.success("采集任务已启动");
    } catch {
      toast.error("启动采集失败，请重试");
    }
  };

  const isRunning = status?.__kind__ === "running";
  const lastTime = config?.lastScrapeTime;

  return (
    <AdminGate>
      <AdminLayout activeSection="scraper">
        <div className="p-6 space-y-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-primary" />
            <h1 className="font-display text-2xl italic text-foreground">
              采集配置
            </h1>
          </div>

          {/* API Config */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">采集接口地址</CardTitle>
              <CardDescription className="text-xs">
                支持标准苹果CMS v10
                API，例如：https://api.maoyanapi.top/api.php/provide/vod
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">接口基础地址</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-url"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="https://api.example.com/api.php/provide/vod"
                    className="flex-1 font-mono text-sm"
                    data-ocid="api-url-input"
                  />
                  <Button
                    onClick={handleSaveConfig}
                    disabled={setConfig.isPending}
                    data-ocid="save-config-btn"
                  >
                    {setConfig.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "保存"
                    )}
                  </Button>
                </div>
              </div>

              {/* API usage hint */}
              <div className="rounded-sm bg-muted/50 p-3 space-y-1 text-xs text-muted-foreground font-mono">
                <p className="text-foreground text-xs font-body font-medium mb-2">
                  接口说明
                </p>
                <p>
                  获取分类：<span className="text-primary">[接口]?ac=list</span>
                </p>
                <p>
                  分类列表：
                  <span className="text-primary">
                    [接口]?ac=list&t=[分类ID]&pg=[页码]
                  </span>
                </p>
                <p>
                  影片详情：
                  <span className="text-primary">
                    [接口]?ac=detail&ids=[影片ID]
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scrape Control */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">采集控制</CardTitle>
              <CardDescription className="text-xs">
                启动采集将从设置的接口全量拉取分类和影片数据
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm">采集状态</p>
                  <ScrapeStatusBadge status={status ?? null} />
                  {status?.__kind__ === "completed" &&
                    "completed" in (status as object) && (
                      <div className="text-xs text-muted-foreground mt-1">
                        共{" "}
                        {(
                          status as {
                            completed: {
                              totalVideos: bigint;
                              totalCategories: bigint;
                            };
                          }
                        ).completed.totalVideos.toString()}{" "}
                        部影片，
                        {(
                          status as {
                            completed: {
                              totalVideos: bigint;
                              totalCategories: bigint;
                            };
                          }
                        ).completed.totalCategories.toString()}{" "}
                        个分类
                      </div>
                    )}
                  {status?.__kind__ === "error" && (
                    <p className="text-xs text-destructive mt-1">
                      {(status as { error: string }).error}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleStartScrape}
                  disabled={
                    isRunning || triggerScrape.isPending || !config?.apiBaseUrl
                  }
                  className="gap-2"
                  data-ocid="start-scrape-btn"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      采集中...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      开始采集
                    </>
                  )}
                </Button>
              </div>

              {lastTime && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border/40 pt-3">
                  <Clock className="w-3.5 h-3.5" />
                  上次采集：
                  {new Date(Number(lastTime) / 1_000_000).toLocaleString(
                    "zh-CN",
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminGate>
  );
}
