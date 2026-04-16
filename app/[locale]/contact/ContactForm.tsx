'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

const schema = z.object({
  name:    z.string().min(2, 'Minimum 2 caractères'),
  email:   z.string().email('Email invalide'),
  message: z.string().min(10, 'Minimum 10 caractères'),
  budget:  z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const BUDGETS = [
  { value: '',           label: 'Budget (optionnel)' },
  { value: '< 500€',    label: '< 500€' },
  { value: '500–1 500€', label: '500 – 1 500€' },
  { value: '1 500–5 000€', label: '1 500 – 5 000€' },
  { value: '> 5 000€',  label: '> 5 000€' },
];

const fieldCls = `w-full px-4 py-3 rounded-xl text-slate-100 placeholder-slate-600
                  bg-slate-800/60 border border-slate-700/60
                  focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50
                  transition-all duration-150`;

const errorCls = 'mt-1 text-xs text-red-400';

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact_content');
  const loadTimeRef = useRef<number>(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        locale,
        _hp: honeypotRef.current?.value ?? '',
        _t:  loadTimeRef.current,
      }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({})) as { error?: string };
      throw new Error(json.error ?? 'Erreur réseau');
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-2xl bg-green-400/8 border border-green-400/20 p-10 text-center">
        <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 className="font-bold text-white text-xl mb-2">Message envoyé !</h3>
        <p className="text-slate-400 mb-6">Je reviens vers vous dans les 24h.</p>
        <button onClick={() => reset()} className="text-brand-400 text-sm hover:underline">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot — invisible to humans, bots fill it automatically */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
      </div>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 rtl:text-right">
          {t('form_name')}
        </label>
        <input id="name" type="text" autoComplete="name"
               placeholder={t('form_name_placeholder')}
               aria-invalid={!!errors.name}
               className={fieldCls}
               {...register('name')} />
        {errors.name && <p className={errorCls} role="alert">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 rtl:text-right">
          {t('form_email')}
        </label>
        <input id="email" type="email" autoComplete="email" dir="ltr"
               placeholder={t('form_email_placeholder')}
               aria-invalid={!!errors.email}
               className={fieldCls}
               {...register('email')} />
        {errors.email && <p className={errorCls} role="alert">{errors.email.message}</p>}
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 rtl:text-right">
          Budget
        </label>
        <select id="budget"
                className={`${fieldCls} cursor-pointer`}
                {...register('budget')}>
          {BUDGETS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 rtl:text-right">
          {t('form_message')}
        </label>
        <textarea id="message" rows={6}
                  placeholder={t('form_message_placeholder')}
                  aria-invalid={!!errors.message}
                  className={`${fieldCls} resize-none rtl:text-right`}
                  {...register('message')} />
        {errors.message && <p className={errorCls} role="alert">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}
              aria-label="Envoyer le message"
              className="btn-gradient w-full py-4 text-white font-semibold rounded-xl
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:active:scale-100">
        {isSubmitting ? '...' : t('form_submit')}
      </button>

      <p className="text-slate-600 text-xs mt-1 text-center leading-relaxed rtl:text-right">
        {t('rgpd_notice')}
      </p>
    </form>
  );
}
