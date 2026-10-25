
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
  ["Achievements", "/#achievements"],
  ["Contact", "/#contact"],
];

// Program filter categories
const FILTERS = ["All", "Weapons", "Women", "Youth", "Advanced"] as const;
type Filter = (typeof FILTERS)[number];

// Featured programs (top cards)
const FEATURED = [
  {
    badge: "Core foundation",
    tone: "orange",
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
    tone: "pink",
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
    tone: "blue",
    duration: "3 months · Youth",
    title: "Youth Program",
    subtitle: "Discipline from an early age",
    desc: "A structured path for young students that teaches Silambam alongside focus, respect and healthy physical habits.",
    learns: ["Age-appropriate footwork and stick work", "Discipline, respect and teamwork", "Flexibility and coordination"],
    filter: "Youth" as Filter,
    img: "/programs/9-youth-program.jpg",
  },
];

// Learning journey (3 stages, tabbed)
const JOURNEY = [
  {
    stage: "Month 01",
    title: "Stances, grips & foundational footwork",
    desc: "Learn how to stand, hold the staff and move. Every later skill is built on these basics.",
    points: ["Basic stances and balance", "Correct grip and posture", "Footwork patterns"],
    focus: "Foundation",
  },
  {
    stage: "Month 02",
    title: "Strikes, blocks & two-stick rhythm",
    desc: "Add striking patterns, defensive blocks and the first double-stick drills with a partner.",
    points: ["Core strikes and counters", "Block and recover drills", "Partner timing exercises"],
    focus: "Technique",
  },
  {
    stage: "Month 03",
    title: "Flow, sparring basics & assessment",
    desc: "Put it all together in flowing sequences, light sparring and a graded assessment at the end.",
    points: ["Combination sequences", "Controlled light sparring", "Graded assessment"],
    focus: "Application",
  },
];

// Full discipline grid
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

// Batches (edit timings with the academy)
const BATCHES = [
  { name: "Morning batch", time: "6:00 – 8:00 AM", who: "Adults and beginners", tag: "Weekends" },
  { name: "Evening batch", time: "4:00 – 6:00 PM", who: "Adults and youth", tag: "Weekends" },
  { name: "Women's batch", time: "Separate slot", who: "Women only", tag: "Limited seats" },
  { name: "Youth batch", time: "Separate slot", who: "Ages 8–16", tag: "Parent visit" },
];

const DAY_ONE = [
  { title: "Arrive 10 minutes early", desc: "Change into comfortable clothes and meet your instructor before class." },
  { title: "Warm-up together", desc: "Every session starts with a guided warm-up suited to your level." },
  { title: "Bring your own water", desc: "Stay hydrated; bring a bottle and a towel." },
  { title: "Equipment is provided", desc: "Your first staff and starter kit are included for new learners." },
];

const FAQ = [
  { q: "Do I need any experience?", a: "No. The beginner course starts from the very first stance, so no prior training is needed." },
  { q: "Are there free places for women?", a: "Yes. Women get first call on new seats, and free classes are available for those who qualify." },
  { q: "Can children join?", a: "The Youth Program is designed for young students. Please call the academy to confirm the right batch for your child." },
  { q: "What happens after the 3 months?", a: "Students can continue to advanced equipment and techniques, such as Surulvall and Maan Kombu." },
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
                  l === "Programs" ? "text-[#FFD84D]" : "text-[#E9D6AE]/85"
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
      <Image src="/hero.png" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#080503]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-5">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF9A1F]">Ancient Tamil martial arts</p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-4 font-display text-4xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-6xl">
            Training <span className="text-[#FFD84D]">Programs</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F5E5C5]/90 sm:text-base">
            Three-month foundational courses in authentic Tamil martial arts, leading to advanced weapons training.
            Build discipline, strength and warrior spirit, one step at a time.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F5E5C5]/80">
            {["Core courses", "3-month journey", "Weapon arsenal", "Women's classes", "Ages 8+"].map((t) => (
              <span key={t} className="rounded-full border border-[#FF9A1F]/40 bg-[#FF7A18]/10 px-3 py-1.5">
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
    <section className="relative overflow-hidden bg-[#140803] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f
                  ? "border-[#FFD84D] bg-[#FF7A18]/20 text-[#FFD84D] shadow-[0_0_18px_rgba(255,122,24,0.35)]"
                  : "border-[#FF9A1F]/30 text-[#F5E5C5]/80 hover:border-[#FF9A1F]/70"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#FF9A1F]/30 bg-[#1A0C05]/90 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 30vw, 90vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#FFD84D] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1C120C]">
                    {p.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF9A1F]">{p.duration}</p>
                  <h3 className="mt-2 font-display text-2xl text-[#FFD84D]">{p.title}</h3>
                  <p className="mt-1 text-sm italic text-[#F5E5C5]/70">{p.subtitle}</p>
                  <p className="mt-4 text-sm leading-7 text-[#E9D6AE]/85">{p.desc}</p>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFB020]">What you&apos;ll learn</p>
                  <ul className="mt-2 space-y-2">
                    {p.learns.map((l) => (
                      <li key={l} className="flex items-start gap-2 text-sm text-[#F5E5C5]">
                        <span className="mt-1 text-[#FF7A18]">✦</span>
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
          <p className="mt-10 text-center text-[#F5E5C5]/70">No featured course in this category yet.</p>
        )}
      </div>
    </section>
  );
}

// ---------- 3-month journey (tabbed) ----------
function Journey() {
  const [active, setActive] = useState(0);
  const item = JOURNEY[active];

  return (
    <section className="relative overflow-hidden bg-[#0D0603] py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#FF7A18]/15 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">Course outline</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF3D6] sm:text-5xl">Your 3-month learning journey</h2>
        </Reveal>

        <div role="tablist" className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {JOURNEY.map((j, i) => (
            <button
              key={j.stage}
              role="tab"
              aria-selected={i === active}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-xl border px-5 py-4 text-left transition-all ${
                i === active
                  ? "border-[#FFD84D] bg-[#FF7A18]/15 shadow-[0_0_25px_rgba(255,122,24,0.3)]"
                  : "border-[#FF9A1F]/25 bg-[#211006]/70 hover:border-[#FF9A1F]/60"
              }`}
            >
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FF9A1F]">{j.stage}</span>
              <span className="mt-1 block font-display text-lg text-[#FFD84D]">{j.focus}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-6 grid gap-8 rounded-[2rem] border border-[#FF9A1F]/30 bg-[#1A0C05]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="font-display text-2xl leading-tight text-[#FFD84D] sm:text-3xl">{item.title}</h3>
            <p className="mt-4 leading-8 text-[#E9D6AE]/85">{item.desc}</p>
          </div>
          <div className="rounded-xl border border-[#FFD84D]/25 bg-black/30 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFB020]">Key points</p>
            <ul className="mt-4 space-y-3">
              {item.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[#F5E5C5]">
                  <span className="grid h-5 w-5 place-items-center rounded-[4px] border border-[#FFD84D]/70 bg-[#FF7A18]/15 text-[10px] text-[#FFD84D]">✓</span>
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
    <section className="relative overflow-hidden bg-[#1C0D05] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">The full syllabus</p>
          <h2 className="glow-text font-display text-3xl text-white sm:text-5xl">
            Ten disciplines, <span className="text-[#FFD84D]">one legacy</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 100}>
              <li className="group flex h-full items-center gap-4 rounded-xl border border-[#FF9A1F]/25 bg-[#211006]/70 p-4 transition-all duration-300 hover:border-[#FFD84D]/70 hover:bg-[#2A1005]">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black">
                  <Image src={d.img} alt={d.title} fill sizes="80px" className="object-contain p-1" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF9A1F]">{d.cat}</span>
                  <h3 className="font-display text-lg text-[#FFD84D]">{d.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#E9D6AE]/80">{d.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#F5E5C5]/80">
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
    <section className="relative overflow-hidden bg-[#140803] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">Schedules</p>
          <h2 className="glow-text font-display text-3xl text-white sm:text-5xl">Batches & guidelines</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#E9D6AE]/85 sm:text-base">
            Weekday mornings and evening batches, free training for women, and weekend masterclasses conducted by experienced instructors.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BATCHES.map((b, i) => (
            <Reveal key={b.name} delay={i * 100}>
              <div className="h-full rounded-xl border border-[#FF9A1F]/30 bg-[#1A0C05]/90 p-5 transition-colors hover:border-[#FFD84D]/60">
                <span className="rounded-full bg-[#FF7A18]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFD84D]">
                  {b.tag}
                </span>
                <h3 className="mt-4 font-display text-xl text-[#FFD84D]">{b.name}</h3>
                <p className="mt-2 text-sm text-[#F5E5C5]">{b.time}</p>
                <p className="mt-1 text-xs text-[#F5E5C5]/70">{b.who}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h3 className="font-display text-3xl text-[#FFD84D]">What to expect on day one</h3>
            <p className="mt-3 text-sm leading-7 text-[#E9D6AE]/80">
              No experience required. We make sure every student feels welcome and safe from the first session.
            </p>
          </Reveal>
          <ol className="grid gap-4 sm:grid-cols-2">
            {DAY_ONE.map((d, i) => (
              <Reveal key={d.title} delay={i * 100}>
                <li className="h-full list-none rounded-xl border border-[#FF9A1F]/25 bg-[#211006]/70 p-5">
                  <span className="font-display text-2xl text-[#FF7A18]/60">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="mt-2 font-bold text-[#FFF3D6]">{d.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-[#E9D6AE]/80">{d.desc}</p>
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
    <section className="relative overflow-hidden bg-[#0D0603] py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-5">
        <Reveal className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">Questions</p>
          <h2 className="glow-text font-display text-3xl text-white sm:text-4xl">Frequently asked questions</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 80}>
                <div className={`overflow-hidden rounded-xl border transition-colors ${isOpen ? "border-[#FFD84D]/60 bg-[#211006]" : "border-[#FF9A1F]/25 bg-[#1A0C05]/80"}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-[#FFF3D6]">{f.q}</span>
                    <span className={`text-xl text-[#FFD84D] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden px-5 text-sm leading-7 text-[#E9D6AE]/85">
                      <span className={isOpen ? "block pb-5" : "block"}>{f.a}</span>
                    </p>
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

// ---------- CTA ----------
function CTA() {
  return (
    <section id="join" className="relative overflow-hidden bg-[#140803] px-4 py-20 sm:px-5">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[800px] max-w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFE27A_0%,#FFB020_22%,#FF7A18_45%,transparent_70%)] opacity-40 blur-2xl" />
      <Reveal className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-[#FF9A1F]/40 bg-[#160A04]/75 p-8 text-center shadow-[0_0_60px_rgba(255,122,24,0.2)] backdrop-blur-md sm:p-12">
        <h2 className="glow-text font-display text-3xl text-white sm:text-4xl">Step onto the training floor</h2>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-[#F5E5C5]/90">
          Monthly batches start on the 1st and 15th of every month. Limited seats are available, so reserve yours today.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Btn href={TEL} solid>Call to enrol</Btn>
          <Btn href="/about">About the academy</Btn>
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
          <h3 className="font-display text-lg text-[#FFB020]">Programs</h3>
          <ul className="mt-3 space-y-2 text-[#F5E5C5]/85">
            {DISCIPLINES.map((d) => (
              <li key={d.title}>{d.title}</li>
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

export default function ProgramsPage() {
  return (
    <>
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
    </>
  );
}