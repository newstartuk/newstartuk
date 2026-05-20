import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Note: This is a Next.js Edge middleware. localStorage is browser-only,
// so server-side auth checks rely on a "nsk_session" cookie (set on login/signup).
// In MVP, we set this client-side. The middleware checks its presence as a
// lightweight gate; full token verification will be added when backend lands.

const PROTECTED_ROUTES = [
  "/dashboard",
  "/checklist",
  "/budget",
  "/settings",
  "/support",
  "/tasks",
  "/admin",
];

const ADMIN_ROUTES = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get("nsk_session")?.value;
  const isAdmin = request.cookies.get("nsk_is_admin")?.value === "true";

  const requiresAuth = PROTECTED_ROUTES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const requiresAdmin = ADMIN_ROUTES.some((p) => pathname === p || pathname.startsWith(p + "/"));

  // Not logged in → redirect to login
  if (requiresAuth && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Logged in but not admin → block /admin
  if (requiresAdmin && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checklist/:path*",
    "/budget/:path*",
    "/settings/:path*",
    "/support/:path*",
    "/tasks/:path*",
    "/admin/:path*",
  ],
};
