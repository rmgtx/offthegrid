import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

const qualifications = [
  "You own your home in Texas",
  "You have a fair credit score (650 or higher)",
  "You are spending $80+ a month on your utilities",
];

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="get-started"
      className="relative py-24 sm:py-32 overflow-hidden scroll-mt-20"
      ref={ref}
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-mid" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-[1.1] mb-6">
                Your home energy analyst is{" "}
                <span className="accent-glow italic">ready to help.</span>
              </h2>
              <p className="font-body text-lg text-white/60 leading-relaxed mb-8">
                A quick conversation with one of our energy analysts is all it
                takes. They'll review your specific situation and walk you through
                exactly how the program works for your home — no pressure, no
                obligation.
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-3 mb-10"
            >
              {qualifications.map((q, i) => (
                <motion.li
                  key={q}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3 text-white/70 font-body"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <span>{q}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold text-base rounded-xl px-8 h-14 shadow-[0_0_30px_rgba(229,169,61,0.3)] hover:shadow-[0_0_40px_rgba(229,169,61,0.4)] transition-shadow"
                onClick={() => {
                  /* trigger chat widget open */
                  const event = new CustomEvent("open-chat");
                  window.dispatchEvent(event);
                }}
              >
                Talk to an Energy Analyst
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>

          {/* Right — visual card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-emerald/5 rounded-3xl blur-2xl" />
            <div aria-hidden="true" className="relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl overflow-hidden">
              {/* Mock chat header */}
              <div className="flex items-center gap-3 px-6 py-3.5 bg-emerald">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-heading font-semibold text-white text-sm">
                    Energy Analyst
                  </div>
                  <div className="flex items-center gap-1.5 font-body text-xs text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Online now
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Mock chat messages */}
                <div className="space-y-3">
                  <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                    <p className="font-body text-sm text-white/70">
                      I can help you find out if your home qualifies.
                      Are you a homeowner?
                    </p>
                  </div>
                  <div className="bg-emerald rounded-2xl rounded-tr-md px-4 py-3 max-w-[75%] ml-auto">
                    <p className="font-body text-sm text-white">
                      Yes, I own my home in Houston.
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                    <p className="font-body text-sm text-white/70">
                      Okay, perfect. About how much do you spend each month
                      on your utility bill?
                    </p>
                  </div>
                </div>

                {/* Fake input */}
                <div className="flex items-center gap-2 bg-[#1A1A1A] border border-white/[0.08] rounded-full px-4 py-3">
                  <span className="font-body text-sm text-white/30 flex-1">
                    Type a message...
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
