import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { Link } from '@/navigation';
import JsonLd from '@/components/ui/JsonLd';
import { getServicesLocalBusinessSchema } from '@/lib/schemas';

interface Props { params: Promise<{ locale: string }> }

type PageHref =
  | '/contact'
  | '/application-web-france'
  | '/creation-site-france'
  | '/devops-france'
  | '/java-spring-boot-freelance-france'
  | '/tibco-freelance-france'
  | '/mentions-legales';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.services' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE.url}/${locale}/services`,
      languages: {
        fr: `${SITE.url}/fr/services`,
        en: `${SITE.url}/en/services`,
        ar: `${SITE.url}/ar/services`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE.url}/${locale}/services`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

/* ── Sub-components ─────────────────────────────────────────── */

function StackTag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-500 border border-slate-700/40 font-mono">
      {label}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services_page' });

  const s1Stack     = t.raw('s1_stack')         as string[];
  const s2Stack     = t.raw('s2_stack')         as string[];
  const s3Stack     = t.raw('s3_stack')         as string[];
  const s4Stack     = t.raw('s4_stack')         as string[];
  const s5Stack     = t.raw('s5_stack')         as string[];
  const keymanCheck = t.raw('keyman_checklist') as string[];

  const minorServices: Array<{
    title: string; benefit: string; desc: string;
    stack: string[]; cta: string; href: PageHref;
  }> = [
    {
      title:   t('s2_title'),
      benefit: t('s2_benefit'),
      desc:    t('s2_desc'),
      stack:   s2Stack,
      cta:     t('s2_cta'),
      href:    '/application-web-france',
    },
    {
      title:   t('s3_title'),
      benefit: t('s3_benefit'),
      desc:    t('s3_desc'),
      stack:   s3Stack,
      cta:     t('s3_cta'),
      href:    '/creation-site-france',
    },
    {
      title:   t('s4_title'),
      benefit: t('s4_benefit'),
      desc:    t('s4_desc'),
      stack:   s4Stack,
      cta:     t('s4_cta'),
      href:    '/java-spring-boot-freelance-france',
    },
    {
      title:   t('s5_title'),
      benefit: t('s5_benefit'),
      desc:    t('s5_desc'),
      stack:   s5Stack,
      cta:     t('s5_cta'),
      href:    '/tibco-freelance-france',
    },
  ];

  return (
    <>
      <JsonLd schema={getServicesLocalBusinessSchema()} />

      <div className="bg-slate-950 min-h-screen">

        {/* ── 1. Hero ─────────────────────────────────────────── */}
        <section className="pt-20 pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rtl:text-right">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
              {t('h1')}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">{t('subtitle')}</p>
          </div>
        </section>

        {/* ── 2. Services ─────────────────────────────────────── */}
        <section aria-label="Services" className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-5xl mx-auto space-y-5">

            {/* DevOps — highlighted main card */}
            <div className="relative bg-slate-900 border border-brand-500/25 rounded-2xl p-8
                            shadow-lg shadow-brand-500/5 overflow-hidden">
              {/* Subtle radial glow in top-right corner */}
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full
                              bg-brand-500/8 blur-3xl pointer-events-none" aria-hidden="true" />

              {/* Badge */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold
                                 text-brand-400 bg-brand-500/10 border border-brand-500/20
                                 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"
                        aria-hidden="true" />
                  {t('s1_badge')}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    {t('s1_title')}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                    {t('s1_benefit')}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-6 max-w-xl">{t('s1_desc')}</p>
                  <div className="flex flex-wrap gap-2">
                    {s1Stack.map((tag) => <StackTag key={tag} label={tag} />)}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={'/contact' as PageHref}
                    aria-label={t('s1_cta')}
                    className="btn-gradient inline-flex items-center justify-center
                               px-7 py-3.5 text-white font-semibold rounded-xl whitespace-nowrap"
                  >
                    {t('s1_cta')}
                  </Link>
                  <p className="text-xs text-slate-600 text-center mt-2">{t('reassurance_1')}</p>
                </div>
              </div>
            </div>

            {/* 3-column grid — Dev web, Site web, Offre clé en main teaser */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Services 2 & 3 */}
              {minorServices.map(({ title, benefit, desc, stack, cta, href }) => (
                <div key={title} className="card p-7 flex flex-col gap-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    {title}
                  </p>
                  <h2 className="text-xl font-bold text-white leading-snug">{benefit}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map((tag) => <StackTag key={tag} label={tag} />)}
                  </div>
                  <Link
                    href={href}
                    aria-label={cta}
                    className="inline-flex items-center gap-1.5 text-brand-400 font-medium
                               text-sm hover:text-brand-300 transition-colors mt-auto"
                  >
                    {cta} <ArrowIcon />
                  </Link>
                </div>
              ))}

              {/* Offre clé en main — compact teaser card */}
              <div className="card border-brand-500/15 p-7 flex flex-col gap-4">
                <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest">
                  {t('keyman_title')}
                </p>
                <h2 className="text-xl font-bold text-white leading-snug">
                  {t('keyman_benefit')}
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">
                  {t('keyman_teaser')}
                </p>
                <a
                  href="#keyman"
                  aria-label={t('keyman_cta')}
                  className="inline-flex items-center gap-1.5 text-brand-400 font-medium
                             text-sm hover:text-brand-300 transition-colors mt-auto"
                >
                  {t('keyman_cta')} <ArrowIcon />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. Offre clé en main — expanded ─────────────────── */}
        <section id="keyman" aria-labelledby="keyman-heading"
                 className="px-4 sm:px-6 lg:px-8 py-20
                            bg-slate-900/50 border-t border-b border-slate-800/80">
          <div className="max-w-4xl mx-auto">

            <div className="text-center rtl:text-right mb-12">
              <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">
                {t('keyman_title')}
              </p>
              <h2 id="keyman-heading"
                  className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                {t('keyman_benefit')}
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">{t('keyman_desc')}</p>
            </div>

            {/* Checklist 2-col */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12"
                aria-label="Inclus dans l'offre">
              {keymanCheck.map((item) => (
                <li key={item}
                    className="flex items-start gap-3 p-4 bg-slate-800/50
                               border border-slate-700/40 rounded-xl rtl:flex-row-reverse rtl:text-right">
                  <CheckIcon />
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* Tagline */}
            <p className="text-center text-white font-semibold text-xl mb-8 rtl:text-right">
              {t('keyman_tagline')}
            </p>

            <div className="flex justify-center">
              <Link
                href={'/contact' as PageHref}
                aria-label={t('keyman_cta')}
                className="btn-gradient inline-flex items-center justify-center
                           px-10 py-4 text-white font-semibold rounded-xl text-lg"
              >
                {t('keyman_cta')}
              </Link>
            </div>

          </div>
        </section>

        {/* ── 4. Reassurance band ──────────────────────────────── */}
        <section aria-label="Garanties" className="px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                label: t('reassurance_1'),
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
                label: t('reassurance_2'),
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                ),
                label: t('reassurance_3'),
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                ),
                label: t('reassurance_4'),
              },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-3 rtl:text-right">
                {icon}
                <span className="text-slate-400 text-sm leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. CTA final ─────────────────────────────────────── */}
        <section aria-labelledby="cta-final-heading"
                 className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/80 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 id="cta-final-heading"
                className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('cta_title')}
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">{t('cta_subtitle')}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center rtl:flex-row-reverse mb-5">
              <Link
                href={'/contact' as PageHref}
                aria-label={t('cta_primary')}
                className="btn-gradient inline-flex items-center justify-center
                           px-8 py-4 text-white font-semibold rounded-xl"
              >
                {t('cta_primary')}
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('cta_whatsapp')}
                className="inline-flex items-center justify-center px-8 py-4
                           border border-green-500/30 text-green-400 font-semibold rounded-xl
                           hover:bg-green-500/10 transition-colors"
              >
                {t('cta_whatsapp')}
              </a>
            </div>

            <p className="text-slate-600 text-sm">{t('cta_micro')}</p>
          </div>
        </section>

      </div>
    </>
  );
}
