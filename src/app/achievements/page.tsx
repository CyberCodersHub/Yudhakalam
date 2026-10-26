"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

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
  ["Home", "/"],
  ["About", "/about"],
  ["Programs", "/programs"],
  ["Virtues", "/virtues"],
  ["Achievements", "/achievements"],
  ["Contact", "/#contact"],
];

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

const LEVELS = ["All", "National", "State", "District"] as const;
type Level = (typeof LEVELS)[number];

// Replace with the academy's real results. Keep newest first.
const ACHIEVEMENTS: {
  year: string;
  title: string;
  level: Exclude<Level, "All">;
  student: string;
  place: string;
  desc: string;
}[] = [
  {
    year: "2026",
    title: "First prize, Young Sports of India",
    level: "National",
    student: "Academy team",
    place: "Gold",
    desc: "A national-level win that put Padaivedu Yudhakalam on the map.",
  },
  {
    year: "2025",
    title: "State-level Silambam championship",
    level: "State",
    student: "Senior students",
    place: "Podium finish",
    desc: "Our fighters placed across the weapon categories at the state championship.",
  },
  {
    year: "2024",
    title: "District Silambam competition",
    level: "District",
    student: "Youth & women's batches",
    place: "Multiple medals",
    desc: "Young students and women from our classes brought home several district medals.",
  },
  {
    year: "2024",
    title: "Women's self-defence showcase",
    level: "District",
    student: "Women's batch",
    place: "Special recognition",
    desc: "A live demonstration that showed what confidence and training can achieve.",
  },
];

// Confirm these figures with the academy.
const STATS = [
  { value: "38+", label: "Titles won" },
  { value: "150+", label: "Students trained" },
  { value: "3", label: "Competition levels" },
  { value: "40%", label: "Women in our classes" },
];

const CTA_SPARKS = [
  { left: "10%", top: "20%", size: 4, delay: 0 },
  { left: "22%", top: "74%", size: 3, delay: 1.2 },
  { left: "36%", top: "12%", size: 3, delay: 0.6 },
  { left: "64%", top: "86%", size: 3, delay: 1.8 },
  { left: "80%", top: "16%", size: 4, delay: 0.9 },
  { left: "90%", top: "68%", size: 3, delay: 2.2 },
];

// ---------- Theme palette ----------
// Background: #0D0603 → #1C0C05
// Gold:       #df960d (labels, borders), #eeb82e (headings, highlights)
// Orange:     #662703 (buttons, numerals, accents)
// Deep red:   #8B1E12 (stats strip, quote section, glow)
// Cream text: #f3bb4a

// ---------- Shared theme + animations (one place for all sections) ----------
const GLOBAL_CSS = `
  @keyframes float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -28px; } }
  @keyframes spin { to { rotate: 360deg; } }
  @keyframes spinBack { to { rotate: -360deg; } }
  @keyframes breathe {
    0%, 100% { opacity: 0.4; scale: 1; }
    50% { opacity: 0.85; scale: 1.08; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.25; scale: 0.8; }
    50% { opacity: 1; scale: 1.3; }
  }
  @keyframes shimmer { to { background-position: 200% center; } }
  @keyframes beam {
    0% { transform: translateX(-120%); }
    100% { transform: translateX(320%); }
  }
  @keyframes sweep { to { transform: translateX(220%); } }
  @keyframes ringPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(232,176,74,0.55); }
    50% { box-shadow: 0 0 0 10px rgba(232,176,74,0); }
  }
  @keyframes badgeShine {
    from { background-position: -100% 0; }
    to { background-position: 200% 0; }
  }
  @keyframes glowPulse {
    0%, 100% { filter: drop-shadow(0 0 6px rgba(232,176,74,0.4)); }
    50% { filter: drop-shadow(0 0 16px rgba(245,210,122,0.9)); }
  }
  @keyframes cardGlow {
    0%, 100% { box-shadow: 0 0 40px rgba(217,98,28,0.25), inset 0 0 40px rgba(139,30,18,0.08); }
    50% { box-shadow: 0 0 90px rgba(217,98,28,0.5), inset 0 0 60px rgba(139,30,18,0.16); }
  }
  @keyframes diamond {
    0%, 100% { scale: 1; opacity: 0.7; }
    50% { scale: 1.25; opacity: 1; }
  }
  @keyframes flicker {
    0%, 100% { scale: 1; rotate: -1deg; }
    50% { scale: 1.06; rotate: 1deg; }
  }
  @keyframes quoteSweep {
    0% { translate: -120% 0; }
    60%, 100% { translate: 260% 0; }
  }
  @keyframes lineGrow { from { scale: 0 1; } to { scale: 1 1; } }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: none; }
  }

  .blob { animation: float 8s ease-in-out infinite; }
  .ring-spin { animation: spin 28s linear infinite; }
  .ring-spin-back { animation: spinBack 60s linear infinite; }
  .orbit { animation: spin 9s linear infinite; }
  .breathe { animation: breathe 6s ease-in-out infinite; }
  .twinkle { animation: twinkle 4s ease-in-out infinite; }
  .beam {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 35%, rgba(245,210,122,0.25) 50%, transparent 65%);
    transform: translateX(-120%);
    animation: beam 5s ease-in-out infinite;
    pointer-events: none;
  }
  .gold-text {
    background: linear-gradient(90deg, #C8862A 0%, #F5D27A 35%, #FFF3D6 50%, #F5D27A 65%, #C8862A 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shimmer 6s linear infinite;
  }
  .sheen { position: relative; }
  .sheen::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 30%, rgba(245,210,122,0.2) 50%, transparent 70%);
    transform: translateX(-120%);
    pointer-events: none;
  }
  .sheen:hover::before { animation: sweep 1.1s ease-out; }
  .pulse-ring { animation: ringPulse 2s ease-out infinite; }
  .badge-shine {
    background: linear-gradient(110deg, #E8B04A 30%, #FFF3D6 50%, #E8B04A 70%);
    background-size: 200% 100%;
    animation: badgeShine 3.5s linear infinite;
  }
  .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
  .card-glow { animation: cardGlow 4s ease-in-out infinite; }
  .diamond { animation: diamond 3s ease-in-out infinite; }
  .flicker { animation: flicker 3s ease-in-out infinite; }
  .quote-sweep { animation: quoteSweep 6s ease-in-out infinite; }
  .line-grow { transform-origin: center; animation: lineGrow 1.4s ease-out both; }
  .fade-up { animation: fadeUp 0.9s cubic-bezier(.2,.7,.2,1) both; }
  .rise { animation: fadeUp 0.8s ease-out both; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; }
  }
`;

const BG_MAIN = "bg-gradient-to-b from-[#0D0603] via-[#1C0C05] to-[#0D0603]";

// ---------- Small pieces ----------
const SOLID_BTN =
  "border-2 border-[#E8B04A] bg-gradient-to-r from-[#D9621C] to-[#E8B04A] text-[#0D0603] shadow-[0_0_24px_rgba(217,98,28,0.5)] hover:brightness-110";

function Btn({ href, children, solid }: { href: string; children: ReactNode; solid?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-lg px-5 py-2.5 font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
        solid ? SOLID_BTN : "border-2 border-[#D9621C] text-[#F5D27A] hover:bg-[#8B1E12]/30"
      }`}
    >
      {children}
    </Link>
  );
}

function Logo() {
  return (
    <Image
      src="/logo.jpeg"
      alt="Padaivedu Yudhakalam logo"
      width={40}
      height={40}
      className="h-10 w-10 shrink-0 rounded-full border-2 border-[#E8B04A] bg-[#0D0603]"
    />
  );
}

// ---------- Nav ----------
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#E8B04A]/40 bg-[#0D0603]/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5" aria-label="Main">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Logo />
          <span className="font-display text-sm leading-tight text-[#F5D27A] sm:text-xl">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-4 xl:flex">
          {NAV.map(([l, h]) => (
            <li key={h}>
              <Link
                href={h}
                className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-all hover:bg-[#D9621C]/20 hover:text-[#F5D27A] ${
                  l === "Achievements" ? "text-[#E8B04A]" : "text-[#F5E6C8]"
                }`}
              >
                {l}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#join" className={`block rounded-lg px-4 py-2 text-center font-bold ${SOLID_BTN}`}>
              Join now
            </Link>
          </li>
        </ul>

        <details className="relative shrink-0 xl:hidden">
          <summary
            aria-label="Open menu"
            className="flex h-10 w-10 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-lg border border-[#E8B04A]/70 marker:hidden [&::-webkit-details-marker]:hidden"
          >
            <span className="block h-[2px] w-5 rounded-full bg-[#E8B04A]" />
            <span className="block h-[2px] w-5 rounded-full bg-[#E8B04A]" />
            <span className="block h-[2px] w-5 rounded-full bg-[#E8B04A]" />
          </summary>
          <ul className="absolute right-0 z-50 mt-3 w-56 space-y-1 rounded-xl border border-[#E8B04A]/60 bg-[#1C0C05] p-3 shadow-2xl shadow-black/70">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="block rounded-lg px-3 py-2.5 font-semibold text-[#F5E6C8] hover:bg-[#D9621C]/25 hover:text-[#F5D27A]">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}

// ---------- Hero: background image + sunburst rays + rotating circle + sparkles ----------
const HERO_SPARKS = [
  { left: "16%", top: "24%", size: 4, delay: 0 },
  { left: "84%", top: "20%", size: 3, delay: 1.2 },
  { left: "10%", top: "72%", size: 3, delay: 0.6 },
  { left: "88%", top: "68%", size: 4, delay: 1.8 },
  { left: "50%", top: "12%", size: 5, delay: 0.9 },
  { left: "50%", top: "88%", size: 3, delay: 2.4 },
];

function Hero() {
  return (
    <section className="hero-root relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-[#0D0603] pt-28 pb-16">
      <style>{`
        @keyframes heroSpin { to { rotate: 360deg; } }
        @keyframes heroSpinBack { to { rotate: -360deg; } }
        @keyframes heroRayPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.95; }
        }
        @keyframes heroCore {
          0%, 100% { opacity: 0.5; scale: 1; }
          50% { opacity: 1; scale: 1.08; }
        }
        @keyframes heroTwinkle {
          0%, 100% { opacity: 0.2; scale: 0.8; }
          50% { opacity: 1; scale: 1.3; }
        }
        .hero-rays { animation: heroSpin 50s linear infinite, heroRayPulse 6s ease-in-out infinite; }
        .hero-ring { animation: heroSpinBack 40s linear infinite; }
        .hero-core { animation: heroCore 6s ease-in-out infinite; }
        .hero-twinkle { animation: heroTwinkle 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-root *, .hero-root *::before, .hero-root *::after { animation: none !important; }
        }
      `}</style>

      {/* Background image: normal colour, no blend mode, so the photo shows clearly */}
      <Image
        src="/win.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />

      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(217,98,28,0.25)_0%,transparent_60%)]" />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="ring-spin-back absolute left-1/2 top-1/2 h-[1000px] w-[1000px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full [mask-image:radial-gradient(circle,transparent_15%,black_40%,transparent_70%)]"
          style={{ background: "repeating-conic-gradient(from 8deg at 50% 50%, rgba(217,98,28,0.35) 0deg 2deg, transparent 2deg 14deg)" }}
        />
        <div className="breathe absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,210,122,0.35)_0%,rgba(217,98,28,0.25)_40%,transparent_70%)] blur-2xl" />
        <div className="ring-spin absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#E8B04A]/40" />
        <div className="orbit absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full">
          <span className="absolute left-0 top-1/2 h-24 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#F5D27A] to-transparent" />
          <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5D27A] shadow-[0_0_18px_6px_rgba(217,98,28,0.8)]" />
          <span className="absolute right-0 top-1/2 h-24 w-[2px] translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#F5D27A] to-transparent" />
          <span className="absolute right-0 top-1/2 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5D27A] shadow-[0_0_18px_6px_rgba(217,98,28,0.8)]" />
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {CTA_SPARKS.map((s, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-[#F5D27A]"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              boxShadow: `0 0 ${s.size * 4}px #D9621C`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-5">
        <span className="rise inline-block rounded-full border border-[#E8B04A] bg-[#0D0603]/70 px-5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#F5E6C8] shadow-[0_0_18px_rgba(232,176,74,0.4)]">
          Our glory
        </span>

        <h1 className="gold-text fade-up mt-6 font-display text-4xl font-bold sm:text-6xl [filter:drop-shadow(0_4px_14px_rgba(0,0,0,0.8))]">
          Hall of Glory
        </h1>

        <p
          className="fade-up mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-[#F5E6C8] [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          Championships and milestones earned on the training floor, by students who showed up, practised hard and never quit.
        </p>
      </div>
    </section>
  );
}

// ---------- Stats ----------
function StatsRow() {
  return (
    <section className="relative overflow-hidden border-y-2 border-[#E8B04A]/60 bg-[#3A1606] py-12">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center sm:px-5 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="blob" style={{ animationDelay: `${i * -1.2}s`, animationDuration: "5s" }}>
            <p className="glow-pulse font-display text-4xl font-bold text-[#F5D27A] sm:text-5xl">{s.value}</p>
            <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#F5E6C8]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Achievements list with level filter ----------
function AchievementList() {
  const [level, setLevel] = useState<Level>("All");
  const list = level === "All" ? ACHIEVEMENTS : ACHIEVEMENTS.filter((a) => a.level === level);
//bg-gradient-to-b from-[#1C0C05] via-[#240E04] to-[#1C0C05] py-24
  return (
    <section className={`relative overflow-hidden ${BG_MAIN} py-20 sm:py-24`}>
      <div aria-hidden className="blob pointer-events-none absolute left-1/2 top-1/3 z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#1C0C05]/25 blur-[120px]" />
      <div aria-hidden className="blob pointer-events-none absolute right-10 bottom-10 z-0 h-[260px] w-[260px] rounded-full bg-[#240E04]/30 blur-[100px]" style={{ animationDelay: "-4s" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#E8B04A]">Wins & titles</p>
          <h2 className="gold-text font-display text-3xl sm:text-5xl">Our proudest wins</h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by level">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              aria-pressed={level === l}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-transform duration-300 hover:scale-105 active:scale-95 ${
                level === l
                  ? "pulse-ring border-[#F5D27A] bg-[#E8B04A] text-[#0D0603]"
                  : "border-[#E8B04A]/70 bg-[#0D0603]/70 text-[#F5E6C8] hover:border-[#F5D27A] hover:bg-[#0D0603]/60"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <ol className="relative z-10 mt-12 grid gap-5 md:grid-cols-2">
          {list.map((a) => (
            <li
              key={a.title}
              className="sheen group h-full list-none overflow-hidden rounded-2xl border border-[#E8B04A]/50 bg-gradient-to-br from-[#3A1606] via-[#1C0C05] to-[#0D0603] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-2 hover:border-[#F5D27A] hover:shadow-[0_25px_60px_rgba(217,98,28,0.35)] sm:p-7"
            >
              <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#D9621C] via-[#F5D27A] to-[#D9621C] transition-all duration-500 group-hover:w-2" />

              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-sm font-bold text-[#E8B04A]">{a.year}</span>
                <span className="badge-shine rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0D0603] shadow-[0_0_12px_rgba(232,176,74,0.5)]">
                  {a.level}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-bold text-[#F5E6C8] transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                {a.title}
              </h3>

              <p className="mt-3 text-base font-medium leading-7 text-[#F5E6C8]">{a.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md border border-[#D9621C]/70 bg-[#0D0603]/70 px-2.5 py-1 font-bold text-[#F5E6C8]">
                  {a.student}
                </span>
                <span className="rounded-md border border-[#F5D27A] bg-[#E8B04A] px-2.5 py-1 font-extrabold text-[#0D0603] transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(245,210,122,0.7)]">
                  {a.place}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {list.length === 0 && (
          <p className="relative z-10 mt-10 text-center text-[#F5D27A]">No achievements in this category yet.</p>
        )}
      </div>
    </section>
  );
}

// ---------- Glory is earned ----------
//bg-gradient-to-b from-[#0D0603] via-[#1C0C05] to-[#0D0603]
function GloryEarned() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1C0C05] via-[#240E04] to-[#1C0C05] py-24">
      <div aria-hidden className="blob pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8B04A]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-5">
        <p className="fade-up text-xs font-bold uppercase tracking-[0.35em] text-[#E8B04A]">The podium awaits</p>
        <h2 className="fade-up mt-4 font-display text-3xl text-[#F5E6C8] sm:text-5xl" style={{ animationDelay: "150ms" }}>
          Glory is <span className="gold-text">earned</span>
        </h2>

        <span className="mx-auto mt-6 block h-[2px] w-28 overflow-hidden rounded-full bg-[#E8B04A]/40">
          <span className="line-grow block h-full w-full bg-gradient-to-r from-[#D9621C] via-[#F5D27A] to-[#D9621C]" />
        </span>

        <p className="fade-up mx-auto mt-6 max-w-2xl leading-8 text-[#F5E6C8]" style={{ animationDelay: "300ms" }}>
          Every medal starts as a morning on the training floor. Our champions were once beginners, and every title was built one session at a time.
        </p>

        <blockquote className="fade-up relative mt-12 overflow-hidden border-y-2 border-[#E8B04A]/70 bg-[#0D0603]/50 py-10" style={{ animationDelay: "400ms" }}>
          <span aria-hidden className="quote-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#F5D27A]/25 to-transparent" />
          <span aria-hidden className="diamond absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#E8B04A] shadow-[0_0_14px_#D9621C]" />

          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-2 flex justify-center">
            <span className="flicker font-display text-5xl leading-none text-[#E8B04A]">“</span>
          </div>

          <p className="relative font-display text-xl font-semibold text-[#F5D27A] [text-shadow:0_0_12px_rgba(232,176,74,0.5)] sm:text-2xl">
            Every champion was once a beginner who refused to quit.
          </p>
          <p lang="ta" className="relative mt-4 text-base font-medium text-[#F5E6C8]">
            ஒவ்வொரு வெற்றியாளரும் ஒருகாலத்தில் ஆரம்பித்தவரே.
          </p>
        </blockquote>

        <div className="fade-up mt-12" style={{ animationDelay: "500ms" }}>
          <Btn href="/#training" solid>Start your journey</Btn>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTA() {
  return (
    <section id="join" className="relative overflow-hidden bg-gradient-to-b from-[#2A1204] via-[#3A1606] to-[#2A1204] px-5 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="ring-spin-back absolute left-1/2 top-1/2 h-[1000px] w-[1000px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full [mask-image:radial-gradient(circle,transparent_15%,black_40%,transparent_70%)]"
          style={{ background: "repeating-conic-gradient(from 8deg at 50% 50%, rgba(217,98,28,0.35) 0deg 2deg, transparent 2deg 14deg)" }}
        />
        <div className="breathe absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,210,122,0.35)_0%,rgba(217,98,28,0.25)_40%,transparent_70%)] blur-2xl" />
        <div className="ring-spin absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#E8B04A]/40" />
        <div className="orbit absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full">
          <span className="absolute left-0 top-1/2 h-24 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#F5D27A] to-transparent" />
          <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5D27A] shadow-[0_0_18px_6px_rgba(217,98,28,0.8)]" />
          <span className="absolute right-0 top-1/2 h-24 w-[2px] translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#F5D27A] to-transparent" />
          <span className="absolute right-0 top-1/2 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5D27A] shadow-[0_0_18px_6px_rgba(217,98,28,0.8)]" />
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {CTA_SPARKS.map((s, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-[#F5D27A]"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              boxShadow: `0 0 ${s.size * 4}px #D9621C`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#E8B04A]/70 bg-gradient-to-br from-[#3A1606]/90 via-[#1C0C05]/95 to-[#0D0603]/95 p-8 text-center sm:p-12">
          <div aria-hidden className="card-glow pointer-events-none absolute inset-0 rounded-2xl" />
          <span aria-hidden className="beam" style={{ animation: "beam 7s ease-in-out infinite" }} />

          <div className="relative">
            <h2 className="font-display text-3xl uppercase tracking-[0.04em] text-[#F5E6C8] sm:text-5xl">
              Your name could be <span className="gold-text">next</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#F5E6C8]">
              Join a batch this month and start working towards your first medal.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Btn href={TEL} solid>Call to enrol</Btn>
              <Btn href="/#training">View programs</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
// ---------- Footer ----------
const FOOTER_EMBERS = [
  { left: "12%", top: "38%", size: 6, color: "#FFB020", delay: 0 },
  { left: "30%", top: "62%", size: 4, color: "#FFD84D", delay: 1 },
  { left: "58%", top: "30%", size: 4, color: "#FF7A18", delay: 0.5 },
  { left: "78%", top: "55%", size: 6, color: "#FFB020", delay: 2 },
  { left: "86%", top: "25%", size: 4, color: "#FFD84D", delay: 1.5 },
];

function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 scroll-mt-20 overflow-hidden border-t border-[#FFC93C]/30 bg-[linear-gradient(to_bottom,#1F0C04_0%,#2E1206_45%,#1A0A03_100%)] pb-28 pt-16 sm:pb-16 sm:pt-20"
    >
      
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
        {FOOTER_EMBERS.map((e, i) => (
          <span
            key={i}
            className="anim absolute rounded-full"
            style={{
              left: e.left,
              top: e.top,
              width: e.size,
              height: e.size,
              background: e.color,
              boxShadow: `0 0 ${e.size * 3}px ${e.color}`,
              animation: `twinkle ${3 + i * 0.7}s ease-in-out ${e.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content sits above the decorative layers */}
      <div className="relative z-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:grid-cols-2 md:grid-cols-4 md:gap-x-6">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="font-display text-xl text-[#FFD84D]">{SITE.name}</span>
            </div>
            <p className="mt-4 text-[#FFF1C7]/80">Tamil staff fighting, taught with discipline, strength and heritage.</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg text-[#FFD84D]">Quick links</h3>
            <ul className="mt-3 space-y-2 text-[#FFF1C7]/80">
              {NAV.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="inline-block py-0.5 transition hover:text-[#FFC93C]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 md:col-span-2">
            <h3 className="font-display text-lg text-[#FFD84D]">Contact us</h3>
            <ul className="mt-3 space-y-3 text-[#FFF1C7]/80">
              <li>{SITE.place}</li>
              <li>
                <a className="inline-block py-0.5 transition hover:text-[#FFC93C]" href={TEL}>
                  {SITE.phone}
                </a>
              </li>
              <li className="break-all">
                <a className="inline-block py-0.5 transition hover:text-[#FFC93C]" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: stacked and centred on mobile, row on desktop */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center gap-3 border-t border-[#FFC93C]/25 px-5 py-6 text-center text-sm text-[#FFF1C7]/60 md:flex-row md:justify-between md:text-left">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <p className="text-xs uppercase tracking-[0.3em] text-[#FFC93C]/85">Tradition • Discipline • Strength</p>
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
      className="glow-pulse fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex items-center gap-2 rounded-full border-2 border-[#E8B04A] bg-gradient-to-r from-[#D9621C] to-[#E8B04A] px-4 py-3 text-sm font-extrabold text-[#0D0603] shadow-lg shadow-black/50 transition-transform active:scale-95 sm:bottom-5 sm:right-5 sm:px-5 sm:text-base"
    >
      <span aria-hidden>📞</span> Enroll Today
    </a>
  );
}

export default function AchievementsPage() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Nav />
      <main>
        <Hero />
        <StatsRow />
        <AchievementList />
        <GloryEarned />
        <CTA />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}