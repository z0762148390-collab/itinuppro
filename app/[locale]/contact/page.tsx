import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/constants';
import ContactForm from './ContactForm';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return {
    title: t('title'), description: t('description'),
    alternates: { canonical: `${SITE.url}/${locale}/contact` },
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
            <ContactForm locale={locale}/>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-2 flex flex-col gap-8 rtl:text-right">
            {[
              {
                label: t('email_title'),
                content: <a href={`mailto:${SITE.email}`}
                            className="text-brand-400 hover:underline text-sm">{SITE.email}</a>,
              },
              {
                label: t('whatsapp_title'),
                content: (
                  <>
                    <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                       className="text-green-400 hover:underline text-sm">{SITE.whatsappNumber}</a>
                    <p className="text-slate-600 text-xs mt-1">{t('whatsapp_label')}</p>
                  </>
                ),
              },
              {
                label: t('address_title'),
                content: <a href={SITE.googleMaps} target="_blank" rel="noopener noreferrer"
                            className="text-slate-500 hover:text-slate-300 text-sm leading-relaxed hover:underline">
                           1218 Avenue du Père Soulas<br/>34000 Montpellier, France
                         </a>,
              },
            ].map(({ label, content }) => (
              <div key={label} className="card p-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
                {content}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
