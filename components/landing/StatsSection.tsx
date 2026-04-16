import { useTranslations } from 'next-intl';

export default function StatsSection() {
  const t = useTranslations('stats');
  const yearsExp = new Date().getFullYear() - 2019;

  const STATS = [
    { value: `${yearsExp}+`, labelKey: 's1_label' },
    { value: '30+',          labelKey: 's2_label' },
    { value: '<48h',         labelKey: 's3_label' },
    { value: '3',            labelKey: 's4_label' },
  ] as const;

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-xs font-semibold text-slate-500 uppercase
                       tracking-widest mb-10 rtl:text-right">
          {t('title')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, labelKey }) => (
            <div key={labelKey}
                 className="flex flex-col items-center text-center gap-2
                            bg-slate-900/50 border border-slate-800/80
                            rounded-2xl px-4 py-6 rtl:text-right">
              <span className="text-4xl font-bold text-white tracking-tight">
                {value}
              </span>
              <span className="text-xs text-slate-500 leading-snug max-w-[140px]">
                {t(labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
