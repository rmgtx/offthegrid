export interface Message {
  readonly role: "assistant" | "user";
  readonly text: string;
  readonly typing?: boolean;
}

export interface FlowStep {
  /** The assistant's question text for this step */
  readonly question: string;
  /** Quick-reply pill options. undefined = free-text only */
  readonly quickReplies?: readonly string[];
}

export interface FlowDefinition {
  /** Messages shown when the chat first opens (before user input) */
  readonly greeting: readonly Message[];
  /** Quick-reply options for the greeting question */
  readonly greetingReplies?: readonly string[];
  /** Ordered sequence of lead-qualification steps */
  readonly steps: readonly FlowStep[];
  /** Responses shown after all steps are exhausted (shown in order) */
  readonly postFlowResponses: readonly string[];
  /** Simulated typing delay in ms (default: 1200) */
  readonly typingDelayMs?: number;
  /** Delay between consecutive post-flow messages in ms (default: 2000) */
  readonly postFlowGapMs?: number;
}

export type TeaserPhase = "initial" | "nudge" | "hidden" | "remind" | "done";

export interface TeaserConfig {
  /** Delay before bubble appears on page (default: 2000) */
  readonly appearDelayMs?: number;
  /** Scroll threshold as fraction of viewport height to trigger nudge (default: 0.8) */
  readonly scrollThreshold?: number;
  /** How long each teaser phase shows before hiding (default: 6000) */
  readonly visibleDurationMs?: number;
  /** Delay before the reminder re-appears (default: 30000) */
  readonly remindDelayMs?: number;
  /** Time before auto-transitioning from initial to nudge (default: 10000) */
  readonly autoNudgeMs?: number;
  /** Text content per phase. Phases not listed use defaults. */
  readonly text?: Partial<Record<TeaserPhase, string>>;
}
