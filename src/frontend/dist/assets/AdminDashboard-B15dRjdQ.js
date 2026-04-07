import { j as jsxRuntimeExports, L as Link } from "./index-D6eHYULl.js";
import { c as createLucideIcon, u as useCategories, g as useScrapeStatus, h as useApiConfig, B as Button } from "./useBackend-VTWkwZMk.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as Clock } from "./card-DGb5Uk8w.js";
import { S as Skeleton } from "./skeleton-Cg0VjZGT.js";
import { A as AdminGate } from "./AdminGate-CjWlsYqI.js";
import { A as AdminLayout, R as Radio } from "./AdminLayout-DTvPOIkV.js";
import "./chevron-left-BsJ-5O6d.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z", key: "1tn4o7" }
  ],
  ["path", { d: "m6.2 5.3 3.1 3.9", key: "iuk76l" }],
  ["path", { d: "m12.4 3.4 3.1 4", key: "6hsd6n" }],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z", key: "ltgou9" }]
];
const Clapperboard = createLucideIcon("clapperboard", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z",
      key: "4u7rpt"
    }
  ],
  ["path", { d: "M2 8v11a2 2 0 0 0 2 2h14", key: "1eicx1" }]
];
const Folders = createLucideIcon("folders", __iconNode);
function formatTime(ts) {
  if (!ts) return "从未";
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleString("zh-CN");
}
function ScrapeStatusBadge({
  kind
}) {
  switch (kind) {
    case "idle":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-muted-foreground/60" }),
        "空闲"
      ] });
    case "running":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-primary animate-pulse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary" }),
        "采集中"
      ] });
    case "completed":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-emerald-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }),
        "已完成"
      ] });
    case "error":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-destructive" }),
        "出错"
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "—" });
  }
}
function AdminDashboard() {
  const { data: categories, isLoading: loadingCats } = useCategories();
  const { data: scrapeStatus, isLoading: loadingStatus } = useScrapeStatus();
  const { data: apiConfig, isLoading: loadingConfig } = useApiConfig();
  const totalCategories = (categories == null ? void 0 : categories.length) ?? 0;
  const totalVideos = (scrapeStatus == null ? void 0 : scrapeStatus.__kind__) === "completed" ? Number(
    scrapeStatus.completed.totalVideos
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGate, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl italic text-foreground", children: "控制台" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "站点数据概览" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-1 flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "分类总数" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Folders, { className: "w-4 h-4 text-blue-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingCats ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-12" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold text-foreground", children: totalCategories }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-1 flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "视频总数" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clapperboard, { className: "w-4 h-4 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold text-foreground", children: totalVideos ?? "—" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-1 flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "采集状态" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-4 h-4 text-violet-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-2", children: loadingStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScrapeStatusBadge, { kind: scrapeStatus == null ? void 0 : scrapeStatus.__kind__ }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-1 flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "最后采集" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-amber-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingConfig ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: formatTime(apiConfig == null ? void 0 : apiConfig.lastScrapeTime) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-4 h-4 text-primary" }),
          "数据采集"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "配置采集接口并触发数据同步，将视频信息从上游拉取到本站。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              className: "gap-1.5",
              "data-ocid": "dashboard-goto-scraper",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/momoazz/scraper", children: [
                "前往采集管理",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clapperboard, { className: "w-4 h-4 text-primary" }),
          "影片管理"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "浏览、编辑、删除已采集的影片信息，维护播放地址。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              variant: "outline",
              className: "gap-1.5",
              "data-ocid": "dashboard-goto-videos",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/momoazz/videos", children: [
                "前往影片管理",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ] })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "当前采集接口" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingConfig ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-sm font-mono text-primary", children: (apiConfig == null ? void 0 : apiConfig.apiBaseUrl) || "未配置" }) })
    ] })
  ] }) }) });
}
export {
  AdminDashboard as default
};
