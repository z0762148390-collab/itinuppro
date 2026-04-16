/**
 * Root layout — minimal wrapper required by Next.js App Router.
 * All real layout logic (HTML lang/dir, fonts, providers) lives in
 * app/[locale]/layout.tsx which handles per-locale rendering.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
