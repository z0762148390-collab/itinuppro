import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import ServicesSwitcher from '@/components/services/ServicesSwitcher';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Services — Mission Freelance DevOps & Création Site Web | itinup Montpellier',
    description:
      'Mission freelance DevOps, Java, développement web pour entreprises. ' +
      'Création de sites et applications pour artisans, commerçants, ' +
      'indépendants et PME. Basé à Montpellier, remote toute la France.',
    alternates: {
      canonical: `${SITE.url}/${locale}/services`,
      languages: {
        fr: `${SITE.url}/fr/services`,
        en: `${SITE.url}/en/services`,
        ar: `${SITE.url}/ar/services`,
      },
    },
    keywords: [
      'freelance DevOps Montpellier',
      'mission freelance Java Spring Boot',
      'création site web artisan',
      'application web sur mesure',
      'freelance développeur web France',
    ],
  };
}

export default async function ServicesPage({ params }: Props) {
  await params;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                        bg-brand-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5
                          bg-brand-600/10 text-brand-400 text-sm font-medium
                          rounded-full border border-brand-600/20 badge-glow">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            Disponible — réponse sous 48h
          </div>

          <h1 className="headline-gradient text-4xl sm:text-5xl font-bold
                         leading-tight tracking-tight mb-5">
            Mes services
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed">
            Expert en mission pour les entreprises.
            <br className="hidden sm:block" />
            Créateur de sites et d&apos;applications pour les professionnels.
            <br className="hidden sm:block" />
            <span className="text-slate-300 font-medium">Un seul interlocuteur pour les deux.</span>
          </p>
        </div>
      </section>

      {/* ── Switcher + content ───────────────────────────────────── */}
      <div className="bg-slate-950 pt-10">
        <ServicesSwitcher />
      </div>
    </>
  );
}
