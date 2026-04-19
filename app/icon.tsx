import { ImageResponse } from 'next/og';

export const size        = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
        borderRadius: '7px',
      }}
    >
      <span
        style={{
          color: 'white',
          fontSize: 18,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.5px',
          lineHeight: 1,
        }}
      >
        it
      </span>
    </div>,
    { ...size },
  );
}
