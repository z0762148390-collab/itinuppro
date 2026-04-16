import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import { getFAQSchema, getServiceSchema, getServiceBreadcrumbSchema } from '@/lib/schemas';
import type { FAQ } from '@/types';

interface UseCase { title: string; desc: string }
interface Props { params: Promise<{ locale: string }> }

const SLUG = 'tibco-freelance-france';
const KNOW_ABOUT = [
  'TIBCO BusinessWorks', 'TIBCO EMS', 'TIBCO BW6', 'TIBCO ActiveSpaces',
  'TIBCO Rendezvous', 'TIBCO Cloud Integration', 'SOA', 'ESB',
  'REST', 'SOAP', 'XML', 'JSON', 'Oracle', 'Kafka', 'JMS',
];
const KEYWORDS = [
  'freelance tibco france',
  'consultant tibco businessworks freelance',
  'mission tibco integration remote',
  'freelance tibco montpellier',
  'expert tibco bw6 freelance',
  'intégration tibco ems freelance france',
  'freelance tibco senior remote',
  'mission tibco pme entreprise france',
  'tarif freelance tibco',
  'consultant tibco occitanie',
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.tibco' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: KEYWORDS,
    alternates: {
      canonical: `${SITE.url}/${locale}/${SLUG}`,
      languages: {
        fr: `${SITE.url}/fr/${SLUG}`,
        en: `${SITE.url}/en/${SLUG}`,
        ar: `${SITE.url}/ar/${SLUG}`,
        'x-default': `${SITE.url}/fr/${SLUG}`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE.url}/${locale}/${SLUG}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

export default async function TibcoPage({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'pages.tibco' });
  const t    = await getTranslations({ locale, namespace: 'tibco_content' });

  const whyItems     = t.raw('section_why_items')      as string[];
  const stackItems   = t.raw('section_stack_items')    as string[];
  const processItems = t.raw('section_process_items')  as string[];
  const usecases     = t.raw('section_usecases_items') as UseCase[];
  const faqItems     = t.raw('faq')                    as FAQ[];

  const serviceSchema = getServiceSchema({
    name: tMeta('title'),
    description: tMeta('description'),
    jobTitle: 'Consultant TIBCO Freelance',
    knowsAbout: KNOW_ABOUT,
    minPrice: '500',
    slug: SLUG,
  });
  const breadcrumb = getServiceBreadcrumbSchema(locale, tMeta('h1'), SLUG);

  return (
    <>
      <JsonLd schema={[serviceSchema, getFAQSchema(faqItems), breadcrumb]} />

      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
        <div className="max-w-3xl mx-auto">

          {/* ── Hero ─────────────────────────────────────────────── */}
          <header className="mb-14 rtl:text-right">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold
                               text-brand-400 bg-brand-500/10 border border-brand-500/20
                               rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" aria-hidden="true" />
                TIBCO · BusinessWorks · Intégration
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {tMeta('h1')}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">{t('intro')}</p>

            <div className="flex flex-col sm:flex-row gap-4 rtl:flex-row-reverse">
              <Link href="/contact"
                className="btn-gradient inline-flex items-center justify-center
                           px-8 py-4 text-white font-semibold rounded-xl">
                {t('cta_primary')}
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4
                           border border-green-500/30 text-green-400 font-semibold
                           rounded-xl hover:bg-green-500/10 transition-colors">
                {t('cta_whatsapp')}
              </a>
            </div>
            <p className="text-slate-600 text-sm mt-3 rtl:text-right">{t('cta_micro')}</p>
          </header>

          {/* ── Why ──────────────────────────────────────────────── */}
          <section className="mb-12" aria-labelledby="why-heading">
            <h2 id="why-heading" className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('section_why_title')}
            </h2>
            <ul className="space-y-3">
              {whyItems.map((item) => (
                <li key={item} className="flex items-start gap-3 rtl:flex-row-reverse rtl:text-right">
                  <svg className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Stack ────────────────────────────────────────────── */}
          <section className="mb-12" aria-labelledby="stack-heading">
            <h2 id="stack-heading" className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('section_stack_title')}
            </h2>
            <ul className="space-y-2">
              {stackItems.map((item) => (
                <li key={item}
                    className="flex items-start gap-3 p-3 bg-slate-800/50
                               border border-slate-700/40 rounded-lg
                               rtl:flex-row-reverse rtl:text-right">
                  <code className="text-brand-400 text-sm font-mono flex-shrink-0">→</code>
                  <span className="text-slate-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Process ──────────────────────────────────────────── */}
          <section className="mb-12" aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('section_process_title')}
            </h2>
            <ol className="space-y-3">
              {processItems.map((item, i) => (
                <li key={item} className="flex items-start gap-3 rtl:flex-row-reverse rtl:text-right">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500
                                   text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-slate-400 pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Use cases ────────────────────────────────────────── */}
          <section className="mb-12" aria-labelledby="usecases-heading">
            <h2 id="usecases-heading" className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('section_usecases_title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usecases.map((uc) => (
                <div key={uc.title} className="card p-5 rtl:text-right">
                  <p className="font-bold text-white mb-2">{uc.title}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Mid-page CTA ─────────────────────────────────────── */}
          <div className="bg-slate-900 border border-brand-500/20 rounded-2xl
                          p-8 text-center my-12 rtl:text-right">
            <p className="text-white font-semibold text-xl mb-2">{t('midcta_heading')}</p>
            <p className="text-slate-400 text-sm mb-6">{t('midcta_sub')}</p>
            <Link href="/contact"
              className="btn-gradient px-8 py-3.5 text-white font-semibold
                         rounded-xl inline-flex items-center justify-center">
              {t('midcta_btn')}
            </Link>
          </div>

          {/* ── Geo / Who am I ───────────────────────────────────── */}
          <section className="mb-12" aria-labelledby="geo-heading">
            <h2 id="geo-heading" className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('geo_title')}
            </h2>
            <p className="text-slate-400 leading-relaxed rtl:text-right">{t('geo_text')}</p>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────── */}
          <section className="mb-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-white mb-6 rtl:text-right">
              {t('faq_title')}
            </h2>
            <dl className="space-y-4">
              {faqItems.map((faq) => (
                <div key={faq.question} className="card p-5 rtl:text-right">
                  <dt className="font-bold text-white mb-2">{faq.question}</dt>
                  <dd className="text-slate-400 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Internal links ───────────────────────────────────── */}
          <div className="mb-12 p-5 bg-slate-900/50 border border-slate-800 rounded-xl rtl:text-right">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">
              {t('internal_links_label')}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/devops-france"
                className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                → {t('link_devops')}
              </Link>
              <Link href="/services"
                className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                → {t('link_services')}
              </Link>
              <a href={`/${locale}/blog/freelance-devops-vs-agence-it`}
                className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                → {t('link_blog')}
              </a>
            </div>
          </div>

          {/* ── Final CTA ────────────────────────────────────────── */}
          <div className="card p-8 text-center rtl:text-right">
            <p className="font-bold text-white text-xl mb-2">{t('cta_heading')}</p>
            <p className="text-slate-400 mb-6">{t('cta_sub')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center rtl:flex-row-reverse">
              <Link href="/contact"
                className="btn-gradient inline-flex items-center justify-center
                           px-8 py-3 text-white font-semibold rounded-xl">
                {t('cta_primary')}
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3
                           border border-green-500/30 text-green-400 font-semibold
                           rounded-xl hover:bg-green-500/10 transition-colors">
                {t('cta_whatsapp')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
