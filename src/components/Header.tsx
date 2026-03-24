import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "The Program", href: "#program" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Get Started", href: "#get-started" },
  ];

  const openChat = () => window.dispatchEvent(new CustomEvent("open-chat"));

  // Track scroll for bg treatment
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
      style={{ top: "var(--ribbon-h, 0px)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-3">
          {/* Hamburger — mobile only, left side */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 -ml-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber text-white hover:bg-white/10"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Desktop nav links */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg font-heading text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber text-white/80 hover:text-white hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA — ALWAYS visible on all breakpoints */}
          <Button
            onClick={openChat}
            size="sm"
            className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold rounded-lg px-4 sm:px-5 shadow-none ml-auto text-xs sm:text-sm"
          >
            Check Eligibility
          </Button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg font-heading text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
