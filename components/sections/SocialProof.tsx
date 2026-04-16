import { useTranslations } from 'next-intl';

const STEPS = [
  { t: 'step1_title', d: 'step1_desc', n: '01' },
  { t: 'step2_title', d: 'step2_desc', n: '02' },
  { t: 'step3_title', d: 'step3_desc', n: '03' },
  { t: 'step4_title', d: 'step4_desc', n: '04' },
] as const;

export default function SocialProof() {
  const t = useTranslations('social_proof');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center tracking-tight mb-4 rtl:text-right">
          {t('title')}
        </h2>

        {/* Availability badge */}
        <div className="flex justify-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5
                           bg-green-400/8 text-green-400 text-sm font-medium
                           rounded-full border border-green-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true"/>
            {t('badge_availability')}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector */}
          <div className="hidden md:block absolute left-[21px] rtl:left-auto rtl:right-[21px]
                          top-6 bottom-6 w-px bg-gradient-to-b from-brand-600/60 via-brand-600/20 to-transparent"
               aria-hidden="true"/>

          <ol className="space-y-8">
            {STEPS.map(({ t: titleKey, d: descKey, n }) => (
              <li key={titleKey} className="flex gap-5 md:gap-7 rtl:flex-row-reverse">
                {/* Step number */}
                <div className="flex-shrink-0 w-11 h-11 rounded-full
                                bg-brand-600/15 border border-brand-600/30
                                text-brand-400 text-xs font-bold
                                flex items-center justify-center z-10">
                  {n}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 rtl:text-right">
                  <h3 className="font-bold text-white text-base">{t(titleKey)}</h3>
                  <p className="text-slate-400 mt-1 text-sm leading-relaxed">{t(descKey)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
