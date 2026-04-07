import { j as jsxRuntimeExports } from "./index-D6eHYULl.js";
import { B as Button } from "./useBackend-VTWkwZMk.js";
import { C as ChevronLeft } from "./chevron-left-BsJ-5O6d.js";
import { C as ChevronRight } from "./chevron-right-B5wFOwM5.js";
function Pagination({
  page,
  totalPages,
  onPageChange,
  className = ""
}) {
  if (totalPages <= 1) return null;
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center justify-center gap-1 ${className}`,
      "data-ocid": "pagination",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => onPageChange(page - 1),
            disabled: !canPrev,
            "aria-label": "上一页",
            "data-ocid": "pagination-prev",
            className: "w-8 h-8",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
          }
        ),
        pages.map(
          (p, i) => p === "..." ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 text-muted-foreground text-sm select-none",
              children: "…"
            },
            `ellipsis-${i}-${p}`
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: p === page ? "default" : "ghost",
              size: "icon",
              onClick: () => onPageChange(p),
              "aria-label": `第 ${p} 页`,
              "aria-current": p === page ? "page" : void 0,
              "data-ocid": `pagination-page-${p}`,
              className: "w-8 h-8 text-sm",
              children: p
            },
            p
          )
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => onPageChange(page + 1),
            disabled: !canNext,
            "aria-label": "下一页",
            "data-ocid": "pagination-next",
            className: "w-8 h-8",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
export {
  Pagination as P
};
