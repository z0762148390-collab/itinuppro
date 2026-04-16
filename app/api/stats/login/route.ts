import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/analytics';

const COOKIE_NAME = 'stats_auth';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get('password');

  const expectedPass = process.env.STATS_PASSWORD ?? '';
  if (!expectedPass || typeof password !== 'string' || password !== expectedPass) {
    return NextResponse.redirect(new URL('/stats?error=1', request.url), { status: 303 });
  }

  const token = getAuthToken();
  const response = NextResponse.redirect(new URL('/stats', request.url), { status: 303 });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  return response;
}
