import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "The Program", href: "#program" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Get Started", href: "#get-started" },
  ];

  const openChat = () => window.dispatchEvent(new CustomEvent("open-chat"));

  return (
    <header
      style={{ top: "var(--ribbon-h, 40px)" }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0B]/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Nav links (left-aligned) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-heading text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-white/70 hover:text-white hover:bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA (right-aligned) */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={openChat}
              className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold rounded-lg px-5 shadow-none"
            >
              Quick Eligibility Check
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-white hover:bg-white/5"
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
            className="md:hidden bg-[#141414]/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg font-heading text-sm font-medium text-white/70 hover:text-white hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-border">
                <Button
                  onClick={() => { setMobileOpen(false); openChat(); }}
                  className="bg-amber hover:bg-amber-dark text-navy font-heading font-semibold w-full"
                >
                  Quick Eligibility Check
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
