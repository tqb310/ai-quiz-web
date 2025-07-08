import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from './lib/next-auth';

export async function middleware(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/questions/:path*', '/api/game/:path*'],
};
