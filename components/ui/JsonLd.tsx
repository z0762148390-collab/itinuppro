import type { JsonLdSchema } from '@/types';

interface JsonLdProps {
  schema: JsonLdSchema | JsonLdSchema[];
}

/**
 * Injects a JSON-LD structured data script into the page.
 * Place this in server components or layout to avoid hydration issues.
 * Multiple schemas can be passed as an array.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
