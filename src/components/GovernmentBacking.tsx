import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Landmark, FileText, BadgeCheck } from "lucide-react";

const pillars = [
  {
    icon: Landmark,
    title: "Federal Tax Credit Program",
    body: "The Investment Tax Credit (ITC) provides significant incentives for residential solar and battery storage systems, funded by federal tax credit investors.",
  },
  {
    icon: FileText,
    title: "Energy Community Bonus",
    body: "Homes in designated Energy Communities receive enhanced tax credit bonuses, making whole-home battery systems available at no out-of-pocket cost.",
  },
  {
    icon: BadgeCheck,
    title: "Texas Property Tax Exemption",
    body: "Texas law exempts the added home value from solar energy systems from property taxes — your home value goes up, your taxes don't.",
  },
  {
    icon: ShieldCheck,
    title: "ERCOT Grid Participation",
    body: "As part of the Virtual Power Plant program, your batteries support the Texas grid during peak demand. ERCOT can borrow stored energy — and you earn credits.",
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

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
            >
              <Card className="h-full border border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500 bg-[#141414] rounded-2xl">
                <CardContent className="p-7">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber/10 text-amber mb-5">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {pillar.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
