type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Server-side JSON-LD script — geen client JavaScript nodig. */
export default function JsonLd({ data }: Props) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
