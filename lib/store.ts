export type Msg = { id: string; kind: "bug" | "idea" | "other"; name: string; text: string; ts: number };

const KEY = "tg-ext-feedback";
const MAX = 200;
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// Запасное хранилище в памяти (на Vercel сбрасывается; для постоянного — подключи Upstash Redis)
const g = globalThis as unknown as { __msgs?: Msg[] };
const mem = (g.__msgs ??= []);

async function redis(cmds: unknown[][]) {
  const r = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
    cache: "no-store",
  });
  if (!r.ok) throw new Error("redis " + r.status);
  return (await r.json()) as { result: unknown }[];
}

export async function list(): Promise<Msg[]> {
  if (url && token) {
    const [res] = await redis([["LRANGE", KEY, 0, MAX - 1]]);
    return (res.result as string[]).map((s) => JSON.parse(s)).reverse();
  }
  return [...mem];
}

export async function add(m: Msg) {
  if (url && token) {
    await redis([["LPUSH", KEY, JSON.stringify(m)], ["LTRIM", KEY, 0, MAX - 1]]);
    return;
  }
  mem.push(m);
  if (mem.length > MAX) mem.splice(0, mem.length - MAX);
}
