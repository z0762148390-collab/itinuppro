import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DATA_FILE = path.join(process.cwd(), 'data', 'analytics.json');
const KEEP_DAYS = 60;

export interface Visit {
  ts: string;      // ISO string
  page: string;
  ref: string;     // hostname or 'direct'
  country: string; // ISO 3166-1 alpha-2 code, 'Local', or 'Unknown'
}

async function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

export async function recordVisit(page: string, ref: string, country: string): Promise<void> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  const visits: Visit[] = JSON.parse(raw);
  visits.push({
    ts: new Date().toISOString(),
    page: page.slice(0, 300),
    ref: ref.slice(0, 100),
    country,
  });
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - KEEP_DAYS);
  const filtered = visits.filter((v) => new Date(v.ts) > cutoff);
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered), 'utf8');
}

export async function getVisits(): Promise<Visit[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw) as Visit[];
}

/** Categorise a referrer hostname into a human-readable source */
export function classifySource(ref: string): string {
  if (!ref || ref === 'direct') return 'Direct';
  const r = ref.toLowerCase();
  // AI chat bots
  if (r.includes('chatgpt') || r.includes('openai.com')) return 'ChatGPT';
  if (r.includes('perplexity')) return 'Perplexity';
  if (r.includes('claude.ai')) return 'Claude';
  if (r.includes('gemini.google') || r.includes('bard.google')) return 'Gemini';
  if (r.includes('copilot.microsoft') || r.includes('bing.com')) return 'Bing / Copilot';
  if (r.includes('you.com')) return 'You.com';
  // Search engines
  if (r.includes('google.')) return 'Google';
  if (r.includes('duckduckgo')) return 'DuckDuckGo';
  if (r.includes('yahoo.')) return 'Yahoo';
  if (r.includes('ecosia')) return 'Ecosia';
  // Social
  if (r.includes('linkedin')) return 'LinkedIn';
  if (r.includes('twitter') || r === 'x.com' || r.includes('t.co')) return 'Twitter / X';
  if (r.includes('facebook') || r.includes('fb.com')) return 'Facebook';
  if (r.includes('instagram')) return 'Instagram';
  // Fallback
  return ref;
}

/** Group source type for high-level category */
export function sourceCategory(ref: string): 'IA' | 'Search' | 'Social' | 'Direct' | 'Autre' {
  const classified = classifySource(ref);
  if (['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Bing / Copilot', 'You.com'].includes(classified)) return 'IA';
  if (['Google', 'DuckDuckGo', 'Yahoo', 'Ecosia'].includes(classified)) return 'Search';
  if (['LinkedIn', 'Twitter / X', 'Facebook', 'Instagram'].includes(classified)) return 'Social';
  if (classified === 'Direct') return 'Direct';
  return 'Autre';
}

/** Derive a stable token from the password — changing the password invalidates all sessions */
export function getAuthToken(): string {
  const pass = process.env.STATS_PASSWORD ?? '';
  return crypto.createHash('sha256').update('itinup:stats:' + pass).digest('hex');
}
