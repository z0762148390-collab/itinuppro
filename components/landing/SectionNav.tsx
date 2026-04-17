'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

function ChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function SectionNav() {
  const sectionsRef    = useRef<HTMLElement[]>([]);
  const isProgrammatic = useRef(false);
  const timerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentIdxRef  = useRef(0);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [total, setTotal]           = useState(0);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('#main-content section')
    );
    sectionsRef.current = els;
    setTotal(els.length);

    const onScroll = () => {
      /* Ignore scroll events triggered by our own goTo() */
      if (isProgrammatic.current) return;

      const mid = window.scrollY + window.innerHeight * 0.45;
      let idx = 0;
      els.forEach((el, i) => {
        if (el.offsetTop <= mid) idx = i;
      });

      if (idx !== currentIdxRef.current) {
        currentIdxRef.current = idx;
        setCurrentIdx(idx);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = useCallback((idx: number) => {
    const el = sectionsRef.current[idx];
    if (!el) return;

    /* Lock scroll detection while animating */
    isProgrammatic.current = true;
    currentIdxRef.current  = idx;
    setCurrentIdx(idx);

    el.scrollIntoView({ behavior: 'smooth' });

    /* Unlock after scroll animation completes (~800 ms) */
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      isProgrammatic.current = false;
    }, 900);
  }, []);

  if (total === 0) return null;

  const atTop    = currentIdx === 0;
  const atBottom = currentIdx === total - 1;

  const btnMobile = `w-9 h-9 rounded-full
    bg-slate-800/90 backdrop-blur-md border border-slate-700/60
    flex items-center justify-center text-slate-300
    shadow-lg shadow-black/30 transition-all duration-200
    hover:bg-slate-700/90 hover:text-white
    disabled:opacity-20 disabled:pointer-events-none`;

  const btnDesktop = `w-8 h-8 rounded-full
    bg-slate-800/80 backdrop-blur-md border border-slate-700/50
    flex items-center justify-center text-slate-400
    transition-all duration-200
    hover:bg-slate-700/90 hover:text-white hover:border-slate-500
    disabled:opacity-0 disabled:pointer-events-none`;

  return (
    <>
      {/* ── Mobile — left side ─────────────────────────────────── */}
      <div className="fixed left-3 bottom-6 z-50 flex flex-col gap-2 lg:hidden"
           role="navigation" aria-label="Navigation entre sections">

        <button onClick={() => goTo(currentIdx - 1)} disabled={atTop}
                aria-label="Section précédente" className={btnMobile}>
          <ChevronUp />
        </button>

        <div className="flex flex-col items-center gap-1.5 py-0.5">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Section ${i + 1}`}
                    className={`rounded-full transition-all duration-200
                      ${i === currentIdx
                        ? 'w-1.5 h-3 bg-brand-400'
                        : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'}`} />
          ))}
        </div>

        <button onClick={() => goTo(currentIdx + 1)} disabled={atBottom}
                aria-label="Section suivante" className={btnMobile}>
          <ChevronDown />
        </button>
      </div>

      {/* ── Desktop — right side, centered ────────────────────── */}
      <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-50
                      flex-col items-center gap-2"
           role="navigation" aria-label="Navigation entre sections">

        <button onClick={() => goTo(currentIdx - 1)} disabled={atTop}
                aria-label="Section précédente" className={btnDesktop}>
          <ChevronUp />
        </button>

        <div className="flex flex-col items-center gap-2 py-1">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Section ${i + 1}`}
                    className={`rounded-full transition-all duration-300
                      ${i === currentIdx
                        ? 'w-2 h-4 bg-brand-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                        : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'}`} />
          ))}
        </div>

        <button onClick={() => goTo(currentIdx + 1)} disabled={atBottom}
                aria-label="Section suivante" className={btnDesktop}>
          <ChevronDown />
        </button>
      </div>
    </>
  );
}
