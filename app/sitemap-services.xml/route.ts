import { SITE } from '@/lib/constants';

const BASE = SITE.url;

// Multi-locale URL block (fr + en + ar, 3 <url> entries)
function multiLocaleUrl(slug: string, lastmod: string, changefreq: string, priority: string): string {
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

// FR-only URL block (1 <url> entry — GEO pages that redirect non-FR)
function frOnlyUrl(slug: string, lastmod: string, changefreq: string, priority: string): string {
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
    // ── Main SEO pages (fr + en + ar) — priority 0.9 ─────────────────────
    multiLocaleUrl('/devops-france',                     '2026-01-20', 'monthly', '0.9'),
    multiLocaleUrl('/creation-site-france',              '2026-02-01', 'monthly', '0.9'),
    multiLocaleUrl('/creation-site-web-application',     '2026-02-10', 'monthly', '0.9'),
    multiLocaleUrl('/application-web-france',            '2026-02-15', 'monthly', '0.9'),
    multiLocaleUrl('/java-spring-boot-freelance-france', '2026-03-01', 'monthly', '0.9'),
    multiLocaleUrl('/tibco-freelance-france',            '2026-03-10', 'monthly', '0.9'),

    // ── Services overview page (fr + en + ar) — priority 0.8 ─────────────
    multiLocaleUrl('/services',                          '2026-04-01', 'monthly', '0.8'),

    // ── Lancer mon projet (fr + en + ar) — priority 0.9 ──────────────────
    multiLocaleUrl('/lancer-mon-projet',                 '2026-04-19', 'monthly', '0.9'),

    // ── GEO local pages Montpellier (FR only) — priority 0.8 ─────────────
    frOnlyUrl('/devops-montpellier',              '2026-02-20', 'monthly', '0.8'),
    frOnlyUrl('/creation-site-montpellier',       '2026-03-05', 'monthly', '0.8'),
    frOnlyUrl('/java-spring-montpellier',         '2026-03-15', 'monthly', '0.8'),
    frOnlyUrl('/developpeur-backend-montpellier', '2026-03-20', 'monthly', '0.8'),
    frOnlyUrl('/tibco-montpellier',               '2026-03-25', 'monthly', '0.8'),

    // ── GEO local pages Paris (FR only) — priority 0.8 ───────────────────
    frOnlyUrl('/devops-paris',                        '2026-04-19', 'monthly', '0.8'),
    frOnlyUrl('/creation-site-paris',                 '2026-04-19', 'monthly', '0.8'),
    frOnlyUrl('/java-spring-boot-freelance-paris',    '2026-04-19', 'monthly', '0.8'),
    frOnlyUrl('/lancer-mon-projet-paris',             '2026-04-19', 'monthly', '0.8'),

    // ── GEO local pages Toulouse (FR only) — priority 0.8 ────────────────
    frOnlyUrl('/devops-toulouse',                     '2026-04-19', 'monthly', '0.8'),
    frOnlyUrl('/creation-site-toulouse',              '2026-04-19', 'monthly', '0.8'),
    frOnlyUrl('/java-spring-boot-freelance-toulouse', '2026-04-19', 'monthly', '0.8'),
    frOnlyUrl('/lancer-mon-projet-toulouse',          '2026-04-19', 'monthly', '0.8'),
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
