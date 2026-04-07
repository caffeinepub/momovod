import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { TypeId, VideoUpdateFields, VodId } from "../types";

// ── Categories ──────────────────────────────────────────────────────────────
export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// ── Videos by Category ───────────────────────────────────────────────────────
export function useVideosByCategory(
  typeId: TypeId | null,
  page: number,
  pageSize = 24,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos", "category", typeId?.toString(), page, pageSize],
    queryFn: async () => {
      if (!actor || typeId === null)
        return {
          items: [],
          total: 0n,
          page: BigInt(page),
          pageSize: BigInt(pageSize),
        };
      return actor.getVideosByCategory(typeId, BigInt(page), BigInt(pageSize));
    },
    enabled: !!actor && !isFetching && typeId !== null,
    staleTime: 2 * 60 * 1000,
  });
}

// ── Video Detail ─────────────────────────────────────────────────────────────
export function useVideoById(vodId: VodId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["video", vodId?.toString()],
    queryFn: async () => {
      if (!actor || vodId === null) return null;
      return actor.getVideoById(vodId);
    },
    enabled: !!actor && !isFetching && vodId !== null,
    staleTime: 5 * 60 * 1000,
  });
}

// ── Search ───────────────────────────────────────────────────────────────────
export function useSearchVideos(keyword: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["search", keyword],
    queryFn: async () => {
      if (!actor || !keyword.trim()) return [];
      return actor.searchVideos(keyword.trim());
    },
    enabled: !!actor && !isFetching && keyword.trim().length > 0,
    staleTime: 60 * 1000,
  });
}

// ── Admin: API Config ─────────────────────────────────────────────────────────
export function useApiConfig() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["apiConfig"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getApiConfig();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Admin: Scrape Status ──────────────────────────────────────────────────────
export function useScrapeStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["scrapeStatus"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getScrapeStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && "__kind__" in data && data.__kind__ === "running")
        return 3000;
      return false;
    },
  });
}

// ── Admin: Set API Config ────────────────────────────────────────────────────
export function useSetApiConfig() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (url: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setApiConfig(url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiConfig"] });
    },
  });
}

// ── Admin: Trigger Scrape ────────────────────────────────────────────────────
export function useTriggerScrape() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.triggerScrape();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scrapeStatus"] });
    },
  });
}

// ── Admin: Update Video ──────────────────────────────────────────────────────
export function useUpdateVideo() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      vodId,
      fields,
    }: { vodId: VodId; fields: VideoUpdateFields }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateVideo(vodId, fields);
    },
    onSuccess: (_data, { vodId }) => {
      queryClient.invalidateQueries({ queryKey: ["video", vodId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

// ── Admin: Delete Video ──────────────────────────────────────────────────────
export function useDeleteVideo() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vodId: VodId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteVideo(vodId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

// ── Admin: Claim Owner ────────────────────────────────────────────────────────
export function useClaimOwner() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.claimOwner();
    },
  });
}
