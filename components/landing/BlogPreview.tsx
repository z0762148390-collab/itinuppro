import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { getAllSlugs, getPost } from '@/lib/blog-posts';

interface Props {
  locale: string;
}

const PREVIEW_SLUGS = [
  'freelance-devops-vs-agence-it',
  'combien-coute-freelance-devops-france-2025',
  'cicd-startup-sans-ingenieur-devops',
];

export default function BlogPreview({ locale }: Props) {
  const t = useTranslations('blog_preview');

  const allSlugs = getAllSlugs();
  const slugs = PREVIEW_SLUGS.filter((s) => allSlugs.includes(s));

  const posts = slugs
    .map((slug) => ({ slug, data: getPost(slug, locale) }))
    .filter((p): p is { slug: string; data: NonNullable<ReturnType<typeof getPost>> } =>
      p.data !== undefined,
    );

  if (posts.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end
                        justify-between gap-4 mb-12 rtl:flex-row-reverse">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2 rtl:text-right">
              {t('title')}
            </h2>
            <p className="text-slate-400 rtl:text-right">{t('subtitle')}</p>
          </div>
          <Link href="/blog"
                className="flex-shrink-0 text-sm font-medium text-brand-400
                           hover:text-brand-300 transition-colors whitespace-nowrap">
            {t('cta')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(({ slug, data }) => (
            <Link
              key={slug}
              href={`/blog/${slug}` as `/blog/${string}`}
              className="card p-6 flex flex-col gap-3 group">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {data.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-brand-400
                               bg-brand-500/10 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-bold text-white text-base leading-snug
                             group-hover:text-brand-300 transition-colors
                             rtl:text-right line-clamp-3">
                {data.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed rtl:text-right
                            line-clamp-2 flex-1">
                {data.description}
              </p>

              {/* Reading time */}
              <p className="text-xs text-slate-600 rtl:text-right">
                {data.readingTime} {t('read_min')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
