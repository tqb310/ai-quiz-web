import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware() {
  const c = await cookies();

  if (!c.get('next-auth.session-token')?.value?.trim()) {
    return new Response('Unauthorized, log in first', {
      status: 401,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/questions/:path*',
    '/api/game/:path*',
    '/api/checkAnswer/:path*',
  ],
};
