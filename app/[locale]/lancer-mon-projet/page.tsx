import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SITE } from '@/lib/constants';
import LaunchProjectContent from '@/components/lancer-mon-projet/LaunchProjectContent';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const meta = {
    fr: {
      title:       'Lancer mon projet tech — MVP, SaaS & DevOps | itinup Montpellier',
      description: "Vous avez une idée de projet tech ? Je vous accompagne de l'idée au MVP jusqu'à la production. Freelance senior Java Spring Boot et DevOps à Montpellier. Premier échange gratuit sous 48h.",
    },
    en: {
      title:       'Start my tech project — MVP, SaaS & DevOps | itinup',
      description: "Got a tech project idea? I take you from idea to MVP to production. Senior Java Spring Boot and DevOps freelance based in Montpellier. Free first exchange within 48h.",
    },
    ar: {
      title:       'أطلق مشروعي التقني — MVP و SaaS و DevOps | itinup',
      description: "لديك فكرة مشروع تقني؟ أرافقك من الفكرة إلى MVP وحتى الإطلاق. مطور مستقل متخصص في Java Spring Boot وDevOps. أول محادثة مجانية خلال 48 ساعة.",
    },
  };

  const m = meta[locale as keyof typeof meta] ?? meta.fr;

  return {
    title:       m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE.url}/fr/lancer-mon-projet`,
      languages: {
        fr:          `${SITE.url}/fr/lancer-mon-projet`,
        en:          `${SITE.url}/en/start-my-project`,
        ar:          `${SITE.url}/ar/start-my-project`,
        'x-default': `${SITE.url}/fr/lancer-mon-projet`,
      },
    },
  };
}

export default async function LancerMonProjetPage({ params }: Props) {
  const { locale } = await params;

  // EN and AR have their own slug — redirect them
  if (locale === 'en' || locale === 'ar') {
    redirect(`/${locale}/start-my-project`);
  }

  return <LaunchProjectContent locale={locale} />;
}
