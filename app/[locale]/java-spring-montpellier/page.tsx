import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import { getFAQSchema } from '@/lib/schemas';
import BlogInternalLinks from '@/components/blog/BlogInternalLinks';

const SLUG = 'java-spring-montpellier';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Développeur Java Spring Boot Freelance à Montpellier | itinup',
    description:
      'Développeur Java Spring Boot freelance basé à Montpellier. Java 21, Spring Boot 3, microservices, API REST, intégration SI. Mission courte ou longue durée, remote Occitanie et toute la France.',
    keywords: [
      'développeur Java Spring Boot Montpellier',
      'freelance Java Montpellier',
      'mission Java Spring Boot Montpellier',
      'développeur Java freelance Occitanie',
      'Spring Boot freelance France',
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
    question: 'Quel est votre TJM pour une mission Java Spring Boot à Montpellier ?',
    answer:
      'Mon TJM est communiqué dès notre premier échange et varie selon la complexité, la durée et le mode d\'intervention (remote ou présentiel). Pour une mission longue durée ou un volume important, un tarif préférentiel est négociable.',
  },
  {
    question: 'Sur quels types de projets Java intervenez-vous ?',
    answer:
      'J\'interviens sur des projets variés : développement de nouvelles fonctionnalités, refonte de systèmes legacy Java EE vers Spring Boot, conception d\'API REST, intégration de systèmes d\'information, mise en place de microservices, et passage au cloud avec Docker et Kubernetes.',
  },
  {
    question: 'Êtes-vous disponible en présentiel à Montpellier et en Occitanie ?',
    answer:
      'Oui. Je suis disponible en présentiel à Montpellier et en déplacement dans toute l\'Occitanie (Nîmes, Béziers, Toulouse, Perpignan). La plupart de mes missions se déroulent en full remote, mais des jours sur site sont possibles selon vos besoins.',
  },
  {
    question: 'Travaillez-vous également avec Jakarta EE / Java EE ?',
    answer:
      'Oui, j\'ai une bonne maîtrise de Jakarta EE (anciennement Java EE) et des serveurs d\'applications comme JBoss/WildFly et WebLogic. Je peux accompagner des migrations de Java EE vers Spring Boot moderne.',
  },
  {
    question: 'Pouvez-vous intégrer une équipe de développement existante ?',
    answer:
      'Absolument. Je m\'intègre rapidement dans les équipes existantes, adopte vos conventions de code et vos processus (revues de code, CI/CD, Agile/Scrum). J\'apporte une expertise senior sans friction organisationnelle.',
  },
  {
    question: 'Gérez-vous également les tests automatisés ?',
    answer:
      'Oui, les tests font partie de mon approche. J\'écris des tests unitaires avec JUnit 5 et Mockito, des tests d\'intégration avec Spring Test et Testcontainers, et je peux mettre en place une stratégie de test complète si nécessaire.',
  },
];

export default async function JavaSpringMontpellierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // FR-only page — redirect other locales to FR version
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
            Développeur Java Spring Boot Freelance à Montpellier
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl">
            Java 21 · Spring Boot 3 · Microservices · API REST · Intégration SI
            <br className="hidden sm:block" />
            Mission courte ou longue durée — Remote Occitanie & toute la France
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/contact?service=java"
                  className="btn-gradient inline-flex items-center px-7 py-3.5
                             text-white font-semibold rounded-xl text-sm">
              Discuter de votre mission
            </Link>
            <Link href="/java-spring-boot-freelance-france"
                  className="inline-flex items-center px-7 py-3.5 text-slate-300 font-semibold
                             rounded-xl text-sm border border-slate-700 hover:border-slate-500
                             hover:text-white transition-all duration-200">
              Voir toutes mes missions Java →
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
              Expertise Java Spring Boot à Montpellier
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Basé à Montpellier au cœur de l'Occitanie, j'interviens en mission freelance sur vos
                projets <strong className="text-slate-200">Java et Spring Boot</strong>. Avec plus de
                7 ans d'expérience en développement d'applications métier et d'intégration de systèmes
                d'information, je maîtrise l'ensemble de la stack Java moderne : Java 21, Spring Boot 3,
                Spring Security, Spring Data JPA, Maven, Gradle, et les architectures microservices.
              </p>
              <p>
                Mes interventions couvrent le développement de nouvelles fonctionnalités, la refonte
                de systèmes legacy, la conception d'API REST et GraphQL, l'intégration avec des systèmes
                tiers (ERP, CRM, TIBCO), et la migration vers des architectures cloud-native. Je travaille
                avec des patterns éprouvés : Domain-Driven Design, CQRS, Event Sourcing, et une couverture
                de tests complète via JUnit 5, Mockito et Testcontainers.
              </p>
              <p>
                Les technologies que j'utilise quotidiennement incluent <strong className="text-slate-200">
                Java 21</strong> avec les features modernes (records, sealed classes, virtual threads),
                <strong className="text-slate-200"> Spring Boot 3.x</strong>, Spring Cloud pour les
                architectures distribuées, Hibernate et Spring Data JPA pour la couche de persistance,
                ainsi que PostgreSQL, Oracle et MySQL. Côté DevOps, je déploie sur Docker et Kubernetes,
                avec des pipelines CI/CD automatisés via GitHub Actions ou GitLab CI.
              </p>
            </div>
          </section>

          {/* Section 2 — Local */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Freelance Java à Montpellier et en Occitanie
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                En tant que <strong className="text-slate-200">développeur Java freelance à Montpellier
                </strong>, je suis disponible pour des missions sur site dans toute la région Occitanie —
                Montpellier, Nîmes, Béziers, Perpignan, Toulouse, Sète — ou en full remote pour des
                clients partout en France. La majorité de mes missions se déroulent entièrement à distance,
                ce qui me permet d'intervenir sur des projets parisiens, lyonnais ou bordelais sans
                contrainte géographique.
              </p>
              <p>
                Montpellier concentre un écosystème tech en pleine croissance : startups, éditeurs de
                logiciels, DSI de grands groupes, ESN régionales. Si vous êtes à la recherche d'un
                <strong className="text-slate-200"> expert Java Spring Boot en Occitanie</strong>, disponible
                rapidement et sans les coûts fixes d'un CDI senior, je peux démarrer votre mission sous
                2 semaines selon votre calendrier.
              </p>
              <p>
                Contrairement à une ESN qui délègue votre projet à un développeur junior, vous travaillez
                directement avec moi — un senior qui code, qui livre, et qui est responsable du résultat.
                Pas de chef de projet intermédiaire, pas de turnover, pas de surprise en cours de mission.
              </p>
            </div>
          </section>

          {/* Section 3 — Références */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Références et expérience Java
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                J'ai participé à des projets Java d'envergure pour des clients comme{' '}
                <strong className="text-slate-200">AMUE</strong> (Agence de Mutualisation des Universités
                et Établissements),{' '}
                <strong className="text-slate-200">AIFE</strong> (Agence pour l'Informatique Financière
                de l'État),{' '}
                <strong className="text-slate-200">Capgemini</strong>,{' '}
                <strong className="text-slate-200">Inetum</strong> et{' '}
                <strong className="text-slate-200">Airbus</strong>.
                Ces missions m'ont confronté à des problématiques de scalabilité, de haute disponibilité,
                d'intégration complexe et de sécurité applicative dans des environnements exigeants.
              </p>
              <p>
                Sur des projets d'intégration, j'ai notamment travaillé avec{' '}
                <strong className="text-slate-200">TIBCO BusinessWorks</strong> et{' '}
                <strong className="text-slate-200">TIBCO EMS</strong> pour des architectures
                orientées messages et des flux d'intégration entre systèmes hétérogènes. Cette
                double compétence Java + middleware d'intégration est relativement rare sur le marché
                et permet d'adresser des projets SI complexes en une seule ressource.
              </p>
            </div>
          </section>

          {/* Section 4 — Stack */}
          <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-5">Stack technique</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Java 21', 'Spring Boot 3.x', 'Spring Security', 'Spring Data JPA',
                'Spring Cloud', 'Hibernate', 'PostgreSQL', 'Oracle', 'Maven', 'Gradle',
                'JUnit 5', 'Mockito', 'Testcontainers', 'Docker', 'Kubernetes',
                'GitHub Actions', 'GitLab CI', 'REST / OpenAPI', 'GraphQL', 'RabbitMQ',
              ].map((tag) => (
                <span key={tag}
                      className="px-3 py-1.5 text-xs font-mono text-slate-400
                                 bg-slate-800 rounded-lg border border-slate-700/50 text-center">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Section 5 — Pourquoi freelance */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Pourquoi choisir un développeur Java freelance plutôt qu'une ESN ?
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Faire appel à un freelance Java senior à Montpellier présente des avantages concrets
                par rapport à une ESN ou un cabinet de conseil : vous payez uniquement pour du temps
                productif, sans frais de structure cachés ni marge intermédiaire. Le tarif journalier
                moyen d'un freelance Java senior reste souvent inférieur au coût total d'un profil
                comparable en régie via une ESN.
              </p>
              <p>
                En tant que freelance, ma réputation dépend directement de la qualité de mon travail.
                Je suis impliqué dans la réussite de votre projet comme si c'était le mien. Cette
                implication directe se traduit par une meilleure qualité de code, un respect des
                délais, et une communication fluide sans filtre.
              </p>
              <p>
                Pour les DSI et les directions techniques en Occitanie qui cherchent à renforcer
                rapidement une équipe Java, ou à externaliser un projet sans passer par les délais
                d'un appel d'offres ESN, la solution freelance est souvent la plus efficace.
              </p>
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
              Vous avez un projet Java Spring Boot à Montpellier ?
            </h2>
            <p className="text-slate-400 mb-8">
              Réponse sous 48h · Tarif transparent · Démarrage sous 2 semaines
            </p>
            <Link href="/contact?service=java"
                  className="btn-gradient inline-flex items-center px-8 py-4
                             text-white font-semibold rounded-xl">
              Envoyer ma mission Java
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
