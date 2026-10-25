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
  ["Programs", "/#training"],
  ["Virtues", "/#virtues"],
  ["Women", "/#women"],
  ["Achievements", "/#achievements"],
  ["Contact", "/#contact"],
];

// Confirm these figures with the academy.
const STATS = [
  { value: "5+", label: "Years teaching" },
  { value: "150+", label: "Students trained" },
  { value: "38+", label: "Titles won" },
  { value: "40%", label: "Women in our classes" },
];

const MISSION = [
  {
    tag: "Our mission",
    title: "Keep the art alive",
    desc: "To teach Silambam the way it was handed down, with every stance, strike and song of the old arena kept intact for the next generation.",
  },
  {
    tag: "Our vision",
    title: "Warriors with character",
    desc: "A Padaivedu where children, women and grown men leave the mat stronger in body, steadier in mind and prouder of their roots.",
  },
];

const VALUES = [
  { title: "Respect", desc: "Honour the guru, the training partner and the tradition behind every weapon." },
  { title: "Discipline", desc: "Show up on time, train with care and repeat until the form is true." },
  { title: "Courage", desc: "Step into the ring and face each fear with an open heart." },
  { title: "Unity", desc: "Students train together, lift each other up and grow as one family." },
  { title: "Humility", desc: "Stay a beginner in spirit, even after the hundredth belt." },
  { title: "Heritage", desc: "Carry the Tamil warrior tradition forward with pride and purpose." },
];

// Edit the milestones with the academy's real dates.
const TIMELINE = [
  { step: "Step 01", title: "The first batch", desc: "The academy opened its doors in Padaivedu with a small group of dedicated students." },
  { step: "Step 02", title: "Growing the family", desc: "Word spread across the district, and families began sending their children to train." },
  { step: "Step 03", title: "Women join the arena", desc: "Dedicated batches and self-defence classes welcomed women into the training floor." },
  { step: "Step 04", title: "Proud on the podium", desc: "Students brought home district, state and national titles for their hard work." },
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

// ---------- Small pieces ----------
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
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

  const offset = {
    up: "translateY(20px)",
    left: "translateX(20px)",
    right: "translateX(-20px)",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : offset,
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

function GoldLine({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent shadow-[0_0_15px_#FF7A18] ${className}`}
    />
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
                className={`group relative block rounded-lg px-3 py-2 text-sm transition-all duration-300 hover:bg-[#FF7A1F]/10 hover:text-[#FFD84D] ${
                  l === "About" ? "text-[#FFD84D]" : "text-[#E9D6AE]/85"
                }`}
              >
                {l}
                <span className="absolute bottom-1 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#FF7A18] via-[#F5C518] to-[#FFD84D] transition-transform duration-300 group-hover:scale-x-100" />
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
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-[#080503] pt-24">
      <Image src="/hero.png" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#080503]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,166,0,0.18),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-5">
        <Reveal>
          <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-[#FF9A1F]">
            <span className="h-px w-8 bg-[#FF9A1F]" />
            Our heritage
            <span className="h-px w-8 bg-[#FF9A1F]" />
          </p>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="mt-5 font-display text-4xl leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-6xl">
            Where ancient steel meets
            <span className="block text-[#FFD84D]">a new generation</span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p lang="ta" className="mt-6 text-base text-[#FFE9A8] sm:text-lg">
            ஒழுக்கம், வலிமை, பண்பாடு — இதுவே எங்கள் அடையாளம்.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Btn href="/#training" solid>Explore training</Btn>
            <Btn href="/#join">Join the academy</Btn>
          </div>
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

// ---------- Mission ----------
function Mission() {
  return (
    <section className="relative overflow-hidden bg-[#1C0D05] py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-5 md:grid-cols-2">
        {MISSION.map((m, i) => (
          <Reveal key={m.title} delay={i * 180}>
            <article className="h-full rounded-2xl border border-[#FF9A1F]/30 bg-gradient-to-br from-[#4A1E08]/80 to-[#1E0D06]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-1 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF9A1F]">{m.tag}</p>
              <h3 className="mt-3 font-display text-2xl text-[#FFD84D] sm:text-3xl">{m.title}</h3>
              <div className="my-5 h-px w-16 bg-gradient-to-r from-[#FF7A18] to-transparent" />
              <p className="leading-8 text-[#F5E5C5]/90">{m.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- Values ----------
function Values() {
  return (
    <section className="relative overflow-hidden bg-[#0D0603] py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#FF7A18]/15 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">What we stand for</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF3D6] sm:text-5xl">Six values of the arena</h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#FF9A1F]/25 bg-[#FF9A1F]/15 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 120}>
              <li className="group h-full list-none bg-[#140803] p-7 transition-colors duration-300 hover:bg-[#2A1005]">
                <span className="font-display text-3xl text-[#FF7A18]/50 transition-colors group-hover:text-[#FFD84D]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl text-[#FFD84D]">{v.title}</h3>
                <p className="mt-2 leading-7 text-[#E9D6AE]/85">{v.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------- Tamil quote ----------
function Quote() {
  return (
    <section className="relative overflow-hidden bg-[#140803] py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,166,0,0.12),transparent_60%)]" />
      <Reveal className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <span className="font-display text-6xl leading-none text-[#FF7A18]/40">“</span>
        <p lang="ta" className="-mt-4 text-2xl font-semibold text-[#FFD84D] sm:text-3xl">
          வீரம் பயிற்சியில் பிறக்கும்
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#F5E5C5]/70">Courage is born in practice</p>
      </Reveal>
    </section>
  );
}

// ---------- Timeline ----------
function Timeline() {
  return (
    <section className="relative overflow-hidden bg-[#1C0D05] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">Our journey</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF3D6] sm:text-5xl">Building the legacy</h2>
        </Reveal>

        <div className="relative mt-16">
          {/* Center line on desktop, left line on mobile */}
          <span aria-hidden className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#FFD84D] via-[#FF7A18] to-transparent md:left-1/2" />

          <ol className="space-y-12">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.title} delay={i * 150} direction={i % 2 ? "right" : "left"}>
                <li className={`relative pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <span aria-hidden className="absolute left-2.5 top-1 h-3 w-3 rounded-full bg-[#FFD84D] shadow-[0_0_14px_#FF7A18] md:left-auto md:right-[-6px] md:top-2" style={i % 2 ? { left: "calc(0.625rem - 6px)" } : undefined} />
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF9A1F]">{t.step}</p>
                  <h3 className="mt-2 font-display text-2xl text-[#FFD84D]">{t.title}</h3>
                  <p className="mt-2 leading-7 text-[#E9D6AE]/85">{t.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#140803] px-4 py-20 sm:px-5">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[800px] max-w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFE27A_0%,#FFB020_22%,#FF7A18_45%,transparent_70%)] opacity-40 blur-2xl" />
      <Reveal className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-[#FF9A1F]/40 bg-[#160A04]/75 p-8 text-center shadow-[0_0_60px_rgba(255,122,24,0.2)] backdrop-blur-md sm:p-12">
        <GoldLine className="top-0" />
        <h2 className="glow-text font-display text-3xl text-white sm:text-4xl">Begin your own story</h2>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-[#F5E5C5]/90">
          Come for a free trial session and see the arena for yourself. Seats in each beginner batch are limited.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Btn href={TEL} solid>Call to enrol</Btn>
          <Btn href="/#training">Browse programs</Btn>
        </div>
      </Reveal>
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

          {/* Quick links */}
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

          {/* Programs */}
          <div>
            <h3 className="glow-text font-display text-lg text-[#FFB020]">Programs</h3>
            <ul className="mt-3 space-y-2 text-[#F5E5C5]/85">
              {PROGRAMS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>

          {/* Contact */}
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
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#F5C518] px-4 py-3 text-sm font-bold text-[#1C120C] shadow-lg shadow-black/40 active:scale-95 sm:bottom-5 sm:right-5 sm:px-5 sm:text-base"
    >
      <span aria-hidden>📞</span> Enroll Today
    </a>
  );
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsRow />
        <Mission />
        <Values />
        <Quote />
        <Timeline />
        <CTA />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}