import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "assistant" | "user";
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Hey there! I can help you find out if your home qualifies for up to 12 free backup batteries and solar panels.",
  },
  {
    role: "assistant",
    text: "It only takes a couple minutes. Want to see if you're eligible?",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [size, setSize] = useState({ w: 360, h: 580 });
  const messagesEnd = useRef<HTMLDivElement>(null);
  const resizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // Resize drag handlers
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!resizing.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dx = resizeStart.current.x - clientX;
      const dy = resizeStart.current.y - clientY;
      setSize({
        w: Math.max(320, Math.min(window.innerWidth - 48, resizeStart.current.w + dx)),
        h: Math.max(400, Math.min(window.innerHeight - 48, resizeStart.current.h + dy)),
      });
    };
    const onUp = () => { resizing.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const startResize = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    resizing.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    resizeStart.current = { x: clientX, y: clientY, w: size.w, h: size.h };
  };

  // Show chat bubble after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-open chat after bubble shows
  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => setOpen(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [showBubble]);

  // Listen for custom open event from CTA button
  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    // Simulated assistant response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Thanks for that! To get you the most accurate information, I'd love to connect you with one of our energy analysts. They can review your home's specifics and walk you through everything — every home is a little different. Would you like to schedule a quick call?",
        },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Prompt bubble */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl rounded-br-md shadow-[0_8px_30px_rgba(0,0,0,0.3)] px-4 py-3 max-w-[220px]"
            >
              <p className="font-body text-sm text-white/90 leading-snug">
                Want to see if your home qualifies for free batteries?
              </p>
            </motion.div>

            <button
              onClick={() => setOpen(true)}
              className="w-14 h-14 rounded-full bg-amber hover:bg-amber-dark text-navy shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.5)] flex items-center justify-center transition-all"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: undefined,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 max-w-[calc(100vw-2rem)] flex flex-col bg-[#141414] border border-white/[0.06] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
            style={{
              width: size.w,
              height: minimized ? "auto" : size.h,
              maxHeight: minimized ? "auto" : "calc(100svh - 3rem)",
            }}
          >
            {/* Resize handle — top-left corner */}
            <div
              onMouseDown={startResize}
              onTouchStart={startResize}
              className="absolute top-0 left-0 z-20 w-5 h-5 cursor-nw-resize group"
            >
              <svg viewBox="0 0 20 20" className="w-full h-full text-white/20 group-hover:text-white/40 transition-colors">
                <line x1="4" y1="14" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" />
                <line x1="4" y1="9" x2="9" y2="4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-navy">
              <div className="w-9 h-9 rounded-full bg-amber/15 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-amber" />
              </div>
              <div className="flex-1">
                <div className="font-heading font-semibold text-white text-sm">
                  Energy Analyst
                </div>
                <div className="flex items-center gap-1.5 font-body text-xs text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                  Online now
                </div>
              </div>
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-[#0F0F0F]">
                  {messages.map((msg, i) => (
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
                        className={`px-4 py-2.5 rounded-2xl max-w-[85%] ${
                          msg.role === "user"
                            ? "bg-amber text-navy rounded-tr-md font-body text-sm"
                            : "bg-[#1E1E1E] text-white/80 border border-white/[0.06] rounded-tl-md font-body text-sm shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEnd} />
                </div>

                {/* Input */}
                <div className="px-4 py-3 border-t border-white/[0.06] bg-[#141414]">
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
                      className="flex-1 font-body text-sm bg-secondary/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber/50 placeholder:text-muted-foreground"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="bg-amber hover:bg-amber-dark text-navy rounded-xl w-10 h-10 shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
