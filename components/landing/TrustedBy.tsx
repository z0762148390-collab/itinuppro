import { useTranslations } from 'next-intl';

const CLIENTS = [
  { name: 'AMUE',      ariaLabel: 'AMUE — Enseignement supérieur' },
  { name: 'Inetum',    ariaLabel: 'Inetum — ESN française'        },
  { name: 'Capgemini', ariaLabel: 'Capgemini — Conseil & IT'       },
  { name: 'Airbus',    ariaLabel: 'Airbus — Aéronautique'          },
  { name: 'AIFE',      ariaLabel: 'AIFE — Secteur public'          },
] as const;

export default function TrustedBy() {
  const t = useTranslations('trusted_by');

  return (
    <section className="py-14 bg-slate-900/50 border-t border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-xs text-slate-500 uppercase tracking-widest text-center mb-8">
          {t('title')}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {CLIENTS.map(({ name, ariaLabel }) => (
            <span
              key={name}
              aria-label={ariaLabel}
              className="px-6 py-3 rounded-xl border border-slate-700/40
                         bg-slate-800/50 text-slate-400 font-semibold
                         tracking-wider text-sm uppercase">
              {name}
            </span>
          ))}
        </div>

        {/* GEO SEO — visible aux crawlers, masqué visuellement */}
        <p className="sr-only">{t('seo_text')}</p>

      </div>
    </section>
  );
}
