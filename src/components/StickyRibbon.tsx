import { useState, useCallback, useRef, useEffect } from "react";
import { X } from "lucide-react";

export default function StickyRibbon() {
  const [visible, setVisible] = useState(true);
  const ribbonRef = useRef<HTMLDivElement>(null);

  // Measure the ribbon's actual rendered height and set --ribbon-h dynamically
  useEffect(() => {
    if (!visible || !ribbonRef.current) return;

    const el = ribbonRef.current;

    const updateHeight = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--ribbon-h", `${h}px`);
    };

    // Initial measurement
    updateHeight();

    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);

    return () => ro.disconnect();
  }, [visible]);

  const dismiss = useCallback(() => {
    setVisible(false);
    document.documentElement.style.setProperty("--ribbon-h", "0px");
  }, []);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(dismiss, 5000);
    return () => clearTimeout(timer);
  }, [visible, dismiss]);

  return (
    <>
      {visible && (
        <div
          ref={ribbonRef}
          className="fixed top-0 left-0 right-0 z-[60] bg-amber text-navy font-body text-xs sm:text-sm font-medium"
        >
          <div className="relative mx-auto max-w-7xl px-8 pr-10 py-2 sm:py-2.5">
            <div className="flex items-center justify-center gap-2 text-center">
              <span className="leading-snug">
                Government-backed program, funded by federal incentives,
                protected by Texas law.
              </span>
              <a
                href="#program"
                className="underline underline-offset-2 font-semibold hover:text-navy/80 transition-colors whitespace-nowrap"
              >
                Learn More
              </a>
              <button
                onClick={dismiss}
                className="ml-2 p-0.5 rounded hover:bg-navy/10 transition-colors shrink-0"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Spacer — collapses when ribbon is dismissed via CSS var */}
      <div style={{ height: "var(--ribbon-h, 40px)" }} />
    </>
  );
}
