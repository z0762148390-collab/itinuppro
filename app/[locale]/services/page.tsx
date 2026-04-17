import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import ServicesSwitcher from '@/components/services/ServicesSwitcher';
import FAQLanding from '@/components/landing/FAQLanding';
import JsonLd from '@/components/ui/JsonLd';
import { getFAQSchema } from '@/lib/schemas';
import type { FAQ } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

/* ─── Locale-aware content ────────────────────────────────────── */

type LocaleContent = {
  h1: string;
  subtitle: string;
  badge: string;
  trustTitle: string;
  trustStats: { value: string; label: string }[];
  trustRefs: string;
  seoH2: string;
  seoParagraphs: string[];
  faqTitle: string;
  faqs: FAQ[];
};

const CONTENT: Record<string, LocaleContent> = {
  fr: {
    h1: "Freelance DevOps, Java & Création d'app web et mobile — Montpellier",
    subtitle:
      'Expert disponible pour vos missions et vos projets web. Remote toute la France. Basé à Montpellier.',
    badge: 'Disponible — réponse sous 48h',

    trustTitle: 'Pourquoi travailler avec moi ?',
    trustStats: [
      { value: '7 ans', label: "d'expérience" },
      { value: '30+', label: 'projets livrés' },
      { value: '48h', label: 'délai de réponse' },
    ],
    trustRefs: 'AMUE · Airbus · Capgemini · Inetum · AIFE',

    seoH2: 'Freelance DevOps, Java Spring et création de site web à Montpellier',
    seoParagraphs: [
      "Je m'appelle Zouhir Echarif, développeur et ingénieur DevOps indépendant basé à Montpellier. " +
        "Depuis plus de 7 ans, j'interviens en mission pour des grands comptes et des ETI — AMUE, Airbus, " +
        'Capgemini, Inetum, AIFE — ainsi qu\'en création de sites et d\'applications web pour des artisans, ' +
        'des commerçants et des PME partout en France.',

      "En mission, je prends en charge vos besoins DevOps & Cloud : pipelines CI/CD avec GitHub Actions, " +
        'containerisation Docker, orchestration Kubernetes, infrastructure AWS ou OVHcloud, et supervision ' +
        'Prometheus/Grafana. Côté développement, j\'interviens sur Java 21 avec Spring Boot 3, intégration ' +
        'TIBCO BusinessWorks et TIBCO EMS, ainsi que sur des stacks modernes Next.js + FastAPI + PostgreSQL.',

      "Pour la création de site web à Montpellier ou partout en France, je propose des sites vitrines " +
        'professionnels à partir de 490€ livrés en 2 à 3 semaines, des applications web sur mesure pour ' +
        'vos besoins métier, et une offre clé en main à 49€/mois — hébergement, maintenance et mises à ' +
        "jour inclus. Vous gardez la propriété totale de votre site.",

      "Ce qui vous distingue en passant par un freelance plutôt qu'une agence : vous parlez directement " +
        "à celui qui code. Pas de commercial, pas d'intermédiaire. Vos délais sont tenus, votre budget est " +
        "respecté. Je suis disponible en remote toute la France et en présentiel à Montpellier et alentours.",
    ],

    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Quel est votre TJM pour une mission DevOps ou Java ?',
        answer:
          "Mon TJM varie selon la complexité et la durée de la mission. Je vous communique un tarif transparent dès notre premier échange. Pour une mission longue durée ou un engagement récurrent, un tarif préférentiel est possible.",
      },
      {
        question: 'Travaillez-vous en remote ou en présentiel ?',
        answer:
          "Les deux. Je travaille principalement en remote depuis Montpellier, mais je peux me déplacer en Occitanie et dans toute la France selon les besoins du projet. La grande majorité de mes missions se déroulent entièrement à distance.",
      },
      {
        question: 'Dans quels délais pouvez-vous démarrer une mission ?',
        answer:
          "Je suis généralement disponible sous 2 semaines. Contactez-moi avec les détails de votre mission pour confirmer ma disponibilité à la date souhaitée. En cas d'urgence, un démarrage plus rapide est parfois possible.",
      },
      {
        question: "Combien coûte la création d'un site vitrine professionnel ?",
        answer:
          "Un site vitrine professionnel est à partir de 490€, livré en 2 à 3 semaines. Le prix inclut le design, le développement, le SEO de base et la mise en ligne. Pour un devis précis adapté à votre activité, décrivez-moi votre projet via le formulaire de contact.",
      },
      {
        question: 'Prenez-vous des clients hors de Montpellier ?',
        answer:
          "Oui, je travaille avec des clients dans toute la France. La grande majorité de mes projets se déroulent entièrement en remote. Pour les clients proches de Montpellier, des réunions en présentiel sont possibles si vous le souhaitez.",
      },
      {
        question: 'Comment se passe le premier contact ?',
        answer:
          "Vous m'envoyez un message via le formulaire de contact ou WhatsApp avec les détails de votre besoin. Je reviens vers vous sous 48h avec une première réponse ou pour fixer un appel de 30 minutes gratuit, sans engagement.",
      },
    ],
  },

  en: {
    h1: 'DevOps & Web Development Freelancer — Montpellier, France',
    subtitle: 'Available for freelance missions and web projects. Remote across France.',
    badge: 'Available — response within 48h',

    trustTitle: 'Why work with me?',
    trustStats: [
      { value: '7 yrs', label: 'of experience' },
      { value: '30+', label: 'projects delivered' },
      { value: '48h', label: 'response time' },
    ],
    trustRefs: 'AMUE · Airbus · Capgemini · Inetum · AIFE',

    seoH2: 'DevOps, Java Spring & Web Development Freelancer based in Montpellier',
    seoParagraphs: [
      "I'm Zouhir Echarif, an independent DevOps engineer and web developer based in Montpellier, France. " +
        'With over 7 years of experience, I have worked on missions for major clients — AMUE, Airbus, ' +
        'Capgemini, Inetum, AIFE — and built websites and web applications for craftsmen, retailers, and SMEs.',

      'For missions, I handle your DevOps & Cloud needs: CI/CD pipelines with GitHub Actions, Docker ' +
        'containerisation, Kubernetes orchestration, AWS infrastructure, and Prometheus/Grafana monitoring. ' +
        'For development, I specialise in Java 21 with Spring Boot 3, TIBCO BusinessWorks/EMS integration, ' +
        'and modern stacks such as Next.js + FastAPI + PostgreSQL.',

      'For web creation, I offer professional showcase websites from €490 delivered in 2–3 weeks, custom ' +
        'web applications tailored to your business needs, and a turnkey offer at €49/month including ' +
        'hosting, maintenance, and updates. You retain full ownership of your site.',

      'Working directly with a freelancer means no middleman, transparent pricing, and direct communication ' +
        'with the person writing your code. Deadlines met, budgets respected.',
    ],

    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        question: 'What is your daily rate for a DevOps or Java mission?',
        answer:
          'My daily rate varies by complexity and duration. I share a transparent rate in our first exchange. Preferential rates are available for long-term or recurring engagements.',
      },
      {
        question: 'Do you work remotely or on-site?',
        answer:
          'Both. I work primarily remotely from Montpellier, but I can travel to Occitanie and anywhere in France as needed. The vast majority of my missions run entirely remotely.',
      },
      {
        question: 'How quickly can you start a mission?',
        answer:
          "I'm generally available within 2 weeks. Contact me with your mission details to confirm availability for your desired start date. In urgent cases, faster onboarding is sometimes possible.",
      },
      {
        question: 'How much does a professional showcase website cost?',
        answer:
          'A professional showcase website starts at €490, delivered in 2–3 weeks. The price includes design, development, basic SEO, and go-live setup. For a precise quote tailored to your business, describe your project via the contact form.',
      },
      {
        question: 'Do you work with clients outside Montpellier?',
        answer:
          'Yes, I work with clients across France. Most projects run entirely remotely. For clients near Montpellier, in-person meetings are possible on request.',
      },
      {
        question: 'How does first contact work?',
        answer:
          "Send me a message via the contact form or WhatsApp with your project details. I'll respond within 48h with initial feedback or to schedule a free, no-obligation 30-minute call.",
      },
    ],
  },

  ar: {
    h1: 'مطور مستقل DevOps وتطوير الويب — مونبوليي، فرنسا',
    subtitle: 'متاح للمهام المستقلة ومشاريع الويب. عن بُعد في جميع أنحاء فرنسا.',
    badge: 'متاح — رد خلال 48 ساعة',

    trustTitle: 'لماذا العمل معي؟',
    trustStats: [
      { value: '7 سنوات', label: 'من الخبرة' },
      { value: '+30', label: 'مشروع مكتمل' },
      { value: '48 س', label: 'وقت الاستجابة' },
    ],
    trustRefs: 'AMUE · Airbus · Capgemini · Inetum · AIFE',

    seoH2: 'مطور مستقل DevOps وJava Spring وتطوير الويب في مونبوليي',
    seoParagraphs: [
      'أنا زهير الشريف، مهندس DevOps ومطور ويب مستقل مقيم في مونبوليي، فرنسا. مع أكثر من 7 سنوات من ' +
        'الخبرة، عملت في مهام لكبار العملاء — AMUE وAirbus وCapgemini وInetum وAIFE — وأنشأت مواقع ' +
        'وتطبيقات ويب للحرفيين وأصحاب الأعمال الصغيرة والمتوسطة في جميع أنحاء فرنسا.',

      'للمهام، أتولى احتياجاتك في DevOps والسحابة: خطوط CI/CD مع GitHub Actions، Docker، Kubernetes، ' +
        'البنية التحتية لـ AWS، ومراقبة Prometheus/Grafana. وفي التطوير، أتخصص في Java 21 مع Spring Boot 3 ' +
        'وتكامل TIBCO BusinessWorks وTIBCO EMS، إضافةً إلى مكدسات حديثة مثل Next.js + FastAPI + PostgreSQL.',

      'لإنشاء الويب، أقدم مواقع احترافية بدءاً من 490€ تُسلَّم خلال 2-3 أسابيع، وتطبيقات ويب مخصصة ' +
        'لاحتياجاتك التجارية، وعرضاً متكاملاً بـ 49€/شهر يشمل الاستضافة والصيانة والتحديثات. ' +
        'تحتفظ بالملكية الكاملة لموقعك.',

      'العمل مع مستقل يعني لا وسيط، تسعير شفاف، وتواصل مباشر مع من يكتب كودك. مواعيد التسليم تُحترم والميزانية تُصان.',
    ],

    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      {
        question: 'ما هو معدل أجرك اليومي لمهمة DevOps أو Java؟',
        answer:
          'يتفاوت معدل أجري اليومي حسب تعقيد المهمة ومدتها. أشارك السعر بشفافية في أول تواصل. تتوفر أسعار تفضيلية للمشاركات طويلة الأمد أو المتكررة.',
      },
      {
        question: 'هل تعمل عن بُعد أم حضورياً؟',
        answer:
          'كلاهما. أعمل بشكل رئيسي عن بُعد من مونبوليي، لكن يمكنني التنقل في منطقة أوكسيتاني وفي جميع أنحاء فرنسا. معظم مهامي تسير عن بُعد بالكامل.',
      },
      {
        question: 'في أي مدة يمكنك بدء المهمة؟',
        answer:
          'أكون متاحاً عادةً خلال أسبوعين. تواصل معي بتفاصيل مهمتك لتأكيد التوفر في التاريخ المطلوب. في حالات الاستعجال، قد يكون البدء الأسرع ممكناً.',
      },
      {
        question: 'كم يكلف إنشاء موقع ويب احترافي؟',
        answer:
          'يبدأ الموقع الاحترافي من 490€ ويُسلَّم خلال 2-3 أسابيع. يشمل السعر التصميم والتطوير وتهيئة السيو الأساسية والإطلاق. للحصول على عرض دقيق، صف مشروعك عبر نموذج التواصل.',
      },
      {
        question: 'هل تعمل مع عملاء خارج مونبوليي؟',
        answer:
          'نعم، أعمل مع عملاء في جميع أنحاء فرنسا. معظم المشاريع تسير عن بُعد بالكامل. للعملاء القريبين من مونبوليي، يمكن ترتيب اجتماعات حضورية عند الطلب.',
      },
      {
        question: 'كيف يتم التواصل الأول؟',
        answer:
          'أرسل لي رسالة عبر نموذج الاتصال أو WhatsApp مع تفاصيل مشروعك. سأرد خلال 48 ساعة بتعليق أولي أو لترتيب مكالمة مجانية مدتها 30 دقيقة دون أي التزام.',
      },
    ],
  },
};

/* ─── Metadata ────────────────────────────────────────────────── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'Freelance DevOps, Java & Création Site Web — Montpellier | itinup',
    en: 'DevOps & Web Development Freelancer — Montpellier, France | itinup',
    ar: 'مطور مستقل DevOps وتطوير الويب — مونبوليي | itinup',
  };

  const descriptions: Record<string, string> = {
    fr: 'Mission freelance DevOps, Java Spring Boot, développement web. Création de sites et applications pour artisans, commerçants et PME. Basé à Montpellier, remote toute la France.',
    en: 'DevOps, Java Spring Boot and web development freelancer. Websites and web apps for businesses. Based in Montpellier, remote across France.',
    ar: 'مطور مستقل DevOps وJava Spring Boot وتطوير الويب. مواقع وتطبيقات للشركات. مقيم في مونبوليي، عمل عن بُعد في فرنسا.',
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: {
      canonical: `${SITE.url}/${locale}/services`,
      languages: {
        fr: `${SITE.url}/fr/services`,
        en: `${SITE.url}/en/services`,
        ar: `${SITE.url}/ar/services`,
      },
    },
    keywords: [
      'freelance DevOps Montpellier',
      'mission freelance Java Spring Boot',
      'création site web artisan',
      'application web sur mesure',
      'freelance développeur web France',
    ],
  };
}

/* ─── Page ────────────────────────────────────────────────────── */

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const c = (CONTENT[locale] ?? CONTENT['fr'])!;
  const isRtl = locale === 'ar';

  return (
    <>
      <JsonLd schema={getFAQSchema(c.faqs)} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                      bg-brand-600/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5
                        bg-brand-600/10 text-brand-400 text-sm font-medium
                        rounded-full border border-brand-600/20 badge-glow">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            {c.badge}
          </div>

          <h1
            className={`headline-gradient text-4xl sm:text-5xl font-bold
                       leading-tight tracking-tight mb-5 ${isRtl ? 'text-right' : ''}`}>
            {c.h1}
          </h1>

          <p className={`text-lg sm:text-xl text-slate-400 leading-relaxed ${isRtl ? 'text-right' : ''}`}>
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* ── Tab switcher ─────────────────────────────────────────── */}
      <div className="bg-slate-950 pt-10">
        <ServicesSwitcher locale={locale} />
      </div>

      {/* ── Trust / mini-bio ─────────────────────────────────────── */}
      <section className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-2xl sm:text-3xl font-bold text-slate-100 mb-10
                        ${isRtl ? 'text-right' : 'text-center'}`}>
            {c.trustTitle}
          </h2>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {c.trustStats.map(({ value, label }) => (
              <div
                key={label}
                className={`flex flex-col items-center justify-center
                            bg-slate-900/60 border border-slate-800/80 rounded-2xl py-6 px-4
                            ${isRtl ? 'text-right' : 'text-center'}`}>
                <span className="text-3xl sm:text-4xl font-bold text-brand-400 mb-1">{value}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>

          {/* References */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4
                        py-5 px-6 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest shrink-0">
              Références
            </span>
            <span className="text-slate-300 font-medium text-sm text-center">{c.trustRefs}</span>
          </div>
        </div>
      </section>

      {/* ── SEO text ─────────────────────────────────────────────── */}
      <section className="bg-slate-950 pb-20 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-3xl mx-auto ${isRtl ? 'text-right' : ''}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-8 leading-snug">
            {c.seoH2}
          </h2>
          <div className="space-y-5">
            {c.seoParagraphs.map((para, i) => (
              <p key={i} className="text-slate-400 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <div className="bg-slate-950">
        <FAQLanding title={c.faqTitle} items={c.faqs} />
      </div>
    </>
  );
}
