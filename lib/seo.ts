import { SITE } from './constants';

/**
 * Builds the `alternates` block for Next.js generateMetadata.
 * Always includes x-default pointing to the French version.
 *
 * @param slug  The path segment(s) after the locale, e.g. "/devops-france" or ""
 * @param locale  The current locale (for the canonical URL)
 */
export function buildAlternates(slug: string, locale: string) {
  const base = (l: string) => `${SITE.url}/${l}${slug}`;
  return {
    canonical: base(locale),
    languages: {
      fr:          base('fr'),
      en:          base('en'),
      ar:          base('ar'),
      'x-default': base('fr'),
    },
  };
}
