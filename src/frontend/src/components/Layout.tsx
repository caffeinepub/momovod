import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  activeTypeId?: string;
  showNavbar?: boolean;
}

export function Layout({
  children,
  activeTypeId,
  showNavbar = true,
}: LayoutProps) {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {showNavbar && <Navbar activeTypeId={activeTypeId} />}

      <main className="flex-1 flex flex-col">{children}</main>

      <footer
        className="bg-card border-t border-border/40 py-6 mt-auto"
        data-ocid="footer"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm text-foreground/70">
              <span className="text-primary">Momo</span>Vod
            </span>
            <span className="text-border">·</span>
            <span>影视资源聚合平台</span>
          </div>
          <span>
            © {year}. Built with love using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth underline-offset-2 hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
