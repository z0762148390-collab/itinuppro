const WA_BASE = 'https://wa.me/33764278451';

export const WA_MESSAGES: Record<string, string> = {
  'site-vitrine': `Bonjour,

Je suis intéressé par le site vitrine professionnel (à partir de 490€).

Mon activité : [précisez]
Ce que j'attends : [ex. présenter mes services, recevoir des demandes]`,

  'application': `Bonjour,

J'ai un projet d'application web sur mesure (à partir de 1 200€).

Mon besoin : [décrivez]
Utilisateurs concernés : [ex. mes clients, mon équipe]`,

  'cle-en-main': `Bonjour,

Je suis intéressé par l'offre clé en main à 49€/mois.

Mon activité : [précisez]
J'ai déjà un site : [oui / non]`,

  'refonte': `Bonjour,

Je souhaite refondre mon site existant.

URL de mon site actuel : [votre URL]
Problème principal : [ex. trop vieux, ne génère pas de clients]`,

  'devops': `Bonjour,

J'ai une mission DevOps à pourvoir.

Contexte : [décrivez]
Stack : [ex. Kubernetes, AWS, CI/CD]
Durée & TJM : [précisez]`,

  'java': `Bonjour,

J'ai une mission Java / Intégration à pourvoir.

Contexte : [décrivez]
Stack : [ex. Java 21, Spring Boot, TIBCO]
Durée & TJM : [précisez]`,

  'web-mission': `Bonjour,

J'ai une mission développement web.

Contexte : [décrivez]
Stack : [ex. Next.js, TypeScript, API REST]
Durée & TJM : [précisez]`,

  'audit': `Bonjour,

Je souhaite un audit technique.

Ce que j'aurais à auditer : [ex. infra, code, architecture]
Contexte : [décrivez votre situation]`,
};

export function waLink(service: string): string {
  const msg = WA_MESSAGES[service];
  if (!msg) return WA_BASE;
  return `${WA_BASE}?text=${encodeURIComponent(msg)}`;
}
