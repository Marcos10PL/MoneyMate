import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/sign-up", "/"];

type Role = "admin" | "user" | undefined;

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = path.startsWith("/admin");

  let isLoggedIn = false;
  let isAdmin = false;

  const role = req.cookies.get("role")?.value as Role;

  if (role === "admin" || role === "user") {
    isLoggedIn = true;
    if (role === "admin") isAdmin = true;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  if (isLoggedIn && isPublicRoute) {
    const redirectUrl = isAdmin ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
