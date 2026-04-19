import { SITE } from '@/lib/constants';

export const dynamic = 'force-static';

export function GET() {
  const base  = SITE.url;
  const today = new Date().toISOString().slice(0, 10);

  // Dates réelles de dernière modification par sous-sitemap.
  // → today pour main et blog (contenu dynamique, évolue à chaque build)
  // → date figée pour services (mise à jour manuelle — changer ici quand
  //   sitemap-services.xml/route.ts est modifié)
  const SITEMAP_DATES = {
    main:     today,        // homepage + lancer-mon-projet évoluent souvent
    services: '2026-04-19', // dernière modif : ajout Paris + Toulouse + lancer-mon-projet
    blog:     today,        // nouveau contenu régulier
  } as const;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <sitemap>
    <loc>${base}/sitemap-main.xml</loc>
    <lastmod>${SITEMAP_DATES.main}</lastmod>
  </sitemap>

  <sitemap>
    <loc>${base}/sitemap-services.xml</loc>
    <lastmod>${SITEMAP_DATES.services}</lastmod>
  </sitemap>

  <sitemap>
    <loc>${base}/sitemap-blog.xml</loc>
    <lastmod>${SITEMAP_DATES.blog}</lastmod>
  </sitemap>

</sitemapindex>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
