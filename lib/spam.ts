/* ── Rate limiter — in-memory, per IP ───────────────────────── */
interface RateEntry { count: number; resetAt: number }
const rateLimitStore = new Map<string, RateEntry>();
const MAX_PER_HOUR = 3;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return true; // allowed
  }
  if (entry.count >= MAX_PER_HOUR) return false; // blocked
  entry.count++;
  return true;
}

/* ── Spam content filter ─────────────────────────────────────── */
const SPAM_WORDS = /\b(casino|viagra|crypto|bitcoin|forex|nft|loan offer|click here|earn money|make money fast|seo service|buy followers|backlink|adult|xxx|porn|onlyfans|telegram bot|whatsapp group|investment opportunity|guaranteed return|double your money)\b/i;

export function isSpamContent(text: string): boolean {
  if (SPAM_WORDS.test(text)) return true;
  // Reject if more than 2 URLs in the message
  const urlCount = (text.match(/https?:\/\//gi) ?? []).length;
  if (urlCount > 2) return true;
  // Reject if message is mostly uppercase (shouting spam)
  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 20) {
    const upper = letters.replace(/[^A-Z]/g, '').length;
    if (upper / letters.length > 0.7) return true;
  }
  return false;
}

/* ── Disposable email blocklist ──────────────────────────────── */
const DISPOSABLE = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com',
  'sharklasers.com', 'yopmail.com', 'trashmail.com', '10minutemail.com',
  'dispostable.com', 'fakeinbox.com', 'spam4.me', 'getairmail.com',
  'discard.email', 'mailnull.com', 'spamgourmet.com', 'maildrop.cc',
  'guerrillamailblock.com', 'grr.la', 'ema.ilGenerator.net', 'trashmail.me',
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return DISPOSABLE.has(domain);
}

/* ── Timing check ────────────────────────────────────────────── */
const MIN_SECONDS = 3;

export function isTooFast(loadTimeMs: number): boolean {
  return Date.now() - loadTimeMs < MIN_SECONDS * 1000;
}
