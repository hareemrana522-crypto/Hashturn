import { NextResponse } from 'next/server';

const SESSION_SECRET = 'hashturn-admin-secret-2025';
const SESSION_COOKIE = 'ht_session';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get(SESSION_COOKIE);

    if (!session || session.value !== SESSION_SECRET) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /admin to /admin/dashboard if authenticated
  if (pathname === '/admin') {
    const session = request.cookies.get(SESSION_COOKIE);
    if (session && session.value === SESSION_SECRET) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    } else {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
