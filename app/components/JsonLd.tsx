// app/components/JsonLd.tsx
// Renders a JSON-LD <script> tag. Works in server and client components.

type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escape "<" so content can never break out of the script tag
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}