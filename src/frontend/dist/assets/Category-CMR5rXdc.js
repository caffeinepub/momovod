import { a as useParams, r as reactExports, j as jsxRuntimeExports } from "./index-D6eHYULl.js";
import { S as Skeleton } from "./skeleton-Cg0VjZGT.js";
import { L as Layout, C as CategoryNav, m as motion } from "./Layout-CkfCDEaO.js";
import { P as Pagination } from "./Pagination-CSGwoJTn.js";
import { V as VideoCard } from "./VideoCard-BVvmAGUT.js";
import { u as useCategories, a as useVideosByCategory, F as Film } from "./useBackend-VTWkwZMk.js";
import "./input-Dr5Culzi.js";
import "./settings-iVOOgb6f.js";
import "./x-Bi5epJ_3.js";
import "./chevron-left-BsJ-5O6d.js";
import "./chevron-right-B5wFOwM5.js";
const PAGE_SIZE = 24;
function CategoryPage() {
  const { typeId } = useParams({ from: "/category/$typeId" });
  const [page, setPage] = reactExports.useState(1);
  const typeIdBig = BigInt(typeId);
  const { data: categories = [] } = useCategories();
  const { data: paginated, isLoading } = useVideosByCategory(
    typeIdBig,
    page,
    PAGE_SIZE
  );
  const category = categories.find((c) => c.type_id === typeIdBig);
  const videos = (paginated == null ? void 0 : paginated.items) ?? [];
  const total = Number((paginated == null ? void 0 : paginated.total) ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { activeTypeId: typeId, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border/40 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl italic text-foreground", children: category ? category.type_name : "分类浏览" }),
        total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: [
          "共 ",
          total,
          " 部"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryNav, { activeTypeId: typeId, variant: "horizontal" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 py-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3", children: Array.from({ length: PAGE_SIZE }, (_, i) => `cat-skel-${i}`).map(
      (k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-1/2 rounded-sm" })
      ] }, k)
    ) }) : videos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3", children: videos.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.3, delay: idx * 0.03 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video: v })
            },
            v.vod_id.toString()
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pagination,
            {
              page,
              totalPages,
              onPageChange: handlePageChange
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 gap-4",
        "data-ocid": "category-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-12 h-12 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "该分类暂无视频" })
        ]
      }
    ) })
  ] });
}
export {
  CategoryPage as default
};
