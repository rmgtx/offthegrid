import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-heading font-semibold text-white text-sm mb-4">
              Texas Home Energy Program
            </h4>
            <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs">
              Protecting Texas homes with solar energy and whole-home battery
              backup through the federal Virtual Power Plant program.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">
              Program
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "The Program", href: "#program" },
                { label: "Get Started", href: "#get-started" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                {
                  label: "Energy Community Map",
                  href: "https://energycommunities.gov/energy-community-tax-credit-bonus/",
                },
                {
                  label: "TX Solar Tax Exemption",
                  href: "https://comptroller.texas.gov/taxes/property-tax/exemptions/",
                },
                {
                  label: "FERC Winter Storm Report",
                  href: "https://www.ferc.gov/news-events/news/final-report-february-2021-freeze-underscores-winterization-recommendations",
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@texashomeenergy.com"
                  className="flex items-center gap-2 font-body text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@texashomeenergy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/25">
            &copy; {new Date().getFullYear()} Texas Home Energy. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/25">
            Serving Houston (CenterPoint) &amp; Dallas (Oncor) areas
          </p>
        </div>
      </div>
    </footer>
  );
}
