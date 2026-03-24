import { useState, useEffect } from "react";
import type { TeaserPhase, TeaserConfig } from "./types";

const DEFAULT_TEXT: Record<string, string> = {
  initial:
    "Want to see if your home qualifies for whole-home battery backup?",
  nudge:
    "Just tap here when you\u2019re ready for me to check your eligibility!",
  remind:
    "Want to see if your home qualifies for whole-home battery backup?",
};

export interface TeaserState {
  /** Whether the floating button should be visible */
  readonly bubbleVisible: boolean;
  /** Current lifecycle phase (exposed for animation keying) */
  readonly phase: TeaserPhase;
  /** Text to display in the teaser tooltip, or undefined if hidden */
  readonly text: string | undefined;
}

export function useTeaser(
  config?: TeaserConfig,
  suppressed?: boolean,
): TeaserState {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [phase, setPhase] = useState<TeaserPhase>("initial");

  const appearDelay = config?.appearDelayMs ?? 2000;
  const scrollThreshold = config?.scrollThreshold ?? 0.8;
  const visibleDuration = config?.visibleDurationMs ?? 6000;
  const remindDelay = config?.remindDelayMs ?? 30000;
  const autoNudge = config?.autoNudgeMs ?? 10000;
  const textMap = { ...DEFAULT_TEXT, ...config?.text };

  // Show bubble after initial delay
  useEffect(() => {
    const timer = setTimeout(() => setBubbleVisible(true), appearDelay);
    return () => clearTimeout(timer);
  }, [appearDelay]);

  // Phase state machine
  useEffect(() => {
    if (phase === "initial") {
      let scrollTimer: ReturnType<typeof setTimeout> | null = null;

      const onScroll = () => {
        if (window.scrollY > window.innerHeight * scrollThreshold) {
          setPhase("nudge");
          scrollTimer = setTimeout(
            () => setPhase("hidden"),
            visibleDuration,
          );
        }
      };

      const autoTimer = setTimeout(() => {
        setPhase("nudge");
        setTimeout(() => setPhase("hidden"), visibleDuration);
      }, autoNudge);

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        clearTimeout(autoTimer);
        if (scrollTimer) clearTimeout(scrollTimer);
        window.removeEventListener("scroll", onScroll);
      };
    }

    if (phase === "hidden") {
      const timer = setTimeout(() => {
        if (!suppressed) setPhase("remind");
      }, remindDelay);
      return () => clearTimeout(timer);
    }

    if (phase === "remind") {
      const timer = setTimeout(() => setPhase("done"), visibleDuration);
      return () => clearTimeout(timer);
    }
  }, [phase, suppressed, scrollThreshold, visibleDuration, remindDelay, autoNudge]);

  const showTeaser =
    phase === "initial" || phase === "nudge" || phase === "remind";

  return {
    bubbleVisible,
    phase,
    text: showTeaser ? textMap[phase] : undefined,
  };
}
