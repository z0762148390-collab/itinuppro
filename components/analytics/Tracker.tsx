'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    let ref = 'direct';
    if (document.referrer) {
      try {
        ref = new URL(document.referrer).hostname;
      } catch {
        ref = 'unknown';
      }
    }
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname, ref }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
