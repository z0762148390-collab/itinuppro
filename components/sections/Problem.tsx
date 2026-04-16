import { useTranslations } from 'next-intl';

const ICONS = [
  // Clock — time loss
  <svg key="clock" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>,
  // Shield alert — security
  <svg key="shield" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>,
  // Lightbulb — idea stuck
  <svg key="bulb" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <line x1="9"  y1="18" x2="15" y2="18"/>
    <line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/>
  </svg>,
];

const ICON_COLORS = [
  'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'text-red-400    bg-red-400/10    border-red-400/20',
  'text-violet-400 bg-violet-400/10 border-violet-400/20',
];

export default function Problem() {
  const t = useTranslations('problem');
  const cards = [t('card1'), t('card2'), t('card3')] as const;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12 tracking-tight rtl:text-right">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div key={i} className="card p-6 flex flex-col gap-4 rtl:items-end">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                              border flex-shrink-0 ${ICON_COLORS[i]}`}>
                {ICONS[i]}
              </div>
              <p className="text-slate-300 font-medium leading-snug rtl:text-right">{card}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
