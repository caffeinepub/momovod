import { j as jsxRuntimeExports, L as Link } from "./index-D6eHYULl.js";
import { a as Star } from "./Layout-CkfCDEaO.js";
function VideoCard({ video }) {
  const {
    vod_id,
    vod_name,
    vod_pic,
    vod_score,
    vod_year,
    vod_remarks,
    type_name
  } = video;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/video/$vodId",
      params: { vodId: vod_id.toString() },
      className: "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
      "data-ocid": `video-card-${vod_id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-hover rounded-sm overflow-hidden bg-card border border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] overflow-hidden bg-muted", children: [
          vod_pic ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: vod_pic,
              alt: vod_name,
              loading: "lazy",
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "暂无封面" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" }),
          vod_score && vod_score !== "0" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 text-primary fill-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-medium", children: vod_score })
          ] }),
          vod_remarks && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-1.5 py-0.5 rounded-sm font-medium truncate max-w-[70%]", children: vod_remarks })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-body text-sm font-medium text-foreground truncate leading-tight",
              title: vod_name,
              children: vod_name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            vod_year && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: vod_year }),
            vod_year && type_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
            type_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: type_name })
          ] })
        ] })
      ] })
    }
  );
}
export {
  VideoCard as V
};
