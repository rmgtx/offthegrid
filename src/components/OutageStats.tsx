import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="group h-full relative bg-navy rounded-2xl border border-white/[0.06] transition-all duration-500"
    >
      <div className="p-6 sm:p-7 flex flex-col h-full border-l-2 border-amber/30 rounded-2xl">
        <div className="font-heading font-bold text-3xl sm:text-4xl tracking-tight mb-1 text-amber">
          {value}
        </div>
        <div className="font-heading font-semibold text-sm text-white/70 mt-1">
          {label}
        </div>
        <div className="font-body text-base text-white/50 mt-3 leading-relaxed">
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
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8" ref={sectionRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-[1.1] mb-5">
            This isn't a hypothetical.{" "}
            <span className="text-white">It already happened.</span>
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
            <StatCard key={stat.label} value={stat.value} label={stat.label} detail={stat.detail} delay={i * 0.12} />
          ))}
        </div>

      </div>
    </section>
  );
}
