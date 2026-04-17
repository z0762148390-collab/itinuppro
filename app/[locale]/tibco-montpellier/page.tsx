import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import { getFAQSchema } from '@/lib/schemas';
import BlogInternalLinks from '@/components/blog/BlogInternalLinks';

const SLUG = 'tibco-montpellier';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Expert TIBCO Freelance à Montpellier — BusinessWorks & EMS | itinup',
    description:
      'Consultant TIBCO freelance basé à Montpellier. TIBCO BusinessWorks, TIBCO EMS, intégration SI, middleware. Mission courte ou longue durée, remote Occitanie et toute la France.',
    keywords: [
      'expert TIBCO Montpellier',
      'freelance TIBCO Montpellier',
      'consultant TIBCO Occitanie',
      'TIBCO BusinessWorks Montpellier',
      'intégration TIBCO freelance France',
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
    question: 'Quelles versions de TIBCO BusinessWorks maîtrisez-vous ?',
    answer:
      'J\'ai travaillé sur TIBCO BusinessWorks 5.x et TIBCO BusinessWorks 6.x (Container Edition). Je suis également à l\'aise avec TIBCO Designer pour la 5.x et TIBCO Business Studio pour la 6.x. J\'ai également de l\'expérience sur TIBCO ActiveMatrix Service Grid.',
  },
  {
    question: 'Intervenez-vous sur TIBCO EMS ?',
    answer:
      'Oui. TIBCO Enterprise Message Service (EMS) est une technologie que j\'utilise fréquemment pour les architectures orientées messages. Je configure les connexions JMS, les topics, les queues, et les bridges entre systèmes dans des environnements de production critiques.',
  },
  {
    question: 'Êtes-vous disponible pour des missions TIBCO à Montpellier ou en Occitanie ?',
    answer:
      'Oui. Je suis basé à Montpellier et disponible pour des missions sur site dans toute la région Occitanie. Les profils TIBCO étant rares sur le marché, je suis également sollicité en remote pour des projets dans toute la France.',
  },
  {
    question: 'Quelle est votre approche pour les projets de migration TIBCO ?',
    answer:
      'Pour les migrations (par exemple de TIBCO BW 5 vers BW 6, ou vers une stack microservices moderne), je commence par un audit de l\'existant pour identifier les flux critiques, puis je planifie une migration par étapes avec tests de non-régression. Je peux accompagner l\'équipe technique tout au long du projet.',
  },
  {
    question: 'Pouvez-vous former les équipes sur TIBCO BusinessWorks ?',
    answer:
      'Oui. Au-delà du développement, je propose des formations et du mentoring sur TIBCO BusinessWorks pour les équipes qui débutent ou souhaitent approfondir leurs compétences. Ces sessions peuvent se dérouler en présentiel à Montpellier ou en visioconférence.',
  },
  {
    question: 'Intervenez-vous sur d\'autres middlewares d\'intégration ?',
    answer:
      'En plus de TIBCO, j\'ai de l\'expérience sur des solutions d\'intégration modernes comme Apache Camel, Spring Integration, et des plateformes de messagerie comme RabbitMQ et Apache Kafka. Je peux accompagner des migrations de TIBCO vers ces technologies si votre contexte le justifie.',
  },
];

export default async function TibcoMontpellierPage({
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
            Expert TIBCO Freelance à Montpellier
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl">
            TIBCO BusinessWorks · TIBCO EMS · Intégration SI · Middleware · Java
            <br className="hidden sm:block" />
            Mission courte ou longue durée — Remote Occitanie & toute la France
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/contact?service=java"
                  className="btn-gradient inline-flex items-center px-7 py-3.5
                             text-white font-semibold rounded-xl text-sm">
              Discuter de votre mission TIBCO
            </Link>
            <Link href="/tibco-freelance-france"
                  className="inline-flex items-center px-7 py-3.5 text-slate-300 font-semibold
                             rounded-xl text-sm border border-slate-700 hover:border-slate-500
                             hover:text-white transition-all duration-200">
              Voir mes missions TIBCO France →
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
              Expertise TIBCO à Montpellier
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Je suis <strong className="text-slate-200">consultant TIBCO freelance basé à Montpellier
                </strong>, spécialisé dans TIBCO BusinessWorks (5.x et 6.x), TIBCO Enterprise Message
                Service (EMS), et les architectures d'intégration orientées messages. Avec plus de 7 ans
                d'expérience dans des projets d'intégration de systèmes d'information complexes, j'ai
                travaillé avec ces technologies dans des environnements critiques pour des clients comme
                AMUE, AIFE, Airbus et Capgemini.
              </p>
              <p>
                Les profils TIBCO sont rares sur le marché : peu de freelances maîtrisent à la fois
                TIBCO BusinessWorks et son écosystème (ActiveMatrix, Designer, Business Studio),
                TIBCO EMS pour la messagerie JMS, et les bonnes pratiques d'intégration en entreprise.
                Cette rareté se traduit par une forte demande sur les plateformes freelance, notamment
                pour des projets de maintenance, d'évolution et de migration.
              </p>
              <p>
                Ma spécificité : je combine l'expertise TIBCO avec de solides compétences Java Spring Boot,
                ce qui me permet d'intervenir aussi bien sur des architectures TIBCO pures que sur des
                projets de migration vers des solutions modernes (Apache Camel, Spring Integration, Kafka).
              </p>
            </div>
          </section>

          {/* Section 2 — Local */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Missions TIBCO en Occitanie et en France
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Basé à Montpellier, je suis disponible pour des missions TIBCO sur site dans toute
                l'Occitanie : Montpellier, Nîmes, Toulouse, Perpignan, Béziers. En full remote,
                j'interviens sur des projets partout en France, ce qui me permet de travailler avec
                des clients parisiens, lyonnais ou lillois sans contrainte de localisation.
              </p>
              <p>
                La région Occitanie dispose d'un tissu industriel important — aéronautique à Toulouse,
                industrie pharmaceutique et logiciels de gestion à Montpellier — qui utilise des
                solutions TIBCO pour l'intégration de leurs systèmes d'information. Si votre organisation
                est basée en Occitanie et cherche un<strong className="text-slate-200"> expert TIBCO
                disponible rapidement</strong>, je peux intervenir sous 2 semaines.
              </p>
              <p>
                Les missions TIBCO auxquelles je participe le plus fréquemment concernent la maintenance
                évolutive de flux existants, le développement de nouveaux services d'intégration,
                les audits de performance, et l'accompagnement des équipes DSI dans la gestion de
                leur plateforme TIBCO au quotidien.
              </p>
            </div>
          </section>

          {/* Section 3 — Use cases */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Ce que je fais avec TIBCO
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <ul className="space-y-2">
                {[
                  'Développement et maintenance de flux TIBCO BusinessWorks 5.x et 6.x',
                  'Configuration et administration de TIBCO EMS (topics, queues, bridges)',
                  'Intégration de systèmes hétérogènes : ERP, CRM, applications métier, bases de données',
                  'Conception de flux d\'intégration pour des échanges B2B (EDI, SOAP, REST)',
                  'Migration de TIBCO BW 5 vers BW 6 / Container Edition',
                  'Audit et optimisation de performances de flux existants',
                  'Accompagnement et formation d\'équipes DSI sur TIBCO',
                  'Remplacement de TIBCO par des solutions modernes (Camel, Kafka) si pertinent',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand-400 mt-0.5 shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4 — Pourquoi freelance */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5">
              Pourquoi choisir un consultant TIBCO freelance ?
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Les compétences TIBCO sont rares et coûteuses en ESN. Un consultant TIBCO via une
                grande société de conseil représente souvent un coût journalier très élevé, en partie
                absorbé par les marges de la structure intermédiaire. En travaillant directement avec
                un freelance TIBCO expérimenté, vous payez le bon niveau de compétence sans la marge.
              </p>
              <p>
                De plus, en tant que freelance indépendant, mon engagement sur vos projets est total.
                Je n'ai pas d'objectif commercial ou de cross-selling à satisfaire. Mon seul objectif
                est que votre projet soit livré dans les délais, dans le budget, et avec la qualité
                technique attendue.
              </p>
              <p>
                Pour les directions informatiques en Occitanie qui maintiennent des plateformes TIBCO
                et cherchent un renfort ponctuel ou récurrent sans passer par des appels d'offres
                complexes, la solution freelance offre agilité, rapidité de démarrage, et flexibilité
                contractuelle.
              </p>
            </div>
          </section>

          {/* Stack */}
          <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-5">Technologies et outils</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'TIBCO BW 5.x', 'TIBCO BW 6.x', 'TIBCO EMS', 'TIBCO ActiveMatrix',
                'TIBCO Designer', 'TIBCO Business Studio', 'Java 21', 'Spring Boot 3',
                'Apache Camel', 'Spring Integration', 'RabbitMQ', 'Apache Kafka',
                'SOAP / WSDL', 'REST / OpenAPI', 'JMS', 'Oracle', 'PostgreSQL',
                'Docker', 'Git', 'Maven',
              ].map((tag) => (
                <span key={tag}
                      className="px-3 py-1.5 text-xs font-mono text-slate-400
                                 bg-slate-800 rounded-lg border border-slate-700/50 text-center">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Références */}
          <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-5">Clients et références</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 py-5 px-6
                            rounded-2xl bg-slate-900/40 border border-slate-800/60">
              {['AMUE', 'AIFE', 'Airbus', 'Capgemini', 'Inetum'].map((ref) => (
                <span key={ref} className="text-slate-300 font-medium text-sm">{ref}</span>
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
              Un projet TIBCO à Montpellier ou en France ?
            </h2>
            <p className="text-slate-400 mb-8">
              Réponse sous 48h · Tarif transparent · Démarrage sous 2 semaines
            </p>
            <Link href="/contact?service=java"
                  className="btn-gradient inline-flex items-center px-8 py-4
                             text-white font-semibold rounded-xl">
              Envoyer ma mission TIBCO
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
