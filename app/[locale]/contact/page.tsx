import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import { Suspense } from 'react';
import ContactForm from './ContactForm';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return {
    title: t('title'), description: t('description'),
    alternates: {
      canonical: `${SITE.url}/${locale}/contact`,
      languages: {
        fr:          `${SITE.url}/fr/contact`,
        en:          `${SITE.url}/en/contact`,
        ar:          `${SITE.url}/ar/contact`,
        'x-default': `${SITE.url}/fr/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact_content' });

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center rtl:text-right mb-14">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">{t('h1')}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Form */}
          <div className="md:col-span-3">
            <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-800/30 animate-pulse" />}>
              <ContactForm locale={locale}/>
            </Suspense>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-2 rtl:text-right">
            <div className="card p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                {t('whatsapp_title')}
              </p>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                 className="text-green-400 hover:underline text-sm">{SITE.whatsappNumber}</a>
              <p className="text-slate-600 text-xs mt-1">{t('whatsapp_label')}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
