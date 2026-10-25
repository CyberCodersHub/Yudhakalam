
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
  ["Women", "/women"],
  ["Achievements", "/achievements"],
  ["Contact", "/#contact"],
];

// Confirm these figures with the academy.
const STATS = [
  { value: "40%", label: "Women in our classes" },
  { value: "First", label: "Women get first call on new seats" },
  { value: "Free", label: "Classes for those who qualify" },
  { value: "Kit", label: "Free starter kit for first-timers" },
];

const WOMEN_POINTS = [
  { title: "First call on new seats", desc: "Women get priority when a new batch opens, so you never miss your place." },
  { title: "Women-only batches", desc: "Train in a separate, comfortable batch with a women instructor and women peers." },
  { title: "Free classes", desc: "Free training is available for those who qualify. Ask us about eligibility." },
  { title: "Free starter kit", desc: "First-time learners receive a starter kit so you can begin without extra cost." },
  { title: "Self-defence workshops", desc: "Regular awareness sessions on personal safety, situations and quick response." },
  { title: "A respectful space", desc: "A welcoming, disciplined training floor where every student is treated with dignity." },
];

const SELF_DEFENCE_LEARNS = [
  "Stance, balance and footwork",
  "Escape and release techniques",
  "Situational awareness drills",
  "Confidence and voice control",
];

const JOURNEY = [
  { step: "01", title: "Join a free trial", desc: "Come to a session, meet the instructor and see whether the batch feels right for you." },
  { step: "02", title: "Get your starter kit", desc: "First-time learners receive a starter kit and a clear plan for the first month." },
  { step: "03", title: "Train with your batch", desc: "Build strength, footwork and awareness with women-only classes at your own pace." },
  { step: "04", title: "Grow into the arena", desc: "Progress through levels, take part in workshops and inspire the next woman to join." },
];

const FAQ = [
  { q: "Do I need any experience?", a: "No. The women's batch starts from the very first stance. Previous training is not required." },
  { q: "Who are the instructors?", a: "Women's classes are guided by our trained instructors, and women-only batches are kept separate for comfort." },
  { q: "How do I get a free place?", a: "Women get first call on new seats, and free classes are available for those who qualify. Call the academy to check eligibility." },
  { q: "What should I wear?", a: "Comfortable, loose clothing that lets you move freely. Bring a bottle of water and a towel." },
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
                  l === "Women" ? "text-[#FFD84D]" : "text-[#E9D6AE]/85"
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
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#080503] pt-28 pb-16">
      <Image src="/womens.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[70%_center] opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#080503]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,166,0,0.18),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-5">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF9A1F]">For women</p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-4 font-display text-4xl leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-6xl">
            Strength has
            <span className="block text-[#FFD84D]">no gender</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#F5E5C5]/90">
            Silambam does not create courage in her. It brings out the courage that is already there.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Btn href="/#join" solid>Register free</Btn>
            <Btn href="/programs">View programs</Btn>
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
            <p className="font-display text-3xl text-[#FFD84D] drop-shadow-[0_2px_10px_rgba(255,216,77,0.35)] sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-[#F5E5C5]/80">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- Benefits ----------
function Benefits() {
  return (
    <section className="relative overflow-hidden bg-[#140803] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">Why join</p>
          <h2 className="glow-text font-display text-3xl text-[#FFF3D6] sm:text-5xl">Made for women, built with care</h2>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WOMEN_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 120}>
              <li className="group h-full list-none rounded-2xl border border-[#FF9A1F]/30 bg-[#1A0C05]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD84D]/60">
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-[6px] border border-[#FFD84D]/70 bg-[#FF7A18]/15 transition-colors group-hover:bg-[#FFD84D]/30"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="#FFD84D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-xl text-[#FFD84D]">{p.title}</h3>
                <p className="mt-2 leading-7 text-[#E9D6AE]/85">{p.desc}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Self-defence feature ----------
function SelfDefence() {
  return (
    <section className="relative overflow-hidden bg-[#0D0603] py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/3 h-[380px] w-[380px] rounded-full bg-[#FF7A18]/15 blur-[120px]" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-5 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FF9A1F]">Women&apos;s self-defence</p>
          <h2 className="glow-text mt-3 font-display text-3xl leading-tight text-white sm:text-5xl">
            Practical skills, <span className="text-[#FFD84D]">real confidence</span>
          </h2>
          <p className="mt-6 leading-8 text-[#F5E5C5]/90">
            Our self-defence course uses Silambam movement to teach stance, escape and awareness. Lessons focus on what works, and on staying calm and in control.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {SELF_DEFENCE_LEARNS.map((l) => (
              <li key={l} className="flex items-center gap-3 border-b border-[#FF9A1F]/25 pb-3 text-[#FFF3D6]">
                <span className="text-[#FF7A18]">✦</span>
                {l}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <Btn href="/programs" solid>See the course</Btn>
          </div>
        </Reveal>

        <Reveal delay={200} className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#FFD84D]/40 shadow-[0_0_50px_rgba(255,122,24,0.25)]">
            <Image
              src="/womens.jpg"
              alt="A woman practising Silambam with a bamboo staff at sunset"
              fill
              sizes="(min-width:1024px) 40vw, 90vw"
              className="object-cover object-[70%_center] transition-transform duration-[1200ms] ease-out hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0D0603] via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 right-4 rounded-xl border border-[#FFD84D]/50 bg-[#160A04]/95 px-5 py-4 text-center shadow-lg">
            <p className="font-display text-3xl leading-none text-[#FFD84D]">40%</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5E5C5]">Women in our classes</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Journey ----------
function Journey() {
  return (
    <section className="relative overflow-hidden bg-[#1C0D05] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">How to start</p>
          <h2 className="glow-text font-display text-3xl text-white sm:text-5xl">Your path onto the training floor</h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#FF9A1F]/25 bg-[#FF9A1F]/15 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.step} delay={i * 100}>
              <li className="group h-full list-none bg-[#140803] p-7 transition-colors duration-300 hover:bg-[#2A1005]">
                <span className="font-display text-3xl text-[#FF7A18]/50 transition-colors group-hover:text-[#FFD84D]">{j.step}</span>
                <h3 className="mt-3 font-display text-lg text-[#FFD84D]">{j.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#E9D6AE]/85">{j.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------- Quote ----------
function Quote() {
  return (
    <section className="relative overflow-hidden bg-[#140803] py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,166,0,0.12),transparent_60%)]" />
      <Reveal className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <span className="font-display text-6xl leading-none text-[#FF7A18]/40">“</span>
        <p className="-mt-4 font-display text-2xl text-[#FFD84D] sm:text-3xl">
          Confidence is trained, one stance at a time.
        </p>
        <p lang="ta" className="mt-4 text-base text-[#F5E5C5]/85">
          நம்பிக்கை பயிற்சியில் வளரும்.
        </p>
      </Reveal>
    </section>
  );
}

// ---------- FAQ ----------
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#0D0603] py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-5">
        <Reveal className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-[#FF9A1F]">Questions</p>
          <h2 className="glow-text font-display text-3xl text-white sm:text-4xl">Women&apos;s classes FAQ</h2>
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
        <h2 className="glow-text font-display text-3xl text-white sm:text-4xl">Register for free today</h2>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-[#F5E5C5]/90">
          Women get first call on new seats. Call the academy to check your eligibility and reserve your place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Btn href={TEL} solid>Call to register</Btn>
          <Btn href="/programs">Browse programs</Btn>
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
          <h3 className="font-display text-lg text-[#FFB020]">Women</h3>
          <ul className="mt-3 space-y-2 text-[#F5E5C5]/85">
            <li>Women-only batches</li>
            <li>Self-defence course</li>
            <li>Free starter kit</li>
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

export default function WomenPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsRow />
        <Benefits />
        <SelfDefence />
        <Journey />
        <Quote />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}