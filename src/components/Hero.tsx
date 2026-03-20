import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const base = import.meta.env.BASE_URL;

const slides = [
  {
    headline: "Never Lose Power Again",
    subline:
      "Up to 12 whole-home backup batteries installed at no cost to you. Keep your family safe when the grid fails.",
    accent: "Government-Backed Program",
    image: `${base}hero/slide-1-lit-home.png`,
  },
  {
    headline: "Texas Homes Deserve Better",
    subline:
      "After Winter Storm Uri left 4.5 million homes without power, Texans said enough. This program makes your home grid-independent.",
    accent: "No Out-of-Pocket Cost",
    image: `${base}hero/slide-2-ice-storm.png`,
  },
  {
    headline: "Power Through Any Storm",
    subline:
      "Up to 12 whole-home batteries keep your lights on, your food cold, and your family safe — no matter what hits the grid.",
    accent: "Whole-Home Battery Protection",
    image: `${base}hero/slide-3-solar-home.png`,
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const openChat = () => window.dispatchEvent(new CustomEvent("open-chat"));

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background — gradient base + crossfading images */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-mid" />

      {/* Hero images (crossfade) — scaled to crop bottom-left watermark */}
      {slides.map((slide, i) => (
        <img
          key={slide.image}
          src={slide.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out scale-105 origin-top-right"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Dark overlay — heavier on left for text legibility, lighter on right for image visibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.72) 45%, rgba(5,5,5,0.45) 100%)",
        }}
      />

      {/* Bottom-left corner mask to hide watermark remnants */}
      <div
        className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 40%, transparent 70%)",
        }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber/10 rounded-full blur-[128px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-sky/10 rounded-full blur-[128px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 w-full pt-28 pb-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Badge className="bg-amber/15 text-amber border-amber/20 font-heading text-xs font-semibold tracking-wide uppercase px-3 py-1.5 mb-6 hover:bg-amber/15">
                {slides[current].accent}
              </Badge>

              <h1
                className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
              >
                {slides[current].headline}
              </h1>

              <p
                className="font-body text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl mb-8"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
              >
                {slides[current].subline}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              onClick={openChat}
              size="lg"
              className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold text-base rounded-xl px-8 h-13 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-shadow"
            >
              Quick Eligibility Check
              <ArrowRight className="w-4 h-4 ml-2 animate-arrow-nudge" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-heading font-semibold text-base rounded-xl px-8 h-13 backdrop-blur-sm"
            >
              <a href="#program">
                Learn More
              </a>
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="py-3 cursor-pointer"
              >
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-10 bg-amber"
                      : "w-6 bg-white/15 hover:bg-white/25"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

