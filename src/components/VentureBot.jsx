"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "@gravity-ui/icons";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const QUICK_PROMPTS = [
  "Pitch my startup",
  "Find opportunities",
  "Premium benefits",
  "Hire collaborators",
];

const GREETING = {
  role: "assistant",
  content:
    "Hello! I'm your VentureConnect assistant. How can I help you with startups, opportunities, or funding today?",
};

function BotMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l5-6 4 4 5-7 4 5" />
      <circle cx="8" cy="11" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="17" cy="8" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function VentureBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history: next.slice(-9, -1) }),
      });
      const data = await res.json();
      if (!res.ok || !data?.reply) throw new Error(data?.message || "No reply");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I can't reach the assistant service right now. Try sending that again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes vb-panel-in {
          from { opacity: 0; transform: translateY(24px) scale(.94); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes vb-msg-in  { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes vb-chip-in { from { opacity: 0; transform: translateY(8px); }  to { opacity: 1; transform: translateY(0); } }
        @keyframes vb-ring    { 0% { transform: scale(1); opacity: .5; } 70%,100% { transform: scale(1.9); opacity: 0; } }
        @keyframes vb-dot     { 0%,60%,100% { transform: translateY(0); opacity: .45; } 30% { transform: translateY(-5px); opacity: 1; } }
        @keyframes vb-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .vb-spin-slow { animation: vb-spin-slow 6s linear infinite; }
        .vb-panel { animation: vb-panel-in .38s cubic-bezier(.16,1,.3,1) both; transform-origin: bottom right; }
        .vb-msg   { animation: vb-msg-in .32s cubic-bezier(.16,1,.3,1) both; }
        .vb-chip  { animation: vb-chip-in .3s cubic-bezier(.16,1,.3,1) both; }
        .vb-ring  { animation: vb-ring 2.4s ease-out infinite; }
        .vb-dot   { animation: vb-dot 1.1s ease-in-out infinite; }
        .vb-scroll::-webkit-scrollbar { width: 6px; }
        .vb-scroll::-webkit-scrollbar-thumb { background: rgba(100,116,139,.3); border-radius: 99px; }
        .vb-scroll::-webkit-scrollbar-track { background: transparent; }
        .vb-hide::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .vb-panel, .vb-msg, .vb-chip, .vb-ring, .vb-dot, .vb-spin-slow { animation: none !important; }
        }
      `}</style>

      {/* ── Panel ──────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="VentureBot assistant"
          className="vb-panel fixed bottom-24 right-4 z-[60] flex h-[500px] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 sm:right-6 dark:border-white/10 dark:bg-[#0a0d1c] dark:shadow-black/70"
        >
          {/* Header */}
          <header className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-4 py-3.5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-indigo-600 shadow-md">
              <Star size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-[15px] font-semibold tracking-tight text-white">VentureBot</h2>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium text-white/90 ring-1 ring-white/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Analyst
                </span>
              </div>
              <p className="truncate text-xs text-white/70">Your startup and funding copilot</p>
            </div>

            <button
              onClick={() => { setMessages([GREETING]); setInput(""); }}
              aria-label="Start a new chat"
              className="rounded-lg p-1.5 text-white/75 transition-all duration-300 hover:rotate-180 hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
              </svg>
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-white/75 transition hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="vb-scroll flex-1 space-y-4 overflow-y-auto bg-slate-50/60 px-4 py-4 dark:bg-transparent">
            <div className="vb-msg rounded-2xl border border-indigo-200 bg-indigo-50 p-3.5 dark:border-indigo-400/20 dark:bg-indigo-500/[0.07]">
              <div className="mb-1.5 flex items-center gap-2 text-indigo-600 dark:text-indigo-300">
                <Star width={14} height={14} />
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  VentureConnect startup assistant
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                Share your startup stage, industry, or the skills you bring — I&apos;ll match you with the
                right investors, roles, and next steps.
              </p>
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                style={{ animationDelay: `${Math.min(i, 3) * 60}ms` }}
                className={`vb-msg flex items-start gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-400/25">
                    <BotMark size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/20 dark:shadow-indigo-900/30"
                      : "rounded-bl-md bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-white/[0.06] dark:text-slate-200 dark:ring-white/[0.06]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="vb-msg flex items-start gap-2.5">
                <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-400/25">
                  <BotMark size={16} />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 ring-1 ring-slate-200 dark:bg-white/[0.06] dark:ring-white/[0.06]">
                  {[0, 140, 280].map((d) => (
                    <span key={d} style={{ animationDelay: `${d}ms` }} className="vb-dot h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          {messages.length === 1 && !loading && (
            <div className="vb-hide flex gap-2 overflow-x-auto bg-slate-50/60 px-4 pb-3 [scrollbar-width:none] dark:bg-transparent">
              {QUICK_PROMPTS.map((q, i) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  style={{ animationDelay: `${180 + i * 70}ms` }}
                  className="vb-chip flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-500/15 dark:hover:text-white"
                >
                  <Star width={12} height={12} className="text-indigo-500 dark:text-indigo-300" />
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <div className="border-t border-slate-200 bg-white p-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
            <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 transition-all duration-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-white/10 dark:bg-[#0f1430] dark:focus-within:border-indigo-400/60">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
                }}
                placeholder="Ask about startups, roles, or funding…"
                className="max-h-24 flex-1 resize-none bg-transparent px-2.5 py-1.5 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white transition duration-200 hover:scale-105 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Launcher ───────────────────────────────────────── */}
      <div className="fixed bottom-6 right-4 z-[60] sm:right-6">
        {!open && <span className="vb-ring absolute inset-0 rounded-full bg-indigo-500" />}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close VentureBot" : "Open VentureBot"}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-600/30 transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:shadow-indigo-900/50"
        >
          <span className={`transition-transform duration-300 ${open ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}>
            <span className={`block ${open ? "" : "vb-spin-slow"}`}>
              <Star width={24} height={24} />
            </span>
          </span>
          <span className={`absolute transition-transform duration-300 ${open ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}