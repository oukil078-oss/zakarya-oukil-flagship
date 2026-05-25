"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Command,
  Download,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Phone,
  Radar,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { apiBaseUrl, cn } from "@/lib/utils";
import { certificates, heroNumbers, personas, profile, projects, services, socialLinks, testimonials, timeline, toolbelt, type Persona, type PersonaId } from "@/lib/content";

const navItems = [
  { label: "Hero", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PortfolioExperience() {
  const [activeId, setActiveId] = useState<PersonaId>("ux");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const active = personas.find((p) => p.id === activeId) ?? personas[1];

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 1100);
    return () => window.clearTimeout(t);
  }, []);

  const styleVars = {
    "--accent": active.accent,
    "--accent-2": active.accent2,
    "--accent-rgb": active.rgb,
  } as React.CSSProperties;

  return (
    <main style={styleVars} className="relative min-h-screen overflow-hidden bg-ink text-white">
      <AnimatePresence>{!loaded && <LoadingScreen active={active} />}</AnimatePresence>
      <PremiumCursor />
      <div className="pointer-events-none fixed inset-0 z-0 grid-bg" />
      <div className="pointer-events-none fixed left-[-12rem] top-[15vh] h-[34rem] w-[34rem] rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-16rem] right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-[color:var(--accent-2)]/10 blur-3xl" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero active={active} setActiveId={setActiveId} />
      <About active={active} setActiveId={setActiveId} />
      <Skills active={active} />
      <Experience />
      <Projects activeId={active.id} />
      <Services />
      <SocialProof />
      <Resume />
      <Contact />
      <Footer />
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <span className="font-display text-xl font-bold">Zakarya<span className="text-[color:var(--accent)]">.</span></span>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="rounded-full border border-white/15 p-2"><X /></button>
            </div>
            <nav className="grid gap-3 p-6">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="panel flex items-center justify-between rounded-2xl p-5 font-display text-2xl">
                  {item.label}<ChevronRight className="text-[color:var(--accent)]" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function LoadingScreen({ active }: { active: Persona }) {
  return (
    <motion.div exit={{ opacity: 0, filter: "blur(16px)" }} transition={{ duration: 0.65 }} className="fixed inset-0 z-[100] grid place-items-center bg-ink">
      <div className="grid place-items-center text-center">
        <motion.div initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.55, ease }} className="relative mb-7 grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-white/5">
          <Radar className="h-10 w-10 text-[color:var(--accent)]" />
          <div className="absolute inset-[-12px] rounded-full border border-[color:var(--accent)]/40 animate-ping" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs uppercase tracking-[.55em] text-white/50">Booting portfolio interface</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .14 }} className="mt-3 font-display text-3xl font-bold">{active.label} skin loaded</motion.h1>
        <div className="mt-7 h-1 w-72 overflow-hidden rounded-full bg-white/10">
          <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: .95, ease }} className="h-full rounded-full bg-[color:var(--accent)]" />
        </div>
      </div>
    </motion.div>
  );
}

function PremiumCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.4 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div aria-hidden style={{ x: springX, y: springY }} className="pointer-events-none fixed z-[90] hidden h-8 w-8 rounded-full border border-[color:var(--accent)]/70 bg-[color:var(--accent)]/10 mix-blend-screen shadow-[0_0_30px_var(--accent)] lg:block" />;
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7, ease }} className={cn("fixed inset-x-0 top-0 z-40 transition-all duration-500", scrolled ? "border-b border-white/10 bg-ink/70 shadow-2xl backdrop-blur-2xl" : "bg-transparent")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 font-display font-bold text-[color:var(--accent)] shadow-glow">ZO</span>
          <span className="font-display text-lg font-semibold tracking-tight">Zakarya Oukil</span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.045] p-1 backdrop-blur-xl lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-white/68 transition hover:bg-white/10 hover:text-white">{item.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden rounded-full border border-[color:var(--accent)]/35 bg-[color:var(--accent)]/10 px-4 py-2 font-mono text-xs uppercase tracking-[.18em] text-white transition hover:bg-[color:var(--accent)] hover:text-black sm:inline-flex">Hire signal</a>
          <button aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="rounded-full border border-white/15 bg-white/5 p-2 lg:hidden"><Menu /></button>
        </div>
      </div>
    </motion.header>
  );
}

function Hero({ active, setActiveId }: { active: Persona; setActiveId: (id: PersonaId) => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-9, 9]);

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section id="home" onMouseMove={handleMove} className="relative isolate min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="absolute inset-x-0 top-24 mx-auto h-80 max-w-5xl rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_70%)] blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[.78fr_1.15fr_.8fr]">
        <motion.aside initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, ease }} className="order-2 grid gap-3 lg:order-1">
          <div className="mb-1 flex items-center gap-3 font-mono text-xs uppercase tracking-[.32em] text-white/55">
            <Command className="h-4 w-4 text-[color:var(--accent)]" /> Identity classes
          </div>
          {personas.map((persona) => (
            <button key={persona.id} onClick={() => setActiveId(persona.id)} className={cn("group panel-hard sci-corners relative overflow-hidden rounded-2xl p-3 text-left transition duration-500 hover:-translate-y-1", active.id === persona.id ? "border-[color:var(--accent)]/70 bg-white/12" : "hover:border-white/28")}> 
              <div className="absolute inset-y-0 left-0 w-1 bg-[color:var(--accent)] opacity-0 transition group-hover:opacity-100" />
              <div className="flex gap-3">
                <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/12 bg-black/30">
                  <MiniHelmet persona={persona} active={active.id === persona.id} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold leading-tight">{persona.label}</h3>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/60">{persona.rank}</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[.18em] text-[color:var(--accent)]">{persona.classCode}</p>
                  <p className="mt-2 line-clamp-2 text-xs text-white/55">{persona.summary}</p>
                </div>
              </div>
            </button>
          ))}
          <a href="#projects" className="panel mt-3 flex items-center justify-between rounded-2xl p-5 transition hover:border-[color:var(--accent)]/60 hover:bg-white/10">
            <span className="font-mono text-xs uppercase tracking-[.25em] text-white/70">View mission archive</span>
            <ArrowRight className="text-[color:var(--accent)]" />
          </a>
        </motion.aside>

        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} initial={{ opacity: 0, scale: .92, y: 35 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .85, ease }} className="order-1 lg:order-2">
          <PortraitRig active={active} />
        </motion.div>

        <motion.aside initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, ease }} className="order-3 space-y-4">
          <div className="panel sci-corners rounded-3xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[.35em] text-white/50">Active profile</p>
                <h1 className="mt-3 font-display text-5xl font-bold leading-none sm:text-6xl">{active.level}</h1>
                <p className="mt-1 inline-flex bg-white px-2 py-1 font-mono text-xs uppercase tracking-[.28em] text-black">Level</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold">{active.label}</p>
                <p className="mt-1 text-sm text-white/55">Class {active.rank}</p>
              </div>
            </div>
            <div className="mt-7 space-y-4">
              {active.stats.map((stat) => <StatBar key={stat.label} stat={stat} />)}
            </div>
          </div>
          <div className="panel rounded-3xl p-6">
            <p className="font-mono text-xs uppercase tracking-[.3em] text-white/50">Skill modules</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {active.loadout.map(({ icon: Icon, label }) => (
                <div key={label} className="group grid aspect-square place-items-center rounded-2xl border border-white/12 bg-white/[.06] text-center transition hover:border-[color:var(--accent)]/60 hover:bg-[color:var(--accent)]/10">
                  <Icon className="h-6 w-6 text-[color:var(--accent)] transition group-hover:scale-110" />
                  <span className="mt-1 block px-1 text-[10px] leading-tight text-white/50">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .75, ease }} className="mx-auto mt-10 max-w-7xl">
        <div className="panel relative overflow-hidden rounded-[2rem] p-5 sm:p-7 lg:p-8">
          <div className="absolute inset-y-0 left-0 w-1 bg-[color:var(--accent)]" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.45em] text-[color:var(--accent)]">{profile.location}</p>
              <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[.95] text-gradient sm:text-6xl lg:text-7xl">Zakarya Oukil is a {active.label.toLowerCase()} with a technical edge.</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{active.headline} {active.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-[color:var(--accent)]">View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-white transition hover:border-[color:var(--accent)] hover:bg-white/10"><Mail className="h-4 w-4" /> Contact Me</a>
                <a href="/Zakarya-Oukil-CV.pdf" download className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-white/80 transition hover:border-[color:var(--accent)] hover:text-white"><Download className="h-4 w-4" /> Download CV</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {heroNumbers.map((item) => <Metric key={item.label} {...item} />)}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function PortraitRig({ active }: { active: Persona }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={cn("portrait-card group relative mx-auto aspect-[.78] w-full max-w-[34rem] overflow-hidden rounded-[2.2rem] border border-white/15 bg-black/40 shadow-metal", revealed && "is-revealed")} onClick={() => setRevealed((v) => !v)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.06),rgba(0,0,0,.9))]" />
      <div className="absolute inset-x-10 top-10 h-64 rounded-full bg-[color:var(--accent)]/15 blur-3xl" />
      <img className="portrait-real absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700" src={active.photo} alt="Professional placeholder portrait for Zakarya Oukil" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      <motion.div key={active.id} initial={{ opacity: 0, scale: 1.05, filter: "blur(14px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: .55, ease }} className={cn("reveal-mask mask-shell absolute inset-x-[13%] top-[8%] h-[52%] transition duration-700", active.mask.geometry)}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.92),rgba(255,255,255,.28)_45%,rgba(255,255,255,.08))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_10%,white,transparent_20%),linear-gradient(90deg,rgba(0,0,0,.42),transparent,rgba(0,0,0,.55))]" />
        <div className="absolute left-[12%] top-[35%] h-[12%] w-[25%] -skew-x-12 rounded-sm bg-black/85 shadow-[0_0_28px_var(--accent)]" />
        <div className="absolute right-[12%] top-[35%] h-[12%] w-[25%] skew-x-12 rounded-sm bg-black/85 shadow-[0_0_28px_var(--accent)]" />
        <div className="visor absolute left-[18%] top-[39%] h-[4%] w-[16%] rounded-full bg-[color:var(--accent)] transition duration-500" />
        <div className="visor absolute right-[18%] top-[39%] h-[4%] w-[16%] rounded-full bg-[color:var(--accent)] transition duration-500" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/45" />
        <div className="absolute bottom-[8%] left-1/2 h-[18%] w-[32%] -translate-x-1/2 rounded-t-xl bg-black/80" />
        <div className="scanline" />
      </motion.div>
      <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/12 bg-black/55 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.3em] text-[color:var(--accent)]">{active.mask.title}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{profile.name}</h3>
            <p className="mt-1 text-sm text-white/55">Hover/tap helmet to reveal identity</p>
          </div>
          <MousePointer2 className="hidden h-6 w-6 text-white/40 sm:block" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/12" />
    </div>
  );
}

function MiniHelmet({ persona, active }: { persona: Persona; active: boolean }) {
  return (
    <div className="relative h-12 w-12">
      <div className={cn("mask-shell absolute inset-0 bg-white/75", persona.mask.geometry)} />
      <div className="absolute left-2 top-5 h-1.5 w-3 -skew-x-12 rounded bg-black" />
      <div className="absolute right-2 top-5 h-1.5 w-3 skew-x-12 rounded bg-black" />
      <div className={cn("absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2", active ? "bg-[color:var(--accent)]" : "bg-black/30")} />
      <div style={{ background: persona.accent }} className="absolute bottom-1 left-1/2 h-2 w-5 -translate-x-1/2 rounded" />
    </div>
  );
}

function StatBar({ stat }: { stat: { label: string; value: number; suffix?: string } }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[.18em]">
        <span className="text-white/65">{stat.label}</span>
        <span className="text-white">{stat.value}{stat.suffix ?? ""}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${stat.value}%` }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="h-full rounded-full bg-[color:var(--accent)] shadow-[0_0_20px_var(--accent)]" />
      </div>
    </div>
  );
}

function Metric({ label, value, suffix, prefix }: { label: string; value: number; suffix?: string; prefix?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/28 p-5">
      <p className="font-display text-4xl font-bold"><AnimatedNumber value={value} prefix={prefix} suffix={suffix} /></p>
      <p className="mt-2 text-sm text-white/52">{label}</p>
    </div>
  );
}

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 42;
    const tick = () => {
      frame += 1;
      setDisplay(Math.round(value * (1 - Math.pow(1 - frame / total, 3))));
      if (frame < total) requestAnimationFrame(tick);
    };
    tick();
  }, [value]);
  return <>{prefix}{display}{suffix}</>;
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65, ease }} className="mx-auto mb-10 max-w-3xl text-center">
      <p className="font-mono text-xs uppercase tracking-[.48em] text-[color:var(--accent)]">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-balance sm:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-lg leading-8 text-white/62">{body}</p>}
    </motion.div>
  );
}

function About({ active, setActiveId }: { active: Persona; setActiveId: (id: PersonaId) => void }) {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Profile / About" title="A designer's eye, a builder's discipline, a security-minded future." body="The core brand is intentionally hybrid: visual craft, product clarity and engineering depth working as one operating system." />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="panel sci-corners rounded-[2rem] p-7">
            <p className="text-lg leading-9 text-white/72">{profile.bio}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {personas.map((persona) => (
                <button key={persona.id} onClick={() => setActiveId(persona.id)} className={cn("rounded-2xl border p-4 text-left transition", active.id === persona.id ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10" : "border-white/10 bg-white/[.04] hover:bg-white/[.08]")}> 
                  <p className="font-display font-semibold">{persona.label}</p>
                  <p className="mt-2 text-xs text-white/50">{persona.strengths.slice(0, 2).join(" / ")}</p>
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
            {active.strengths.map((strength, index) => (
              <div key={strength} className="panel rounded-3xl p-6">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/35">0{index + 1}</span>
                  <Sparkles className="h-5 w-5 text-[color:var(--accent)]" />
                </div>
                <h3 className="font-display text-2xl font-bold">{strength}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">Focused execution with a premium finish, strong hierarchy and a practical path to launch.</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Skills({ active }: { active: Persona }) {
  const highlighted = useMemo(() => {
    const rules: Record<PersonaId, string[]> = { graphic: ["Design"], ux: ["Design", "Development"], dev: ["Development", "Backend", "Security", "AI"] };
    return rules[active.id];
  }, [active.id]);

  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Capabilities" title="A calibrated toolbelt for premium digital products." body="Skills are grouped like system modules, with the active persona raising the relevant channels." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {toolbelt.map((tool) => (
            <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cn("panel rounded-3xl p-5 transition", highlighted.includes(tool.group) && "border-[color:var(--accent)]/45 bg-[color:var(--accent)]/8")}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">{tool.name}</h3>
                <span className="font-mono text-xs text-white/45">{tool.group}</span>
              </div>
              <div className="mt-5">
                <StatBar stat={{ label: "Signal", value: tool.level }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Timeline" title="Experience mapped as a progression system." />
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[color:var(--accent)] via-white/20 to-transparent md:left-1/2" />
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.article key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className={cn("relative grid gap-4 pl-12 md:grid-cols-2 md:pl-0", index % 2 ? "md:text-left" : "md:text-right")}>
                <div className={cn(index % 2 ? "md:col-start-2 md:pl-12" : "md:pr-12")}>
                  <div className="panel rounded-3xl p-6">
                    <p className="font-mono text-xs uppercase tracking-[.3em] text-[color:var(--accent)]">{item.date}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/45">{item.company}</p>
                    <p className="mt-4 leading-7 text-white/62">{item.body}</p>
                    <div className={cn("mt-5 flex flex-wrap gap-2", index % 2 ? "" : "md:justify-end")}>
                      {item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/58">{tag}</span>)}
                    </div>
                  </div>
                </div>
                <div className="absolute left-[.58rem] top-7 h-7 w-7 rounded-full border border-[color:var(--accent)] bg-ink shadow-[0_0_24px_var(--accent)] md:left-1/2 md:-translate-x-1/2" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ activeId }: { activeId: PersonaId }) {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const ordered = useMemo(() => [...projects].sort((a, b) => Number(b.personas.includes(activeId)) - Number(a.personas.includes(activeId))), [activeId]);
  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Mission Archive" title="Selected projects with product-grade presentation." body="Cards reorder based on the selected identity, so the most relevant work rises to the surface." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((project) => (
            <motion.article key={project.slug} layout initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={cn("group panel-hard overflow-hidden rounded-[2rem] transition duration-500 hover:-translate-y-2 hover:border-[color:var(--accent)]/55", project.personas.includes(activeId) && "ring-1 ring-[color:var(--accent)]/35")}>
              <button onClick={() => setSelected(project)} className="block w-full text-left">
                <div className="relative aspect-[1.35] overflow-hidden bg-white/5">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[.2em] text-white/65 backdrop-blur">{project.category}</span>
                </div>
                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[.28em] text-[color:var(--accent)]">{project.highlight}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold">{project.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/58">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tag) => <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/55">{tag}</span>)}
                  </div>
                  <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[.2em] text-white/70">Open file <ArrowRight className="h-4 w-4 text-[color:var(--accent)] transition group-hover:translate-x-1" /></div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-xl" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, y: 30, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} className="panel max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[2] overflow-hidden rounded-t-[2rem]">
                <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
                <button aria-label="Close project" onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/55 p-2 backdrop-blur"><X /></button>
              </div>
              <div className="p-7 sm:p-9">
                <p className="font-mono text-xs uppercase tracking-[.3em] text-[color:var(--accent)]">{selected.category}</p>
                <h3 className="mt-3 font-display text-4xl font-bold">{selected.title}</h3>
                <p className="mt-4 text-lg leading-8 text-white/68">{selected.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">{selected.stack.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/60">{tag}</span>)}</div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={selected.live} target={selected.live.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-[color:var(--accent)]">Open link <ExternalLink className="h-4 w-4" /></a>
                  <a href={selected.source} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-white transition hover:bg-white/10"><Github className="h-4 w-4" /> Discuss source</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Services" title="What I can create for clients and teams." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel rounded-[2rem] p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10"><Icon className="h-6 w-6 text-[color:var(--accent)]" /></div>
              <h3 className="mt-6 font-display text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-white/58">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Signal Proof" title="Social proof and credibility modules." />
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="panel rounded-[2rem] p-6">
              <div className="mb-5 flex gap-1 text-[color:var(--accent)]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="leading-8 text-white/70">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div><p className="font-semibold">{t.name}</p><p className="text-sm text-white/45">{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="panel sci-corners overflow-hidden rounded-[2rem] p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.45em] text-[color:var(--accent)]">Resume / CV</p>
              <h2 className="mt-4 font-display text-4xl font-bold">Download the concise profile deck.</h2>
              <p className="mt-4 leading-8 text-white/62">The included PDF is a production placeholder with the current portfolio narrative. Replace it with the final CV at <code className="rounded bg-white/10 px-1">apps/web/public/Zakarya-Oukil-CV.pdf</code>.</p>
              <a href="/Zakarya-Oukil-CV.pdf" download className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-[color:var(--accent)]"><Download className="h-4 w-4" /> Download CV</a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {certificates.map((cert) => <div key={cert} className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><CheckCircle2 className="mb-3 h-5 w-5 text-[color:var(--accent)]" /><p className="font-medium">{cert}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Unable to send the message.");
      setStatus("success");
      setMessage("Message stored successfully. Zakarya will receive the signal.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Connection error. Please email directly.");
    }
  }

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Contact" title="Start a project signal." body="Use the production API-backed form, or reach out directly through email and social channels." />
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-4">
            <InfoCard icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <InfoCard icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
            <InfoCard icon={MapPin} label="Location" value={profile.location} />
            <div className="panel rounded-[2rem] p-6">
              <p className="font-mono text-xs uppercase tracking-[.3em] text-white/45">Social</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/62 transition hover:border-[color:var(--accent)] hover:text-white">{link.label}</a>)}
              </div>
            </div>
          </div>
          <form onSubmit={submit} className="panel sci-corners rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Name" placeholder="Your name" required />
              <Field name="email" label="Email" placeholder="you@example.com" type="email" required />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field name="subject" label="Subject" placeholder="Project inquiry" required />
              <label className="grid gap-2 text-sm font-medium text-white/70">Type
                <select name="type" className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-[color:var(--accent)]">
                  <option>Website / App</option><option>UI/UX Design</option><option>Brand Identity</option><option>AI / Cybersecurity</option><option>Mentorship</option>
                </select>
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-medium text-white/70">Message
              <textarea name="message" rows={6} placeholder="Tell me about your project, timeline and goals..." required className="resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-[color:var(--accent)]" />
            </label>
            <button disabled={status === "sending"} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-[color:var(--accent)] disabled:cursor-wait disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Send message"}<Send className="h-4 w-4" />
            </button>
            {message && <p className={cn("mt-4 text-sm", status === "success" ? "text-green-300" : "text-red-300")}>{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, type = "text", required }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-medium text-white/70">{label}<input name={name} type={type} placeholder={placeholder} required={required} className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-[color:var(--accent)]" /></label>;
}

function InfoCard({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const content = <><div className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/10"><Icon className="h-5 w-5 text-[color:var(--accent)]" /></div><div><p className="font-mono text-xs uppercase tracking-[.25em] text-white/40">{label}</p><p className="mt-1 font-medium">{value}</p></div></>;
  return href ? <a href={href} className="panel flex items-center gap-4 rounded-[2rem] p-5 transition hover:border-[color:var(--accent)]/55">{content}</a> : <div className="panel flex items-center gap-4 rounded-[2rem] p-5">{content}</div>;
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm text-white/45 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Zakarya Oukil. Handcrafted cinematic portfolio system.</p>
        <div className="flex items-center gap-4">
          <a href="#home" className="hover:text-white">Back to top</a>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
