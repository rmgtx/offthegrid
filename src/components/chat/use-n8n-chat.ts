import { useState, useCallback, useRef } from "react";
import type { Message } from "./types";

const WEBHOOK_URL =
  "https://goodhelpai.app.n8n.cloud/webhook/3753a5c8-19f0-4bef-9756-f959a4b2e379/chat";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  text: "Hey there! Thanks for reaching out. Are you looking to schedule your free home assessment, or are you looking to get more information?",
};

export interface N8nChatState {
  readonly messages: readonly Message[];
  readonly quickReplies: readonly string[] | undefined;
  readonly isTyping: boolean;
  readonly isComplete: boolean;
}

export interface N8nChatActions {
  submit: (text: string) => void;
  reset: () => void;
}

export function useN8nChat(): [N8nChatState, N8nChatActions] {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const sessionIdRef = useRef(crypto.randomUUID());
  const abortRef = useRef<AbortController | null>(null);

  const submit = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      setMessages((prev) => [
        ...prev,
        { role: "user", text },
        { role: "assistant", text: "", typing: true },
      ]);
      setIsTyping(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: sessionIdRef.current,
          chatInput: text.trim(),
        }),
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const output =
            data.output ??
            data.text ??
            "Sorry, something went wrong. Please try again.";

          setMessages((prev) =>
            prev
              .filter((m) => !m.typing)
              .concat({ role: "assistant", text: output }),
          );
          setIsTyping(false);
        })
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === "AbortError") return;
          setMessages((prev) =>
            prev
              .filter((m) => !m.typing)
              .concat({
                role: "assistant",
                text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
              }),
          );
          setIsTyping(false);
        });
    },
    [isTyping],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    sessionIdRef.current = crypto.randomUUID();
    setMessages([INITIAL_MESSAGE]);
    setIsTyping(false);
  }, []);

  return [
    { messages, quickReplies: undefined, isTyping, isComplete: false },
    { submit, reset },
  ];
}
