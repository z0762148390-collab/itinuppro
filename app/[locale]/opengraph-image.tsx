import { ImageResponse } from 'next/og';

export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt         = 'itinup — Freelance DevOps & Développement Web · Montpellier';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        background: '#020817',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.25) 0%, transparent 70%)',
          display: 'flex',
        }}
      />

      {/* Logo badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'white', fontSize: 26, fontWeight: 900, letterSpacing: '-1px' }}>
            it
          </span>
        </div>
        <span style={{ color: 'white', fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>
          itinup
        </span>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(37,99,235,0.15)',
            border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: 999,
            padding: '8px 20px',
            alignSelf: 'flex-start',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#4ade80',
              display: 'flex',
            }}
          />
          <span style={{ color: '#60a5fa', fontSize: 18, fontWeight: 600 }}>
            Disponible — réponse sous 48h
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            Freelance DevOps
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            & Développement Web
          </span>
        </div>

        <span style={{ color: '#64748b', fontSize: 24, fontWeight: 500, marginTop: 4 }}>
          Montpellier · Java Spring Boot · CI/CD · Kubernetes · Next.js
        </span>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 28,
        }}
      >
        <span style={{ color: '#475569', fontSize: 18 }}>
          itinup.com
        </span>
        <div style={{ display: 'flex', gap: 12 }}>
          {['DevOps', 'Java', 'TIBCO', 'Next.js', 'Python'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 8,
                padding: '6px 14px',
                display: 'flex',
              }}
            >
              <span style={{ color: '#94a3b8', fontSize: 16, fontWeight: 600 }}>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
