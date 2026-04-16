import { SITE, PERSON } from './constants';

/* ─── Types ─────────────────────────────────────────────────────────────────── */

export type Block =
  | { type: 'p';       text: string }
  | { type: 'h2';      text: string }
  | { type: 'h3';      text: string }
  | { type: 'ul';      items: string[] }
  | { type: 'ol';      items: string[] }
  | { type: 'code';    lang: string; code: string }
  | { type: 'callout'; text: string }
  | { type: 'table';   headers: string[]; rows: string[][] }
  | { type: 'faq';     q: string; a: string };

export interface PostLocaleData {
  title:       string;
  description: string; // 150-160 chars
  date:        string;
  readingTime: number;
  tags:        string[];
  category:    string; // used for OG image label
  blocks:      Block[];
}

type Locale = 'fr' | 'en' | 'ar';
export type PostDB = Record<string, Partial<Record<Locale, PostLocaleData>>>;

/* ─── Inline helpers (used to write links in text fields) ───────────────────── */
// In `p`, `ul`, `callout` text: **bold** `code` [label](href) are supported.
// The renderer converts them via toHtml().

/* ═══════════════════════════════════════════════════════════════════════════════
   ARTICLE 1 — Combien coûte un freelance DevOps en France en 2025 ?
   slug: combien-coute-freelance-devops-france-2025
═══════════════════════════════════════════════════════════════════════════════ */

const devopsPricingFR: PostLocaleData = {
  title:       'Combien coûte un freelance DevOps en France en 2025 ?',
  description: 'Tarif journalier, forfaits mensuels, facteurs de prix — guide complet pour budgéter votre prestation DevOps en France en 2025. Taux réels, sans jargon.',
  date:        '2025-01-15',
  readingTime: 7,
  tags:        ['DevOps', 'Tarifs', 'Freelance', 'France'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: "C'est souvent la première question que me posent les dirigeants de PME et les CTO de startups : **combien ça coûte, un freelance DevOps ?** La réponse courte : entre 400 et 700 €/jour pour un profil senior en France. Mais cette fourchette ne vous dit pas grand-chose si vous ne savez pas ce qui la fait varier." },
    { type: 'p', text: "Dans cet article, je détaille les facteurs réels qui influencent le tarif, les différents modèles de facturation, et à quel moment un freelance DevOps devient plus rentable qu'une embauche en CDI." },
    { type: 'h2', text: 'Ce qui influence le tarif' },
    { type: 'h3', text: "Niveau d'expérience" },
    { type: 'table',
      headers: ['Profil', 'Tarif journalier', 'Caractéristiques'],
      rows: [
        ['Junior (0-3 ans)', '250 – 350 €/j', 'Maîtrise des bases CI/CD, Docker, Linux'],
        ['Confirmé (3-6 ans)', '350 – 500 €/j', 'Kubernetes, AWS, gestion de plusieurs envs'],
        ['Senior (6+ ans)', '500 – 700 €/j', 'Architecture cloud, IaC, Observabilité avancée'],
        ['Expert / Lead (10+ ans)', '700 – 1 000 €/j', 'Gouvernance, multi-cloud, finops'],
      ],
    },
    { type: 'h3', text: 'Stack technique' },
    { type: 'p', text: "Tous les outils ne se valorisent pas pareil. Un freelance maîtrisant **Kubernetes, Terraform et AWS** sera systématiquement mieux rémunéré qu'un profil limité aux pipelines CI/CD basiques. Les certifications (AWS Solutions Architect, CKA) jouent aussi sur le tarif, mais moins que l'expérience réelle en production." },
    { type: 'h3', text: 'Durée et type de mission' },
    { type: 'ul', items: [
      '**Mission courte (< 1 mois)** : tarif plein, pas de négociation — le freelance prend un risque de disponibilité',
      '**Mission longue (3-6 mois)** : remise possible de 10-15 % en échange de la visibilité',
      '**Forfait périmètre défini** : souvent plus avantageux que la régie si le scope est clair',
      '**Remote vs présentiel** : un freelance basé à Paris facturera 5-10 % de plus qu\'un freelance en province en remote',
    ]},
    { type: 'h2', text: 'Tarif journalier vs forfait mensuel' },
    { type: 'p', text: "Pour un projet ponctuel — mise en place d'un pipeline CI/CD, migration cloud, audit infra — le **tarif journalier (TJM)** est le modèle standard. Vous payez les jours effectivement travaillés, avec un périmètre défini à l'avance." },
    { type: 'p', text: "Pour la **maintenance, le monitoring et le support continu**, un forfait mensuel est souvent plus adapté. Comptez entre **500 et 1 500 €/mois** pour :" },
    { type: 'ul', items: [
      'Monitoring et alerting (Prometheus, Grafana, Sentry)',
      'Gestion des mises à jour de sécurité',
      'Réponse aux incidents (SLA défini)',
      'Revue mensuelle de l\'infrastructure',
    ]},
    { type: 'callout', text: 'Un forfait mensuel à 800 €/mois peut couvrir 8 à 12 heures de travail réel. C\'est suffisant pour la plupart des PME qui n\'ont pas besoin d\'un DevOps à temps plein.' },
    { type: 'h2', text: 'Freelance vs CDI : la vraie comparaison' },
    { type: 'p', text: "Un ingénieur DevOps senior en CDI coûte entre **55 000 et 85 000 € brut/an** en France, soit **110 000 à 170 000 € chargé** pour l'entreprise (charges patronales ~50 %). En ajoutant les avantages (mutuelle, tickets resto, formation, matériel), on dépasse facilement 180 000 €/an." },
    { type: 'p', text: "Un freelance DevOps senior à 550 €/j sur 150 jours/an (mi-temps effectif) revient à **82 500 € HT**. Sans charges sociales, sans congés payés, sans matériel à charge." },
    { type: 'p', text: "Pour la plupart des PME et startups qui n'ont pas besoin d'un DevOps **à plein temps**, la conclusion s'impose : le freelance revient moins cher et offre plus de flexibilité." },
    { type: 'h2', text: 'Comment évaluer un freelance DevOps ?' },
    { type: 'p', text: "Le tarif ne dit pas tout. Avant de signer, vérifiez :" },
    { type: 'ul', items: [
      '**Références vérifiables** : demandez 2-3 contacts clients, pas juste des logos sur un portfolio',
      '**Code ou config réels** : un bon freelance DevOps peut vous montrer des pipelines, des configs Terraform, des dashboards Grafana',
      '**Compréhension de votre stack** : méfiance si quelqu\'un prétend tout maîtriser — les bons profils ont des zones d\'excellence et le disent',
      '**Transparence sur les limites** : un senior honnête dira "je ne connais pas X, il faudra 1-2 jours de montée en compétence"',
    ]},
    { type: 'h2', text: 'Questions fréquentes' },
    { type: 'faq', q: 'Faut-il passer par une plateforme freelance (Malt, Upwork) ?', a: "Pas obligatoirement. Ces plateformes prennent 10-20 % de commission, ce qui augmente le coût final. Travailler en direct permet une relation plus transparente et une meilleure négociation. L'inconvénient : vous devez trouver et vérifier le profil vous-même." },
    { type: 'faq', q: 'Un freelance peut-il travailler en remote depuis Montpellier ou la province ?', a: "Oui — et c'est la norme. La quasi-totalité de mes missions sont en remote depuis Montpellier pour des clients partout en France (Paris, Lyon, Bordeaux, Nantes). Les rares besoins de présentiel peuvent être couverts par des déplacements ponctuels." },
    { type: 'faq', q: 'Quel budget prévoir pour un premier projet DevOps ?', a: "Pour une mise en place initiale (pipeline CI/CD + containerisation + déploiement cloud), comptez 3 à 10 jours de travail, soit 1 500 à 6 000 € selon le niveau de complexité. C'est un investissement unique qui vous fait gagner des heures chaque semaine ensuite." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "Un freelance DevOps senior en France coûte entre 400 et 700 €/jour. Mais le vrai indicateur n'est pas le tarif brut — c'est le **coût total de possession** comparé à l'alternative (CDI, agence IT, ou ne rien faire)." },
    { type: 'p', text: "Si vous voulez un chiffrage précis pour votre situation, [contactez-moi](/fr/contact). Je réponds sous 24h avec une estimation honnête, sans engagement." },
  ],
};

const devopsPricingEN: PostLocaleData = {
  title:       'How Much Does a Freelance DevOps Engineer Cost in France in 2025?',
  description: 'Day rates, monthly retainers, pricing factors — a complete guide to budgeting your DevOps engagement in France in 2025. Real rates, no fluff.',
  date:        '2025-01-15',
  readingTime: 7,
  tags:        ['DevOps', 'Pricing', 'Freelance', 'France'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: "**Freelance DevOps senior rates in France range from €400 to €700 per day.** That's the short answer. But this range doesn't tell you much without knowing what drives it — and whether it's the right model for your situation." },
    { type: 'p', text: "In this guide, I break down the real pricing factors, billing models, and when a freelance DevOps engineer becomes more cost-effective than a full-time hire." },
    { type: 'h2', text: 'What drives the rate' },
    { type: 'table',
      headers: ['Profile', 'Day Rate', 'Capabilities'],
      rows: [
        ['Junior (0-3 yrs)', '€250 – €350/day', 'CI/CD basics, Docker, Linux'],
        ['Mid-level (3-6 yrs)', '€350 – €500/day', 'Kubernetes, AWS, multi-environment'],
        ['Senior (6+ yrs)', '€500 – €700/day', 'Cloud architecture, IaC, Observability'],
        ['Expert / Lead (10+ yrs)', '€700 – €1,000/day', 'Governance, multi-cloud, FinOps'],
      ],
    },
    { type: 'h3', text: 'Tech stack' },
    { type: 'p', text: "Engineers with deep expertise in **Kubernetes, Terraform and AWS** consistently command higher rates than those limited to basic CI/CD pipelines. Certifications matter less than real production experience." },
    { type: 'h3', text: 'Mission duration and type' },
    { type: 'ul', items: [
      '**Short engagement (< 1 month)**: full rate, limited negotiation',
      '**Long engagement (3-6 months)**: 10-15% discount possible',
      '**Fixed-scope project**: often more cost-effective than time-and-materials if scope is clear',
    ]},
    { type: 'h2', text: 'Day rate vs monthly retainer' },
    { type: 'p', text: "For one-off projects — CI/CD setup, cloud migration, infrastructure audit — a **day rate** is standard. For ongoing maintenance, monitoring and support, a **monthly retainer of €500–€1,500** often makes more sense." },
    { type: 'callout', text: "A €800/month retainer typically covers 8-12 hours of real work — enough for most SMEs that don't need a full-time DevOps engineer." },
    { type: 'h2', text: 'Freelance vs full-time hire: the real comparison' },
    { type: 'p', text: "A senior DevOps engineer on payroll in France costs **€110,000–€170,000 fully-loaded** per year (gross salary + employer social charges ~50%). A freelance at €550/day for 150 effective days/year comes to **€82,500 excl. VAT** — no benefits, no equipment, no employer contributions." },
    { type: 'p', text: "For most SMEs and startups that don't need DevOps full-time, the conclusion is clear: the freelance model costs less and offers more flexibility." },
    { type: 'h2', text: 'Frequently asked questions' },
    { type: 'faq', q: 'Should I use a freelance platform like Malt or Upwork?', a: "Not necessarily. Platforms take 10-20% commission, which increases your cost. Working directly gives you a more transparent relationship and better negotiation. The trade-off: you need to source and vet the profile yourself." },
    { type: 'faq', q: 'Can a freelance work remotely from anywhere in France?', a: "Yes — that's the norm. I work remotely from Montpellier for clients across France (Paris, Lyon, Bordeaux, Nantes). Occasional on-site visits for clients in the Occitanie region are also possible." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "The real question isn't the day rate — it's the total cost of ownership compared to alternatives (full-time hire, IT agency, or doing nothing). For a precise estimate for your situation, [get in touch](/en/contact). I respond within 24h." },
  ],
};

const devopsPricingAR: PostLocaleData = {
  title:       'كم تكلفة مطور DevOps مستقل في فرنسا عام 2025؟',
  description: 'الأسعار اليومية، العقود الشهرية، عوامل التسعير — دليل شامل لميزنة خدمات DevOps في فرنسا 2025.',
  date:        '2025-01-15',
  readingTime: 7,
  tags:        ['DevOps', 'أسعار', 'مستقل', 'فرنسا'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: 'يتراوح السعر اليومي لمطور **DevOps مستقل** ذي خبرة عالية في فرنسا بين **400 و700 يورو في اليوم**. لكن هذا النطاق لا يعني الكثير إذا لم تعرف ما الذي يؤثر عليه.' },
    { type: 'h2', text: 'العوامل التي تؤثر على السعر' },
    { type: 'table',
      headers: ['المستوى', 'السعر اليومي', 'المهارات'],
      rows: [
        ['مبتدئ (0-3 سنوات)', '250 – 350 يورو/يوم', 'أساسيات CI/CD، Docker، Linux'],
        ['متوسط (3-6 سنوات)', '350 – 500 يورو/يوم', 'Kubernetes، AWS، بيئات متعددة'],
        ['خبير (6+ سنوات)', '500 – 700 يورو/يوم', 'هندسة السحابة، IaC، المراقبة'],
      ],
    },
    { type: 'h2', text: 'السعر اليومي مقابل العقد الشهري' },
    { type: 'p', text: 'للمشاريع قصيرة الأجل — إعداد CI/CD، الهجرة السحابية — يكون **السعر اليومي** هو النموذج المعتاد. للصيانة المستمرة، **العقد الشهري من 500 إلى 1,500 يورو** أكثر فائدة.' },
    { type: 'h2', text: 'المستقل مقابل التوظيف الدائم' },
    { type: 'p', text: 'مطور DevOps في فرنسا على كشف الرواتب يكلف **110,000 إلى 170,000 يورو سنوياً** مع الاشتراكات الاجتماعية. مستقل بـ 550 يورو/يوم لـ 150 يوم يكلف **82,500 يورو** — بدون مزايا أو تجهيزات.' },
    { type: 'h2', text: 'خاتمة' },
    { type: 'p', text: 'السؤال الحقيقي ليس السعر اليومي — بل التكلفة الإجمالية مقارنة بالبدائل. [تواصل معي](/ar/contact) للحصول على تقدير دقيق لوضعك.' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════════
   ARTICLE 2 — CI/CD pour startup sans ingénieur DevOps
   slug: cicd-startup-sans-ingenieur-devops
═══════════════════════════════════════════════════════════════════════════════ */

const cicdStartupFR: PostLocaleData = {
  title:       'CI/CD pour startup : par où commencer sans ingénieur DevOps ?',
  description: 'Guide pratique pas-à-pas : pipeline CI/CD avec GitHub Actions et Docker sans ingénieur DevOps dédié. Exemples de code réels pour startups en France.',
  date:        '2025-01-22',
  readingTime: 9,
  tags:        ['CI/CD', 'DevOps', 'GitHub Actions', 'Docker', 'Startup'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: "Mettre en place un pipeline CI/CD quand on est CTO solo ou fondateur technique, ça fait peur. Entre les tutoriels qui supposent une infra déjà en place, les configs YAML incompréhensibles et les dizaines d'outils qui se concurrencent, on comprend vite pourquoi la plupart des startups françaises déploient encore à la main." },
    { type: 'p', text: "Pourtant, dans ma pratique d'accompagnement de startups en France — de Paris à Bordeaux en passant par Montpellier — la mise en place d'un pipeline minimal prend rarement plus d'une journée. Et le gain en sérénité est immédiat." },
    { type: 'p', text: "Cet article est un guide pratique. Pas de théorie inutile : des étapes concrètes, du code qui fonctionne, et les erreurs à éviter." },
    { type: 'h2', text: 'Pourquoi le CI/CD fait peur (et à tort)' },
    { type: 'p', text: "CI/CD signifie **Continuous Integration / Continuous Delivery**. Derrière ces termes, l'idée est simple : chaque fois que vous poussez du code, il est automatiquement testé puis déployé. C'est tout." },
    { type: 'p', text: "Sans CI/CD, le déploiement est manuel. Vous vous connectez au serveur, vous tirez le code, vous redémarrez le service, vous croisez les doigts. Ce process prend du temps, génère des erreurs, et décourage les déploiements fréquents — ce qui crée des releases massives et risquées." },
    { type: 'callout', text: "Avec un pipeline CI/CD en place, déployer devient aussi banal qu'un `git push`. Vous le faites 10 fois par jour sans y penser." },
    { type: 'h2', text: 'Les 3 briques minimales' },
    { type: 'p', text: "Pas besoin de Kubernetes pour commencer. Voici les 3 outils qui couvrent 90 % des besoins d'une startup early-stage." },
    { type: 'h3', text: 'Brique 1 : GitHub Actions' },
    { type: 'p', text: "**GitHub Actions** est le moteur qui déclenche votre pipeline. À chaque push sur `main`, il lance une séquence d'étapes : tests, build, déploiement. Gratuit jusqu'à 2 000 minutes/mois, il s'intègre nativement avec votre dépôt — pas de compte supplémentaire." },
    { type: 'h3', text: 'Brique 2 : Docker' },
    { type: 'p', text: "**Docker** empaquette votre application avec toutes ses dépendances dans une image portable. L'image tourne de la même façon sur votre machine, en CI, et en production. Terminé les *\"ça marchait chez moi\"*." },
    { type: 'h3', text: 'Brique 3 : Un hébergeur compatible' },
    { type: 'p', text: "Pour commencer, un VPS simple suffit : **DigitalOcean**, **OVHcloud**, **Scaleway** (solution française) ou **Hetzner**. Comptez 6 à 20 €/mois. Si vous êtes déjà sur AWS, ECS ou App Runner s'intègrent parfaitement." },
    { type: 'h2', text: 'Exemple concret : un pipeline en 50 lignes' },
    { type: 'p', text: "Voici un pipeline réel que j'utilise pour des startups. Volontairement minimal et fonctionnel." },
    { type: 'h3', text: 'Le Dockerfile (Next.js, multi-stage)' },
    { type: 'code', lang: 'dockerfile', code: `# Étape 1 : dépendances
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Étape 2 : build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Étape 3 : image de production (minimale)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]` },
    { type: 'h3', text: 'Le pipeline GitHub Actions' },
    { type: 'code', lang: 'yaml', code: `# .github/workflows/deploy.yml
name: CI/CD

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  test:
    name: Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test

  deploy:
    name: Deploy
    needs: test          # deploy seulement si les tests passent
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest

      - name: Deploy on VPS
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            docker pull ghcr.io/\${{ github.repository }}:latest
            docker stop app 2>/dev/null || true
            docker rm   app 2>/dev/null || true
            docker run -d \\
              --name app \\
              --restart unless-stopped \\
              -p 3000:3000 \\
              --env-file /home/deploy/.env \\
              ghcr.io/\${{ github.repository }}:latest
            sleep 5
            curl -sf http://localhost:3000/api/health` },
    { type: 'p', text: "Ce pipeline fait 3 choses en séquence :" },
    { type: 'ol', items: [
      'Lance les tests — si ça échoue, tout s\'arrête ici',
      'Build l\'image Docker et la pousse sur GitHub Container Registry (gratuit)',
      'Se connecte en SSH au VPS, tire la nouvelle image et redémarre le conteneur',
    ]},
    { type: 'p', text: "Les secrets (`VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`) se configurent dans **Settings → Secrets and variables → Actions** de votre dépôt GitHub. Le `GITHUB_TOKEN` est injecté automatiquement." },
    { type: 'h2', text: 'Les erreurs classiques à éviter' },
    { type: 'h3', text: '1. Déployer en production sans staging' },
    { type: 'p', text: "Le pipeline ci-dessus déploie directement en production. C'est acceptable pour un MVP, mais dès que vous avez des utilisateurs réels, ajoutez un environnement de staging :" },
    { type: 'ul', items: [
      'Branch `main` → déploiement automatique sur **staging**',
      'Tag `v1.2.3` → déploiement **manuel** (ou automatique) en production',
    ]},
    { type: 'h3', text: '2. Ne pas avoir de healthcheck' },
    { type: 'p', text: "Un pipeline qui déploie sans vérifier que l'application répond, c'est inutile. Ajoutez un endpoint `GET /api/health` dans votre app, et vérifiez-le après chaque déploiement (déjà inclus dans le script ci-dessus via `curl -sf ...`)." },
    { type: 'h3', text: '3. Mettre des secrets dans le code' },
    { type: 'p', text: "Ne committez jamais de clés API, mots de passe ou tokens. Utilisez les secrets GitHub pour le CI, et un fichier `.env` sur le serveur pour le runtime. Pour des besoins plus avancés : **AWS Secrets Manager**, **Doppler** ou **HashiCorp Vault**." },
    { type: 'h3', text: '4. Ignorer les logs après le déploiement' },
    { type: 'p', text: "Ajoutez au minimum **Sentry** (gratuit jusqu'à 5 000 events/mois) pour capturer les erreurs de production. Sans visibilité post-déploiement, vous découvrirez les bugs quand vos utilisateurs se plaindront — pas avant." },
    { type: 'h2', text: 'Quand faire appel à un freelance DevOps ?' },
    { type: 'p', text: "Ce pipeline minimal couvre les besoins d'un MVP. Mais certaines situations justifient l'intervention d'un [freelance DevOps](/fr/services) :" },
    { type: 'ul', items: [
      '**Votre trafic grandit** et le VPS ne suffit plus — migration Kubernetes ou ECS avec auto-scaling',
      '**Plusieurs environnements** (dev, staging, prod) et la gestion devient chronophage',
      '**Exigences de conformité** — ISO 27001, SOC 2, RGPD strict',
      '**Votre équipe perd du temps** sur les déploiements au lieu de builder le produit',
    ]},
    { type: 'p', text: "J'accompagne des startups basées à Paris, Lyon, Montpellier et en remote dans toute la France. Une session de diagnostic de 30 minutes — gratuite — suffit souvent pour identifier les points de blocage." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "Le CI/CD n'est pas l'apanage des grandes équipes. Avec GitHub Actions, Docker et un VPS à 10 €/mois, vous pouvez avoir un pipeline fonctionnel en quelques heures. Commencez simple — tests, build, deploy — et ajoutez la complexité au fur et à mesure que votre produit grandit." },
    { type: 'p', text: "Et si votre situation est plus complexe ou que vous voulez aller plus vite : [parlons-en](/fr/contact)." },
    { type: 'p', text: "**Voir aussi :** [Combien coûte un freelance DevOps en France en 2025 ?](/fr/blog/combien-coute-freelance-devops-france-2025)" },
  ],
};

const cicdStartupEN: PostLocaleData = {
  title:       'CI/CD for Startups: Where to Start Without a DevOps Engineer',
  description: 'Step-by-step guide: set up a CI/CD pipeline with GitHub Actions and Docker without a dedicated DevOps engineer. Real code examples for startups.',
  date:        '2025-01-22',
  readingTime: 9,
  tags:        ['CI/CD', 'DevOps', 'GitHub Actions', 'Docker', 'Startup'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: "Setting up CI/CD as a solo technical founder or CTO is intimidating. Tutorials assume infrastructure already exists, YAML configs look cryptic, and dozens of tools compete for your attention. No wonder most startups still deploy manually." },
    { type: 'p', text: "Yet in my work with startups across France — from Paris to Bordeaux to Montpellier — I've seen that a working pipeline rarely takes more than a day to set up. The peace of mind is immediate." },
    { type: 'callout', text: "With CI/CD in place, deploying becomes as routine as a `git push`. You do it 10 times a day without thinking about it." },
    { type: 'h2', text: 'The 3 minimum components' },
    { type: 'h3', text: 'Component 1: GitHub Actions' },
    { type: 'p', text: "**GitHub Actions** is the automation engine. On every push to `main`, it triggers your pipeline: tests, build, deploy. Free up to 2,000 minutes/month, integrated natively with your repo." },
    { type: 'h3', text: 'Component 2: Docker' },
    { type: 'p', text: "**Docker** packages your app with all its dependencies into a portable image. It runs identically on your machine, in CI, and in production. No more *\"it works on my machine\"*." },
    { type: 'h3', text: 'Component 3: A compatible host' },
    { type: 'p', text: "A simple VPS is enough to start: **DigitalOcean**, **Hetzner**, or **Scaleway** (French provider). Budget €6–€20/month. Already on AWS? ECS or App Runner integrate seamlessly." },
    { type: 'h2', text: 'Concrete example: a pipeline in 50 lines' },
    { type: 'code', lang: 'dockerfile', code: `# Stage 1: dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: production image (minimal)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]` },
    { type: 'code', lang: 'yaml', code: `# .github/workflows/deploy.yml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    permissions: { contents: read, packages: write }
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest
      - uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            docker pull ghcr.io/\${{ github.repository }}:latest
            docker stop app 2>/dev/null || true
            docker rm   app 2>/dev/null || true
            docker run -d --name app --restart unless-stopped \\
              -p 3000:3000 --env-file /home/deploy/.env \\
              ghcr.io/\${{ github.repository }}:latest
            sleep 5 && curl -sf http://localhost:3000/api/health` },
    { type: 'h2', text: 'Classic mistakes to avoid' },
    { type: 'ul', items: [
      '**No staging environment** — deploy to staging first, production on tags',
      '**Skipping tests** — if tests fail, the deployment should never run',
      '**Secrets in code** — use GitHub Secrets for CI, `.env` files on the server',
      '**No observability** — add Sentry (free tier) before your first real users',
    ]},
    { type: 'h2', text: 'When to call a freelance DevOps engineer' },
    { type: 'p', text: "This minimal setup covers MVP needs. Escalate to a [freelance DevOps](/en/services) when: traffic outgrows a single VPS, you need Kubernetes or ECS with auto-scaling, compliance requirements apply (SOC 2, ISO 27001), or the team is spending more time on deployments than on the product." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "CI/CD isn't just for big engineering teams. GitHub Actions + Docker + a €10/month VPS gets you a working pipeline in hours. Start simple, evolve as your product grows. Questions? [Let's talk](/en/contact)." },
  ],
};

const cicdStartupAR: PostLocaleData = {
  title:       'CI/CD للشركات الناشئة: من أين تبدأ بدون مهندس DevOps؟',
  description: 'دليل عملي خطوة بخطوة: إعداد خط أنابيب CI/CD باستخدام GitHub Actions وDocker بدون مهندس DevOps مخصص.',
  date:        '2025-01-22',
  readingTime: 9,
  tags:        ['CI/CD', 'DevOps', 'GitHub Actions', 'Docker'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: 'إعداد خط أنابيب CI/CD بدون فريق DevOps مخصص أمر مخيف في البداية. لكن في تجربتي مع الشركات الناشئة في فرنسا، نادراً ما يستغرق الإعداد الأساسي أكثر من يوم واحد.' },
    { type: 'callout', text: 'مع CI/CD، يصبح النشر روتينياً مثل `git push`. تفعله 10 مرات يومياً دون أن تفكر.' },
    { type: 'h2', text: 'المكونات الثلاثة الأساسية' },
    { type: 'ul', items: [
      '**GitHub Actions** — محرك الأتمتة، مجاني حتى 2,000 دقيقة شهرياً',
      '**Docker** — يحزم التطبيق مع كل متطلباته في صورة قابلة للنشر',
      '**VPS بسيط** — DigitalOcean أو Hetzner بـ 6-20 يورو شهرياً',
    ]},
    { type: 'h2', text: 'مثال عملي: خط أنابيب كامل في 50 سطراً' },
    { type: 'code', lang: 'yaml', code: `name: CI/CD
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest
      - uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.VPS_HOST }}
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            docker pull ghcr.io/\${{ github.repository }}:latest
            docker stop app || true && docker rm app || true
            docker run -d --name app -p 3000:3000 \\
              ghcr.io/\${{ github.repository }}:latest` },
    { type: 'h2', text: 'الأخطاء الشائعة' },
    { type: 'ul', items: [
      'النشر مباشرة في الإنتاج بدون بيئة staging',
      'عدم تشغيل الاختبارات قبل النشر',
      'وضع المفاتيح السرية في الكود',
    ]},
    { type: 'h2', text: 'خاتمة' },
    { type: 'p', text: 'CI/CD ليس حكراً على الفرق الكبيرة. GitHub Actions + Docker + VPS بسيط يمنحك خط أنابيب يعمل في ساعات. [تواصل معي](/ar/contact) إذا كنت بحاجة لمساعدة.' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════════
   ARTICLE 3 — Pourquoi votre site WordPress ralentit vos ventes
   slug: pourquoi-site-wordpress-ralentit-ventes
═══════════════════════════════════════════════════════════════════════════════ */

const wordpressFR: PostLocaleData = {
  title:       'Pourquoi votre site WordPress ralentit vos ventes',
  description: 'Temps de chargement, plugins accumulés, hébergement mutualisé — pourquoi WordPress ralentit et ce que ça coûte réellement à votre business en France.',
  date:        '2025-02-05',
  readingTime: 6,
  tags:        ['WordPress', 'Performance', 'Site web', 'SEO'],
  category:    'Web',
  blocks: [
    { type: 'p', text: "**53 % des visiteurs mobiles abandonnent un site qui met plus de 3 secondes à charger.** Pour chaque seconde de délai supplémentaire, le taux de conversion chute de 7 %. Ce ne sont pas des chiffres inventés — ils viennent d'études Google et Deloitte sur des millions de sessions réelles." },
    { type: 'p', text: "Si votre site tourne sous WordPress et que vous ressentez que vos résultats ne sont pas à la hauteur de votre trafic, la performance est souvent le premier coupable. Voici pourquoi — et que faire." },
    { type: 'h2', text: 'Pourquoi WordPress devient lent avec le temps' },
    { type: 'p', text: "WordPress est né en 2003. Il a été conçu pour générer des pages HTML à la volée à partir d'une base de données, à chaque requête. En 2025, cette architecture montre ses limites." },
    { type: 'h3', text: "L'accumulation de plugins" },
    { type: 'p', text: "Un site WordPress moyen utilise **23 plugins**. Chacun ajoute des requêtes JavaScript, des feuilles CSS et des appels base de données. Un plugin de formulaire de contact, un plugin SEO, un plugin de cache, un plugin de sécurité, un plugin de gallery... La performance se dégrade à chaque ajout." },
    { type: 'h3', text: "L'hébergement mutualisé" },
    { type: 'p', text: "La majorité des sites WordPress en France sont hébergés sur des serveurs mutualisés à 3-5 €/mois. Ces serveurs partagent les ressources (CPU, RAM, disque) entre des dizaines ou centaines de sites. Quand votre voisin a un pic de trafic, votre site ralentit. Ce n'est pas un bug — c'est le modèle." },
    { type: 'h3', text: "La base de données non optimisée" },
    { type: 'p', text: "Au fil du temps, la base de données WordPress s'alourdit : révisions d'articles, spams en attente, logs de plugins, données orphelines. Sans maintenance régulière, chaque requête devient plus lente." },
    { type: 'callout', text: "J'ai audité des sites WordPress en France avec des scores Google PageSpeed inférieurs à 30/100. Le même contenu, migré sur Next.js avec hébergement moderne, atteignait 95+/100 en quelques jours." },
    { type: 'h2', text: 'Ce que ça vous coûte vraiment' },
    { type: 'h3', text: 'SEO et visibilité Google' },
    { type: 'p', text: "Depuis 2021, **Core Web Vitals** est un facteur de classement officiel pour Google. Un site lent est pénalisé dans les résultats de recherche. Si vous investissez dans le contenu SEO, un mauvais score de performance annule une partie de cet effort." },
    { type: 'h3', text: 'Taux de conversion' },
    { type: 'p', text: "L'impact sur les ventes est direct et mesurable. Une boutique en ligne qui passe de 5s à 2s de temps de chargement peut voir son taux de conversion augmenter de **20 à 30 %** — sans changer une ligne de texte ou de design." },
    { type: 'h3', text: 'Coût de maintenance' },
    { type: 'p', text: "Un site WordPress non maintenu accumule les vulnérabilités. Les mises à jour de plugins cassent parfois le site. La maintenance devient un travail à part entière — ou une source de mauvaises surprises." },
    { type: 'h2', text: 'Les alternatives modernes' },
    { type: 'p', text: "Si vous partez de zéro ou que vous avez décidé de migrer, voici les alternatives qui offrent de meilleures performances :" },
    { type: 'table',
      headers: ['Solution', 'Usage idéal', 'Performance', 'Complexité technique'],
      rows: [
        ['Next.js', 'Site vitrine, SaaS, e-commerce', '⭐⭐⭐⭐⭐', 'Développeur requis'],
        ['Astro', 'Blog, site contenu statique', '⭐⭐⭐⭐⭐', 'Développeur requis'],
        ['Framer', 'Site marketing / landing page', '⭐⭐⭐⭐', 'No-code possible'],
        ['WordPress (bien configuré)', 'Blog, site simple', '⭐⭐⭐', 'Accessible'],
      ],
    },
    { type: 'p', text: "**Next.js** est ma recommandation pour la plupart des projets professionnels. Les pages sont pré-générées statiquement — elles chargent depuis un CDN en quelques dizaines de millisecondes, partout dans le monde. Le SEO est natif, le score PageSpeed dépasse systématiquement 90/100." },
    { type: 'h2', text: 'Comment migrer sans tout casser' },
    { type: 'ol', items: [
      '**Audit de l\'existant** — identifiez les pages qui génèrent du trafic (Google Search Console) et les fonctionnalités indispensables',
      '**Recette de migration** — reproduisez le contenu important, redirigez les anciennes URLs (301) pour ne pas perdre le SEO accumulé',
      '**Mise en ligne progressive** — testez en staging, mesurez les Core Web Vitals, activez en production',
      '**Monitoring post-migration** — vérifiez que les redirections fonctionnent, surveillez le trafic organique pendant 30 jours',
    ]},
    { type: 'p', text: "J'accompagne des PME et indépendants en France dans ces migrations. Souvent, la migration d'un site vitrine simple prend **2 à 3 semaines**, avec un résultat visuellement plus propre et techniquement bien meilleur." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "Un site WordPress lent n'est pas une fatalité — c'est un choix, souvent fait par défaut. Si votre site a plus de 3 ans et que vous n'avez pas investi dans sa performance, vous perdez probablement des clients chaque jour." },
    { type: 'p', text: "Vous voulez savoir où en est votre site ? [Contactez-moi](/fr/contact) pour un audit rapide. Je peux vous dire en 30 minutes ce qui se passe et ce que ça vaut la peine de corriger." },
    { type: 'p', text: "**Voir aussi :** [Freelance DevOps vs agence IT : ce que personne ne vous dit](/fr/blog/freelance-devops-vs-agence-it)" },
    { type: 'p', text: "**Créer un nouveau site ?** Découvrez mon offre de [création de site web en France](/fr/creation-site-france)." },
  ],
};

const wordpressEN: PostLocaleData = {
  title:       'Why Your WordPress Site Is Hurting Your Sales',
  description: 'Page load times, plugin bloat, shared hosting — why WordPress slows down over time and what it really costs your business in lost conversions.',
  date:        '2025-02-05',
  readingTime: 6,
  tags:        ['WordPress', 'Performance', 'Web', 'SEO'],
  category:    'Web',
  blocks: [
    { type: 'p', text: "**53% of mobile visitors abandon a site that takes more than 3 seconds to load.** Every additional second of delay costs 7% in conversions. These are Google and Deloitte figures from millions of real sessions — not estimates." },
    { type: 'p', text: "If your site runs on WordPress and your results don't match your traffic, performance is usually the first culprit. Here's why — and what to do." },
    { type: 'h2', text: 'Why WordPress slows down over time' },
    { type: 'h3', text: 'Plugin accumulation' },
    { type: 'p', text: "The average WordPress site uses **23 plugins**. Each adds JavaScript requests, CSS sheets, and database calls. A contact form plugin, an SEO plugin, a cache plugin, a security plugin — performance degrades with every addition." },
    { type: 'h3', text: 'Shared hosting' },
    { type: 'p', text: "Most WordPress sites are on shared servers at €3–€5/month. These servers share CPU, RAM and disk between hundreds of sites. When a neighbor gets a traffic spike, your site slows down. That's not a bug — it's the model." },
    { type: 'callout', text: "I've audited WordPress sites in France scoring below 30/100 on Google PageSpeed. The same content, migrated to Next.js with modern hosting, reached 95+/100 within days." },
    { type: 'h2', text: 'The real business cost' },
    { type: 'ul', items: [
      '**SEO rankings** — Core Web Vitals is an official Google ranking factor since 2021',
      '**Conversions** — moving from 5s to 2s load time can improve conversions by 20–30%',
      '**Maintenance** — outdated plugins accumulate vulnerabilities and break on updates',
    ]},
    { type: 'h2', text: 'Modern alternatives' },
    { type: 'p', text: "**Next.js** is my recommendation for most professional projects. Pages are pre-generated statically, served from a CDN in milliseconds. Native SEO, PageSpeed consistently above 90/100." },
    { type: 'h2', text: 'How to migrate without breaking everything' },
    { type: 'ol', items: [
      '**Audit the existing site** — identify high-traffic pages and essential features',
      '**Plan redirects** — preserve accumulated SEO with 301 redirects from old URLs',
      '**Staged rollout** — test on staging, measure Core Web Vitals, go live',
      '**Post-migration monitoring** — track organic traffic for 30 days',
    ]},
    { type: 'p', text: "I help SMEs and freelancers in France with these migrations. A typical showcase site migration takes **2 to 3 weeks**, resulting in a cleaner design and dramatically better performance." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "A slow WordPress site isn't inevitable — it's a choice, usually made by default. If your site is over 3 years old and you haven't invested in performance, you're likely losing customers every day. [Get a quick audit](/en/contact) — 30 minutes to know what's happening and what's worth fixing." },
    { type: 'p', text: "**Looking to build a new site?** Discover my [professional website creation service](/en/creation-site-france)." },
  ],
};

const wordpressAR: PostLocaleData = {
  title:       'لماذا موقعك على WordPress يُبطئ مبيعاتك؟',
  description: 'أوقات التحميل، الإضافات المتراكمة، الاستضافة المشتركة — لماذا يتباطأ WordPress مع الوقت وما تكلفته الحقيقية على عملك.',
  date:        '2025-02-05',
  readingTime: 6,
  tags:        ['WordPress', 'أداء', 'موقع ويب', 'SEO'],
  category:    'Web',
  blocks: [
    { type: 'p', text: '**53% من الزوار عبر الهاتف المحمول يتركون الموقع الذي يستغرق أكثر من 3 ثوانٍ للتحميل.** كل ثانية تأخير إضافية تُكلّف 7% من معدل التحويل. هذه أرقام من دراسات Google وDeloitte على ملايين الجلسات.' },
    { type: 'h2', text: 'لماذا يتباطأ WordPress مع الوقت؟' },
    { type: 'ul', items: [
      '**تراكم الإضافات** — متوسط موقع WordPress يستخدم 23 إضافة، كل منها يضيف طلبات إضافية',
      '**الاستضافة المشتركة** — موارد مشتركة بين مئات المواقع، أي ضغط على موقع جار يبطئك',
      '**قاعدة بيانات غير محسّنة** — مسودات قديمة، بيانات يتيمة، سجلات الإضافات',
    ]},
    { type: 'h2', text: 'التكلفة الحقيقية' },
    { type: 'p', text: 'موقع بطيء = تصنيف أدنى في Google + معدل تحويل أضعف + صيانة مستمرة مكلفة.' },
    { type: 'h2', text: 'البدائل الحديثة' },
    { type: 'p', text: '**Next.js** هو توصيتي لمعظم المشاريع المهنية. الصفحات مُولَّدة مسبقاً وتُخدَّم من CDN في أجزاء من الثانية. نتيجة PageSpeed تتجاوز 90/100 باستمرار.' },
    { type: 'h2', text: 'خاتمة' },
    { type: 'p', text: 'موقع WordPress بطيء ليس حتمياً — إنه خيار. [تواصل معي](/ar/contact) لتدقيق سريع في 30 دقيقة.' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════════
   ARTICLE 4 — Freelance DevOps vs agence IT
   slug: freelance-devops-vs-agence-it
═══════════════════════════════════════════════════════════════════════════════ */

const freelanceVsAgencyFR: PostLocaleData = {
  title:       'Freelance DevOps vs agence IT : ce que personne ne vous dit',
  description: 'Comparatif honnête : coûts réels, délais, engagement, expertise. Pour PME et startups françaises qui externalisent leur DevOps ou infrastructure cloud.',
  date:        '2025-02-18',
  readingTime: 8,
  tags:        ['DevOps', 'Freelance', 'Agence', 'Comparatif', 'France'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: "La vraie question n'est pas \"freelance DevOps ou agence IT ?\" — c'est **\"pour ma situation spécifique, quelle option a le plus de sens ?\"** Ce sont deux modèles très différents, qui répondent à des besoins très différents." },
    { type: 'p', text: "J'ai travaillé dans des agences avant de passer en freelance. Je connais les deux côtés. Cet article ne cherche pas à vendre ma propre offre — il essaie de vous donner les vrais critères de décision." },
    { type: 'h2', text: 'Tableau comparatif' },
    { type: 'table',
      headers: ['Critère', 'Freelance DevOps', 'Agence IT / ESN'],
      rows: [
        ['Coût moyen', '400–700 €/j (TJM)', '150–400 k€/an (forfait ou régie)'],
        ['Délai de démarrage', '1 à 5 jours', '2 à 8 semaines'],
        ['Interlocuteur', '1 expert direct', 'Chef de projet + équipe variable'],
        ["Niveau d'expertise", 'Senior direct, connu à l\'avance', 'Variable selon qui est affecté'],
        ['Engagement minimum', 'Aucun (mission à la carte)', '3 à 12 mois souvent'],
        ['Disponibilité', 'Heures contractuelles', 'SLA négocié'],
        ['Connaissance du code', 'Immersion rapide et directe', 'Dépend du turnover de l\'équipe'],
        ['Idéal pour', 'PME, startups, projets définis', 'Grands comptes, équipes internes larges'],
      ],
    },
    { type: 'h2', text: 'Quand choisir une agence IT ?' },
    { type: 'p', text: "L'agence a du sens dans des situations précises :" },
    { type: 'ul', items: [
      "**Vous avez besoin d'une équipe entière** — développeurs, DevOps, testeurs, PM — mobilisable rapidement",
      "**Votre projet est très long et massif** — plusieurs centaines de jours de travail sur 12-24 mois",
      "**Vous avez des contraintes contractuelles** — certifications ISO, agréments sectoriels (banque, santé) que seule une entité juridique peut garantir",
      "**Vous voulez déléguer la gestion RH** — le risque de disponibilité repose sur l'agence, pas sur vous",
    ]},
    { type: 'h2', text: 'Quand choisir un freelance DevOps ?' },
    { type: 'p', text: "Le freelance est clairement supérieur dans ces situations :" },
    { type: 'ul', items: [
      "**Périmètre défini** — mise en place CI/CD, migration cloud, audit infra : vous savez ce que vous voulez, vous avez besoin d'exécution rapide",
      "**Budget maîtrisé** — pas de marge agence (30-50 % du TJM réel du consultant), vous payez l'expert directement",
      "**Besoin de réactivité** — un freelance senior peut démarrer en 48h, une agence prend souvent 4-6 semaines de contractualisation",
      "**Expertise pointue** — si vous avez besoin d'un expert Kubernetes/AWS, le freelance est presque toujours plus qualifié que le profil \"DevOps\" affecté par une agence",
      "**Relation de confiance** — vous interagissez toujours avec la même personne, qui connaît votre stack dans le détail",
    ]},
    { type: 'h2', text: 'Les pièges de chaque option' },
    { type: 'h3', text: 'Pièges côté freelance' },
    { type: 'ul', items: [
      "**Disponibilité** — un bon freelance est souvent booké 4-8 semaines à l'avance. Si vous êtes pressé, anticipez",
      "**Risque d'indisponibilité** — maladie, vacances, autre mission qui s'étire : pas d'équipe de remplacement garantie",
      "**Scope creep** — sans contrat clair, les missions peuvent dériver. Exigez un cadrage écrit du périmètre",
    ]},
    { type: 'h3', text: 'Pièges côté agence' },
    { type: 'ul', items: [
      "**L'effet \"bait and switch\"** — vous achetez sur la réputation du senior qui vous a vendu la mission, mais c'est un junior qui la réalise",
      "**Les coûts cachés** — réunions de suivi, rapports, coordination interne : vous payez du temps qui n'est pas directement sur votre projet",
      "**Le lock-in** — certaines agences utilisent des outils propriétaires ou des pratiques qui compliquent la sortie",
      "**Turnover** — la personne qui connaissait votre projet part, et vous recommencez le transfert de connaissance",
    ]},
    { type: 'callout', text: "La meilleure protection côté agence : exigez de rencontrer les personnes qui travailleront réellement sur votre projet — pas celles qui font la démonstration commerciale." },
    { type: 'h2', text: 'Mon point de vue honnête' },
    { type: 'p', text: "Pour une **PME ou startup en France** avec des besoins DevOps définis (pipeline CI/CD, migration AWS, containerisation), le freelance est presque toujours l'option la plus rapide, la moins chère, et la plus qualifiée. L'agence n'est pas la bonne réponse si vous n'avez pas besoin d'une équipe entière." },
    { type: 'p', text: "Pour un **grand compte** avec des besoins qui évoluent, des contraintes RH et des projets sur 2+ ans, une ESN bien choisie peut apporter une stabilité contractuelle que le freelance ne peut pas garantir." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "Posez-vous ces 3 questions : Ai-je besoin d'une équipe ou d'un expert ? Mon périmètre est-il défini ou ouvert ? Mon budget est-il serré ou confortable ? Les réponses vous indiqueront la direction." },
    { type: 'p', text: "Si vous vous retrouvez dans la colonne \"freelance\", [parlons de votre projet](/fr/contact). J'accompagne des startups et PME en France depuis Montpellier, en remote ou sur site en Occitanie." },
    { type: 'p', text: "**Voir aussi :** [CI/CD pour startup : par où commencer ?](/fr/blog/cicd-startup-sans-ingenieur-devops)" },
  ],
};

const freelanceVsAgencyEN: PostLocaleData = {
  title:       'Freelance DevOps vs IT Agency: What Nobody Tells You',
  description: 'Honest comparison: real costs, timelines, commitment, expertise. For French SMEs and startups outsourcing their DevOps or cloud infrastructure.',
  date:        '2025-02-18',
  readingTime: 8,
  tags:        ['DevOps', 'Freelance', 'IT Agency', 'Comparison', 'France'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: "The real question isn't *\"freelance DevOps or IT agency?\"* — it's **\"for my specific situation, which option makes more sense?\"** These are two very different models that solve very different problems." },
    { type: 'p', text: "I've worked inside agencies before going freelance. I know both sides. This article isn't a sales pitch for my own services — it's an honest framework to help you decide." },
    { type: 'h2', text: 'Side-by-side comparison' },
    { type: 'table',
      headers: ['Criterion', 'Freelance DevOps', 'IT Agency / ESN'],
      rows: [
        ['Average cost', '€400–700/day', '€150k–400k/year (retainer or T&M)'],
        ['Time to start', '1 to 5 days', '2 to 8 weeks'],
        ['Point of contact', '1 direct expert', 'Project manager + rotating team'],
        ['Expertise level', 'Senior, known upfront', 'Varies by who gets assigned'],
        ['Minimum commitment', 'None (project basis)', '3–12 months typically'],
        ['Availability', 'Contracted hours', 'Negotiated SLA'],
        ['Code ownership', 'Deep, direct knowledge', 'Depends on team turnover'],
        ['Best for', 'SMEs, startups, scoped projects', 'Enterprises, large internal teams'],
      ],
    },
    { type: 'h2', text: 'When to choose an IT agency' },
    { type: 'ul', items: [
      "**You need an entire team** — developers, DevOps, testers, PM — mobilisable quickly",
      "**Your project is very large** — hundreds of person-days over 12–24 months",
      "**You have contractual constraints** — ISO certifications, sector-specific approvals (banking, health)",
    ]},
    { type: 'h2', text: 'When to choose a freelance DevOps' },
    { type: 'ul', items: [
      "**Defined scope** — CI/CD setup, cloud migration, infrastructure audit: you know what you need",
      "**Budget control** — no agency margin (30–50% on top of the consultant's actual rate)",
      "**Speed** — a senior freelance can start in 48h; agencies take 4–6 weeks to contract",
      "**Specialist expertise** — for Kubernetes/AWS depth, the freelance almost always outperforms the \"DevOps\" profile assigned by an agency",
    ]},
    { type: 'h2', text: 'Traps on each side' },
    { type: 'h3', text: 'Freelance risks' },
    { type: 'ul', items: [
      "**Availability** — good freelancers are often booked 4–8 weeks out. Plan ahead.",
      "**No backup** — no guaranteed replacement for illness or emergencies",
      "**Scope creep** — without a clear written brief, missions can drift",
    ]},
    { type: 'h3', text: 'Agency risks' },
    { type: 'ul', items: [
      "**Bait and switch** — senior sells the deal, junior delivers the work",
      "**Hidden costs** — status meetings, reports, internal coordination: you pay for time not on your project",
      "**Lock-in** — proprietary tools or practices that make switching hard",
    ]},
    { type: 'callout', text: "Best protection on the agency side: insist on meeting the actual people who will work on your project — not just the sales team." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "For an **SME or startup** with defined DevOps needs, a senior freelance is almost always faster, cheaper, and more qualified than what an agency will assign you. For **large enterprises** with evolving needs over 2+ years, an agency can provide contractual stability a freelance can't." },
    { type: 'p', text: "Questions? [Let's discuss your project](/en/contact). I work with startups and SMEs across France." },
    { type: 'p', text: "**See also:** [CI/CD for Startups: Where to Start](/en/blog/cicd-startup-sans-ingenieur-devops)" },
  ],
};

const freelanceVsAgencyAR: PostLocaleData = {
  title:       'مستقل DevOps مقابل شركة IT: ما لا يخبرك به أحد',
  description: 'مقارنة صادقة: التكاليف الحقيقية، المواعيد، الالتزام، الخبرة. للشركات الصغيرة والناشئة في فرنسا.',
  date:        '2025-02-18',
  readingTime: 8,
  tags:        ['DevOps', 'مستقل', 'شركة IT', 'مقارنة'],
  category:    'DevOps',
  blocks: [
    { type: 'p', text: 'السؤال الحقيقي ليس "مستقل أم شركة؟" — بل **"لوضعي المحدد، أي الخيارين أمثل؟"** النموذجان مختلفان تماماً ويحلان مشكلات مختلفة.' },
    { type: 'h2', text: 'مقارنة مباشرة' },
    { type: 'table',
      headers: ['المعيار', 'مستقل DevOps', 'شركة IT'],
      rows: [
        ['التكلفة', '400–700 يورو/يوم', '150,000–400,000 يورو/سنة'],
        ['وقت البدء', '1 إلى 5 أيام', '2 إلى 8 أسابيع'],
        ['نقطة التواصل', 'خبير مباشر واحد', 'مدير مشروع + فريق متغير'],
        ['الالتزام الأدنى', 'لا يوجد', '3 إلى 12 شهراً'],
        ['الأنسب لـ', 'الشركات الناشئة، PME', 'الشركات الكبرى'],
      ],
    },
    { type: 'h2', text: 'متى تختار المستقل؟' },
    { type: 'ul', items: [
      '**نطاق محدد** — إعداد CI/CD، هجرة سحابية، تدقيق البنية التحتية',
      '**ميزانية محكومة** — بدون هامش الشركة (30-50% فوق السعر الحقيقي للمستشار)',
      '**سرعة البدء** — يمكن للمستقل البدء خلال 48 ساعة',
    ]},
    { type: 'h2', text: 'خاتمة' },
    { type: 'p', text: 'للشركات الناشئة والـ PME ذات الاحتياجات المحددة، المستقل الخبير غالباً أسرع وأرخص وأكثر تأهيلاً. [تواصل معي](/ar/contact) لمناقشة وضعك.' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════════
   ARTICLE 5 — Prix site web professionnel 2025
   slug: creation-site-web-professionnel-2025-inclus
═══════════════════════════════════════════════════════════════════════════════ */

const websitePricingFR: PostLocaleData = {
  title:       'Créer un site web pro en 2025 : ce qui est vraiment inclus dans le prix',
  description: 'Ce qui compose le prix d\'un site web en 2025 : design, dev, hébergement, SEO, maintenance. Fourchettes réalistes pour la France, sans détour.',
  date:        '2025-03-01',
  readingTime: 7,
  tags:        ['Site web', 'Tarifs', 'Création web', 'France', 'Prix'],
  category:    'Web',
  blocks: [
    { type: 'p', text: "Pourquoi un site web coûte-t-il 500 € chez certains et 50 000 € chez d'autres ? La question est légitime — et la réponse est plus simple qu'elle n'y paraît. Ce qui varie, c'est rarement le \"site\" lui-même, mais tout ce qui l'entoure." },
    { type: 'p', text: "Dans cet article, je détaille de manière transparente ce qui compose un devis web en 2025, ce qui est souvent absent des devis, et des fourchettes de prix réalistes en France." },
    { type: 'h2', text: 'Ce qui compose vraiment le prix' },
    { type: 'h3', text: '1. Le design' },
    { type: 'p', text: "Le design recouvre la maquette graphique (choix de la palette, typographie, mise en page), les déclinaisons mobile, et les animations. Un design sur mesure coûte entre **500 et 3 000 €** selon la complexité. Certains prestataires utilisent des templates et facturent quand même un design custom — c'est à vérifier." },
    { type: 'h3', text: '2. Le développement' },
    { type: 'p', text: "C'est la part la plus variable du prix. Un site développé avec WordPress + template modifié, c'est 1-3 jours de travail. Un site Next.js sur mesure avec SEO optimisé, c'est 5-15 jours. Un prix bas implique presque toujours un travail moins approfondi." },
    { type: 'h3', text: "3. L'hébergement et le nom de domaine" },
    { type: 'p', text: "L'hébergement coûte entre **5 et 50 €/mois** selon le type (mutualisé, VPS, cloud). Le nom de domaine coûte 10-15 €/an. Ces coûts sont souvent récurrents — vérifiez s'ils sont inclus dans le devis initial ou facturés en plus." },
    { type: 'h3', text: '4. Le SEO technique' },
    { type: 'p', text: "Le SEO technique comprend : balises meta correctement configurées, sitemap XML, schema.org, Core Web Vitals, structure des URLs. C'est différent du *content marketing* (rédaction d'articles). Un site livré sans SEO technique, c'est un site que Google ne comprend pas." },
    { type: 'h3', text: '5. La maintenance' },
    { type: 'p', text: "Un site sans maintenance devient obsolète et vulnérable. Comptez **50 à 300 €/mois** selon le niveau de service : mises à jour de sécurité, sauvegardes, monitoring de disponibilité, corrections mineures." },
    { type: 'h2', text: 'Ce qu\'on oublie souvent de mentionner dans les devis' },
    { type: 'ul', items: [
      "**Le texte et les images** — un devis web ne comprend généralement pas la rédaction du contenu ni les photos. Si vous ne les fournissez pas, c'est un coût supplémentaire",
      "**L'email professionnel** — un email `@votre-domaine.fr` n'est pas inclus automatiquement",
      "**Les formations** — si vous devez mettre à jour votre contenu vous-même, prévoir 1-2h de formation",
      "**Les révisions** — combien de cycles de correction sont compris ? Clarifiez avant de signer",
      "**La mise en ligne** — certains prestataires livrent le site mais pas la configuration DNS/hébergement",
    ]},
    { type: 'h2', text: 'Fourchettes de prix réalistes en 2025' },
    { type: 'table',
      headers: ['Type de site', 'Fourchette 2025', 'Délai', 'Pour qui'],
      rows: [
        ['Landing page', '800 – 2 500 €', '1 semaine', 'Validation d\'idée, campagne pub'],
        ['Site vitrine (5-10 pages)', '2 500 – 6 000 €', '2-3 semaines', 'Indépendants, PME, artisans'],
        ['Site e-commerce', '5 000 – 20 000 €', '4-8 semaines', 'Boutique en ligne'],
        ['Application web sur mesure', '15 000 – 80 000 €', '2-6 mois', 'SaaS, marketplace, outil métier'],
        ['Site WordPress basique (template)', '500 – 2 000 €', '3-5 jours', 'Budget très serré, besoins simples'],
      ],
    },
    { type: 'callout', text: "Un site à 500 € sera livré en 2-3 jours. Un site à 4 000 € sera livré en 3 semaines. Les deux peuvent correspondre à un besoin réel — mais ils n'ont pas le même niveau de qualité, de SEO, ni de durabilité." },
    { type: 'h2', text: 'Ce qu\'inclut mon offre (transparent)' },
    { type: 'p', text: "Voici ce qui est systématiquement inclus dans mes projets de [création de site web](/fr/creation-site-france) :" },
    { type: 'ul', items: [
      "**Design sur mesure** responsive (mobile-first), pas de template",
      "**Développement Next.js** — SSR/SSG, performances optimisées, score PageSpeed 90+",
      "**Nom de domaine** enregistré à votre nom",
      "**Hébergement configuré et sécurisé** (Vercel ou VPS selon le projet)",
      "**Email professionnel** configuré",
      "**SSL + optimisation Core Web Vitals**",
      "**SEO technique** : balises, sitemap, schema.org, structure URLs",
      "**Déploiement automatique** CI/CD — vos mises à jour partent en prod sans intervention manuelle",
      "**Support 30 jours** post-livraison inclus",
    ]},
    { type: 'p', text: "Mon tarif de départ pour un site vitrine est **1 500 €**, livré en 3 semaines. Ce n'est pas le moins cher du marché — mais c'est un site qui fonctionne vraiment, qui charge en moins d'une seconde, et que vous possédez entièrement." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "La prochaine fois qu'on vous propose un site web, posez ces questions : Qu'est-ce qui est inclus exactement ? L'hébergement est-il compris ? Le SEO technique est-il configuré ? Puis-je mettre à jour le contenu moi-même ?" },
    { type: 'p', text: "Si vous avez un projet en tête, [demandez un devis détaillé](/fr/contact). Je réponds sous 24h avec un chiffrage transparent." },
    { type: 'p', text: "**Voir aussi :** [Pourquoi votre site WordPress ralentit vos ventes](/fr/blog/pourquoi-site-wordpress-ralentit-ventes)" },
  ],
};

const websitePricingEN: PostLocaleData = {
  title:       'Building a Professional Website in 2025: What\'s Really Included in the Price',
  description: 'What really makes up a website price in 2025: design, development, hosting, SEO, maintenance. Realistic price ranges in France, no sugarcoating.',
  date:        '2025-03-01',
  readingTime: 7,
  tags:        ['Website', 'Pricing', 'Web development', 'France'],
  category:    'Web',
  blocks: [
    { type: 'p', text: "Why does a website cost €500 from some providers and €50,000 from others? The answer is simpler than it looks. What varies isn't the \"website\" itself — it's everything around it." },
    { type: 'h2', text: 'What really makes up the price' },
    { type: 'ul', items: [
      "**Design** — custom mockup, responsive layouts, animations. €500–€3,000 depending on complexity",
      "**Development** — WordPress + modified template: 1-3 days. Custom Next.js with SEO: 5-15 days",
      "**Hosting + domain** — €5–€50/month hosting, €10–15/year domain. Often recurring, not always in the quote",
      "**Technical SEO** — meta tags, sitemap, schema.org, Core Web Vitals. A site without this is invisible to Google",
      "**Maintenance** — €50–€300/month for security updates, backups, monitoring",
    ]},
    { type: 'h2', text: 'What\'s often missing from quotes' },
    { type: 'ul', items: [
      "Content (text, photos) — rarely included",
      "Professional email at your domain",
      "Training to update content yourself",
      "DNS / hosting configuration at launch",
      "Number of revision rounds",
    ]},
    { type: 'h2', text: 'Realistic price ranges in 2025' },
    { type: 'table',
      headers: ['Site type', '2025 range', 'Timeline', 'Best for'],
      rows: [
        ['Landing page', '€800 – €2,500', '1 week', 'Idea validation, ad campaigns'],
        ['Showcase site (5-10 pages)', '€2,500 – €6,000', '2-3 weeks', 'Freelancers, SMEs, tradespeople'],
        ['E-commerce', '€5,000 – €20,000', '4-8 weeks', 'Online shop'],
        ['Custom web app', '€15,000 – €80,000', '2-6 months', 'SaaS, marketplace, business tool'],
        ['Basic WordPress (template)', '€500 – €2,000', '3-5 days', 'Very tight budget, simple needs'],
      ],
    },
    { type: 'h2', text: 'What my service includes (transparent)' },
    { type: 'p', text: "Every project I deliver through my [website creation service](/en/creation-site-france) includes: custom responsive design, Next.js development with 90+ PageSpeed score, domain registered in your name, configured and secured hosting, professional email, SSL + Core Web Vitals optimization, technical SEO, automatic CI/CD deployment, and 30 days post-launch support." },
    { type: 'p', text: "Starting price for a showcase site: **€1,500**, delivered in 3 weeks. Not the cheapest on the market — but a site that actually works, loads in under a second, and is entirely yours." },
    { type: 'h2', text: 'Conclusion' },
    { type: 'p', text: "Next time someone quotes you a website, ask: What's included exactly? Is hosting included? Is technical SEO configured? Can I update the content myself? If the answer to all of these is yes, and the price seems right, go for it. [Request a detailed quote](/en/contact)." },
  ],
};

const websitePricingAR: PostLocaleData = {
  title:       'إنشاء موقع ويب احترافي في 2025: ما هو مضمّن فعلاً في السعر؟',
  description: 'ما يشكّل سعر الموقع حقاً: التصميم، التطوير، الاستضافة، SEO، الصيانة. نطاقات أسعار واقعية في فرنسا.',
  date:        '2025-03-01',
  readingTime: 7,
  tags:        ['موقع ويب', 'أسعار', 'تطوير ويب'],
  category:    'Web',
  blocks: [
    { type: 'p', text: 'لماذا يكلف الموقع 500 يورو عند بعض الموردين و50,000 يورو عند آخرين؟ الجواب أبسط مما يبدو. ما يتغير ليس "الموقع" في حد ذاته — بل كل ما حوله.' },
    { type: 'h2', text: 'مكونات السعر الحقيقية' },
    { type: 'ul', items: [
      '**التصميم** — 500 إلى 3,000 يورو حسب التعقيد',
      '**التطوير** — من 1-3 أيام (WordPress + قالب) إلى 5-15 يوم (Next.js مخصص)',
      '**الاستضافة والنطاق** — 5 إلى 50 يورو شهرياً، في الغالب غير مدرجة في العرض الأولي',
      '**SEO التقني** — علامات meta، sitemap، schema.org، Core Web Vitals',
      '**الصيانة** — 50 إلى 300 يورو شهرياً',
    ]},
    { type: 'h2', text: 'نطاقات الأسعار الواقعية 2025' },
    { type: 'table',
      headers: ['نوع الموقع', 'النطاق السعري', 'المدة'],
      rows: [
        ['صفحة هبوط', '800 – 2,500 يورو', 'أسبوع واحد'],
        ['موقع عرض (5-10 صفحات)', '2,500 – 6,000 يورو', '2-3 أسابيع'],
        ['متجر إلكتروني', '5,000 – 20,000 يورو', '4-8 أسابيع'],
        ['تطبيق ويب مخصص', '15,000 – 80,000 يورو', '2-6 أشهر'],
      ],
    },
    { type: 'h2', text: 'خاتمة' },
    { type: 'p', text: 'في المرة القادمة التي يُعرض عليك فيها موقع ويب، اسأل: ماذا يشمل بالضبط؟ هل الاستضافة مدرجة؟ هل SEO مُهيّأ؟ [اطلب عرضاً مفصلاً](/ar/contact).' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════════
   BLOG_POSTS — export principal
═══════════════════════════════════════════════════════════════════════════════ */

export const BLOG_POSTS: PostDB = {
  'combien-coute-freelance-devops-france-2025': {
    fr: devopsPricingFR,
    en: devopsPricingEN,
    ar: devopsPricingAR,
  },
  'cicd-startup-sans-ingenieur-devops': {
    fr: cicdStartupFR,
    en: cicdStartupEN,
    ar: cicdStartupAR,
  },
  'pourquoi-site-wordpress-ralentit-ventes': {
    fr: wordpressFR,
    en: wordpressEN,
    ar: wordpressAR,
  },
  'freelance-devops-vs-agence-it': {
    fr: freelanceVsAgencyFR,
    en: freelanceVsAgencyEN,
    ar: freelanceVsAgencyAR,
  },
  'creation-site-web-professionnel-2025-inclus': {
    fr: websitePricingFR,
    en: websitePricingEN,
    ar: websitePricingAR,
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

export function getPost(slug: string, locale: string): PostLocaleData | undefined {
  const post = BLOG_POSTS[slug];
  if (!post) return undefined;
  const l = (['fr', 'en', 'ar'] as const).includes(locale as 'fr' | 'en' | 'ar')
    ? (locale as 'fr' | 'en' | 'ar')
    : 'fr';
  return post[l] ?? post.fr;
}

export function getAllSlugs(): string[] {
  return Object.keys(BLOG_POSTS);
}

export const AUTHOR = {
  name:     PERSON.name,
  jobTitle: PERSON.jobTitle,
  url:      SITE.url,
  locality: SITE.city,
  country:  SITE.country,
} as const;
