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

  const loginPath = "/auth/signin";
  const protectedUserPath = "/users";

  if (!token) {
    if (pathname.startsWith(protectedUserPath)) {
      return NextResponse.redirect(new URL(loginPath, req.url));
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    console.log("payload: ", payload);
    const role = payload.role || "user";
    console.log("role: ", ROLE_DASHBOARD[role]);

    if (pathname.startsWith("/auth")) {
      const redirectPath = ROLE_DASHBOARD[role];
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error);

    const response = NextResponse.redirect(new URL(loginPath, req.url));
    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });
    return response;
  }
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*", "/auth/signin"],
};
