import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_PATH,
  LOGOUT_PATH,
  authRoutes,
  publicRoutes,
} from "./routes";
import { getSession } from "@/actions/session";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { nextUrl } = request;
  const session = await getSession()

  const isLogoutRoute = nextUrl.pathname === LOGOUT_PATH;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAuthenticated = session.isAuthenticated;

  if (isLogoutRoute) {
    return response;
  }

  if (isAuthRoute && isAuthenticated) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!isPublicRoute && !isAuthRoute && !isAuthenticated) {
    return Response.redirect(new URL(LOGIN_PATH, nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
