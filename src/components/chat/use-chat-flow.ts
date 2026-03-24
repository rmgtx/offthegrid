import { useState, useCallback, useRef, useEffect } from "react";
import type { Message, FlowDefinition } from "./types";

export const DEFAULT_FLOW: FlowDefinition = {
  greeting: [
    {
      role: "assistant",
      text: "I can help you find out if your home qualifies.",
    },
    {
      role: "assistant",
      text: "It only takes a couple minutes \u2014 let\u2019s start with a few quick questions. Are you a homeowner?",
    },
  ],
  greetingReplies: ["Yes, I own my home", "No, I rent"],
  steps: [
    {
      question:
        "Great! About how much are you spending each month on your electric bill?",
      quickReplies: ["Under $80", "$80 \u2013 $150", "$150 \u2013 $250", "$250+"],
    },
    {
      question: "Got it! And what\u2019s your zip code?",
    },
    {
      question:
        "Thanks for that! Based on what you\u2019ve shared, it looks like you may qualify. I\u2019d love to connect you with one of our energy analysts who can review your home\u2019s specifics and walk you through everything. Would you like to schedule a quick call?",
      quickReplies: ["Yes, let\u2019s do it!", "Not right now"],
    },
  ],
  postFlowResponses: [
    "Really appreciate you sharing that. Let me pull up a few options based on what you\u2019ve told me \u2014 one sec.",
    "Okay so based on your area and usage, it looks like your home could be a great fit. I\u2019d love to have one of our energy analysts take a closer look and walk you through everything \u2014 they can get a lot more specific to your situation. Want me to set that up?",
  ],
  typingDelayMs: 1200,
  postFlowGapMs: 2000,
};

export interface ChatFlowState {
  readonly messages: readonly Message[];
  readonly quickReplies: readonly string[] | undefined;
  readonly isTyping: boolean;
  readonly isComplete: boolean;
}

export interface ChatFlowActions {
  submit: (text: string) => void;
  reset: () => void;
}

export function useChatFlow(
  flow: FlowDefinition = DEFAULT_FLOW,
): [ChatFlowState, ChatFlowActions] {
  const [messages, setMessages] = useState<Message[]>([...flow.greeting]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const typingDelay = flow.typingDelayMs ?? 1200;
  const postFlowGap = flow.postFlowGapMs ?? 2000;

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Derive quick replies from current step (undefined when typing or complete)
  const quickReplies =
    isTyping || isComplete
      ? undefined
      : currentStep === 0
        ? flow.greetingReplies
        : currentStep <= flow.steps.length
          ? flow.steps[currentStep - 1].quickReplies
          : undefined;

  const submit = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping || isComplete) return;

      const step = currentStep;

      // Add user message + typing indicator
      setMessages((prev) => [
        ...prev,
        { role: "user", text },
        { role: "assistant", text: "", typing: true },
      ]);
      setIsTyping(true);

      if (step < flow.steps.length) {
        // Show next question after typing delay
        const timer = setTimeout(() => {
          setMessages((prev) =>
            prev
              .filter((m) => !m.typing)
              .concat({ role: "assistant", text: flow.steps[step].question }),
          );
          setCurrentStep(step + 1);
          setIsTyping(false);
        }, typingDelay);
        timersRef.current.push(timer);
      } else {
        // Post-flow: show responses in sequence
        const timer1 = setTimeout(() => {
          setMessages((prev) =>
            prev
              .filter((m) => !m.typing)
              .concat({
                role: "assistant",
                text: flow.postFlowResponses[0],
              }),
          );

          if (flow.postFlowResponses.length > 1) {
            const timer2 = setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                ...flow.postFlowResponses.slice(1).map((t) => ({
                  role: "assistant" as const,
                  text: t,
                })),
              ]);
              setIsTyping(false);
              setIsComplete(true);
            }, postFlowGap);
            timersRef.current.push(timer2);
          } else {
            setIsTyping(false);
            setIsComplete(true);
          }
        }, typingDelay);
        timersRef.current.push(timer1);
      }
    },
    [currentStep, isTyping, isComplete, flow, typingDelay, postFlowGap],
  );

  const reset = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setMessages([...flow.greeting]);
    setCurrentStep(0);
    setIsTyping(false);
    setIsComplete(false);
  }, [flow]);

  return [{ messages, quickReplies, isTyping, isComplete }, { submit, reset }];
}
