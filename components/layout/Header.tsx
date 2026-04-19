'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import { ChevronDown, Rocket, Briefcase, Monitor } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

/* ─── Logo ───────────────────────────────────────────────────────────────────
 * < itinup >
 * Les chevrons < et > s'ouvrent depuis le centre du mot vers les côtés.
 * Animation : translateX ±7 px + fondu couleur brand-500 → violet-400.
 * ─────────────────────────────────────────────────────────────────────────── */
function Logo() {
  return (
    <span className="logo-word select-none" aria-label="itinup">
      <span className="logo-chevron logo-chevron-lt" aria-hidden="true">&lt;</span>
      <span className="logo-text">{SITE.name}</span>
      <span className="logo-chevron logo-chevron-gt" aria-hidden="true">&gt;</span>
    </span>
  );
}

/* ─── Services dropdown content ─────────────────────────────────────────── */
type DropdownItem = {
  href: string;
  label: string;
  desc: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  ariaLabel: string;
};

function getDropdownItems(locale: string): DropdownItem[] {
  const launchHref = locale === 'fr' ? '/lancer-mon-projet' : '/start-my-project';

  const content: Record<string, DropdownItem[]> = {
    fr: [
      {
        href:      launchHref,
        label:     'Lancer mon projet',
        desc:      'MVP, SaaS, accompagnement tech',
        Icon:      Rocket,
        badge:     'Nouveau',
        ariaLabel: 'Lancer mon projet tech avec itinup',
      },
      {
        href:      '/services?tab=mission',
        label:     'Mission freelance',
        desc:      'DevOps, Java Spring, TIBCO, Backend',
        Icon:      Briefcase,
        ariaLabel: 'Missions freelance DevOps et Java à Montpellier',
      },
      {
        href:      '/services?tab=creation',
        label:     'Création site & app',
        desc:      'Sites web, applications, maintenance',
        Icon:      Monitor,
        ariaLabel: 'Création de site web et application sur mesure',
      },
    ],
    en: [
      {
        href:      launchHref,
        label:     'Start my project',
        desc:      'MVP, SaaS, tech support',
        Icon:      Rocket,
        badge:     'New',
        ariaLabel: 'Start my tech project with itinup',
      },
      {
        href:      '/services?tab=mission',
        label:     'Freelance mission',
        desc:      'DevOps, Java Spring, TIBCO, Backend',
        Icon:      Briefcase,
        ariaLabel: 'Freelance DevOps and Java missions in Montpellier',
      },
      {
        href:      '/services?tab=creation',
        label:     'Website & app creation',
        desc:      'Websites, applications, maintenance',
        Icon:      Monitor,
        ariaLabel: 'Custom website and application creation',
      },
    ],
    ar: [
      {
        href:      launchHref,
        label:     'أطلق مشروعي',
        desc:      'MVP، SaaS، دعم تقني',
        Icon:      Rocket,
        badge:     'جديد',
        ariaLabel: 'إطلاق مشروعي التقني مع itinup',
      },
      {
        href:      '/services?tab=mission',
        label:     'مهمة مستقلة',
        desc:      'DevOps، Java Spring، TIBCO، Backend',
        Icon:      Briefcase,
        ariaLabel: 'مهام مستقلة DevOps وJava في مونبليه',
      },
      {
        href:      '/services?tab=creation',
        label:     'إنشاء موقع وتطبيق',
        desc:      'مواقع ويب، تطبيقات، صيانة',
        Icon:      Monitor,
        ariaLabel: 'إنشاء موقع ويب وتطبيق مخصص',
      },
    ],
  };

  return (content[locale] ?? content['fr'])!;
}

/* ─── Header ────────────────────────────────────────────────────────────── */
export default function Header() {
  const t      = useTranslations('nav');
  const locale = useLocale();

  const [mobileOpen,         setMobileOpen]         = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled,           setScrolled]           = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const dropdownItems = getDropdownItems(locale);

  const navLinks = [
    { href: '/blog'    as const, label: t('blog')    },
    { href: '/contact' as const, label: t('contact') },
  ] as const;

  function closeMobile() {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <header className={[
      'sticky top-0 z-40 transition-all duration-300',
      scrolled ? 'header-glass' : 'bg-slate-950 border-b border-white/5',
    ].join(' ')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" aria-label={`${SITE.name} — accueil`}
                className="outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded-lg">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigation principale"
               className="hidden md:flex items-center gap-7
                          absolute left-1/2 -translate-x-1/2">

            {/* Services — dropdown */}
            <div
              className="relative group/services"
              onMouseEnter={() => {/* CSS handles it */}}
            >
              <button
                aria-haspopup="true"
                aria-label="Services — menu déroulant"
                className="flex items-center gap-1 text-sm font-medium
                           text-slate-400 hover:text-white transition-colors
                           group-hover/services:text-white">
                {t('services')}
                <ChevronDown
                  size={13}
                  className="transition-transform duration-200 group-hover/services:rotate-180"
                />
              </button>

              {/* Dropdown panel */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50
                              invisible opacity-0 translate-y-1 pointer-events-none
                              group-hover/services:visible group-hover/services:opacity-100
                              group-hover/services:translate-y-0 group-hover/services:pointer-events-auto
                              transition-all duration-150">
                <div className="w-64 bg-slate-900 border border-slate-800
                                rounded-xl shadow-xl shadow-black/50 overflow-hidden p-1.5">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as Parameters<typeof Link>[0]['href']}
                      aria-label={item.ariaLabel}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg
                                 hover:bg-slate-800 transition-colors group/item">
                      <span className="mt-0.5 text-brand-400 shrink-0">
                        <item.Icon size={15} />
                      </span>
                      <span>
                        <span className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-slate-200
                                           group-hover/item:text-white">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-semibold text-brand-400
                                             bg-brand-500/10 border border-brand-500/20
                                             rounded-full px-1.5 py-0.5 leading-none">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5 block">
                          {item.desc}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other links */}
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                    className="text-sm font-medium text-slate-400 hover:text-white transition-none">
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <span className="w-px h-5 bg-white/10" aria-hidden="true" />
            <Link href="/contact" aria-label={t('cta')}
                  className="btn-gradient inline-flex items-center gap-1.5 px-4 py-2
                             text-sm font-semibold text-white rounded-lg">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
                   aria-hidden="true" className="opacity-80">
                <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
              </svg>
              {t('cta')}
            </Link>
          </div>

          {/* Mobile burger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setMobileOpen(o => !o)}
                    aria-expanded={mobileOpen} aria-controls="mobile-menu"
                    aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6"  x2="6"  y2="18"/>
                  <line x1="6"  y1="6"  x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="3" y1="6"  x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-white/5 bg-slate-950">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Navigation mobile">

            {/* Services — expandable */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(o => !o)}
                aria-expanded={mobileServicesOpen}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium
                           text-slate-300 rounded-lg hover:bg-white/8 hover:text-white transition-colors">
                {t('services')}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-slate-800 pl-3">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as Parameters<typeof Link>[0]['href']}
                      onClick={closeMobile}
                      aria-label={item.ariaLabel}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-400
                                 rounded-lg hover:bg-white/8 hover:text-white transition-colors">
                      <span className="text-brand-400 shrink-0">
                        <item.Icon size={14} />
                      </span>
                      <span className="flex items-center gap-2 flex-wrap">
                        {item.label}
                        {item.badge && (
                          <span className="text-[10px] font-semibold text-brand-400
                                           bg-brand-500/10 border border-brand-500/20
                                           rounded-full px-1.5 py-0.5 leading-none">
                            {item.badge}
                          </span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other links */}
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={closeMobile}
                    className="px-3 py-2.5 text-sm font-medium text-slate-300
                               rounded-lg hover:bg-white/8 hover:text-white transition-colors">
                {label}
              </Link>
            ))}

            <Link href="/contact" onClick={closeMobile} aria-label={t('cta')}
                  className="btn-gradient mt-2 flex items-center justify-center
                             px-4 py-3 text-sm font-semibold text-white rounded-lg">
              {t('cta')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
