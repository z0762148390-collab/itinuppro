'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
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

/* ─── Header ────────────────────────────────────────────────────────────── */
export default function Header() {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { href: '/services' as const, label: t('services') },
    { href: '/blog'     as const, label: t('blog')     },
    { href: '/contact'  as const, label: t('contact')  },
  ] as const;

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

          {/* Desktop nav — centré en absolu, indépendant de la largeur du logo */}
          <nav aria-label="Navigation principale"
               className="hidden md:flex items-center gap-7
                          absolute left-1/2 -translate-x-1/2">
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

          {/* Mobile */}
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
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-slate-300
                               rounded-lg hover:bg-white/8 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} aria-label={t('cta')}
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
