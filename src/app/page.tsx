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
  ["Programs", "#training"],
  ["Virtues", "#virtues"],
  ["Women", "#women"],
  ["Achievements", "#achievements"],
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

const VIRTUES = [
  { title: "Discipline", desc: "Footwork, timing and form, repeated until they become second nature." },
  { title: "Strength", desc: "Full-body conditioning that builds the power every drill depends on." },
  { title: "Focus", desc: "A steady mind, sharpened with every strike and every breath." },
  { title: "Peace", desc: "Stay calm under pressure and let the tradition guide each step." },
  { title: "Courage", desc: "Face every opponent and every fear with an open heart." },
];
const ROMAN = ["I", "II", "III", "IV", "V"];

const WHY_POINTS = [
  ["Traditional lineage", "Lessons follow the Tamil Kalaripayattu line and the old warrior codes."],
  ["Structured training", "Clear levels and steady progress, so every student knows the next step."],
  ["Whole-body fitness", "Full-body drills build strength, flexibility and stamina together."],
  ["A calm, focused mind", "Patient practice grows focus and resilience in and out of the arena."],
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
  { title: "Single stick", img: "/programs/1-single-stick.jpg",
    desc: "The foundation of Silambam. Learn stance, footwork and the core strikes with a single staff." },
  { title: "Double stick", img: "/programs/2-double-stick.jpg",
    desc: "Train both hands together for speed, rhythm and coordination." },
  { title: "Surulvall", img: "/programs/3-surulvall.jpg",
    desc: "The flexible coiled blade. It demands control, timing and complete focus." },
  { title: "Vel Kambu", img: "/programs/4-vel-kambu.jpg",
    desc: "Spear-style training with thrusts and reach, built on balance and precision." },
  { title: "Maan Kombu", img: "/programs/5-maan-kombu.jpg",
    desc: "The twin-horn weapon for close defence and sharp counters." },
  { title: "Kuthuvarisai", img: "/programs/6-kuthuvarisai.jpg",
    desc: "Empty-hand combat built on strikes, blocks and body control." },
  { title: "Advanced Techniques", img: "/programs/7-advance-equipments-techniques.jpg",
    desc: "Higher-level equipment work and technique for experienced students." },
  { title: "Women's Self Defence", img: "/programs/8-womens-self-defence.jpg",
    desc: "Practical self-defence skills that build confidence and awareness." },
  { title: "Youth Program", img: "/programs/9-youth-program.jpg",
    desc: "A structured path for young students to learn Silambam with discipline." },
  { title: "Gymnastics", img: "/programs/10-gymnastics.jpg",
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

// Orange-to-yellow button look used by every solid button
const SOLID_BTN =
  "border-2 border-[#FF9A1F] bg-gradient-to-r from-[#FF7A1A] to-[#F5C518] text-[#1C120C] shadow-[0_0_20px_rgba(255,122,26,0.45)] hover:from-[#FF8F3A] hover:to-[#FFD84D]";

function vars(styles: Record<string, string | number>): CSSProperties {
  return styles as CSSProperties;
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

function Reveal({
  children,
  as = "div",
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  as?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag: any = as;
  const offset = {
    up: "translateY(20px)",
    down: "translateY(-20px)",
    left: "translateX(20px)",
    right: "translateX(-20px)",
  }[direction];

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : offset,
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

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
   LOADING SCREEN
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

// ---------- Nav ----------
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#FF8A1F]/30 bg-[#1C120C]/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5"
        aria-label="Main"
      >
        <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Logo />

          <span className="glow-text font-display text-sm leading-tight text-[#F5C518] sm:text-xl">
            {SITE.name}
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-4 xl:flex">
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
        <details className="relative shrink-0 xl:hidden">
          <summary 
              aria-label="Open menu"
              className="group flex h-10 w-10 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-lg border border-[#FF8A1F]/50 transition-all duration-300 hover:border-[#FFD84D] hover:bg-[#FF7A1A]/10 hover:shadow-[0_0_20px_rgba(255,122,26,0.4)] marker:hidden [&::-webkit-details-marker]:hidden"
          >
            <span className="block h-[2px] w-5 rounded-full bg-[#F5C518] transition-transform duration-300 group-open:translate-y-[7px] group-open:rotate-45" />
            <span className="block h-[2px] w-5 rounded-full bg-[#F5C518] transition-opacity duration-300 group-open:opacity-0" />
            <span className="block h-[2px] w-5 rounded-full bg-[#F5C518] transition-transform duration-300 group-open:-translate-y-[7px] group-open:-rotate-45" />

          </summary>

          <ul className="absolute right-0 z-50 mt-3 w-56 space-y-1 rounded-xl border border-[#FF8A1F]/50 bg-gradient-to-br from-[#3A1C0B] to-[#1C120C] p-3 shadow-2xl shadow-black/70">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <a
                  href={h}
                  className="group relative block rounded-lg px-3 py-2.5 text-[#E9D6AE]/90 transition-all duration-300 hover:bg-[#FF7A1A]/10 hover:text-[#FFD84D] hover:shadow-[0_0_16px_rgba(255,122,24,0.3)] active:bg-[#FF7A1A]/15 active:text-[#FFD84D]"
                >
                  <span className="relative z-10">{l}</span>

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
   HERO SCROLL
   The hero wrapper is tall and the hero inside is sticky, so it stays
   pinned while you scroll. Tagline / buttons / stats rise in as you scroll.
   The image zooms, blurs and goes black as you scroll.
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
      const progress = clamp(-rect.top / (vh * 0.7));
      const isMobile = window.innerWidth < 1024;

      // image: zoom, blur, dim to black
      node.style.setProperty("--blur", `${(progress * 9).toFixed(2)}px`);
      node.style.setProperty("--scale", (1 + progress * 0.22).toFixed(3));
      node.style.setProperty("--dim", (isMobile ? progress * 0.4 : progress).toFixed(3));

      // title: lifts away and fades
      node.style.setProperty("--title-o", clamp(1 - progress * 1.25).toFixed(3));
      node.style.setProperty("--title-y", `${(-progress * 80).toFixed(2)}px`);

      // content: rises in one after another (0 = hidden, 1 = fully shown)
      const rise = (from: number, to: number) => clamp((progress - from) / (to - from));
      node.style.setProperty("--c1", isMobile ? "1" : rise(0.2, 0.55).toFixed(3));
      node.style.setProperty("--c2", isMobile ? "1" : rise(0.35, 0.7).toFixed(3));
      node.style.setProperty("--c3", isMobile ? "1" : rise(0.5, 0.85).toFixed(3));

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
      className="hero-scroll relative h-[170svh] lg:h-[170svh]"
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
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden bg-[#0b0301] pt-[60px] lg:pt-0">
        {/* 1. Background art (text-free warriors image at /public/hero.png) */}
        <div
        aria-hidden
        className="absolute inset-0 z-0 bg-no-repeat will-change-transform hero-bg"
        style={{
          backgroundImage: "url('/hero.png')",
          //backgroundSize: "cover",
          //backgroundPosition: "60% top",
          //backgroundRepeat: "no-repeat",
          filter: "blur(var(--blur, 0px))",
          transform: "scale(var(--scale, 1))",
          }}
          />
          <span aria-hidden className="title-shine" />
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
        {/* ===== Content that rises in over the dark background ===== */}
        <div className="hero-rise relative z-20 mx-auto mt-auto flex w-full max-w-6xl flex-col items-center px-4 pb-10 text-center sm:pb-14">
          {/* Tagline (plain text, no box) */}
          <div style={reveal("--c1")} className="will-change-transform">
            <p className="mx-auto max-w-sm font-display text-sm uppercase leading-7 tracking-[0.12em] text-[#F5E5C5] [text-shadow:0_2px_12px_rgba(0,0,0,0.95)] sm:max-w-2xl sm:text-base sm:leading-8 sm:tracking-[0.16em]">
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



// ---------- About ----------
function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-24"
    >
      <Image
        src="/why.png"
        alt=""
        fill
        sizes="100vw"
        className="about-bg object-cover brightness-[0.5] sm:object-right"
      />
      <div className="absolute inset-0 bg-[#1C120C]/75" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A2408]/80 via-[#2A1308]/75 to-[#120805]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(255,166,0,0.16),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: story, one after another */}
          <div>
            <Reveal delay={0}>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFD84D]">
                <span className="h-px w-10 bg-[#FFD84D]/70" />
                Our roots
              </p>
            </Reveal>

            <Reveal delay={150}>
              <Heading className="glow-text mt-4">
                Old Tradition...!
                <span className="block text-[#FFD84D]">New Warriors...!</span>
              </Heading>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] sm:text-lg">
                Padaivedu Yudhakalam carries the ancient Tamil art of Silambam
                to future generations through training, strength and tradition.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p className="mt-4 max-w-xl leading-7 text-white/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Whether you are taking your first step or refining advanced
                forms, every session builds discipline, strength and pride in
                our heritage, one step at a time.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <blockquote className="mt-7 border-l-2 border-[#FF9A1F] pl-4">
                <p className="text-lg font-semibold text-[#FFD84D] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                  வீரம் பயிற்சியில் பிறக்கும்
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">
                  Courage is born in practice
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={600}>
              <div className="mt-8">
                <Btn href="#training" solid>
                  Read our story
                </Btn>
              </div>
            </Reveal>
          </div>

          {/* Right: highlights, one by one */}
          <ol className="divide-y divide-[#FFD84D]/25 lg:border-l lg:border-[#FFD84D]/25 lg:pl-12">
            {HIGHLIGHTS.map(([t, d], i) => (
              <Reveal key={t} as="li" delay={300 + i * 200} direction="right" className="first:pt-0 last:pb-0">
                <div className="group flex gap-5 py-6 transition-transform duration-300 hover:translate-x-1">
                  <span className="font-display text-3xl leading-none text-[#FF9A1F] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] transition-colors duration-300 group-hover:text-[#FFD84D]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-[#FFD84D] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                      {t}
                    </h3>
                    <p className="mt-2 leading-7 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent shadow-[0_0_15px_#FF7A18]" />
    </section>
  );
}
// ---------- Choose your weapon (programs) ----------
function Training() {
  const [active, setActive] = useState(0);
  const item = ITEMS[active];

  useEffect(() => {
  const timer = setInterval(() => {
    setActive((prev) => (prev + 1) % ITEMS.length);
  }, 3000);

  return () => clearInterval(timer);
}, []);

  return (
    <section
      id="training"
      className="relative scroll-mt-20 overflow-hidden bg-[#160A04] py-20 sm:py-24"
    >
      {/* Background image, dimmed */}
      <Image
        src="/coming-up.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[75%_center] brightness-[0.1] sm:object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#160A04]/90 via-[#160A04]/80 to-[#160A04]/95"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">
            Training at Padaivedu
          </p>
          <Heading center className="glow-text">
            Choose your weapon
          </Heading>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#E9D6AE]/85 sm:text-base">
            Traditional weapons and techniques of Silambam. Pick one to see what it teaches.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* Weapon list */}
         {/* <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1">
            {ITEMS.map((it, i) => {
              const selected = i === active;
              return (
                <li key={it.title}>
                  <button
                    type="button" 
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 sm:flex-col sm:justify-center sm:text-center lg:flex-row lg:justify-start lg:text-left ${
                      selected
                        ? "border-[#FFD84D] bg-[#FF7A18]/15 shadow-[0_0_25px_rgba(255,122,24,0.3)]"
                        : "border-[#FF9A1F]/25 bg-[#211006]/70 hover:border-[#FF9A1F]/60 hover:bg-[#211006]"
                    }`}
                  >
                    <span
                      className={`font-display text-sm transition-colors ${
                        selected ? "text-[#FFD84D]" : "text-[#FF9A1F]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium leading-tight text-[#F5E5C5]">
                      {it.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>*/}

          
<ul
  className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1"
  onTouchStart={(e) => {
    e.currentTarget.dataset.touchX = String(
      e.touches[0].clientX
    );
  }}
  onTouchEnd={(e) => {
    const start = Number(e.currentTarget.dataset.touchX);
    const end = e.changedTouches[0].clientX;

    if (Math.abs(end - start) > 50) {
      setActive((prev) =>
        end < start
          ? (prev + 1) % ITEMS.length
          : (prev - 1 + ITEMS.length) % ITEMS.length
      );
    }
  }}
>
  {ITEMS.map((it, i) => {
    const selected = i === active;

    return (
      <li key={it.title}>
        <button
          type="button"
          onClick={() => setActive(i)}
          aria-pressed={selected}
          className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 sm:flex-col sm:justify-center sm:text-center lg:flex-row lg:justify-start lg:text-left ${
            selected
              ? "border-[#FFD84D] bg-[#FF7A18]/15 shadow-[0_0_25px_rgba(255,122,24,0.3)]"
              : "border-[#FF9A1F]/25 bg-[#211006]/70 hover:border-[#FF9A1F]/60 hover:bg-[#211006]"
          }`}
        >
          <span
            className={`font-display text-sm ${
              selected ? "text-[#FFD84D]" : "text-[#FF9A1F]"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <span className="text-sm font-medium leading-tight text-[#F5E5C5]">
            {it.title}
          </span>
        </button>
      </li>
    );
  })}
</ul>


          {/* Detail card */}
          <div className="grid overflow-hidden rounded-[2rem] border border-[#FF9A1F]/30 bg-[#1A0C05]/90 shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:grid-cols-2">
            <div className="relative aspect-[4/3] bg-black md:aspect-auto md:min-h-[420px]">
              <Image
                key={item.img}
                src={item.img}
                alt={item.title}
                fill
                sizes="(min-width:768px) 40vw, 100vw"
                className="object-contain p-4 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <span className="font-display text-6xl leading-none text-[#FF7A18]/35">
                {String(active + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-3 font-display text-3xl leading-tight text-[#FFD84D] sm:text-4xl">
                {item.title}
              </h3>

              <div className="my-6 h-px w-20 bg-gradient-to-r from-[#FF7A18] to-transparent" />

              <p className="leading-8 text-[#E9D6AE]/85">{item.desc}</p>

              <div className="mt-8">
                <Btn href="#join" solid>
                  Begin training
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Five virtues (rotating card carousel) ----------
function Virtues() {
  const n = VIRTUES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // advance automatically, pause while the pointer is over the carousel
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 4000);
    return () => clearInterval(id);
  }, [paused, n]);

  const next = () => setActive((a) => (a + 1) % n);
  const prev = () => setActive((a) => (a - 1 + n) % n);

  return (
    <section
      id="virtues"
      className="relative scroll-mt-20 overflow-hidden bg-[#0d0503] py-20 sm:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Warm glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7A18]/10 blur-[80px] sm:blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF9A1F]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF9A1F]/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">
            The warrior’s code
          </p>
          <Heading center className="glow-text">
            Five virtues of a warrior
          </Heading>
        </div>

        {/* Carousel */}
        <div
          className="relative mx-auto mt-14 h-[330px] w-full max-w-4xl sm:h-[380px]"
          style={{ perspective: "1200px" }}
        >
          {VIRTUES.map((v, i) => {
            // position of this card relative to the active one, wrapped to -n/2..n/2
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const abs = Math.abs(offset);
            const isActive = offset === 0;

            return (
              <article
                key={v.title}
                onClick={() => setActive(i)}
                aria-hidden={!isActive}
                className={`absolute left-1/2 top-1/2 w-[230px] rounded-2xl border p-6 text-center transition-all duration-700 ease-out sm:w-[270px] ${
                  isActive
                    ? "cursor-default border-[#FFD84D]/70 bg-gradient-to-br from-[#4A1E08]/95 to-[#1E0D06]/98 shadow-[0_20px_60px_rgba(255,122,24,0.35)]"
                    : "cursor-pointer border-[#FF9A1F]/30 bg-gradient-to-br from-[#3A1607]/80 to-[#1E0D06]/85 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                }`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 130}px) translateZ(${-abs * 120}px) rotateY(${-offset * 16}deg) scale(${1 - abs * 0.1})`,
                  opacity: 1 - abs * 0.28,
                  zIndex: 10 - abs,
                }}
              >
                {/* Roman numeral badge */}
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#FFD84D]/50 bg-[#120804] font-display text-lg text-[#FFD84D] shadow-[0_0_25px_rgba(255,122,24,0.3)]">
                  {ROMAN[i]}
                </div>

                <h3 className="mt-5 font-display text-2xl text-[#FFD84D]">{v.title}</h3>

                <p className="mt-3 text-sm leading-6 text-[#F5E5C5]/85">{v.desc}</p>

                {/* Bottom accent, only on the active card */}
                <div
                  className={`mx-auto mt-5 h-px w-16 bg-gradient-to-r from-[#FF7A18] to-[#FFD84D] transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </article>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous virtue"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#FF9A1F]/50 text-lg text-[#FFD84D] transition hover:border-[#FFD84D] hover:bg-[#FF7A18]/15 active:scale-95"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {VIRTUES.map((v, i) => (
              <button
                key={v.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${v.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-10 bg-[#FFD84D]" : "w-2 bg-[#FF9A1F]/40 hover:bg-[#FF9A1F]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next virtue"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#FF9A1F]/50 text-lg text-[#FFD84D] transition hover:border-[#FFD84D] hover:bg-[#FF7A18]/15 active:scale-95"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------- Women ----------
function Women() {
  return (
    <section
      id="women"
      className="relative scroll-mt-20 overflow-hidden bg-[#140803] py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,166,0,0.12),transparent_50%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-5 lg:grid-cols-2 lg:gap-16">
        {/* Photo card with the 40% badge */}
        <div className="relative mx-auto w-full max-w-md pb-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#FFD84D]/40 shadow-[0_0_50px_rgba(255,122,24,0.25)]">
            <Image
              src="/womens.jpg"
              alt="A woman practising Silambam with a bamboo staff at sunset"
              fill
              sizes="(min-width:1024px) 40vw, 90vw"
              className="object-cover object-[70%_center] transition-transform duration-[1200ms] ease-out hover:scale-105"
            />
            {/* sliding light sweep */}
            <span aria-hidden className="title-shine" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#140803] via-transparent to-transparent"
            />
          </div>

          <div className="absolute -bottom-2 right-3 rounded-xl border border-[#FFD84D]/50 bg-[#160A04]/95 px-5 py-4 text-center shadow-lg sm:right-6">
            <p className="font-display text-3xl leading-none text-[#FFD84D]">40%</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5E5C5]">
              Women in our classes
            </p>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF9A1F]">
            For women
          </p>

          <h2 className="glow-text mt-3 font-display text-3xl leading-tight text-sand sm:text-5xl">
            Strength has
            <span className="block text-[#FFD84D]">no gender</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#F5E5C5]/90">
            Silambam does not create courage in her. It brings out the courage that is already there.
          </p>

          <ul className="mt-7 space-y-3">
            {WOMEN_POINTS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 border-b border-[#FF9A1F]/25 pb-3 text-[#FFF3D6]"
              >
                <span
                  aria-hidden
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-[4px] border border-[#FFD84D]/70 bg-[#FF7A18]/15"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="#FFD84D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Btn href="#join" solid>
              Register free
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Why choose ----------
function Why() {
  return (
    <section
      id="why"
      className="relative scroll-mt-20 overflow-hidden bg-[#1C0D05] py-20 sm:py-24"
    >
      <Image
        src="/why.png"
        alt=""
        fill
        sizes="100vw"
        className="about-bg object-cover brightness-[0.45] sm:object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#1C0D05]/95 via-[#1C0D05]/80 to-[#1C0D05]/70"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 sm:px-5 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Left: big number + programs */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF9A1F]">
            Why Padaivedu
          </p>

          <p className="glow-text mt-4 font-display text-7xl leading-none text-[#FFD84D] sm:text-8xl">
            10+
          </p>

          <h2 className="glow-text mt-4 font-display text-3xl leading-tight text-white sm:text-5xl">
            Ten disciplines,
            <span className="block text-[#FFD84D]">one academy</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#F5E5C5]/90">
            More than martial arts. We build discipline, strength, confidence and a
            deeper connection to Tamil warrior heritage.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {PROGRAMS.map((p) => (
              <li
                key={p}
                className="rounded-full border border-[#FF9A1F]/40 bg-[#FF7A18]/10 px-3 py-1 text-xs text-[#F5E5C5]"
              >
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Btn href="#training" solid>
              View all programs
            </Btn>
          </div>
        </div>

<ol className="divide-y divide-[#FFD84D]/25 self-center">
  {WHY_POINTS.map(([t, d], i) => (
    <Reveal key={t} as="li" delay={i * 200} direction="right" className="first:pt-0 last:pb-0">
      <div className="group flex gap-5 py-6">
        <span className="font-display text-2xl leading-none text-[#FF7A18]/60 transition-colors duration-300 group-hover:text-[#FFD84D]">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-xl text-[#FFD84D]">{t}</h3>
          <p className="mt-2 leading-7 text-[#E9D6AE]/85">{d}</p>
        </div>
      </div>
    </Reveal>
  ))}
</ol>        
      </div>
    </section>
  );
}

// ---------- Achievements ----------
function Achievements() {
  return (
    <section
      id="achievements"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28 lg:min-h-[640px]"
    >
      {/* Background image – anchor the trophy to the right */}
      <div
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
    <Reveal key={t} as="article" delay={i * 200} className="border-l-4 border-amber-400 bg-black/60 p-6 transition-colors duration-300 hover:bg-black/75">
      <h3 className="text-xl font-bold text-amber-300">{t}</h3>
      <p className="mt-2 text-white/90">{d}</p>
    </Reveal>
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

// ---------- Events ----------
function Events() {
  return (
    <section
      id="events"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-20"
    >
      {/* Background Image */}
      <div
        className="achievement-bg absolute inset-0 bg-cover lg:bg-right"
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

// ---------- Join ----------
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

// ---------- Footer ----------
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
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] max-w-[160%] -translate-x-1/2 rounded-t-full bg-[radial-gradient(ellipse_at_50%_100%,#FFE27A_0%,#FFB020_15%,#FF7A18_22%,transparent_50%)] opacity-80 blur-2xl"
      />

      {/* Rays fanning out like a spinning staff */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[1100px] max-w-[200%] -translate-x-1/2 translate-y-[10%] opacity-30 [mask-image:radial-gradient(circle_at_50%_100%,black_20%,transparent_70%)]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 100%, rgba(255,200,60,0.55) 0deg 2deg, transparent 2deg 12deg)",
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
      {/* Content */}
<div className="relative z-10">
  <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-5 md:grid-cols-4">
    {/* Brand: full width on mobile */}
    <div className="col-span-2 md:col-span-1">
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

    {/* Quick links: left column on mobile */}
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

    {/* Programs: right column on mobile */}
    <div>
      <h3 className="glow-text font-display text-lg text-[#FFB020]">Programs</h3>
      <ul className="mt-3 space-y-2 text-[#F5E5C5]/85">
        {PROGRAMS.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </div>

    {/* Contact: full width on mobile */}
    <div className="col-span-2 md:col-span-1">
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
      Tradition • Discipline • Strength
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
        
        <About />
        
        <Training />
        
        <Virtues />
        
        <Women />
        
        <Why />
        
        <Achievements />
        
        <Events />
        
        <Join />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}
