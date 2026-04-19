import { ImageResponse } from 'next/og';

export const size        = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
        borderRadius: '40px',
      }}
    >
      <span
        style={{
          color: 'white',
          fontSize: 80,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-3px',
          lineHeight: 1,
        }}
      >
        it
      </span>
      <span
        style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: 22,
          fontWeight: 600,
          fontFamily: 'sans-serif',
          letterSpacing: '3px',
          marginTop: 4,
        }}
      >
        inup
      </span>
    </div>,
    { ...size },
  );
}
