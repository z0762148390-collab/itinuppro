'use client';

import { useLocale } from 'next-intl';

interface DirectionResult {
  dir: 'rtl' | 'ltr';
  isRtl: boolean;
}

/**
 * Returns the text direction for the current locale.
 * Arabic (ar) uses RTL; French and English use LTR.
 */
export function useDirection(): DirectionResult {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return {
    dir: isRtl ? 'rtl' : 'ltr',
    isRtl,
  };
}
