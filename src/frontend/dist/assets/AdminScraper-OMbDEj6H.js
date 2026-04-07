import { r as reactExports, j as jsxRuntimeExports, c as ue } from "./index-D6eHYULl.js";
import { B as Badge } from "./badge-DI9gpnRl.js";
import { c as createLucideIcon, h as useApiConfig, g as useScrapeStatus, i as useSetApiConfig, j as useTriggerScrape, B as Button } from "./useBackend-VTWkwZMk.js";
import { C as Card, a as CardHeader, b as CardTitle, e as CardDescription, c as CardContent, d as Clock } from "./card-DGb5Uk8w.js";
import { I as Input } from "./input-Dr5Culzi.js";
import { L as Label } from "./label-DUtY2zLd.js";
import { A as AdminGate, L as LoaderCircle } from "./AdminGate-CjWlsYqI.js";
import { A as AdminLayout } from "./AdminLayout-DTvPOIkV.js";
import { S as Settings } from "./settings-iVOOgb6f.js";
import { P as Play } from "./play-BDJey3H4.js";
import "./chevron-left-BsJ-5O6d.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
function ScrapeStatusBadge({
  status
}) {
  if (!status) return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "未知" });
  switch (status.__kind__) {
    case "idle":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "空闲" });
    case "running":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "default", className: "gap-1 animate-pulse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
        "采集中"
      ] });
    case "completed":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "gap-1 text-primary border-primary/40",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
            "已完成"
          ]
        }
      );
    case "error":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
        "错误"
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "未知" });
  }
}
function AdminScraperPage() {
  const { data: config } = useApiConfig();
  const { data: status } = useScrapeStatus();
  const setConfig = useSetApiConfig();
  const triggerScrape = useTriggerScrape();
  const [apiUrl, setApiUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (config == null ? void 0 : config.apiBaseUrl) setApiUrl(config.apiBaseUrl);
  }, [config]);
  const handleSaveConfig = async () => {
    if (!apiUrl.trim()) {
      ue.error("请输入采集接口地址");
      return;
    }
    try {
      await setConfig.mutateAsync(apiUrl.trim());
      ue.success("采集接口地址已保存");
    } catch {
      ue.error("保存失败，请重试");
    }
  };
  const handleStartScrape = async () => {
    if (!(config == null ? void 0 : config.apiBaseUrl)) {
      ue.error("请先设置采集接口地址");
      return;
    }
    try {
      await triggerScrape.mutateAsync();
      ue.success("采集任务已启动");
    } catch {
      ue.error("启动采集失败，请重试");
    }
  };
  const isRunning = (status == null ? void 0 : status.__kind__) === "running";
  const lastTime = config == null ? void 0 : config.lastScrapeTime;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGate, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { activeSection: "scraper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl italic text-foreground", children: "采集配置" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "采集接口地址" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs", children: "支持标准苹果CMS v10 API，例如：https://api.maoyanapi.top/api.php/provide/vod" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "api-url", children: "接口基础地址" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "api-url",
                value: apiUrl,
                onChange: (e) => setApiUrl(e.target.value),
                placeholder: "https://api.example.com/api.php/provide/vod",
                className: "flex-1 font-mono text-sm",
                "data-ocid": "api-url-input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSaveConfig,
                disabled: setConfig.isPending,
                "data-ocid": "save-config-btn",
                children: setConfig.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "保存"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm bg-muted/50 p-3 space-y-1 text-xs text-muted-foreground font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-xs font-body font-medium mb-2", children: "接口说明" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "获取分类：",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "[接口]?ac=list" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "分类列表：",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "[接口]?ac=list&t=[分类ID]&pg=[页码]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "影片详情：",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "[接口]?ac=detail&ids=[影片ID]" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "采集控制" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs", children: "启动采集将从设置的接口全量拉取分类和影片数据" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "采集状态" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrapeStatusBadge, { status: status ?? null }),
            (status == null ? void 0 : status.__kind__) === "completed" && "completed" in status && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
              "共",
              " ",
              status.completed.totalVideos.toString(),
              " ",
              "部影片，",
              status.completed.totalCategories.toString(),
              " ",
              "个分类"
            ] }),
            (status == null ? void 0 : status.__kind__) === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", children: status.error })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleStartScrape,
              disabled: isRunning || triggerScrape.isPending || !(config == null ? void 0 : config.apiBaseUrl),
              className: "gap-2",
              "data-ocid": "start-scrape-btn",
              children: isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "采集中..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                "开始采集"
              ] })
            }
          )
        ] }),
        lastTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border/40 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
          "上次采集：",
          new Date(Number(lastTime) / 1e6).toLocaleString(
            "zh-CN"
          )
        ] })
      ] })
    ] })
  ] }) }) });
}
export {
  AdminScraperPage as default
};
