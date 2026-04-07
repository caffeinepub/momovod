import { useNavigate } from "@tanstack/react-router";
import { Film, Loader2, Lock, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../hooks/useAuth";
import { useClaimOwner } from "../../hooks/useBackend";

type GateState = "idle" | "claiming" | "denied" | "granted";

interface AdminGateProps {
  children?: ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { isAuthenticated, isLoading, login, identity } = useAuth();
  const claimOwner = useClaimOwner();
  const [gateState, setGateState] = useState<GateState>("idle");
  const hasClaimed = useRef(false);
  const navigate = useNavigate();

  // Once authenticated, attempt to claim owner exactly once
  useEffect(() => {
    if (!isAuthenticated || hasClaimed.current) return;
    hasClaimed.current = true;
    setGateState("claiming");

    claimOwner.mutate(undefined, {
      onSuccess: (isOwner: boolean) => {
        setGateState(isOwner ? "granted" : "denied");
      },
      onError: () => {
        setGateState("denied");
      },
    });
  }, [isAuthenticated, claimOwner]);

  // Loading / claiming
  if (isLoading || gateState === "claiming") {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="w-7 h-7 animate-spin text-primary" />
          <p className="text-sm">
            {gateState === "claiming" ? "正在验证身份..." : "加载中..."}
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated — show II login screen
  if (!isAuthenticated) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-sm mx-4">
          <div
            className="rounded-sm border border-border/60 bg-card p-8 space-y-6 shadow-lg"
            data-ocid="admin-gate"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl italic text-foreground">
                  <span className="text-primary">Momo</span>Vod 后台
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  需要使用 Internet Identity 验证身份
                </p>
              </div>
            </div>
            <Button
              className="w-full gap-2"
              onClick={() => login()}
              data-ocid="admin-login-btn"
            >
              <Lock className="w-4 h-4" />
              使用 Internet Identity 登录
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              仅限授权管理员访问
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Access denied
  if (gateState === "denied") {
    const principalText =
      (identity as { getPrincipal?: () => { toText: () => string } } | null)
        ?.getPrincipal?.()
        ?.toText?.() ?? "";

    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-sm mx-4">
          <div className="rounded-sm border border-destructive/30 bg-card p-8 space-y-5 text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-sm bg-destructive/10 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-destructive" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                访问被拒绝
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                您的账号没有管理员权限。
              </p>
              {principalText && (
                <p
                  className="mt-3 text-xs font-mono text-muted-foreground bg-muted px-3 py-2 rounded truncate"
                  title={principalText}
                >
                  {principalText.slice(0, 10)}...{principalText.slice(-8)}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate({ to: "/" })}
            >
              返回首页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Granted — render children wrapped in dark mode
  if (gateState === "granted") {
    return <div className="dark">{children}</div>;
  }

  return null;
}
