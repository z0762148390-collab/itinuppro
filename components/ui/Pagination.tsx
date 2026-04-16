import { Link } from '@/navigation';

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g. '/blog'
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const href = (page: number) =>
    page === 1 ? (basePath as any) : (`${basePath}?page=${page}` as any);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-12">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={href(currentPage - 1)}
          aria-label="Page précédente"
          className="flex items-center justify-center w-9 h-9 rounded-lg
                     text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </span>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={href(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={[
            'flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors',
            page === currentPage
              ? 'bg-brand-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-white/8',
          ].join(' ')}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={href(currentPage + 1)}
          aria-label="Page suivante"
          className="flex items-center justify-center w-9 h-9 rounded-lg
                     text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      )}
    </nav>
  );
}
