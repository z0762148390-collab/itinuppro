import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Consultant TIBCO Freelance France — itinup';

const TAGS = ['TIBCO BW6', 'BusinessWorks', 'EMS', 'SOA', 'Kafka', 'Oracle'];

export default function Image() {
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
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99,102,241,0.4)',
            }}
          >
            <span style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>i</span>
          </div>
          <span
            style={{
              color: '#ffffff',
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            itinup
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Category badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.28)',
              borderRadius: '100px',
              padding: '7px 18px',
              width: 'fit-content',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#818cf8',
              }}
            />
            <span
              style={{ color: '#818cf8', fontSize: 15, fontWeight: 600, letterSpacing: '0.02em' }}
            >
              TIBCO · BusinessWorks · Consultant Senior
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              color: '#ffffff',
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-2px',
            }}
          >
            Consultant TIBCO Freelance
            <br />
            France entière
          </div>

          {/* Subtitle */}
          <div
            style={{
              color: '#94a3b8',
              fontSize: 24,
              fontWeight: 400,
              letterSpacing: '-0.3px',
            }}
          >
            Intégration ESB · Middleware · Basé à Montpellier
          </div>
        </div>

        {/* Stack tags */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {TAGS.map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(51,65,85,0.7)',
                borderRadius: 8,
                padding: '7px 16px',
                color: '#475569',
                fontSize: 15,
                fontWeight: 500,
                fontFamily: 'monospace',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
