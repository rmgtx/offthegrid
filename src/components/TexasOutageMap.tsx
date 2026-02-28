import { useState, useEffect, useRef, useMemo } from "react";
import { useInView } from "framer-motion";
import svgPaths from "@/data/texas-svg-paths";
import {
  LOOP_MS,
  ALL_PATH_KEYS,
  BORDER_KEYS,
  UNIQUE_COUNTY_KEYS,
  ANNUAL_EVENTS,
  EV_ICONS,
  countyStyle,
  getCountyPhase,
  MONTHS,
} from "@/lib/outage-simulation";

export default function TexasOutageMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  const [loopT, setLoopT] = useState(0);
  const startRef = useRef<number>(Date.now());
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedAtRef = useRef<number>(0);

  // Viewport-aware animation loop
  useEffect(() => {
    if (!isInView) {
      if (frameRef.current) clearInterval(frameRef.current);
      frameRef.current = null;
      pausedAtRef.current = loopT;
      return;
    }
    startRef.current = Date.now() - pausedAtRef.current;
    frameRef.current = setInterval(() => {
      setLoopT((Date.now() - startRef.current) % LOOP_MS);
    }, 50); // 20fps — CSS transitions handle visual smoothness
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [isInView]);

  // Derived state
  const currentMonth = Math.floor((loopT / LOOP_MS) * 12);

  const { offlineCount, activeEvent } = useMemo(() => {
    let offline = 0;
    for (const key of UNIQUE_COUNTY_KEYS) {
      const { phase } = getCountyPhase(key, loopT);
      if (phase === "offline") offline++;
    }
    const active = ANNUAL_EVENTS
      .filter(e => loopT >= e.startMs && loopT < e.startMs + e.cascadeMs + e.recoveryMs * 0.6)
      .sort((a, b) => b.startMs - a.startMs)[0] ?? null;
    return { offlineCount: offline, activeEvent: active };
  }, [loopT]);

  const estAffected = Math.round(offlineCount * 127_000);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-0.5">
      {/* Event label — above the map, in normal flow */}
      <div className="text-center min-h-[52px]">
        {activeEvent ? (
          <>
            <div className="flex items-center justify-center gap-2.5 mb-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
              <span className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide">
                {EV_ICONS[activeEvent.type]} {activeEvent.name}
              </span>
            </div>
            {estAffected > 0 && (
              <span className="font-body text-sm text-white/50">
                ~{(estAffected / 1_000_000).toFixed(1)}M affected
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald" />
            <span className="font-heading text-lg sm:text-xl font-bold text-white/50 tracking-wide">
              Grid Stable
            </span>
          </div>
        )}
      </div>

      {/* Map container */}
      <div className="relative w-full" style={{ maxWidth: 520 }}>
        {/* Ambient glow behind map */}
        <div
          className="absolute inset-[6%] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(20,60,150,0.15) 0%, transparent 70%)",
          }}
        />

        {/* SVG Map */}
        <svg
          viewBox="0 0 1209 1209"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto block"
        >
          <g>
            {ALL_PATH_KEYS.map((key, idx) => {
              const isBorder = BORDER_KEYS.has(key);
              const d = (svgPaths as Record<string, string>)[key];
              if (!d) return null;
              return (
                <path
                  key={`${key}-${idx}`}
                  d={d}
                  style={
                    isBorder
                      ? { fill: "#1d3a72" }
                      : countyStyle(key, loopT)
                  }
                />
              );
            })}
          </g>

          {/* Houston marker */}
          <circle cx="815" cy="820" r="18" fill="rgba(16,185,129,0.15)" />
          <circle cx="815" cy="820" r="8" fill="#10B981" className="animate-pulse" />
          <text
            x="815" y="855"
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="28"
            fontWeight="500"
            fontFamily="Outfit, system-ui, sans-serif"
          >
            Houston
          </text>

          {/* Dallas marker */}
          <circle cx="660" cy="430" r="18" fill="rgba(56,189,248,0.15)" />
          <circle
            cx="660" cy="430" r="8"
            fill="#38BDF8"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <text
            x="660" y="410"
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="28"
            fontWeight="500"
            fontFamily="Outfit, system-ui, sans-serif"
          >
            Dallas
          </text>
        </svg>
      </div>

      {/* Month timeline dots */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-2">
        {MONTHS.map((m, i) => (
          <div key={m} className="flex flex-col items-center gap-1">
            <div
              className="rounded-full transition-all duration-400"
              style={{
                width: i === currentMonth ? 10 : 6,
                height: i === currentMonth ? 4 : 2,
                background:
                  i < currentMonth
                    ? "#1e3a6e"
                    : i === currentMonth
                    ? "#F59E0B"
                    : "rgba(255,255,255,0.08)",
                boxShadow: i === currentMonth ? "0 0 8px #F59E0B" : "none",
              }}
            />
            <span
              className="font-heading transition-colors duration-300"
              style={{
                fontSize: 8,
                letterSpacing: "0.05em",
                color: i === currentMonth ? "#F59E0B" : "rgba(255,255,255,0.2)",
                fontWeight: i === currentMonth ? 700 : 400,
              }}
            >
              {m}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
