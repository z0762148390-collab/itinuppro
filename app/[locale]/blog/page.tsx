import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import Pagination from '@/components/ui/Pagination';
import { getAllSlugs, getPost } from '@/lib/blog-posts';
import { getBlogSchema } from '@/lib/schemas';

const PER_PAGE = 6;

interface Props {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.blog' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${SITE.url}/${locale}/blog` },
    openGraph: { type: 'website', url: `${SITE.url}/${locale}/blog` },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: 'blog_page_content' });

  const allSlugs = getAllSlugs();
  const articles = allSlugs
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

  const totalPages = Math.ceil(articles.length / PER_PAGE);
  const currentPage = Math.min(Math.max(Number(sp?.page ?? 1), 1), totalPages || 1);
  const paged = articles.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(
      locale === 'ar' ? 'ar-MA' : locale === 'en' ? 'en-GB' : 'fr-FR',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );

  const blogSchema = getBlogSchema();

  return (
    <>
      <JsonLd schema={blogSchema} />
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
        <div className="max-w-3xl mx-auto">

          <div className="text-center rtl:text-right mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              {t('h1')}
            </h1>
            <p className="text-xl text-slate-400">{t('subtitle')}</p>
          </div>

          <ol className="space-y-4" aria-label={locale === 'ar' ? 'مقالات المدونة' : locale === 'en' ? 'Blog articles' : 'Articles de blog'}>
            {paged.map(({ slug, title, description, date, readingTime, tags }) => (
              <li key={slug}>
                <Link
                  href={`/blog/${slug}` as any}
                  className="group card p-6 flex flex-col gap-3 block"
                >
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <time dateTime={date}>{fmt(date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{readingTime} min</span>
                    {tags[0] && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-brand-600">{tags[0]}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-bold text-white text-lg leading-snug
                                 group-hover:text-brand-400 transition-colors">
                    {title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </Link>
              </li>
            ))}
          </ol>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>
      </div>
    </>
  );
}
