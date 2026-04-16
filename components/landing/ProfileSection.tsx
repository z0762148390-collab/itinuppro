import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function ProfileSection() {
  const t = useTranslations('profile_section');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="card p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12
                        rtl:md:flex-row-reverse">
          {/* Avatar */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="w-24 h-24 rounded-2xl bg-brand-600/20 border border-brand-600/30
                            flex items-center justify-center
                            text-brand-400 text-2xl font-bold select-none"
                 aria-hidden="true">
              ZE
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 rtl:text-right">
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">
              {t('role')}
            </p>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
              {t('name')}
            </h2>

            <div className="flex items-center gap-2 mb-5 rtl:justify-end">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" aria-hidden="true"
                   className="text-slate-500 flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-sm text-slate-500">{t('location')}</span>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm mb-3">
              {t('bio')}
            </p>

            <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">
              {t('adaptability')}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                      aria-hidden="true" />
                {t('availability')}
              </span>

              <Link href="/contact"
                    className="btn-gradient inline-flex items-center gap-1.5 px-4 py-2
                               text-sm font-semibold text-white rounded-lg">
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
