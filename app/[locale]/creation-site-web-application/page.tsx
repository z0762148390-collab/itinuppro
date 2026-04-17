import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import { waLink } from '@/lib/whatsapp-presets';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Création site web & application sur mesure — itinup | Montpellier',
    description:
      'Artisan, commerçant, startup ou PME — je crée votre site web ou application sur mesure. Devis gratuit, livraison en 3 semaines, un seul interlocuteur.',
    alternates: {
      canonical: `${SITE.url}/${locale}/creation-site-web-application`,
      languages: {
        fr: `${SITE.url}/fr/creation-site-web-application`,
        en: `${SITE.url}/en/creation-site-web-application`,
        ar: `${SITE.url}/ar/creation-site-web-application`,
      },
    },
    keywords: [
      'création site web',
      'application sur mesure',
      'site web artisan',
      'site web professionnel',
      'freelance développeur web montpellier',
    ],
  };
}

/* ─── Icons ───────────────────────────────────────────────────── */
function Check({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true" className="shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CheckGreen() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true" className="shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
         aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Pricing card ────────────────────────────────────────────── */
interface PricingCardProps {
  badge: string;
  popular?: boolean;
  accent: string;
  catchline: string;
  title: string;
  price: string;
  priceStrike: string;
  delay: string;
  idealFor: string;
  features: string[];
  cta: string;
  ctaService?: string;
}

function PricingCard({
  badge, popular, accent, catchline, title,
  price, priceStrike, delay, idealFor, features, cta, ctaService,
}: PricingCardProps) {
  const ctaHref  = ctaService ? `/contact?service=${ctaService}` : '/contact';
  const waHref   = ctaService ? waLink(ctaService) : SITE.whatsapp;
  return (
    <div className="relative flex flex-col h-full">
      {/* "Le plus demandé" badge */}
      {popular && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
          <span className="px-4 py-1 text-xs font-bold bg-brand-600 text-white rounded-full
                           shadow-lg shadow-brand-600/30 whitespace-nowrap">
            ★ Le plus demandé
          </span>
        </div>
      )}

      {/* Gradient border wrapper */}
      <div className="rounded-2xl p-[1px] flex-1"
           style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent}33, transparent)` }}>

        {/* Card body */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 h-full flex flex-col
                        transition-colors duration-300 hover:bg-slate-800/70">

          {/* 3D badge */}
          <span className="inline-block self-start px-3 py-1 mb-5 text-xs font-bold
                           rounded-full tracking-wide"
                style={{
                  background: `linear-gradient(135deg, ${accent}20, ${accent}0a)`,
                  border: `1px solid ${accent}40`,
                  color: accent,
                  boxShadow: `0 2px 10px ${accent}20, inset 0 1px 0 ${accent}20`,
                } as CSSProperties}>
            {badge}
          </span>

          <p className="text-sm text-slate-500 mb-1 leading-snug">{catchline}</p>
          <h3 className="text-xl font-bold text-slate-100 mb-5 leading-snug">{title}</h3>

          {/* Price */}
          <div className="mb-1 flex items-end gap-2">
            <span className="text-2xl font-bold" style={{ color: accent }}>{price}</span>
            <span className="text-sm text-slate-600 line-through mb-0.5">{priceStrike}</span>
          </div>
          <p className="text-xs text-slate-500 mb-1">⏱ {delay}</p>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            <span className="text-slate-600">Idéal pour : </span>{idealFor}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-1">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-snug">
                <Check color={accent} />
                {f}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5">
            <Link href={ctaHref as '/contact'}
                  className="block text-center py-3 px-6 rounded-xl font-semibold text-sm
                             transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                    color: '#0f172a',
                    boxShadow: `0 4px 20px ${accent}30`,
                  } as CSSProperties}>
              {cta}
            </Link>
            <a href={waHref} target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl
                          text-sm font-medium text-green-400
                          bg-green-500/8 border border-green-500/20
                          hover:bg-green-500/15 hover:border-green-400/35
                          transition-all duration-200">
              <WhatsAppIcon />
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
const CLIENTS = ['AMUE', 'Inetum', 'Capgemini', 'Airbus', 'AIFE'];

const PAIN_POINTS = [
  {
    emoji: '💤',
    title: 'Votre site existe, mais il ne vous apporte aucun client',
    text: "Que vous soyez plombier, coach, consultant ou gérant d'une boutique — votre site est là, il fait joli, mais le téléphone ne sonne pas. Un bon site travaille pour vous 24h/24.",
  },
  {
    emoji: '😤',
    title: 'Une agence vous a livré quelque chose de décevant',
    text: "Trop cher, trop long, et au final ce n'est pas ce que vous vouliez. Avec moi, vous validez à chaque étape. Pas de mauvaise surprise.",
  },
  {
    emoji: '💡',
    title: 'Vous avez une idée mais vous ne savez pas par où commencer',
    text: "Gérer vos rendez-vous, vos commandes, vos clients en ligne... Peu importe l'idée, pas besoin d'être technique. Expliquez-moi en quelques mots, je m'occupe du reste.",
  },
];

const STATS = [
  '30+ projets livrés',
  "7+ années d'expérience",
  'Réponse sous 48h garantie',
  'Artisans, commerçants, startups, PME accompagnés',
];

const STEPS = [
  {
    n: '01',
    title: 'On se parle',
    text: "Vous m'expliquez votre projet en 30 minutes. Pas de jargon, juste votre besoin — que vous soyez artisan, commerçant ou porteur de projet.",
  },
  {
    n: '02',
    title: 'Je vous fais une proposition',
    text: 'Vous recevez un devis clair avec le prix final et la date de livraison. Rien de caché.',
  },
  {
    n: '03',
    title: 'Je construis, vous validez',
    text: "Je vous montre l'avancement régulièrement. Vous donnez votre avis à chaque étape.",
  },
  {
    n: '04',
    title: "C'est en ligne",
    text: "Votre site ou application est prêt. Je reste disponible après la livraison.",
  },
];

const COMPARISON = [
  { criteria: 'Délai de livraison',   itinup: '2 à 3 semaines',         agency: '3 à 6 mois'                  },
  { criteria: 'Interlocuteur',         itinup: 'Toujours le même',        agency: 'Tourne entre commerciaux'    },
  { criteria: 'Prix',                  itinup: 'Fixé dès le début',       agency: 'Souvent des surprises'       },
  { criteria: 'Flexibilité',           itinup: "Je m'adapte à vous",      agency: 'Processus rigide'            },
  { criteria: 'Propriété du code',     itinup: '100% à vous',             agency: 'Parfois verrouillé'          },
  { criteria: 'Suivi après livraison', itinup: 'Je reste disponible',     agency: 'Contrat de maintenance'      },
];

export default async function CreationSiteWebPage({ params }: Props) {
  await params; // locale resolved via metadata

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px]
                        bg-brand-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5
                          bg-brand-600/10 text-brand-400 text-sm font-medium
                          rounded-full border border-brand-600/20 badge-glow">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            Disponible — livraison sous 3 semaines
          </div>

          <h1 className="headline-gradient text-4xl sm:text-5xl lg:text-[3.25rem] font-bold
                         leading-tight tracking-tight mb-6">
            Un site ou une appli qui vous ramène vraiment des clients
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Artisan, commerçant, indépendant ou dirigeant — je m&apos;occupe de tout,
            de A à Z. Vous n&apos;avez qu&apos;à valider.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/contact"
                  className="btn-gradient w-full sm:w-auto inline-flex items-center
                             justify-center px-8 py-4 text-white font-semibold rounded-xl text-base">
              Obtenir un devis gratuit
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
               className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                          px-8 py-4 bg-green-500/10 text-green-400 border border-green-500/25
                          font-semibold rounded-xl text-base
                          hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-200">
              <WhatsAppIcon />
              Discuter sur WhatsApp
            </a>
          </div>

          {/* Trust logos */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-slate-600 w-full sm:w-auto mb-1 sm:mb-0 sm:mr-1">
              Ils m&apos;ont fait confiance :
            </span>
            {CLIENTS.map((name) => (
              <span key={name}
                    className="px-4 py-1.5 rounded-lg border border-slate-700/40
                               bg-slate-800/50 text-slate-400 text-xs font-semibold
                               tracking-wider uppercase">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. DOULEURS CLIENTS ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-4">
            Vous vous reconnaissez ?
          </h2>
          <p className="text-center text-slate-500 mb-12">
            Ces situations, je les entends presque tous les jours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAIN_POINTS.map((p) => (
              <div key={p.title}
                   className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6
                              hover:border-slate-700 transition-colors duration-200">
                <div className="text-3xl mb-4">{p.emoji}</div>
                <h3 className="text-base font-semibold text-slate-100 mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. OFFRES PRICING ────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Une offre adaptée à votre situation
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Que vous partiez de zéro ou que vous ayez un projet précis —
              il y a une formule faite pour vous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-6">
            <PricingCard
              badge="Essentiel"
              accent="#00e6c3"
              catchline="Votre meilleur commercial, disponible 24h/24"
              title="Site vitrine professionnel"
              price="À partir de 490€"
              priceStrike="890€"
              delay="Livré en 2 à 3 semaines"
              idealFor="Artisans, commerçants, indépendants, professions libérales, TPE"
              features={[
                'Un design moderne adapté à votre image',
                'Votre site visible sur Google dès le départ',
                'Formulaire de contact qui vous envoie les demandes directement',
                'Fonctionne parfaitement sur téléphone et ordinateur',
                'Hébergement et nom de domaine inclus 1 an',
                'Site sécurisé et rapide',
              ]}
              cta="Démarrer ce projet"
              ctaService="site-vitrine"
            />

            <PricingCard
              badge="Sur mesure"
              popular
              accent="#00d4ff"
              catchline="Votre idée, transformée en outil qui fonctionne"
              title="Application sur mesure"
              price="À partir de 1 200€"
              priceStrike="2 490€"
              delay="Livré en 4 à 8 semaines"
              idealFor="Indépendants avec espace client, startups, PME, projets sur mesure"
              features={[
                'Connexion utilisateur (compte, mot de passe)',
                'Tableau de bord pour gérer votre activité',
                'Accessible sur mobile et ordinateur',
                'Mises à jour et évolutions possibles à tout moment',
                'Vous êtes 100% propriétaire du code livré',
                'Formation incluse pour prendre en main votre outil',
              ]}
              cta="Démarrer ce projet"
              ctaService="application"
            />

            <PricingCard
              badge="Zéro stress"
              accent="#ffa502"
              catchline="Je gère tout, vous vous concentrez sur votre métier"
              title="Offre clé en main"
              price="À partir de 49€/mois"
              priceStrike="99€/mois"
              delay="Service continu"
              idealFor="Tous les professionnels qui veulent zéro gestion technique"
              features={[
                'Site ou application + hébergement entièrement géré',
                'Votre site surveillé et mis à jour chaque mois',
                'Sauvegardes quotidiennes automatiques',
                'Un interlocuteur joignable rapidement',
                'Aucune surprise ni frais cachés',
              ]}
              cta="Demander un devis"
              ctaService="cle-en-main"
            />
          </div>
        </div>
      </section>

      {/* ── 4. STATS MARQUEE ─────────────────────────────────────── */}
      <section className="py-10 bg-slate-950 border-y border-slate-800/60 overflow-hidden"
               aria-label="Chiffres clés">
        <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
          {[...STATS, ...STATS].map((s, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-10 text-sm font-medium text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" aria-hidden="true" />
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── 5. PROCESSUS ─────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-4">
            Simple comme un coup de fil
          </h2>
          <p className="text-center text-slate-500 mb-16">
            De la première discussion à la mise en ligne — voici comment ça se passe.
          </p>

          <ol className="relative space-y-10">
            {/* Vertical line */}
            <div className="absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b
                            from-brand-600/60 via-brand-600/20 to-transparent
                            hidden sm:block" aria-hidden="true" />

            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-6 sm:gap-8">
                {/* Step number */}
                <div className="relative flex-shrink-0 w-12 h-12 rounded-full
                                bg-slate-900 border border-brand-600/40
                                flex items-center justify-center z-10">
                  <span className="text-sm font-bold text-brand-400">{step.n}</span>
                </div>
                {/* Content */}
                <div className="pt-2.5">
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 6. COMPARATIF ────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-3">
            Pourquoi des professionnels de tous secteurs me choisissent
          </h2>
          <p className="text-center text-slate-500 mb-12">
            Plutôt qu&apos;une agence ou une solution toute faite.
          </p>

          <div className="rounded-2xl overflow-hidden border border-slate-800">
            {/* Header */}
            <div className="grid grid-cols-3 bg-slate-900/80 px-5 sm:px-8 py-4
                            text-xs font-semibold uppercase tracking-wider">
              <span className="text-slate-500">Critère</span>
              <span className="text-brand-400 text-center">itinup</span>
              <span className="text-slate-500 text-center">Agence web</span>
            </div>

            {COMPARISON.map((row, i) => (
              <div key={i}
                   className={`grid grid-cols-3 px-5 sm:px-8 py-4 text-sm items-center
                     ${i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/50'}`}>
                <span className="text-slate-400 font-medium text-xs sm:text-sm">
                  {row.criteria}
                </span>
                <span className="flex items-center justify-center gap-1.5
                                 text-slate-200 font-medium text-xs sm:text-sm">
                  <CheckGreen />
                  <span className="hidden sm:inline">{row.itinup}</span>
                  <span className="sm:hidden">✓</span>
                </span>
                <span className="text-center text-slate-500 text-xs sm:text-sm">
                  {row.agency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA FINAL ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5
                          bg-brand-600/10 text-brand-400 text-sm font-medium
                          rounded-full border border-brand-600/20 badge-glow">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            Disponible maintenant — réponse sous 48h
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-5">
            Prêt à lancer votre projet ?
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Un échange de 30 minutes suffit pour tout clarifier.
            Gratuit, sans engagement, sans jargon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact"
                  className="btn-gradient w-full sm:w-auto inline-flex items-center
                             justify-center px-8 py-4 text-white font-semibold rounded-xl text-base">
              Obtenir un devis gratuit
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
               className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                          px-8 py-4 bg-green-500/10 text-green-400 border border-green-500/25
                          font-semibold rounded-xl text-base
                          hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-200">
              <WhatsAppIcon />
              Discuter sur WhatsApp
            </a>
          </div>

          <p className="mt-8 text-xs text-slate-600 tracking-wide">
            Basé à Montpellier · France entière en remote · SIRET {SITE.siret}
          </p>
        </div>
      </section>
    </>
  );
}
