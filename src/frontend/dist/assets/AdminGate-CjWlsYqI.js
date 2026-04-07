import { g as useInternetIdentity, r as reactExports, u as useNavigate, j as jsxRuntimeExports } from "./index-D6eHYULl.js";
import { c as createLucideIcon, q as useClaimOwner, F as Film, B as Button } from "./useBackend-VTWkwZMk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
function useAuth() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const isAuthenticated = loginStatus === "success" && !!identity;
  const isLoading = loginStatus === "logging-in";
  return {
    identity,
    isAuthenticated,
    isLoading,
    login,
    logout: clear,
    loginStatus
  };
}
function AdminGate({ children }) {
  var _a, _b, _c;
  const { isAuthenticated, isLoading, login, identity } = useAuth();
  const claimOwner = useClaimOwner();
  const [gateState, setGateState] = reactExports.useState("idle");
  const hasClaimed = reactExports.useRef(false);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAuthenticated || hasClaimed.current) return;
    hasClaimed.current = true;
    setGateState("claiming");
    claimOwner.mutate(void 0, {
      onSuccess: (isOwner) => {
        setGateState(isOwner ? "granted" : "denied");
      },
      onError: () => {
        setGateState("denied");
      }
    });
  }, [isAuthenticated, claimOwner]);
  if (isLoading || gateState === "claiming") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-7 h-7 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: gateState === "claiming" ? "正在验证身份..." : "加载中..." })
    ] }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-sm border border-border/60 bg-card p-8 space-y-6 shadow-lg",
        "data-ocid": "admin-gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl italic text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Momo" }),
                "Vod 后台"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "需要使用 Internet Identity 验证身份" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full gap-2",
              onClick: () => login(),
              "data-ocid": "admin-login-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                "使用 Internet Identity 登录"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "仅限授权管理员访问" })
        ]
      }
    ) }) });
  }
  if (gateState === "denied") {
    const principalText = ((_c = (_b = (_a = identity == null ? void 0 : identity.getPrincipal) == null ? void 0 : _a.call(identity)) == null ? void 0 : _b.toText) == null ? void 0 : _c.call(_b)) ?? "";
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-destructive/30 bg-card p-8 space-y-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-sm bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-6 h-6 text-destructive" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-foreground", children: "访问被拒绝" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "您的账号没有管理员权限。" }),
        principalText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "mt-3 text-xs font-mono text-muted-foreground bg-muted px-3 py-2 rounded truncate",
            title: principalText,
            children: [
              principalText.slice(0, 10),
              "...",
              principalText.slice(-8)
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full",
          onClick: () => navigate({ to: "/" }),
          children: "返回首页"
        }
      )
    ] }) }) });
  }
  if (gateState === "granted") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark", children });
  }
  return null;
}
const AdminGate$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminGate
}, Symbol.toStringTag, { value: "Module" }));
export {
  AdminGate as A,
  LoaderCircle as L,
  AdminGate$1 as a,
  useAuth as u
};
