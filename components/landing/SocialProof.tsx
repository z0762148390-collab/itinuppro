import { useTranslations } from 'next-intl';

const SECTORS = [
  { icon: '🏭', key: 'sector_industry' },
  { icon: '🏥', key: 'sector_health' },
  { icon: '💼', key: 'sector_finance' },
  { icon: '🛒', key: 'sector_retail' },
  { icon: '🚀', key: 'sector_startups' },
  { icon: '🏛️', key: 'sector_public' },
] as const;

export default function LandingSocialProof() {
  const t = useTranslations('social_proof');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center tracking-tight mb-10 rtl:text-right">
          {t('sectors_title')}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SECTORS.map(({ icon, key }) => (
            <div
              key={key}
              className="flex items-center gap-3 bg-slate-900/50 border border-slate-800/80
                         rounded-xl px-4 py-3 rtl:flex-row-reverse">
              <span className="text-2xl leading-none" aria-hidden="true">{icon}</span>
              <span className="text-sm font-medium text-slate-300">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
