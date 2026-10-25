"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
  ["Virtues", "/#virtues"],
  ["Women", "/#women"],
  ["Achievements", "/achievements"],
  ["Contact", "/#contact"],
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

// ---------- Small pieces ----------
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const SOLID_BTN =
  "border-2 border-[#FF9A1F] bg-gradient-to-r from-[#FF7A1A] to-[#F5C518] text-[#1C120C] shadow-[0_0_20px_rgba(255,122,26,0.45)] hover:from-[#FF8F3A] hover:to-[#FFD84D]";

function Btn({ href, children, solid }: { href: string; children: ReactNode; solid?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-lg px-5 py-2.5 font-bold transition-all active:scale-95 ${
        solid ? SOLID_BTN : "border-2 border-[#FF9A1F]/60 text-[#FFD84D] hover:bg-[#FF7A1A]/10"
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
      className="h-10 w-10 shrink-0 rounded-full border border-[#FFD84D] bg-[#1C120C]"
    />
  );
}

// ---------- Nav ----------
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#FF8A1F]/30 bg-[#1C120C]/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5" aria-label="Main">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Logo />
          <span className="font-display text-sm leading-tight text-[#F5C518] sm:text-xl">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-4 xl:flex">
          {NAV.map(([l, h]) => (
            <li key={h}>
              <Link
                href={h}
                className={`block rounded-lg px-3 py-2 text-sm transition-all hover:bg-[#FF7A1F]/10 hover:text-[#FFD84D] ${
                  l === "Achievements" ? "text-[#FFD84D]" : "text-[#E9D6AE]/85"
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
            className="flex h-10 w-10 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-lg border border-[#FF8A1F]/50 marker:hidden [&::-webkit-details-marker]:hidden"
          >
            <span className="block h-[2px] w-5 rounded-full bg-[#F5C518]" />
            <span className="block h-[2px] w-5 rounded-full bg-[#F5C518]" />
            <span className="block h-[2px] w-5 rounded-full bg-[#F5C518]" />
          </summary>
          <ul className="absolute right-0 z-50 mt-3 w-56 space-y-1 rounded-xl border border-[#FF8A1F]/50 bg-gradient-to-br from-[#3A1C0B] to-[#1C120C] p-3 shadow-2xl shadow-black/70">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="block rounded-lg px-3 py-2.5 text-[#E9D6AE]/90 hover:bg-[#FF7A1A]/10 hover:text-[#FFD84D]">
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

// ---------- Hero ----------
function Hero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-[#080503] pt-28 pb-16">
      <Image src="/win.png" alt="" fill priority sizes="100vw" className="object-cover object-right opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#080503]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,166,0,0.18),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-5">
        <Reveal>
          <span className="inline-block rounded-full border border-[#FFD84D]/50 bg-[#FF7A18]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD84D]">
            Our glory
          </span>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-5 font-display text-4xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-6xl">
            Hall of <span className="text-[#FFD84D]">Glory</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F5E5C5]/90 sm:text-base">
            Championships and milestones earned on the training floor, by students who showed up, practised hard and never quit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Stats ----------
function StatsRow() {
  return (
    <section className="relative border-y border-[#FFD84D]/25 bg-[#120804] py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center sm:px-5 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 120}>
            <p className="font-display text-4xl text-[#FFD84D] drop-shadow-[0_2px_10px_rgba(255,216,77,0.35)] sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F5E5C5]/80">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- Achievements list with level filter ----------
function AchievementList() {
  const [level, setLevel] = useState<Level>("All");
  const list = level === "All" ? ACHIEVEMENTS : ACHIEVEMENTS.filter((a) => a.level === level);

  return (
    <section className="relative overflow-hidden bg-[#0D0603] py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#FF7A18]/12 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">Wins & titles</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF3D6] sm:text-5xl">Our proudest wins</h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by level">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              aria-pressed={level === l}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                level === l
                  ? "border-[#FFD84D] bg-[#FF7A18]/20 text-[#FFD84D] shadow-[0_0_18px_rgba(255,122,24,0.35)]"
                  : "border-[#FF9A1F]/30 text-[#F5E5C5]/80 hover:border-[#FF9A1F]/70"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {list.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 120}>
              <li className="group relative h-full list-none overflow-hidden rounded-2xl border border-[#FF9A1F]/30 bg-[#1A0C05]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD84D]/60 sm:p-7">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#FF7A18] to-[#FFD84D]" />
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-sm text-[#FF9A1F]">{a.year}</span>
                  <span className="rounded-full bg-[#FFD84D] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1C120C]">
                    {a.level}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl text-[#FFD84D] sm:text-2xl">{a.title}</h3>
                <p className="mt-3 leading-7 text-[#E9D6AE]/85">{a.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-md border border-[#FF9A1F]/30 px-2.5 py-1 text-[#F5E5C5]/85">{a.student}</span>
                  <span className="rounded-md border border-[#FFD84D]/40 bg-[#FFD84D]/10 px-2.5 py-1 text-[#FFD84D]">{a.place}</span>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        {list.length === 0 && (
          <p className="mt-10 text-center text-[#F5E5C5]/70">No achievements in this category yet.</p>
        )}
      </div>
    </section>
  );
}

// ---------- Glory is earned ----------
function GloryEarned() {
  return (
    <section className="relative overflow-hidden bg-[#140803] py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,166,0,0.12),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-5">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF9A1F]">The podium awaits</p>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-5xl">
            Glory is <span className="text-[#FFD84D]">earned</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#F5E5C5]/90">
            Every medal starts as a morning on the training floor. Our champions were once beginners, and every title was built one session at a time.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <blockquote className="mt-10 border-y border-[#FFD84D]/30 py-8">
            <p className="font-display text-xl text-[#FFD84D] sm:text-2xl">
              “Every champion was once a beginner who refused to quit.”
            </p>
            <p lang="ta" className="mt-4 text-base text-[#F5E5C5]/85">
              ஒவ்வொரு வெற்றியாளரும் ஒருகாலத்தில் ஆரம்பித்தவரே.
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10">
            <Btn href="/programs" solid>Start your journey</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTA() {
  return (
    <section id="join" className="relative overflow-hidden bg-[#0D0603] px-4 py-20 sm:px-5">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[800px] max-w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFE27A_0%,#FFB020_22%,#FF7A18_45%,transparent_70%)] opacity-30 blur-2xl" />
      <Reveal className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-[#FF9A1F]/40 bg-[#160A04]/75 p-8 text-center shadow-[0_0_60px_rgba(255,122,24,0.2)] backdrop-blur-md sm:p-12">
        <h2 className="glow-text font-display text-3xl text-white sm:text-4xl">Your name could be next</h2>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-[#F5E5C5]/90">
          Join a batch this month and start working towards your first medal.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Btn href={TEL} solid>Call to enrol</Btn>
          <Btn href="/programs">View programs</Btn>
        </div>
      </Reveal>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#140803] pb-20 pt-16 sm:pb-0">

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



      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-5 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-display text-xl text-[#FFD84D]">{SITE.name}</span>
          </div>
          <p className="mt-4 text-[#F5E5C5]/85">Tamil staff fighting, taught with discipline, strength and heritage.</p>
        </div>

        <div>
          <h3 className="font-display text-lg text-[#FFB020]">Quick links</h3>
          <ul className="mt-3 space-y-2 text-[#F5E5C5]/85">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="transition hover:text-[#FFD84D]">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-[#FFB020]">Achievements</h3>
          <ul className="mt-3 space-y-2 text-[#F5E5C5]/85">
            {LEVELS.slice(1).map((l) => (
              <li key={l}>{l} level</li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className="font-display text-lg text-[#FFB020]">Contact us</h3>
          <ul className="mt-3 space-y-3 text-[#F5E5C5]/85">
            <li>{SITE.place}</li>
            <li><a className="transition hover:text-[#FFD84D]" href={TEL}>{SITE.phone}</a></li>
            <li className="break-words">
              <a className="transition hover:text-[#FFD84D]" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>{SITE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-[#FF9A1F]/25 px-4 py-6 text-sm text-[#F5E5C5]/65 sm:px-5">
        <p>© 2026 Padaivedu Yudhakalam. All rights reserved.</p>
        <p className="text-xs uppercase tracking-[0.3em] text-[#FFB020]/70">Tradition • Discipline • Strength</p>
      </div>
    </footer>
  );
}

function FloatingCall() {
  return (
    <a
      href={TEL}
      aria-label="Call the academy to enrol"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#F5C518] px-4 py-3 text-sm font-bold text-[#1C120C] shadow-lg shadow-black/40 active:scale-95 sm:bottom-5 sm:right-5 sm:px-5 sm:text-base"
    >
      <span aria-hidden>📞</span> Enroll Today
    </a>
  );
}

export default function AchievementsPage() {
  return (
    <>
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