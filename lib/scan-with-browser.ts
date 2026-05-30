export async function fetchRenderedHtml(url: string): Promise<string | null> {
  const token = process.env.BROWSERLESS_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      `https://production-sfo.browserless.io/content?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          url,
          waitForTimeout: 2500,
          gotoOptions: { waitUntil: "networkidle2" },
        }),
        signal: AbortSignal.timeout(25_000),
      }
    );
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}
