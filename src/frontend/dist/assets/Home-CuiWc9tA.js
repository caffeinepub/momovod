import { r as reactExports, j as jsxRuntimeExports, u as useNavigate } from "./index-D6eHYULl.js";
import { c as createLucideIcon, u as useCategories, a as useVideosByCategory, F as Film, B as Button } from "./useBackend-VTWkwZMk.js";
import { I as Input } from "./input-Dr5Culzi.js";
import { S as Skeleton } from "./skeleton-Cg0VjZGT.js";
import { L as Layout, C as CategoryNav, m as motion, S as Search } from "./Layout-CkfCDEaO.js";
import { P as Pagination } from "./Pagination-CSGwoJTn.js";
import { V as VideoCard } from "./VideoCard-BVvmAGUT.js";
import { P as Play } from "./play-BDJey3H4.js";
import "./settings-iVOOgb6f.js";
import "./x-Bi5epJ_3.js";
import "./chevron-left-BsJ-5O6d.js";
import "./chevron-right-B5wFOwM5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const PAGE_SIZE = 24;
function useFeaturedVideos(page) {
  const { data: categories = [] } = useCategories();
  const firstSubCat = categories.find((c) => c.type_pid !== 0n) ?? null;
  const { data: paginated, isLoading } = useVideosByCategory(
    (firstSubCat == null ? void 0 : firstSubCat.type_id) ?? null,
    page,
    PAGE_SIZE
  );
  return {
    videos: (paginated == null ? void 0 : paginated.items) ?? [],
    total: Number((paginated == null ? void 0 : paginated.total) ?? 0),
    isLoading
  };
}
function HeroSection() {
  const [query, setQuery] = reactExports.useState("");
  const navigate = useNavigate();
  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/search", search: { q: query.trim() } });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-[58vh] flex items-center justify-center overflow-hidden",
      "data-ocid": "hero-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(var(--primary)/0.15),transparent_60%)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-4 max-w-3xl mx-auto py-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-1 rounded-full text-xs text-primary mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "影视资源聚合平台" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-6xl sm:text-7xl md:text-8xl italic text-foreground mb-3 leading-none tracking-tight", children: [
                  "Momo",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Vod" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed", children: "海量影视资源，多线路播放，随时随地畅享精彩" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.form,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              onSubmit: handleSearch,
              className: "flex gap-2 max-w-lg mx-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: query,
                      onChange: (e) => setQuery(e.target.value),
                      placeholder: "搜索电影、电视剧、综艺...",
                      className: "pl-10 bg-card border-border/60 h-11 text-sm focus-visible:ring-primary",
                      "data-ocid": "hero-search-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "h-11 px-6 gradient-accent border-0 hover:opacity-90 transition-smooth",
                    "data-ocid": "hero-search-btn",
                    children: "搜索"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function VideoGrid({
  videos,
  isLoading,
  total,
  page,
  onPageChange
}) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl italic text-foreground", children: "最新上映" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/40 ml-2" }),
          total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "共 ",
            total,
            " 部"
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3", children: Array.from({ length: 12 }, (_, i) => `vcard-skel-${i}`).map(
          (k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4 rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-1/2 rounded-sm" })
          ] }, k)
        ) }) : videos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3", children: videos.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { duration: 0.3, delay: idx * 0.03 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video: v })
            },
            v.vod_id.toString()
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pagination,
            {
              page,
              totalPages,
              onPageChange
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 gap-4",
            "data-ocid": "home-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-12 h-12 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "暂无视频资源" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "请前往后台采集视频内容" })
            ]
          }
        )
      ]
    }
  ) });
}
function HomePage() {
  const [page, setPage] = reactExports.useState(1);
  const { videos, total, isLoading } = useFeaturedVideos(page);
  function handlePageChange(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-y border-border/40 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1400px] mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryNav, { variant: "horizontal" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VideoGrid,
      {
        videos,
        isLoading,
        total,
        page,
        onPageChange: handlePageChange
      }
    )
  ] });
}
export {
  HomePage as default
};
