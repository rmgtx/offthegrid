import { useState } from "react";
import { X } from "lucide-react";

export default function StickyRibbon() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <>
      {/* Fixed ribbon */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-amber text-navy font-body text-sm font-medium">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-2.5 flex items-center justify-center gap-2 text-center">
          <span>
            Government-backed program, funded by federal incentives, protected by Texas law.
          </span>
          <a
            href="#program"
            className="underline underline-offset-2 font-semibold hover:text-navy/80 transition-colors whitespace-nowrap"
          >
            Learn More
          </a>
          <button
            onClick={() => setVisible(false)}
            className="ml-2 p-0.5 rounded hover:bg-navy/10 transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {/* Spacer to push content below ribbon */}
      <div className="h-10" />
    </>
  );
}
