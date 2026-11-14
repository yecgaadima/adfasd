'use client';

import { useEffect, useRef, useState } from "react";

type Msg = { id: string; kind: "bug" | "idea" | "other"; name: string; text: string; ts: number };
const LABEL = { bug: "🐞 Ошибка", idea: "💡 Идея", other: "💬 Другое" } as const;

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [kind, setKind] = useState<Msg["kind"]>("bug");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const count = useRef(0);

  async function load() {
    try {
      const r = await fetch("/api/messages", { cache: "no-store" });
      if (r.ok) setMsgs(await r.json());
    } catch {}
  }
  useEffect(() => {
    setName(localStorage.getItem("chat-name") ?? "");
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (msgs.length !== count.current) bottom.current?.scrollIntoView({ behavior: "smooth" });
    count.current = msgs.length;
  }, [msgs]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true); setErr("");
    localStorage.setItem("chat-name", name);
    const r = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, name, kind }),
    });
    setBusy(false);
    if (r.ok) { setText(""); load(); } else setErr((await r.json().catch(() => ({}))).error ?? "Ошибка отправки");
  }

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 px-4 py-3">
        <h1 className="text-lg font-semibold">Расширение для Telegram — баги и идеи</h1>
        <p className="text-xs text-neutral-400">Без регистрации. Опиши ошибку (что делал, что случилось) или предложи доработку.</p>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {msgs.length === 0 && <p className="text-center text-sm text-neutral-500">Пока пусто — напиши первым</p>}
        {msgs.map((m) => (
          <div key={m.id} className="rounded-xl bg-neutral-900 p-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span><b className="text-neutral-200">{m.name}</b> · {LABEL[m.kind]}</span>
              <span>{new Date(m.ts).toLocaleString("ru-RU")}</span>
            </div>
            <p className="mt-1 whitespace-pre-wrap break-words text-sm">{m.text}</p>
          </div>
        ))}
        <div ref={bottom} />
      </div>
      <form onSubmit={send} className="space-y-2 border-t border-neutral-800 p-3">
        <div className="flex gap-2">
          <select value={kind} onChange={(e) => setKind(e.target.value as Msg["kind"])} className="rounded-lg bg-neutral-900 px-2 py-2 text-sm">
            <option value="bug">🐞 Ошибка</option><option value="idea">💡 Идея</option><option value="other">💬 Другое</option>
          </select>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={30} placeholder="Имя (необязательно)" className="min-w-0 flex-1 rounded-lg bg-neutral-900 px-3 py-2 text-sm outline-none" />
        </div>
        <div className="flex gap-2">
          <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={2000} rows={2} placeholder="Сообщение…" className="min-w-0 flex-1 resize-none rounded-lg bg-neutral-900 px-3 py-2 text-sm outline-none"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e as unknown as React.FormEvent); } }} />
          <button disabled={busy} className="rounded-lg bg-white px-4 text-sm font-semibold text-black disabled:opacity-50">Отправить</button>
        </div>
        {err && <p className="text-xs text-red-400">{err}</p>}
      </form>
    </div>
  );
}
