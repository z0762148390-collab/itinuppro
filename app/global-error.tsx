'use client';

import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

// Catches errors thrown inside the root layout (e.g. Header, Footer crashes).
// Must include <html> and <body> since the layout is broken.
export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[global-error.tsx]', error);
    }
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#020617', color: '#f1f5f9', fontFamily: 'sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
            <p style={{ fontSize: '3rem', fontWeight: 700, color: '#334155', margin: '0 0 1rem' }}>500</p>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 0.75rem' }}>
              Une erreur critique est survenue
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: '0 0 1.5rem' }}>
              Le service est temporairement indisponible. Veuillez réessayer dans quelques instants.
            </p>

            {isDev && (
              <pre style={{
                textAlign: 'left', fontSize: '0.75rem', background: '#0f172a',
                border: '1px solid #334155', borderRadius: '0.5rem', padding: '1rem',
                color: '#f87171', overflow: 'auto', maxHeight: '12rem',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: '0 0 1.5rem',
              }}>
                {error.message}
                {error.digest ? `\n\nDigest: ${error.digest}` : ''}
              </pre>
            )}

            <button
              onClick={reset}
              style={{
                padding: '0.625rem 1.25rem', borderRadius: '0.5rem',
                background: '#6366f1', color: '#fff', border: 'none',
                fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
              }}
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
