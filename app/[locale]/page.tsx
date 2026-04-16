import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
import TechStack from '@/components/landing/TechStack';
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
        fr: `${SITE.url}/fr`,
        en: `${SITE.url}/en`,
        ar: `${SITE.url}/ar`,
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

  return (
    <>
      <JsonLd schema={getFAQSchema(faqItems)} />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Bandeau disponibilité */}
      <AvailabilityBanner />

      {/* 3. Ils m'ont fait confiance */}
      <TrustedBy />

      {/* 3–5. Problem → Solution → Services */}
      <Problem />
      <Solution />
      <Services />

      {/* 6. Chiffres clés */}
      <StatsSection />

      {/* 8. Stack technique */}
      <TechStack />

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

      {/* 16. CTA final */}
      <CTAFinal />

      {/* Mobile-only section navigator */}
      <SectionNav />
    </>
  );
}
