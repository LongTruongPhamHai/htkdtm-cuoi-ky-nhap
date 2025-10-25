import { NextResponse } from "next/server";

export function middleware(req) {
  const role = req.cookies.get("role")?.value;
  const path = req.nextUrl.pathname;

  if (
    !role &&
    (path.startsWith("/teacher") ||
      path.startsWith("/students"))
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/teacher/:path*", "/students/:path*"],
};
