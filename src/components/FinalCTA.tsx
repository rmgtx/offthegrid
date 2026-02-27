import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

const qualifications = [
  "You own your home in Texas",
  "Credit score of 650 or higher",
  "Currently have a CenterPoint or Oncor utility account",
  "Interested in lowering your monthly electric bill",
];

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="get-started"
      className="relative py-24 sm:py-32 overflow-hidden"
      ref={ref}
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-mid" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky/5 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="font-heading text-sm font-semibold tracking-widest uppercase text-amber mb-4">
                Get Started Today
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-white leading-[1.1] mb-6">
                Your home energy analyst is{" "}
                <span className="text-amber italic">ready to help.</span>
              </h2>
              <p className="font-body text-lg text-white/50 leading-relaxed mb-8">
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
                className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold text-base rounded-xl px-8 h-14 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-shadow"
                onClick={() => {
                  /* trigger chat widget open */
                  const event = new CustomEvent("open-chat");
                  window.dispatchEvent(event);
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat With Us Now
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
            <div className="absolute -inset-4 bg-amber/5 rounded-3xl blur-2xl" />
            <div className="relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 sm:p-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-amber/15 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-white text-sm">
                      Energy Assistant
                    </div>
                    <div className="font-body text-white/40 text-xs">
                      Online now
                    </div>
                  </div>
                  <div className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald animate-pulse" />
                </div>

                {/* Mock chat messages */}
                <div className="space-y-3">
                  <div className="bg-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                    <p className="font-body text-sm text-white/70">
                      Hi there! I'd love to help you see if your home qualifies for
                      the battery backup program. Are you a homeowner in the
                      Houston or Dallas area?
                    </p>
                  </div>
                  <div className="bg-amber/15 rounded-2xl rounded-tr-md px-4 py-3 max-w-[75%] ml-auto">
                    <p className="font-body text-sm text-amber">
                      Yes! I'm in Houston with CenterPoint.
                    </p>
                  </div>
                  <div className="bg-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                    <p className="font-body text-sm text-white/70">
                      Great news — Houston is one of our primary qualifying areas!
                      Let me connect you with an energy analyst who can review
                      your home's specifics...
                    </p>
                  </div>
                </div>

                {/* Fake input */}
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
                  <span className="font-body text-sm text-white/25 flex-1">
                    Type a message...
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
