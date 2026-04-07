import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, Settings, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { CategoryNav } from "./CategoryNav";

interface NavbarProps {
  activeTypeId?: string;
}

export function Navbar({ activeTypeId }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery.trim() } });
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border/60 shadow-cinematic"
      data-ocid="navbar"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Top row */}
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 font-display text-xl tracking-wide text-foreground hover:text-primary transition-smooth"
            data-ocid="navbar-logo"
          >
            <span className="text-primary">Momo</span>
            <span>Vod</span>
          </Link>

          {/* Desktop search */}
          {!isMobile && (
            <form onSubmit={handleSearch} className="flex-1 max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索影片..."
                  className="pl-9 h-8 bg-muted/50 border-border/60 text-sm focus:bg-background"
                  data-ocid="navbar-search"
                />
              </div>
            </form>
          )}

          <div className="flex-1" />

          {/* Admin link */}
          <Link
            to="/momoazz"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="管理后台"
            data-ocid="navbar-admin"
          >
            <Settings className="w-4 h-4" />
            <span>后台</span>
          </Link>

          {/* Mobile menu toggle */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
              data-ocid="navbar-mobile-toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>

        {/* Category nav (desktop) */}
        {!isMobile && (
          <div className="pb-2 border-t border-border/30 pt-2">
            <CategoryNav activeTypeId={activeTypeId} />
          </div>
        )}

        {/* Mobile dropdown */}
        {isMobile && mobileMenuOpen && (
          <div className="border-t border-border/30 py-3 space-y-3 animate-slide-up">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索影片..."
                  className="pl-9 h-9 bg-muted/50 border-border/60"
                  data-ocid="navbar-search-mobile"
                />
              </div>
            </form>
            <CategoryNav activeTypeId={activeTypeId} />
            <Link
              to="/momoazz"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings className="w-4 h-4" />
              管理后台
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
