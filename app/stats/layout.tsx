import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = { title: 'Stats — itinup', robots: { index: false, follow: false } };

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
