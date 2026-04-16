import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

const locales = ['fr', 'en', 'ar'] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'fr';

// next-intl handles routing once a locale is in the path
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // We disable automatic header-based detection because we handle it manually
  // to ensure the cookie always takes priority.
  localeDetection: false,
});

const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 31_536_000; // 1 year in seconds

const cookieOptions = {
  path: '/',
  maxAge: COOKIE_MAX_AGE,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
};

/**
 * Detect locale from:
 *  1. NEXT_LOCALE cookie (user's explicit choice)
 *  2. Accept-Language HTTP header (browser preference)
 *  3. Fallback to 'fr'
 */
function resolveLocale(request: NextRequest): Locale {
  // Priority 1: cookie
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  // Priority 2: Accept-Language header — check first two-letter tag of each entry
  const acceptLang = request.headers.get('accept-language') ?? '';
  for (const segment of acceptLang.split(',')) {
    const tag = segment.split(';')[0]?.trim().toLowerCase().slice(0, 2) ?? '';
    if ((locales as readonly string[]).includes(tag)) {
      return tag as Locale;
    }
  }

  // Priority 3: default
  return defaultLocale;
}

export default function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Check whether the pathname already begins with a supported locale
  const hasLocalePrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!hasLocalePrefix) {
    // No locale in URL → detect and redirect
    const locale = resolveLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE_NAME, locale, cookieOptions);
    return res;
  }

  // Locale already in URL → delegate to next-intl for routing, then refresh cookie
  const currentLocale = pathname.split('/')[1] as Locale;
  const res = intlMiddleware(request) as NextResponse;

  if ((locales as readonly string[]).includes(currentLocale)) {
    res.cookies.set(COOKIE_NAME, currentLocale, cookieOptions);
  }

  return res;
}

export const config = {
  // Skip Next.js internals, API routes, static files and well-known files
  matcher: [
    '/((?!_next|api|stats|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\..*).*)',
  ],
};
