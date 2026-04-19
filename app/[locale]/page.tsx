import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Solution from '@/components/sections/Solution';
import Services from '@/components/sections/Services';
import SocialProof from '@/components/sections/SocialProof';
import KeyManOffer from '@/components/sections/KeyManOffer';
import CTAFinal from '@/components/sections/CTAFinal';
import TrustedBy from '@/components/landing/TrustedBy';
import AvailabilityBanner from '@/components/landing/AvailabilityBanner';
import StatsSection from '@/components/landing/StatsSection';
import ProfileSection from '@/components/landing/ProfileSection';
import ComparisonTable from '@/components/landing/ComparisonTable';
import LandingSocialProof from '@/components/landing/SocialProof';
import BlogPreview from '@/components/landing/BlogPreview';
import FAQLanding from '@/components/landing/FAQLanding';
import SectionNav from '@/components/landing/SectionNav';
import JsonLd from '@/components/ui/JsonLd';
import { getFAQSchema } from '@/lib/schemas';
import { SITE } from '@/lib/constants';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'itinup — Freelance DevOps & Développement Web | Montpellier, France',
    en: 'itinup — Freelance DevOps & Web Development | Montpellier, France',
    ar: 'itinup — مطوّر DevOps مستقل وتطوير ويب | مونبلييه، فرنسا',
  };

  const descriptions: Record<string, string> = {
    fr: 'Freelance DevOps et développeur web senior basé à Montpellier. CI/CD, Docker, Kubernetes, AWS, Next.js. Infrastructure cloud et sites web professionnels livrés clé en main.',
    en: 'Senior freelance DevOps and web developer based in Montpellier. CI/CD, Docker, Kubernetes, AWS, Next.js. Cloud infrastructure and professional websites delivered end-to-end.',
    ar: 'مطوّر DevOps مستقل متمرّس ومطوّر ويب مقيم في مونبلييه. CI/CD وDocker وKubernetes وAWS وNext.js. بنية تحتية سحابية ومواقع ويب احترافية مسلّمة بشكل شامل.',
  };

  return {
    title: titles[locale] ?? titles['fr'],
    description: descriptions[locale] ?? descriptions['fr'],
    alternates: {
      canonical: `${SITE.url}/${locale}`,
      languages: {
        fr:          `${SITE.url}/fr`,
        en:          `${SITE.url}/en`,
        ar:          `${SITE.url}/ar`,
        'x-default': `${SITE.url}/fr`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles['fr'],
      description: descriptions[locale] ?? descriptions['fr'],
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return SITE.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const tFaq = await getTranslations({ locale, namespace: 'faq_landing' });

  const faqItems = [
    { question: tFaq('q1'), answer: tFaq('a1') },
    { question: tFaq('q2'), answer: tFaq('a2') },
    { question: tFaq('q3'), answer: tFaq('a3') },
    { question: tFaq('q4'), answer: tFaq('a4') },
    { question: tFaq('q5'), answer: tFaq('a5') },
  ];

  const launchPath = locale === 'fr' ? '/lancer-mon-projet' : '/start-my-project';
  const LAUNCH = {
    fr: {
      title:      'Vous avez un projet à lancer ?',
      text:       "Startup, SaaS, application métier — je vous accompagne de l'idée à la mise en production.",
      btn:        'Voir comment ça marche',
      footerLink: 'Lancer mon projet tech',
    },
    en: {
      title:      'Ready to Launch Your Tech Project?',
      text:       'Startup, SaaS, business application — I take you from idea to production.',
      btn:        'See how it works',
      footerLink: 'Launch my tech project',
    },
    ar: {
      title:      'هل لديك مشروع لإطلاقه؟',
      text:       'ناشئة، SaaS، تطبيق مخصص — أرافقك من الفكرة إلى الإطلاق.',
      btn:        'اكتشف كيف يعمل',
      footerLink: 'إطلاق مشروعي التقني',
    },
  } as const;
  const lc     = LAUNCH[locale as keyof typeof LAUNCH] ?? LAUNCH.fr;
  const isRtl  = locale === 'ar';

  const LAUNCH_HERO = {
    fr: {
      badge:       'Nouveau — Accompagnement projet tech',
      h2:          'Vous avez une idée de projet tech ? Transformons-la en produit réel.',
      sub:         "De l'idée au MVP jusqu'à la mise en production. Sans mauvais choix techniques, sans perte de temps. Basé à Montpellier, j'interviens partout en France.",
      points:      ['Cadrage technique en 30 minutes', 'MVP livré en quelques semaines', 'Mise en production cloud incluse'],
      cta1:        'Lancer mon projet',
      cta2:        'En savoir plus',
      reassurance: 'Premier échange gratuit · Réponse sous 48h · Sans engagement',
    },
    en: {
      badge:       'New — Tech project support',
      h2:          "Got a tech project idea? Let's turn it into a real product.",
      sub:         'From idea to MVP to production. No bad technical choices, no wasted time. Based in Montpellier, available across France.',
      points:      ['Technical scoping in 30 minutes', 'MVP delivered in a few weeks', 'Cloud deployment included'],
      cta1:        'Start my project',
      cta2:        'Learn more',
      reassurance: 'First call free · Response within 48h · No commitment',
    },
    ar: {
      badge:       'جديد — دعم المشاريع التقنية',
      h2:          'لديك فكرة مشروع تقني؟ لنحوّلها إلى منتج حقيقي.',
      sub:         'من الفكرة إلى MVP حتى الإنتاج. بدون خيارات تقنية خاطئة، بدون ضياع وقت. مقيم في مونبلييه، أتدخل في جميع أنحاء فرنسا.',
      points:      ['تأطير تقني في 30 دقيقة', 'MVP مسلَّم في أسابيع', 'نشر سحابي مشمول'],
      cta1:        'أطلق مشروعي',
      cta2:        'اعرف أكثر',
      reassurance: 'أول تواصل مجاني · رد خلال 48 ساعة · بدون التزام',
    },
  } as const;
  const lh = LAUNCH_HERO[locale as keyof typeof LAUNCH_HERO] ?? LAUNCH_HERO.fr;

  return (
    <>
      <JsonLd schema={getFAQSchema(faqItems)} />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Bandeau disponibilité */}
      <AvailabilityBanner />

      {/* Lancer mon projet — section hero secondaire, SEO "accompagnement projet tech" */}
      <section
        id="lancer-mon-projet"
        aria-label="Lancer votre projet tech avec itinup"
        itemScope
        itemType="https://schema.org/Service"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-b border-slate-800/60"
      >
        {/* Schema.org microdata — visually hidden */}
        <span itemProp="name" className="sr-only">Accompagnement projet tech et développement MVP</span>
        <span itemProp="areaServed" className="sr-only">France</span>
        <span itemProp="provider" itemScope itemType="https://schema.org/Person" className="sr-only">
          <span itemProp="name">Zouhir</span>
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Montpellier</span>
          </span>
        </span>

        <div className={`max-w-3xl mx-auto text-center ${isRtl ? 'rtl text-right' : ''}`}>
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold
                             text-brand-400 bg-brand-500/10 border border-brand-500/20
                             rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" aria-hidden="true" />
              {lh.badge}
            </span>
          </div>

          {/* H2 — SEO: "projet tech", "MVP", "Montpellier / France" */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            {lh.h2}
          </h2>

          {/* Subtitle — geo SEO keywords intégrés naturellement */}
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto rtl:text-right">
            {lh.sub}
          </p>

          {/* 3 points de valeur */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mb-10 ${isRtl ? 'rtl:flex-row-reverse' : ''}`}>
            {lh.points.map((point) => (
              <div key={point} className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-brand-400 shrink-0" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-slate-300 text-sm font-medium">{point}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-5 ${isRtl ? 'rtl:flex-row-reverse' : ''}`}>
            <Link
              href={launchPath}
              aria-label={lh.cta1}
              className="btn-gradient inline-flex items-center justify-center
                         px-8 py-4 text-white font-semibold rounded-xl text-base">
              {lh.cta1}
            </Link>
            <Link
              href={launchPath}
              className="inline-flex items-center justify-center px-8 py-4
                         border border-brand-500/30 text-brand-400 font-semibold
                         rounded-xl hover:bg-brand-500/10 transition-colors">
              {lh.cta2}
            </Link>
          </div>

          {/* Réassurance */}
          <p className="text-slate-600 text-sm">{lh.reassurance}</p>
        </div>
      </section>

      {/* 3. Ils m'ont fait confiance */}
      <TrustedBy />

      {/* 3–5. Problem → Solution → Services */}
      <Problem />
      <Solution />
      <Services />

      {/* Projet à lancer — section interstitielle */}
      <section className="bg-slate-900/60 border-y border-slate-800/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-2xl mx-auto text-center ${isRtl ? 'rtl text-right' : ''}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{lc.title}</h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">{lc.text}</p>
          <Link
            href={launchPath}
            className="btn-gradient inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl">
            {lc.btn}
          </Link>
        </div>
      </section>

      {/* 6. Chiffres clés */}
      <StatsSection />

      {/* 9. Profil */}
      <ProfileSection />

      {/* 10. Comparatif Freelance vs ESN */}
      <ComparisonTable />

      {/* 11. Social proof — process steps */}
      <SocialProof />

      {/* 12. Secteurs accompagnés */}
      <LandingSocialProof />

      {/* 13. Offre clé en main */}
      <KeyManOffer />

      {/* 14. Blog preview */}
      <BlogPreview locale={locale} />

      {/* 15. FAQ */}
      <FAQLanding title={tFaq('title')} items={faqItems} />

      {/* Lien pied de page — lancer mon projet */}
      <div className="bg-slate-950 pb-2 pt-6 px-4 text-center">
        <Link
          href={launchPath}
          className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
          → {lc.footerLink}
        </Link>
      </div>

      {/* 16. CTA final */}
      <CTAFinal />

      {/* Mobile-only section navigator */}
      <SectionNav />
    </>
  );
}
