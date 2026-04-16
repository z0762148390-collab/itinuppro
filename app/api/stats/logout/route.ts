import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/stats', request.url), { status: 303 });
  response.cookies.set('stats_auth', '', { maxAge: 0, path: '/' });
  return response;
}
