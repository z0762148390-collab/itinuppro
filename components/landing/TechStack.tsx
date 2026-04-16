import { useTranslations } from 'next-intl';

const GROUPS = [
  {
    labelKey: 'group_devops',
    techs: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'GitHub Actions', 'Ansible'],
  },
  {
    labelKey: 'group_dev',
    techs: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Python'],
  },
  {
    labelKey: 'group_expert',
    techs: ['Java 21', 'Spring Boot 3', 'TIBCO BW', 'TIBCO EMS', 'JMS'],
  },
] as const;

export default function TechStack() {
  const t = useTranslations('tech_stack');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center tracking-tight
                       mb-12 rtl:text-right">
          {t('title')}
        </h2>

        <div className="flex flex-col gap-8">
          {GROUPS.map(({ labelKey, techs }) => (
            <div key={labelKey} className="rtl:text-right">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                {t(labelKey)}
              </p>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-slate-900/80 border border-slate-800
                               text-slate-300 text-sm rounded-lg font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
