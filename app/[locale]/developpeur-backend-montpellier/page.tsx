import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import { getFAQSchema } from '@/lib/schemas';
import BlogInternalLinks from '@/components/blog/BlogInternalLinks';

const SLUG = 'developpeur-backend-montpellier';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Développeur Backend Freelance à Montpellier — Java, Python, API | itinup',
    description:
      'Développeur backend freelance à Montpellier. Java Spring Boot, Python FastAPI, API REST, microservices, PostgreSQL. Mission courte ou longue durée, remote Occitanie et toute la France.',
    keywords: [
      'développeur backend Montpellier',
      'freelance backend Montpellier',
      'développeur API REST Montpellier',
      'mission backend freelance Occitanie',
      'développeur Python Java freelance Montpellier',
    ],
    alternates: {
      canonical: `${SITE.url}/fr/${SLUG}`,
      languages: {
        fr:          `${SITE.url}/fr/${SLUG}`,
        'x-default': `${SITE.url}/fr/${SLUG}`,
      },
    },
  };
}

const faqs = [
  {
    question: 'Quelles technologies backend maîtrisez-vous ?',
    answer:
      'Je travaille principalement avec Java 21 (Spring Boot 3), Python (FastAPI, Django REST), Node.js (Express), et les bases de données relationnelles (PostgreSQL, MySQL, Oracle) et NoSQL (Redis, MongoDB). Je maîtrise également les architectures microservices, les API REST et GraphQL, et les systèmes de messagerie (RabbitMQ, Kafka, TIBCO EMS).',
  },
  {
    question: 'Prenez-vous des missions de courte durée à Montpellier ?',
    answer:
      'Oui. J\'accepte des missions à partir d\'un mois, aussi bien en régie sur site à Montpellier qu\'en full remote. Pour les missions très courtes (moins de 2 semaines), je propose généralement un forfait au projet plutôt qu\'un TJM.',
  },
  {
    question: 'Savez-vous également faire du DevOps en plus du backend ?',
    answer:
      'Oui, c\'est l\'une de mes forces. Je couvre aussi bien le développement backend que la mise en production via Docker, Kubernetes, et des pipelines CI/CD. Cette double compétence permet d\'aller de la conception du code jusqu\'au déploiement en production sans changer d\'interlocuteur.',
  },
  {
    question: 'Pouvez-vous concevoir l\'architecture d\'un nouveau projet backend ?',
    answer:
      'Absolument. Je peux intervenir en amont sur le cadrage technique : choix de la stack, conception de l\'API, modélisation de la base de données, définition de l\'architecture microservices ou monolithique modulaire selon vos besoins et votre équipe.',
  },
  {
    question: 'Êtes-vous disponible pour des missions récurrentes ou un contrat long ?',
    answer:
      'Oui. Je travaille aussi bien sur des missions ponctuelles (audit, POC, sprint de développement) que sur des contrats longs de plusieurs mois en tant que développeur backend senior dédié. Un tarif préférentiel est appliqué pour les engagements de plus de 3 mois.',
  },
  {
    question: 'Comment gérez-vous la documentation de vos APIs ?',
    answer:
      'Je génère automatiquement la documentation API via OpenAPI 3.x / Swagger pour les projets Java et FastAPI pour les projets Python. Je rédige également des guides d\'intégration clairs pour les équipes frontend ou les clients tiers qui consomment vos APIs.',
  },
];

export default async function DeveloppeurBackendMontpellierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'fr') {
    redirect(`/fr/${SLUG}`);
  }

  return (
    <>
      <JsonLd schema={getFAQSchema(faqs)} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px]
                        bg-brand-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5
                          bg-brand-600/10 text-brand-400 text-sm font-medium
                          rounded-full border border-brand-600/20 badge-glow">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            Disponible — démarrage sous 2 semaines
          </div>
          <h1 className="headline-gradient text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-5">
            Développeur Backend Freelance à Montpellier
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl">
            Java Spring Boot · Python FastAPI · API REST · Microservices · PostgreSQL
            <br className="hidden sm:block" />
            Mission courte ou longue durée — Remote Occitanie & toute la France
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/contact?service=web-mission"
                  className="btn-gradient inline-flex items-center px-7 py-3.5
                             text-white font-semibold rounded-xl text-sm">
              Envoyer ma mission backend
            </Link>
            <Link href="/services"
                  className="inline-flex items-center px-7 py-3.5 text-slate-300 font-semibold
                             rounded-xl text-sm border border-slate-700 hover:border-slate-500
                             hover:text-white transition-all duration-200">
              Voir tous mes services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Corps SEO ─────────────────────────────────────────── */}
      <article className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Section 1 — Expertise */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Développement backend à Montpellier : mon expertise
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Je suis <strong className="text-slate-200">développeur backend freelance basé à Montpellier
                </strong>, spécialisé dans la conception et le développement d'APIs, de services métier et
                d'architectures distribuées. Mon expertise couvre deux grands écosystèmes : Java avec
                Spring Boot 3 pour les environnements d'entreprise, et Python avec FastAPI pour les
                projets nécessitant rapidité de développement et performance.
              </p>
              <p>
                Mes compétences backend couvrent l'intégralité du cycle de vie d'un service : conception
                de l'architecture, développement des APIs REST ou GraphQL, sécurisation avec OAuth2 et
                JWT, gestion des transactions, optimisation des requêtes SQL, mise en cache avec Redis,
                et intégration de systèmes de messagerie comme RabbitMQ, Kafka ou TIBCO EMS.
              </p>
              <p>
                Je maîtrise également les bases de données relationnelles (
                <strong className="text-slate-200">PostgreSQL, MySQL, Oracle</strong>) et NoSQL (Redis,
                MongoDB), ainsi que la modélisation de schémas adaptés aux contraintes métier. La qualité
                et la maintenabilité du code sont au cœur de mon approche : tests automatisés, documentation
                OpenAPI, revues de code, et respect des bonnes pratiques SOLID et Clean Architecture.
              </p>
            </div>
          </section>

          {/* Section 2 — Local */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Freelance backend à Montpellier : disponibilité et modes d'intervention
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Basé à Montpellier, je suis disponible pour des missions sur site dans la métropole
                montpelliéraine et dans toute la région Occitanie — Nîmes, Béziers, Sète, Lunel,
                Perpignan, et jusqu'à Toulouse. En full remote, j'interviens sur des projets dans
                toute la France, sans contrainte de localisation.
              </p>
              <p>
                Montpellier est une ville universitaire et technologique avec un tissu de startups,
                d'éditeurs de logiciels et d'ETI en pleine croissance. Beaucoup de ces structures
                cherchent à renforcer leurs équipes backend sans passer par les délais et les coûts
                d'une embauche CDI. Un <strong className="text-slate-200">développeur backend
                freelance senior à Montpellier</strong> représente une solution agile et économique
                pour accélérer vos développements.
              </p>
              <p>
                Ma double compétence backend + DevOps est un avantage concret : je ne me contente
                pas d'écrire le code, je l'embarque dans Docker, je configure les pipelines CI/CD
                et je m'assure que votre service est prêt pour la production dès la livraison.
              </p>
            </div>
          </section>

          {/* Section 3 — Use cases */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Types de projets backend pris en charge
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Que vous soyez une startup montpelliéraine qui lance son MVP, une PME qui a besoin
                de moderniser son système d'information, ou une DSI qui cherche un renfort technique
                sur un projet stratégique, je m'adapte à votre contexte :
              </p>
              <ul className="space-y-2 pl-0">
                {[
                  'Développement d\'une API REST ou GraphQL de zéro (greenfield)',
                  'Refonte et modernisation d\'un backend legacy (Java EE, PHP, .NET)',
                  'Conception d\'une architecture microservices avec Spring Cloud',
                  'Développement de workers, jobs et traitements batch avec Spring Batch',
                  'Intégration de systèmes tiers (CRM, ERP, payment gateways, SI partenaires)',
                  'Optimisation des performances (requêtes SQL, cache, profiling)',
                  'Mise en place de pipelines de données avec Python',
                  'Audit technique de code et architecture backend existante',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand-400 mt-0.5 shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4 — Références */}
          <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-5">Références client</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 py-5 px-6
                            rounded-2xl bg-slate-900/40 border border-slate-800/60">
              {['AMUE', 'Airbus', 'Capgemini', 'Inetum', 'AIFE'].map((ref) => (
                <span key={ref} className="text-slate-300 font-medium text-sm">{ref}</span>
              ))}
            </div>
          </section>

          {/* Stack */}
          <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-5">Stack backend</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Java 21', 'Spring Boot 3', 'Python 3.12', 'FastAPI', 'PostgreSQL',
                'MySQL', 'Oracle', 'Redis', 'MongoDB', 'RabbitMQ', 'Kafka',
                'REST / OpenAPI', 'GraphQL', 'JWT / OAuth2', 'Docker', 'Kubernetes',
                'GitHub Actions', 'JUnit 5', 'pytest', 'Testcontainers',
              ].map((tag) => (
                <span key={tag}
                      className="px-3 py-1.5 text-xs font-mono text-slate-400
                                 bg-slate-800 rounded-lg border border-slate-700/50 text-center">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <BlogInternalLinks locale="fr" />

          {/* CTA */}
          <section className="text-center py-12 px-4 rounded-2xl
                              bg-gradient-to-br from-slate-900 to-slate-900/40
                              border border-slate-800/80">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
              Un projet backend à Montpellier ou en France ?
            </h2>
            <p className="text-slate-400 mb-8">
              Réponse sous 48h · Tarif transparent · Démarrage sous 2 semaines
            </p>
            <Link href="/contact?service=web-mission"
                  className="btn-gradient inline-flex items-center px-8 py-4
                             text-white font-semibold rounded-xl">
              Discuter de votre projet
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
