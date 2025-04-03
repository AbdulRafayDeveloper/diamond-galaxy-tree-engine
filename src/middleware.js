import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const loginPath = "/auth/signin";
  const dashboardPath = "/users/dashboard";
  const protectedUserPath = "/users";

  if (!token) {
    if (pathname.startsWith(protectedUserPath)) {
      return NextResponse.redirect(new URL(loginPath, req.url));
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (pathname === loginPath) {
      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);

    const response = NextResponse.redirect(new URL(loginPath, req.url));
    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });
    return response;
  }
}
export const config = {
  matcher: ["/users/:path*", "/auth/signin"],
};
