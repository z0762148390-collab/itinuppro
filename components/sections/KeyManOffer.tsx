import { useTranslations } from 'next-intl';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
         className="text-brand-400 flex-shrink-0" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export default function KeyManOffer() {
  const t = useTranslations('keyman');
  const checklist = t.raw('checklist') as string[];

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[300px] bg-brand-600/8 rounded-full blur-3xl
                      pointer-events-none" aria-hidden="true"/>

      <div className="relative max-w-4xl mx-auto text-center rtl:text-right">
        <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold
                         bg-brand-600/15 text-brand-400 border border-brand-600/25 uppercase tracking-wider">
          Offre phare
        </span>

        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">{t('title')}</h2>
        <p className="text-slate-400 text-lg mb-10">{t('subtitle')}</p>

        {/* Checklist */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left rtl:text-right
                       mb-10 max-w-2xl mx-auto">
          {checklist.map((item) => (
            <li key={item}
                className="flex items-center gap-3 p-3 rounded-xl
                           bg-slate-900/60 border border-white/6 rtl:flex-row-reverse">
              <CheckIcon/>
              <span className="text-slate-200 text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>

        {/* Tagline */}
        <p className="text-xl font-bold text-white mb-6">{t('tagline')}</p>

        {/* Differentiator */}
        <blockquote className="max-w-2xl mx-auto px-5 py-4 rounded-xl
                               bg-slate-900/70 border border-brand-600/20
                               text-slate-400 text-sm italic leading-relaxed
                               text-left rtl:text-right
                               border-l-2 rtl:border-l-0 rtl:border-r-2 border-brand-500">
          {t('differentiator')}
        </blockquote>
      </div>
    </section>
  );
}
