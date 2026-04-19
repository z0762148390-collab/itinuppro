'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import dynamic from 'next/dynamic';

/* Load canvas only client-side — no SSR needed */
const CloudNetwork = dynamic(() => import('@/components/landing/CloudNetwork'), { ssr: false });

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
         aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const launchHref = locale === 'fr' ? '/lancer-mon-projet' : '/start-my-project';
  const launchText = locale === 'ar' ? 'أطلق مشروعي' : locale === 'en' ? 'Launch my project' : 'Lancer mon projet';

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24 px-4 sm:px-6 lg:px-8">

      {/* Dot grid */}
      <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true"/>

      {/* Radial glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px]
                      bg-brand-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"/>

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── Left : text content ── */}
          <div className="flex-1 text-center lg:text-left rtl:lg:text-right">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5
                            bg-brand-600/10 text-brand-400 text-sm font-medium
                            rounded-full border border-brand-600/20 badge-glow">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"/>
              Disponible — réponse sous 48h
            </div>

            <h1 className="headline-gradient text-4xl sm:text-5xl lg:text-[3.25rem] font-bold
                           leading-tight tracking-tight mb-6">
              {t('headline')}
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed
                          max-w-xl mb-10 mx-auto lg:mx-0 rtl:text-right">
              {t('subheadline')}
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start
                            justify-center lg:justify-start
                            gap-4 rtl:flex-row-reverse">
              <Link
                href="/contact"
                aria-label={t('cta_primary')}
                className="btn-gradient w-full sm:w-auto inline-flex items-center
                           justify-center px-8 py-4 text-white font-semibold
                           rounded-xl text-base">
                {t('cta_primary')}
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank" rel="noopener noreferrer"
                aria-label={t('cta_whatsapp')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                           px-8 py-4 bg-green-500/10 text-green-400 border border-green-500/25
                           font-semibold rounded-xl text-base
                           hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-200">
                <WhatsAppIcon/>
                {t('cta_whatsapp')}
              </a>
            </div>

            <p className="mt-9 text-xs text-slate-600 tracking-wide text-center lg:text-left rtl:text-right">
              Basé à Montpellier · France entière en remote · SIRET 999 008 329 00016
            </p>
            <p className="mt-4 text-center lg:text-left rtl:text-right">
              <Link href={launchHref}
                className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                → {launchText}
              </Link>
            </p>
          </div>

          {/* ── Right : 3D Cloud Network animation ── */}
          <div className="hidden lg:block flex-shrink-0 w-[420px] h-[360px]
                          rounded-3xl overflow-hidden
                          border border-white/5 bg-slate-900/30
                          shadow-[0_0_60px_-15px_rgba(37,99,235,0.3)]">
            <CloudNetwork />
          </div>

        </div>
      </div>
    </section>
  );
}
