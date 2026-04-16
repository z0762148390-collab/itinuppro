import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

const ROWS = [
  { labelKey: 'row1_label', freelanceKey: 'row1_freelance', agencyKey: 'row1_agency' },
  { labelKey: 'row2_label', freelanceKey: 'row2_freelance', agencyKey: 'row2_agency' },
  { labelKey: 'row3_label', freelanceKey: 'row3_freelance', agencyKey: 'row3_agency' },
  { labelKey: 'row4_label', freelanceKey: 'row4_freelance', agencyKey: 'row4_agency' },
  { labelKey: 'row5_label', freelanceKey: 'row5_freelance', agencyKey: 'row5_agency' },
] as const;

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
         className="text-brand-400 flex-shrink-0" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
         className="text-slate-600 flex-shrink-0" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function ComparisonTable() {
  const t = useTranslations('comparison');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center tracking-tight mb-3
                       rtl:text-right">
          {t('title')}
        </h2>
        <p className="text-slate-400 text-center mb-12 rtl:text-right">
          {t('subtitle')}
        </p>

        <div className="rounded-2xl overflow-hidden border border-slate-800/80">
          {/* Header */}
          <div className="grid grid-cols-3 bg-slate-900/80">
            <div className="px-5 py-4" />
            <div className="px-5 py-4 text-center">
              <span className="text-sm font-bold text-brand-400">
                {t('col_freelance')}
              </span>
            </div>
            <div className="px-5 py-4 text-center border-l border-slate-800">
              <span className="text-sm font-semibold text-slate-500">
                {t('col_agency')}
              </span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map(({ labelKey, freelanceKey, agencyKey }, i) => (
            <div
              key={labelKey}
              className={`grid grid-cols-3 border-t border-slate-800/60
                          ${i % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/20'}`}>
              {/* Label */}
              <div className="px-5 py-4 flex items-center">
                <span className="text-sm text-slate-400 font-medium rtl:text-right">
                  {t(labelKey)}
                </span>
              </div>

              {/* Freelance value */}
              <div className="px-5 py-4 flex items-center justify-center gap-2">
                <CheckIcon />
                <span className="text-sm text-white font-medium text-center">
                  {t(freelanceKey)}
                </span>
              </div>

              {/* Agency value */}
              <div className="px-5 py-4 flex items-center justify-center gap-2
                              border-l border-slate-800/60">
                <XIcon />
                <span className="text-sm text-slate-500 text-center">
                  {t(agencyKey)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/contact"
                className="btn-gradient inline-flex items-center gap-2 px-6 py-3
                           text-sm font-semibold text-white rounded-xl">
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
