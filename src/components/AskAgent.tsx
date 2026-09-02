"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, Sparkles, Loader2 } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = ["What do you work on?", "What's your tech stack?", "How do I get in touch?"];

const INTRO: ChatMessage = {
  role: "assistant",
  content:
    "Hey — I'm Khangai's portfolio assistant. Ask me about his experience, projects, stack, or how to reach him.",
};

export default function AskAgent() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.filter((m) => m !== INTRO) }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        aria-label={open ? "Close chat" : "Ask about Khangai"}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-cyan-400 text-[#040d1a] font-bold text-sm shadow-xl shadow-cyan-400/30 hover:bg-cyan-300 hover:shadow-cyan-400/50 transition-all duration-200"
      >
        {open ? <X size={18} /> : <Sparkles size={18} />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask about me"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[560px] flex flex-col rounded-2xl border border-[#122440] bg-[#0c1f3a] shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#122440] bg-[#071428]">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                <Sparkles size={16} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Ask about Khangai</p>
                <p className="text-xs text-slate-500">AI assistant · trained on his portfolio</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] text-sm leading-relaxed rounded-2xl px-4 py-2.5 ${
                    m.role === "user"
                      ? "self-end bg-cyan-400 text-[#040d1a] font-medium rounded-br-sm"
                      : "self-start bg-[#071428] border border-[#1a3a5c] text-slate-300 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="self-start flex items-center gap-2 text-slate-500 text-xs px-2">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking...
                </div>
              )}
              {error && (
                <div className="self-start max-w-[85%] text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
                  {error}
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#071428] border border-[#1a3a5c] text-slate-400 hover:border-cyan-400/40 hover:text-cyan-400 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 p-3 border-t border-[#122440] bg-[#071428]"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                maxLength={1000}
                disabled={loading}
                autoFocus
                className="flex-1 bg-[#0c1f3a] border border-[#1a3a5c] rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-400 text-[#040d1a] hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
