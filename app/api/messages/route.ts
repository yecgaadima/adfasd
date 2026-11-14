import { NextResponse } from "next/server";
import { add, list, Msg } from "../../../lib/store";

export const dynamic = "force-dynamic";

const last = new Map<string, number>();

export async function GET() {
  return NextResponse.json(await list(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "x";
  const now = Date.now();
  if (now - (last.get(ip) ?? 0) < 3000) {
    return NextResponse.json({ error: "Слишком часто, подожди пару секунд" }, { status: 429 });
  }
  const b = await req.json().catch(() => null);
  const text = String(b?.text ?? "").trim().slice(0, 2000);
  if (!text) return NextResponse.json({ error: "Пустое сообщение" }, { status: 400 });
  if (b?.website) return NextResponse.json({ ok: true }); // honeypot для ботов
  const kind = ["bug", "idea", "other"].includes(b?.kind) ? b.kind : "other";
  const name = String(b?.name ?? "").trim().slice(0, 30) || "Аноним";
  last.set(ip, now);
  const m: Msg = { id: crypto.randomUUID(), kind, name, text, ts: now };
  await add(m);
  return NextResponse.json(m);
}
