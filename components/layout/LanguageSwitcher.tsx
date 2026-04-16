'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';

const LOCALES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' },
  { code: 'en', label: 'English',  flag: '🇬🇧', short: 'EN' },
  { code: 'ar', label: 'العربية',  flag: '🇲🇦', short: 'AR' },
] as const;

type LocaleCode = (typeof LOCALES)[number]['code'];

export default function LanguageSwitcher() {
  const locale  = useLocale() as LocaleCode;
  const router  = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function switchLocale(next: LocaleCode) {
    if (next !== locale) {
      document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax${
        location.protocol === 'https:' ? ';secure' : ''
      }`;
      router.replace(pathname, { locale: next });
    }
    setOpen(false);
  }

  const current = LOCALES.find(l => l.code === locale)!;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Changer de langue"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium
                   text-slate-400 hover:text-white hover:bg-white/10
                   transition-all duration-150 outline-none
                   focus-visible:ring-2 focus-visible:ring-brand-500/60"
      >
        {/* Globe icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
             aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10
                   15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>

        <span>{current.short}</span>

        {/* Chevron */}
        <svg
          width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          aria-label="Choisir une langue"
          className="absolute right-0 rtl:right-auto rtl:left-0 top-[calc(100%+6px)]
                     w-44 py-1.5
                     bg-slate-900/95 backdrop-blur-md
                     border border-white/10 rounded-xl shadow-2xl
                     animate-slide-down z-50"
        >
          {LOCALES.map(({ code, label, flag }) => {
            const active = locale === code;
            return (
              <button
                key={code}
                role="option"
                aria-selected={active}
                onClick={() => switchLocale(code)}
                className={[
                  'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left rtl:text-right',
                  'transition-colors duration-100 outline-none',
                  active
                    ? 'text-brand-400 bg-brand-600/10 font-medium'
                    : 'text-slate-300 hover:text-white hover:bg-white/10',
                ].join(' ')}
              >
                <span aria-hidden="true" className="text-base leading-none">{flag}</span>
                <span className="flex-1">{label}</span>
                {active && (
                  <svg className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
