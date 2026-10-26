// app/about/page.tsx
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
    desc: "To teach Silambam the way it was handed down, keeping every stance, strike and footwork of the old arena intact for the next generation.",
  },
  {
    tag: "Our vision",
    title: "Warriors with character",
    desc: "A Padaivedu where children, women and grown men leave the training floor stronger in body, steadier in mind and prouder of their roots.",
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

// Edit with the academy's real milestones.
const TIMELINE = [
  { step: "Step 01", title: "The first batch", desc: "The academy opened its doors in Padaivedu with a small group of dedicated students." },
  { step: "Step 02", title: "Growing the family", desc: "Word spread across the district, and families began sending their children to train." },
  { step: "Step 03", title: "Women join the arena", desc: "Dedicated batches and self-defence classes welcomed women onto the training floor." },
  { step: "Step 04", title: "Proud on the podium", desc: "Students brought home district, state and national titles for their hard work." },
];

// Palette (dark, matching the reference): deep brown base, glowing gold headings,
// orange numerals and accents, cream body text.
const pageStyles = `
  @keyframes spin-slow { to { transform: rotate(360deg); } }
  @keyframes spin-reverse { to { transform: rotate(-360deg); } }
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 40px rgba(255,160,40,0.35), inset 0 0 30px rgba(255,200,60,0.08); }
    50% { box-shadow: 0 0 100px rgba(255,160,40,0.7), inset 0 0 50px rgba(255,200,60,0.2); }
  }
  @keyframes float-logo {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes sweep {
    0% { transform: translateX(-120%) skewX(-18deg); }
    60%, 100% { transform: translateX(260%) skewX(-18deg); }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.15; transform: scale(0.6); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes drift {
    0% { transform: translateY(0); }
    100% { transform: translateY(-40px); }
  }
  @keyframes page-glow {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.7; }
  }
  @keyframes title-glow {
    0%, 100% { text-shadow: 0 0 18px rgba(255,190,60,0.35); }
    50% { text-shadow: 0 0 34px rgba(255,190,60,0.7); }
  }
  @keyframes cta-card-glow {
    0%, 100% { box-shadow: 0 0 40px rgba(255,160,40,0.2), inset 0 0 40px rgba(255,160,40,0.05); }
    50% { box-shadow: 0 0 90px rgba(255,160,40,0.45), inset 0 0 60px rgba(255,160,40,0.12); }
  }
  @keyframes rays-breathe {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.65; }
  }
  @keyframes footer-glow {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 0.85; }
  }
  @keyframes footer-rays-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.9; }
  }
  @media (prefers-reduced-motion: reduce) {
    .anim { animation: none !important; }
  }
`;

// Deterministic sparkle positions so server and client render the same markup.
const SPARKLES = Array.from({ length: 60 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.37) % 6,
  duration: 3 + (i % 5),
  color: i % 3 === 0 ? "#FFD84D" : i % 3 === 1 ? "#FFA332" : "#F2C94C",
}));

// Full-page sparkle layer, behind all content.
function PageSparkles() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="anim absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,140,30,0.22),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(255,200,60,0.12),transparent_50%)]"
        style={{ animation: "page-glow 8s ease-in-out infinite" }}
      />
      <div
        className="anim absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFD84D]/10 to-transparent"
        style={{ animation: "sweep 14s ease-in-out infinite" }}
      />
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="anim absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 4}px ${s.color}`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite, drift ${s.duration * 3}s linear infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ---------- Small pieces ----------
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
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
  "border border-[#FFA332] bg-gradient-to-r from-[#FF7A18] to-[#FFC93C] text-[#1C0E02] shadow-[0_0_28px_rgba(255,150,40,0.5)] hover:from-[#FF8F3A] hover:to-[#FFD84D]";

function Btn({ href, children, solid }: { href: string; children: ReactNode; solid?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-md px-6 py-3 font-semibold uppercase tracking-[0.12em] transition-all active:scale-95 ${
        solid ? SOLID_BTN : "border border-[#FFC93C]/70 text-[#FFD84D] hover:bg-[#FFC93C]/10"
      }`}
    >
      {children}
    </Link>
  );
}

function GoldText({ children }: { children: ReactNode }) {
  return (
    <span
      className="bg-gradient-to-r from-[#D98A12] via-[#FFD84D] to-[#E8A317] bg-clip-text text-transparent"
      style={{ animation: "title-glow 4s ease-in-out infinite" }}
    >
      {children}
    </span>
  );
}

// variant "badge": small round logo for nav/footer.
// variant "hero": cropped to a circle so the square black background disappears.
// Falls back to a Tamil letter if /logo.jpeg is missing.
function Logo({ size = 40, variant = "badge" }: { size?: number; variant?: "badge" | "hero" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-label={`${SITE.name} logo`}
        className="flex shrink-0 items-center justify-center rounded-full border border-[#FFC93C]/70 bg-[#0B0603] font-display text-[#FFD84D]"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        வி
      </span>
    );
  }

  if (variant === "hero") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <Image
          src="/logo.jpeg"
          alt={`${SITE.name} logo`}
          fill
          sizes="300px"
          onError={() => setFailed(true)}
          className="scale-[1.18] object-cover"
        />
      </div>
    );
  }

  return (
    <Image
      src="/logo.jpeg"
      alt={`${SITE.name} logo`}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className="shrink-0 rounded-full border border-[#FFC93C]/70 bg-[#0B0603] object-cover"
      style={{ width: size, height: size }}
    />
  );
}

// ---------- Nav ----------
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#FFC93C]/25 bg-[#1A0A03]/80 pt-[env(safe-area-inset-top)] backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3" aria-label="Main">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Logo />
          <span className="truncate font-display text-lg text-[#FFD84D]">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV.map(([l, h]) => (
            <li key={h}>
              <Link
                href={h}
                className={`block rounded-md px-3 py-2 text-sm transition hover:text-[#FFC93C] ${
                  l === "About" ? "text-[#FFC93C]" : "text-[#FFF1C7]/85"
                }`}
              >
                {l}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <Link
              href="/#join"
              className="block rounded-md bg-gradient-to-r from-[#FF7A18] to-[#FFC93C] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#1C0E02] hover:from-[#FF8F3A] hover:to-[#FFD84D]"
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
                <Link
                  href={h}
                  className="block rounded-md px-3 py-2.5 text-[#FFF1C7]/90 hover:bg-[#FFC93C]/10 hover:text-[#FFC93C]"
                >
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
const EMBLEM_GLINTS = [
  { angle: 35, delay: 0 },
  { angle: 215, delay: 5.0 },
];

function Hero() {
  return (
    <section className="relative z-10 flex min-h-[90vh] items-center pt-28">
      <style>{`
        @keyframes emb-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes emb-streak {
          0%, 100% { opacity: 0; }
          15% { opacity: 1; }
          40% { opacity: 0.4; }
          60% { opacity: 0; }
        }
        @keyframes emb-head {
          0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .emb-anim { animation: none !important; }
        }
      `}</style>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        {/* Left: text */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FFC93C]">
              <span className="h-px w-10 bg-[#FFC93C]/70" />
              Our heritage
            </span>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="mt-6 font-display text-5xl leading-[1.1] text-[#FFF1C7] sm:text-6xl lg:text-7xl">
              About <GoldText>Padaivedu</GoldText>
              <span className="block">
                <GoldText>Yudhakalam</GoldText>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={250}>
            <div className="my-8 h-[3px] w-20 bg-gradient-to-r from-[#FF7A18] to-transparent" />
          </Reveal>

          <Reveal delay={350}>
            <p className="max-w-xl text-lg leading-8 text-[#FFF1C7]/90">
              Preserving and teaching the ancient Tamil martial art of Silambam — footwork, timing and the
              long bamboo staff, carried forward on our training floor today.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Btn href="/#training" solid>Explore training</Btn>
              <Btn href="/#join">Join the academy</Btn>
            </div>
          </Reveal>
        </div>

        {/* Right: logo emblem */}
        <Reveal delay={300} className="relative mx-auto aspect-square w-full max-w-[520px]">
          <span
            aria-hidden
            className="emb-anim absolute inset-0 rounded-full border border-dashed border-[#FFC93C]/45"
            style={{ animation: "spin-slow 60s linear infinite" }}
          />
          <span
            aria-hidden
            className="emb-anim absolute inset-[9%] rounded-full border border-[#FF9F1C]/30"
            style={{ animation: "spin-reverse 45s linear infinite" }}
          />

          {/* Light streaks that orbit the outer ring, each with a bright head */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {EMBLEM_GLINTS.map((g, i) => (
              <div
                key={i}
                className="emb-anim absolute inset-0 rounded-full"
                style={{
                  transform: `rotate(${g.angle}deg)`,
                  animation: `emb-orbit 10s linear ${g.delay}s infinite`,
                }}
              >
                {/* Tail: a thin streak that fades in and out */}
                <span
                  className="emb-anim absolute left-0 top-1/2 h-[2px] w-[22%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FFD84D] to-[#FFE27A] shadow-[0_0_12px_#FFD84D]"
                  style={{ animation: "emb-streak 4s ease-in-out infinite" }}
                />
                {/* Head: bright glint at the end of the streak */}
                <span
                  className="emb-anim absolute left-0 top-1/2 h-3 w-3 rounded-full bg-[#FFE27A] shadow-[0_0_18px_6px_rgba(255,190,60,0.8)]"
                  style={{ animation: "emb-head 2s ease-in-out infinite", transform: "translate(-50%, -50%)" }}
                />
              </div>
            ))}
          </div>

          <div
            className="anim absolute inset-[18%] rounded-full border-2 border-[#FFC93C] bg-[#1A0A03]"
            style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
          >
            <div
              aria-hidden
              className="anim absolute inset-[-14%] rounded-full opacity-80 [mask-image:radial-gradient(circle,transparent_58%,black_62%,black_78%,transparent_84%)]"
              style={{
                backgroundImage: "radial-gradient(circle, #FFD84D 1.2px, transparent 1.8px)",
                backgroundSize: "9px 9px",
                animation: "spin-slow 90s linear infinite",
              }}
            />

            <div className="anim absolute inset-[8%] z-10" style={{ animation: "float-logo 6s ease-in-out infinite" }}>
              <Logo variant="hero" />
            </div>

            <div aria-hidden className="pointer-events-none absolute inset-[8%] z-20 overflow-hidden rounded-full">
              <span
                className="anim absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFD84D]/35 to-transparent"
                style={{ animation: "sweep 7s ease-in-out infinite" }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
// ---------- Stats ----------
function StatsRow() {
  return (
    <section className="relative z-10 border-y border-[#FFC93C]/25 bg-[#1A0A03]/70 py-12 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 text-center md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 120}>
            <p className="font-display text-4xl text-[#FFD84D] sm:text-5xl">{s.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFF1C7]/75">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- Mission ----------
function Mission() {
  return (
    <section className="relative z-10 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
        {MISSION.map((m, i) => (
          <Reveal key={m.title} delay={i * 180}>
            <article className="h-full rounded-2xl border border-[#FFC93C]/30 bg-gradient-to-br from-[#4A2508]/80 to-[#1A0A03]/90 p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FF9F1C]">{m.tag}</p>
              <h3 className="mt-3 font-display text-3xl text-[#FFD84D]">{m.title}</h3>
              <div className="my-5 h-px w-16 bg-gradient-to-r from-[#FF9F1C] to-transparent" />
              <p className="leading-8 text-[#FFF1C7]/85">{m.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- Values ----------
// Numbered list styled like the reference: orange numerals, gold titles, thin gold dividers.
function Values() {
  return (
    <section className="relative z-10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9F1C]">What we stand for</p>
          <h2 className="font-display text-4xl text-[#FFF1C7] sm:text-5xl">
            Six values of the <GoldText>arena</GoldText>
          </h2>
        </Reveal>

        <ol className="mx-auto mt-14 max-w-4xl">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 120}>
              <li className="group grid grid-cols-[3.5rem_1fr] gap-4 border-b border-[#FFC93C]/25 py-7 first:border-t sm:grid-cols-[5rem_1fr] sm:gap-6">
                <span className="font-display text-3xl text-[#FF9F1C] transition-colors group-hover:text-[#FFD84D]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-[0.06em] text-[#FFC93C]">{v.title}</h3>
                  <p className="mt-2 leading-7 text-[#FFF1C7]/85">{v.desc}</p>
                </div>
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
    <section className="relative z-10 py-20">
      <Reveal className="relative z-10 mx-auto max-w-3xl px-5 text-center">
        <span className="font-display text-6xl leading-none text-[#FF9F1C]/60">“</span>
        <p lang="ta" className="-mt-4 text-2xl font-semibold text-[#FFD84D] sm:text-3xl">
          வீரம் பயிற்சியில் பிறக்கும்
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#FFF1C7]/65">Courage is born in practice</p>
      </Reveal>
    </section>
  );
}

// ---------- Timeline ----------
function Timeline() {
  return (
    <section className="relative z-10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9F1C]">Our journey</p>
          <h2 className="font-display text-4xl text-[#FFF1C7] sm:text-5xl">
            Building the <GoldText>legacy</GoldText>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <span aria-hidden className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#FFD84D] via-[#FF9F1C] to-transparent md:left-1/2" />
          <ol className="space-y-12">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.title} delay={i * 150}>
                <li className={`relative pl-12 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <span
                    aria-hidden
                    className={`absolute left-2.5 top-1.5 h-3 w-3 rounded-full bg-[#FFD84D] shadow-[0_0_14px_#FF9F1C] md:top-2 ${
                      i % 2 ? "md:-left-[6px]" : "md:-right-[6px]"
                    }`}
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FF9F1C]">{t.step}</p>
                  <h3 className="mt-2 font-display text-2xl text-[#FFD84D]">{t.title}</h3>
                  <p className="mt-2 leading-7 text-[#FFF1C7]/80">{t.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA: sunburst card with orbit glints ----------
const CTA_SPARKS = [
  { left: "10%", top: "20%", size: 4, delay: 0 },
  { left: "22%", top: "74%", size: 3, delay: 1.2 },
  { left: "36%", top: "12%", size: 3, delay: 0.6 },
  { left: "64%", top: "86%", size: 3, delay: 1.8 },
  { left: "80%", top: "16%", size: 4, delay: 0.9 },
  { left: "90%", top: "68%", size: 3, delay: 2.2 },
];

function CTA() {
  return (
    <section id="join" className="relative z-10 overflow-hidden px-5 py-24">
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
          0%, 100% { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes cta-shimmer {
          to { background-position: 200% center; }
        }
        @keyframes cta-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes cta-sweep {
          0% { transform: translateX(-120%) skewX(-18deg); }
          60%, 100% { transform: translateX(260%) skewX(-18deg); }
        }
        @keyframes cta-card-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(255,160,40,0.2), inset 0 0 40px rgba(255,160,40,0.05); }
          50% { box-shadow: 0 0 90px rgba(255,160,40,0.45), inset 0 0 60px rgba(255,160,40,0.12); }
        }

        .cta-gold {
          background: linear-gradient(90deg, #FF9A1F, #FFE27A, #FF7A18, #FFE27A, #FF9A1F);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: cta-shimmer 5s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-anim, .cta-gold { animation: none !important; }
        }
      `}</style>

      {/* Sunburst, breathing glow, dashed ring and orbiting glints */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="cta-anim absolute left-1/2 top-1/2 h-[1000px] w-[1000px] max-w-none rounded-full [mask-image:radial-gradient(circle,transparent_15%,black_40%,transparent_70%)]"
          style={{
            background: "repeating-conic-gradient(from 8deg at 50% 50%, rgba(255,190,60,0.35) 0deg 2deg, transparent 2deg 14deg)",
            animation: "cta-rays 80s linear infinite",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          className="cta-anim absolute left-1/2 top-1/2 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,226,122,0.4)_0%,rgba(255,150,30,0.2)_40%,transparent_70%)] blur-2xl"
          style={{ animation: "cta-breathe 6s ease-in-out infinite", transform: "translate(-50%, -50%)" }}
        />

        <div
          className="cta-anim absolute left-1/2 top-1/2 h-[620px] w-[620px] rounded-full border border-dashed border-[#FFC93C]/25"
          style={{ animation: "cta-ring 60s linear infinite", transform: "translate(-50%, -50%)" }}
        />

        <div
          className="cta-anim absolute left-1/2 top-1/2 h-[620px] w-[620px] rounded-full"
          style={{ animation: "cta-orbit 9s linear infinite", transform: "translate(-50%, -50%)" }}
        >
          <span className="absolute left-0 top-1/2 h-24 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#FFD84D] to-transparent" />
          <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE27A] shadow-[0_0_18px_6px_rgba(255,190,60,0.8)]" />
          <span className="absolute right-0 top-1/2 h-24 w-[2px] translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#FFD84D] to-transparent" />
          <span className="absolute right-0 top-1/2 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE27A] shadow-[0_0_18px_6px_rgba(255,190,60,0.8)]" />
        </div>
      </div>

      {/* Twinkling sparkles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {CTA_SPARKS.map((s, i) => (
          <span
            key={i}
            className="cta-anim absolute rounded-full bg-[#FFD84D]"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              boxShadow: `0 0 ${s.size * 4}px #FFB020`,
              animation: `cta-twinkle 4s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <Reveal className="relative z-10 mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-[#FFA332]/50 bg-[#1A0A03]/85 p-8 text-center backdrop-blur-md sm:p-12">
          {/* Pulsing inner glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ animation: "cta-card-glow 4s ease-in-out infinite" }}
          />

          {/* Sheen sweep across the card */}
          <span
            aria-hidden
            className="cta-anim pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFD84D]/15 to-transparent"
            style={{ animation: "cta-sweep 7s ease-in-out infinite" }}
          />

          <div className="relative">
            <h2 className="font-display text-3xl uppercase tracking-[0.04em] text-[#FFF1C7] sm:text-5xl">
              Walk the <span className="cta-gold">Warrior&apos;s Path</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#FFF1C7]/85">
              Join students of every age learning the ancient art of Silambam.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Btn href={TEL} solid>Enroll now</Btn>
              <Btn href="/#training">Browse programs</Btn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

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
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A18] to-[#FFC93C] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#1C0E02] shadow-lg shadow-black/50 active:scale-95 sm:bottom-5 sm:right-5"
    >
      <span aria-hidden>📞</span> Enroll Today
    </a>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,#4A2508_0%,#2A1205_40%,#1A0A03_100%)]">
      <style>{pageStyles}</style>
      <PageSparkles />
      <Nav />
      <main className="relative z-10">
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
    </div>
  );
}