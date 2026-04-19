'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/* ─── Schema ─────────────────────────────────────────────────────────────── */
const schema = z.object({
  firstName:   z.string().min(2, 'Min. 2 caractères'),
  email:       z.string().email('Email invalide'),
  whatsapp:    z.string().optional(),
  projectType: z.string().min(1, 'Requis'),
  description: z.string().min(20, 'Min. 20 caractères'),
  budget:      z.string().min(1, 'Requis'),
  deadline:    z.string().min(1, 'Requis'),
  source:      z.string().optional(),
});
type FormData = z.infer<typeof schema>;

/* ─── Locale labels ──────────────────────────────────────────────────────── */
const FORM_L = {
  fr: {
    firstName: 'Votre prénom *', firstNamePh: 'Jean',
    email: 'Votre email *',
    whatsapp: 'Votre WhatsApp (optionnel)',
    projectType: 'Type de projet *', projectTypePh: 'Sélectionnez...',
    description: 'Décrivez votre idée en 2-3 lignes *', descriptionPh: 'Mon projet consiste à…',
    budget: 'Budget estimé *', budgetPh: 'Sélectionnez...',
    deadline: 'Délai souhaité *', deadlinePh: 'Sélectionnez...',
    source: "Comment m'avez-vous trouvé ? (optionnel)",
    submit: 'Envoyer ma demande — réponse sous 48h',
    rgpd: 'Vos données sont utilisées uniquement pour vous répondre. Aucune revente. Aucun spam.',
    successTitle: 'Demande envoyée !',
    successMsg: 'Je reviens vers vous dans les 48h.',
    successBtn: 'Envoyer une autre demande',
    projectTypes: [
      { v: 'mvp-saas',    l: 'MVP / SaaS' },
      { v: 'app-metier',  l: 'Application métier' },
      { v: 'site-web',    l: 'Site web professionnel' },
      { v: 'audit',       l: 'Audit technique' },
      { v: 'partenariat', l: 'Partenariat' },
      { v: 'autre',       l: 'Autre' },
    ],
    budgets: [
      { v: '<3000',       l: 'Moins de 3 000€' },
      { v: '3000-10000',  l: '3 000€ – 10 000€' },
      { v: '10000-30000', l: '10 000€ – 30 000€' },
      { v: '30000+',      l: '+ de 30 000€' },
      { v: 'a-definir',   l: 'À définir ensemble' },
    ],
    deadlines: [
      { v: 'asap',      l: 'Dès que possible' },
      { v: '1-month',   l: 'Dans 1 mois' },
      { v: '3-months',  l: 'Dans 3 mois' },
      { v: 'no-rush',   l: "Pas d'urgence" },
    ],
  },
  en: {
    firstName: 'Your first name *', firstNamePh: 'John',
    email: 'Your email *',
    whatsapp: 'Your WhatsApp (optional)',
    projectType: 'Project type *', projectTypePh: 'Select...',
    description: 'Describe your idea in 2-3 lines *', descriptionPh: 'My project is about…',
    budget: 'Estimated budget *', budgetPh: 'Select...',
    deadline: 'Desired timeline *', deadlinePh: 'Select...',
    source: 'How did you find me? (optional)',
    submit: 'Send my request — response within 48h',
    rgpd: 'Your data is used only to respond to you. No resale. No spam.',
    successTitle: 'Request sent!',
    successMsg: "I'll get back to you within 48h.",
    successBtn: 'Send another request',
    projectTypes: [
      { v: 'mvp-saas',    l: 'MVP / SaaS' },
      { v: 'app-metier',  l: 'Business application' },
      { v: 'site-web',    l: 'Professional website' },
      { v: 'audit',       l: 'Technical audit' },
      { v: 'partenariat', l: 'Partnership' },
      { v: 'autre',       l: 'Other' },
    ],
    budgets: [
      { v: '<3000',       l: 'Less than €3,000' },
      { v: '3000-10000',  l: '€3,000 – €10,000' },
      { v: '10000-30000', l: '€10,000 – €30,000' },
      { v: '30000+',      l: '€30,000+' },
      { v: 'a-definir',   l: 'To define together' },
    ],
    deadlines: [
      { v: 'asap',     l: 'As soon as possible' },
      { v: '1-month',  l: 'Within 1 month' },
      { v: '3-months', l: 'Within 3 months' },
      { v: 'no-rush',  l: 'No rush' },
    ],
  },
  ar: {
    firstName: 'اسمك الأول *', firstNamePh: 'محمد',
    email: 'بريدك الإلكتروني *',
    whatsapp: 'WhatsApp (اختياري)',
    projectType: 'نوع المشروع *', projectTypePh: 'اختر...',
    description: 'صف فكرتك في 2-3 أسطر *', descriptionPh: 'مشروعي يتمحور حول…',
    budget: 'الميزانية التقديرية *', budgetPh: 'اختر...',
    deadline: 'المدة المرغوبة *', deadlinePh: 'اختر...',
    source: 'كيف وجدتني؟ (اختياري)',
    submit: 'إرسال طلبي — رد خلال 48 ساعة',
    rgpd: 'بياناتك تُستخدم فقط للرد عليك. لا بيع. لا بريد مزعج.',
    successTitle: 'تم إرسال الطلب!',
    successMsg: 'سأعود إليك خلال 48 ساعة.',
    successBtn: 'إرسال طلب آخر',
    projectTypes: [
      { v: 'mvp-saas',    l: 'MVP / SaaS' },
      { v: 'app-metier',  l: 'تطبيق مخصص' },
      { v: 'site-web',    l: 'موقع ويب احترافي' },
      { v: 'audit',       l: 'تدقيق تقني' },
      { v: 'partenariat', l: 'شراكة' },
      { v: 'autre',       l: 'أخرى' },
    ],
    budgets: [
      { v: '<3000',       l: 'أقل من 3,000€' },
      { v: '3000-10000',  l: '3,000€ – 10,000€' },
      { v: '10000-30000', l: '10,000€ – 30,000€' },
      { v: '30000+',      l: 'أكثر من 30,000€' },
      { v: 'a-definir',   l: 'نحدده معاً' },
    ],
    deadlines: [
      { v: 'asap',     l: 'في أقرب وقت ممكن' },
      { v: '1-month',  l: 'خلال شهر' },
      { v: '3-months', l: 'خلال 3 أشهر' },
      { v: 'no-rush',  l: 'لا استعجال' },
    ],
  },
} as const;

/* ─── Shared CSS ─────────────────────────────────────────────────────────── */
const fieldCls = `w-full px-4 py-3 rounded-xl text-slate-100 placeholder-slate-600
                  bg-slate-800/60 border border-slate-700/60
                  focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50
                  transition-all duration-150`;
const labelCls = 'block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2';
const errCls   = 'mt-1 text-xs text-red-400';

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ProjectForm({ locale }: { locale: string }) {
  const l          = FORM_L[locale as keyof typeof FORM_L] ?? FORM_L.fr;
  const isRtl      = locale === 'ar';
  const loadTime   = useRef(Date.now());
  const honeypot   = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const message = [
      `Type : ${data.projectType}`,
      `Budget : ${data.budget}`,
      `Délai : ${data.deadline}`,
      data.whatsapp ? `WhatsApp : ${data.whatsapp}` : null,
      data.source   ? `Source : ${data.source}`     : null,
      '',
      data.description,
    ].filter(Boolean).join('\n');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.firstName, email: data.email,
        message, budget: data.budget, locale,
        _hp: honeypot.current?.value ?? '',
        _t:  loadTime.current,
      }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({})) as { error?: string };
      throw new Error(j.error ?? 'Erreur réseau');
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
        <h3 className="font-bold text-white text-xl mb-2">{l.successTitle}</h3>
        <p className="text-slate-400 mb-6">{l.successMsg}</p>
        <button onClick={() => reset()} className="text-brand-400 text-sm hover:underline">
          {l.successBtn}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate
          className="flex flex-col gap-5" dir={isRtl ? 'rtl' : undefined}>

      {/* Honeypot */}
      <div aria-hidden="true"
           style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypot} />
      </div>

      {/* First name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>{l.firstName}</label>
          <input type="text" autoComplete="given-name" placeholder={l.firstNamePh}
                 className={fieldCls} {...register('firstName')} />
          {errors.firstName && <p className={errCls} role="alert">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className={labelCls}>{l.email}</label>
          <input type="email" autoComplete="email" dir="ltr" placeholder="you@example.com"
                 className={fieldCls} {...register('email')} />
          {errors.email && <p className={errCls} role="alert">{errors.email.message}</p>}
        </div>
      </div>

      {/* WhatsApp */}
      <div>
        <label className={labelCls}>{l.whatsapp}</label>
        <input type="tel" dir="ltr" placeholder="+33 6 00 00 00 00"
               className={fieldCls} {...register('whatsapp')} />
      </div>

      {/* Project type */}
      <div>
        <label className={labelCls}>{l.projectType}</label>
        <select className={`${fieldCls} cursor-pointer`} {...register('projectType')}>
          <option value="">{l.projectTypePh}</option>
          {l.projectTypes.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
        {errors.projectType && <p className={errCls} role="alert">{errors.projectType.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className={labelCls}>{l.description}</label>
        <textarea rows={4} placeholder={l.descriptionPh}
                  className={`${fieldCls} resize-none`} {...register('description')} />
        {errors.description && <p className={errCls} role="alert">{errors.description.message}</p>}
      </div>

      {/* Budget + Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>{l.budget}</label>
          <select className={`${fieldCls} cursor-pointer`} {...register('budget')}>
            <option value="">{l.budgetPh}</option>
            {l.budgets.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
          {errors.budget && <p className={errCls} role="alert">{errors.budget.message}</p>}
        </div>
        <div>
          <label className={labelCls}>{l.deadline}</label>
          <select className={`${fieldCls} cursor-pointer`} {...register('deadline')}>
            <option value="">{l.deadlinePh}</option>
            {l.deadlines.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
          {errors.deadline && <p className={errCls} role="alert">{errors.deadline.message}</p>}
        </div>
      </div>

      {/* Source */}
      <div>
        <label className={labelCls}>{l.source}</label>
        <input type="text" placeholder="Google, LinkedIn, recommandation…"
               className={fieldCls} {...register('source')} />
      </div>

      <button type="submit" disabled={isSubmitting}
              className="btn-gradient w-full py-4 text-white font-semibold rounded-xl
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100">
        {isSubmitting ? '…' : l.submit}
      </button>

      <p className="text-slate-600 text-xs text-center leading-relaxed">{l.rgpd}</p>
    </form>
  );
}
