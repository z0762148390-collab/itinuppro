'use client';

import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  title: string;
  items: FaqItem[];
}

export default function FAQLanding({ title, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center tracking-tight mb-12 rtl:text-right">
          {title}
        </h2>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4
                             px-5 py-4 text-left rtl:text-right
                             text-white font-medium hover:bg-white/[0.02] transition-colors">
                  <span>{item.question}</span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className={`flex-shrink-0 text-brand-400 transition-transform duration-300
                                ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '600px' : '0px' }}>
                  <p className="px-5 pb-5 text-slate-400 leading-relaxed text-sm">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
