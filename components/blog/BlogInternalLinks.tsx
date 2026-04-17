import { Link } from '@/navigation';
import { ArrowRight } from 'lucide-react';

interface BlogInternalLinksProps {
  locale: string;
}

const LINKS = {
  fr: {
    title: 'À lire aussi',
    items: [
      { href: '/devops-france',                     label: 'Freelance DevOps',               sub: 'CI/CD · Kubernetes · AWS' },
      { href: '/java-spring-boot-freelance-france', label: 'Développeur Java Spring',         sub: 'Java 21 · Spring Boot 3 · Microservices' },
      { href: '/tibco-freelance-france',            label: 'Expert TIBCO',                    sub: 'TIBCO BW · TIBCO EMS · Intégration' },
      { href: '/creation-site-web-application',     label: 'Création site web & application', sub: 'À partir de 490€ · Livraison 3 semaines' },
    ],
  },
  en: {
    title: 'Read also',
    items: [
      { href: '/devops-france',                     label: 'DevOps Freelancer',            sub: 'CI/CD · Kubernetes · AWS' },
      { href: '/java-spring-boot-freelance-france', label: 'Java Spring Developer',        sub: 'Java 21 · Spring Boot 3 · Microservices' },
      { href: '/tibco-freelance-france',            label: 'TIBCO Expert',                 sub: 'TIBCO BW · TIBCO EMS · Integration' },
      { href: '/creation-site-web-application',     label: 'Website & App Creation',       sub: 'From €490 · Delivered in 3 weeks' },
    ],
  },
  ar: {
    title: 'اقرأ أيضاً',
    items: [
      { href: '/devops-france',                     label: 'مستقل DevOps',                 sub: 'CI/CD · Kubernetes · AWS' },
      { href: '/java-spring-boot-freelance-france', label: 'مطور Java Spring',             sub: 'Java 21 · Spring Boot 3 · Microservices' },
      { href: '/tibco-freelance-france',            label: 'خبير TIBCO',                   sub: 'TIBCO BW · TIBCO EMS · تكامل' },
      { href: '/creation-site-web-application',     label: 'إنشاء موقع وتطبيق',           sub: 'من 490€ · تسليم في 3 أسابيع' },
    ],
  },
};

export default function BlogInternalLinks({ locale }: BlogInternalLinksProps) {
  const l = LINKS[locale as keyof typeof LINKS] ?? LINKS.fr;
  const isRtl = locale === 'ar';

  return (
    <section className={`mt-12 pt-10 border-t border-slate-800 ${isRtl ? 'text-right' : ''}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-5">
        {l.title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {l.items.map(({ href, label, sub }) => (
          <Link
            key={href}
            href={href as Parameters<typeof Link>[0]['href']}
            className="flex items-start gap-3 px-4 py-3.5
                       bg-slate-900/50 border border-slate-800/80 rounded-xl
                       hover:border-slate-600/60 hover:bg-slate-900/80
                       transition-all duration-200 group">
            <ArrowRight
              size={14}
              className="mt-0.5 shrink-0 text-brand-400 group-hover:translate-x-0.5 transition-transform"
            />
            <span>
              <span className="block text-sm font-medium text-slate-200 group-hover:text-brand-400 transition-colors">
                {label}
              </span>
              <span className="block text-xs text-slate-600 mt-0.5">{sub}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
