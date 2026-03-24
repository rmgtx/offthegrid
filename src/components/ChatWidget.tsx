import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowLeft } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  text: string;
  typing?: boolean;
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
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [flowStep, setFlowStep] = useState(0);
  const messagesEnd = useRef<HTMLDivElement>(null);

  // Show chat bubble after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for custom open event from CTA buttons
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

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    // Show typing indicator
    const currentStep = flowStep;
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "", typing: true },
    ]);

    if (currentStep < FLOW_QUESTIONS.length) {
      setFlowStep(currentStep + 1);
      setTimeout(() => {
        setMessages((prev) =>
          prev
            .filter((m) => !m.typing)
            .concat({ role: "assistant", text: FLOW_QUESTIONS[currentStep] })
        );
      }, 1200);
    } else {
      setTimeout(() => {
        setMessages((prev) =>
          prev
            .filter((m) => !m.typing)
            .concat({
              role: "assistant",
              text: "Really appreciate you sharing that. Let me pull up a few options based on what you've told me — one sec.",
            })
        );
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Floating trigger button + teaser bubble */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-end gap-3"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Prompt bubble — hidden on small screens */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden min-[400px]:block bg-[#1e91d6] rounded-2xl rounded-br-md shadow-[0_8px_30px_rgba(30,145,214,0.25)] px-4 py-3 max-w-[220px]"
            >
              <p className="font-body text-sm text-white/90 leading-snug">
                Want to see if your home qualifies for whole-home battery
                backup?
              </p>
            </motion.div>

            <button
              onClick={() => setOpen(true)}
              className="w-14 h-14 rounded-full bg-emerald hover:bg-emerald/90 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.5)] flex items-center justify-center transition-all shrink-0"
              aria-label="Open chat"
            >
              <i className="fi fi-ts-smile-beam text-[22px] leading-none" />
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
                messages={messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                handleClose={handleClose}
                messagesEnd={messagesEnd}
                isMobile
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
                messages={messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                handleClose={handleClose}
                messagesEnd={messagesEnd}
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

/** Shared chat content rendered inside both mobile and desktop containers */
function ChatContent({
  messages,
  input,
  setInput,
  handleSend,
  handleClose,
  messagesEnd,
  isMobile,
}: {
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  handleSend: () => void;
  handleClose: () => void;
  messagesEnd: React.RefObject<HTMLDivElement | null>;
  isMobile?: boolean;
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
          <MessageCircle className="w-4 h-4 text-white" />
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
              <div className="bg-[#1e91d6] rounded-2xl rounded-tl-md shadow-[0_1px_4px_rgba(30,145,214,0.15)]">
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
                    : "bg-[#1e91d6] text-white rounded-tl-md shadow-[0_1px_4px_rgba(30,145,214,0.15)]"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          )
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
