import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveContact } from '@/lib/contacts';
import { checkRateLimit, isSpamContent, isDisposableEmail, isTooFast } from '@/lib/spam';

const schema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email().max(200),
  message: z.string().min(10).max(2000),
  budget:  z.string().optional(),
  locale:  z.string().optional(),
  // Anti-spam fields
  _hp:     z.string().optional(), // honeypot — must be empty
  _t:      z.number().optional(), // page load timestamp
});

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  );
}

/** Silent reject — looks like success to bots */
function silentReject() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 });
  }

  const { name, email, message, budget, _hp, _t } = parsed.data;
  const ip = getClientIp(req);

  // ── 1. Honeypot — bot filled the hidden field ─────────────────
  if (_hp && _hp.length > 0) {
    console.warn(`[contact] Honeypot triggered — ip=${ip}`);
    return silentReject();
  }

  // ── 2. Timing — submitted too fast (< 3s) ─────────────────────
  if (_t && isTooFast(_t)) {
    console.warn(`[contact] Too fast submission — ip=${ip}`);
    return silentReject();
  }

  // ── 3. Rate limit — max 3/hour per IP ─────────────────────────
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Réessayez dans une heure.' },
      { status: 429 },
    );
  }

  // ── 4. Disposable email ────────────────────────────────────────
  if (isDisposableEmail(email)) {
    return NextResponse.json(
      { error: 'Adresse email non acceptée.' },
      { status: 422 },
    );
  }

  // ── 5. Spam content ───────────────────────────────────────────
  if (isSpamContent(message) || isSpamContent(name)) {
    console.warn(`[contact] Spam content detected — ip=${ip} email=${email}`);
    return silentReject();
  }

  // ── Persist locally ───────────────────────────────────────────
  await saveContact({ name, email, message, budget });

  // ── Email notification — best-effort ─────────────────────────
  const apiKey    = process.env.RESEND_API_KEY;
  const toEmail   = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  const emailBody = [
    `Nouveau message de ${name} <${email}>`,
    budget ? `Budget : ${budget}` : '',
    '',
    message,
  ].filter(Boolean).join('\n');

  if (apiKey && toEmail) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from:     `itinup Contact <${fromEmail}>`,
          to:       [toEmail],
          reply_to: email,
          subject:  `[itinup] Nouveau message de ${name}`,
          text:     emailBody,
        }),
      });
      if (!res.ok) console.error('[contact] Resend error:', await res.text());
    } catch (err) {
      console.error('[contact] Resend fetch failed:', err);
    }
  } else {
    console.log('[contact] Message reçu (email non configuré) :\n', emailBody);
  }

  return NextResponse.json({ ok: true });
}
