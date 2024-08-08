import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/']);
const isProtectedRoute = createRouteMatcher(['/organization(.*)']);

export default clerkMiddleware((auth, req) => {
  const user = auth();

  if (isProtectedRoute(req)) auth().protect();

  if (user.userId && isPublicRoute(req)) {
    const redirectTo = new URL('/workspace', req.url);
    return NextResponse.redirect(redirectTo);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
