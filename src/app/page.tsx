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
  { title: "Single stick", img: "/programs/1-single-stick.png",
    desc: "The foundation of Silambam. Learn stance, footwork and the core strikes with a single staff." },
  { title: "Double stick", img: "/programs/2-double-stick.png",
    desc: "Train both hands together for speed, rhythm and coordination." },
  { title: "Surulvall", img: "/programs/3-surulvall.png",
    desc: "The flexible coiled blade. It demands control, timing and complete focus." },
  { title: "Vel Kambu", img: "/programs/4-vel-kambu.png",
    desc: "Spear-style training with thrusts and reach, built on balance and precision." },
  { title: "Maan Kombu", img: "/programs/5-maan-kombu.png",
    desc: "The twin-horn weapon for close defence and sharp counters." },
  { title: "Kuthuvarisai", img: "/programs/6-kuthuvarisai.png",
    desc: "Empty-hand combat built on strikes, blocks and body control." },
  { title: "Advanced Techniques", img: "/programs/7-advance-equipments-techniques.png",
    desc: "Higher-level equipment work and technique for experienced students." },
  { title: "Women's Self Defence", img: "/programs/8-womens-self-defence.png",
    desc: "Practical self-defence skills that build confidence and awareness." },
  { title: "Youth Program", img: "/programs/9-youth-program.png",
    desc: "A structured path for young students to learn Silambam with discipline." },
  { title: "Gymnastics", img: "/programs/10-gymnastics.png",
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

/* Thin glowing gold divider (used between Hero and About) */
function GoldLine({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative h-px w-full ${className}`}>
      {/* Main line: fades out at both ends */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFE94D] to-transparent" />
      {/* Soft glow around the line */}
      <div className="absolute inset-x-0 -top-1 h-3 bg-gradient-to-r from-transparent via-[#FFC233]/50 to-transparent blur-sm" />
    </div>
  );
}

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
/* =====================================================================
   SCROLL PROGRESS BAR (Matches Vellur Yudhakalam top progress line)
   ===================================================================== */
function TopProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-amber-400 to-red-500 transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

/* =====================================================================
   PRELOADER (Exact match to Vellur Yudhakalam)
   Dual spinning rings, pulsing emblem logo, animated letter reveal,
   glowing progress bar + percentage, curtain slide split exit.
   ===================================================================== */
function Loader({ onComplete }: { onComplete?: () => void }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let exitTimeout: any;
    let doneTimeout: any;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 600 : 2400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const currentPct = Math.round((1 - Math.pow(1 - elapsed, 3)) * 100);
      setPct(currentPct);

      if (elapsed < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        exitTimeout = setTimeout(() => {
          setPhase("exit");
          document.documentElement.classList.add("site-ready");
        }, 250);

        doneTimeout = setTimeout(() => {
          setPhase("done");
          document.body.style.overflow = "";
          onComplete?.();
        }, 1250);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimeout);
      clearTimeout(doneTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const titleText = "PADAIVEDU YUDHAKALAM";

  return (
    <div
      className={`preloader ${phase === "exit" ? "is-exit" : ""}`}
      aria-hidden="true"
    >
      <div className="pre-curtain pre-top" />
      <div className="pre-curtain pre-bottom" />

      <div className="pre-inner">
        <div className="pre-glow" />

        {/* Rising glowing embers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, r) => (
            <i
              key={r}
              className="ember"
              style={{
                left: `${8 + 9 * r}%`,
                width: `${3 + (r % 3) * 2}px`,
                height: `${3 + (r % 3) * 2}px`,
                animationDelay: `${(0.37 * r) % 2}s`,
                animationDuration: `${2.4 + (r % 4) * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Rotating Rings & Logo Emblem */}
        <div className="relative flex h-[140px] w-[140px] items-center justify-center">
          <span className="emblem-ring-a absolute inset-0 rounded-full border-2 border-transparent border-b-amber-400/25 border-t-amber-400" />
          <span className="emblem-ring-b absolute inset-2.5 rounded-full border-2 border-transparent border-l-red-500 border-r-red-500/25" />
          <div className="pre-mono">
            <Image
              src="/logo.jpeg"
              alt="Padaivedu Yudhakalam logo"
              width={84}
              height={84}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Animated letter title */}
        <h1 className="pre-title">
          {Array.from(titleText).map((char, r) => (
            <span
              key={r}
              className="pre-letter"
              style={{ animationDelay: `${0.4 + 0.05 * r}s` }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </h1>

        {/* Progress bar */}
        <div className="mt-2 h-[3px] w-[min(280px,70vw)] overflow-hidden rounded-full bg-white/10">
          <div
            className="pre-bar-fill h-full rounded-full transition-[width] duration-75 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Percentage text */}
        <span
          className="text-xs tracking-[0.2em] text-amber-400"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
}

// ---------- Nav (Matches Vellur header style with gold active indicator) ----------
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080503]/95 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a className="bi-keep flex items-center gap-3 transition-opacity hover:opacity-80" href="#top">
          <Image
            src="/logo.jpeg"
            alt="Padaivedu Yudhakalam logo"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-md object-cover ring-1 ring-amber-400/30"
          />
          <span
            className="text-lg font-bold leading-tight tracking-wide text-amber-400 sm:text-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {SITE.name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([label, href], idx) => (
            <a
              key={href}
              href={href}
              className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-amber-400 ${
                idx === 0 ? "text-amber-400" : "text-white/90"
              }`}
            >
              {label}
              <span
                className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-amber-400 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  idx === 0 ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
          <a
            className="ml-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all duration-200 hover:scale-105 hover:bg-red-500"
            href="#join"
          >
            Join Now
          </a>
        </nav>

        {/* Mobile menu hamburger toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="relative flex h-6 w-6 flex-col items-center justify-center md:hidden text-amber-400"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <nav
        className={`flex flex-col gap-1 overflow-hidden border-t border-white/10 px-4 transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-96 py-3 opacity-100" : "max-h-0 border-t-0 py-0 opacity-0"
        }`}
      >
        {NAV.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-amber-400"
          >
            {label}
          </a>
        ))}
        <a
          href="#join"
          onClick={() => setMobileOpen(false)}
          className="mt-2 rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] transition hover:bg-red-500"
        >
          Join Now
        </a>
      </nav>
    </header>
  );
}

/* =====================================================================
   INTERACTIVE COUNTER (Animated number counting up on scroll)
   ===================================================================== */
function AnimatedCounter({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(targetNum === null ? value : "0");

  useEffect(() => {
    if (targetNum === null) return;
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(String(targetNum));
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(node);

      const trigger = () => {
        if (document.documentElement.classList.contains("site-ready")) {
          const startTime = performance.now();
          const frame = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.round(targetNum * (1 - Math.pow(1 - progress, 3)));
            setDisplay(String(current));
            if (progress < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        } else {
          setTimeout(trigger, 100);
        }
      };
      trigger();
    }, { threshold: 0.3 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [targetNum, duration]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

/* =====================================================================
   HERO BANNER (Exact reproduction of Vellur Yudhakalam Hero)
   Features:
   - Kenburns zoom animation
   - Mouse-tracking interactive radial cursor highlight (--sx, --sy)
   - Parallax 3D tilt responding to cursor and scroll
   - Hero glow drift animation
   - Traveling banner shine
   - Rising floating embers
   - Top and bottom cinematic dark gradients
   - Staggered word-by-word rising quote with glowing red pulse dashes
   - Pulsing CTA buttons
   - Stats grid with smooth animated number counters
   - Animated vertical cue line
   ===================================================================== */
const HERO_EMBERS = Array.from({ length: 18 }, (_, r) => ({
  left: `${(37 * r) % 100}%`,
  size: 3 + (r % 4) * 2,
  duration: 8 + (r % 6) * 2,
  delay: -((1.3 * r) % 10),
}));

function Hero() {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const mouseCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const tiltNode = tiltRef.current;
    if (!tiltNode || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;

    const updateTransform = () => {
      rafId = 0;
      const scrollYOffset = 0.15 * Math.min(window.scrollY, 800);
      tiltNode.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y + scrollYOffset}px, 0) scale(1.06)`;
    };

    const requestUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(updateTransform);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const bannerNode = bannerRef.current;
      if (bannerNode) {
        const rect = bannerNode.getBoundingClientRect();
        bannerNode.style.setProperty("--sx", `${e.clientX - rect.left}px`);
        bannerNode.style.setProperty("--sy", `${e.clientY - rect.top}px`);
      }
      mouseCoords.current.x = -(24 * (e.clientX / window.innerWidth - 0.5));
      mouseCoords.current.y = -(16 * (e.clientY / window.innerHeight - 0.5));
      requestUpdate();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    updateTransform();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", requestUpdate);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const quoteWords = [
    "The", "ancient", "Tamil", "martial", "art", "of", "Silambam",
    "—",
    "forging", "warriors", "with", "discipline,", "strength,", "and", "cultural", "pride."
  ];

  return (
    <section className="relative bg-[#080503]">
      {/* Visual Hero Banner with layers */}
      <div className="relative w-full overflow-hidden">
        <div ref={bannerRef} className="hero-in relative w-full overflow-hidden">
          <div ref={tiltRef} className="will-change-transform transition-transform duration-300 ease-out">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1600 / 893" }}>
              <Image
                src="/hero.png"
                alt="Padaivedu Yudhakalam"
                priority
                fill
                sizes="100vw"
                className="hero-kenburns object-cover object-center"
              />
            </div>
          </div>

          {/* Mouse follow radial spotlight */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_var(--sx,50%)_var(--sy,40%),rgba(251,191,36,0.14),transparent_65%)]" />

          {/* Drifting hero ambient glow */}
          <div className="hero-glow pointer-events-none absolute -inset-[20%]" />

          {/* Periodic beam sweep shine */}
          <div className="banner-shine pointer-events-none absolute inset-y-0 left-0 w-1/3" />

          {/* Rising ember sparks */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {HERO_EMBERS.map((ember, i) => (
              <span
                key={i}
                className="ember"
                style={{
                  left: ember.left,
                  width: `${ember.size}px`,
                  height: `${ember.size}px`,
                  animationDuration: `${ember.duration}s`,
                  animationDelay: `${ember.delay}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Top and Bottom soft dark fades */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent sm:h-32" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#080503] sm:h-56" />
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 pb-16 sm:-mt-20 sm:pb-24">
        {/* Animated word-by-word rising quote */}
        <p
          className="quote-dash bi-keep text-center text-lg italic text-amber-300 font-bold sm:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {quoteWords.map((word, i) => (
            <span key={i} className="word-mask mr-[0.28em]">
              <span className="word-rise" style={{ animationDelay: `${0.5 + i * 0.05}s` }}>
                {word}
              </span>
            </span>
          ))}
          <span
            lang="ta"
            className="hero-rise mt-3 block text-base font-normal tracking-wide text-sand/90 not-italic sm:text-lg"
            style={{ animationDelay: "1.4s", fontFamily: "var(--font-tamil)" }}
          >
            பழமையான தமிழ் தற்காப்புக் கலையான சிலம்பம் — ஒழுக்கம், வலிமை, பண்பாட்டுப் பெருமையுடன் வீரர்களை உருவாக்குகிறது.
          </span>
        </p>

        {/* Action Buttons with glowing pulse */}
        <div className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "1.3s" }}>
          <a
            href="#training"
            className="btn-pulse rounded-md bg-red-600 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-200 hover:scale-105 hover:bg-red-500"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Explore Training
          </a>
          <a
            href="#join"
            className="rounded-md border-2 border-amber-400 bg-amber-400/10 px-7 py-3 text-sm font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.25)] transition-all duration-200 hover:scale-105 hover:bg-amber-400 hover:text-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Join the Academy
          </a>
        </div>

        {/* Stats bar with smooth animated counters */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-6 border-t border-amber-400/25 pt-8">
          <div className="hero-rise flex flex-col items-center" style={{ animationDelay: "1.6s" }}>
            <span
              className="text-3xl font-black text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <AnimatedCounter value="10+" />
            </span>
            <span className="mt-1 text-xs font-bold uppercase tracking-wider text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Weapon & Combat Disciplines
            </span>
          </div>

          <div className="hero-rise flex flex-col items-center" style={{ animationDelay: "1.75s" }}>
            <span
              className="text-3xl font-black text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <AnimatedCounter value="150+" />
            </span>
            <span className="mt-1 text-xs font-bold uppercase tracking-wider text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Warriors Trained
            </span>
          </div>

          <div className="hero-rise flex flex-col items-center" style={{ animationDelay: "1.90s" }}>
            <span
              className="text-3xl font-black text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <AnimatedCounter value="40%" />
            </span>
            <span className="mt-1 text-xs font-bold uppercase tracking-wider text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Women Empowered
            </span>
          </div>

          <div className="hero-rise flex flex-col items-center" style={{ animationDelay: "2.05s" }}>
            <span
              className="text-3xl font-black text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              All Ages
            </span>
            <span className="mt-1 text-xs font-bold uppercase tracking-wider text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Kids to Adults
            </span>
          </div>
        </div>

        {/* Scroll cue indicator line */}
        <div className="mt-10 flex justify-center" aria-hidden="true">
          <span className="cue-line block h-10 w-px bg-gradient-to-b from-amber-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// ---------- About ----------
function About() {
  return (
    <section
      id="about"
      className="relative z-30 -mt-10 scroll-mt-20 overflow-hidden rounded-t-[2.5rem] bg-[#1C120C] py-16 pt-24 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] sm:py-24 sm:pt-28"
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
              <h2
                className="mt-5 text-4xl font-bold leading-[1.1] tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-deco)" }}
              >
                Ancient Art.
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 bg-clip-text text-transparent">
                  Modern Warriors.
                </span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-amber-400 to-red-500" />
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

      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center"><div className="h-20 w-3/4 max-w-3xl rounded-[100%] bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-xl" /></div>
      
    </section>
  );
}

// ---------- Choose your weapon (programs) ----------
function Training() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = ITEMS[active];

  // Slow auto-change: 7 seconds per weapon, pauses while the pointer is over the section
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % ITEMS.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      id="training"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">
              Training at Padaivedu
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Heading center className="glow-text">
              Choose your weapon
            </Heading>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#E9D6AE]/85 sm:text-base">
              Traditional weapons and techniques of Silambam. Pick one to see what it teaches.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* Weapon list */}
          <ul
            className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1"
            onTouchStart={(e) => {
              e.currentTarget.dataset.touchX = String(e.touches[0].clientX);
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
                <Reveal key={it.title} as="li" delay={i * 60}>
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
                </Reveal>
              );
            })}
          </ul>

          {/* Detail card */}
          <div className="group/card grid overflow-hidden rounded-[2rem] border border-[#FF9A1F]/30 bg-[#1A0C05]/95 shadow-[0_30px_80px_rgba(0,0,0,0.7)] backdrop-blur-md md:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden bg-black md:aspect-auto md:min-h-[440px]">
              <Image
                key={item.img}
                src={item.img}
                alt={item.title}
                fill
                priority
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover object-center transition-all duration-700 ease-out group-hover/card:scale-105"
              />
              {/* Radial gradient highlighting warrior */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0C05] via-transparent to-black/30 md:bg-gradient-to-r md:from-transparent md:to-[#1A0C05]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
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
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center"><div className="h-20 w-3/4 max-w-3xl rounded-[100%] bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-xl" /></div>
   
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
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7A18]/20 blur-[90px] sm:blur-[130px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF9A1F]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF9A1F]/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">
              The warrior’s code
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Heading center className="glow-text">
              Five virtues of a warrior
            </Heading>
          </Reveal>
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
                className={`absolute left-1/2 top-1/2 w-[250px] rounded-2xl border p-6 text-center transition-all duration-700 ease-out backdrop-blur-xl sm:w-[290px] ${
                  isActive
                    ? "cursor-default border-[#FFD84D] bg-[#1a0a04] shadow-[0_20px_60px_rgba(255,122,24,0.45)] ring-1 ring-[#FFD84D]/30"
                    : "cursor-pointer border-[#FF9A1F]/20 bg-[#120703]/95 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-[#FF9A1F]/50"
                }`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 160}px) translateZ(${-abs * 140}px) rotateY(${-offset * 18}deg) scale(${1 - abs * 0.14})`,
                  opacity: isActive ? 1 : Math.max(0.2, 0.65 - abs * 0.25),
                  zIndex: 10 - abs,
                  pointerEvents: abs > 2 ? 'none' : 'auto',
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
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center"><div className="h-20 w-3/4 max-w-3xl rounded-[100%] bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-xl" /></div>
   
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
                className="group flex cursor-default items-center gap-3 border-b border-[#FF9A1F]/25 pb-3 text-[#FFF3D6] transition-colors duration-300 hover:text-[#FFD84D]"
              >
                <span
                  aria-hidden
                  className="relative grid h-5 w-5 shrink-0 place-items-center rounded-[4px] border border-[#FFD84D]/70 bg-[#FF7A18]/15 transition-all duration-300 group-hover:border-[#FFF3B0] group-hover:bg-[#FFD84D]/30 group-hover:animate-[check-blink_0.9s_ease-in-out_infinite]"
                >
                  {/* spark burst on hover */}
                  <span className="pointer-events-none absolute -inset-1.5 rounded-md border border-[#FFD84D] opacity-0 group-hover:animate-[check-spark_0.9s_ease-out_infinite]" />

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
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center"><div className="h-20 w-3/4 max-w-3xl rounded-[100%] bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-xl" /></div>
   
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

        {/* Right: feature list */}
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
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center"><div className="h-20 w-3/4 max-w-3xl rounded-[100%] bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-xl" /></div>
   
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
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center"><div className="h-20 w-3/4 max-w-3xl rounded-[100%] bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-xl" /></div>
   
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
          <p className="mx-auto mt-10 max-w-xl rounded-xl border border-amber-300/50 bg-black/45 p-6 text-center text-base text-white/90 backdrop-blur-sm sm:p-8 sm:text-lg"
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
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center"><div className="h-20 w-3/4 max-w-3xl rounded-[100%] bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-xl" /></div>
   
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
      <div className="relative z-10 mx-auto max-w-4xl rounded-2xl border border-[#FF9A1F]/40 bg-[#160A04]/70 p-8 text-center shadow-[0_0_60px_rgba(255,122,24,0.2)] backdrop-blur-md sm:p-14"
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

      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center"><div className="h-20 w-3/4 max-w-3xl rounded-[100%] bg-gradient-to-r from-transparent via-[#FF7A18]/25 to-transparent blur-xl" /></div>
  
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
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] max-w-[160%] -translate-x-1/2 rounded-t-full bg-[radial-gradient(ellipse_at_50%_100%,#FFE27A_0%,#FFB020_15%,#FF7A18_22%,transparent_50%)] opacity-50 blur-3xl"
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
        <span className="absolute left-[80%] top-[25%] h-1 w-1 rounded-full bg-[#FFD84D] shadow-[0_0_10px_3px_rgba(255,216,77,0.7)]" />
      </div>


      {/* Content */}
      <div className="relative z-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="glow-text font-display text-xl text-[#FFD84D]">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#F5E5C5]/80">
              Tamil staff fighting, taught with discipline, strength and heritage. Learn the ancient art and carry warrior tradition forward.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div className="flex flex-col">
            <h3 className="glow-text font-display text-lg font-semibold text-[#FFB020]">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F5E5C5]/85">
              {NAV.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="inline-block transition-colors duration-200 hover:translate-x-1 hover:text-[#FFD84D]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs (2 columns inside to balance height) */}
          <div className="flex flex-col">
            <h3 className="glow-text font-display text-lg font-semibold text-[#FFB020]">
              Programs
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-2 gap-y-2 text-sm text-[#F5E5C5]/85 sm:grid-cols-2 lg:grid-cols-1">
              {PROGRAMS.map((p) => (
                <li key={p} className="transition-colors hover:text-[#FFD84D]">
                  <a href="#training" className="hover:underline">{p}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact us */}
          <div className="flex flex-col">
            <h3 className="glow-text font-display text-lg font-semibold text-[#FFB020]">
              Contact us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#F5E5C5]/85">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-400">📍</span>
                <span>{SITE.place}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">📞</span>
                <a className="transition hover:text-[#FFD84D]" href={TEL}>{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2 break-all">
                <span className="text-amber-400">✉️</span>
                <a className="transition hover:text-[#FFD84D]" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs leading-relaxed text-[#F5E5C5]/75">
                <span className="mt-0.5 text-amber-400">🕒</span>
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Padaivedu Location Map Section */}
        <div className="mx-auto mt-14 max-w-6xl px-4 sm:px-5">
          <div className="overflow-hidden rounded-2xl border border-[#FF9A1F]/40 bg-[#120703]/90 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="glow-text font-display text-lg text-[#FFD84D] sm:text-xl">
                  Locate Our Arena • Padaivedu
                </h4>
                <p className="mt-1 text-xs text-[#F5E5C5]/80 sm:text-sm">
                  {SITE.place}
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Padaivedu,+Tiruvannamalai,+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#FF9A1F]/60 bg-gradient-to-r from-[#FF7A1A]/20 to-[#F5C518]/20 px-3.5 py-1.5 text-xs font-semibold text-[#FFD84D] shadow-[0_0_12px_rgba(255,122,26,0.25)] transition hover:scale-105 hover:border-[#FFD84D] hover:bg-[#FF7A1A]/30 sm:text-sm"
              >
                 Open in Google Maps
              </a>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 sm:aspect-[21/9]">
              <iframe
                title="Padaivedu Yudhakalam Location Map"
                src="https://maps.google.com/maps?q=Padaivedu,+Tiruvannamalai,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.15) brightness(0.95)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-[#FF9A1F]/25 px-4 py-6 text-sm text-[#F5E5C5]/65 sm:px-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4"><p>© 2026 Padaivedu Yudhakalam. All rights reserved.</p><span className="hidden text-white/30 sm:inline">•</span><p className="text-xs text-amber-400/90 font-medium tracking-wide">Designed By  <a href="https://github.com/CyberCodersHub" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-300 hover:text-amber-200 transition">CyberCodersHub </a></p></div>
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Failsafe in case reduced-motion or quick navigation
    if (document.documentElement.classList.contains("site-ready")) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      <TopProgressBar />
      <Loader onComplete={() => setLoaded(true)} />
      <div className={`transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
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
      </div>
    </>
  );
}