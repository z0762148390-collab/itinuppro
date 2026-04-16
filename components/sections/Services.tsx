import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

const ICONS = [
  // DevOps — server rack
  <svg key="devops" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="4" rx="1"/>
    <rect x="2" y="10" width="20" height="4" rx="1"/>
    <rect x="2" y="17" width="20" height="4" rx="1"/>
    <line x1="6" y1="5"  x2="6.01" y2="5"/>
    <line x1="6" y1="12" x2="6.01" y2="12"/>
    <line x1="6" y1="19" x2="6.01" y2="19"/>
  </svg>,
  // Web app — code brackets
  <svg key="webapp" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>,
  // Website — globe
  <svg key="globe" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>,
  // Turnkey — package
  <svg key="pkg" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>,
];

const ICON_COLORS = [
  'text-brand-400  bg-brand-400/10  border-brand-400/20',
  'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'text-green-400  bg-green-400/10  border-green-400/20',
  'text-orange-400 bg-orange-400/10 border-orange-400/20',
];

const ITEMS = [
  { t: 's1_title', d: 's1_desc', h: 's1_href' },
  { t: 's2_title', d: 's2_desc', h: 's2_href' },
  { t: 's3_title', d: 's3_desc', h: 's3_href' },
  { t: 's4_title', d: 's4_desc', h: 's4_href' },
] as const;

export default function Services() {
  const t = useTranslations('services');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center tracking-tight mb-12 rtl:text-right">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ITEMS.map(({ t: titleKey, d: descKey, h: hrefKey }, i) => (
            <Link
              key={titleKey}
              href={t(hrefKey) as '/devops-france' | '/application-web-france' | '/creation-site-france' | '/contact'}
              className="group card p-6 flex flex-col gap-4 rtl:items-end"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                              border flex-shrink-0 ${ICON_COLORS[i]}
                              group-hover:scale-105 transition-transform duration-200`}>
                {ICONS[i]}
              </div>
              <div className="rtl:text-right">
                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-brand-400 transition-colors">
                  {t(titleKey)}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t(descKey)}</p>
              </div>
              <span className="mt-auto text-brand-400 text-sm font-medium
                               group-hover:underline rtl:self-start ltr:self-end
                               flex items-center gap-1">
                En savoir plus
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"
                     className="group-hover:translate-x-0.5 transition-transform">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
