import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/blog-posts';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);

  const title = post?.title ?? 'Blog – itinup';
  const category = post?.category ?? 'Tech';
  const readingTime = post?.readingTime ?? 5;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(37,99,235,0.4)',
            }}
          >
            <span style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>i</span>
          </div>
          <span style={{ color: '#ffffff', fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>
            itinup
          </span>
          <div style={{ flex: 1 }} />
          <div
            style={{
              background: 'rgba(37,99,235,0.12)',
              border: '1px solid rgba(37,99,235,0.28)',
              borderRadius: 100,
              padding: '7px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: '#60a5fa', fontSize: 14, fontWeight: 600 }}>
              {category}
            </span>
          </div>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: title.length > 60 ? 44 : 52,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              maxWidth: 960,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Z
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: '#f8fafc', fontSize: 16, fontWeight: 600 }}>
              itinup · Montpellier, France
            </span>
            <span style={{ color: '#64748b', fontSize: 14 }}>
              {readingTime} min read
            </span>
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            {['DevOps', 'Next.js', 'France'].map((tag) => (
              <div
                key={tag}
                style={{
                  background: 'rgba(15,23,42,0.9)',
                  border: '1px solid rgba(51,65,85,0.7)',
                  borderRadius: 8,
                  padding: '6px 14px',
                  color: '#475569',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'monospace',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
