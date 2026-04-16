import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

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
  { path: '', priority: 1.0, changeFrequency: 'weekly' as ChangeFrequency },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/devops-france', priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/devops-montpellier', priority: 0.8, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/creation-site-france', priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/creation-site-montpellier', priority: 0.8, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/application-web-france', priority: 0.9, changeFrequency: 'monthly' as ChangeFrequency },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as ChangeFrequency },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as ChangeFrequency },
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

  return entries;
}
