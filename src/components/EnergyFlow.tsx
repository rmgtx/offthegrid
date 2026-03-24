import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function FlowArrowHorizontal({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="hidden sm:flex items-center justify-center"
    >
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" aria-hidden="true">
        <line x1="0" y1="12" x2="36" y2="12" stroke="#E5A93D" strokeWidth="2" strokeDasharray="6 4" className="animate-flow-dash" />
        <polygon points="36,6 48,12 36,18" fill="#E5A93D" />
      </svg>
    </motion.div>
  );
}

function FlowArrowVertical({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex sm:hidden items-center justify-center py-1"
    >
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" aria-hidden="true">
        <line x1="12" y1="0" x2="12" y2="22" stroke="#E5A93D" strokeWidth="2" strokeDasharray="6 4" className="animate-flow-dash" />
        <polygon points="6,22 12,32 18,22" fill="#E5A93D" />
      </svg>
    </motion.div>
  );
}

interface FlowStepProps {
  delay: number;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  accent?: boolean;
  large?: boolean;
}

function FlowStep({ delay, icon, label, sublabel, accent, large }: FlowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <div
        className={`relative rounded-3xl flex items-center justify-center mb-4 transition-all duration-300 ${
          large
            ? "w-32 h-32 sm:w-40 sm:h-40"
            : "w-24 h-24 sm:w-28 sm:h-28"
        } ${
          accent
            ? "bg-emerald/10 border-2 border-emerald/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
            : "bg-[#141414] border border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
        }`}
      >
        {icon}
      </div>
      <span className={`font-heading font-semibold text-white ${large ? "text-lg" : "text-base"}`}>
        {label}
      </span>
      <span className="font-body text-muted-foreground text-sm mt-1">
        {sublabel}
      </span>
    </motion.div>
  );
}

export default function EnergyFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 sm:mb-20"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-[1.1] mb-5">
            Simple technology.{" "}
            <span className="text-amber">Powerful protection.</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Here's how your home stays powered when the grid goes down —
            storing energy and keeping your family safe through any outage.
          </p>
        </motion.div>

        {/* Flow diagram — 4 steps, no numbers */}
        {isInView && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-12">
            {/* Grid Power */}
            <FlowStep
              delay={0.1}
              label="Grid Power"
              sublabel="Your energy source"
              icon={
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="18" y="14" width="28" height="36" rx="4" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.4" />
                  <rect x="25" y="24" width="4" height="8" rx="2" fill="#38BDF8" opacity="0.6" />
                  <rect x="35" y="24" width="4" height="8" rx="2" fill="#38BDF8" opacity="0.6" />
                  <rect x="30" y="36" width="4" height="6" rx="2" fill="#38BDF8" opacity="0.4" />
                  <path d="M30 10 L34 10 L32 16 L36 16 L28 26 L30 20 L26 20 Z" fill="#E5A93D" opacity="0.8" />
                </svg>
              }
            />

            <FlowArrowVertical delay={0.15} />
            <FlowArrowHorizontal delay={0.2} />

            {/* Generate Energy (solar) */}
            <FlowStep
              delay={0.3}
              label="Generate Energy"
              sublabel="Clean energy from the sun"
              icon={
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="10" y="18" width="44" height="30" rx="3" fill="#1E293B" stroke="#E5A93D" strokeWidth="1.5" strokeOpacity="0.4" />
                  <line x1="10" y1="28" x2="54" y2="28" stroke="#E5A93D" strokeWidth="0.8" opacity="0.3" />
                  <line x1="10" y1="38" x2="54" y2="38" stroke="#E5A93D" strokeWidth="0.8" opacity="0.3" />
                  <line x1="25" y1="18" x2="25" y2="48" stroke="#E5A93D" strokeWidth="0.8" opacity="0.3" />
                  <line x1="39" y1="18" x2="39" y2="48" stroke="#E5A93D" strokeWidth="0.8" opacity="0.3" />
                  <circle cx="50" cy="12" r="4" fill="#E5A93D" opacity="0.8" />
                  <line x1="50" y1="4" x2="50" y2="6" stroke="#E5A93D" strokeWidth="1.5" opacity="0.5" />
                  <line x1="56" y1="6" x2="55" y2="8" stroke="#E5A93D" strokeWidth="1.5" opacity="0.5" />
                  <line x1="58" y1="12" x2="56" y2="12" stroke="#E5A93D" strokeWidth="1.5" opacity="0.5" />
                  <line x1="32" y1="48" x2="32" y2="56" stroke="#38BDF8" strokeWidth="1.5" opacity="0.3" />
                  <line x1="24" y1="56" x2="40" y2="56" stroke="#38BDF8" strokeWidth="1.5" opacity="0.3" />
                </svg>
              }
            />

            <FlowArrowVertical delay={0.35} />
            <FlowArrowHorizontal delay={0.4} />

            {/* Battery Backup — LARGE + GREEN GLOW + CHARGING ANIMATION */}
            <FlowStep
              delay={0.5}
              label="Battery Backup"
              sublabel="Whole-home storage"
              accent
              large
              icon={
                <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20">
                  <rect x="16" y="12" width="32" height="44" rx="4" stroke="#10B981" strokeWidth="2.5" fill="none" />
                  <rect x="26" y="8" width="12" height="6" rx="2" fill="#10B981" />
                  <rect x="22" y="40" width="20" height="6" rx="1.5" fill="#10B981" className="animate-battery-bar-1" />
                  <rect x="22" y="31" width="20" height="6" rx="1.5" fill="#10B981" className="animate-battery-bar-2" />
                  <rect x="22" y="22" width="20" height="6" rx="1.5" fill="#10B981" className="animate-battery-bar-3" />
                </svg>
              }
            />

            <FlowArrowVertical delay={0.55} />
            <FlowArrowHorizontal delay={0.6} />

            {/* Your Home */}
            <FlowStep
              delay={0.7}
              label="Your Home"
              sublabel="Always powered"
              icon={
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="16" y="30" width="32" height="24" rx="2" fill="#1E293B" />
                  <path d="M12 32 L32 14 L52 32" stroke="#2A3A4E" strokeWidth="3" fill="#1E293B" strokeLinejoin="round" />
                  <rect x="28" y="40" width="8" height="14" rx="1" fill="#E5A93D" opacity="0.8" />
                  <rect x="20" y="36" width="6" height="6" rx="1" fill="#38BDF8" opacity="0.4" />
                  <rect x="38" y="36" width="6" height="6" rx="1" fill="#38BDF8" opacity="0.4" />
                  <rect x="29" y="41" width="6" height="12" rx="0.5" fill="#FEF3C7" opacity="0.6" />
                </svg>
              }
            />
          </div>
        )}

        {/* Benefits row — aligned to the 4 steps above */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {[
            {
              title: "Grid delivers power",
              desc: "Your home draws power from the grid like normal — but now it has somewhere to store it.",
            },
            {
              title: "Generate energy",
              desc: "Clean energy from the sun reduces your grid dependence and feeds your battery system.",
            },
            {
              title: "Batteries store backup power",
              desc: "Your battery system stores energy for when you need it most — outages, peak demand, or emergencies.",
            },
            {
              title: "Home stays powered",
              desc: "When the grid goes down, your batteries kick in automatically. Your family won't even notice.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <h3 className="font-heading font-semibold text-white text-base mb-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold text-base rounded-xl px-8 h-13"
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
            >
              See If You Qualify
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
