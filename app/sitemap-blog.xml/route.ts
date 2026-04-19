import { SITE } from '@/lib/constants';
import { BLOG_POSTS } from '@/lib/blog-posts';

export const dynamic = 'force-static';

const BASE = SITE.url;

type Locale = 'fr' | 'en' | 'ar';
const ALL_LOCALES = ['fr', 'en', 'ar'] as const;

// ── Génère les <url> pour un article ─────────────────────────────────────────
// locales = uniquement les langues pour lesquelles l'article existe
// Évite de soumettre à Google des URLs qui rendraient une 404 ou un fallback
function articleUrl(
  slug: string,
  lastmod: string,
  locales: readonly Locale[],
): string {
  // hreflang : seulement les locales disponibles + x-default → fr (canonical)
  const alts = locales
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE}/${l}${slug}"/>`)
    .join('\n');
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/fr${slug}"/>`;

  return locales
    .map(
      (locale) => `  <url>
    <loc>${BASE}/${locale}${slug}</loc>
${alts}
${xDefault}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join('\n');
}

export function GET() {
  const entries: string[] = [];

  // ── Blog liste — priority 0.8, weekly (chaque nouvel article la modifie) ──
  const today = new Date().toISOString().slice(0, 10);
  entries.push(
    articleUrl('/blog', today, ALL_LOCALES),
  );

  // ── Articles — priority 0.7, monthly ─────────────────────────────────────
  // Dynamique : toute entrée ajoutée dans BLOG_POSTS apparaît automatiquement.
  // lastmod  = date de publication réelle (post.fr?.date en priorité)
  // locales  = uniquement les locales où l'article a du contenu
  for (const [postSlug, post] of Object.entries(BLOG_POSTS)) {
    const availableLocales = ALL_LOCALES.filter((l) => Boolean(post[l]));
    if (availableLocales.length === 0) continue;

    // Préférer la date fr, sinon en, sinon ar, sinon fallback ISO
    const lastmod =
      post.fr?.date ??
      post.en?.date ??
      post.ar?.date ??
      '2025-01-01';

    entries.push(articleUrl(`/blog/${postSlug}`, lastmod, availableLocales));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
