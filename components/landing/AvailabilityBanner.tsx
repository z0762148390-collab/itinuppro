import { useTranslations } from 'next-intl';

export default function AvailabilityBanner() {
  const t = useTranslations('availability');

  return (
    <div className="py-5 px-4 flex justify-center">
      <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2
                      text-sm text-slate-400">
        {/* Status */}
        <span className="inline-flex items-center gap-2 font-medium text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          {t('status')}
        </span>

        <span className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />

        {/* Delay */}
        <span>{t('delay')}</span>

        <span className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />

        {/* Remote */}
        <span>{t('remote')}</span>
      </div>
    </div>
  );
}
