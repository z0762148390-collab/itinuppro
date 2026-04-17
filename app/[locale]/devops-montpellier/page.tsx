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
  const t = await getTranslations({ locale, namespace: 'pages.devops_montpellier' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE.url}/${locale}/devops-montpellier`,
      languages: {
        fr:          `${SITE.url}/fr/devops-montpellier`,
        en:          `${SITE.url}/en/devops-montpellier`,
        ar:          `${SITE.url}/ar/devops-montpellier`,
        'x-default': `${SITE.url}/fr/devops-montpellier`,
      },
    },
    keywords: ['devops montpellier', 'freelance devops montpellier', 'consultant devops occitanie'],
  };
}

export default async function DevOpsMontpellierPage({ params }: Props) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'pages.devops_montpellier' });
  const t = await getTranslations({ locale, namespace: 'devops_france_content' });

  const stackItems = t.raw('section_stack_items') as string[];
  const faqItems   = t.raw('faq')                 as FAQ[];

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
              Basé à Montpellier (34000), j&apos;interviens sur site dans la région Occitanie
              et en full remote sur toute la France. CI/CD, Docker, Kubernetes, AWS —
              votre infrastructure en production en 2 semaines.
            </p>
          </header>

          {/* Local advantage */}
          <section className="mb-12 card p-6 rtl:text-right">
            <h2 className="text-xl font-bold text-white mb-3">
              Freelance DevOps local à Montpellier
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Travailler avec un freelance DevOps basé à Montpellier vous offre le meilleur
              des deux mondes : disponibilité pour des réunions en présentiel dans la région
              Occitanie, et flexibilité du 100% remote pour les sprints techniques.
              Pas de frais de déplacement pour les entreprises de l&apos;Hérault.
            </p>
          </section>

          {/* Stack */}
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
              Projet DevOps à Montpellier ou en remote ?
            </p>
            <p className="text-slate-400 mb-6">Réponse garantie sous 48h.</p>
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
