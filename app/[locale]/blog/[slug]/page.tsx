import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { SITE } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import { Link } from '@/navigation';
import { getPost, getAllSlugs, AUTHOR, BLOG_POSTS, type Block } from '@/lib/blog-posts';
import { getBlogPostingSchema, getBreadcrumbSchema } from '@/lib/schemas';
import BlogInternalLinks from '@/components/blog/BlogInternalLinks';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

/* ─── Static params ─────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return ['fr', 'en', 'ar'].flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

/* ─── Metadata ──────────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return { title: 'Article introuvable | itinup' };

  const url = `${SITE.url}/${locale}/blog/${slug}`;
  return {
    title: `${post.title} | itinup`,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: url,
      languages: {
        fr:          `${SITE.url}/fr/blog/${slug}`,
        en:          `${SITE.url}/en/blog/${slug}`,
        ar:          `${SITE.url}/ar/blog/${slug}`,
        'x-default': `${SITE.url}/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [AUTHOR.name],
      tags: post.tags,
      url,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

/* ─── Inline renderer ───────────────────────────────────────────────────────── */
// Supports **bold**, `code`, [label](href)
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="text-brand-400 bg-slate-800 px-1.5 py-0.5 rounded text-[0.85em] font-mono">
              {part.slice(1, -1)}
            </code>
          );
        }
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          return (
            <a key={i} href={m[2]}
               className="text-brand-400 hover:text-brand-300 underline underline-offset-2 transition-colors">
              {m[1]}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

/* ─── Block renderer ────────────────────────────────────────────────────────── */
function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-slate-400 leading-relaxed">{renderInline(block.text)}</p>;

    case 'h2':
      return (
        <h2 className="text-2xl font-bold text-white mt-12 mb-1 pt-6 border-t border-slate-800/80">
          {block.text}
        </h2>
      );

    case 'h3':
      return (
        <h3 className="text-lg font-bold text-white mt-7 mb-1">
          {block.text}
        </h3>
      );

    case 'ul':
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-400">
              <span className="text-brand-500 mt-1.5 flex-shrink-0 text-[10px]">▸</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-400">
              <span className="text-brand-600 font-mono font-bold mt-0.5 flex-shrink-0 w-5 text-right text-sm">
                {i + 1}.
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );

    case 'code':
      return (
        <div className="rounded-xl overflow-hidden border border-slate-800">
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-auto text-xs text-slate-600 font-mono">{block.lang}</span>
          </div>
          <pre className="overflow-x-auto p-5 bg-slate-950 text-sm leading-relaxed">
            <code className="text-slate-300 font-mono whitespace-pre">{block.code}</code>
          </pre>
        </div>
      );

    case 'callout':
      return (
        <div className="border-l-2 border-brand-500 bg-brand-600/5 rounded-r-xl px-5 py-4">
          <p className="text-slate-300 leading-relaxed">{renderInline(block.text)}</p>
        </div>
      );

    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900">
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold text-slate-300 border-b border-slate-800">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-slate-400 border-b border-slate-800/50">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'faq':
      return (
        <div className="card p-5">
          <p className="font-semibold text-white mb-2">{renderInline(block.q)}</p>
          <p className="text-slate-400 leading-relaxed">{renderInline(block.a)}</p>
        </div>
      );

    default:
      return null;
  }
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();

  const dateLocale = locale === 'ar' ? 'ar-MA' : locale === 'en' ? 'en-GB' : 'fr-FR';
  const fmtDate = new Date(post.date).toLocaleDateString(dateLocale, {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const blogPostingSchema = getBlogPostingSchema(post, slug, locale);
  const breadcrumbSchema = getBreadcrumbSchema(locale, post.title, slug);

  // Related article — same category, different slug
  const allSlugs = getAllSlugs().filter((s) => s !== slug);
  const relatedSlug =
    allSlugs.find((s) => getPost(s, locale)?.category === post.category) ?? allSlugs[0];
  const relatedPost = relatedSlug ? getPost(relatedSlug, locale) : undefined;

  const isRtl = locale === 'ar';

  const cta = {
    heading:
      locale === 'ar' ? 'هل لديك هذه المشكلة؟ دعنا نتحدث.' :
      locale === 'en' ? "Got this problem? Let's talk." :
      'Vous avez ce problème ? Parlons-en.',
    sub:
      locale === 'ar' ? 'رد خلال 24 ساعة، بدون التزام.' :
      locale === 'en' ? 'Response within 24h, no commitment.' :
      'Réponse sous 24h, sans engagement.',
    btn:
      locale === 'ar' ? 'طلب عرض مجاني' :
      locale === 'en' ? 'Request a free quote' :
      'Demander un devis gratuit',
    related:
      locale === 'ar' ? 'مقال ذو صلة' :
      locale === 'en' ? 'Related article' :
      'Article connexe',
  };

  return (
    <>
      <JsonLd schema={blogPostingSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
        <div className="max-w-2xl mx-auto" dir={isRtl ? 'rtl' : undefined}>

          {/* ← Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500
                       hover:text-brand-400 transition-colors mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 className={isRtl ? 'rotate-180' : ''} aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Blog
          </Link>

          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag}
                        className="text-xs font-medium text-brand-400 bg-brand-600/10
                                   px-2.5 py-1 rounded-full border border-brand-600/20">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
                {post.title}
              </h1>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <time dateTime={post.date}>{fmtDate}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min</span>
              </div>
            </header>

            {/* Body */}
            <div className="space-y-5">
              {post.blocks.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            {/* Author */}
            <div className="mt-14 pt-8 border-t border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center
                              justify-center text-white font-bold text-lg flex-shrink-0"
                   style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)' }}>
                Z
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{AUTHOR.name}</p>
                <p className="text-xs text-slate-500">{AUTHOR.jobTitle}</p>
              </div>
            </div>

            {/* Related article */}
            {relatedPost && relatedSlug && (
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
                  {cta.related}
                </p>
                <a href={`/${locale}/blog/${relatedSlug}`}
                   className="card p-5 block group">
                  <p className="font-semibold text-white group-hover:text-brand-400
                                transition-colors leading-snug">
                    {relatedPost.title}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{relatedPost.readingTime} min</p>
                </a>
              </div>
            )}

            {/* Internal links */}
            <BlogInternalLinks locale={locale} />

            {/* CTA */}
            <div className="mt-10 card p-8 text-center">
              <p className="font-bold text-white text-xl mb-2">{cta.heading}</p>
              <p className="text-slate-400 text-sm mb-6">{cta.sub}</p>
              <Link
                href="/contact"
                className="btn-gradient inline-flex items-center px-8 py-3
                           text-white font-semibold rounded-xl text-sm"
              >
                {cta.btn}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
