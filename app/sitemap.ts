import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { getAllSlugs } from '@/lib/blog-posts';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

const routes = [
  // Accueil
  { path: '',                                        priority: 1.0, changeFrequency: 'weekly'  as ChangeFrequency },
  // Pages SEO principales — priorité maximale
  { path: '/devops-france',                          priority: 1.0, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/creation-site-france',                   priority: 1.0, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/creation-site-web-application',          priority: 1.0, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/application-web-france',                 priority: 1.0, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/java-spring-boot-freelance-france',      priority: 1.0, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/tibco-freelance-france',                 priority: 1.0, changeFrequency: 'monthly' as ChangeFrequency },
  // Pages GEO SEO locales
  { path: '/devops-montpellier',                     priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/creation-site-montpellier',              priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/java-spring-montpellier',                priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/developpeur-backend-montpellier',        priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/tibco-montpellier',                      priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  // Pages secondaires
  { path: '/services',                               priority: 0.8, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/blog',                                   priority: 0.7, changeFrequency: 'weekly'  as ChangeFrequency },
  { path: '/contact',                                priority: 0.6, changeFrequency: 'yearly'  as ChangeFrequency },
  { path: '/mentions-legales',                       priority: 0.3, changeFrequency: 'yearly'  as ChangeFrequency },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [];
  const now = new Date();

  for (const route of routes) {
    for (const locale of SITE.locales) {
      const url = `${SITE.url}/${locale}${route.path}`;
      const alternates: Record<string, string> = {};
      for (const l of SITE.locales) {
        alternates[l] = `${SITE.url}/${l}${route.path}`;
      }

      entries.push({
        url,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: alternates },
      });
    }
  }

  // Blog posts
  for (const slug of getAllSlugs()) {
    for (const locale of SITE.locales) {
      const url = `${SITE.url}/${locale}/blog/${slug}`;
      const alternates: Record<string, string> = {};
      for (const l of SITE.locales) {
        alternates[l] = `${SITE.url}/${l}/blog/${slug}`;
      }
      entries.push({
        url,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
