import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import TexasOutageMap from "@/components/TexasOutageMap";

interface StatCardProps {
  value: string;
  label: string;
  detail: string;
  delay: number;
}

function StatCard({ value, label, detail, delay }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      <Card className="group h-full border border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500 bg-[#141414] rounded-2xl overflow-hidden">
        <CardContent className="p-6 sm:p-7 flex flex-col h-full">
          <div className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight mb-1">
            {value}
          </div>
          <div className="font-heading font-semibold text-sm text-white/80 mt-1">
            {label}
          </div>
          <div className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
            {detail}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const stats = [
  {
    value: "4.5M",
    label: "Homes Lost Power",
    detail: "During Winter Storm Uri in February 2021, millions of Texas families were left in freezing darkness for days.",
  },
  {
    value: "4+ Days",
    label: "Average Outage Duration",
    detail: "Some neighborhoods went without electricity for over a week — no heat, no refrigeration, no communication.",
  },
  {
    value: "246",
    label: "Lives Lost",
    detail: "Official estimates put the death toll at 246 Texans, many from hypothermia in their own homes.",
  },
  {
    value: "$195B",
    label: "Economic Damage",
    detail: "The costliest natural disaster in Texas history. Insurance claims and repairs devastated communities.",
  },
];

export default function OutageStats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8" ref={sectionRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-heading text-sm font-semibold tracking-widest uppercase text-amber mb-4">
            The Texas Power Crisis
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.1] mb-5">
            This isn't a hypothetical.{" "}
            <span className="accent-glow italic">It already happened.</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Texas has experienced catastrophic grid failures — from Winter Storm
            Uri to hurricane seasons that leave entire regions powerless. Your
            home doesn't have to be vulnerable.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.12} />
          ))}
        </div>

        {/* Map callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 relative rounded-2xl overflow-hidden bg-navy p-8 sm:p-12"
        >
          <div className="absolute inset-0 noise-overlay" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber/10 rounded-full blur-[100px]" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <p className="font-heading text-sm font-semibold tracking-widest uppercase text-amber mb-4">
                Every Season Brings a Threat
              </p>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
                Your grid is{" "}
                <span className="accent-glow italic">always vulnerable.</span>
              </h3>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                From winter freezes to summer heat domes and hurricane season,
                Texas faces year-round threats to its power grid. Houston
                (CenterPoint) and Dallas (Oncor) are primary qualifying areas
                for the backup battery program.
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
