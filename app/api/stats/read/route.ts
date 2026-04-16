import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAuthToken } from '@/lib/analytics';
import { markRead } from '@/lib/contacts';

export async function POST(request: NextRequest) {
  const store = await cookies();
  const token = store.get('stats_auth')?.value;
  if (!token || token !== getAuthToken()) {
    return NextResponse.redirect(new URL('/stats', request.url), { status: 303 });
  }
  // Support both JSON and form submissions
  const contentType = request.headers.get('content-type') ?? '';
  let id: string | undefined;
  if (contentType.includes('application/json')) {
    const body = (await request.json()) as { id?: string };
    id = body.id;
  } else {
    const form = await request.formData();
    id = form.get('id')?.toString();
  }
  if (typeof id === 'string') await markRead(id);
  return NextResponse.redirect(new URL('/stats', request.url), { status: 303 });
}
