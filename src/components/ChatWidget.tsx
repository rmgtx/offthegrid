import { useState, useEffect, useRef, useCallback } from "react";
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
    text: "I can help you find out if your home qualifies.",
  },
  {
    role: "assistant",
    text: "It only takes a couple minutes — let's start with a few quick questions. Are you a homeowner?",
  },
];

// Streamlined chat flow questions
const FLOW_QUESTIONS: string[] = [
  "Great! Do you live in the Houston area — for example, in the CenterPoint service area?",
  "Got it! Can you tell me about how much you're spending each month on your utilities?",
  "Thanks for that! Based on what you've shared, it looks like you may qualify. I'd love to connect you with one of our energy analysts who can review your home's specifics and walk you through everything. Would you like to schedule a quick call?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [flowStep, setFlowStep] = useState(0);
  const messagesEnd = useRef<HTMLDivElement>(null);

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

  // Listen for custom open event from CTA buttons — expand to 1/3 page
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setExpanded(true);
      setMinimized(false);
    };
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    // Streamlined flow responses
    const currentStep = flowStep;
    if (currentStep < FLOW_QUESTIONS.length) {
      setFlowStep(currentStep + 1);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: FLOW_QUESTIONS[currentStep] },
        ]);
      }, 1200);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Really appreciate you sharing that. Let me pull up a few options based on what you've told me — one sec.",
          },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              text: "Okay so based on your area and usage, it looks like your home could be a great fit. I'd love to have one of our energy analysts take a closer look and walk you through everything — they can get a lot more specific to your situation. Want me to set that up?",
            },
          ]);
        }, 2000);
      }, 1200);
    }
  }, [input, flowStep]);

  // Close or minimize: collapse back to bubble
  const handleClose = () => {
    setOpen(false);
    setExpanded(false);
    setMinimized(false);
  };

  const handleMinimize = () => {
    if (minimized) {
      setMinimized(false);
    } else {
      setMinimized(true);
      setExpanded(false);
    }
  };

  // Compute dimensions
  const width = expanded ? "33vw" : 360;
  const minWidth = expanded ? 360 : 320;
  const height = expanded ? "70vh" : 580;

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
                Want to see if your home qualifies for whole-home battery backup?
              </p>
            </motion.div>

            <button
              onClick={() => setOpen(true)}
              className="w-14 h-14 rounded-full bg-amber hover:bg-amber-dark text-navy shadow-[0_4px_20px_rgba(229,169,61,0.4)] hover:shadow-[0_4px_30px_rgba(229,169,61,0.5)] flex items-center justify-center transition-all"
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
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex flex-col bg-[#141414] border border-white/[0.06] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
            style={{
              width: minimized ? 360 : width,
              minWidth,
              maxWidth: "calc(100vw - 2rem)",
              height: minimized ? "auto" : height,
              maxHeight: minimized ? "auto" : "calc(100svh - 3rem)",
              transition: "width 0.3s ease, height 0.3s ease",
            }}
          >
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
                onClick={handleMinimize}
                className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
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
