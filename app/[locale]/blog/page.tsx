import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import BlogList from '@/components/blog/BlogList';
import { getAllSlugs, getPost } from '@/lib/blog-posts';
import { getBlogSchema } from '@/lib/schemas';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.blog' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE.url}/${locale}/blog`,
      languages: {
        fr:          `${SITE.url}/fr/blog`,
        en:          `${SITE.url}/en/blog`,
        ar:          `${SITE.url}/ar/blog`,
        'x-default': `${SITE.url}/fr/blog`,
      },
    },
    openGraph: { type: 'website', url: `${SITE.url}/${locale}/blog` },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog_page_content' });

  const articles = getAllSlugs()
    .map((slug) => {
      const post = getPost(slug, locale);
      return post ? { slug, ...post } : null;
    })
    .filter(Boolean)
    .sort((a, b) => (a!.date < b!.date ? 1 : -1)) as Array<{
      slug: string;
      title: string;
      description: string;
      date: string;
      readingTime: number;
      tags: string[];
      category: string;
    }>;

  return (
    <>
      <JsonLd schema={getBlogSchema()} />
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
        <div className="max-w-3xl mx-auto">

          <div className="text-center rtl:text-right mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              {t('h1')}
            </h1>
            <p className="text-xl text-slate-400">{t('subtitle')}</p>
          </div>

          <BlogList articles={articles} locale={locale} />

        </div>
      </div>
    </>
  );
}
