import { Link } from "@tanstack/react-router";
import { useCategories } from "../hooks/useBackend";
import type { Category } from "../types";

interface CategoryNavProps {
  activeTypeId?: string;
  variant?: "horizontal" | "sidebar";
}

function CategoryItem({
  category,
  isActive,
}: {
  category: Category;
  isActive: boolean;
}) {
  return (
    <Link
      to="/category/$typeId"
      params={{ typeId: category.type_id.toString() }}
      className={[
        "whitespace-nowrap px-3 py-1.5 rounded-sm text-sm transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        isActive
          ? "bg-primary text-primary-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
      ].join(" ")}
      data-ocid={`category-nav-${category.type_id}`}
    >
      {category.type_name}
    </Link>
  );
}

export function CategoryNav({
  activeTypeId,
  variant = "horizontal",
}: CategoryNavProps) {
  const { data: categories = [], isLoading } = useCategories();

  // Only show top-level categories (type_pid === 0n)
  const topLevel = categories.filter((c) => c.type_pid === 0n);

  if (variant === "horizontal") {
    return (
      <nav
        className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1"
        aria-label="分类导航"
        data-ocid="category-nav"
      >
        <Link
          to="/"
          className={[
            "whitespace-nowrap px-3 py-1.5 rounded-sm text-sm transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            !activeTypeId
              ? "bg-primary text-primary-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          ].join(" ")}
          data-ocid="category-nav-all"
        >
          全部
        </Link>
        {isLoading
          ? Array.from({ length: 5 }, (_, i) => `cat-skel-${i}`).map((id) => (
              <div
                key={id}
                className="h-7 w-16 rounded-sm bg-muted animate-pulse"
              />
            ))
          : topLevel.map((cat) => (
              <CategoryItem
                key={cat.type_id.toString()}
                category={cat}
                isActive={activeTypeId === cat.type_id.toString()}
              />
            ))}
      </nav>
    );
  }

  return (
    <nav
      className="flex flex-col gap-0.5"
      aria-label="分类"
      data-ocid="category-nav-sidebar"
    >
      <Link
        to="/"
        className={[
          "px-3 py-2 rounded-sm text-sm transition-smooth",
          !activeTypeId
            ? "bg-primary text-primary-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted",
        ].join(" ")}
      >
        全部
      </Link>
      {topLevel.map((cat) => (
        <CategoryItem
          key={cat.type_id.toString()}
          category={cat}
          isActive={activeTypeId === cat.type_id.toString()}
        />
      ))}
    </nav>
  );
}
