import { NextRequest, NextResponse } from 'next/server';
import { recordVisit } from '@/lib/analytics';

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'
  );
}

async function resolveCountry(ip: string): Promise<string> {
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return 'Local';
  }
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=countryCode`,
      { signal: AbortSignal.timeout(2000) },
    );
    const data = (await res.json()) as { countryCode?: string };
    return data.countryCode ?? 'Unknown';
  } catch {
    return 'Unknown';
  }
}

export async function POST(request: NextRequest) {
  try {
    const { page, ref } = (await request.json()) as { page?: unknown; ref?: unknown };
    if (typeof page === 'string' && typeof ref === 'string') {
      const ip = getClientIp(request);
      const country = await resolveCountry(ip);
      await recordVisit(page, ref, country);
    }
  } catch {
    // ignore malformed body
  }
  return new NextResponse(null, { status: 204 });
}
