/**
 * MultiSafepay JSON API — server-only.
 *
 * Nooit importeren in een client component: de API-key staat in een
 * server-env var (géén NEXT_PUBLIC) en zou anders in de bundle belanden.
 */

if (typeof window !== "undefined") {
  throw new Error("lib/msp.ts is server-only en mag niet in een client component geïmporteerd worden.");
}

const BASE =
  process.env.MULTISAFEPAY_ENV === "test"
    ? "https://testapi.multisafepay.com/v1/json"
    : "https://api.multisafepay.com/v1/json";

export type MspOrder = {
  order_id?: string;
  payment_url?: string;
  status?: string;
  amount?: number;
  currency?: string;
  description?: string;
  var1?: string;
  var2?: string;
  var3?: string;
  customer?: { email?: string; first_name?: string; last_name?: string };
};

type MspEnvelope<T> = {
  success?: boolean;
  data?: T;
  error_code?: number;
  error_info?: string;
};

function apiKey(): string {
  const key = process.env.MULTISAFEPAY_API_KEY?.trim();
  if (!key) throw new Error("MULTISAFEPAY_API_KEY ontbreekt");
  return key;
}

async function mspFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, cache: "no-store" });
  const json = (await res.json()) as MspEnvelope<T>;

  if (!res.ok || json.success === false || !json.data) {
    throw new Error(json.error_info || `MultiSafepay fout (HTTP ${res.status})`);
  }
  return json.data;
}

export async function createOrder(body: Record<string, unknown>): Promise<MspOrder> {
  return mspFetch<MspOrder>(`${BASE}/orders?api_key=${encodeURIComponent(apiKey())}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function getOrder(orderId: string): Promise<MspOrder> {
  return mspFetch<MspOrder>(
    `${BASE}/orders/${encodeURIComponent(orderId)}?api_key=${encodeURIComponent(apiKey())}`,
    { headers: { "Content-Type": "application/json" } },
  );
}
