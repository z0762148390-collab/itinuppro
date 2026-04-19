import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import { getFAQSchema, getLocalBusinessSchema } from '@/lib/schemas';
import type { FAQ } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.devops_france' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE.url}/${locale}/devops-france`,
      languages: {
        fr:          `${SITE.url}/fr/devops-france`,
        en:          `${SITE.url}/en/devops-france`,
        ar:          `${SITE.url}/ar/devops-france`,
        'x-default': `${SITE.url}/fr/devops-france`,
      },
    },
    keywords: ['freelance devops france', 'consultant devops remote', 'mise en place ci/cd', 'infrastructure kubernetes freelance'],
  };
}

export default async function DevOpsFrancePage({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'pages.devops_france' });
  const t = await getTranslations({ locale, namespace: 'devops_france_content' });

  const whyItems    = t.raw('section_why_items')     as string[];
  const stackItems  = t.raw('section_stack_items')   as string[];
  const processItems = t.raw('section_process_items') as string[];
  const faqItems    = t.raw('faq')                   as FAQ[];

  const launchPath = locale === 'fr' ? '/lancer-mon-projet' : '/start-my-project';
  const LAUNCH_SECTION = {
    fr: {
      title:   'Vous avez aussi un projet à lancer ?',
      text:    "Au-delà des missions DevOps, j'accompagne des startups et entrepreneurs dans le lancement de leur produit tech.",
      btn:     "Voir l'offre lancement projet",
      faqQ:    'Accompagnez-vous aussi des startups ?',
      faqA:    "Oui. En plus des missions DevOps classiques, j'accompagne des entrepreneurs et startups dans le lancement de leur MVP. ",
      faqLink: "Voir l'offre",
    },
    en: {
      title:   'Got a Product to Launch?',
      text:    'Beyond DevOps missions, I support startups and entrepreneurs in launching their tech product.',
      btn:     'See the project launch offer',
      faqQ:    'Do you also support startups?',
      faqA:    'Yes. Beyond standard DevOps missions, I support entrepreneurs and startups in launching their MVP. ',
      faqLink: 'See the offer',
    },
    ar: {
      title:   'هل لديك منتج لإطلاقه أيضاً؟',
      text:    'إلى جانب مهام DevOps، أرافق الشركات الناشئة ورواد الأعمال في إطلاق منتجاتهم التقنية.',
      btn:     'اكتشف عرض إطلاق المشروع',
      faqQ:    'هل تدعم الشركات الناشئة أيضاً؟',
      faqA:    'نعم. إلى جانب مهام DevOps الكلاسيكية، أرافق رواد الأعمال والشركات الناشئة في إطلاق MVP الخاص بهم. ',
      faqLink: 'اطلع على العرض',
    },
  } as const;
  const ls = LAUNCH_SECTION[locale as keyof typeof LAUNCH_SECTION] ?? LAUNCH_SECTION.fr;

  return (
    <>
      <JsonLd schema={[getLocalBusinessSchema(), getFAQSchema(faqItems)]} />

      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
        <div className="max-w-3xl mx-auto">

          {/* Hero */}
          <header className="mb-12 rtl:text-right">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {tMeta('h1')}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">{t('intro')}</p>
          </header>

          {/* Why section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('section_why_title')}
            </h2>
            <ul className="space-y-3">
              {whyItems.map((item) => (
                <li key={item} className="flex items-start gap-3 rtl:flex-row-reverse rtl:text-right">
                  <svg className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Stack section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('section_stack_title')}
            </h2>
            <ul className="space-y-2">
              {stackItems.map((item) => (
                <li key={item} className="flex items-start gap-3 p-3 bg-slate-800/50 border border-slate-700/40 rounded-lg rtl:flex-row-reverse rtl:text-right">
                  <code className="text-brand-400 text-sm font-mono flex-shrink-0">→</code>
                  <span className="text-slate-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Process section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('section_process_title')}
            </h2>
            <ol className="space-y-3">
              {processItems.map((item, i) => (
                <li key={item} className="flex items-start gap-3 rtl:flex-row-reverse rtl:text-right">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500 text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-slate-400 pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 rtl:text-right">
              {t('faq_title')}
            </h2>
            <dl className="space-y-4">
              {faqItems.map((faq) => (
                <div key={faq.question} className="card p-5 rtl:text-right">
                  <dt className="font-bold text-white mb-2">{faq.question}</dt>
                  <dd className="text-slate-400 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
              <div className="card p-5 rtl:text-right">
                <dt className="font-bold text-white mb-2">{ls.faqQ}</dt>
                <dd className="text-slate-400 leading-relaxed">
                  {ls.faqA}
                  <Link href={launchPath} className="text-brand-400 hover:text-brand-300 transition-colors underline">
                    {ls.faqLink}
                  </Link>
                </dd>
              </div>
            </dl>
          </section>

          {/* CTA */}
          <div className="card p-8 text-center rtl:text-right">
            <p className="font-bold text-white text-xl mb-2">Vous avez un projet DevOps ?</p>
            <p className="text-slate-400 mb-6">Devis gratuit sous 48h.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center rtl:flex-row-reverse">
              <Link
                href="/contact"
                className="btn-gradient inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-xl"
              >
                Demander un devis gratuit
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-green-500/30 text-green-400 font-semibold rounded-xl hover:bg-green-500/10 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Lancement de projet — CTA additionnel */}
          <div className="card p-8 text-center rtl:text-right mt-6">
            <p className="font-bold text-white text-xl mb-2">{ls.title}</p>
            <p className="text-slate-400 mb-6">{ls.text}</p>
            <Link
              href={launchPath}
              className="btn-gradient inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-xl">
              {ls.btn}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
