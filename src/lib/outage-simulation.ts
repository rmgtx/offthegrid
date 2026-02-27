import type { CSSProperties } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────────
export type EventType = "winter" | "tornado" | "thunderstorm" | "heat" | "hurricane";
type Phase = "online" | "flash" | "flash2" | "offline";

// ─── Simulation Constants ───────────────────────────────────────────────────────
export const LOOP_MS = 84_000; // full year loop (84 s)
const FLASH_MS = 140;
const FLASH2_MS = 90;

// ─── Map Colors (dark only — lives inside navy card) ────────────────────────────
const MAP_COLORS = {
  countyOnline: "#1a3461",
  countyBorder: "#1d3a72",
} as const;

// ─── Event Color Pairs ──────────────────────────────────────────────────────────
const EV_COLORS: Record<EventType, { f1: string; f2: string; off: string }> = {
  winter:       { f1: "#bfdbfe", f2: "#93c5fd", off: "#1e3a5f" },
  tornado:      { f1: "#ddd6fe", f2: "#a78bfa", off: "#2d1b69" },
  thunderstorm: { f1: "#a5b4fc", f2: "#818cf8", off: "#1e1b4b" },
  heat:         { f1: "#fbbf24", f2: "#f97316", off: "#7c2d12" },
  hurricane:    { f1: "#67e8f9", f2: "#22d3ee", off: "#0c4a6e" },
};

export const EV_ICONS: Record<EventType, string> = {
  winter: "\u2744\uFE0F",
  tornado: "\uD83C\uDF2A\uFE0F",
  thunderstorm: "\u26C8\uFE0F",
  heat: "\uD83C\uDF21\uFE0F",
  hurricane: "\uD83C\uDF00",
};

// ─── SVG Path Registry ──────────────────────────────────────────────────────────
export const BORDER_KEYS = new Set<string>([
  "pdf81e80", "p3eeffa00", "p21e42000", "p9ef5b00", "p39b9a900",
  "p188623c0", "p24332000", "p15795f00", "p8b00d00", "p3f2e3880",
  "p37933d00", "p4243100", "p1cb95800", "p30b01300", "p33487940",
  "p1e92ec0", "p2e75bd00", "p30f13d00", "p27e0d380", "p1feb8080",
]);

export const ALL_PATH_KEYS: string[] = [
  "pdf81e80",  "p3b7f8700", "p2d3d1e80", "p3eeffa00", "p3b5cb000",
  "p706bf00",  "pb7f0780",  "p3d285b00", "p26c2b500", "p24114200",
  "p177c7980", "p2b25f800", "p19d1880",  "p359f7900", "p26107880",
  "p2f5a480",  "p3723a700", "p2cc5780",  "p3df1f00",  "p258c0c00",
  "p3a4d1180", "pc057800",  "p21e42000", "p72de480",  "p1a8c8900",
  "p5b31880",  "p30140240", "p1dfcdc00", "p25bf7000", "p89f7400",
  "pe72a580",  "p32056f00", "p17956e00", "p20f1880",  "p23b5d600",
  "p1f033000", "p3660bf00", "p34b5d300", "p1680d700", "p341acd00",
  "p22203800", "p3d41cbc0", "p2fb44c0",  "p20f1b00",  "p29ff6a00",
  "p2be51c00", "p12dcb880", "p7537900",  "p209ee500", "p1c14ee00",
  "p285a0e00", "p1adf2cc0", "p1646ac00", "p86e240",   "p100da900",
  "p1d31a900", "p48b9580",  "p2b0d6800", "pbb05a00",  "p2ef08300",
  "p9ef5b00",  "pa9e0600",  "pfe5100",   "p3b0f30f0", "p2c797400",
  "p2dd9d180", "p31e3aac0", "p31f67100", "pda0cec0",  "p28149480",
  "p1e54cb00", "p9140800",  "p21a8d500", "p1660e680", "p13c82100",
  "p2d36aa00", "p24a99200", "p140dca00", "p2b4ec000", "p1d8c6c80",
  "p2e9d9f00", "p16d92b00", "p39af600",  "p3ee9a780", "pc50d300",
  "p1593900",  "p31ac8700", "p39b9a900", "p230604b0", "p28749280",
  "p3a33db00", "p10c21300", "pd6bd040",  "p2bbed180", "pe9c5bc0",
  "p18ab800",  "p23f6c880", "p1701fec0", "p1ba2d680", "p37c11b80",
  "p15484900", "p247ea400", "p339ed000", "p17cc0d80", "p133638b6",
  "p11a1d1f0", "p81c0640",  "p16f1cd80", "p77e3800",  "p3f67f700",
  "p2c1e0680", "p125aa5f0", "p2b2d6680", "p2073bf00", "p1e927300",
  "p3a11e000", "p1f93c000", "p2e4915c0", "p2b873e00", "p3e58f700",
  "p89b2830",  "p6415600",  "p350ea100", "p29533c00", "p19b8bd00",
  "p2742cd00", "p19f17600", "p1fc3ed00", "p68c1b00",  "p312f1730",
  "p3cd8b080", "p327a1cd0", "p2c7d9500", "p14370500", "p3078ae80",
  "p64ee300",  "p1a0d1680", "p36816140", "p365ba6b0", "p28d1b300",
  "pda1ad00",  "p20c9d700", "p1b512100", "p112f7480", "p26598900",
  "p1c2bf580", "p31919830", "p35773e80", "p33101c80", "p1f140680",
  "p13585600", "p38c99b80", "p287122f0", "p1fbd6780", "p3058cb00",
  "p241e0d80", "p1a676870", "p3c88b180", "p64c2e40",  "p16ec1880",
  "pe7eea00",  "p1064ac00", "p1e0bbd00", "p1a2d0500", "p1345b300",
  "p36fb2c00", "p2bb99780", "p319a7e0",  "p321abc00", "pa1abf80",
  "p20028040", "p3802b880", "p785df80",  "pf34100",   "p6a38000",
  "p1dcfb1b0", "p3993e700", "p5d65a80",  "p33b816d0", "p1957d100",
  "p3a20c480", "p24d2c240", "p3ab96540", "p39123f2",  "p4af8df0",
  "p3e58f700", "p283bd500", "p1da60e80", "p26e96e80", "p3a4b3eb0",
  "p29b43570", "p23575d00", "p172ed600", "p249c5a00", "p3e829880",
  "p1f005bf0", "pde67380",  "p3a1e0200", "pc3cc200",  "p1bb9600",
  "p68b300",   "p30b67380", "p188623c0", "p10caeda0", "p1391e00",
  "p3a71a700", "pc671cc0",  "p2e551200", "p26e9ee80", "p24170200",
  "p2cccc780", "p3b1259c0", "p1066d280", "p26068500", "p1809d940",
  "p252d0300", "p2adc2c00", "pb44d500",  "p24a05500", "p29bf1400",
  "p2a655600", "pa9c3700",  "p39d7f940", "p77cbd80",  "p3ebfc100",
  "p1c42b400", "p175bf800", "p2d96da80", "p295c200",  "pf2bc3c0",
  "p22437100", "p12483600", "p2ea3dd80", "p24332000", "p15795f00",
  "p8b00d00",  "p3f2e3880", "p37933d00", "p4243100",  "p1cb95800",
  "p30b01300", "p33487940", "p1e92ec0",  "p1485e100", "p807a900",
  "p23952c00", "p2e75bd00", "p30f13d00", "p27e0d380", "p1feb8080",
  "p2d266500", "p104a42c0", "p106f7d00", "p383848b8",
];

export const UNIQUE_COUNTY_KEYS = [...new Set(ALL_PATH_KEYS.filter(k => !BORDER_KEYS.has(k)))];
const N = UNIQUE_COUNTY_KEYS.length;

// ─── Seeded RNG ─────────────────────────────────────────────────────────────────
function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return (s >>> 0) / 0xffffffff;
  };
}

function hashStr(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = seededRng(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Geographic Zones ───────────────────────────────────────────────────────────
const Z = (s: number, e: number) => UNIQUE_COUNTY_KEYS.slice(s, Math.min(e, N));
const ZONES = {
  panhandle: Z(0, 28),
  westTX:    Z(18, 55),
  northTX:   Z(32, 82),
  dfw:       Z(42, 78),
  centralTX: Z(72, 128),
  eastTX:    Z(105, 158),
  saCentral: Z(138, 178),
  houston:   Z(162, 205),
  gulfCoast: Z(192, N),
};

// ─── Target Builder ─────────────────────────────────────────────────────────────
function makeTargets(zones: string[][], count: number, seed: number, reverse = false): string[] {
  const pool = [...new Set(zones.flat())];
  const selected = seededShuffle(pool, seed).slice(0, Math.min(count, pool.length));
  selected.sort((a, b) => {
    const ai = UNIQUE_COUNTY_KEYS.indexOf(a);
    const bi = UNIQUE_COUNTY_KEYS.indexOf(b);
    return reverse ? bi - ai : ai - bi;
  });
  return selected;
}

// ─── Annual Weather Events ──────────────────────────────────────────────────────
export interface AnnualEvent {
  id: string;
  type: EventType;
  name: string;
  month: number;
  startMs: number;
  cascadeMs: number;
  recoveryMs: number;
  targets: string[];
}

export const ANNUAL_EVENTS: AnnualEvent[] = [
  {
    id: "jan-freeze", type: "winter", name: "Arctic Freeze", month: 0,
    startMs: 800, cascadeMs: 5000, recoveryMs: 7500,
    targets: makeTargets([ZONES.panhandle, ZONES.northTX, ZONES.houston], 58, 101),
  },
  {
    id: "mar-tornado", type: "tornado", name: "Tornado Outbreak", month: 2,
    startMs: 15000, cascadeMs: 1800, recoveryMs: 4200,
    targets: makeTargets([ZONES.northTX, ZONES.dfw], 20, 202),
  },
  {
    id: "apr-storms", type: "thunderstorm", name: "Severe Supercells", month: 3,
    startMs: 21000, cascadeMs: 2500, recoveryMs: 4800,
    targets: makeTargets([ZONES.dfw, ZONES.eastTX], 30, 303),
  },
  {
    id: "may-storms", type: "thunderstorm", name: "Widespread Storms", month: 4,
    startMs: 27500, cascadeMs: 3000, recoveryMs: 4500,
    targets: makeTargets([ZONES.centralTX, ZONES.eastTX, ZONES.northTX], 38, 404),
  },
  {
    id: "jun-heat", type: "heat", name: "Heat Dome", month: 5,
    startMs: 35000, cascadeMs: 4200, recoveryMs: 5800,
    targets: makeTargets([ZONES.centralTX, ZONES.saCentral], 44, 505),
  },
  {
    id: "jul-heat", type: "heat", name: "Rolling Blackouts", month: 6,
    startMs: 41500, cascadeMs: 5500, recoveryMs: 5200,
    targets: makeTargets(
      [ZONES.panhandle, ZONES.northTX, ZONES.centralTX, ZONES.eastTX, ZONES.saCentral],
      92, 606,
    ),
  },
  {
    id: "aug-tropical", type: "hurricane", name: "Tropical Storm Landfall", month: 7,
    startMs: 50000, cascadeMs: 3200, recoveryMs: 7000,
    targets: makeTargets([ZONES.gulfCoast], 32, 707, true),
  },
  {
    id: "sep-hurricane", type: "hurricane", name: "Hurricane Direct Hit", month: 8,
    startMs: 56000, cascadeMs: 4200, recoveryMs: 9500,
    targets: makeTargets([ZONES.houston, ZONES.gulfCoast], 48, 808, true),
  },
  {
    id: "nov-cold", type: "winter", name: "Early Winter Freeze", month: 10,
    startMs: 68000, cascadeMs: 2800, recoveryMs: 5500,
    targets: makeTargets([ZONES.panhandle, ZONES.northTX], 28, 909),
  },
  {
    id: "dec-blizzard", type: "winter", name: "Winter Blizzard", month: 11,
    startMs: 73500, cascadeMs: 3500, recoveryMs: 6000,
    targets: makeTargets([ZONES.dfw, ZONES.houston, ZONES.panhandle], 55, 1010),
  },
];

// ─── Pre-computed County Trigger Schedule ────────────────────────────────────────
interface TriggerInfo {
  triggerMs: number;
  recoveryMs: number;
  type: EventType;
}

const COUNTY_TRIGGERS: Record<string, TriggerInfo[]> = {};

for (const ev of ANNUAL_EVENTS) {
  ev.targets.forEach((key, i) => {
    const progress = ev.targets.length > 1 ? i / (ev.targets.length - 1) : 0;
    const rng = seededRng(hashStr(key + ev.id));
    const jitter = (rng() - 0.5) * 900;
    const trig = Math.max(
      ev.startMs,
      Math.min(ev.startMs + ev.cascadeMs, ev.startMs + progress * ev.cascadeMs + jitter),
    );
    (COUNTY_TRIGGERS[key] ??= []).push({ triggerMs: trig, recoveryMs: ev.recoveryMs, type: ev.type });
  });
}
for (const key of Object.keys(COUNTY_TRIGGERS)) {
  COUNTY_TRIGGERS[key].sort((a, b) => a.triggerMs - b.triggerMs);
}

// ─── County Phase Derivation ────────────────────────────────────────────────────
export function getCountyPhase(key: string, t: number): { phase: Phase; type: EventType | null } {
  const triggers = COUNTY_TRIGGERS[key];
  if (!triggers) return { phase: "online", type: null };

  let best: TriggerInfo | null = null;
  for (const tr of triggers) {
    if (tr.triggerMs <= t) {
      const age = t - tr.triggerMs;
      if (age < tr.recoveryMs && (!best || tr.triggerMs > best.triggerMs)) best = tr;
    }
  }
  if (!best) return { phase: "online", type: null };

  const age = t - best.triggerMs;
  if (age < FLASH_MS) return { phase: "flash", type: best.type };
  if (age < FLASH_MS + FLASH2_MS) return { phase: "flash2", type: best.type };
  return { phase: "offline", type: best.type };
}

// ─── County Style Computation (dark theme only) ─────────────────────────────────
export function countyStyle(key: string, t: number): CSSProperties {
  const { phase, type } = getCountyPhase(key, t);
  if (phase === "online") return { fill: MAP_COLORS.countyOnline, transition: "fill 0.9s ease-out" };
  if (!type) return { fill: MAP_COLORS.countyOnline };
  const ec = EV_COLORS[type];
  if (phase === "flash") return { fill: ec.f1, transition: "none" };
  if (phase === "flash2") return { fill: ec.f2, transition: "fill 0.08s" };
  return { fill: ec.off, transition: "fill 0.55s ease-in" };
}

// ─── Calendar Helpers ───────────────────────────────────────────────────────────
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MONTH_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
