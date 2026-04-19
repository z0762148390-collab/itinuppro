import { Link } from '@/navigation';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import ProjectForm from './ProjectForm';
import { XCircle, Check } from 'lucide-react';

/* ─── WhatsApp icon ──────────────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ─── Content map ────────────────────────────────────────────────────────── */
type Step    = { title: string; desc: string };
type Offer   = { badge: string; title: string; items: string[]; price: string; cta: string; featured?: boolean };
type Profile = { icon: string; title: string; desc: string };

type LC = {
  badge: string;
  h1: [string, string];
  subtitle: string;
  cta1: string;
  cta2: string;
  problemTitle: string;
  problems: string[];
  solutionTitle: string;
  steps: Step[];
  offersTitle: string;
  offers: Offer[];
  forWhoTitle: string;
  profiles: Profile[];
  partnerTitle: string;
  partnerText: string;
  partnerConditions: string[];
  partnerCta: string;
  partnerNote: string;
  proofTitle: string;
  proofBio: string;
  proofStats: string[];
  proofRefs: string[];
  formTitle: string;
  ctaTitle: string;
  ctaSub: string;
  ctaBtn1: string;
  ctaBtn2: string;
  ctaMention: string;
  seoH2: string;
  seoText: string[];
};

const CONTENT: Record<string, LC> = {
  fr: {
    badge:    'Disponible — démarrage sous 2 semaines',
    h1:       ['Vous avez une idée de projet tech ?', 'On la transforme en produit.'],
    subtitle: "De l'idée au MVP jusqu'à la mise en production. Sans mauvais choix techniques, sans perte de temps.",
    cta1: 'Lancer mon projet',
    cta2: 'WhatsApp',

    problemTitle: "90% des projets échouent à cause de mauvais choix techniques.",
    problems: [
      "Vous choisissez la mauvaise technologie et vous recommencez tout 6 mois plus tard.",
      "Vous perdez du temps à chercher le bon prestataire pendant que votre idée vieillit.",
      "Votre MVP coûte trop cher et n'est jamais livré.",
    ],

    solutionTitle: 'Ce que je fais pour vous',
    steps: [
      { title: 'Analyse de votre idée',       desc: "On cadre ensemble votre projet en 30 minutes. Je vous dis si c'est faisable, comment et pour combien." },
      { title: 'Choix technologiques',         desc: "Je choisis les bonnes technologies selon votre besoin : pas de sur-ingénierie, pas de gadgets inutiles." },
      { title: 'Architecture scalable',         desc: "Votre projet est conçu pour tenir la charge dès le premier jour et évoluer facilement." },
      { title: 'Développement MVP rapide',     desc: "Je livre un produit fonctionnel en quelques semaines, pas en plusieurs mois." },
      { title: 'Mise en production cloud',     desc: "Votre application est en ligne, sécurisée, monitorée et prête à accueillir vos premiers utilisateurs." },
    ],

    offersTitle: 'Les offres',
    offers: [
      {
        badge:    'Le plus demandé',
        title:    'Pack MVP',
        featured: true,
        items:    ['Cadrage technique complet', 'Architecture backend solide', 'Développement backend (Java Spring Boot)', 'Déploiement cloud + pipeline automatisé', 'Documentation technique'],
        price:    'Sur devis',
        cta:      'Démarrer mon MVP',
      },
      {
        badge: 'Idéal avant de se lancer',
        title: 'Consulting & Audit',
        items: ["Audit de votre idée ou projet existant", 'Recommandations technologiques', 'Roadmap technique priorisée', "Plan d'action concret"],
        price: 'Sur devis',
        cta:   'Demander un audit',
      },
      {
        badge: 'Gratuit · 30 min',
        title: 'Call de qualification',
        items: ['Échange sur votre projet', 'Première orientation technique', 'Estimation rapide', 'Sans engagement'],
        price: 'Gratuit',
        cta:   'Réserver mon call',
      },
    ],

    forWhoTitle: 'Pour qui ?',
    profiles: [
      { icon: '🚀', title: 'Startup',                desc: "Vous avez une idée et cherchez un CTO technique pour la transformer en produit réel." },
      { icon: '💡', title: 'Entrepreneur non-tech',  desc: "Vous avez la vision business mais pas les compétences techniques pour la mettre en œuvre." },
      { icon: '🛠️', title: 'Freelance avec idée SaaS', desc: "Vous voulez créer votre propre produit en parallèle de vos missions." },
      { icon: '🏢', title: 'PME',                    desc: "Vous avez un besoin métier précis et voulez un outil sur mesure rapidement." },
    ],

    partnerTitle:      'Vous avez une idée ambitieuse ?',
    partnerText:       "Sur certains projets à fort potentiel, itinup peut s'associer en tant que partenaire technique. Pas juste un prestataire — un vrai co-fondateur tech.",
    partnerConditions: [
      'Un projet sérieux avec une vision long terme',
      'Un potentiel business réel et mesurable',
      'Une complémentarité entre vos compétences et les miennes',
    ],
    partnerCta:  'Proposer mon projet',
    partnerNote: "Les candidatures sont étudiées au cas par cas. Je ne m'associe qu'à 1 ou 2 projets par an.",

    proofTitle: 'Pourquoi me faire confiance ?',
    proofBio:   "7+ années d'expérience sur des projets complexes en production. J'ai travaillé pour AMUE, Capgemini, Airbus, Inetum et AIFE. Je ne livre pas du code — je livre des produits qui fonctionnent.",
    proofStats: ['30+ projets livrés', "7+ ans d'expérience", '<48h de réponse'],
    proofRefs:  ['AMUE', 'Inetum', 'Capgemini', 'Airbus', 'AIFE'],

    formTitle: 'Parlez-moi de votre projet',

    ctaTitle:   'Votre projet mérite un vrai expert technique.',
    ctaSub:     'Réponse sous 48h. Premier échange gratuit. Sans engagement.',
    ctaBtn1:    'Lancer mon projet',
    ctaBtn2:    'WhatsApp',
    ctaMention: 'Basé à Montpellier · Remote toute la France',

    seoH2: "Accompagnement projet tech, développement MVP et freelance DevOps à Montpellier",
    seoText: [
      "Vous portez une idée de produit tech depuis un moment. Un SaaS, une application métier, une plateforme web — et vous avez besoin d'un freelance technique senior pour la concrétiser sans gaspiller de temps ni d'argent.",
      "Je suis Zouhir Echarif, développeur backend Java Spring Boot et ingénieur DevOps freelance basé à Montpellier. Depuis plus de 7 ans, j'accompagne des startups, des entrepreneurs non-tech et des PME dans le lancement de leurs projets tech en France, de l'idée au MVP jusqu'à la mise en production sur le cloud.",
      "Mon parcours couvre des projets complexes en production pour des clients comme AMUE, Capgemini, Airbus, Inetum et AIFE. Cette expérience m'a enseigné l'essentiel : un bon produit se construit avec les bonnes technologies dès le départ, une architecture pensée pour la scalabilité, et une livraison rapide du MVP pour valider le marché avant d'investir davantage.",
      "En accompagnement projet tech, mon rôle va au-delà du développement pur. Je cadre votre idée avec vous en 30 minutes : faisabilité technique, choix de la stack, estimation réaliste du coût et du délai. Je choisis les technologies adaptées — Java Spring Boot pour le backend, Next.js pour le front, AWS ou OVHcloud pour l'infrastructure — sans sur-ingénierie inutile. Je livre ensuite un MVP startup fonctionnel en quelques semaines, déployé en production avec un pipeline CI/CD automatisé et un monitoring en place dès le premier jour.",
      "Que vous soyez une startup cherchant un CTO freelance à Montpellier ou en France, un entrepreneur non-tech avec une idée de SaaS, ou une PME ayant un besoin métier précis, je peux vous accompagner du cadrage à la mise en ligne d'une application web scalable. Premier échange gratuit. Réponse sous 48h. Décrivez-moi votre projet et commençons.",
    ],
  },

  en: {
    badge:    'Available — start within 2 weeks',
    h1:       ['Got a tech project idea?', "Let's turn it into a product."],
    subtitle: "From idea to MVP to production. No wrong technical decisions, no wasted time.",
    cta1: 'Start my project',
    cta2: 'WhatsApp',

    problemTitle: "90% of projects fail due to wrong technical decisions.",
    problems: [
      "You pick the wrong technology and rebuild everything 6 months later.",
      "You waste time finding the right developer while your idea ages.",
      "Your MVP costs too much and is never delivered.",
    ],

    solutionTitle: 'What I do for you',
    steps: [
      { title: 'Idea analysis',          desc: "We scope your project together in 30 minutes. I tell you if it's feasible, how, and for how much." },
      { title: 'Technology choices',     desc: "I select the right technologies for your needs — no over-engineering, no unnecessary complexity." },
      { title: 'Scalable architecture',  desc: "Your project is designed to handle load from day one and evolve easily." },
      { title: 'Fast MVP development',   desc: "I deliver a working product in weeks, not months." },
      { title: 'Cloud production launch', desc: "Your app is live, secured, monitored and ready for your first users." },
    ],

    offersTitle: 'What I offer',
    offers: [
      {
        badge:    'Most requested',
        title:    'MVP Pack',
        featured: true,
        items:    ['Full technical scoping', 'Solid backend architecture', 'Backend development (Java Spring Boot)', 'Cloud deployment + automated pipeline', 'Technical documentation'],
        price:    'On quote',
        cta:      'Start my MVP',
      },
      {
        badge: 'Ideal before launching',
        title: 'Consulting & Audit',
        items: ['Audit of your idea or existing project', 'Technology recommendations', 'Prioritised technical roadmap', 'Concrete action plan'],
        price: 'On quote',
        cta:   'Request an audit',
      },
      {
        badge: 'Free · 30 min',
        title: 'Qualification call',
        items: ['Discussion about your project', 'Initial technical guidance', 'Quick estimate', 'No commitment'],
        price: 'Free',
        cta:   'Book my call',
      },
    ],

    forWhoTitle: 'Who is this for?',
    profiles: [
      { icon: '🚀', title: 'Startup',               desc: "You have an idea and need a technical CTO to turn it into a real product." },
      { icon: '💡', title: 'Non-technical founder',  desc: "You have the business vision but lack the technical skills to execute it." },
      { icon: '🛠️', title: 'Freelancer with SaaS idea', desc: "You want to build your own product alongside your client missions." },
      { icon: '🏢', title: 'SME',                   desc: "You have a specific business need and want a custom tool, fast." },
    ],

    partnerTitle:      'Got an ambitious idea?',
    partnerText:       "On certain high-potential projects, itinup can partner as a technical co-founder. Not just a contractor — a real tech co-founder.",
    partnerConditions: [
      'A serious project with a long-term vision',
      'Real, measurable business potential',
      'Complementary skills between you and me',
    ],
    partnerCta:  'Pitch my project',
    partnerNote: "Applications are reviewed case by case. I partner on 1 or 2 projects per year.",

    proofTitle: 'Why trust me?',
    proofBio:   "7+ years of experience on complex production projects. I've worked for AMUE, Capgemini, Airbus, Inetum and AIFE. I don't deliver code — I deliver products that work.",
    proofStats: ['30+ projects delivered', '7+ years of experience', '<48h response'],
    proofRefs:  ['AMUE', 'Inetum', 'Capgemini', 'Airbus', 'AIFE'],

    formTitle: 'Tell me about your project',

    ctaTitle:   'Your project deserves a real tech expert.',
    ctaSub:     'Response within 48h. Free first exchange. No commitment.',
    ctaBtn1:    'Start my project',
    ctaBtn2:    'WhatsApp',
    ctaMention: 'Based in Montpellier · Remote across France',

    seoH2: "Tech project support, MVP development and freelance DevOps in Montpellier",
    seoText: [
      "You've been sitting on a tech product idea. A SaaS, a business application, a web platform — and you need a senior technical freelancer to bring it to life without wasting time or money.",
      "I'm Zouhir Echarif, a Java Spring Boot backend developer and freelance DevOps engineer based in Montpellier, France. For over 7 years, I've helped startups, non-technical entrepreneurs and SMEs launch their tech projects in France, from idea to MVP to cloud production.",
      "My track record includes complex production projects for clients like AMUE, Capgemini, Airbus, Inetum and AIFE. This experience taught me what matters most: a good product is built with the right technologies from day one, with a scalable architecture and a fast MVP to validate the market before investing further.",
      "My technical project support goes beyond pure development. I scope your idea in 30 minutes: technical feasibility, stack selection, realistic cost and timeline estimates. I choose the right technologies for your needs — Java Spring Boot for the backend, Next.js for the front-end, AWS or OVHcloud for infrastructure — without unnecessary over-engineering. I then deliver a working MVP in weeks, deployed to production with an automated CI/CD pipeline and monitoring from day one.",
      "Whether you're a startup looking for a freelance CTO, a non-technical entrepreneur with a SaaS idea, or an SME with a specific business need, I can take you from concept to scalable web application. Free first exchange. Response within 48h.",
    ],
  },

  ar: {
    badge:    'متاح — البدء خلال أسبوعين',
    h1:       ['لديك فكرة مشروع تقني؟', 'دعنا نحوّلها إلى منتج حقيقي.'],
    subtitle: "من الفكرة إلى MVP وحتى الإطلاق في بيئة الإنتاج. بدون اختيارات تقنية خاطئة، بدون إضاعة وقت.",
    cta1: 'أطلق مشروعي',
    cta2: 'WhatsApp',

    problemTitle: "90% من المشاريع تفشل بسبب قرارات تقنية خاطئة.",
    problems: [
      "تختار التقنية الخاطئة فتضطر لإعادة بناء كل شيء بعد 6 أشهر.",
      "تضيع وقتك في البحث عن المطور المناسب بينما فكرتك تشيخ.",
      "MVP الخاص بك يكلف أكثر من اللازم ولا يُسلَّم أبداً.",
    ],

    solutionTitle: 'ما أفعله من أجلك',
    steps: [
      { title: 'تحليل فكرتك',          desc: "نُحدد نطاق مشروعك معاً خلال 30 دقيقة. أخبرك إن كان ممكناً، وكيف، وبكم." },
      { title: 'اختيار التقنيات',       desc: "أختار التقنيات المناسبة لاحتياجك — بدون تعقيد زائد أو أدوات غير ضرورية." },
      { title: 'معمارية قابلة للتوسع', desc: "مشروعك مصمم ليتحمل الحمل من اليوم الأول ويتطور بسهولة." },
      { title: 'تطوير MVP سريع',        desc: "أُسلِّم منتجاً يعمل في أسابيع، لا أشهر." },
      { title: 'الإطلاق على السحابة',  desc: "تطبيقك يعمل، آمن، مُراقَب وجاهز لاستقبال أول مستخدميك." },
    ],

    offersTitle: 'العروض',
    offers: [
      {
        badge:    'الأكثر طلباً',
        title:    'حزمة MVP',
        featured: true,
        items:    ['تحديد النطاق التقني الكامل', 'معمارية backend متينة', 'تطوير backend (Java Spring Boot)', 'نشر سحابي + pipeline تلقائي', 'توثيق تقني'],
        price:    'حسب الطلب',
        cta:      'أبدأ MVP الخاص بي',
      },
      {
        badge: 'مثالي قبل الإطلاق',
        title: 'استشارة وتدقيق',
        items: ['تدقيق فكرتك أو مشروعك الحالي', 'توصيات تقنية', 'خارطة طريق تقنية مُرتَّبة حسب الأولويات', 'خطة عمل واضحة'],
        price: 'حسب الطلب',
        cta:   'طلب تدقيق',
      },
      {
        badge: 'مجاني · 30 دقيقة',
        title: 'مكالمة تأهيل',
        items: ['نقاش حول مشروعك', 'توجيه تقني أولي', 'تقدير سريع', 'بدون التزام'],
        price: 'مجاني',
        cta:   'حجز مكالمتي',
      },
    ],

    forWhoTitle: 'لمن هذا؟',
    profiles: [
      { icon: '🚀', title: 'شركة ناشئة',           desc: "لديك فكرة وتبحث عن CTO تقني لتحويلها إلى منتج حقيقي." },
      { icon: '💡', title: 'رائد أعمال غير تقني',  desc: "لديك رؤية تجارية لكن تفتقر إلى المهارات التقنية لتنفيذها." },
      { icon: '🛠️', title: 'مستقل بفكرة SaaS',    desc: "تريد بناء منتجك الخاص بالتوازي مع مهامك الحالية." },
      { icon: '🏢', title: 'شركة صغيرة ومتوسطة',  desc: "لديك حاجة محددة وتريد أداة مخصصة بسرعة." },
    ],

    partnerTitle:      'لديك فكرة طموحة؟',
    partnerText:       "في بعض المشاريع ذات الإمكانات العالية، يمكن لـ itinup أن يشارك بوصفه شريكاً تقنياً. لا مجرد مورد — بل مؤسس تقني حقيقي.",
    partnerConditions: [
      'مشروع جاد برؤية طويلة الأمد',
      'إمكانات تجارية حقيقية وقابلة للقياس',
      'تكامل بين مهاراتك ومهاراتي',
    ],
    partnerCta:  'اقتراح مشروعي',
    partnerNote: "الطلبات تُدرس كل حالة على حدة. أتشارك في مشروع أو مشروعين في السنة فحسب.",

    proofTitle: 'لماذا تثق بي؟',
    proofBio:   "أكثر من 7 سنوات من الخبرة في مشاريع إنتاج معقدة. عملت لصالح AMUE وCapgemini وAirbus وInetum وAIFE. لا أُسلِّم كوداً — أُسلِّم منتجات تعمل.",
    proofStats: ['+30 مشروع مُسلَّم', '+7 سنوات خبرة', 'رد خلال 48 ساعة'],
    proofRefs:  ['AMUE', 'Inetum', 'Capgemini', 'Airbus', 'AIFE'],

    formTitle: 'حدثني عن مشروعك',

    ctaTitle:   'مشروعك يستحق خبيراً تقنياً حقيقياً.',
    ctaSub:     'رد خلال 48 ساعة. أول محادثة مجانية. بدون التزام.',
    ctaBtn1:    'أطلق مشروعي',
    ctaBtn2:    'WhatsApp',
    ctaMention: 'مقيم في مونبيلييه · عن بُعد في جميع أنحاء فرنسا',

    seoH2: "مرافقة المشاريع التقنية وتطوير MVP وDevOps مستقل في مونبيلييه",
    seoText: [
      "لديك فكرة منتج تقني تنتظر التنفيذ — SaaS، تطبيق مخصص، أو منصة ويب. تحتاج إلى مطور مستقل متمرس يجعلها واقعاً دون إهدار الوقت أو المال.",
      "أنا زهير اشريف، مطور Java Spring Boot ومهندس DevOps مستقل مقيم في مونبيلييه، فرنسا. خلال أكثر من 7 سنوات، ساعدت شركات ناشئة ورجال أعمال وPME على إطلاق مشاريعهم التقنية في فرنسا، من الفكرة إلى MVP وحتى الإطلاق في بيئة الإنتاج على السحابة.",
      "عملت على مشاريع معقدة في بيئات الإنتاج لعملاء كـ AMUE وCapgemini وAirbus وInetum وAIFE. هذه التجربة علمتني أن المنتج الجيد يُبنى بالتقنيات الصحيحة منذ البداية، بمعمارية قابلة للتوسع، وتسليم MVP سريع للتحقق من السوق قبل الاستثمار أكثر.",
      "إذا كنت تبحث عن مطور مستقل في فرنسا لبناء SaaS خاص بك أو إطلاق تطبيق ويب قابل للتوسع أو التحقق من فكرة بسرعة، تواصل معي. أول محادثة مجانية، رد خلال 48 ساعة، بدون التزام.",
    ],
  },
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function LaunchProjectContent({ locale }: { locale: string }) {
  const c     = (CONTENT[locale] ?? CONTENT.fr) as LC;
  const isRtl = locale === 'ar';
  const slug  = locale === 'fr' ? 'lancer-mon-projet' : 'start-my-project';

  const serviceSchema = {
    '@context':   'https://schema.org',
    '@type':      'Service',
    name:         locale === 'fr'
      ? 'Accompagnement projet tech & développement MVP'
      : 'Tech project support & MVP development',
    description:  locale === 'fr'
      ? "De l'idée au MVP jusqu'à la mise en production. Java Spring Boot, DevOps, architecture scalable. Freelance basé à Montpellier."
      : 'From idea to MVP to production. Java Spring Boot, DevOps, scalable architecture. Freelance based in Montpellier, France.',
    url:          `${SITE.url}/${locale}/${slug}`,
    provider: {
      '@type':    'Person',
      name:       'Zouhir Echarif El Idrissi El Kandri',
      url:        SITE.url,
      telephone:  SITE.whatsappNumber,
    },
    areaServed:   { '@type': 'Country', name: 'France' },
    serviceType:  'Freelance DevOps & Développement Web',
    offers: {
      '@type':    'Offer',
      price:      '0',
      priceCurrency: 'EUR',
      description: locale === 'fr' ? 'Premier échange gratuit — devis sur demande' : 'Free first exchange — quote on request',
    },
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px]
                        bg-brand-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto text-center rtl:text-right">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2
                          bg-brand-600/10 text-brand-400 text-sm font-medium
                          rounded-full border border-brand-600/20 badge-glow">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            {c.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            <span className="headline-gradient">{c.h1[0]}</span>
            <br />
            <span className="text-brand-400">{c.h1[1]}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10 rtl:mx-0">
            {c.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 rtl:flex-row-reverse rtl:justify-start">
            <Link href="/contact"
                  className="btn-gradient inline-flex items-center justify-center px-8 py-4
                             text-white font-semibold rounded-xl text-base w-full sm:w-auto">
              {c.cta1}
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 px-8 py-4
                          bg-green-500/10 text-green-400 border border-green-500/25
                          font-semibold rounded-xl text-base w-full sm:w-auto
                          hover:bg-green-500/20 hover:border-green-400/40 transition-all">
              <WhatsAppIcon />
              {c.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. PROBLÈME ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center rtl:text-right
                         mb-12 tracking-tight">
            {c.problemTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.problems.map((text, i) => (
              <div key={i} className="card p-6 flex flex-col gap-4">
                <XCircle className="w-7 h-7 text-red-400 shrink-0" aria-hidden="true" />
                <p className="text-slate-400 leading-relaxed text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SOLUTION ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center rtl:text-right
                         mb-14 tracking-tight">
            {c.solutionTitle}
          </h2>
          <ol className="relative space-y-0">
            {c.steps.map((step, i) => (
              <li key={i} className="flex gap-6 pb-10 last:pb-0 relative">
                {/* Vertical line */}
                {i < c.steps.length - 1 && (
                  <div className={`absolute top-10 w-px bg-slate-800
                                  ${isRtl ? 'right-[19px]' : 'left-[19px]'} bottom-0`}
                       aria-hidden="true" />
                )}
                {/* Step number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-600/15
                                border border-brand-600/30 flex items-center justify-center z-10">
                  <span className="text-brand-400 font-bold text-sm">{i + 1}</span>
                </div>
                <div className="pt-1.5">
                  <h3 className="font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. OFFRES ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center rtl:text-right
                         mb-12 tracking-tight">
            {c.offersTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.offers.map((offer, i) => (
              <div key={i}
                   className={`card p-6 flex flex-col gap-5 relative
                               ${offer.featured ? 'border-brand-600/40 ring-1 ring-brand-600/20' : ''}`}>
                <div>
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4
                                    ${offer.featured
                                      ? 'bg-brand-600/20 text-brand-400 border border-brand-600/30'
                                      : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                    {offer.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white">{offer.title}</h3>
                </div>

                <ul className="space-y-2 flex-1">
                  {offer.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <Check className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-800/80">
                  <p className="text-white font-bold text-lg mb-4">{offer.price}</p>
                  <Link href="/contact"
                        className={`w-full inline-flex items-center justify-center px-5 py-3
                                    font-semibold rounded-xl text-sm transition-all
                                    ${offer.featured
                                      ? 'btn-gradient text-white'
                                      : 'border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'}`}>
                    {offer.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. POUR QUI ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center rtl:text-right
                         mb-12 tracking-tight">
            {c.forWhoTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.profiles.map((p, i) => (
              <div key={i} className="card p-6 flex gap-4">
                <span className="text-3xl leading-none" aria-hidden="true">{p.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PARTENARIAT ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="max-w-2xl mx-auto text-center rtl:text-right">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
            {c.partnerTitle}
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">{c.partnerText}</p>

          <ul className="space-y-3 mb-10 text-left rtl:text-right">
            {c.partnerConditions.map((cond, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                <Check className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" aria-hidden="true" />
                {cond}
              </li>
            ))}
          </ul>

          <Link href="/contact"
                className="btn-gradient inline-flex items-center justify-center px-8 py-4
                           text-white font-semibold rounded-xl text-base">
            {c.partnerCta}
          </Link>
          <p className="text-slate-600 text-xs mt-5 leading-relaxed">{c.partnerNote}</p>
        </div>
      </section>

      {/* ── 7. PREUVE ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center rtl:text-right
                         mb-10 tracking-tight">
            {c.proofTitle}
          </h2>

          <p className="text-slate-400 leading-relaxed text-center rtl:text-right mb-10">
            {c.proofBio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {c.proofStats.map((stat, i) => (
              <div key={i} className="card px-4 py-5 text-center">
                <p className="text-white font-bold text-lg leading-snug">{stat}</p>
              </div>
            ))}
          </div>

          {/* Refs */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3
                          px-6 py-5 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            {c.proofRefs.map((ref) => (
              <span key={ref} className="text-slate-300 font-medium text-sm">{ref}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FORMULAIRE ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center rtl:text-right
                         mb-10 tracking-tight">
            {c.formTitle}
          </h2>
          <div className="card p-8">
            <ProjectForm locale={locale} />
          </div>
        </div>
      </section>

      {/* ── 9. CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-t border-slate-800/60"
               dir={isRtl ? 'rtl' : undefined}>
        <div className="max-w-2xl mx-auto text-center rtl:text-right">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            {c.ctaTitle}
          </h2>
          <p className="text-slate-400 text-lg mb-2">{c.ctaSub}</p>
          <p className="text-slate-600 text-sm mb-10">{c.ctaMention}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 rtl:flex-row-reverse">
            <Link href="/contact"
                  className="btn-gradient w-full sm:w-auto inline-flex items-center justify-center
                             px-8 py-4 text-white font-semibold rounded-xl text-base">
              {c.ctaBtn1}
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
               className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                          px-8 py-4 bg-green-500/10 text-green-400 border border-green-500/25
                          font-semibold rounded-xl text-base
                          hover:bg-green-500/20 hover:border-green-400/40 transition-all">
              <WhatsAppIcon />
              {c.ctaBtn2}
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. TEXTE SEO ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950"
               dir={isRtl ? 'rtl' : undefined}>
        <article className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-8">
            {c.seoH2}
          </h2>
          <div className="space-y-4">
            {c.seoText.map((para, i) => (
              <p key={i} className="text-slate-500 leading-relaxed text-sm">{para}</p>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
