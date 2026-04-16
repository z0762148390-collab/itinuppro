import { SITE, PERSON } from './constants';
import type { FAQ, JsonLdSchema } from '@/types';
import type { PostLocaleData } from './blog-posts';

export function getPersonSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.whatsappNumber,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1218 Avenue du Père Soulas',
      postalCode: '34000',
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    knowsAbout: [...PERSON.knowsAbout],
    sameAs: [
      SITE.url,
      // LinkedIn and GitHub will be added here once URLs are confirmed
    ],
  };
}

export function getOrganizationSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.whatsappNumber,
    founder: {
      '@type': 'Person',
      name: PERSON.name,
    },
    description:
      'Freelance DevOps et développement web sur mesure en France. Java Spring Boot, CI/CD, Kubernetes, AWS, Next.js. Basé à Montpellier.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1218 Avenue du Père Soulas',
      postalCode: '34000',
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    knowsAbout: [
      'DevOps', 'CI/CD', 'Java', 'Spring Boot', 'Kubernetes',
      'AWS', 'Docker', 'Terraform', 'Next.js', 'TIBCO',
      'Microservices', 'FastAPI', 'PostgreSQL',
    ],
    sameAs: [SITE.url],
  };
}

export function getLocalBusinessSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.whatsappNumber,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1218 Avenue du Père Soulas',
      postalCode: '34000',
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.6047,
      longitude: 3.8772,
    },
    areaServed: [
      { '@type': 'City', name: 'Montpellier' },
      { '@type': 'Country', name: 'France' },
    ],
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };
}

export function getServicesLocalBusinessSchema(): JsonLdSchema {
  return {
    ...getLocalBusinessSchema(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services DevOps & Développement Web',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'DevOps & CI/CD',
            description:
              'Mise en place de pipelines CI/CD avec GitHub Actions, Docker et Kubernetes. Infrastructure cloud AWS, Terraform, monitoring Prometheus/Grafana. Production stable et automatisée.',
            url: `${SITE.url}/fr/devops-france`,
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Développement web sur mesure',
            description:
              "Application web complète de la base de données à l'interface. Stack Next.js + FastAPI + PostgreSQL, code propre, déployée et documentée. De l'idée à vos premiers utilisateurs en 4 à 6 semaines.",
            url: `${SITE.url}/fr/application-web-france`,
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Création de site vitrine',
            description:
              'Site professionnel moderne axé conversion, SEO technique intégré dès le départ, livré en 3 semaines avec hébergement configuré et sécurisé.',
            url: `${SITE.url}/fr/creation-site-france`,
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Offre clé en main',
            description:
              'Nom de domaine + hébergement sécurisé + déploiement automatique CI/CD + email professionnel + support post-livraison inclus. Zéro gestion technique de votre côté.',
            url: `${SITE.url}/fr/services`,
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Conseil & Audit technique',
            description:
              "Audit de votre infrastructure existante, recommandations d'architecture, choix technologiques documentés. Accompagnement senior sans jargon.",
            url: `${SITE.url}/fr/contact`,
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
      ],
    },
  };
}

export function getServiceSchema(params: {
  name: string;
  description: string;
  jobTitle: string;
  knowsAbout: string[];
  minPrice: string;
  slug: string;
}): JsonLdSchema {
  const { name, description, jobTitle, knowsAbout, minPrice, slug } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Person',
      name: PERSON.name,
      jobTitle,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.whatsappNumber,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1218 Avenue du Père Soulas',
        postalCode: '34000',
        addressLocality: SITE.city,
        addressCountry: SITE.country,
      },
      knowsAbout,
    },
    areaServed: { '@type': 'Country', name: 'France' },
    url: `${SITE.url}/fr/${slug}`,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
        minPrice,
        unitText: 'jour',
      },
    },
  };
}

export function getServiceBreadcrumbSchema(
  locale: string,
  serviceName: string,
  slug: string,
): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/${locale}/services` },
      { '@type': 'ListItem', position: 3, name: serviceName, item: `${SITE.url}/${locale}/${slug}` },
    ],
  };
}

export function getBlogPostingSchema(
  post: PostLocaleData,
  slug: string,
  locale: string,
): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    url: `${SITE.url}/${locale}/blog/${slug}`,
    keywords: post.tags.join(', '),
    inLanguage: locale === 'ar' ? 'ar' : locale === 'en' ? 'en' : 'fr',
    timeRequired: `PT${post.readingTime}M`,
    image: `${SITE.url}/${locale}/blog/${slug}/opengraph-image`,
  };
}

export function getBreadcrumbSchema(
  locale: string,
  articleTitle: string,
  slug: string,
): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'itinup', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: articleTitle, item: `${SITE.url}/${locale}/blog/${slug}` },
    ],
  };
}

export function getBlogSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Blog – ${SITE.name}`,
    description: 'DevOps, développement web, conseils tech pour PME et startups françaises.',
    url: `${SITE.url}/fr/blog`,
    author: {
      '@type': 'Person',
      name: PERSON.name,
      url: SITE.url,
    },
  };
}

export function getFAQSchema(faqs: FAQ[]): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
