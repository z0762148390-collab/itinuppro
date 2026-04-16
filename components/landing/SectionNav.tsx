'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

function ChevronUp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function SectionNav() {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('#main-content section')
    );
    sectionsRef.current = els;
    setTotal(els.length);

    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.45;
      let idx = 0;
      els.forEach((el, i) => {
        if (el.offsetTop <= mid) idx = i;
      });
      setCurrentIdx(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = useCallback((idx: number) => {
    const el = sectionsRef.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (total === 0) return null;

  const atTop    = currentIdx === 0;
  const atBottom = currentIdx === total - 1;

  return (
    <div className="fixed right-3 bottom-6 z-50 flex flex-col gap-2 lg:hidden"
         role="navigation" aria-label="Navigation entre sections">
      <button
        onClick={() => goTo(currentIdx - 1)}
        disabled={atTop}
        aria-label="Section précédente"
        className="w-10 h-10 rounded-full
                   bg-slate-800/90 backdrop-blur-md
                   border border-slate-700/60
                   flex items-center justify-center
                   text-slate-300
                   shadow-lg shadow-black/30
                   transition-all duration-200
                   hover:bg-slate-700/90 hover:border-slate-500/60 hover:text-white
                   disabled:opacity-20 disabled:pointer-events-none">
        <ChevronUp />
      </button>

      {/* Section indicator dots */}
      <div className="flex flex-col items-center gap-1 py-1">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Section ${i + 1}`}
            className={`rounded-full transition-all duration-200
              ${i === currentIdx
                ? 'w-1.5 h-3 bg-brand-400'
                : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
              }`}
          />
        ))}
      </div>

      <button
        onClick={() => goTo(currentIdx + 1)}
        disabled={atBottom}
        aria-label="Section suivante"
        className="w-10 h-10 rounded-full
                   bg-slate-800/90 backdrop-blur-md
                   border border-slate-700/60
                   flex items-center justify-center
                   text-slate-300
                   shadow-lg shadow-black/30
                   transition-all duration-200
                   hover:bg-slate-700/90 hover:border-slate-500/60 hover:text-white
                   disabled:opacity-20 disabled:pointer-events-none">
        <ChevronDown />
      </button>
    </div>
  );
}
