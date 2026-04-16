import { useTranslations } from 'next-intl';

const PILLARS = [
  {
    key: 'pillar1' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  },
  {
    key: 'pillar2' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: 'text-brand-400 bg-brand-400/10 border-brand-400/20',
  },
  {
    key: 'pillar3' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 8 12 12 14 14"/>
      </svg>
    ),
    color: 'text-green-400 bg-green-400/10 border-green-400/20',
  },
] as const;

export default function Solution() {
  const t = useTranslations('solution');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center tracking-tight mb-4 rtl:text-right">
          {t('title')}
        </h2>

        <p className="text-slate-400 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12 rtl:text-right">
          {t('text')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PILLARS.map(({ key, icon, color }) => (
            <div key={key} className="card p-6 flex flex-col items-center text-center gap-3 rtl:items-end rtl:text-right">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0 ${color}`}>
                {icon}
              </div>
              <span className="font-semibold text-white text-lg">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
