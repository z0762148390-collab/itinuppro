import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top grid — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Col 1 — brand info */}
          <div className="flex flex-col gap-3">
            <span className="text-base font-semibold text-slate-100">{SITE.name}</span>
            <p className="text-sm text-slate-400 leading-relaxed">{t('tagline')}</p>
            <address className="not-italic text-xs text-slate-500 leading-relaxed">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(t('address'))}`}
                target="_blank" rel="noopener noreferrer"
                aria-label={t('maps_label')}
                className="hover:text-slate-300 transition-colors">
                {t('address')}
              </a>
            </address>
            <p className="text-xs text-slate-600">{t('legal')}</p>
            <p className="text-xs text-slate-600">{t('activity')}</p>
          </div>

          {/* Col 2 — services */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('services_title')}
            </span>
            <nav aria-label="Services" className="flex flex-col gap-2 text-sm text-slate-400">
              {[
                { href: '/services' as const, label: t('java_label')   },
                { href: '/services' as const, label: t('tibco_label')  },
                { href: '/services' as const, label: t('devops_label') },
                { href: '/services' as const, label: t('appweb_label') },
                { href: '/services' as const, label: t('site_label')   },
              ].map(({ href, label }) => (
                <Link key={label} href={href}
                      className="hover:text-slate-100 transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — links + contact */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('links_title')}
            </span>
            <nav aria-label="Footer" className="flex flex-col gap-2 text-sm text-slate-400">
              {[
                { href: '/services'         as const, label: 'Services'      },
                { href: '/blog'             as const, label: 'Blog'          },
                { href: '/contact'          as const, label: 'Contact'       },
                { href: '/mentions-legales' as const, label: t('legal_link') },
              ].map(({ href, label }) => (
                <Link key={href} href={href}
                      className="hover:text-slate-100 transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
            <a href={`mailto:${SITE.email}`}
               className="mt-1 text-sm text-slate-500 hover:text-brand-400 transition-colors w-fit">
              {SITE.email}
            </a>
          </div>

        </div>

        {/* Bottom bar — rights */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-600 text-center">
          {t('rights')}
        </div>

      </div>
    </footer>
  );
}
