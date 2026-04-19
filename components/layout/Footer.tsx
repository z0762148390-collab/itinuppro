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

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4 mt-1">
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
                 aria-label="LinkedIn — Zouhir Echarif"
                 className="text-slate-500 hover:text-brand-400 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href={SITE.malt} target="_blank" rel="noopener noreferrer"
                 aria-label="Profil Malt — Zouhir Echarif"
                 className="text-xs font-semibold text-slate-500 hover:text-brand-400 transition-colors">
                Malt
              </a>
              <a href={SITE.freelanceInfo} target="_blank" rel="noopener noreferrer"
                 aria-label="Profil Freelance-informatique — Zouhir Echarif"
                 className="text-xs font-semibold text-slate-500 hover:text-brand-400 transition-colors">
                FI
              </a>
            </div>
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
