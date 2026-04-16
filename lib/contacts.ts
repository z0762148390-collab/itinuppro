import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

export interface ContactEntry {
  id: string;       // timestamp-based unique id
  ts: string;       // ISO date
  name: string;
  email: string;
  message: string;
  budget?: string;
  read: boolean;
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

export async function saveContact(params: {
  name: string;
  email: string;
  message: string;
  budget?: string;
}): Promise<void> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  const contacts: ContactEntry[] = JSON.parse(raw);
  contacts.push({
    id: Date.now().toString(36),
    ts: new Date().toISOString(),
    name: params.name.slice(0, 100),
    email: params.email.slice(0, 200),
    message: params.message.slice(0, 2000),
    budget: params.budget?.slice(0, 50),
    read: false,
  });
  await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf8');
}

export async function getContacts(): Promise<ContactEntry[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  const contacts = JSON.parse(raw) as ContactEntry[];
  return contacts.sort((a, b) => b.ts.localeCompare(a.ts));
}

export async function markRead(id: string): Promise<void> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  const contacts: ContactEntry[] = JSON.parse(raw);
  const entry = contacts.find((c) => c.id === id);
  if (entry) entry.read = true;
  await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf8');
}
