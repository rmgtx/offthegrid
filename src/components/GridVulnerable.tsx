import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TexasOutageMap from "@/components/TexasOutageMap";

export default function GridVulnerable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-navy p-8 sm:p-12"
        >
          <div className="absolute inset-0 noise-overlay" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber/10 rounded-full blur-[100px]" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <p className="font-heading text-sm font-semibold tracking-widest uppercase text-amber mb-4">
                Every Season Brings a Threat
              </p>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.1] mb-5">
                Your grid is{" "}
                <span className="accent-glow italic">always vulnerable.</span>
              </h2>
              <p className="font-body text-lg text-white/60 leading-relaxed">
                From winter freezes to summer heat domes and hurricane season,
                Texas faces year-round threats to its power grid. A whole-home
                battery backup system keeps your family protected no matter
                what hits.
              </p>
            </div>

            {/* Animated Texas outage map */}
            <TexasOutageMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
