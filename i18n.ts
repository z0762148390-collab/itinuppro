import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['fr', 'en', 'ar'] as const;
type Locale = (typeof locales)[number];

function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !isValidLocale(locale)) {
    notFound();
  }

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: (await import(`./messages/${locale}.json`)).default as any,
  };
});
