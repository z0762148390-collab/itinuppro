'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/navigation';

const PER_PAGE = 6;

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
}

interface Props {
  articles: Article[];
  locale: string;
}

export default function BlogList({ articles, locale }: Props) {
  const [query, setQuery]   = useState('');
  const [page, setPage]     = useState(1);
  const isRtl               = locale === 'ar';

  const placeholder =
    locale === 'ar' ? 'ابحث في المقالات...' :
    locale === 'en' ? 'Search articles...' :
    'Rechercher un article...';

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(
      locale === 'ar' ? 'ar-MA' : locale === 'en' ? 'en-GB' : 'fr-FR',
      { year: 'numeric', month: 'long', day: 'numeric' },
    );

  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    if (!query.trim()) return articles;
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query, articles]);

  const totalPages   = isSearching ? 1 : Math.ceil(filtered.length / PER_PAGE);
  const currentPage  = Math.min(page, totalPages || 1);
  const visible      = isSearching
    ? filtered
    : filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const resultLabel =
    locale === 'ar' ? `${filtered.length} نتيجة` :
    locale === 'en' ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}` :
    `${filtered.length} résultat${filtered.length !== 1 ? 's' : ''}`;

  const noResults =
    locale === 'ar' ? 'لا توجد مقالات مطابقة.' :
    locale === 'en' ? 'No articles found.' :
    'Aucun article trouvé.';

  const ariaLabel =
    locale === 'ar' ? 'مقالات المدونة' :
    locale === 'en' ? 'Blog articles' :
    'Articles de blog';

  return (
    <div dir={isRtl ? 'rtl' : undefined}>

      {/* Search bar */}
      <div className="relative mb-10">
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder={placeholder}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl
                     px-5 py-3.5 text-white placeholder-slate-600 text-sm
                     focus:outline-none focus:border-brand-600 transition-colors
                     [&::-webkit-search-cancel-button]:cursor-pointer"
        />
        <svg
          className={`absolute top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 pointer-events-none
                      ${isRtl ? 'left-4' : 'right-4'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* Result count */}
      {isSearching && (
        <p className="text-xs text-slate-600 mb-5">{resultLabel}</p>
      )}

      {/* Article list */}
      {visible.length === 0 ? (
        <p className="text-slate-500 text-center py-16">{noResults}</p>
      ) : (
        <ol className="space-y-4" aria-label={ariaLabel}>
          {visible.map(({ slug, title, description, date, readingTime, tags }) => (
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
      )}

      {/* Pagination — state-based, hidden during search */}
      {!isSearching && totalPages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label={locale === 'ar' ? 'الصفحة السابقة' : locale === 'en' ? 'Previous page' : 'Page précédente'}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors
                       text-slate-400 hover:text-white hover:bg-white/8
                       disabled:text-slate-700 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
              className={[
                'flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors',
                p === currentPage
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/8',
              ].join(' ')}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label={locale === 'ar' ? 'الصفحة التالية' : locale === 'en' ? 'Next page' : 'Page suivante'}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors
                       text-slate-400 hover:text-white hover:bg-white/8
                       disabled:text-slate-700 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}
