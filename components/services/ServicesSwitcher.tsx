'use client';

import { useState } from 'react';
import {
  Briefcase, Monitor,
  Cloud, Code2, Layout, Search,
  Home, AppWindow, Key, RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import { waLink } from '@/lib/whatsapp-presets';

/* ─── WhatsApp icon ───────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"
         aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Service card ────────────────────────────────────────────── */
interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  extra?: React.ReactNode;
  cta: string;
  ctaHref: string;
  waService?: string;
}

function ServiceCard({ icon, title, description, tags, extra, cta, ctaHref, waService }: CardProps) {
  const waHref = waService ? waLink(waService) : SITE.whatsapp;
  return (
    <div className="flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6
                    hover:border-slate-600/60 hover:bg-slate-900/80
                    transition-all duration-200 group">
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-brand-600/15 border border-brand-600/20
                      flex items-center justify-center mb-5 text-brand-400
                      group-hover:bg-brand-600/25 transition-colors duration-200">
        {icon}
      </div>

      <h3 className="text-base font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((t) => (
          <span key={t}
                className="px-2.5 py-0.5 text-xs font-mono text-slate-400
                           bg-slate-800 rounded-md border border-slate-700/50">
            {t}
          </span>
        ))}
      </div>

      {extra && <div className="mb-4">{extra}</div>}

      <div className="mt-auto flex flex-col gap-2">
        <Link href={ctaHref as Parameters<typeof Link>[0]['href']}
              className="inline-flex items-center gap-1.5 text-sm font-medium
                         text-brand-400 hover:text-brand-300 transition-colors duration-150">
          {cta}
          <ArrowRight size={14} />
        </Link>
        <a href={waHref} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 text-sm text-green-500
                      hover:text-green-400 transition-colors duration-150">
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ─── Tab A — Mission freelance ───────────────────────────────── */
function TabMission() {
  return (
    <div className="space-y-12">
      {/* A1. Chapeau */}
      <div className="max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
          Vous cherchez un expert disponible rapidement ?
        </h2>
        <p className="text-slate-400 leading-relaxed mb-6">
          Je travaille en mission courte ou longue durée, en remote ou sur site.
          Pas de commercial entre nous — vous parlez directement
          à celui qui va travailler sur votre projet.
        </p>
        <div className="flex flex-wrap gap-3">
          {['⚡ Démarrage sous 2 semaines', '🇫🇷 Remote France', '🚗 Déplacement possible'].map((b) => (
            <span key={b}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300
                             bg-slate-800/80 border border-slate-700/50 rounded-full">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* A2. Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ServiceCard
          icon={<Cloud size={20} />}
          title="DevOps & Infrastructure Cloud"
          description="Automatisez vos déploiements, fiabilisez votre production, passez à l'échelle sans stress."
          tags={['Docker', 'Kubernetes', 'AWS', 'Terraform', 'GitHub Actions', 'Ansible']}
          extra={
            <div className="flex flex-wrap gap-2 text-xs">
              <Link href="/devops-montpellier" className="text-slate-500 hover:text-slate-300 transition-colors">
                → Freelance DevOps Montpellier
              </Link>
            </div>
          }
          cta="Voir mes missions DevOps"
          ctaHref="/devops-france"
          waService="devops"
        />

        <ServiceCard
          icon={<Code2 size={20} />}
          title="Développement Java & Intégration"
          description="Applications métier robustes et intégration de vos systèmes d'information."
          tags={['Java 21', 'Spring Boot 3', 'TIBCO BW', 'TIBCO EMS', 'JMS']}
          extra={
            <div className="flex flex-col gap-1 text-xs">
              <p className="text-slate-500">Références : AMUE · Capgemini · Airbus · AIFE</p>
              <Link href="/tibco-freelance-france" className="text-slate-500 hover:text-slate-300 transition-colors">
                → Freelance TIBCO France
              </Link>
            </div>
          }
          cta="Voir mes missions Java"
          ctaHref="/java-spring-boot-freelance-france"
          waService="java"
        />

        <ServiceCard
          icon={<Layout size={20} />}
          title="Développement Web en mission"
          description="Renfort sur vos projets web : front, back, API, mise en production."
          tags={['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL']}
          cta="Voir mes missions web"
          ctaHref="/application-web-france"
          waService="web-mission"
        />

        <ServiceCard
          icon={<Search size={20} />}
          title="Audit & Conseil Technique"
          description="Un regard expert sur votre code, votre infra ou votre architecture avant d'aller plus loin."
          tags={['Audit infra', 'Revue de code', 'Conseil architecture', 'Formation équipe']}
          cta="Demander un audit"
          ctaHref="/contact?service=audit"
          waService="audit"
        />
      </div>

      {/* A3. Réassurance */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3
                      py-6 px-4 rounded-2xl bg-slate-900/40 border border-slate-800/60
                      text-sm text-slate-500">
        <span>🏢 AMUE · Capgemini · Airbus · Inetum · AIFE</span>
        <span className="hidden sm:block w-px h-4 bg-slate-700" aria-hidden="true" />
        <span>⚡ Démarrage sous 2 semaines</span>
        <span className="hidden sm:block w-px h-4 bg-slate-700" aria-hidden="true" />
        <span>📍 Montpellier — Remote toute la France</span>
        <span className="hidden sm:block w-px h-4 bg-slate-700" aria-hidden="true" />
        <span>📄 SIRET 999 008 329 00016</span>
      </div>

      {/* A4. CTA */}
      <div className="text-center py-12 px-4 rounded-2xl
                      bg-gradient-to-br from-slate-900 to-slate-900/40
                      border border-slate-800/80">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
          Vous avez une mission à pourvoir ?
        </h2>
        <p className="text-slate-400 mb-8">
          Réponse sous 48h, tarif transparent, pas d&apos;intermédiaire.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact"
                className="btn-gradient w-full sm:w-auto inline-flex items-center
                           justify-center px-7 py-3.5 text-white font-semibold rounded-xl">
            Envoyer ma mission
          </Link>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
             className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                        px-7 py-3.5 bg-green-500/10 text-green-400 border border-green-500/25
                        font-semibold rounded-xl
                        hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-200">
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Tab B — Création site & app ────────────────────────────── */
function TabCreation() {
  return (
    <div className="space-y-12">
      {/* B1. Chapeau */}
      <div className="max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
          Vous avez besoin d&apos;un site ou d&apos;une application ?
        </h2>
        <p className="text-slate-400 leading-relaxed mb-5">
          Artisan, commerçant, indépendant, gérant de TPE ou de PME —
          je crée votre présence en ligne de A à Z.
          Prix fixe, délais tenus, vous restez propriétaire de tout.
        </p>
        <Link href="/creation-site-web-application"
              className="inline-flex items-center gap-1.5 text-brand-400 font-medium
                         hover:text-brand-300 transition-colors text-sm">
          → Voir tous les tarifs et les offres détaillées
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* B2. Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ServiceCard
          icon={<Home size={20} />}
          title="Site vitrine professionnel"
          description="Votre meilleur commercial, disponible 24h/24. Il présente votre activité et vous ramène des clients."
          tags={['Artisans', 'Commerçants', 'Coachs', 'Professions libérales']}
          extra={
            <div className="space-y-1 text-xs text-slate-500">
              <p><span className="text-emerald-400 font-semibold">À partir de 490€</span> <span className="line-through">890€</span></p>
              <p>⏱ 2 à 3 semaines</p>
              <Link href="/creation-site-montpellier" className="hover:text-slate-300 transition-colors block">
                → Création site Montpellier
              </Link>
              <Link href="/creation-site-france" className="hover:text-slate-300 transition-colors block">
                → Création site France
              </Link>
            </div>
          }
          cta="En savoir plus"
          ctaHref="/creation-site-web-application"
          waService="site-vitrine"
        />

        <ServiceCard
          icon={<AppWindow size={20} />}
          title="Application web sur mesure"
          description="Réservations, espace client, gestion interne — l'outil exact dont vous avez besoin."
          tags={['Espace client', 'PME', 'Porteurs de projet', 'Startups']}
          extra={
            <div className="space-y-1 text-xs text-slate-500">
              <p><span className="text-emerald-400 font-semibold">À partir de 1 200€</span> <span className="line-through">2 490€</span></p>
              <p>⏱ 4 à 8 semaines</p>
              <Link href="/application-web-france" className="hover:text-slate-300 transition-colors block">
                → Application web France
              </Link>
            </div>
          }
          cta="Démarrer ce projet"
          ctaHref="/contact?service=application"
          waService="application"
        />

        <ServiceCard
          icon={<Key size={20} />}
          title="Clé en main — site + maintenance"
          description="Je gère tout : site, hébergement, mises à jour, sécurité. Vous faites votre métier."
          tags={['Zéro technique', 'Tous secteurs', 'Hébergement inclus']}
          extra={
            <div className="text-xs text-slate-500">
              <p><span className="text-emerald-400 font-semibold">À partir de 49€/mois</span> <span className="line-through">99€/mois</span></p>
              <p className="mt-0.5">Service continu</p>
            </div>
          }
          cta="Démarrer ce projet"
          ctaHref="/contact?service=cle-en-main"
          waService="cle-en-main"
        />

        <ServiceCard
          icon={<RefreshCw size={20} />}
          title="Refonte de votre site existant"
          description="Votre site est vieux, lent ou ne convertit pas ? Je le refais selon votre budget."
          tags={['Site existant', 'Performance', 'Design moderne']}
          extra={
            <div className="text-xs text-slate-500">
              <p><span className="text-slate-300 font-medium">Prix sur devis</span></p>
              <p className="mt-0.5">⏱ 2 à 4 semaines</p>
            </div>
          }
          cta="Faire auditer mon site"
          ctaHref="/contact?service=refonte"
          waService="refonte"
        />
      </div>

      {/* B3. Réassurance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          'Prix fixe avant de commencer — jamais de surprise',
          'Vous validez à chaque étape',
          '100% propriétaire de votre site',
          'Disponible après la livraison',
        ].map((item) => (
          <div key={item}
               className="flex items-center gap-3 px-4 py-3
                          bg-slate-900/40 border border-slate-800/60 rounded-xl text-sm text-slate-300">
            <span className="text-emerald-400 shrink-0">✅</span>
            {item}
          </div>
        ))}
      </div>

      {/* B4. CTA */}
      <div className="text-center py-12 px-4 rounded-2xl
                      bg-gradient-to-br from-slate-900 to-slate-900/40
                      border border-slate-800/80">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
          Quel que soit votre projet, on peut en parler.
        </h2>
        <p className="text-slate-400 mb-8">
          30 minutes d&apos;échange gratuit, sans engagement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <Link href="/contact"
                className="btn-gradient w-full sm:w-auto inline-flex items-center
                           justify-center px-7 py-3.5 text-white font-semibold rounded-xl">
            Demander un devis gratuit
          </Link>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
             className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                        px-7 py-3.5 bg-green-500/10 text-green-400 border border-green-500/25
                        font-semibold rounded-xl
                        hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-200">
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
        <p className="text-xs text-slate-600">
          Basé à Montpellier · Remote toute la France
        </p>
      </div>
    </div>
  );
}

/* ─── Main switcher component ─────────────────────────────────── */
type Tab = 'mission' | 'creation';

export default function ServicesSwitcher() {
  const [tab, setTab] = useState<Tab>('mission');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

      {/* ── Switcher tabs ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12 p-1.5
                      bg-slate-900/60 border border-slate-800 rounded-2xl w-full sm:w-fit mx-auto">
        {([
          {
            id: 'mission' as Tab,
            icon: <Briefcase size={18} />,
            label: 'Mission freelance',
            sub: 'Entreprises · ESN · Grands comptes',
          },
          {
            id: 'creation' as Tab,
            icon: <Monitor size={18} />,
            label: 'Création site & app',
            sub: 'Artisans · Commerçants · Indépendants · TPE · PME',
          },
        ] as const).map(({ id, icon, label, sub }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-left
                        transition-all duration-200 min-w-[220px]
                        ${tab === id
                          ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`}>
            <span className="shrink-0">{icon}</span>
            <span>
              <span className="block text-sm font-semibold">{label}</span>
              <span className={`block text-xs mt-0.5 ${tab === id ? 'text-blue-200' : 'text-slate-600'}`}>
                {sub}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* ── Tab content with fade transition ── */}
      <div key={tab}
           className="animate-[fadeIn_0.2s_ease-out]">
        {tab === 'mission' ? <TabMission /> : <TabCreation />}
      </div>
    </div>
  );
}
