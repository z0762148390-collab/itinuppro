import { redirect } from 'next/navigation';

// Locale-level 404 — redirect to locale homepage
export default function NotFound() {
  redirect('/');
}
