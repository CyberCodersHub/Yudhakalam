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
  ["Programs", "/program"],
  ["Virtues", "/virtues"],
  ["Achievements", "/achievements"],
  ["Contact", "/#contact"],
];

const FILTERS = ["All", "Weapons", "Women", "Youth", "Advanced"] as const;
type Filter = (typeof FILTERS)[number];

const FEATURED = [
  {
    badge: "Core foundation",
    duration: "3 months · Beginner",
    title: "Silambam Staff Fighting",
    subtitle: "The heart of the art",
    desc: "The ancient Tamil art of Silambam involves swift footwork, fluid staff movements and precise strikes. This course builds the foundation every other weapon depends on.",
    learns: ["Basic stance and footwork", "Core staff strikes and blocks", "Timing, rhythm and breath control"],
    filter: "Weapons" as Filter,
    img: "/programs/1-single-stick.jpg",
  },
  {
    badge: "Women only",
    duration: "3 months · All levels",
    title: "Women's Self Defence",
    subtitle: "Confidence and awareness",
    desc: "Practical self-defence built on Silambam movement, designed for women to gain awareness, situational judgement and physical confidence.",
    learns: ["Stance, escape and release techniques", "Situational awareness drills", "Confidence and body control"],
    filter: "Women" as Filter,
    img: "/programs/8-womens-self-defence.jpg",
  },
  {
    badge: "Ages 8–16",
    duration: "3 months · Youth",
    title: "Youth Program",
    subtitle: "Discipline from an early age",
    desc: "A structured path for young students that teaches Silambam alongside focus, respect and healthy physical habits.",
    learns: ["Age-appropriate footwork and stick work", "Discipline, respect and teamwork", "Flexibility and coordination"],
    filter: "Youth" as Filter,
    img: "/programs/9-youth-program.jpg",
  },
];

const JOURNEY = [
  {
    title: "Stances, grips & foundational footwork",
    desc: "Learn how to stand, hold the staff and move. Every later skill is built on these basics.",
    points: ["Basic stances and balance", "Correct grip and posture", "Footwork patterns"],
    focus: "Foundation",
  },
  {
    title: "Strikes, blocks & two-stick rhythm",
    desc: "Add striking patterns, defensive blocks and the first double-stick drills with a partner.",
    points: ["Core strikes and counters", "Block and recover drills", "Partner timing exercises"],
    focus: "Development",
  },
  {
    title: "Flow, sparring basics & assessment",
    desc: "Put it all together in flowing sequences, light sparring and a graded assessment at the end.",
    points: ["Combination sequences", "Controlled light sparring", "Graded assessment"],
    focus: "Mastery & Beyond",
  },
];

const DISCIPLINES = [
  { title: "Single stick", cat: "Weapons", img: "/programs/1-single-stick.png", desc: "Stance, footwork and core strikes with one staff." },
  { title: "Double stick", cat: "Weapons", img: "/programs/2-double-stick.png", desc: "Both hands together for speed, rhythm and coordination." },
  { title: "Surulvall", cat: "Advanced", img: "/programs/3-surulvall.png", desc: "The flexible coiled blade. Demands control and timing." },
  { title: "Vel Kambu", cat: "Weapons", img: "/programs/4-vel-kambu.png", desc: "Spear-style thrusts and reach, built on balance." },
  { title: "Maan Kombu", cat: "Advanced", img: "/programs/5-maan-kombu.png", desc: "Twin-horn weapon for close defence and sharp counters." },
  { title: "Kuthuvarisai", cat: "Advanced", img: "/programs/6-kuthuvarisai.png", desc: "Empty-hand combat built on strikes, blocks and body control." },
  { title: "Advanced Techniques", cat: "Advanced", img: "/programs/7-advance-equipments-techniques.png", desc: "Higher-level equipment work for experienced students." },
  { title: "Women's Self Defence", cat: "Women", img: "/programs/8-womens-self-defence.png", desc: "Practical self-defence that builds confidence and awareness." },
  { title: "Youth Program", cat: "Youth", img: "/programs/9-youth-program.png", desc: "Structured Silambam for young students with discipline." },
  { title: "Gymnastics", cat: "Youth", img: "/programs/10-gymnastics.png", desc: "Flexibility, balance and strength that support every skill." },
];

const BATCHES = [
  { tag: "Weekdays", name: "Morning batch", time: "6:00 – 8:00 AM", who: "Adults & beginners" },
  { tag: "Weekdays", name: "Evening batch", time: "4:00 – 6:00 PM", who: "Adults & youth" },
  { tag: "Limited seats", name: "Women's batch", time: "Separate slot", who: "Women only" },
  { tag: "Parent visit", name: "Youth batch", time: "Separate slot", who: "Ages 8–16" },
];

const DAY_ONE = [
  { title: "Arrive 10 minutes early", desc: "Change into comfortable clothes and meet your instructor before class." },
  { title: "Warm-up together", desc: "Every session starts with a guided warm-up suited to your level." },
  { title: "Bring your own water", desc: "Stay hydrated; bring a bottle and a towel." },
  { title: "Equipment is provided", desc: "Your first staff and starter kit are included for new learners." },
];

const FAQ = [
  {
    q: "Do I need prior martial arts experience to join?",
    a: "None at all. Over 80% of our new students start with zero background. Our 3-month foundational course is specifically structured to guide beginners safely through posture, grip, footwork, and basic combat.",
  },
  {
    q: "Do I need to buy a bamboo staff or weapons before starting?",
    a: "No. Your first staff and starter kit are provided for new learners. You can buy your own once you have settled into training.",
  },
  {
    q: "Is Silambam safe for children?",
    a: "Yes. The Youth Program (ages 8–16) uses age-appropriate footwork and stick work, with discipline and supervision. Please call the academy to confirm the right batch for your child.",
  },
  {
    q: "What happens after completing the 3-month basic course?",
    a: "Students can continue to advanced equipment and techniques, such as Surulvall and Maan Kombu.",
  },
  {
    q: "Why is the Women's Self-Defense course free?",
    a: "Free places are available for women who qualify, and women get first call on new seats. Please call the academy for the current eligibility details.",
  },
];

// Deterministic ember positions so server and client render the same markup.
const EMBERS = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 41) % 100,
  top: (i * 59) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.45) % 6,
  duration: 4 + (i % 5),
  color: i % 3 === 0 ? "#FFD84D" : i % 3 === 1 ? "#FFA332" : "#FFC93C",
}));

const AMBIENT_DUST = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 29) % 100,
  top: (i * 47) % 100,
  size: 2 + (i % 3),
  duration: 9 + (i % 6),
  delay: (i * 0.7) % 8,
}));

// All keyframes and animation classes live here, in one place.
const pageStyles = `
  @keyframes title-glow {
    0%, 100% { text-shadow: 0 0 18px rgba(255,190,60,0.35); }
    50% { text-shadow: 0 0 34px rgba(255,190,60,0.7); }
  }
  @keyframes page-glow {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.7; }
  }
  @keyframes spin-slow { to { transform: rotate(360deg); } }
  @keyframes rays-spin { to { transform: rotate(360deg); } }
  @keyframes rays-breathe {
    0%, 100% { opacity: 0.25; }
    50% { opacity: 0.5; }
  }
  @keyframes ember-rise {
    0% { transform: translateY(0) scale(0.6); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 0.8; }
    100% { transform: translateY(-120px) scale(1.2); opacity: 0; }
  }
  @keyframes card-shimmer {
    0% { transform: translateX(-120%) skewX(-18deg); }
    60%, 100% { transform: translateX(260%) skewX(-18deg); }
  }
  @keyframes btn-sweep {
    0% { transform: translateX(-120%) skewX(-18deg); }
    100% { transform: translateX(260%) skewX(-18deg); }
  }
  @keyframes tab-pulse {
    0%, 100% { box-shadow: 0 0 18px rgba(255,122,24,0.3); }
    50% { box-shadow: 0 0 34px rgba(255,122,24,0.6); }
  }
  @keyframes icon-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes badge-glow {
    0%, 100% { box-shadow: 0 0 10px rgba(255,216,77,0.4); }
    50% { box-shadow: 0 0 22px rgba(255,216,77,0.9); }
  }
  @keyframes divider-grow {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes footer-glow {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 0.85; }
  }
  @keyframes sun-breathe {
    0%, 100% { opacity: 0.55; transform: scale(0.94); }
    50% { opacity: 0.95; transform: scale(1.06); }
  }
  @keyframes sun-rays-spin { to { transform: rotate(360deg); } }
  @keyframes border-orbit { to { transform: rotate(360deg); } }
  @keyframes card-halo {
    0%, 100% { box-shadow: 0 0 50px rgba(255,140,30,0.35), inset 0 0 30px rgba(255,160,40,0.08); }
    50% { box-shadow: 0 0 110px rgba(255,160,40,0.65), inset 0 0 50px rgba(255,190,60,0.18); }
  }
  @keyframes ember-drift {
    0% { transform: translateY(0) scale(0.6); opacity: 0; }
    25% { opacity: 1; }
    100% { transform: translateY(-160px) scale(1.2); opacity: 0; }
  }
  @keyframes orb-a {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(60px, -40px) scale(1.15); }
  }
  @keyframes orb-b {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-70px, 30px) scale(0.9); }
  }
  @keyframes beam-sweep {
    0% { transform: translateX(-120%) skewX(-18deg); }
    100% { transform: translateX(420%) skewX(-18deg); }
  }
  @keyframes dust-float {
    0% { transform: translateY(0); opacity: 0; }
    20% { opacity: 0.9; }
    80% { opacity: 0.6; }
    100% { transform: translateY(-90px); opacity: 0; }
  }
  @keyframes jt-ring {
    0% { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  @keyframes jt-glow {
    0%, 100% { box-shadow: 0 0 18px rgba(255,190,60,0.45); }
    50% { box-shadow: 0 0 38px rgba(255,190,60,0.9); }
  }
  @keyframes jt-dot {
    0% { left: 0%; opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { left: 100%; opacity: 0; }
  }

  .glow-text { animation: title-glow 4s ease-in-out infinite; }
  .ember { animation: ember-rise linear infinite; }
  .tab-active { animation: tab-pulse 2.6s ease-in-out infinite; }
  .badge-glow { animation: badge-glow 3s ease-in-out infinite; }
  .icon-float { animation: icon-float 3s ease-in-out infinite; }
  .divider-grow { transform-origin: left; animation: divider-grow 1.2s ease-out both; }

  .orb-a { animation: orb-a 16s ease-in-out infinite; }
  .orb-b { animation: orb-b 20s ease-in-out infinite; }
  .beam-sweep { animation: beam-sweep 14s ease-in-out infinite; }
  .dust { animation: dust-float linear infinite; }

  .jt-ring { animation: jt-ring 2s ease-out infinite; }
  .jt-glow { animation: jt-glow 2.6s ease-in-out infinite; }
  .jt-dot { animation: jt-dot 2.4s linear infinite; }

  .btn-sweep-wrap { position: relative; overflow: hidden; }
  .btn-sweep-wrap::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
    transform: translateX(-120%) skewX(-18deg);
    pointer-events: none;
  }
  .btn-sweep-wrap:hover::after { animation: btn-sweep 0.9s ease forwards; }

  .card-shine { position: relative; overflow: hidden; }
  .card-shine::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,216,77,0.14), transparent);
    transform: translateX(-120%) skewX(-18deg);
    pointer-events: none;
    z-index: 1;
  }
  .card-shine:hover::before { animation: card-shimmer 1s ease forwards; }

  .image-shine { position: relative; overflow: hidden; }
  .image-shine::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,216,77,0.25) 50%, transparent 60%);
    transform: translateX(-120%);
    pointer-events: none;
  }
  .image-shine:hover::after { animation: card-shimmer 1s ease forwards; }

  @media (prefers-reduced-motion: reduce) {
    .anim, .glow-text, .ember, .tab-active, .badge-glow, .icon-float, .divider-grow,
    .orb-a, .orb-b, .beam-sweep, .dust, .jt-ring, .jt-glow, .jt-dot,
    .card-shine::before, .btn-sweep-wrap::after, .image-shine::after,
    .cta-sun *, .ambient, .ambient * {
      animation: none !important;
    }
  }
`;

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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Ambient background: slow orbs, light sweep and floating dust. Place as the first child of a section.
function AmbientBackdrop({ variant = "warm" }: { variant?: "warm" | "gold" | "ember" }) {
  const tone =
    variant === "gold"
      ? "rgba(255,216,77,0.16)"
      : variant === "ember"
      ? "rgba(255,110,30,0.2)"
      : "rgba(255,140,30,0.14)";

  return (
    <div aria-hidden className="ambient pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="orb-a absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full blur-[120px]" style={{ background: tone }} />
      <div className="orb-b absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full blur-[110px]" style={{ background: tone }} />
      <div className="beam-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFD84D]/10 to-transparent" />
      {AMBIENT_DUST.map((d, i) => (
        <span
          key={i}
          className="dust absolute rounded-full bg-[#FFD84D]"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px 2px rgba(255,200,70,0.6)",
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function GoldText({ children }: { children: ReactNode }) {
  return (
    <span className="glow-text bg-gradient-to-r from-[#D98A12] via-[#FFD84D] to-[#E8A317] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

const SOLID_BTN =
  "border border-[#FFA332] bg-gradient-to-r from-[#FF7A18] to-[#FFC93C] text-[#1C0E02] shadow-[0_0_28px_rgba(255,150,40,0.5)] hover:from-[#FF8F3A] hover:to-[#FFD84D] hover:shadow-[0_0_40px_rgba(255,150,40,0.7)]";

function Btn({ href, children, solid }: { href: string; children: ReactNode; solid?: boolean }) {
  return (
    <Link
      href={href}
      className={`btn-sweep-wrap inline-block rounded-md px-5 py-2.5 font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
        solid ? SOLID_BTN : "border border-[#FFC93C]/70 text-[#FFD84D] hover:bg-[#FFC93C]/10"
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
      alt={`${SITE.name} logo`}
      width={40}
      height={40}
      className="h-10 w-10 shrink-0 rounded-full border border-[#FFC93C]/70 bg-[#0B0603] object-cover"
    />
  );
}

// ---------- Nav ----------
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#FFC93C]/25 bg-[#1A0A03]/85 pt-[env(safe-area-inset-top)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5" aria-label="Main">
        <Link href="/" className="flex min-w-0 items-center gap-2 transition duration-300 hover:-translate-y-0.5 sm:gap-3">
          <Logo />
          <span className="font-display text-sm leading-tight text-[#FFD84D] sm:text-xl">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV.map(([l, h]) => (
            <li key={h}>
              <Link
                href={h}
                className={`block rounded-md px-3 py-2 text-sm transition duration-300 hover:-translate-y-0.5 hover:text-[#FFC93C] ${
                  l === "Programs" ? "text-[#FFC93C]" : "text-[#FFF1C7]/85"
                }`}
              >
                {l}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <Link
              href="/#join"
              className="btn-sweep-wrap block rounded-md bg-gradient-to-r from-[#FF7A18] to-[#FFC93C] px-4 py-2 text-center text-sm font-semibold uppercase tracking-wider text-[#1C0E02] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,150,40,0.6)]"
            >
              Join now
            </Link>
          </li>
        </ul>

        <details className="relative shrink-0 xl:hidden">
          <summary
            aria-label="Open menu"
            className="flex h-10 w-10 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-md border border-[#FFC93C]/50 [&::-webkit-details-marker]:hidden"
          >
            <span className="block h-[2px] w-5 bg-[#FFD84D]" />
            <span className="block h-[2px] w-5 bg-[#FFD84D]" />
            <span className="block h-[2px] w-5 bg-[#FFD84D]" />
          </summary>
          <ul className="absolute right-0 z-50 mt-3 w-56 space-y-1 rounded-xl border border-[#FFC93C]/40 bg-[#2A1205] p-3 shadow-2xl">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="block rounded-md px-3 py-2.5 text-[#FFF1C7]/90 hover:bg-[#FFC93C]/10 hover:text-[#FFC93C]">
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
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-[#0B0603] pb-16 pt-28">
      <Image src="/hero.png" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#2A1205]/60 to-[#1A0A03]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,140,30,0.25),transparent_60%)]" />
      <AmbientBackdrop variant="gold" />

      {/* Rotating gold rays behind the title */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30">
        <div
          className="anim h-full w-full rounded-full [mask-image:radial-gradient(circle,black_10%,transparent_65%)]"
          style={{
            background:
              "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,200,70,0.45) 0deg 2deg, transparent 2deg 16deg)",
            animation: "rays-spin 80s linear infinite, rays-breathe 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating embers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember absolute rounded-full"
            style={{
              left: `${e.left}%`,
              top: `${e.top}%`,
              width: e.size,
              height: e.size,
              background: e.color,
              boxShadow: `0 0 ${e.size * 4}px ${e.color}`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-5">
        <Reveal>
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FFC93C]">
            <span className="divider-grow h-px w-10 bg-[#FFC93C]/70" />
            Ancient Tamil martial arts
            <span className="divider-grow h-px w-10 bg-[#FFC93C]/70" />
          </span>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-6 font-display text-4xl leading-[1.1] text-[#FFF1C7] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-6xl">
            Training <GoldText>Programs</GoldText>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <div className="mx-auto my-8 h-[3px] w-20 bg-gradient-to-r from-transparent via-[#FF7A18] to-transparent" />
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#FFF1C7]/90 sm:text-base">
            Three-month foundational courses in authentic Tamil martial arts, leading to advanced weapons training.
            Build discipline, strength and warrior spirit, one step at a time.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FFF1C7]/80">
            {["Core courses", "3-month journey", "Weapon arsenal", "Women's classes", "Ages 8+"].map((t, i) => (
              <span
                key={t}
                className="rounded-full border border-[#FFC93C]/40 bg-[#FF7A18]/10 px-3 py-1.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#FFD84D] hover:bg-[#FF7A18]/20"
                style={{ animation: `icon-float ${4 + i * 0.4}s ease-in-out ${i * 0.2}s infinite` }}
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Featured programs with filter ----------
function Featured() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? FEATURED : FEATURED.filter((p) => p.filter === filter);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <AmbientBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 ${
                filter === f
                  ? "border-[#FFD84D] bg-[#FF7A18]/20 text-[#FFD84D] shadow-[0_0_18px_rgba(255,122,24,0.35)]"
                  : "border-[#FFC93C]/30 text-[#FFF1C7]/80 hover:border-[#FFC93C]/70"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 150}>
              <article className="card-shine group flex h-full flex-col overflow-hidden rounded-2xl border border-[#FFC93C]/30 bg-gradient-to-br from-[#3A1C0B]/80 to-[#1A0A03]/95 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-2 hover:border-[#FFD84D]/70 hover:shadow-[0_30px_70px_rgba(255,122,24,0.25)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 30vw, 90vw"
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="badge-glow absolute left-4 top-4 rounded-full bg-[#FFD84D] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1C0E02]">
                    {p.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF9F1C]">{p.duration}</p>
                  <h3 className="mt-2 font-display text-2xl text-[#FFD84D]">{p.title}</h3>
                  <p className="mt-1 text-sm italic text-[#FFF1C7]/70">{p.subtitle}</p>
                  <p className="mt-4 text-sm leading-7 text-[#FFF1C7]/85">{p.desc}</p>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFC93C]">What you&apos;ll learn</p>
                  <ul className="mt-2 space-y-2">
                    {p.learns.map((l) => (
                      <li
                        key={l}
                        className="flex items-start gap-2 text-sm text-[#FFF1C7] transition-transform duration-300 hover:translate-x-1"
                      >
                        <span className="icon-float mt-1 text-[#FF7A18]">✦</span>
                        {l}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Btn href="/#join" solid>Enrol in this course</Btn>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-10 text-center text-[#FFF1C7]/70">No featured course in this category yet.</p>
        )}
      </div>
    </section>
  );
}

// ---------- 3-month journey (timeline) ----------
function Journey() {
  const [active, setActive] = useState(0);
  const item = JOURNEY[active];
  const steps = JOURNEY.length - 1;

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <AmbientBackdrop variant="ember" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9F1C]">Course outline</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF1C7] sm:text-5xl">
            Your <GoldText>3-month</GoldText> learning journey
          </h2>
        </Reveal>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div aria-hidden className="absolute left-14 right-14 top-10 h-[2px] bg-[#FFC93C]/15" />

          <div
            aria-hidden
            className="absolute left-14 top-10 h-[2px] bg-gradient-to-r from-[#FF7A18] via-[#FFB020] to-[#FFD84D] shadow-[0_0_12px_rgba(255,160,40,0.7)] transition-[width] duration-700 ease-out"
            style={{ width: `calc((100% - 7rem) * ${active / steps})` }}
          >
            <span
              className="jt-dot absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#FFF1C7] shadow-[0_0_10px_4px_rgba(255,216,77,0.8)]"
              style={{ left: "100%" }}
            />
          </div>

          <div role="tablist" className="relative flex justify-between">
            {JOURNEY.map((j, i) => {
              const isActive = i === active;
              const isDone = i < active;

              return (
                <button
                  key={j.focus}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex w-28 flex-col items-center text-center focus:outline-none"
                >
                  <span className="relative grid h-20 w-20 place-items-center">
                    {isActive && (
                      <span aria-hidden className="jt-ring absolute inset-0 rounded-full border-2 border-[#FFD84D]" />
                    )}
                    <span
                      className={`relative grid h-20 w-20 place-items-center rounded-full border-2 bg-[#0B0603] font-display text-2xl transition-all duration-500 group-hover:scale-110 ${
                        isActive
                          ? "jt-glow border-[#FFD84D] text-[#FFD84D]"
                          : isDone
                          ? "border-[#FF7A18] text-[#FF9F1C] shadow-[0_0_14px_rgba(255,122,24,0.35)]"
                          : "border-[#FFC93C]/25 text-[#FFF1C7]/40"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>

                  <span
                    className={`mt-4 block text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isActive ? "text-[#FFC93C]" : "text-[#FFF1C7]/80"
                    }`}
                  >
                    Month {i + 1}
                  </span>
                  <span
                    className={`mt-1 block font-display text-base leading-snug transition-colors duration-300 ${
                      isActive ? "text-[#FFD84D]" : "text-[#FFF1C7]/60"
                    }`}
                  >
                    {j.focus}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div
          key={active}
          role="tabpanel"
          className="mt-14 grid gap-8 rounded-[2rem] border border-[#FFC93C]/30 bg-[#1A0A03]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-10 lg:grid-cols-[1.2fr_1fr]"
          style={{ animation: "fade-up 600ms ease-out both" }}
        >
          <div>
            <h3 className="font-display text-2xl leading-tight text-[#FFD84D] sm:text-3xl">{item.title}</h3>
            <p className="mt-4 leading-8 text-[#FFF1C7]/85">{item.desc}</p>
          </div>
          <div className="rounded-xl border border-[#FFD84D]/25 bg-black/30 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFC93C]">Key points</p>
            <ul className="mt-4 space-y-3">
              {item.points.map((p, i) => (
                <li
                  key={p}
                  className="flex items-center gap-3 text-[#FFF1C7]"
                  style={{ animation: `fade-up 500ms ease-out ${150 + i * 120}ms both` }}
                >
                  <span className="grid h-5 w-5 place-items-center rounded-[4px] border border-[#FFD84D]/70 bg-[#FF7A18]/15 text-[10px] text-[#FFD84D]">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- All disciplines grid ----------
function Disciplines() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <AmbientBackdrop variant="gold" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9F1C]">The full syllabus</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF1C7] sm:text-5xl">
            Ten disciplines, <GoldText>one legacy</GoldText>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 120}>
              <li className="card-shine group flex h-full items-center gap-4 rounded-xl border border-[#FFC93C]/25 bg-[#2A1205]/70 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[#FFD84D]/70 hover:bg-[#3A1C0B] hover:shadow-[0_15px_40px_rgba(255,122,24,0.2)]">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black">
                  <Image
                    src={d.img}
                    alt={d.title}
                    fill
                    sizes="80px"
                    className="object-contain p-1 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0">
                  <span className="icon-float inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF9F1C]">
                    {d.cat}
                  </span>
                  <h3 className="font-display text-lg text-[#FFD84D] transition-transform duration-300 group-hover:translate-x-1">
                    {d.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#FFF1C7]/80">{d.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#FFF1C7]/80">
            Interested in advanced weapons? Continue to Advanced Weapons Training (Surulvall, Vel Kambu and Maan Kombu) after completing the 3-month foundational course.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Batches & day one ----------
function Batches() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <AmbientBackdrop />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9F1C]">Schedules</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF1C7] sm:text-5xl">
            Batches & <GoldText>guidelines</GoldText>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#FFF1C7]/85 sm:text-base">
            Weekday mornings and evening batches, free training for women, and weekend masterclasses conducted by experienced instructors.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BATCHES.map((b, i) => (
            <Reveal key={b.name} delay={i * 120}>
              <div className="card-shine group h-full rounded-xl border border-[#FFC93C]/30 bg-[#1A0A03]/90 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#FFD84D]/70 hover:bg-[#2A1205] hover:shadow-[0_18px_40px_rgba(255,122,24,0.2)]">
                <span className="icon-float inline-block rounded-full bg-[#FF7A18]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FFD84D] transition-transform duration-300 group-hover:scale-105">
                  {b.tag}
                </span>
                <h3 className="mt-4 font-display text-xl text-[#FFD84D] transition-transform duration-300 group-hover:translate-x-1">
                  {b.name}
                </h3>
                <div className="divider-grow mt-2 h-px w-12 bg-gradient-to-r from-[#FF7A18] to-transparent" />
                <p className="mt-2 text-sm text-[#FFF1C7]">{b.time}</p>
                <p className="mt-1 text-xs text-[#FFF1C7]/70">{b.who}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h3 className="glow-text font-display text-3xl text-[#FFD84D]">What to expect on day one</h3>
            <div className="divider-grow mt-4 h-[2px] w-24 bg-gradient-to-r from-[#FF7A18] to-transparent" />
            <p className="mt-4 text-sm leading-7 text-[#FFF1C7]/80">
              No experience required. We make sure every student feels welcome and safe from the first session.
            </p>

            <div className="image-shine group relative mt-7 overflow-hidden rounded-2xl border border-[#FFC93C]/40 shadow-[0_0_25px_rgba(255,122,24,0.15)] transition-all duration-500 hover:border-[#FFD84D]/80 hover:shadow-[0_0_35px_rgba(255,122,24,0.35)]">
              <Image
                src="/arts.png"
                alt="Padaivedu Yudhakalam Silambam warriors"
                width={1672}
                height={941}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 560px"
                className="block h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>

          <ol className="grid gap-4 sm:grid-cols-2">
            {DAY_ONE.map((d, i) => (
              <Reveal key={d.title} delay={i * 120}>
                <li className="card-shine group h-full list-none rounded-xl border border-[#FFC93C]/25 bg-[#2A1205]/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#FFD84D]/60 hover:shadow-[0_15px_35px_rgba(255,122,24,0.15)]">
                  <span className="inline-block font-display text-2xl text-[#FF9F1C] transition-transform duration-500 group-hover:scale-110">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-2 font-semibold text-[#FFF1C7] transition-transform duration-300 group-hover:translate-x-1">
                    {d.title}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-[#FFF1C7]/80">{d.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ (accordion) ----------
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <AmbientBackdrop variant="gold" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-5">
        <Reveal className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9F1C]">Got questions?</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF1C7] sm:text-4xl">Frequently asked questions</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 90}>
                <div
                  className={`card-shine overflow-hidden rounded-xl border transition-all duration-500 ${
                    isOpen
                      ? "border-[#FFD84D]/60 bg-[#120702] shadow-[0_0_30px_rgba(255,122,24,0.15)]"
                      : "border-[#FFC93C]/20 bg-[#0B0603] hover:border-[#FFC93C]/50"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={`font-display text-base transition-colors duration-300 sm:text-lg ${
                        isOpen ? "text-[#FFD84D]" : "text-[#FFF1C7]"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm transition-all duration-500 ${
                        isOpen
                          ? "border-[#FFD84D] text-[#FFD84D] shadow-[0_0_14px_rgba(255,216,77,0.5)]"
                          : "border-[#FFC93C]/40 text-[#FFC93C]"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`mx-6 border-t border-[#FFC93C]/20 transition-opacity duration-500 ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <p
                        className={`px-6 pb-6 pt-4 text-sm leading-7 text-[#FFF1C7]/85 transition-all duration-500 sm:text-base ${
                          isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                        }`}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- CTA (sun glow with rays and orbiting ring) ----------
const CTA_EMBERS = Array.from({ length: 12 }, (_, i) => ({
  left: `${6 + i * 8}%`,
  bottom: `${(i * 17) % 40}%`,
  size: 3 + (i % 2),
  dur: 5 + (i % 4),
  delay: i * 0.45,
}));

function CTA() {
  return (
    <section id="join" className="relative z-10 overflow-hidden px-4 py-24 sm:px-5">
      <style>{`
        @keyframes cta-rays {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes cta-ring {
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes cta-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes cta-breathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes cta-border-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cta-halo {
          0%, 100% { box-shadow: 0 0 40px rgba(255,160,40,0.2), inset 0 0 40px rgba(255,160,40,0.05); }
          50% { box-shadow: 0 0 90px rgba(255,160,40,0.45), inset 0 0 60px rgba(255,160,40,0.12); }
        }
        @keyframes cta-rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-220px) scale(0.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-anim { animation: none !important; }
        }
      `}</style>

      {/* Big sun glow behind the card */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="cta-anim h-full w-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,150,40,0.6)_0%,rgba(255,110,20,0.28)_35%,transparent_70%)] blur-2xl"
          style={{ animation: "cta-breathe 5s ease-in-out infinite" }}
        />
      </div>

      {/* Rotating sunburst rays, faded toward the edges */}
      <div
        aria-hidden
        className="cta-anim pointer-events-none absolute left-1/2 top-1/2 h-[1000px] w-[1000px] max-w-none rounded-full opacity-60 [mask-image:radial-gradient(circle,transparent_15%,black_40%,transparent_70%)]"
        style={{
          background: "repeating-conic-gradient(from 8deg at 50% 50%, rgba(255,190,60,0.35) 0deg 2deg, transparent 2deg 14deg)",
          animation: "cta-rays 80s linear infinite",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Dashed ring, counter-rotating */}
      <div
        aria-hidden
        className="cta-anim pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] max-w-[95%] rounded-full border border-dashed border-[#FFC93C]/30"
        style={{ animation: "cta-ring 60s linear infinite", transform: "translate(-50%, -50%)" }}
      />

      {/* Light glints travelling around the ring */}
      <div
        aria-hidden
        className="cta-anim pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] max-w-[95%] rounded-full"
        style={{ animation: "cta-orbit 9s linear infinite", transform: "translate(-50%, -50%)" }}
      >
        <span className="absolute left-0 top-1/2 h-24 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#FFD84D] to-transparent" />
        <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE27A] shadow-[0_0_18px_6px_rgba(255,190,60,0.8)]" />
        <span className="absolute right-0 top-1/2 h-24 w-[2px] translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#FFD84D] to-transparent" />
        <span className="absolute right-0 top-1/2 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE27A] shadow-[0_0_18px_6px_rgba(255,190,60,0.8)]" />
      </div>

      {/* Rising embers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {CTA_EMBERS.map((e, i) => (
          <span
            key={i}
            className="cta-anim absolute rounded-full bg-[#FFD84D]"
            style={{
              left: e.left,
              bottom: e.bottom,
              width: e.size,
              height: e.size,
              boxShadow: "0 0 10px 3px rgba(255,170,40,0.7)",
              animation: `cta-rise ${e.dur}s ease-in ${e.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Card with orbiting gold border light */}
      <Reveal className="relative z-10 mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl p-px">
          <div aria-hidden className="absolute inset-0 overflow-hidden rounded-2xl">
            <div
              className="cta-anim absolute"
              style={{
                left: "-50%",
                top: "-50%",
                width: "200%",
                height: "200%",
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(255,216,77,0.9) 40deg, transparent 90deg, transparent 360deg)",
                animation: "cta-border-spin 5s linear infinite",
              }}
            />
          </div>

          <div
            className="cta-anim relative rounded-2xl bg-[#1A0A03]/95 p-8 text-center backdrop-blur-md sm:p-12"
            style={{ animation: "cta-halo 4s ease-in-out infinite" }}
          >
            <h2 className="font-display text-3xl text-[#FFF1C7] sm:text-4xl">
              Step onto the <GoldText>training floor</GoldText>
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-8 text-[#FFF1C7]/90">
              Monthly batches start on the 1st and 15th of every month. Limited seats are available, so reserve yours today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Btn href={TEL} solid>Call to enrol</Btn>
              <Btn href="/about">About the academy</Btn>
            </div>
          </div>
        </div>
      </Reveal>
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
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A18] to-[#FFC93C] px-4 py-3 text-sm font-semibold text-[#1C0E02] shadow-lg shadow-black/50 active:scale-95 sm:bottom-5 sm:right-5 sm:px-5 sm:text-base"
    >
      <span aria-hidden>📞</span> Enroll Today
    </a>
  );
}

export default function ProgramsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,#4A2508_0%,#2A1205_40%,#1A0A03_100%)]">
      <style>{pageStyles}</style>
      <Nav />
      <main>
        <Hero />
        <Featured />
        <Journey />
        <Disciplines />
        <Batches />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
      <FloatingCall />
    </div>
  );
}