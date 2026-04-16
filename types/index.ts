export type Locale = 'fr' | 'en' | 'ar';

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  locale: Locale;
  readingTime?: number;
}

export interface JsonLdSchema {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}
