import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowLeft } from "lucide-react";
import { BatteryChargingVertical } from "@phosphor-icons/react";
import { useN8nChat } from "./use-n8n-chat";
import { useTeaser } from "./use-teaser";
import type { Message } from "./types";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);

  const teaser = useTeaser(undefined, open);
  const [flow, actions] = useN8nChat();

  // Listen for custom open event from CTA buttons
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [flow.messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    actions.submit(input.trim());
    setInput("");
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Floating trigger button + teaser bubble */}
      <AnimatePresence>
        {teaser.bubbleVisible && !open && (
          <motion.div
            className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-end gap-3"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Prompt bubble — hidden on small screens, transitions through phases */}
            <AnimatePresence mode="wait">
              {teaser.text && (
                <motion.div
                  key={teaser.phase}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="hidden min-[400px]:block bg-[#1A1A1A] border border-white/[0.06] rounded-2xl rounded-br-md shadow-[0_8px_30px_rgba(0,0,0,0.3)] px-4 py-3 max-w-[220px]"
                >
                  <p className="font-body text-sm text-white/90 leading-snug">
                    {teaser.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setOpen(true)}
              className="w-14 h-14 rounded-full bg-emerald hover:bg-emerald/90 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.5)] flex items-center justify-center transition-all shrink-0"
              aria-label="Open chat"
            >
              <BatteryChargingVertical size={26} weight="bold" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile: full-screen chat — z-[70] to sit above ribbon (z-[60]) */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-[70] flex flex-col bg-[#0F0F0F] sm:hidden"
              style={{ height: "100dvh" }}
            >
              <ChatContent
                messages={flow.messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                handleClose={handleClose}
                messagesEnd={messagesEnd}
                isMobile
                quickReplies={flow.quickReplies}
                onQuickReply={actions.submit}
              />
            </motion.div>

            {/* Desktop: floating bottom-right card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-6 right-6 z-50 hidden sm:flex flex-col bg-[#0F0F0F] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{
                width: 380,
                height: 580,
                maxHeight: "calc(100svh - 3rem)",
              }}
            >
              <ChatContent
                messages={flow.messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                handleClose={handleClose}
                messagesEnd={messagesEnd}
                quickReplies={flow.quickReplies}
                onQuickReply={actions.submit}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/** Typing indicator dots */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

/** Quick-reply pill buttons */
function QuickReplyButtons({
  options,
  onSelect,
}: {
  options: readonly string[];
  onSelect: (text: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="flex flex-wrap gap-2 pl-1"
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="px-4 py-2 rounded-full font-body text-sm border border-emerald/40 text-emerald bg-emerald/10 hover:bg-emerald/20 hover:border-emerald/60 active:scale-95 transition-all cursor-pointer"
        >
          {opt}
        </button>
      ))}
    </motion.div>
  );
}

/** Shared chat content rendered inside both mobile and desktop containers */
function ChatContent({
  messages,
  input,
  setInput,
  handleSend,
  handleClose,
  messagesEnd,
  isMobile,
  quickReplies,
  onQuickReply,
}: {
  messages: readonly Message[];
  input: string;
  setInput: (v: string) => void;
  handleSend: () => void;
  handleClose: () => void;
  messagesEnd: React.RefObject<HTMLDivElement | null>;
  isMobile?: boolean;
  quickReplies: readonly string[] | undefined;
  onQuickReply: (text: string) => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 bg-emerald shrink-0">
        {isMobile && (
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors mr-1"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
          <BatteryChargingVertical
            size={18}
            weight="bold"
            className="text-white"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading font-semibold text-white text-sm">
            Energy Analyst
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Online now
          </div>
        </div>
        {!isMobile && (
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3 bg-[#0F0F0F]">
        {messages.map((msg, i) =>
          msg.typing ? (
            <motion.div
              key={`typing-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl rounded-tl-md shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                <TypingDots />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl max-w-[85%] font-body text-sm ${
                  msg.role === "user"
                    ? "bg-emerald text-white rounded-tr-md"
                    : "bg-[#1A1A1A] text-white/80 border border-white/[0.06] rounded-tl-md shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ),
        )}

        {/* Quick-reply buttons */}
        {quickReplies && (
          <QuickReplyButtons options={quickReplies} onSelect={onQuickReply} />
        )}

        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div
        className="px-4 py-3 border-t border-white/[0.06] bg-[#141414] shrink-0"
        style={{
          paddingBottom: isMobile
            ? "max(0.75rem, env(safe-area-inset-bottom))"
            : undefined,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            aria-label="Type a message"
            className="flex-1 font-body text-sm text-white bg-[#1A1A1A] border border-white/[0.08] rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald/50 placeholder:text-white/30"
          />
          <button
            type="submit"
            className="bg-emerald hover:bg-emerald/90 text-white rounded-full w-10 h-10 shrink-0 flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
