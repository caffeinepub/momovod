import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { PageLoader } from "./components/LoadingSpinner";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const CategoryPage = lazy(() => import("./pages/Category"));
const VideoDetailPage = lazy(() => import("./pages/VideoDetail"));
const SearchPage = lazy(() => import("./pages/Search"));
const AdminGatePage = lazy(() => import("./pages/admin/AdminGate"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminScraperPage = lazy(() => import("./pages/admin/AdminScraper"));
const AdminVideosPage = lazy(() => import("./pages/admin/AdminVideos"));

function SuspenseWrapper() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}

// Routes
const rootRoute = createRootRoute({ component: SuspenseWrapper });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$typeId",
  component: CategoryPage,
});

const videoDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video/$vodId",
  component: VideoDetailPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

const adminGateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/momoazz",
  component: AdminGatePage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/momoazz/dashboard",
  beforeLoad: () => {
    // Dashboard redirects to scraper as default admin view
  },
  component: AdminDashboardPage,
});

const adminScraperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/momoazz/scraper",
  component: AdminScraperPage,
});

const adminVideosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/momoazz/videos",
  component: AdminVideosPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  categoryRoute,
  videoDetailRoute,
  searchRoute,
  adminGateRoute,
  adminDashboardRoute,
  adminScraperRoute,
  adminVideosRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" theme="dark" />
    </>
  );
}
