import { cookies } from 'next/headers';
import { getVisits, getAuthToken, classifySource, sourceCategory } from '@/lib/analytics';
import { getContacts } from '@/lib/contacts';
import type { Visit } from '@/lib/analytics';
import type { ContactEntry } from '@/lib/contacts';

/* ── Auth ────────────────────────────────────────────────────── */
async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get('stats_auth')?.value;
  if (!token) return false;
  return token === getAuthToken();
}

/* ── Data helpers ────────────────────────────────────────────── */
function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function buildDailyStats(visits: Visit[], days: string[]) {
  const map: Record<string, number> = {};
  for (const v of visits) map[v.ts.slice(0, 10)] = (map[v.ts.slice(0, 10)] ?? 0) + 1;
  return days.map((date) => ({ date, count: map[date] ?? 0 }));
}

function countBy<T>(items: T[], key: (item: T) => string) {
  const map: Record<string, number> = {};
  for (const item of items) {
    const k = key(item);
    map[k] = (map[k] ?? 0) + 1;
  }
  return Object.entries(map)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

function flag(code: string): string {
  if (!code || code.length !== 2 || code === 'Unknown' || code === 'Local') return '🌐';
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join('');
}

const CATEGORY_LABEL: Record<string, string> = {
  IA: '🤖 IA (ChatGPT, Perplexity…)',
  Search: '🔍 Moteurs de recherche',
  Social: '💬 Réseaux sociaux',
  Direct: '🔗 Direct / Email',
  Autre: '🌐 Autre',
};
const CATEGORY_ORDER = ['IA', 'Search', 'Social', 'Direct', 'Autre'];

/* ── Login form ──────────────────────────────────────────────── */
function LoginPage({ error }: { error: boolean }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl
                          bg-gradient-to-br from-indigo-500 to-purple-500 mb-4">
            <span className="text-white font-bold text-xl">i</span>
          </div>
          <h1 className="text-xl font-bold text-white">itinup · Stats</h1>
        </div>
        <form action="/api/stats/login" method="POST"
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5">
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20
                          rounded-lg px-4 py-2">
              Mot de passe incorrect.
            </p>
          )}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-2">
              Mot de passe
            </label>
            <input id="password" name="password" type="password" required autoFocus
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl
                         text-white placeholder-slate-600 focus:outline-none
                         focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="••••••••" />
          </div>
          <button type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500
                       text-white font-semibold hover:opacity-90 transition">
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────────── */
function Bar({ pct, color = 'bg-indigo-500' }: { pct: number; color?: string }) {
  return (
    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
      {children}
    </h2>
  );
}

/* ── Contacts section ────────────────────────────────────────── */
function ContactsSection({ contacts }: { contacts: ContactEntry[] }) {
  const unread = contacts.filter((c) => !c.read);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Messages reçus
        </h2>
        {unread.length > 0 && (
          <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-2.5 py-0.5">
            {unread.length} nouveau{unread.length > 1 ? 'x' : ''}
          </span>
        )}
      </div>

      {unread.length === 0 ? (
        <p className="text-slate-600 text-sm">Aucun nouveau message.</p>
      ) : (
        <div className="space-y-2">
          {unread.map((c, i) => (
            <details
              key={c.id}
              open={i === 0}
              className="group rounded-xl border border-indigo-500/30 bg-indigo-500/5 overflow-hidden"
            >
              {/* ── Summary row (always visible) ── */}
              <summary className="flex items-center justify-between gap-4 px-5 py-4
                                  cursor-pointer list-none select-none
                                  hover:bg-indigo-500/10 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {/* chevron */}
                  <svg className="w-4 h-4 text-slate-500 flex-shrink-0 transition-transform
                                  group-open:rotate-90"
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="font-semibold text-white truncate">{c.name}</span>
                  <span className="text-sm text-indigo-400 truncate hidden sm:block">
                    {c.email}
                  </span>
                  {c.budget && (
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded flex-shrink-0">
                      {c.budget}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-600 whitespace-nowrap flex-shrink-0">
                  {new Date(c.ts).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </summary>

              {/* ── Expanded content ── */}
              <div className="px-5 pb-5 pt-1 border-t border-indigo-500/10">
                <a href={`mailto:${c.email}`}
                   className="text-sm text-indigo-400 hover:text-indigo-300 transition mb-3 block sm:hidden">
                  {c.email}
                </a>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-words mb-4">
                  {c.message}
                </p>
                <form action="/api/stats/read" method="POST">
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit"
                          className="text-xs text-slate-500 hover:text-white transition
                                     border border-slate-700 hover:border-slate-500
                                     rounded-lg px-3 py-1.5">
                    ✓ Marquer comme lu — retirer de la liste
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

function Dashboard({ visits, contacts }: { visits: Visit[]; contacts: ContactEntry[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const days = getLast30Days();
  const daily = buildDailyStats(visits, days);
  const total = visits.length;

  const todayCount = daily.find((d) => d.date === today)?.count ?? 0;
  const maxBar = Math.max(...daily.map((d) => d.count), 1);

  // Countries
  const countries = countBy(visits, (v) => v.country ?? 'Unknown').slice(0, 12);

  // Categories (high-level)
  const catMap: Record<string, number> = {};
  for (const v of visits) {
    const cat = sourceCategory(v.ref);
    catMap[cat] = (catMap[cat] ?? 0) + 1;
  }

  // Detailed sources
  const sources = countBy(visits, (v) => classifySource(v.ref)).slice(0, 12);

  const topCountry = countries[0];
  const topSource = sources[0]?.label ?? '—';

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500
                            flex items-center justify-center">
              <span className="text-white font-bold">i</span>
            </div>
            <span className="text-white font-bold text-lg">itinup · Stats</span>
          </div>
          <form action="/api/stats/logout" method="POST">
            <button type="submit" className="text-sm text-slate-500 hover:text-slate-300 transition">
              Déconnexion
            </button>
          </form>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Visites (30j)', value: total.toLocaleString('fr') },
            { label: "Aujourd'hui",   value: todayCount.toLocaleString('fr') },
            { label: 'Top pays',      value: topCountry ? `${flag(topCountry.label)} ${topCountry.label}` : '—' },
            { label: 'Top source',    value: topSource },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
              <p className="text-xl font-bold text-white truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Contacts */}
        <ContactsSection contacts={contacts} />

        {/* Bar chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-5">
          <SectionTitle>Visites par jour — 30 derniers jours</SectionTitle>
          <div className="flex items-end gap-1 h-28">
            {daily.map(({ date, count }) => {
              const pct = Math.round((count / maxBar) * 100);
              const isToday = date === today;
              return (
                <div key={date} className="flex-1 flex flex-col items-center group relative">
                  <div
                    className={`w-full rounded-sm ${isToday ? 'bg-indigo-500' : 'bg-slate-700 group-hover:bg-slate-500'}`}
                    style={{ height: `${Math.max(pct, count > 0 ? 4 : 1)}%` }}
                  />
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
                                  bg-slate-800 border border-slate-700 rounded px-2 py-1
                                  text-xs text-white whitespace-nowrap opacity-0
                                  group-hover:opacity-100 pointer-events-none z-10">
                    {date.slice(5)}: {count}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-2">
            <span>{days[0]?.slice(5)}</span>
            <span>{days[14]?.slice(5)}</span>
            <span>{days[29]?.slice(5)}</span>
          </div>
        </div>

        {/* 2-col grid: Sources + Countries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

          {/* Source categories */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <SectionTitle>Origine du trafic</SectionTitle>
            {total === 0 ? (
              <p className="text-slate-600 text-sm">Aucune visite.</p>
            ) : (
              <div className="space-y-4">
                {CATEGORY_ORDER.filter((cat) => catMap[cat]).map((cat) => {
                  const count = catMap[cat] ?? 0;
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-slate-300">{CATEGORY_LABEL[cat]}</span>
                        <span className="text-sm text-slate-500">{count} <span className="text-slate-600">({pct}%)</span></span>
                      </div>
                      <Bar pct={pct} color={cat === 'IA' ? 'bg-purple-500' : cat === 'Search' ? 'bg-blue-500' : cat === 'Social' ? 'bg-green-500' : cat === 'Direct' ? 'bg-indigo-500' : 'bg-slate-500'} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Countries */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <SectionTitle>Pays visiteurs</SectionTitle>
            {countries.length === 0 ? (
              <p className="text-slate-600 text-sm">Aucune visite.</p>
            ) : (
              <div className="space-y-3">
                {countries.map(({ label, count }) => {
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-300">
                          {flag(label)} {label}
                        </span>
                        <span className="text-sm text-slate-500">{count} <span className="text-slate-600">({pct}%)</span></span>
                      </div>
                      <Bar pct={pct} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Detailed sources */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <SectionTitle>Sources détaillées</SectionTitle>
          {sources.length === 0 ? (
            <p className="text-slate-600 text-sm">Aucune visite enregistrée.</p>
          ) : (
            <div className="space-y-3">
              {sources.map(({ label, count }) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300 font-mono truncate max-w-xs">{label}</span>
                      <span className="text-sm text-slate-500 ml-4">{count} <span className="text-slate-600">({pct}%)</span></span>
                    </div>
                    <Bar pct={pct} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-700 mt-8">
          {visits.length} entrées · 60 jours de rétention
        </p>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
interface Props { searchParams: Promise<{ error?: string }> }

export default async function StatsPage({ searchParams }: Props) {
  const { error } = await searchParams;
  if (!(await isAuthenticated())) return <LoginPage error={error === '1'} />;

  const allVisits = await getVisits();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const visits = allVisits.filter((v) => new Date(v.ts) > cutoff);

  const contacts = await getContacts();

  return <Dashboard visits={visits} contacts={contacts} />;
}
