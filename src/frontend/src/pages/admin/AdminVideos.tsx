import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Film, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pagination } from "../../components/Pagination";
import {
  useCategories,
  useDeleteVideo,
  useUpdateVideo,
  useVideosByCategory,
} from "../../hooks/useBackend";
import type { VideoInfo, VideoUpdateFields } from "../../types";
import AdminGate from "./AdminGate";
import { AdminLayout } from "./AdminLayout";

function EditDialog({
  video,
  open,
  onClose,
}: {
  video: VideoInfo | null;
  open: boolean;
  onClose: () => void;
}) {
  const updateVideo = useUpdateVideo();
  const [fields, setFields] = useState<VideoUpdateFields>({});

  useEffect(() => {
    if (video) {
      setFields({
        vod_name: video.vod_name,
        vod_pic: video.vod_pic,
        vod_score: video.vod_score,
        vod_year: video.vod_year,
        vod_area: video.vod_area,
        vod_director: video.vod_director,
        vod_actor: video.vod_actor,
        vod_remarks: video.vod_remarks,
        vod_content: video.vod_content,
        vod_play_from: video.vod_play_from,
        vod_play_url: video.vod_play_url,
      });
    }
  }, [video]);

  const handleSave = async () => {
    if (!video) return;
    try {
      await updateVideo.mutateAsync({ vodId: video.vod_id, fields });
      toast.success("影片信息已更新");
      onClose();
    } catch {
      toast.error("更新失败，请重试");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[80vh] overflow-y-auto"
        data-ocid="edit-video-dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display italic">
            编辑影片信息
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          {(
            [
              { key: "vod_name", label: "片名" },
              { key: "vod_pic", label: "封面 URL" },
              { key: "vod_score", label: "评分" },
              { key: "vod_year", label: "年份" },
              { key: "vod_area", label: "地区" },
              { key: "vod_director", label: "导演" },
              { key: "vod_actor", label: "主演" },
              { key: "vod_remarks", label: "备注" },
            ] as { key: keyof VideoUpdateFields; label: string }[]
          ).map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={key} className="text-xs">
                {label}
              </Label>
              <Input
                id={key}
                value={(fields[key] as string) ?? ""}
                onChange={(e) =>
                  setFields((f) => ({ ...f, [key]: e.target.value }))
                }
                className="h-8 text-sm"
                data-ocid={`edit-field-${key}`}
              />
            </div>
          ))}
          <div className="space-y-1">
            <Label htmlFor="vod_content" className="text-xs">
              简介
            </Label>
            <Textarea
              id="vod_content"
              value={fields.vod_content ?? ""}
              onChange={(e) =>
                setFields((f) => ({ ...f, vod_content: e.target.value }))
              }
              rows={3}
              className="text-sm resize-none"
              data-ocid="edit-field-vod_content"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="vod_play_from" className="text-xs">
              播放源标签
            </Label>
            <Input
              id="vod_play_from"
              value={fields.vod_play_from ?? ""}
              onChange={(e) =>
                setFields((f) => ({ ...f, vod_play_from: e.target.value }))
              }
              className="h-8 text-sm font-mono"
              data-ocid="edit-field-vod_play_from"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="vod_play_url" className="text-xs">
              播放地址
            </Label>
            <Textarea
              id="vod_play_url"
              value={fields.vod_play_url ?? ""}
              onChange={(e) =>
                setFields((f) => ({ ...f, vod_play_url: e.target.value }))
              }
              rows={4}
              className="text-sm font-mono resize-none"
              data-ocid="edit-field-vod_play_url"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateVideo.isPending}
            data-ocid="edit-save-btn"
          >
            {updateVideo.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "保存"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminVideosPage() {
  const { data: categories = [] } = useCategories();
  const deleteVideo = useDeleteVideo();

  const [page, setPage] = useState(1);
  const [selectedTypeId, setSelectedTypeId] = useState<bigint | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoInfo | null>(null);
  const [deletingVideo, setDeletingVideo] = useState<VideoInfo | null>(null);

  const subCategories = categories.filter((c) => c.type_pid !== 0n);
  const activeTypeId = selectedTypeId ?? subCategories[0]?.type_id ?? null;

  const { data, isLoading } = useVideosByCategory(activeTypeId, page, 20);
  const items = data?.items ?? [];
  const total = Number(data?.total ?? 0);
  const totalPages = Math.ceil(total / 20);

  const handleDelete = async () => {
    if (!deletingVideo) return;
    try {
      await deleteVideo.mutateAsync(deletingVideo.vod_id);
      toast.success("影片已删除");
      setDeletingVideo(null);
    } catch {
      toast.error("删除失败，请重试");
    }
  };

  return (
    <AdminGate>
      <AdminLayout activeSection="videos">
        <div className="p-6 space-y-4 max-w-5xl">
          <div className="flex items-center gap-3">
            <Film className="w-5 h-5 text-primary" />
            <h1 className="font-display text-2xl italic text-foreground">
              影片管理
            </h1>
            {total > 0 && (
              <span className="text-sm text-muted-foreground">
                共 {total} 部
              </span>
            )}
          </div>

          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap">
            {subCategories.slice(0, 15).map((cat) => (
              <Button
                key={cat.type_id.toString()}
                variant={activeTypeId === cat.type_id ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setSelectedTypeId(cat.type_id);
                  setPage(1);
                }}
                data-ocid={`video-filter-${cat.type_id}`}
              >
                {cat.type_name}
              </Button>
            ))}
          </div>

          {/* Video table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3"
              data-ocid="admin-videos-empty"
            >
              <Film className="w-10 h-10 opacity-30" />
              <p className="text-sm">该分类暂无影片，请先采集</p>
            </div>
          ) : (
            <div className="rounded-sm border border-border/60 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border/40">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-muted-foreground">
                      封面
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-muted-foreground">
                      片名
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-muted-foreground hidden md:table-cell">
                      年份
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-muted-foreground hidden sm:table-cell">
                      分类
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-muted-foreground hidden lg:table-cell">
                      评分
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-xs text-muted-foreground hidden lg:table-cell">
                      播放源
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium text-xs text-muted-foreground">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {items.map((video) => {
                    const sourceCount = video.vod_play_from
                      ? video.vod_play_from.split("$$$").filter(Boolean).length
                      : 0;
                    return (
                      <tr
                        key={video.vod_id.toString()}
                        className="hover:bg-muted/30 transition-smooth"
                        data-ocid="video-row"
                      >
                        <td className="px-4 py-2">
                          <div className="w-8 h-11 rounded-sm overflow-hidden bg-muted shrink-0">
                            {video.vod_pic && (
                              <img
                                src={video.vod_pic}
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <span className="font-medium text-foreground truncate max-w-[160px] block">
                            {video.vod_name}
                          </span>
                          {video.vod_remarks && (
                            <Badge
                              variant="secondary"
                              className="text-xs mt-0.5 h-4"
                            >
                              {video.vod_remarks}
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground hidden md:table-cell">
                          {video.vod_year}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground hidden sm:table-cell">
                          {video.type_name}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground hidden lg:table-cell">
                          {video.vod_score && video.vod_score !== "0"
                            ? video.vod_score
                            : "—"}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground hidden lg:table-cell">
                          {sourceCount > 0 ? `${sourceCount} 个` : "—"}
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-7 h-7"
                              onClick={() => setEditingVideo(video)}
                              aria-label="编辑"
                              data-ocid="video-edit-btn"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-7 h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => setDeletingVideo(video)}
                              aria-label="删除"
                              data-ocid="video-delete-btn"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        {/* Edit dialog */}
        <EditDialog
          video={editingVideo}
          open={!!editingVideo}
          onClose={() => setEditingVideo(null)}
        />

        {/* Delete confirm */}
        <AlertDialog
          open={!!deletingVideo}
          onOpenChange={(v) => !v && setDeletingVideo(null)}
        >
          <AlertDialogContent data-ocid="delete-confirm-dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除</AlertDialogTitle>
              <AlertDialogDescription>
                确定要删除《{deletingVideo?.vod_name}》吗？此操作不可撤销。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-ocid="delete-confirm-btn"
              >
                {deleteVideo.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "删除"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </AdminGate>
  );
}
