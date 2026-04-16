import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE, PERSON } from '@/lib/constants';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.mentions_legales' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
    alternates: { canonical: `${SITE.url}/${locale}/mentions-legales` },
  };
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-slate-800">
      {title}
    </h2>
    <div className="space-y-2 text-slate-400 leading-relaxed text-sm">
      {children}
    </div>
  </section>
);

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:gap-4">
    <span className="text-slate-500 flex-shrink-0 w-44">{label}</span>
    <span className="text-slate-300">{value}</span>
  </div>
);

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = await params;

  const updated = new Date().toLocaleDateString(
    locale === 'ar' ? 'ar-MA' : locale === 'en' ? 'en-GB' : 'fr-FR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
      <div className="max-w-2xl mx-auto">

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Mentions légales
          </h1>
          <p className="text-slate-500 text-sm">Dernière mise à jour : {updated}</p>
        </header>

        {/* 1 — Éditeur */}
        <Section title="1. Éditeur du site">
          <Row label="Nom commercial"    value={SITE.name} />
          <Row label="Forme juridique"   value="Entrepreneur individuel (EI)" />
          <Row label="Nom de l'exploitant" value={PERSON.legalName} />
          <Row label="SIRET"             value={SITE.siret} />
          <Row label="Code APE"          value="62.01Z — Programmation informatique" />
          <Row label="Adresse"           value={SITE.address} />
          <Row label="Email"             value={
            <a href={`mailto:${SITE.email}`} className="text-brand-400 hover:underline">
              {SITE.email}
            </a>
          } />
          <Row label="Téléphone"         value={
            <a href={SITE.whatsapp} className="text-brand-400 hover:underline">
              {SITE.whatsappNumber}
            </a>
          } />
        </Section>

        {/* 2 — Hébergeur */}
        <Section title="2. Hébergeur">
          <Row label="Société"  value="Vercel Inc." />
          <Row label="Adresse"  value="440 N Barranca Ave #4133, Covina, CA 91723, USA" />
          <Row label="Site web" value={
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer"
               className="text-brand-400 hover:underline">
              vercel.com
            </a>
          } />
        </Section>

        {/* 3 — Propriété intellectuelle */}
        <Section title="3. Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images, code source,
            structure) est la propriété exclusive de {PERSON.name} / {SITE.name},
            sauf mention contraire.
          </p>
          <p>
            Toute reproduction, représentation, modification ou exploitation non autorisée
            de tout ou partie du site, par quelque procédé que ce soit, est interdite
            et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants
            du Code de la propriété intellectuelle.
          </p>
        </Section>

        {/* 4 — Données personnelles */}
        <Section title="4. Données personnelles (RGPD)">
          <p>
            Les données collectées via le formulaire de contact (nom, email, message)
            sont utilisées uniquement pour répondre à votre demande. Elles ne sont ni
            cédées, ni vendues à des tiers.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD)
            et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès,
            de rectification et de suppression de vos données.
          </p>
          <p>
            Pour exercer ces droits, contactez :{' '}
            <a href={`mailto:${SITE.email}`} className="text-brand-400 hover:underline">
              {SITE.email}
            </a>
          </p>
          <p>
            Responsable du traitement : {PERSON.name} — {SITE.address}.
          </p>
        </Section>

        {/* 5 — Cookies */}
        <Section title="5. Cookies">
          <p>
            Ce site n&apos;utilise pas de cookies publicitaires ni de traceurs tiers.
            Aucune donnée de navigation n&apos;est transmise à des plateformes de publicité.
          </p>
          <p>
            Un cookie de session peut être déposé pour mémoriser votre préférence de langue.
            Ce cookie ne contient aucune donnée personnelle.
          </p>
        </Section>

        {/* 6 — Liens externes */}
        <Section title="6. Liens hypertextes">
          <p>
            Ce site peut contenir des liens vers des sites tiers. {SITE.name} n&apos;est pas
            responsable du contenu de ces sites et ne peut être tenu pour responsable
            des dommages ou préjudices découlant de leur consultation.
          </p>
        </Section>

        {/* 7 — Droit applicable */}
        <Section title="7. Droit applicable">
          <p>
            Le présent site est soumis au droit français. En cas de litige,
            les tribunaux français seront seuls compétents.
          </p>
        </Section>

      </div>
    </div>
  );
}
