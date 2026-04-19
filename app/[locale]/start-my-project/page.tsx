import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SITE } from '@/lib/constants';
import LaunchProjectContent from '@/components/lancer-mon-projet/LaunchProjectContent';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const meta = {
    en: {
      title:       'Start my tech project — MVP, SaaS & DevOps | itinup',
      description: "Got a tech project idea? I take you from idea to MVP to production. Senior Java Spring Boot and DevOps freelance based in Montpellier. Free first exchange within 48h.",
    },
    ar: {
      title:       'أطلق مشروعي التقني — MVP و SaaS و DevOps | itinup',
      description: "لديك فكرة مشروع تقني؟ أرافقك من الفكرة إلى MVP وحتى الإطلاق. مطور مستقل متخصص في Java Spring Boot وDevOps. أول محادثة مجانية خلال 48 ساعة.",
    },
  };

  const m = meta[locale as keyof typeof meta] ?? meta.en;

  return {
    title:       m.title,
    description: m.description,
    alternates: {
      canonical: locale === 'ar'
        ? `${SITE.url}/ar/start-my-project`
        : `${SITE.url}/en/start-my-project`,
      languages: {
        fr:          `${SITE.url}/fr/lancer-mon-projet`,
        en:          `${SITE.url}/en/start-my-project`,
        ar:          `${SITE.url}/ar/start-my-project`,
        'x-default': `${SITE.url}/fr/lancer-mon-projet`,
      },
    },
  };
}

export default async function StartMyProjectPage({ params }: Props) {
  const { locale } = await params;

  // FR has its own slug — redirect
  if (locale === 'fr') {
    redirect('/fr/lancer-mon-projet');
  }

  return <LaunchProjectContent locale={locale} />;
}
