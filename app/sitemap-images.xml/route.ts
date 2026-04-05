import { SITE_URL } from "@/lib/seo-config";

const IMAGE_PATHS = ["/logo.svg", "/globe.svg", "/window.svg"];

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET(): Response {
  const base = SITE_URL;
  const now = new Date().toISOString();

  const urlBlocks = IMAGE_PATHS.map(
    (p) => `
  <url>
    <loc>${xmlEscape(`${base}${p}`)}</loc>
    <lastmod>${now}</lastmod>
    <image:image>
      <image:loc>${xmlEscape(`${base}${p}`)}</image:loc>
      <image:title>${xmlEscape(`Allesis — ${p}`)}</image:title>
    </image:image>
  </url>`,
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlBlocks}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
