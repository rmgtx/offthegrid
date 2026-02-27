import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CloudLightning, Clock, Home, DollarSign } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  detail: string;
  delay: number;
  color: string;
}

function StatCard({ icon: Icon, value, label, detail, delay, color }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      <Card className="group border-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
              style={{ backgroundColor: `${color}15`, color }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-3xl sm:text-4xl text-navy tracking-tight">
                {value}
              </div>
              <div className="font-heading font-semibold text-sm text-navy/80 mt-1">
                {label}
              </div>
              <div className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                {detail}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const stats = [
  {
    icon: CloudLightning,
    value: "4.5M",
    label: "Homes Lost Power",
    detail: "During Winter Storm Uri in February 2021, millions of Texas families were left in freezing darkness for days.",
    color: "#EF4444",
  },
  {
    icon: Clock,
    value: "4+ Days",
    label: "Average Outage Duration",
    detail: "Some neighborhoods went without electricity for over a week — no heat, no refrigeration, no communication.",
    color: "#F59E0B",
  },
  {
    icon: Home,
    value: "246",
    label: "Lives Lost",
    detail: "Official estimates put the death toll at 246 Texans, many from hypothermia in their own homes.",
    color: "#0B1426",
  },
  {
    icon: DollarSign,
    value: "$195B",
    label: "Economic Damage",
    detail: "The costliest natural disaster in Texas history. Insurance claims and repairs devastated communities.",
    color: "#10B981",
  },
];

export default function OutageStats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
          <h2 className="font-display text-4xl sm:text-5xl text-navy leading-[1.1] mb-5">
            This isn't a hypothetical.{" "}
            <span className="text-amber italic">It already happened.</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Texas has experienced catastrophic grid failures — from Winter Storm
            Uri to hurricane seasons that leave entire regions powerless. Your
            home doesn't have to be vulnerable.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 gap-5">
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

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-heading text-sm font-semibold tracking-widest uppercase text-amber mb-4">
                Energy Communities
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-4">
                Is your neighborhood eligible?
              </h3>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                The federal government has designated specific Energy Communities
                across Texas that qualify for enhanced tax credit bonuses. Houston
                (CenterPoint) and Dallas (Oncor) are primary qualifying areas.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald/10 text-emerald font-heading text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald" />
                  CenterPoint — Houston
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky/10 text-sky font-heading text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-sky" />
                  Oncor — Dallas
                </span>
              </div>
            </div>

            {/* Simplified Texas map illustration */}
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 400 380"
                className="w-full max-w-xs sm:max-w-sm"
                fill="none"
              >
                {/* Texas outline (simplified) */}
                <path
                  d="M120 30 L280 30 L310 60 L330 90 L340 140 L360 180 L370 220 L350 260 L320 300 L280 330 L240 350 L200 360 L160 340 L120 300 L80 280 L60 240 L50 200 L60 140 L80 80 Z"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  fill="rgba(255,255,255,0.03)"
                  className="transition-all"
                />
                {/* Houston dot */}
                <circle cx="260" cy="280" r="8" className="fill-emerald animate-pulse" />
                <circle cx="260" cy="280" r="16" className="fill-emerald/20" />
                <text
                  x="260"
                  y="310"
                  textAnchor="middle"
                  className="fill-white/70 font-heading"
                  fontSize="12"
                  fontWeight="500"
                >
                  Houston
                </text>
                {/* Dallas dot */}
                <circle cx="220" cy="140" r="8" className="fill-sky animate-pulse" style={{ animationDelay: "1s" }} />
                <circle cx="220" cy="140" r="16" className="fill-sky/20" />
                <text
                  x="220"
                  y="125"
                  textAnchor="middle"
                  className="fill-white/70 font-heading"
                  fontSize="12"
                  fontWeight="500"
                >
                  Dallas
                </text>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
