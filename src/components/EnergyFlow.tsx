import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function FlowArrow({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="hidden sm:flex items-center justify-center mb-14"
    >
      <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
        <line
          x1="0"
          y1="12"
          x2="48"
          y2="12"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="animate-flow-dash"
        />
        <polygon points="48,6 60,12 48,18" fill="#F59E0B" />
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
}

function FlowStep({ delay, icon, label, sublabel, accent }: FlowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <div
        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center mb-4 transition-all duration-300 ${
          accent
            ? "bg-amber/10 border-2 border-amber/20 shadow-[0_0_40px_rgba(245,158,11,0.1)]"
            : "bg-[#141414] border border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
        }`}
      >
        {icon}
      </div>
      <span className="font-heading font-semibold text-white text-base">
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
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <p className="font-heading text-sm font-semibold tracking-widest uppercase text-amber mb-4">
            The Setup
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.1] mb-5">
            Simple technology.{" "}
            <span className="accent-glow italic">Powerful protection.</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Here's how your home becomes its own power plant — generating,
            storing, and using clean energy while staying connected to the grid.
          </p>
        </motion.div>

        {/* Flow diagram */}
        {isInView && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 mb-20">
            <FlowStep
              delay={0.1}
              label="Sunlight"
              sublabel="Free energy source"
              icon={
                <svg viewBox="0 0 64 64" className="w-14 h-14">
                  {/* Sun body */}
                  <circle cx="32" cy="32" r="14" fill="#F59E0B" />
                  {/* Rays */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                      key={angle}
                      x1={32 + 18 * Math.cos((angle * Math.PI) / 180)}
                      y1={32 + 18 * Math.sin((angle * Math.PI) / 180)}
                      x2={32 + 26 * Math.cos((angle * Math.PI) / 180)}
                      y2={32 + 26 * Math.sin((angle * Math.PI) / 180)}
                      stroke="#F59E0B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
              }
            />

            <FlowArrow delay={0.25} />

            <FlowStep
              delay={0.3}
              label="Solar Panels"
              sublabel="On your roof"
              icon={
                <svg viewBox="0 0 64 64" className="w-14 h-14">
                  <rect
                    x="10"
                    y="16"
                    width="44"
                    height="32"
                    rx="3"
                    fill="#1E293B"
                    stroke="#38BDF8"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                  {/* Grid lines */}
                  <line x1="10" y1="27" x2="54" y2="27" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
                  <line x1="10" y1="37" x2="54" y2="37" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
                  <line x1="25" y1="16" x2="25" y2="48" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
                  <line x1="39" y1="16" x2="39" y2="48" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
                  {/* Reflection */}
                  <rect x="12" y="18" width="10" height="7" rx="1" fill="#38BDF8" opacity="0.15" />
                </svg>
              }
            />

            <FlowArrow delay={0.45} />

            <FlowStep
              delay={0.5}
              label="12 Batteries"
              sublabel="Whole-home backup"
              accent
              icon={
                <svg viewBox="0 0 64 64" className="w-14 h-14">
                  {/* Battery body */}
                  <rect x="16" y="12" width="32" height="44" rx="4" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
                  {/* Terminal */}
                  <rect x="26" y="8" width="12" height="6" rx="2" fill="#F59E0B" />
                  {/* Charge bars */}
                  <rect x="22" y="40" width="20" height="6" rx="1.5" fill="#F59E0B" />
                  <rect x="22" y="31" width="20" height="6" rx="1.5" fill="#F59E0B" opacity="0.7" />
                  <rect x="22" y="22" width="20" height="6" rx="1.5" fill="#F59E0B" opacity="0.4" />
                  {/* Lightning bolt */}
                  <path
                    d="M30 28 L34 20 L34 28 L38 28 L34 38 L34 30 L30 30 Z"
                    fill="white"
                    opacity="0"
                  />
                </svg>
              }
            />

            <FlowArrow delay={0.65} />

            <FlowStep
              delay={0.7}
              label="Your Home"
              sublabel="Always powered"
              icon={
                <svg viewBox="0 0 64 64" className="w-14 h-14">
                  {/* House body */}
                  <rect x="16" y="30" width="32" height="24" rx="2" fill="#1E293B" />
                  {/* Roof */}
                  <path d="M12 32 L32 14 L52 32" stroke="#2A3A4E" strokeWidth="3" fill="#1E293B" strokeLinejoin="round" />
                  {/* Door */}
                  <rect x="28" y="40" width="8" height="14" rx="1" fill="#F59E0B" opacity="0.8" />
                  {/* Window */}
                  <rect x="20" y="36" width="6" height="6" rx="1" fill="#38BDF8" opacity="0.4" />
                  <rect x="38" y="36" width="6" height="6" rx="1" fill="#38BDF8" opacity="0.4" />
                  {/* Glow from door */}
                  <rect x="29" y="41" width="6" height="12" rx="0.5" fill="#FEF3C7" opacity="0.6" />
                </svg>
              }
            />
          </div>
        )}

        {/* Benefits row */}
        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {[
            {
              num: "01",
              title: "Panels capture sunlight",
              desc: "Premium solar panels on your roof convert Texas sunshine into clean electricity for your home.",
            },
            {
              num: "02",
              title: "Batteries store excess",
              desc: "Up to 12 batteries store energy for when you need it most — outages, peak hours, or nighttime.",
            },
            {
              num: "03",
              title: "Home stays powered",
              desc: "Your home runs on stored solar energy. If the grid goes down, you don't even notice.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
              className="text-center sm:text-left"
            >
              <span className="font-heading text-xs font-bold text-amber/60 tracking-widest">
                {step.num}
              </span>
              <h4 className="font-heading font-semibold text-white mt-2 mb-2">
                {step.title}
              </h4>
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
              Quick Eligibility Check
              <ArrowRight className="w-4 h-4 ml-2 animate-arrow-nudge" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
