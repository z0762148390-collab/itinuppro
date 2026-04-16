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
  const t = await getTranslations({ locale, namespace: 'pages.creation_site_montpellier' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE.url}/${locale}/creation-site-montpellier`,
      languages: {
        fr: `${SITE.url}/fr/creation-site-montpellier`,
        en: `${SITE.url}/en/creation-site-montpellier`,
        ar: `${SITE.url}/ar/creation-site-montpellier`,
      },
    },
    keywords: ['création site web montpellier', 'agence web montpellier', 'site web professionnel montpellier'],
  };
}

export default async function CreationSiteMontpellierPage({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'pages.creation_site_montpellier' });
  const t = await getTranslations({ locale, namespace: 'creation_site_content' });

  const includesItems = t.raw('section_includes_items') as string[];
  const faqItems      = t.raw('faq')                    as FAQ[];

  return (
    <>
      <JsonLd schema={[getLocalBusinessSchema(), getFAQSchema(faqItems)]} />

      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
        <div className="max-w-3xl mx-auto">

          <header className="mb-12 rtl:text-right">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {tMeta('h1')}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Freelance web basé à Montpellier, je crée des sites web professionnels pour
              les indépendants, artisans, commerçants et PME de la région.
              Design sur mesure, SEO local optimisé, hébergement sécurisé inclus.
            </p>
          </header>

          {/* Local SEO advantage */}
          <section className="mb-12 card p-6 rtl:text-right">
            <h2 className="text-xl font-bold text-white mb-3">
              SEO local Montpellier inclus
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Un site optimisé pour le SEO local vous permet d&apos;apparaître dans les résultats
              Google pour des recherches comme &ldquo;[votre métier] Montpellier&rdquo; ou &ldquo;[service] Hérault&rdquo;.
              J&apos;intègre schema.org LocalBusiness, Google Business Profile et les balises
              géographiques dès la conception.
            </p>
          </section>

          {/* Includes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-5 rtl:text-right">
              {t('section_includes_title')}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {includesItems.map((item) => (
                <li key={item} className="flex items-start gap-3 p-3 bg-slate-800/50 border border-slate-700/40 rounded-lg rtl:flex-row-reverse rtl:text-right">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-slate-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
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
            </dl>
          </section>

          {/* CTA */}
          <div className="card p-8 text-center rtl:text-right">
            <p className="font-bold text-white text-xl mb-2">
              Basé à Montpellier et besoin d&apos;un site ?
            </p>
            <p className="text-slate-400 mb-6">On peut se rencontrer ou travailler à distance. Devis sous 48h.</p>
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

        </div>
      </div>
    </>
  );
}
