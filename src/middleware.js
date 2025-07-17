import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const ROLE_DASHBOARD = {
  admin: "/admin/dashboard",
  user: "/users/dashboard",
};

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/signin") ||
    pathname.startsWith("/auth/signup") ||
    pathname.startsWith("/auth/forget-password/verify-email") ||
    pathname.startsWith("/auth/forget-password/verify-otp") ||
    pathname.startsWith("/auth/new-password");

  const isProtectedUserRoute = pathname.startsWith("/users");
  const isProtectedAdminRoute = pathname.startsWith("/admin");

  // 🔐 No token
  if (!token) {
    if (isProtectedUserRoute || isProtectedAdminRoute) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return NextResponse.next(); // allow access to auth pages
  }
  
  // ✅ Has token
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role || "user";

    // 🛑 Prevent logged-in users from accessing auth pages
    if (isAuthPage) {
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
    }

    // 🛡️ Role-specific route protection
    if (isProtectedAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
    }

    if (isProtectedUserRoute && role !== "user") {
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error);

    const response = NextResponse.redirect(new URL("/auth/signin", req.url));
    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });
    return response;
  }
}
export const config = {
  matcher: ["/users/:path*", "/admin/:path*", "/auth/:path*"],
};
