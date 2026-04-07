import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Film,
  LayoutDashboard,
  LogOut,
  Radio,
  Video,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useAuth } from "../../hooks/useAuth";

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  ocid: string;
}

const navItems: NavItem[] = [
  {
    to: "/momoazz",
    icon: LayoutDashboard,
    label: "控制台",
    ocid: "admin-nav-dashboard",
  },
  {
    to: "/momoazz/scraper",
    icon: Radio,
    label: "数据采集",
    ocid: "admin-nav-scraper",
  },
  {
    to: "/momoazz/videos",
    icon: Video,
    label: "影片管理",
    ocid: "admin-nav-videos",
  },
];

interface AdminLayoutProps {
  children: ReactNode;
  /** @deprecated use route-based active detection */
  activeSection?: string;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { identity, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const principalText =
    (identity as { getPrincipal?: () => { toText: () => string } } | null)
      ?.getPrincipal?.()
      ?.toText?.() ?? "—";

  const shortPrincipal =
    principalText !== "—"
      ? `${principalText.slice(0, 6)}...${principalText.slice(-4)}`
      : "—";

  const handleLogout = () => {
    logout();
    navigate({ to: "/momoazz" });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className="w-56 shrink-0 flex flex-col bg-card border-r border-border/60"
        data-ocid="admin-sidebar"
      >
        {/* Brand / back to site */}
        <div className="px-4 py-4 border-b border-border/40">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="font-display text-lg italic text-foreground">
              <span className="text-primary">Momo</span>Vod
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          <p className="px-3 py-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">
            管理
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={item.ocid}
                className={[
                  "flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm transition-smooth",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                ].join(" ")}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Separator className="opacity-40" />

        {/* Principal + logout */}
        <div className="p-3 space-y-2.5">
          <div className="px-1">
            <p className="text-xs text-muted-foreground mb-0.5">当前账号</p>
            <p
              className="text-xs font-mono text-foreground truncate"
              title={principalText}
            >
              {shortPrincipal}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
            data-ocid="admin-logout-btn"
          >
            <LogOut className="w-4 h-4" />
            退出登录
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
