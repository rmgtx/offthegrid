import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "(832) 555-0199";
const PHONE_HREF = "tel:+18325550199";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "The Program", href: "#program" },
    { label: "Get Started", href: "#get-started" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Nav links (left-aligned, replacing logo) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-heading text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-navy/70 hover:text-navy hover:bg-navy/5"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA (right-aligned) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-heading text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "text-navy/70 hover:text-navy"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              {PHONE_NUMBER}
            </a>
            <Button
              asChild
              className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold rounded-lg px-5 shadow-none"
            >
              <a href="#get-started">Check Eligibility</a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-navy hover:bg-navy/5"
                : "text-white hover:bg-white/10"
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg font-heading text-sm font-medium text-navy/70 hover:text-navy hover:bg-navy/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-border flex flex-col gap-2">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-heading text-sm font-medium text-navy/70"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_NUMBER}
                </a>
                <Button
                  asChild
                  className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold w-full"
                >
                  <a href="#get-started">Check Eligibility</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
