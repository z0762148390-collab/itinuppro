'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase, Monitor,
  Cloud, Code2, Layout, Search,
  Home, AppWindow, Key, RefreshCw,
  ArrowRight, Rocket,
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

/* ─── Locale-aware content ────────────────────────────────────── */

type SwitcherContent = {
  // Tabs
  tab1Label: string; tab1Sub: string;
  tab2Label: string; tab2Sub: string;
  // Mission tab
  mH2: string; mP: string; mBadges: [string, string, string];
  devopsTitle: string; devopsDesc: string; devopsAnchor: string; devopsCta: string;
  javaTitle: string; javaDesc: string; javaRefs: string; javaTibco: string; javaCta: string;
  webTitle: string; webDesc: string; webCta: string;
  auditTitle: string; auditDesc: string; auditCta: string;
  launchTitle: string; launchDesc: string; launchCta: string; launchHref: string;
  mReassurance: [string, string, string, string];
  mCtaH2: string; mCtaP: string; mCtaBtn: string;
  // Creation tab
  cH2: string; cP: string; cLinkText: string;
  vitrineTitle: string; vitrineDesc: string; vitrineFrom: string; vitrineDelivery: string;
  vitrineAnchor1: string; vitrineAnchor2: string; vitrineCta: string;
  appTitle: string; appDesc: string; appFrom: string; appDelivery: string;
  appAnchor: string; appCta: string;
  cleTitle: string; cleDesc: string; cleFrom: string; cleDelivery: string; cleCta: string;
  refonteTitle: string; refonteDesc: string; refontePrice: string; refonteDelivery: string; refonteCta: string;
  cReassurance: [string, string, string, string];
  cCtaH2: string; cCtaP: string; cCtaBtn: string; cCtaNote: string;
};

const LANG: Record<string, SwitcherContent> = {
  fr: {
    tab1Label: 'Mission freelance',    tab1Sub: 'Entreprises · ESN · Grands comptes',
    tab2Label: 'Création site & app',  tab2Sub: 'Artisans · Commerçants · Indépendants · TPE · PME',

    mH2: 'Vous cherchez un expert disponible rapidement ?',
    mP: 'Je travaille en mission courte ou longue durée, en remote ou sur site. Pas de commercial entre nous — vous parlez directement à celui qui va travailler sur votre projet.',
    mBadges: ['⚡ Démarrage sous 2 semaines', '🇫🇷 Remote France', '🚗 Déplacement possible'],

    devopsTitle: 'DevOps & Infrastructure Cloud',
    devopsDesc: 'Automatisez vos déploiements, fiabilisez votre production, passez à l\'échelle sans stress.',
    devopsAnchor: '→ Freelance DevOps Montpellier',
    devopsCta: 'Voir mes missions DevOps',

    javaTitle: 'Développement Java & Intégration',
    javaDesc: 'Applications métier robustes et intégration de vos systèmes d\'information.',
    javaRefs: 'Références : AMUE · Capgemini · Airbus · AIFE',
    javaTibco: '→ Freelance TIBCO France',
    javaCta: 'Voir mes missions Java',

    webTitle: 'Développement Web en mission',
    webDesc: 'Renfort sur vos projets web : front, back, API, mise en production.',
    webCta: 'Voir mes missions web',

    auditTitle: 'Audit & Conseil Technique',
    auditDesc: 'Un regard expert sur votre code, votre infra ou votre architecture avant d\'aller plus loin.',
    auditCta: 'Demander un audit',

    launchTitle: 'Lancement de projet & MVP',
    launchDesc: 'Vous avez une idée ? Je vous accompagne de l\'idée au produit en production.',
    launchCta: 'En savoir plus',
    launchHref: '/lancer-mon-projet',

    mReassurance: [
      '🏢 AMUE · Capgemini · Airbus · Inetum · AIFE',
      '⚡ Démarrage sous 2 semaines',
      '📍 Montpellier — Remote toute la France',
      '📄 SIRET 999 008 329 00016',
    ],
    mCtaH2: 'Vous avez une mission à pourvoir ?',
    mCtaP: 'Réponse sous 48h, tarif transparent, pas d\'intermédiaire.',
    mCtaBtn: 'Envoyer ma mission',

    cH2: 'Vous avez besoin d\'un site ou d\'une application ?',
    cP: 'Artisan, commerçant, indépendant, gérant de TPE ou de PME — je crée votre présence en ligne de A à Z. Prix fixe, délais tenus, vous restez propriétaire de tout.',
    cLinkText: '→ Voir tous les tarifs et les offres détaillées',

    vitrineTitle: 'Site vitrine professionnel',
    vitrineDesc: 'Votre meilleur commercial, disponible 24h/24. Il présente votre activité et vous ramène des clients.',
    vitrineFrom: 'À partir de 490€', vitrineDelivery: '⏱ 2 à 3 semaines',
    vitrineAnchor1: '→ Création site Montpellier',
    vitrineAnchor2: '→ Création site France',
    vitrineCta: 'En savoir plus',

    appTitle: 'Application web sur mesure',
    appDesc: 'Réservations, espace client, gestion interne — l\'outil exact dont vous avez besoin.',
    appFrom: 'À partir de 1 200€', appDelivery: '⏱ 4 à 8 semaines',
    appAnchor: '→ Application web France',
    appCta: 'Démarrer ce projet',

    cleTitle: 'Clé en main — site + maintenance',
    cleDesc: 'Je gère tout : site, hébergement, mises à jour, sécurité. Vous faites votre métier.',
    cleFrom: 'À partir de 49€/mois', cleDelivery: 'Service continu',
    cleCta: 'Démarrer ce projet',

    refonteTitle: 'Refonte de votre site existant',
    refonteDesc: 'Votre site est vieux, lent ou ne convertit pas ? Je le refais selon votre budget.',
    refontePrice: 'Prix sur devis', refonteDelivery: '⏱ 2 à 4 semaines',
    refonteCta: 'Faire auditer mon site',

    cReassurance: [
      'Prix fixe avant de commencer — jamais de surprise',
      'Vous validez à chaque étape',
      '100% propriétaire de votre site',
      'Disponible après la livraison',
    ],
    cCtaH2: 'Quel que soit votre projet, on peut en parler.',
    cCtaP: '30 minutes d\'échange gratuit, sans engagement.',
    cCtaBtn: 'Demander un devis gratuit',
    cCtaNote: 'Basé à Montpellier · Remote toute la France',
  },

  en: {
    tab1Label: 'Freelance missions',  tab1Sub: 'Companies · Tech firms · Enterprise',
    tab2Label: 'Website & app',       tab2Sub: 'Craftsmen · Retailers · Freelancers · SMEs',

    mH2: 'Looking for an available expert quickly?',
    mP: 'I work on short or long-term missions, remote or on-site. No account manager between us — you speak directly to the person working on your project.',
    mBadges: ['⚡ Start within 2 weeks', '🇫🇷 Remote France', '🚗 Travel possible'],

    devopsTitle: 'DevOps & Cloud Infrastructure',
    devopsDesc: 'Automate your deployments, stabilise your production, scale without stress.',
    devopsAnchor: '→ DevOps Freelancer Montpellier',
    devopsCta: 'View my DevOps missions',

    javaTitle: 'Java & Integration Development',
    javaDesc: 'Robust business applications and integration of your information systems.',
    javaRefs: 'References: AMUE · Capgemini · Airbus · AIFE',
    javaTibco: '→ TIBCO Freelancer France',
    javaCta: 'View my Java missions',

    webTitle: 'Web Development missions',
    webDesc: 'Reinforcement on your web projects: front, back, API, production deployment.',
    webCta: 'View my web missions',

    auditTitle: 'Technical Audit & Consulting',
    auditDesc: 'An expert review of your code, infrastructure, or architecture before going further.',
    auditCta: 'Request an audit',

    launchTitle: 'Project launch & MVP',
    launchDesc: 'Got an idea? I take you from idea to product in production.',
    launchCta: 'Learn more',
    launchHref: '/start-my-project',

    mReassurance: [
      '🏢 AMUE · Capgemini · Airbus · Inetum · AIFE',
      '⚡ Start within 2 weeks',
      '📍 Montpellier — Remote across France',
      '📄 SIRET 999 008 329 00016',
    ],
    mCtaH2: 'Do you have a mission to fill?',
    mCtaP: 'Response within 48h, transparent rate, no middleman.',
    mCtaBtn: 'Send my mission',

    cH2: 'Do you need a website or application?',
    cP: 'Craftsman, retailer, freelancer, SME owner — I create your online presence from A to Z. Fixed price, deadlines met, you own everything.',
    cLinkText: '→ View all pricing and detailed offers',

    vitrineTitle: 'Professional showcase website',
    vitrineDesc: 'Your best salesperson, available 24/7. Presents your business and brings you clients.',
    vitrineFrom: 'From €490', vitrineDelivery: '⏱ 2 to 3 weeks',
    vitrineAnchor1: '→ Website creation Montpellier',
    vitrineAnchor2: '→ Website creation France',
    vitrineCta: 'Learn more',

    appTitle: 'Custom web application',
    appDesc: 'Bookings, client area, internal management — the exact tool you need.',
    appFrom: 'From €1,200', appDelivery: '⏱ 4 to 8 weeks',
    appAnchor: '→ Web application France',
    appCta: 'Start this project',

    cleTitle: 'Turnkey — site + maintenance',
    cleDesc: 'I handle everything: site, hosting, updates, security. You do your job.',
    cleFrom: 'From €49/month', cleDelivery: 'Ongoing service',
    cleCta: 'Start this project',

    refonteTitle: 'Redesign your existing site',
    refonteDesc: 'Is your site old, slow, or not converting? I rebuild it to your budget.',
    refontePrice: 'Quote on request', refonteDelivery: '⏱ 2 to 4 weeks',
    refonteCta: 'Get my site audited',

    cReassurance: [
      'Fixed price before starting — no surprises',
      'You validate at each step',
      '100% owner of your site',
      'Available after delivery',
    ],
    cCtaH2: 'Whatever your project, let\'s talk.',
    cCtaP: 'Free 30-minute exchange, no commitment.',
    cCtaBtn: 'Request a free quote',
    cCtaNote: 'Based in Montpellier · Remote across France',
  },

  ar: {
    tab1Label: 'مهام مستقلة',      tab1Sub: 'شركات · مؤسسات تقنية · كبار العملاء',
    tab2Label: 'إنشاء موقع وتطبيق', tab2Sub: 'حرفيون · تجار · مستقلون · مؤسسات صغيرة',

    mH2: 'تبحث عن خبير متاح بسرعة؟',
    mP: 'أعمل في مهام قصيرة أو طويلة الأمد، عن بُعد أو حضورياً. لا وسيط بيننا — تتحدث مباشرةً مع من سيعمل على مشروعك.',
    mBadges: ['⚡ بدء خلال أسبوعين', '🇫🇷 عن بُعد في فرنسا', '🚗 تنقل ممكن'],

    devopsTitle: 'DevOps والبنية التحتية السحابية',
    devopsDesc: 'أتمتة النشر، تثبيت الإنتاج، توسيع النطاق دون توتر.',
    devopsAnchor: '→ مستقل DevOps في مونبوليي',
    devopsCta: 'مهامي في DevOps',

    javaTitle: 'تطوير Java والتكامل',
    javaDesc: 'تطبيقات تجارية متينة وتكامل أنظمة المعلومات.',
    javaRefs: 'مراجع: AMUE · Capgemini · Airbus · AIFE',
    javaTibco: '→ مستقل TIBCO في فرنسا',
    javaCta: 'مهامي في Java',

    webTitle: 'تطوير الويب في مهمة',
    webDesc: 'دعم مشاريع الويب: واجهة، خلفية، API، نشر للإنتاج.',
    webCta: 'مهامي في تطوير الويب',

    auditTitle: 'تدقيق واستشارة تقنية',
    auditDesc: 'نظرة خبيرة على كودك أو بنيتك التحتية أو معمارية النظام قبل المضي قدماً.',
    auditCta: 'طلب تدقيق',

    launchTitle: 'إطلاق المشروع و MVP',
    launchDesc: 'لديك فكرة؟ أرافقك من الفكرة إلى المنتج في الإنتاج.',
    launchCta: 'اعرف أكثر',
    launchHref: '/start-my-project',

    mReassurance: [
      '🏢 AMUE · Capgemini · Airbus · Inetum · AIFE',
      '⚡ بدء خلال أسبوعين',
      '📍 مونبوليي — عن بُعد في فرنسا',
      '📄 SIRET 999 008 329 00016',
    ],
    mCtaH2: 'لديك مهمة لملئها؟',
    mCtaP: 'رد خلال 48 ساعة، سعر شفاف، لا وسيط.',
    mCtaBtn: 'أرسل مهمتك',

    cH2: 'هل تحتاج موقعاً أو تطبيقاً؟',
    cP: 'حرفي، تاجر، مستقل، صاحب مؤسسة صغيرة — أنشئ حضورك الرقمي من الألف إلى الياء. سعر ثابت، مواعيد محترمة، أنت المالك بالكامل.',
    cLinkText: '→ عرض جميع الأسعار والعروض التفصيلية',

    vitrineTitle: 'موقع ويب احترافي',
    vitrineDesc: 'أفضل مندوب مبيعات لديك، متاح 24/7. يعرض نشاطك ويجلب لك العملاء.',
    vitrineFrom: 'من 490€', vitrineDelivery: '⏱ 2 إلى 3 أسابيع',
    vitrineAnchor1: '→ إنشاء موقع في مونبوليي',
    vitrineAnchor2: '→ إنشاء موقع في فرنسا',
    vitrineCta: 'اعرف أكثر',

    appTitle: 'تطبيق ويب مخصص',
    appDesc: 'حجوزات، منطقة عميل، إدارة داخلية — الأداة التي تحتاجها بالضبط.',
    appFrom: 'من 1200€', appDelivery: '⏱ 4 إلى 8 أسابيع',
    appAnchor: '→ تطبيق ويب في فرنسا',
    appCta: 'ابدأ هذا المشروع',

    cleTitle: 'خدمة متكاملة — موقع + صيانة',
    cleDesc: 'أتولى كل شيء: الموقع، الاستضافة، التحديثات، الأمان. أنت تمارس مهنتك.',
    cleFrom: 'من 49€/شهر', cleDelivery: 'خدمة مستمرة',
    cleCta: 'ابدأ هذا المشروع',

    refonteTitle: 'إعادة تصميم موقعك الحالي',
    refonteDesc: 'موقعك قديم أو بطيء أو لا يحول الزوار؟ أعيد بناءه حسب ميزانيتك.',
    refontePrice: 'سعر على طلب', refonteDelivery: '⏱ 2 إلى 4 أسابيع',
    refonteCta: 'تدقيق موقعي',

    cReassurance: [
      'سعر ثابت قبل البدء — لا مفاجآت',
      'تصادق على كل خطوة',
      'أنت المالك الكامل لموقعك',
      'متاح بعد التسليم',
    ],
    cCtaH2: 'مهما كان مشروعك، يمكننا التحدث.',
    cCtaP: '30 دقيقة مجانية، دون التزام.',
    cCtaBtn: 'طلب عرض سعر مجاني',
    cCtaNote: 'مقيم في مونبوليي · عن بُعد في فرنسا',
  },
};

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
      <div className="w-11 h-11 rounded-xl bg-brand-600/15 border border-brand-600/20
                      flex items-center justify-center mb-5 text-brand-400
                      group-hover:bg-brand-600/25 transition-colors duration-200">
        {icon}
      </div>

      <h3 className="text-base font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>

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
function TabMission({ l }: { l: SwitcherContent }) {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">{l.mH2}</h2>
        <p className="text-slate-400 leading-relaxed mb-6">{l.mP}</p>
        <div className="flex flex-wrap gap-3">
          {l.mBadges.map((b) => (
            <span key={b}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300
                             bg-slate-800/80 border border-slate-700/50 rounded-full">
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ServiceCard
          icon={<Cloud size={20} />}
          title={l.devopsTitle}
          description={l.devopsDesc}
          tags={['Docker', 'Kubernetes', 'AWS', 'Terraform', 'GitHub Actions', 'Ansible']}
          extra={
            <div className="flex flex-wrap gap-2 text-xs">
              <Link href="/devops-montpellier" className="text-slate-500 hover:text-slate-300 transition-colors">
                {l.devopsAnchor}
              </Link>
            </div>
          }
          cta={l.devopsCta}
          ctaHref="/devops-france"
          waService="devops"
        />

        <ServiceCard
          icon={<Code2 size={20} />}
          title={l.javaTitle}
          description={l.javaDesc}
          tags={['Java 21', 'Spring Boot 3', 'TIBCO BW', 'TIBCO EMS', 'JMS']}
          extra={
            <div className="flex flex-col gap-1 text-xs">
              <p className="text-slate-500">{l.javaRefs}</p>
              <Link href="/tibco-freelance-france" className="text-slate-500 hover:text-slate-300 transition-colors">
                {l.javaTibco}
              </Link>
            </div>
          }
          cta={l.javaCta}
          ctaHref="/java-spring-boot-freelance-france"
          waService="java"
        />

        <ServiceCard
          icon={<Layout size={20} />}
          title={l.webTitle}
          description={l.webDesc}
          tags={['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL']}
          cta={l.webCta}
          ctaHref="/application-web-france"
          waService="web-mission"
        />

        <ServiceCard
          icon={<Search size={20} />}
          title={l.auditTitle}
          description={l.auditDesc}
          tags={['Audit infra', 'Code review', 'Architecture', 'Team training']}
          cta={l.auditCta}
          ctaHref="/contact?service=audit"
          waService="audit"
        />

        <div className="sm:col-span-2">
          <ServiceCard
            icon={<Rocket size={20} />}
            title={l.launchTitle}
            description={l.launchDesc}
            tags={['MVP', 'SaaS', 'Startup', 'Next.js', 'FastAPI']}
            cta={l.launchCta}
            ctaHref={l.launchHref}
            waService="launch"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3
                      py-6 px-4 rounded-2xl bg-slate-900/40 border border-slate-800/60
                      text-sm text-slate-500">
        {l.mReassurance.map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && <span className="hidden sm:block w-px h-4 bg-slate-700" aria-hidden="true" />}
            <span>{item}</span>
          </React.Fragment>
        ))}
      </div>

      <div className="text-center py-12 px-4 rounded-2xl
                      bg-gradient-to-br from-slate-900 to-slate-900/40
                      border border-slate-800/80">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">{l.mCtaH2}</h2>
        <p className="text-slate-400 mb-8">{l.mCtaP}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact"
                className="btn-gradient w-full sm:w-auto inline-flex items-center
                           justify-center px-7 py-3.5 text-white font-semibold rounded-xl">
            {l.mCtaBtn}
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
function TabCreation({ l }: { l: SwitcherContent }) {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">{l.cH2}</h2>
        <p className="text-slate-400 leading-relaxed mb-5">{l.cP}</p>
        <Link href="/creation-site-web-application"
              className="inline-flex items-center gap-1.5 text-brand-400 font-medium
                         hover:text-brand-300 transition-colors text-sm">
          {l.cLinkText}
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ServiceCard
          icon={<Home size={20} />}
          title={l.vitrineTitle}
          description={l.vitrineDesc}
          tags={['Artisans', 'Commerçants', 'Coachs', 'Professions libérales']}
          extra={
            <div className="space-y-1 text-xs text-slate-500">
              <p><span className="text-emerald-400 font-semibold">{l.vitrineFrom}</span> <span className="line-through">890€</span></p>
              <p>{l.vitrineDelivery}</p>
              <Link href="/creation-site-montpellier" className="hover:text-slate-300 transition-colors block">
                {l.vitrineAnchor1}
              </Link>
              <Link href="/creation-site-france" className="hover:text-slate-300 transition-colors block">
                {l.vitrineAnchor2}
              </Link>
            </div>
          }
          cta={l.vitrineCta}
          ctaHref="/creation-site-web-application"
          waService="site-vitrine"
        />

        <ServiceCard
          icon={<AppWindow size={20} />}
          title={l.appTitle}
          description={l.appDesc}
          tags={['Espace client', 'PME', 'Startups', 'Porteurs de projet']}
          extra={
            <div className="space-y-1 text-xs text-slate-500">
              <p><span className="text-emerald-400 font-semibold">{l.appFrom}</span> <span className="line-through">2 490€</span></p>
              <p>{l.appDelivery}</p>
              <Link href="/application-web-france" className="hover:text-slate-300 transition-colors block">
                {l.appAnchor}
              </Link>
            </div>
          }
          cta={l.appCta}
          ctaHref="/contact?service=application"
          waService="application"
        />

        <ServiceCard
          icon={<Key size={20} />}
          title={l.cleTitle}
          description={l.cleDesc}
          tags={['Zéro technique', 'Tous secteurs', 'Hébergement inclus']}
          extra={
            <div className="text-xs text-slate-500">
              <p><span className="text-emerald-400 font-semibold">{l.cleFrom}</span> <span className="line-through">99€/mois</span></p>
              <p className="mt-0.5">{l.cleDelivery}</p>
            </div>
          }
          cta={l.cleCta}
          ctaHref="/contact?service=cle-en-main"
          waService="cle-en-main"
        />

        <ServiceCard
          icon={<RefreshCw size={20} />}
          title={l.refonteTitle}
          description={l.refonteDesc}
          tags={['Site existant', 'Performance', 'Design moderne']}
          extra={
            <div className="text-xs text-slate-500">
              <p><span className="text-slate-300 font-medium">{l.refontePrice}</span></p>
              <p className="mt-0.5">{l.refonteDelivery}</p>
            </div>
          }
          cta={l.refonteCta}
          ctaHref="/contact?service=refonte"
          waService="refonte"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {l.cReassurance.map((item) => (
          <div key={item}
               className="flex items-center gap-3 px-4 py-3
                          bg-slate-900/40 border border-slate-800/60 rounded-xl text-sm text-slate-300">
            <span className="text-emerald-400 shrink-0">✅</span>
            {item}
          </div>
        ))}
      </div>

      <div className="text-center py-12 px-4 rounded-2xl
                      bg-gradient-to-br from-slate-900 to-slate-900/40
                      border border-slate-800/80">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">{l.cCtaH2}</h2>
        <p className="text-slate-400 mb-8">{l.cCtaP}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <Link href="/contact"
                className="btn-gradient w-full sm:w-auto inline-flex items-center
                           justify-center px-7 py-3.5 text-white font-semibold rounded-xl">
            {l.cCtaBtn}
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
        <p className="text-xs text-slate-600">{l.cCtaNote}</p>
      </div>
    </div>
  );
}

/* ─── Main switcher ───────────────────────────────────────────── */
type Tab = 'mission' | 'creation';

export default function ServicesSwitcher({ locale = 'fr', initialTab = 'mission' }: { locale?: string; initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);
  const l = LANG[locale] ?? LANG['fr']!;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* ── Tabs ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12 p-1.5
                      bg-slate-900/60 border border-slate-800 rounded-2xl w-full sm:w-fit mx-auto">
        {([
          { id: 'mission' as Tab, icon: <Briefcase size={18} />, label: l.tab1Label, sub: l.tab1Sub },
          { id: 'creation' as Tab, icon: <Monitor size={18} />,  label: l.tab2Label, sub: l.tab2Sub },
        ]).map(({ id, icon, label, sub }) => (
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

      {/* ── Tab content ── */}
      <div key={tab} className="animate-[fadeIn_0.2s_ease-out]">
        {tab === 'mission'
          ? <TabMission l={l} />
          : <TabCreation l={l} />
        }
      </div>
    </div>
  );
}
