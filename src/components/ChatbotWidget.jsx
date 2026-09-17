"use client";

import { useState, useRef, useEffect } from "react";
import { Star } from "@gravity-ui/icons";
import { X, RefreshCw, Send, Sparkles } from "lucide-react";

const QUICK_PROMPTS = [
  { label: "Find investors", prompt: "How do I find the right investors for my startup?" },
  { label: "Pitch tips", prompt: "Give me tips to make my pitch deck stand out." },
  { label: "Browse startups", prompt: "How can I browse and evaluate startups as an investor?" },
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hello! I'm VentureConnect AI, your startup & investor matching companion. Ask me about pitching, finding investors, browsing opportunities, or how the platform works.",
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
  };

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.filter((m) => m !== WELCOME_MESSAGE),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, I couldn't process that." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
      {/* CHAT PANEL */}
      {isOpen && (
        <div className="flex h-[560px] w-[360px] max-w-[92vw] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0F] shadow-2xl shadow-purple-900/40 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-gradient-to-br from-violet-600 to-fuchsia-500 px-4 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <Star className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  VentureConnect AI
                </p>
                <p className="truncate text-[11px] text-white/80">
                  Your startup &amp; investor matching companion
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={resetChat}
                aria-label="Reset chat"
                className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <RefreshCw className="size-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[#0B0B0F] px-4 py-4"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}

            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
                  <Star className="size-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 px-4 py-3">
                  <span className="flex gap-1">
                    <span className="size-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-gray-400" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q.label}
                  onClick={() => sendMessage(q.prompt)}
                  className="flex shrink-0 items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300 transition hover:bg-violet-500/20"
                >
                  <Sparkles className="size-3" />
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-white/10 bg-[#0B0B0F] px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pitching, investors, deals..."
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-violet-500/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white transition disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-600/40 transition hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="size-6" /> : <Star className="size-6" />}
      </button>
    </div>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
          <Star className="size-3.5" />
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "rounded-br-sm bg-purple-600 text-white"
            : "rounded-tl-sm border border-white/10 bg-white/5 text-gray-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}