import type { Metadata } from 'next';
import { Geist, Noto_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTAWhatsApp from '@/components/ui/CTAWhatsApp';
import Tracker from '@/components/analytics/Tracker';
import JsonLd from '@/components/ui/JsonLd';
import { getPersonSchema, getOrganizationSchema } from '@/lib/schemas';
import { SITE } from '@/lib/constants';
import '../globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const locales = SITE.locales;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  robots: { index: true, follow: true },
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale — return 404 for unsupported values
  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === 'ar';

  // Choose font variable based on locale
  const fontVariable = isRtl
    ? `${notoArabic.variable} ${notoArabic.className}`
    : `${geist.variable} ${geist.className}`;

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={fontVariable}
    >
      <head>
        {/* Global structured data on every page */}
        <JsonLd schema={[getPersonSchema(), getOrganizationSchema()]} />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          {/* Sticky WhatsApp button — mobile only */}
          <CTAWhatsApp />
          <Tracker />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
