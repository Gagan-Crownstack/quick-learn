import { NextRequest, NextResponse } from 'next/server';
import { ProtectedRouteEnum, RouteEnum } from './constants/route.enum';

// Constants
const PUBLIC_ROUTES = ['/', RouteEnum.LOGIN];
const DASHBOARD_ROUTE = ProtectedRouteEnum.DASHBOARD;
const LOGIN_ROUTE = RouteEnum.LOGIN;

// Helper functions
const isPublicRoute = (path: string) => PUBLIC_ROUTES.includes(path);
const isDashboardRoute = (path: string) => path.startsWith(DASHBOARD_ROUTE);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('access_token')?.value;

  // Public routes
  if (isPublicRoute(pathname)) {
    return authToken
      ? NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url))
      : NextResponse.next();
  }

  // Protected routes
  if (isDashboardRoute(pathname)) {
    if (!authToken) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};
