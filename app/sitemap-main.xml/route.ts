import { SITE } from '@/lib/constants';

export const dynamic = 'force-static';

const BASE = SITE.url;

// ── Dates centralisées ────────────────────────────────────────────────────────
// today  → pages dynamiques recalculées à chaque build
// figée  → pages stables dont le contenu ne change pas
const DATES = {
  homepage:        new Date().toISOString().slice(0, 10), // évolue souvent
  blog:            new Date().toISOString().slice(0, 10), // nouveau contenu régulier
  lancerMonProjet: '2026-04-19',  // création de la page
  contact:         '2026-02-01',  // date de création stable
  mentionsLegales: '2025-10-15',  // date de rédaction stable
} as const;

// ── Multi-locale — même slug fr / en / ar ─────────────────────────────────────
function multiLocaleUrl(
  slug: string,
  lastmod: string,
  changefreq: string,
  priority: string,
): string {
  const locales = ['fr', 'en', 'ar'] as const;
  const alts = locales
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE}/${l}${slug}"/>`)
    .join('\n');

  return locales
    .map(
      (locale) => `  <url>
    <loc>${BASE}/${locale}${slug}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/fr${slug}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n');
}

// ── Multi-locale — slugs différents par locale ────────────────────────────────
// Utilisé pour /lancer-mon-projet (fr) ↔ /start-my-project (en, ar)
function multiLocaleUrlCustom(
  slugs: { fr: string; en: string; ar: string },
  lastmod: string,
  changefreq: string,
  priority: string,
): string {
  const alts = [
    `    <xhtml:link rel="alternate" hreflang="fr" href="${BASE}/fr${slugs.fr}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${BASE}/en${slugs.en}"/>`,
    `    <xhtml:link rel="alternate" hreflang="ar" href="${BASE}/ar${slugs.ar}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/fr${slugs.fr}"/>`,
  ].join('\n');

  return (
    [
      { locale: 'fr', slug: slugs.fr },
      { locale: 'en', slug: slugs.en },
      { locale: 'ar', slug: slugs.ar },
    ]
      .map(
        ({ locale, slug }) => `  <url>
    <loc>${BASE}/${locale}${slug}</loc>
${alts}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
      )
      .join('\n')
  );
}

// ── FR uniquement ─────────────────────────────────────────────────────────────
function frOnlyUrl(
  slug: string,
  lastmod: string,
  changefreq: string,
  priority: string,
): string {
  return `  <url>
    <loc>${BASE}/fr${slug}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE}/fr${slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/fr${slug}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
  const entries = [

    // ── Homepages (fr + en + ar) — priority 1.0 ──────────────────────────────
    multiLocaleUrl('',
      DATES.homepage, 'weekly', '1.0'),

    // ── Lancer mon projet / Start my project — priority 0.9 ──────────────────
    // Slugs différents : /lancer-mon-projet (fr) vs /start-my-project (en, ar)
    multiLocaleUrlCustom(
      { fr: '/lancer-mon-projet', en: '/start-my-project', ar: '/start-my-project' },
      DATES.lancerMonProjet, 'weekly', '0.9',
    ),

    // ── Blog liste (fr + en + ar) — priority 0.8 ─────────────────────────────
    multiLocaleUrl('/blog',
      DATES.blog, 'weekly', '0.8'),

    // ── Contact (fr + en + ar) — priority 0.7 ────────────────────────────────
    multiLocaleUrl('/contact',
      DATES.contact, 'yearly', '0.7'),

    // ── Mentions légales (FR only) — priority 0.3 ────────────────────────────
    frOnlyUrl('/mentions-legales',
      DATES.mentionsLegales, 'yearly', '0.3'),

  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
