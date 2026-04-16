import { useTranslations } from 'next-intl';

const CLIENTS = [
  { name: 'Capgemini', accent: 'from-blue-500/20 to-blue-600/10',  dot: 'bg-blue-500'   },
  { name: 'Inetum',    accent: 'from-cyan-500/20 to-cyan-600/10',   dot: 'bg-cyan-400'   },
  { name: 'AMUE',      accent: 'from-violet-500/20 to-violet-600/10', dot: 'bg-violet-400' },
  { name: 'Airbus',    accent: 'from-sky-500/20 to-sky-600/10',     dot: 'bg-sky-400'    },
  { name: 'AIFE',      accent: 'from-emerald-500/20 to-emerald-600/10', dot: 'bg-emerald-400' },
];

const ITEMS = [...CLIENTS, ...CLIENTS];

export default function ClientsSlider() {
  const t = useTranslations('clients');

  return (
    <section className="py-14 border-y border-white/5 bg-slate-950/60">
      <p className="text-center text-[11px] font-semibold text-slate-500 uppercase
                    tracking-[0.2em] mb-10">
        {t('title')}
      </p>

      <div className="clients-strip overflow-hidden
                      [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex items-center gap-5 w-max">
          {ITEMS.map(({ name, accent, dot }, i) => (
            <div
              key={`${name}-${i}`}
              className={`group flex items-center gap-3 px-6 py-3.5 rounded-2xl
                          bg-gradient-to-br ${accent}
                          border border-white/8 hover:border-white/20
                          transition-all duration-300 cursor-default select-none
                          hover:scale-105 hover:shadow-lg hover:shadow-black/30`}>
              {/* Colored dot */}
              <span className={`w-2 h-2 rounded-full ${dot} opacity-70
                                group-hover:opacity-100 transition-opacity shrink-0`}
                    aria-hidden="true" />
              {/* Company name */}
              <span className="text-slate-400 group-hover:text-slate-100
                               font-semibold text-sm tracking-wide
                               transition-colors duration-300 whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
