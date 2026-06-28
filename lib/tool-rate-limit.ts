const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function isToolRateLimited(ip: string, maxPerHour = 10, scope = "tool"): boolean {
  const now = Date.now();
  const key = `${scope}:${ip}`;

  for (const [mapKey, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(mapKey);
  }

  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + 3_600_000 });
    return false;
  }

  if (entry.count >= maxPerHour) return true;
  entry.count++;
  return false;
}
