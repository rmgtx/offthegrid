import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  {
    title: "Federal Tax Credit Program",
    body: "The Investment Tax Credit (ITC) provides significant incentives for residential battery storage systems, funded by federal tax credit investors.",
    bg: "bg-emerald/10",
    border: "border-emerald/20",
    accent: "text-emerald",
    barColor: "bg-emerald",
  },
  {
    title: "Energy Community Bonus",
    body: "Homes in designated Energy Communities receive enhanced tax credit bonuses, making whole-home battery systems available at no out-of-pocket cost.",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    accent: "text-purple-400",
    barColor: "bg-purple-500",
  },
  {
    title: "Texas Property Tax Exemption",
    body: "Texas law exempts the added home value from energy storage systems from property taxes — your home value goes up, your taxes don't.",
    bg: "bg-sky/10",
    border: "border-sky/20",
    accent: "text-sky",
    barColor: "bg-sky",
  },
  {
    title: "ERCOT Grid Participation",
    body: "As part of the Virtual Power Plant program, your batteries support the Texas grid during peak demand. ERCOT can borrow stored energy — and you earn credits.",
    bg: "bg-amber/10",
    border: "border-amber/20",
    accent: "text-amber",
    barColor: "bg-amber",
  },
];

export default function GovernmentBacking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="program" className="relative py-16 sm:py-20 bg-secondary/50" ref={ref}>
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-heading text-sm font-semibold tracking-widest uppercase text-amber mb-4">
            Government-Backed Program
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.1] mb-5">
            Backed by federal incentives.{" "}
            <span className="accent-glow italic">Protected by Texas law.</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            This isn't a sales pitch — it's a federally incentivized energy program
            designed to strengthen the Texas power grid while protecting
            homeowners.
          </p>
        </motion.div>

        {/* Pillars — redesigned cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
              className={`relative rounded-2xl ${pillar.bg} border ${pillar.border} p-8 sm:p-10 overflow-hidden`}
            >
              {/* Accent bar at top */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${pillar.barColor}`} />

              <h3 className={`font-heading font-bold text-xl sm:text-2xl ${pillar.accent} mb-4`}>
                {pillar.title}
              </h3>
              <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
