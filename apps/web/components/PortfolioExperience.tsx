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
  const [bootComplete, setBootComplete] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const active = personas.find((p) => p.id === activeId) ?? personas[1];
  const loaded = bootComplete && assetsReady;

  useEffect(() => {
    const t = window.setTimeout(() => setBootComplete(true), 850);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const preload = personas.map((persona) => new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = persona.photo;
    }));

    Promise.all(preload).then(() => {
      if (!cancelled) setAssetsReady(true);
    });

    return () => {
      cancelled = true;
    };
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
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5.5, 5.5]);
  const cameraZ = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section id="home" onMouseMove={handleMove} className="relative isolate min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <motion.div
        aria-hidden
        key={active.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease }}
        className="absolute inset-x-0 top-20 mx-auto h-[32rem] max-w-6xl rounded-full bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_68%)] blur-3xl"
      />
      <div className="absolute inset-x-0 top-24 mx-auto hidden h-px max-w-7xl bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-5 lg:grid-cols-[minmax(16rem,.78fr)_minmax(28rem,1.18fr)_minmax(17rem,.82fr)]">
        <motion.aside initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, ease }} className="order-2 grid gap-3 lg:order-1">
          <div className="mb-1 flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[.32em] text-white/55">
            <span className="flex items-center gap-3"><Command className="h-4 w-4 text-[color:var(--accent)]" /> Identity classes</span>
            <span className="hidden text-white/28 sm:inline">S — A</span>
          </div>
          {personas.map((persona, index) => (
            <PersonaSelectorCard
              key={persona.id}
              persona={persona}
              active={active.id === persona.id}
              index={index}
              onSelect={() => setActiveId(persona.id)}
            />
          ))}
          <a href="#projects" className="panel mt-3 flex h-[4.75rem] items-center justify-between rounded-2xl p-5 transition duration-500 hover:border-[color:var(--accent)]/60 hover:bg-white/10">
            <span className="font-mono text-xs uppercase tracking-[.25em] text-white/70">View mission archive</span>
            <ArrowRight className="text-[color:var(--accent)]" />
          </a>
        </motion.aside>

        <motion.div
          style={{ rotateX, rotateY, y: cameraZ, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="order-1 lg:order-2"
        >
          <PortraitRig active={active} />
        </motion.div>

        <motion.aside initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, ease }} className="order-3 space-y-4">
          <PersonaStatPanel active={active} />
          <div className="panel rounded-3xl p-6">
            <p className="font-mono text-xs uppercase tracking-[.3em] text-white/50">Skill modules</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.42, ease }}
                className="mt-4 grid grid-cols-3 gap-3"
              >
                {active.loadout.map(({ icon: Icon, label }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.045, duration: 0.38, ease }}
                    className="group grid aspect-square place-items-center rounded-2xl border border-white/12 bg-white/[.06] text-center transition duration-300 hover:border-[color:var(--accent)]/60 hover:bg-[color:var(--accent)]/10"
                  >
                    <Icon className="h-6 w-6 text-[color:var(--accent)] transition duration-300 group-hover:scale-110" />
                    <span className="mt-1 block px-1 text-[10px] leading-tight text-white/50">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.aside>
      </div>

      <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.75, ease }} className="mx-auto mt-10 max-w-7xl">
        <div className="panel relative overflow-hidden rounded-[2rem] p-5 sm:p-7 lg:p-8">
          <motion.div layoutId="hero-accent-rail" className="absolute inset-y-0 left-0 w-1 bg-[color:var(--accent)]" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
                transition={{ duration: 0.48, ease }}
              >
                <p className="font-mono text-xs uppercase tracking-[.45em] text-[color:var(--accent)]">{profile.location}</p>
                <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[.95] text-gradient sm:text-6xl lg:text-7xl">Zakarya Oukil is a {active.label.toLowerCase()} with a technical edge.</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{active.headline} {active.summary}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition duration-300 hover:bg-[color:var(--accent)]">View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-white transition duration-300 hover:border-[color:var(--accent)] hover:bg-white/10"><Mail className="h-4 w-4" /> Contact Me</a>
                  <a href="/Zakarya-Oukil-CV.pdf" download className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-white/80 transition duration-300 hover:border-[color:var(--accent)] hover:text-white"><Download className="h-4 w-4" /> Download CV</a>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-3">
              {heroNumbers.map((item) => <Metric key={item.label} {...item} />)}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function PersonaSelectorCard({ persona, active, index, onSelect }: { persona: Persona; active: boolean; index: number; onSelect: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -22 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 + index * 0.055, duration: 0.5, ease }}
      onClick={onSelect}
      aria-pressed={active}
      style={{ "--persona-accent": persona.accent } as React.CSSProperties}
      className={cn(
        "group panel-hard sci-corners relative h-[6.15rem] overflow-hidden rounded-2xl p-3 text-left transition duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--persona-accent)]/70",
        active ? "border-[color:var(--persona-accent)]/75 bg-white/12 shadow-[0_0_42px_color-mix(in_srgb,var(--persona-accent)_18%,transparent)]" : "hover:border-white/28",
      )}
    >
      <motion.div
        layout
        className="absolute inset-y-0 left-0 w-1 bg-[color:var(--persona-accent)]"
        animate={{ opacity: active ? 1 : 0.18, scaleY: active ? 1 : 0.58 }}
        transition={{ duration: 0.42, ease }}
      />
      <motion.div
        aria-hidden
        className="absolute right-3 top-3 h-16 w-16 rounded-full blur-2xl"
        style={{ background: persona.accent }}
        animate={{ opacity: active ? 0.22 : 0.04, scale: active ? 1 : 0.75 }}
        transition={{ duration: 0.5, ease }}
      />
      <div className="relative flex h-full items-center gap-3">
        <div className="grid h-[4.55rem] w-[4.55rem] shrink-0 place-items-center overflow-hidden rounded-xl border border-white/12 bg-black/35">
          <MiniHelmet persona={persona} active={active} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold leading-tight text-white">{persona.label}</h3>
            <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/60">{persona.rank}</span>
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[.18em] text-[color:var(--persona-accent)]">{persona.classCode}</p>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/55">{persona.summary}</p>
        </div>
      </div>
    </motion.button>
  );
}

function PersonaStatPanel({ active }: { active: Persona }) {
  return (
    <div className="panel sci-corners overflow-hidden rounded-3xl p-6">
      <div className="absolute right-0 top-0 h-24 w-24 bg-[color:var(--accent)]/10 blur-2xl" />
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease }}
          className="relative"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.35em] text-white/50">Active profile</p>
              <h1 className="mt-3 font-display text-5xl font-bold leading-none sm:text-6xl"><AnimatedNumber value={active.level} /></h1>
              <p className="mt-1 inline-flex bg-white px-2 py-1 font-mono text-xs uppercase tracking-[.28em] text-black">Level</p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl font-bold">{active.label}</p>
              <p className="mt-1 text-sm text-white/55">Class {active.rank}</p>
            </div>
          </div>
          <div className="mt-7 space-y-4">
            {active.stats.map((stat, index) => <StatBar key={`${active.id}-${stat.label}`} stat={stat} delay={index * 0.055} />)}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PortraitRig({ active }: { active: Persona }) {
  const [hoverReveal, setHoverReveal] = useState(false);
  const [tapReveal, setTapReveal] = useState(false);
  const revealed = hoverReveal || tapReveal;

  useEffect(() => {
    setTapReveal(false);
    setHoverReveal(false);
  }, [active.id]);

  return (
    <motion.div
      className={cn("portrait-card group relative mx-auto aspect-[.78] w-full max-w-[34rem] overflow-hidden rounded-[2.2rem] border border-white/15 bg-black/45 shadow-metal outline-none", revealed && "is-revealed")}
      tabIndex={0}
      role="button"
      aria-label="Hover or tap to reveal Zakarya Oukil behind the active persona mask"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHoverReveal(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setHoverReveal(false)}
      onPointerUp={(event) => event.pointerType !== "mouse" && setTapReveal((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setTapReveal((value) => !value);
        }
      }}
      animate={{ boxShadow: revealed ? "inset 0 1px 0 rgba(255,255,255,.18), 0 34px 110px rgba(0,0,0,.52), 0 0 70px rgba(var(--accent-rgb), .22)" : "inset 0 1px 0 rgba(255,255,255,.16), 0 24px 80px rgba(0,0,0,.38)" }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="portrait-stage absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,.20),transparent_30%),linear-gradient(180deg,rgba(255,255,255,.06),rgba(0,0,0,.92))]" />
        <motion.div
          key={`${active.id}-aura`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: revealed ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease }}
          className="absolute inset-x-10 top-8 h-72 rounded-full bg-[color:var(--accent)]/16 blur-3xl"
        />
        {personas.map((persona) => (
          <motion.img
            key={persona.id}
            src={persona.photo}
            alt={persona.id === active.id ? "Professional placeholder portrait for Zakarya Oukil" : ""}
            aria-hidden={persona.id !== active.id}
            decoding="async"
            className="portrait-real absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 36%" }}
            animate={{
              opacity: persona.id === active.id ? (revealed ? 0.98 : 0.88) : 0,
              scale: persona.id === active.id ? (revealed ? 1.035 : 1.01) : 1.045,
              filter: persona.id === active.id ? (revealed ? "saturate(1.08) contrast(1.04)" : "saturate(.9) contrast(.98)") : "saturate(.7) contrast(.9)",
            }}
            transition={{ duration: 0.58, ease }}
            onError={(event) => { event.currentTarget.style.opacity = "0"; }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
        <div className="absolute inset-x-[9%] bottom-[12%] h-[26%] rounded-[50%_50%_14%_14%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.16),transparent_36%),linear-gradient(135deg,rgba(255,255,255,.07),rgba(0,0,0,.72))] blur-[.2px]" />
      </div>

      <HelmetOverlay active={active} revealed={revealed} />

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
          transition={{ duration: 0.42, ease }}
          className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/12 bg-black/58 p-5 backdrop-blur-xl sm:inset-x-6 sm:bottom-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.3em] text-[color:var(--accent)]">{active.mask.title}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{profile.name}</h3>
              <p className="mt-1 text-sm text-white/55">{revealed ? "Identity revealed — tap again to re-arm." : "Hover/tap helmet to reveal the real face."}</p>
            </div>
            <motion.div animate={{ rotate: revealed ? -18 : 0, scale: revealed ? 1.08 : 1 }} transition={{ duration: 0.35, ease }}>
              <MousePointer2 className="hidden h-6 w-6 text-white/40 sm:block" />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/12" />
      <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)] opacity-0 transition duration-700 group-hover:translate-x-8 group-hover:opacity-100" />
    </motion.div>
  );
}

function HelmetOverlay({ active, revealed }: { active: Persona; revealed: boolean }) {
  const gradientId = `metalGradient-${active.id}`;
  const glowId = `maskGlow-${active.id}`;
  const circuitId = `circuit-${active.id}`;
  const tone = active.id === "graphic" ? "editorial" : active.id === "dev" ? "terminal" : "precision";
  const shell = {
    closed: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
    revealed: { opacity: 0.2, y: -7, scale: 0.985, filter: "blur(1.2px)" },
  };

  return (
    <motion.div
      key={active.id}
      className="reveal-mask helmet-wrap pointer-events-none absolute left-1/2 top-[5.6%] h-[57%] w-[76%]"
      initial={{ opacity: 0, x: "-50%", scale: 1.035, filter: "blur(14px)" }}
      animate={{ opacity: 1, x: "-50%", scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease }}
      data-revealed={revealed}
      data-tone={tone}
    >
      <motion.svg
        viewBox="0 0 420 520"
        className="helmet-svg h-full w-full overflow-visible"
        aria-hidden="true"
        initial={false}
        animate={revealed ? "revealed" : "closed"}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="0.42" stopColor="#d9dde2" stopOpacity="0.84" />
            <stop offset="0.72" stopColor="#7b8189" stopOpacity="0.72" />
            <stop offset="1" stopColor="#171b22" stopOpacity="0.92" />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="35%" r="55%">
            <stop offset="0" stopColor={active.accent} stopOpacity="0.38" />
            <stop offset="1" stopColor={active.accent} stopOpacity="0" />
          </radialGradient>
          <pattern id={circuitId} width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M0 17H13M21 17H34M17 0V13M17 21V34" stroke={active.accent} strokeOpacity="0.22" strokeWidth="1" />
          </pattern>
        </defs>

        <ellipse cx="210" cy="238" rx="174" ry="214" fill={`url(#${glowId})`} opacity="0.55" />
        <motion.g variants={shell} transition={{ duration: 0.64, ease }}>
          <motion.path variants={{ closed: { x: 0 }, revealed: { x: -30, y: -5 } }} d="M204 20 C126 22 70 68 48 142 L32 238 L48 346 L106 456 L196 504 L202 20 Z" fill={`url(#${gradientId})`} stroke="rgba(255,255,255,.46)" strokeWidth="2" />
          <motion.path variants={{ closed: { x: 0 }, revealed: { x: 30, y: -5 } }} d="M216 20 C294 22 350 68 372 142 L388 238 L372 346 L314 456 L224 504 L218 20 Z" fill={`url(#${gradientId})`} stroke="rgba(255,255,255,.46)" strokeWidth="2" />
          <motion.path variants={{ closed: { y: 0, opacity: 1 }, revealed: { y: 24, opacity: 0.22 } }} d="M122 382 L174 432 L210 446 L246 432 L298 382 L278 478 L226 514 L194 514 L142 478 Z" fill="#090b10" stroke="rgba(255,255,255,.22)" strokeWidth="2" />
          <motion.path variants={{ closed: { y: 0 }, revealed: { y: -10, opacity: 0.25 } }} d="M120 66 L186 38 L210 86 L234 38 L300 66 L324 132 L230 118 L210 142 L190 118 L96 132 Z" fill="rgba(255,255,255,.55)" stroke="rgba(255,255,255,.42)" strokeWidth="1.5" />
          <path d="M210 24 V430" stroke="rgba(0,0,0,.48)" strokeWidth="2" />
        </motion.g>

        <motion.g transition={{ duration: 0.55, ease }} variants={{ closed: { opacity: 1 }, revealed: { opacity: 0, scale: 0.72 } }}>
          <path d="M78 190 C108 168 154 166 184 184 L164 222 C126 220 98 216 70 206 Z" fill="#05070b" stroke="rgba(255,255,255,.18)" strokeWidth="2" />
          <path d="M342 190 C312 168 266 166 236 184 L256 222 C294 220 322 216 350 206 Z" fill="#05070b" stroke="rgba(255,255,255,.18)" strokeWidth="2" />
          <ellipse cx="138" cy="198" rx="16" ry="10" fill={active.accent} opacity="0.95" />
          <ellipse cx="282" cy="198" rx="16" ry="10" fill={active.accent} opacity="0.95" />
        </motion.g>

        <motion.g variants={{ closed: { opacity: 0.95, y: 0 }, revealed: { opacity: 0.12, y: -8 } }} transition={{ duration: 0.5, ease }}>
          {active.id === "graphic" && (
            <>
              <path d="M82 145 L164 88" stroke={active.accent2} strokeWidth="10" strokeLinecap="round" opacity="0.75" />
              <path d="M256 88 L338 145" stroke={active.accent} strokeWidth="10" strokeLinecap="round" opacity="0.75" />
              <path d="M96 302 L176 270" stroke={active.accent2} strokeWidth="6" strokeLinecap="round" opacity="0.72" />
            </>
          )}
          {active.id === "ux" && (
            <>
              <path d="M94 142 H184 M236 142 H326 M106 328 H174 M246 328 H314" stroke={active.accent} strokeWidth="3" strokeLinecap="round" opacity="0.78" />
              <circle cx="184" cy="142" r="5" fill={active.accent} /><circle cx="236" cy="142" r="5" fill={active.accent} />
              <circle cx="174" cy="328" r="5" fill={active.accent2} /><circle cx="246" cy="328" r="5" fill={active.accent2} />
            </>
          )}
          {active.id === "dev" && (
            <>
              <path d="M78 268 H130 V304 H172 M342 268 H290 V304 H248 M210 112 V160" stroke={active.accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.74" />
              <path d="M72 126 H348 V366 H72 Z" fill={`url(#${circuitId})`} opacity="0.36" />
              <circle cx="172" cy="304" r="5" fill={active.accent} /><circle cx="248" cy="304" r="5" fill={active.accent} />
            </>
          )}
        </motion.g>

        <motion.g variants={{ closed: { opacity: 0.92 }, revealed: { opacity: 0.06 } }} transition={{ duration: 0.45, ease }}>
          <path d="M112 250 H308" stroke="rgba(255,255,255,.24)" strokeWidth="1" />
          <path d="M150 92 L184 116 M270 92 L236 116 M90 356 L134 346 M330 356 L286 346" stroke="rgba(0,0,0,.42)" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </motion.svg>
      <div className="scanline" />
    </motion.div>
  );
}

function MiniHelmet({ persona, active }: { persona: Persona; active: boolean }) {
  const gradientId = `mini-${persona.id}`;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.96" />
          <stop offset="1" stopColor="#14171d" stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <path d="M32 3 C17 4 8 14 6 30 L10 48 L24 61 H40 L54 48 L58 30 C56 14 47 4 32 3Z" fill={`url(#${gradientId})`} stroke={active ? persona.accent : "rgba(255,255,255,.28)"} strokeWidth="1.5" />
      <path d="M32 5 V54" stroke="rgba(0,0,0,.42)" strokeWidth="1" />
      <path d="M12 28 C19 24 25 24 29 28 L25 34 C19 34 15 33 11 31Z" fill="#05070b" />
      <path d="M52 28 C45 24 39 24 35 28 L39 34 C45 34 49 33 53 31Z" fill="#05070b" />
      <circle cx="22" cy="29" r="2.2" fill={persona.accent} />
      <circle cx="42" cy="29" r="2.2" fill={persona.accent} />
      {persona.id === "graphic" && <path d="M12 18 L27 9 M37 9 L52 18" stroke={persona.accent2} strokeWidth="2" strokeLinecap="round" />}
      {persona.id === "ux" && <path d="M15 16 H27 M37 16 H49 M19 45 H45" stroke={persona.accent} strokeWidth="1.6" strokeLinecap="round" />}
      {persona.id === "dev" && <path d="M14 42 H26 V49 M50 42 H38 V49" stroke={persona.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function StatBar({ stat, delay = 0 }: { stat: { label: string; value: number; suffix?: string }; delay?: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[.18em]">
        <span className="text-white/65">{stat.label}</span>
        <span className="text-white">{stat.value}{stat.suffix ?? ""}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${stat.value}%` }} viewport={{ once: true }} transition={{ duration: 0.95, delay, ease }} className="h-full rounded-full bg-[color:var(--accent)] shadow-[0_0_20px_var(--accent)]" />
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
