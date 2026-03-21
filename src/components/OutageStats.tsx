import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  detail: string;
  delay: number;
  accentColor: string;
}

function StatCard({ value, label, detail, delay, accentColor }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="group h-full relative bg-navy rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500"
    >
      {/* Colored accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: accentColor }} />

      <div className="p-6 sm:p-7 flex flex-col h-full">
        <div className="font-heading font-bold text-3xl sm:text-4xl tracking-tight mb-1" style={{ color: accentColor }}>
          {value}
        </div>
        <div className="font-heading font-semibold text-sm text-white/80 mt-1">
          {label}
        </div>
        <div className="font-body text-base text-white/60 mt-3 leading-relaxed">
          {detail}
        </div>
      </div>
    </motion.div>
  );
}

const stats = [
  {
    value: "4.5M",
    label: "Homes Lost Power",
    detail: "During Winter Storm Uri in February 2021, millions of Texas families were left in freezing darkness for days.",
    accentColor: "#10B981",
  },
  {
    value: "4+ Days",
    label: "Average Outage Duration",
    detail: "Some neighborhoods went without electricity for over a week — no heat, no refrigeration, no communication.",
    accentColor: "#8B5CF6",
  },
  {
    value: "246",
    label: "Lives Lost",
    detail: "Official estimates put the death toll at 246 Texans, many from hypothermia in their own homes.",
    accentColor: "#3B82F6",
  },
  {
    value: "$195B",
    label: "Economic Damage",
    detail: "The costliest natural disaster in Texas history. Insurance claims and repairs devastated communities.",
    accentColor: "#F59E0B",
  },
];

export default function OutageStats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  return (
    <section className="relative py-24 sm:py-32">
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

      </div>
    </section>
  );
}
