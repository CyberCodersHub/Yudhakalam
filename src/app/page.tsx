'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// ---------- Edit all content here ----------
const SITE = {
  name: "Padaivedu Yudhakalam",
  phone: "+91 7810090877",
  email: "info@yudhakalam.com",
  place: "Padaivedu, Tiruvannamalai, Tamil Nadu, India",
  hours: "Saturdays, Sundays and government holidays: 6:00–8:00 AM and 4:00–6:00 PM",
};

const TEL = `tel:${SITE.phone.replace(/\s/g, "")}`;

const NAV = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Training", "#training"],
  ["Achievements", "#achievements"],
  ["Events", "#events"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
];

// Confirm these figures with the academy.
const STATS = [
  { value: "5+", label: "Years teaching" },
  { value: "150+", label: "Students trained" },
  { value: "38+", label: "Titles won" },
  { value: "40%", label: "Women in our classes" },
] as const;

const HIGHLIGHTS = [
  ["Champions of Tomorrow", "We train young warriors to excel in competitions and achieve great success."],
  ["The Silambam Legacy", "Learn the ancient Tamil martial art and carry its rich heritage forward for generations."],
  ["Her Power, Her Legacy", "Let’s empower women with strength, courage, and confidence through Silambam."],
];

const WHY = [
  {
    title: "Seasoned coaches",
    desc: "Learn from national medallists with more than twenty years in martial arts.",
  },
  {
    title: "Rooted in tradition",
    desc: "Lessons follow the Tamil Kalaripayattu line and the old warrior codes.",
  },
  {
    title: "A stronger body",
    desc: "Full-body drills build strength, flexibility and stamina together.",
  },
  {
    title: "A calmer mind",
    desc: "Patient, structured practice grows focus and resilience.",
  },
  {
    title: "Every age welcome",
    desc: "Batches for children, teens, adults and women at any fitness level.",
  },
  {
    title: "Results you can see",
    desc: "Our students have won district, state and national titles.",
  },
];

const WOMEN_POINTS = [
  "Women get first call on new seats",
  "Separate batches for women only",
  "Free classes for those who qualify",
  "A free starter kit for first-time learners",
  "Self-defence awareness workshops",
  "A welcoming, respectful training space",
];

const ACHIEVEMENTS = [
  ["First prize, Young Sports of India", "A national-level win for the academy's students."],
  ["District, state and national titles", "Our fighters have placed at every level of competition."],
];

const EVENTS: [string, string][] = []; // e.g. [["Beginner batch opens", "1 November, Padaivedu arena"]]

// Keep PROGRAMS and ITEMS in the same order.
const PROGRAMS = [
  "Single stick",
  "Double stick",
  "Surulvall",
  "Vel Kambu",
  "Maan Kombu",
  "Kuthuvarisai",
  "Advanced equipment and techniques",
  "Women's self-defence",
  "Youth program",
  "Gymnastics",
];

const ITEMS = [
  { title: "Single stick", ta: "ஒற்றைக் கம்பு", img: "/programs/1-single-stick.jpg", pos: "50% 30%",
    desc: "The foundation of Silambam. Learn stance, footwork and the core strikes with a single staff." },
  { title: "Double stick", ta: "இரட்டைக் கம்பு", img: "/programs/2-double-stick.jpg", pos: "50% 30%",
    desc: "Train both hands together for speed, rhythm and coordination." },
  { title: "Surulvall", ta: "சுருள் வாள்", img: "/programs/3-surulvall.jpg", pos: "50% 25%",
    desc: "The flexible coiled blade. It demands control, timing and complete focus." },
  { title: "Vel Kambu", ta: "வேல் கம்பு", img: "/programs/4-vel-kambu.jpg", pos: "50% 30%",
    desc: "Spear-style training with thrusts and reach, built on balance and precision." },
  { title: "Maan Kombu", ta: "மான் கொம்பு", img: "/programs/5-maan-kombu.jpg", pos: "50% 30%",
    desc: "The twin-horn weapon for close defence and sharp counters." },
  { title: "Kuthuvarisai", ta: "குத்துவரிசை", img: "/programs/6-kuthuvarisai.jpg", pos: "50% 30%",
    desc: "Empty-hand combat built on strikes, blocks and body control." },
  { title: "Advanced Techniques", ta: "மேம்பட்ட நுட்பங்கள்", img: "/programs/7-advance-equipments-techniques.jpg", pos: "50% 30%",
    desc: "Higher-level equipment work and technique for experienced students." },
  { title: "Women's Self Defence", ta: "பெண்கள் தற்காப்புக் கலை", img: "/programs/8-womens-self-defence.jpg", pos: "50% 30%",
    desc: "Practical self-defence skills that build confidence and awareness." },
  { title: "Youth Program", ta: "இளைஞர் பயிற்சி", img: "/programs/9-youth-program.jpg", pos: "50% 30%",
    desc: "A structured path for young students to learn Silambam with discipline." },
  { title: "Gymnastics", ta: "சீருடற்பயிற்சி", img: "/programs/10-gymnastics.jpg", pos: "50% 30%",
    desc: "Flexibility, balance and strength that support every Silambam skill." },
];

/* ---- Sparks: fixed values (no Math.random) so server and browser always match ---- */
const EMBERS = Array.from({ length: 42 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    x: `${(r(1) * 100).toFixed(1)}%`,
    w: `${(2 + r(2) * 3).toFixed(1)}px`,
    dur: `${(5 + r(3) * 7).toFixed(1)}s`,
    delay: `${(-r(4) * 12).toFixed(1)}s`,
    drift: `${(r(5) * 260 - 40).toFixed(0)}px`,
  };
});

// Tailwind needs these written out in full so it can find them.
const SELECT =
  "has-[#p0:checked]:[--sel:0] has-[#p1:checked]:[--sel:1] has-[#p2:checked]:[--sel:2] has-[#p3:checked]:[--sel:3] has-[#p4:checked]:[--sel:4] has-[#p5:checked]:[--sel:5] has-[#p6:checked]:[--sel:6] has-[#p7:checked]:[--sel:7] has-[#p8:checked]:[--sel:8] has-[#p9:checked]:[--sel:9]";

// Orange-to-yellow button look used by every solid button
const SOLID_BTN =
  "border-2 border-[#FF9A1F] bg-gradient-to-r from-[#FF7A1A] to-[#F5C518] text-[#1C120C] shadow-[0_0_20px_rgba(255,122,26,0.45)] hover:from-[#FF8F3A] hover:to-[#FFD84D]";

function vars(styles: Record<string, string | number>): CSSProperties {
  return styles as CSSProperties;
}

// ---------- Circle plot maths (Training section) ----------
const R = 38; // ring radius, as % of the plot's width

// point on the ring for program i (first one at 12 o'clock, then clockwise)
const angle = (i: number) => ((i * 36 - 90) * Math.PI) / 180;
const pt = (i: number, r = R) => ({
  x: Number((50 + r * Math.cos(angle(i))).toFixed(2)),
  y: Number((50 + r * Math.sin(angle(i))).toFixed(2)),
});

// ---------- Kolam divider pieces ----------
const GOLD = "#F5C518";
const ORANGE = "#FF8A1F";

const kolamTile = (d: string, w: number, h: number) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' fill='none' stroke='${GOLD}' stroke-width='1.2'>${d}</svg>`
  )}")`;

const KOLAM_H = kolamTile(
  `<path d='M0 9Q6 0 12 9T24 9'/><path d='M0 9Q6 18 12 9T24 9'/><circle cx='6' cy='9' r='1.3' fill='${ORANGE}'/><circle cx='18' cy='9' r='1.3' fill='${ORANGE}'/>`,
  24, 18
);

function KolamKnot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 32" aria-hidden="true" className={className} fill="none" stroke={GOLD} strokeWidth="1.2">
      <polygon points="22,2 42,16 22,30 2,16" stroke={ORANGE} />
      <circle cx="12" cy="16" r="7" />
      <circle cx="22" cy="16" r="7" />
      <circle cx="32" cy="16" r="7" />
      <circle cx="22" cy="16" r="1.6" fill={ORANGE} />
      <circle cx="12" cy="16" r="1" fill={GOLD} />
      <circle cx="32" cy="16" r="1" fill={GOLD} />
      <circle cx="22" cy="6" r="1" fill={GOLD} />
      <circle cx="22" cy="26" r="1" fill={GOLD} />
    </svg>
  );
}

function Divider() {
  return (
    <div aria-hidden className="bg-umber py-3">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-5">
        <div className="h-[18px] flex-1 opacity-70" style={{ backgroundImage: KOLAM_H, backgroundRepeat: "repeat-x" }} />
        <KolamKnot className="h-8 w-12 shrink-0" />
        <div className="h-[18px] flex-1 opacity-70" style={{ backgroundImage: KOLAM_H, backgroundRepeat: "repeat-x" }} />
      </div>
    </div>
  );
}

// ---------- Small pieces ----------
const Heading = ({
  children,
  center,
  className,
}: {
  children: ReactNode;
  center?: boolean;
  className?: string;
}) => (
  <div className={`${center ? "text-center" : ""} ${className ?? ""}`}>
    <h2 className="font-display text-3xl text-sand sm:text-5xl">{children}</h2>
    <div className={`mt-4 h-1 w-16 bg-gradient-to-r from-ember to-gold ${center ? "mx-auto" : ""}`} />
  </div>
);

const Btn = ({
  href,
  children,
  solid,
}: {
  href: string;
  children: ReactNode;
  solid?: boolean;
}) => (
  <a
    href={href}
    className={`inline-block rounded-lg px-5 py-2.5 font-bold transition-all active:scale-95 [text-shadow:none] ${
      solid ? SOLID_BTN : "border-2 border-ember/60 text-gold hover:bg-ember/10"
    }`}
  >
    {children}
  </a>
);

const Logo = () => (
  <Image
    src="/logo.jpeg"
    alt="Padaivedu Yudhakalam logo"
    width={40}
    height={40}
    className="h-10 w-10 shrink-0 rounded-full border border-gold bg-umber"
  />
);

const SPARKLES = [
  { x: "9%", y: "30%", size: "18px", delay: "0s" },
  { x: "22%", y: "62%", size: "12px", delay: "0.7s" },
  { x: "34%", y: "24%", size: "22px", delay: "1.4s" },
  { x: "48%", y: "55%", size: "14px", delay: "0.3s" },
  { x: "58%", y: "28%", size: "20px", delay: "2.0s" },
  { x: "71%", y: "60%", size: "16px", delay: "1.1s" },
  { x: "83%", y: "34%", size: "22px", delay: "1.8s" },
  { x: "92%", y: "58%", size: "12px", delay: "0.5s" },
];

/* =====================================================================
   NEW (1): LOADING SCREEN
   Logo + name + progress bar counting 0 -> 100%, then fades away.
   Styles for it are in globals.css under "LOADING SCREEN".
   ===================================================================== */
function Loader() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"load" | "out" | "done">("load");

  // count 0 -> 100
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 500 : 2400; // total loading time in ms
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      setPct(Math.round((1 - Math.pow(1 - t, 2.2)) * 100)); // fast start, slow finish
      if (t < 1) raf = requestAnimationFrame(tick);
      else setPhase("out");
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // fade out, then remove from the page
  useEffect(() => {
    if (phase !== "out") return;
    const id = setTimeout(() => setPhase("done"), 800);
    return () => clearTimeout(id);
  }, [phase]);

  // no scrolling while the loader is on screen
  useEffect(() => {
    document.documentElement.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`loader ${phase === "out" ? "loader-out" : ""}`}
    >
      <div className="loader-glow" aria-hidden />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="loader-logo">
          <span className="loader-ring" aria-hidden />
          <Image
            src="/logo.jpeg"
            alt=""
            width={120}
            height={120}
            priority
            className="relative h-24 w-24 rounded-full border border-[#FFD84D]/70 bg-[#120804] sm:h-28 sm:w-28"
          />
        </div>

        <p className="glow-text mt-8 font-display text-xl uppercase tracking-[0.25em] text-[#F5C518] sm:text-3xl">
          {SITE.name}
        </p>

        <div className="mt-6 h-[2px] w-56 overflow-hidden rounded-full bg-[#FF8A1F]/20 sm:w-72">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF7A18] via-[#F5C518] to-[#FFD84D] shadow-[0_0_10px_rgba(255,170,40,0.9)]"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="mt-3 text-[11px] font-semibold tracking-[0.3em] text-[#E9D6AE]/70">
          {pct}%
        </p>
      </div>
    </div>
  );
}

// ---------- Sections ----------
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#FF8A1F]/30 bg-[#1C120C]/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5"
        aria-label="Main"
      >
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <Logo />

          <span className="glow-text font-display text-sm leading-tight text-[#F5C518] sm:text-xl">
            {SITE.name}
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-5 lg:flex">
          {NAV.map(([l, h]) => (
            <li key={h}>
              <a
                href={h}
                className="group relative block rounded-lg px-3 py-2 text-sm text-[#E9D6AE]/85 transition-all duration-300 hover:bg-[#FF7A1F]/10 hover:text-[#FFD84D] hover:shadow-[0_0_18px_rgba(255,122,24,0.30)]"
              >
                <span className="relative z-10">{l}</span>

                {/* Orange → Yellow light line */}
                <span className="absolute bottom-1 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#FF7A18] via-[#F5C518] to-[#FFD84D] shadow-[0_0_8px_rgba(245,197,24,0.8)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}

          <li>
            <a
              href="#join"
              className="block rounded-lg border-2 border-[#FF9A1F] bg-gradient-to-r from-[#FF7A1A] to-[#F5C518] px-4 py-2 text-center font-bold text-[#1C120C] shadow-[0_0_18px_rgba(255,122,24,0.35)] transition-all duration-300 hover:scale-105 hover:from-[#FF8F3A] hover:to-[#FFD84D] hover:shadow-[0_0_28px_rgba(245,197,24,0.55)]"
            >
              Join now
            </a>
          </li>
        </ul>

        {/* Mobile Menu */}
        <details className="relative shrink-0 lg:hidden">
          <summary className="group cursor-pointer list-none rounded-lg border border-[#FF8A1F]/50 px-3 py-1.5 text-[#F5C518] transition-all duration-300 hover:border-[#FFD84D] hover:bg-[#FF7A1A]/10 hover:text-[#FFD84D] hover:shadow-[0_0_20px_rgba(255,122,24,0.4)] marker:hidden">
            <span className="font-medium">Menu</span>
          </summary>

          <ul className="absolute right-0 z-50 mt-3 w-56 space-y-1 rounded-xl border border-[#FF8A1F]/50 bg-gradient-to-br from-[#3A1C0B] to-[#1C120C] p-3 shadow-2xl shadow-black/70">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <a
                  href={h}
                  className="group relative block rounded-lg px-3 py-2.5 text-[#E9D6AE]/90 transition-all duration-300 hover:bg-[#FF7A1A]/10 hover:text-[#FFD84D] hover:shadow-[0_0_16px_rgba(255,122,24,0.3)] active:bg-[#FF7A1A]/15 active:text-[#FFD84D]"
                >
                  <span className="relative z-10">{l}</span>

                  {/* Light effect */}
                  <span className="absolute bottom-1 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#FF7A18] via-[#F5C518] to-[#FFD84D] shadow-[0_0_8px_rgba(245,197,24,0.8)] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}

            <li className="pt-1">
              <a
                href="#join"
                className="block rounded-lg border border-[#FF9A1F] bg-gradient-to-r from-[#FF7A1A] to-[#F5C518] px-3 py-2.5 text-center font-bold text-[#1C120C] shadow-[0_0_16px_rgba(255,122,24,0.35)] transition-all duration-300 hover:from-[#FF8F3A] hover:to-[#FFD84D] hover:shadow-[0_0_25px_rgba(245,197,24,0.55)]"
              >
                Join now
              </a>
            </li>
          </ul>
        </details>
      </nav>
    </header>
  );
}

/* =====================================================================
   NEW (2): HERO SCROLL
   - wrapper is now TALL (230svh) so the hero stays pinned while you scroll
   - tagline / buttons / stats start hidden and RISE IN as you scroll
     (before, they were visible first and faded out: the opposite)
   - image zooms + blurs + goes black as you scroll
   ===================================================================== */
function HeroScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const clamp = (n: number) => Math.min(1, Math.max(0, n));

    const apply = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = clamp(-rect.top / (vh * 1.15));

      // image: zoom, blur, dim to black
      node.style.setProperty("--blur", `${(progress * 9).toFixed(2)}px`);
      node.style.setProperty("--scale", (1 + progress * 0.22).toFixed(3));
      node.style.setProperty("--dim", progress.toFixed(3));

      // title: lifts away and fades
      node.style.setProperty("--title-o", clamp(1 - progress * 1.25).toFixed(3));
      node.style.setProperty("--title-y", `${(-progress * 80).toFixed(2)}px`);

      // content: rises in one after another (0 = hidden, 1 = fully shown)
      const rise = (from: number, to: number) => clamp((progress - from) / (to - from));
      node.style.setProperty("--c1", rise(0.2, 0.55).toFixed(3));
      node.style.setProperty("--c2", rise(0.35, 0.7).toFixed(3));
      node.style.setProperty("--c3", rise(0.5, 0.85).toFixed(3));

      // buttons can be tapped only once they have appeared
      node.dataset.live = progress > 0.4 ? "1" : "0";
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <div
      id="top"
      ref={ref}
      data-live="0"
      style={{
        ["--blur" as any]: "0px",
        ["--scale" as any]: "1",
        ["--dim" as any]: "0",
        ["--title-o" as any]: "1",
        ["--title-y" as any]: "0px",
        ["--c1" as any]: "0",
        ["--c2" as any]: "0",
        ["--c3" as any]: "0",
      }}
      className="hero-scroll relative h-[230svh]"
    >
      {children}
    </div>
  );
}

function Hero() {
  const reveal = (v: string): CSSProperties => ({
    opacity: `var(${v})`,
    transform: `translateY(calc((1 - var(${v})) * 40px))`,
  });

  return (
    <HeroScroll>
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden">
        {/* 1. Background art (text-free warriors image at /public/hero.png) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-40 bg-cover bg-[center_top] bg-no-repeat will-change-transform"
          style={{
            backgroundImage: "url('/hero.png')",
            filter: "blur(var(--blur))",
            transform: "scale(var(--scale))",
          }}
        />

        {/* Dark overlay that grows as you scroll */}
        <div
          aria-hidden
          className="absolute inset-0 -z-30 bg-[#0b0301]"
          style={{ opacity: "var(--dim)" }}
        />

        {/* Sunset glow + bottom fade */}
        <div aria-hidden className="sun-glow -z-30" />
        <div
          aria-hidden
          className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(255,140,0,0.2)_0%,rgba(40,12,0,0.25)_50%,#0b0301_95%)]"
        />

        {/* Ground dust haze */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[48%] -z-20 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,170,40,0.45),transparent_70%)]"
        />

        {/* Corner fire */}
        <div aria-hidden className="flame flame-left -z-20" />
        <div aria-hidden className="flame flame-right -z-20" />

        {/* Floating sparks */}
        <div className="hero-sparks pointer-events-none" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} className={`hero-spark hero-spark-${index + 1}`} />
          ))}
        </div>

        {/* Flying embers */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="ember"
              style={
                {
                  "--x": e.x,
                  "--w": e.w,
                  "--dur": e.dur,
                  "--delay": e.delay,
                  "--drift": e.drift,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* ===== Big title banner (fades & lifts away on scroll) ===== */}
        <div
          className="absolute inset-x-0 top-0 z-10 flex justify-center px-2 pt-16 sm:pt-20"
          style={{
            opacity: "var(--title-o)",
            transform: "translateY(var(--title-y))",
            pointerEvents: "none",
          }}
        >
          <div className="title-fx relative w-full max-w-[1400px]">
            <img
              src="/heros.gif"
              alt="Padaivedu Silambam warriors in front of a Tamil temple at sunset"
              className="title-glow block w-full object-contain"
            />
            {/* sliding light sweep */}
            <span aria-hidden className="title-shine" />
            {/* twinkling sparkles */}
            {SPARKLES.map((s, i) => (
              <span
                key={i}
                aria-hidden
                className="title-sparkle"
                style={
                  {
                    left: s.x,
                    top: s.y,
                    "--s": s.size,
                    "--d": s.delay,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>

        {/* ===== Content that rises in over the dark background ===== */}
        <div className="hero-rise relative z-20 mx-auto mt-auto flex w-full max-w-6xl flex-col items-center px-4 pb-10 text-center sm:pb-14">
          {/* Tagline (plain text, no box) */}
          <div style={reveal("--c1")} className="will-change-transform">
            <div aria-hidden className="mx-auto flex w-full max-w-md items-center gap-3 pb-5">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#ffc72c]" />
              <span className="h-2 w-2 rotate-45 border border-[#ffd24a] bg-[#ff9a1f]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#ffc72c]" />
            </div>
            <p className="mx-auto max-w-2xl font-display text-xs uppercase leading-6 tracking-[0.16em] text-[#F5E5C5] [text-shadow:0_2px_12px_rgba(0,0,0,0.95)] sm:text-base sm:leading-8">
              Discover the ancient Tamil art of Silambam. Build strength, sharpen your focus and carry a
              proud warrior tradition into the future.
            </p>
          </div>

          {/* Buttons */}
          <div
            style={reveal("--c2")}
            className="mt-7 flex flex-wrap items-center justify-center gap-4 will-change-transform"
          >
            <Link
              href="#training"
              className="btn-fire inline-flex items-center rounded-md px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2a0f00] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a] sm:text-sm"
            >
              Explore training
            </Link>
            <Link
              href="#join"
              className="inline-flex items-center rounded-md border border-[#ffc72c]/80 bg-black/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#ffd24a] transition hover:bg-[#ffc72c]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a] sm:text-sm"
            >
              Join the academy
            </Link>
          </div>

          {/* Stats (no box, no icons: gold number + small white caps label) */}
          <ul
            style={reveal("--c3")}
            className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-8 will-change-transform md:grid-cols-4"
          >
            {STATS.map((s) => (
              <li key={s.label} className="text-center">
                <span className="block font-display text-3xl leading-none text-[#F5C518] [text-shadow:0_0_14px_rgba(255,160,30,0.55)] sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-xs">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HeroScroll>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-20"
    >
      <Image
        src="/why.png"
        alt=""
        fill
        sizes="100vw"
        //className="object-cover object-[75%_center] brightness-[0.5] sm:object-right"
        className="about-bg object-cover brightness-[0.5] sm:object-right"
      />

      {/* Dark overlay - makes text clear */}
      <div className="absolute inset-0 bg-[#1C120C]/75" />

      {/* Orange cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A2408]/80 via-[#2A1308]/75 to-[#120805]/90" />

      {/* Soft center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,166,0,0.16),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <div className="max-w-4xl">
          <Heading className="glow-text">
            Old Tradition...! New Warriors...!
          </Heading>

          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] sm:text-lg">
            Padaivedu Yudhakalam carries the ancient Tamil art of Silambam
            to future generations through training, strength and tradition.
          </p>

          <div className="mt-7">
            <Btn href="#why" solid>
              Read our story
            </Btn>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map(([t, d], i) => (
            <article
              key={t}
              data-reveal
              style={vars({ "--i": i })}
              className={`rounded-xl border border-[#FF9A1F]/50 bg-[#1C120C]/80 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD84D]/80 hover:bg-[#241006]/90 hover:shadow-[0_0_30px_rgba(255,122,24,0.2)] ${
                i === 2 ? "sm:col-span-2" : ""
              }`}
            >
              <h3 className="font-display text-xl text-[#FFD84D] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                {t}
              </h3>

              <p className="mt-2 leading-7 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {d}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom golden line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent shadow-[0_0_15px_#FF7A18]" />
    </section>
  );
}

function Why() {
  return (
    <section
      id="why"
      className="relative scroll-mt-20 overflow-hidden bg-[#1C0D05] py-20 sm:py-24"
    >
      {/* Background image: banner, dimmed, focused on the fighter (right side) */}
      <Image
        src="/why.png"
        alt=""
        fill
        sizes="100vw"
        className="about-bg object-cover brightness-[0.5] sm:object-right"
        //className="object-cover object-[75%_center] brightness-[0.5] sm:object-right"
      />

      {/* Dark overlay so the cards and text stay clear */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#1C0D05]/90 via-[#1C0D05]/75 to-[#1C0D05]/95"
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF7A18]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#F5C518]/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-72 w-72 rounded-full bg-[#FF7A18]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#FF9A1F]">
            Why Padaivedu
          </p>

          <Heading center className="glow-text">
            What Sets Us Apart
          </Heading>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#E9D6AE]/85 sm:text-base">
            More than martial arts — we build discipline, strength,
            confidence and a deeper connection to Tamil warrior heritage.
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#FF7A18]" />
            <span className="h-2 w-2 rotate-45 border border-[#FFD84D] bg-[#FF7A18]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#FF7A18]" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ title, desc }, i) => (
            <article
              key={title}
              data-reveal
              className="group relative overflow-hidden rounded-2xl border border-[#FF8A1F]/30 bg-gradient-to-br from-[#3A1607]/85 to-[#1E0D06]/90 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#FFD84D]/60 hover:shadow-[0_15px_45px_rgba(255,122,24,0.18)] active:border-[#FFD84D]/60"
              style={vars({ "--i": i })}
            >
              {/* Top glow */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF9A1F] to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Number */}
              <div className="mb-5 flex items-center justify-between">
                <span className="font-display text-3xl text-[#FF7A18]/30 transition-colors duration-300 group-hover:text-[#FF7A18]/55">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FF9A1F]/30 bg-[#FF7A18]/10 text-lg text-[#FFD84D] transition-all duration-300 group-hover:border-[#FFD84D]/60 group-hover:bg-[#FF7A18]/20 group-hover:shadow-[0_0_18px_rgba(255,122,24,0.25)]">
                  ✦
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl text-[#FFD84D] transition-colors duration-300 group-hover:text-[#FFE58A]">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-3 leading-7 text-[#E9D6AE]/85">
                {desc}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-[#FF7A18] to-[#FFD84D] transition-transform duration-500 group-hover:scale-x-100" />
            </article>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="font-display text-lg text-[#FFD84D]/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] sm:text-xl">
            “Train the body. Sharpen the mind. Carry the tradition.”
          </p>
        </div>
      </div>
    </section>
  );
}

function Training() {
  return (
    <section
      id="training"
      className="relative scroll-mt-20 overflow-hidden bg-[#160A04] py-20 sm:py-24"
    >
      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#160A04]/90 via-[#160A04]/80 to-[#160A04]/95"
      />
      {/* Background image: banner, dimmed */}
      <Image
        src="/coming-up.png"
        alt=""
        fill
        sizes="100vw"
        //className="training-bg object-cover brightness-[0.1] sm:object-right"
        className="object-cover object-[75%_center] brightness-[0.1] sm:object-right"
      />

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#FF7A18]/8 blur-[60px] sm:blur-[120px]" />

        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#F5C518]/5 blur-[50px] sm:blur-[100px]" />

        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[#FF7A18]/5 blur-[55px] sm:blur-[110px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,166,0,0.06),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">
            Training at Padaivedu
          </p>
          <Heading center className="glow-text">
            Programs We Teach
          </Heading>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#E9D6AE]/85 sm:text-base">
            Explore the traditional arts, combat techniques and physical
            disciplines that shape every Padaivedu warrior.
          </p>

          {/* Decorative divider */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#FF8A1F]" />
            <span className="h-2.5 w-2.5 rotate-45 border border-[#FFD84D] bg-[#FF7A18]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#FF8A1F]" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-[#E9D6AE]/60">
            10 disciplines · One warrior journey
          </p>
        </div>

        {/* Orbit */}
        <div className="relative mx-auto mt-12 aspect-square w-full max-w-[700px] sm:mt-16">
          {/* Outer atmospheric glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7A18]/5 blur-3xl" />

          {/* Outer ring */}
          <div className="pointer-events-none absolute inset-[9%] rounded-full border border-[#FF9A1F]/20" />

          {/* Dashed rotating ring */}
          <div className="pointer-events-none absolute inset-[14%]">
            <div className="spin-ring h-full w-full rounded-full border border-dashed border-[#FF9A1F]/35" />
          </div>

          {/* Inner ring */}
          <div className="pointer-events-none absolute inset-[27%] rounded-full border border-[#FFD84D]/15" />

          {/* Inner glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7A18]/10 blur-2xl" />

          {/* Connecting branches */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
          >
            {ITEMS.map((it, i) => {
              const end = pt(i);
              const a = angle(i) + 0.3;

              const cx = Number((50 + R * 0.55 * Math.cos(a)).toFixed(2));
              const cy = Number((50 + R * 0.55 * Math.sin(a)).toFixed(2));

              return (
                <g key={it.title}>
                  <path
                    d={`M50 50 Q ${cx} ${cy} ${end.x} ${end.y}`}
                    stroke="#FF8A1F"
                    strokeOpacity="0.18"
                    strokeWidth="1"
                  />

                  <path
                    d={`M50 50 Q ${cx} ${cy} ${end.x} ${end.y}`}
                    stroke="#FFD84D"
                    strokeOpacity="0.28"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center logo */}
          <a
            href="#logo-popup"
            aria-label="Show academy logo"
            className="group absolute left-1/2 top-1/2 z-20 w-[27%] -translate-x-1/2 -translate-y-1/2"
          >
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-full bg-[#FF7A18]/15 blur-xl transition-all duration-500 group-hover:bg-[#FF7A18]/30" />

            {/* Gold ring */}
            <div className="relative rounded-full border border-[#FFD84D]/50 bg-[#120804] p-2 shadow-[0_0_35px_rgba(255,122,24,0.25)] transition-all duration-500 group-hover:scale-105 group-hover:border-[#FFD84D] group-hover:shadow-[0_0_55px_rgba(255,122,24,0.45)] group-active:scale-105">
              <Image
                src="/logo.jpeg"
                alt="Padaivedu Yudhakalam"
                width={240}
                height={240}
                className="h-auto w-full rounded-full"
              />
            </div>

            {/* Center label */}
            <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.2em] text-[#FFD84D]/80 sm:text-[10px]">
              Our Warrior Path
            </span>
          </a>

          {/* Program circles */}
          {ITEMS.map((it, i) => {
            const { x, y } = pt(i);

            return (
              <div
                key={it.title}
                className="absolute w-[18%] -translate-x-1/2 -translate-y-1/2 sm:w-[13.5%]"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <a
                  href={`#prog-${i}`}
                  aria-label={`Watch ${it.title}`}
                  data-reveal
                  style={vars({ "--i": i })}
                  className="group relative block active:scale-95"
                >
                  {/* Circle */}
                  <span className="relative block aspect-square overflow-hidden rounded-full border border-[#FF9A1F]/70 bg-[#211006] p-[3px] shadow-[0_0_0_3px_rgba(255,122,24,0.06)] transition-all duration-500 group-hover:scale-110 group-hover:border-[#FFD84D] group-hover:shadow-[0_0_30px_rgba(255,122,24,0.45)] group-active:scale-110 group-active:border-[#FFD84D]">
                    <span className="relative block h-full w-full overflow-hidden rounded-full">
                      <Image
                        src={it.img}
                        alt={it.title}
                        fill
                        sizes="(min-width:640px) 90px, 18vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Image darkening */}
                      <span className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/5" />
                    </span>
                  </span>

                  {/* Number */}
                  <span className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full border border-[#FFD84D]/50 bg-[#211006] text-[8px] font-bold text-[#FFD84D] shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Program name (desktop only; mobile uses the list below) */}
                  <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-[#FF9A1F]/20 bg-[#160A04]/90 px-2.5 py-1 text-[10px] font-medium text-[#F5E5C5] shadow-lg backdrop-blur-md sm:block sm:text-xs">
                    {it.title}
                  </span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Mobile program list */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:hidden">
          {ITEMS.map((it, i) => (
            <a
              key={it.title}
              href={`#prog-${i}`}
              data-reveal
              style={vars({ "--i": i })}
              className="flex items-center gap-3 rounded-xl border border-[#FF9A1F]/30 bg-[#211006]/80 p-3 active:scale-95 active:border-[#FFD84D]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#FF9A1F]/60 font-display text-sm text-[#FFD84D]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium leading-tight text-[#F5E5C5]">
                {it.title}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom instruction */}
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 text-center">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FF8A1F]/30" />

          <p className="text-xs uppercase tracking-[0.2em] text-[#E9D6AE]/60">
            Select a discipline to explore
          </p>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FF8A1F]/30" />
        </div>
      </div>

      {/* Program popups */}
      {ITEMS.map((it, i) => (
        <div
          key={it.title}
          id={`prog-${i}`}
          className="fixed inset-0 z-50 hidden items-center justify-center p-4 target:flex"
        >
          {/* Backdrop */}
          <a
            href="#training"
            aria-label="Close"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Popup */}
          <div className="popup-card relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#FF9A1F]/40 bg-[#1A0C05] p-4 shadow-[0_0_60px_rgba(255,122,24,0.25)] sm:p-5">
            {/* Top accent */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#FF7A18] via-[#FFD84D] to-[#FF7A18]" />

            {/* Media */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <Image
                src={it.img}
                alt={it.title}
                fill
                sizes="(min-width:448px) 448px, 90vw"
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="px-2 pb-1 pt-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF9A1F]">
                Training Discipline
              </p>

              <h3 className="mt-2 font-display text-2xl text-[#FFD84D]">
                {it.title}
              </h3>

              <a
                href="#training"
                className="mt-5 inline-flex items-center rounded-lg border border-[#FF9A1F]/50 bg-[#FF7A18]/10 px-6 py-2.5 text-sm font-bold text-[#FFD84D] transition-all duration-300 hover:border-[#FFD84D] hover:bg-[#FF7A18]/20 active:scale-95"
              >
                Close
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Logo popup */}
      <div
        id="logo-popup"
        className="fixed inset-0 z-50 hidden items-center justify-center p-4 target:flex"
      >
        <a
          href="#training"
          aria-label="Close"
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        <div className="popup-card relative max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-3xl border border-[#FF9A1F]/40 bg-[#1A0C05] p-6 text-center shadow-[0_0_60px_rgba(255,122,24,0.25)]">
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#FF7A18] via-[#FFD84D] to-[#FF7A18]" />

          <Image
            src="/logo.jpeg"
            alt="Padaivedu Yudhakalam logo"
            width={320}
            height={320}
            className="mx-auto h-auto w-full max-w-[260px] rounded-full"
          />

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF9A1F]">
            Our Identity
          </p>

          <h3 className="mt-2 font-display text-xl text-[#FFD84D]">
            {SITE.name}
          </h3>

          <p className="mt-2 text-sm text-[#E9D6AE]/70">
            Tradition • Discipline • Strength
          </p>

          <a
            href="#training"
            className="mt-5 inline-flex rounded-lg border border-[#FF9A1F]/50 px-6 py-2.5 text-sm font-bold text-[#FFD84D] transition-all duration-300 hover:border-[#FFD84D] hover:bg-[#FF7A18]/10 active:scale-95"
          >
            Close
          </a>
        </div>
      </div>
    </section>
  );
}

function Women() {
  return (
    <section
      id="women"
      className="relative scroll-mt-20 overflow-hidden bg-umber py-16 sm:py-20"
    >
      {/* Background photo: she stays on the right side */}
      <Image
        src="/women-bg.jpg"
        alt="A woman practising Silambam with a bamboo staff on the beach at sunset"
        fill
        sizes="100vw"
        className="women-bg object-cover md:object-right"
        //className="object-cover object-[75%_center] md:object-right"
      />

      {/* Overlay: dark on the left where the text is, clear on the right where she stands.
          On phones (no space beside the text) it is darker all over. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#1C120C]/85 via-[#1C120C]/75 to-[#1C120C]/85 md:bg-gradient-to-r md:from-[#1C120C]/95 md:via-[#1C120C]/70 md:to-[#1C120C]/0"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <div className="md:max-w-[52%]">
          <h2 className="glow-text font-display text-3xl leading-tight text-sand sm:text-5xl">
            She Learns. She Leads. She Protects.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#FFF3D6] [text-shadow:0_2px_8px_rgba(0,0,0,0.7)] sm:text-lg">
            Silambam does not create courage in her; it brings out the courage that is already there.
          </p>

          <ul className="mt-6 space-y-3">
            {WOMEN_POINTS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 border-b border-ember/25 pb-3 text-[#FFF3D6] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]"
              >
                {/* SVG tick, so it always matches the theme (the ✔ character turns purple as an emoji) */}
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="#FF9A1F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Btn href="#join" solid>Register free</Btn>
          </div>

          {/* Stats card */}
          <div
            data-reveal
            className="mt-10 rounded-2xl border border-ember/40 bg-[#1C120C]/70 p-6 text-center backdrop-blur-sm sm:p-8"
          >
            <h3 className="font-display text-2xl text-gold sm:text-3xl">Fearless Women</h3>
            <p className="mt-1 text-sand/90">Ancient Art, Modern Defence</p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-ember/25 pt-6">
              {[
                ["40%", "of our students"],
                ["Free", "kit and classes"],
                ["3 months", "starter course"],
              ].map(([n, l]) => (
                <div key={n}>
                  <dt className="bg-gradient-to-b from-[#FFD84D] to-[#FF7A18] bg-clip-text font-display text-xl font-bold text-transparent sm:text-2xl">
                    {n}
                  </dt>
                  <dd className="mt-1 text-sm text-[#E9D6AE]/85">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section
      id="achievements"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28 lg:min-h-[640px]"
    >
      {/* Background image – anchor the trophy to the right */}
      <div
        //className="absolute inset-0 bg-cover bg-[70%_center] lg:bg-right"
        className="achievement-bg absolute inset-0 bg-cover lg:bg-right"
        style={{ backgroundImage: "url('/win.png')" }}
      />

      {/* Extra darkening on phones so the text stays readable */}
      <div className="absolute inset-0 bg-black/45 lg:bg-transparent" />

      {/* Dark only on the text side, fading to clear over the trophy */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent lg:via-black/50" />

      {/* Light edge vignette instead of a full dark wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,transparent_40%,rgba(0,0,0,0.5)_100%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <div className="max-w-xl">
          <Heading className="glow-text text-white">Our proudest wins</Heading>

          <div className="mt-10 grid gap-5">
            {ACHIEVEMENTS.map(([t, d], i) => (
              <article
                key={t}
                data-reveal
                style={vars({ "--i": i })}
                className="border-l-4 border-amber-400 bg-black/60 p-6 transition-colors duration-300 hover:bg-black/75"
              >
                <h3 className="text-xl font-bold text-amber-300">{t}</h3>
                <p className="mt-2 text-white/90">{d}</p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Btn href="#achievements">See all achievements</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section
      id="events"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-20"
    >
      {/* Background Image */}
      <div
        className="achievement-bg absolute inset-0 bg-cover lg:bg-right "
        style={{
          backgroundImage: "url('/coming-up.png')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Orange/gold cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-orange-950/20 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-5">
        <Heading center className="glow-text text-white">
          Coming up
        </Heading>

        {EVENTS.length ? (
          <ul className="mt-10 space-y-4">
            {EVENTS.map(([t, d], i) => (
              <li
                key={t}
                data-reveal
                style={vars({ "--i": i })}
                className="rounded-xl border border-amber-300/40 bg-black/40 p-5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/55"
              >
                <b className="text-amber-300">{t}</b>

                <p className="mt-1 text-white/80">
                  {d}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p
            data-reveal
            className="
              mx-auto mt-10 max-w-xl rounded-xl
              border border-amber-300/50
              bg-black/45
              p-6 text-center
              text-base text-white/90
              backdrop-blur-sm
              sm:p-8 sm:text-lg
            "
          >
            No events are scheduled right now. Join the academy and we will
            tell you the moment a date is set.
          </p>
        )}

        <div className="mt-8 text-center">
          <Btn href="#events">
            See all events
          </Btn>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const n = ITEMS.length;

  return (
    <section
      id="gallery"
      className="relative scroll-mt-20 overflow-hidden bg-[#160d08] py-20 sm:py-28"
    >
      {/* Background image: banner, dimmed */}
      <Image
        src="/coming-up.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[75%_center] brightness-[0.1] sm:object-right"
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/10 blur-[70px] sm:blur-[140px]" />

      {/* Decorative lines */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-orange-400">
            The Art of Silambam
          </p>

          <Heading center className="glow-text">
            Choose your path
          </Heading>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-300 sm:text-base">
            Ten disciplines. One ancient tradition. Discover the path that
            matches your skill, discipline and ambition.
          </p>
        </div>

        {/* Main showcase */}
        <div className="mx-auto mt-14 max-w-6xl">
          {/* Program selector */}
          <div
            role="radiogroup"
            aria-label="Silambam programs"
            className={`relative ${SELECT}`}
          >
            {/* Hidden radios */}
            {ITEMS.map((it, i) => (
              <div key={it.title} className="contents">
                <input
                  type="radio"
                  name="programs"
                  id={`p${i}`}
                  defaultChecked={i === 0}
                  aria-label={it.title}
                  className="peer sr-only"
                />

                {/* Main panel */}
                <div
                  className="
                    invisible
                    absolute
                    inset-0
                    opacity-0
                    transition-all
                    duration-700
                    peer-checked:visible
                    peer-checked:relative
                    peer-checked:opacity-100
                  "
                >
                  <div className="grid min-h-[520px] overflow-hidden rounded-[2rem] border border-orange-300/20 bg-[#21150e] shadow-[0_30px_100px_rgba(0,0,0,0.45)] lg:grid-cols-2">
                    {/* IMAGE */}
                    <div className="group relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
                      {/* Blurred copy (desktop only, heavy on phones) */}
                      <Image
                        src={it.img}
                        alt={it.title}
                        fill
                        aria-hidden
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{ objectPosition: it.pos ?? "center" }}
                        className="hidden scale-125 object-cover opacity-50 blur-2xl sm:block"
                      />

                      {/* Main image: auto-fits fully, never cropped */}
                      <Image
                        src={it.img}
                        alt={it.title}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain p-2 transition-transform duration-[1.5s] group-hover:scale-105 sm:p-4"
                      />

                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Orange cinematic light */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-black/30" />

                      {/* Image label */}
                      <div className="absolute bottom-7 left-7">
                        <span className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md">
                          Silambam Academy
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                      {/* Number */}
                      <div className="mb-7 flex items-center gap-4">
                        <span className="text-xs tracking-[0.4em] text-orange-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <span className="h-px w-16 bg-orange-400/50" />

                        <span className="text-xs tracking-[0.3em] text-stone-500">
                          {String(n).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-4xl leading-tight text-amber-300 sm:text-5xl">
                        {it.title}
                      </h3>

                      {/* Tamil */}
                      <p className="mt-3 text-lg text-orange-300/80">
                        {it.ta}
                      </p>

                      {/* Description */}
                      <div className="my-7 h-px w-20 bg-gradient-to-r from-orange-500 to-transparent" />

                      <p className="max-w-md text-base leading-8 text-stone-300">
                        {it.desc}
                      </p>

                      {/* Features */}
                      <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <span className="block text-orange-400">
                            Discipline
                          </span>
                          <span className="mt-1 block text-stone-300">
                            Traditional
                          </span>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <span className="block text-orange-400">
                            Training
                          </span>
                          <span className="mt-1 block text-stone-300">
                            Progressive
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-9 flex flex-wrap items-center gap-3">
                        <label
                          htmlFor={`p${(i + n - 1) % n}`}
                          className="
                            grid h-11 w-11 cursor-pointer
                            place-items-center rounded-full
                            border border-orange-400/40
                            text-lg text-amber-300
                            transition hover:border-orange-400
                            hover:bg-orange-400/10
                            active:scale-95
                          "
                        >
                          ←
                        </label>

                        <a
                          href="#contact"
                          className="
                            rounded-full
                            bg-gradient-to-r
                            from-orange-500
                            to-amber-400
                            px-7 py-3
                            text-sm font-bold
                            text-[#24150b]
                            shadow-lg
                            shadow-orange-500/20
                            transition
                            hover:scale-105
                            hover:shadow-orange-500/40
                            active:scale-95
                          "
                        >
                          Begin Training
                        </a>

                        <label
                          htmlFor={`p${(i + 1) % n}`}
                          className="
                            grid h-11 w-11 cursor-pointer
                            place-items-center rounded-full
                            border border-orange-400/40
                            text-lg text-amber-300
                            transition hover:border-orange-400
                            hover:bg-orange-400/10
                            active:scale-95
                          "
                        >
                          →
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Program dots */}
                  <div className="mt-7 flex justify-center gap-2">
                    {ITEMS.map((d, j) => (
                      <label
                        key={d.title}
                        htmlFor={`p${j}`}
                        aria-label={`Go to ${d.title}`}
                        className={`
                          h-1.5 cursor-pointer rounded-full
                          transition-all duration-300
                          ${
                            j === i
                              ? "w-10 bg-orange-400"
                              : "w-2 bg-stone-600 hover:bg-orange-300"
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Select a discipline to explore
          </p>
        </div>
      </div>
    </section>
  );
}

function Join() {
  return (
    <section
      id="join"
      className="relative scroll-mt-20 overflow-hidden bg-[#140803] px-4 py-16 sm:px-5 sm:py-24"
    >
      {/* Base warm gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#1a0a04_0%,#2a0f04_50%,#1a0a04_100%)]"
      />

      {/* Sun glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] max-w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFE27A_0%,#FFB020_22%,#FF7A18_45%,transparent_70%)] opacity-50 blur-2xl"
      />

      {/* Rays fanning out from the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] max-w-[200%] -translate-x-1/2 -translate-y-1/2 opacity-25 [mask-image:radial-gradient(circle,black_15%,transparent_65%)]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,200,60,0.55) 0deg 2deg, transparent 2deg 12deg)",
        }}
      />

      {/* Fine diamond pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(45deg,#FFD84D 1px,transparent 1px),linear-gradient(-45deg,#FFD84D 1px,transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1100px] max-w-[200%] -translate-x-1/2 -translate-y-[40%] opacity-30 [mask-image:radial-gradient(circle,black_20%,transparent_70%)]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,200,60,0.55) 0deg 2deg, transparent 2deg 12deg)",
        }}
      />

      {/* Embers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-[10%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#FFB020] shadow-[0_0_12px_4px_rgba(255,160,30,0.7)]" />
        <span className="absolute left-[22%] top-[72%] h-1 w-1 rounded-full bg-[#FFD84D] shadow-[0_0_10px_3px_rgba(255,216,77,0.7)]" />
        <span className="absolute left-[85%] top-[28%] h-1 w-1 rounded-full bg-[#FF7A18] shadow-[0_0_10px_3px_rgba(255,122,24,0.7)]" />
        <span className="absolute left-[90%] top-[68%] h-1.5 w-1.5 rounded-full bg-[#FFB020] shadow-[0_0_12px_4px_rgba(255,160,30,0.7)]" />
        <span className="absolute left-[70%] top-[85%] h-1 w-1 rounded-full bg-[#FFD84D] shadow-[0_0_10px_3px_rgba(255,216,77,0.7)]" />
      </div>

      {/* Card */}
      <div
        data-reveal
        className="relative z-10 mx-auto max-w-4xl rounded-2xl border border-[#FF9A1F]/40 bg-[#160A04]/70 p-8 text-center shadow-[0_0_60px_rgba(255,122,24,0.2)] backdrop-blur-md sm:p-14"
      >
        {/* Top gold accent line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent" />

        <h2 className="glow-text font-display text-3xl text-white sm:text-5xl">
          Ready to pick up the staff?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#F5E5C5]/90 sm:text-lg">
          Hundreds of students have changed their lives through Silambam. A new
          three-month beginner batch starts every month, and seats are limited.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Btn href={TEL} solid>Enroll now</Btn>
          <Btn href="#training">Browse programs</Btn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-[#140803] pb-20 pt-20 sm:pb-0"
    >
      {/* Base warm gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#2a0f04_0%,#1a0a04_45%,#0f0502_100%)]"
      />

      {/* Rising sun: molten gold arc from the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] max-w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFE27A_0%,#FFB020_22%,#FF7A18_45%,transparent_70%)] opacity-80 blur-2xl"
      />

      {/* Rays fanning out like a spinning staff */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1100px] max-w-[200%] -translate-x-1/2 -translate-y-[40%] opacity-30 [mask-image:radial-gradient(circle,black_20%,transparent_70%)]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,200,60,0.55) 0deg 2deg, transparent 2deg 12deg)",
        }}
      />

      {/* Fine diamond pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(45deg,#FFD84D 1px,transparent 1px),linear-gradient(-45deg,#FFD84D 1px,transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Embers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-[12%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#FFB020] shadow-[0_0_12px_4px_rgba(255,160,30,0.7)]" />
        <span className="absolute left-[30%] top-[62%] h-1 w-1 rounded-full bg-[#FFD84D] shadow-[0_0_10px_3px_rgba(255,216,77,0.7)]" />
        <span className="absolute left-[58%] top-[30%] h-1 w-1 rounded-full bg-[#FF7A18] shadow-[0_0_10px_3px_rgba(255,122,24,0.7)]" />
        <span className="absolute left-[78%] top-[55%] h-1.5 w-1.5 rounded-full bg-[#FFB020] shadow-[0_0_12px_4px_rgba(255,160,30,0.7)]" />
        <span className="absolute left-[92%] top-[25%] h-1 w-1 rounded-full bg-[#FFD84D] shadow-[0_0_10px_3px_rgba(255,216,77,0.7)]" />
      </div>

      {/* Glowing gold divider with diamond */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-center">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FFD84D] to-[#FF8A1F]" />
        <span className="mx-3 h-3 w-3 rotate-45 border border-[#FFF3B0] bg-[#FF7A18] shadow-[0_0_18px_6px_rgba(255,160,30,0.8)]" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#FFD84D] to-[#FF8A1F]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-5 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Logo />
              <span className="glow-text font-display text-xl text-[#FFD84D]">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 text-[#F5E5C5]/85">
              Tamil staff fighting, taught with discipline, strength and heritage.
            </p>
          </div>

          <div>
            <h3 className="glow-text font-display text-lg text-[#FFB020]">Quick links</h3>
            <ul className="mt-3 space-y-2 text-[#F5E5C5]/85">
              {NAV.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition hover:text-[#FFD84D]">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="glow-text font-display text-lg text-[#FFB020]">Programs</h3>
            <ul className="mt-3 space-y-2 text-[#F5E5C5]/85">
              {PROGRAMS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="glow-text font-display text-lg text-[#FFB020]">Contact us</h3>
            <ul className="mt-3 space-y-3 text-[#F5E5C5]/85">
              <li>{SITE.place}</li>
              <li>
                <a className="transition hover:text-[#FFD84D]" href={TEL}>{SITE.phone}</a>
              </li>
              <li className="break-words">
                <a className="transition hover:text-[#FFD84D]" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-[#FF9A1F]/25 px-4 py-6 text-sm text-[#F5E5C5]/65 sm:px-5">
          <p>© 2026 Padaivedu Yudhakalam. All rights reserved.</p>
          <p className="text-xs uppercase tracking-[0.3em] text-[#FFB020]/70">
            Tradition · Discipline · Strength
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingCall() {
  return (
    <a
      href={TEL}
      aria-label="Call the academy to enrol"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#F5C518] px-4 py-3 text-sm font-bold text-[#1C120C] shadow-lg shadow-black/40 hover:from-[#FF8F3A] hover:to-[#FFD84D] active:scale-95 sm:bottom-5 sm:right-5 sm:px-5 sm:text-base"
    >
      <span aria-hidden>📞</span> Enroll Today
    </a>
  );
}

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Why />
        <Divider />
        <Training />
        <Divider />
        <Women />
        <Divider />
        <Achievements />
        <Divider />
        <Events />
        <Divider />
        <Gallery />
        <Divider />
        <Join />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}
