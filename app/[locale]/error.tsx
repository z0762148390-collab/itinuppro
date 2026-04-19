'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[error.tsx]', error);
    }
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <p className="text-5xl font-bold text-slate-700">500</p>
        <h1 className="text-xl font-semibold text-slate-100">
          Une erreur est survenue
        </h1>
        <p className="text-sm text-slate-400">
          Un problème technique inattendu s&apos;est produit.
          L&apos;équipe a été notifiée.
        </p>

        {isDev && (
          <pre className="mt-4 text-left text-xs bg-slate-900 border border-slate-700 rounded-lg p-4 text-red-400 overflow-auto max-h-48 whitespace-pre-wrap break-words">
            {error.message}
            {error.digest ? `\n\nDigest: ${error.digest}` : ''}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-slate-100 text-sm font-medium transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
