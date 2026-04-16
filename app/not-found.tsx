import { redirect } from 'next/navigation';

// Global 404 — redirect to homepage (middleware will resolve locale)
export default function NotFound() {
  redirect('/');
}
