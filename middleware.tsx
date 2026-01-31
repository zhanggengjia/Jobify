import { clerkMiddleware } from '@clerk/nextjs/server';

const PUBLIC_ROUTES = ['/', '/sign-in', '/sign-up']; // 你如果用 Clerk 的 /sign-in /sign-up（或 Hosted）就放行

export default clerkMiddleware(async (auth, req) => {
  const session = await auth(); //
  const { userId } = session;

  const path = req.nextUrl.pathname;
  const isPublic = PUBLIC_ROUTES.some(
    (p) => path === p || path.startsWith(p + '/'),
  );

  if (!userId && !isPublic) {
    return session.redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
