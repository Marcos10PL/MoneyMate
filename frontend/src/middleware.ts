import { NextRequest, NextResponse } from "next/server";

const basePath = "/money-mate";

const publicRoutes = [
  `${basePath}/login`,
  `${basePath}/sign-up`,
  `${basePath}/`,
];

type Role = "admin" | "user" | undefined;

export default async function middleware(req: NextRequest) {
  const path = basePath + req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = path.startsWith(`${basePath}/admin`);

  let isLoggedIn = false;
  let isAdmin = false;

  const role = req.cookies.get("role")?.value as Role;

  if (role === "admin" || role === "user") {
    isLoggedIn = true;
    if (role === "admin") isAdmin = true;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(`${basePath}/login`, req.url));
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL(`${basePath}/404`, req.url));
  }

  if (isLoggedIn && isPublicRoute) {
    const redirectUrl = isAdmin ? `${basePath}/admin` : `${basePath}/dashboard`;
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
