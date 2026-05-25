import Link from "next/link";
import { ArrowLeft, Radar } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-6 text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
      <section className="panel sci-corners relative z-10 max-w-xl p-10 text-center">
        <Radar className="mx-auto mb-6 h-12 w-12 text-[color:var(--accent)]" />
        <p className="font-mono text-sm uppercase tracking-[.45em] text-white/55">Signal lost / 404</p>
        <h1 className="mt-4 font-display text-5xl font-bold">This sector does not exist.</h1>
        <p className="mt-4 text-white/65">The route you requested is outside the portfolio grid. Return to the command deck and keep exploring Zakarya's identities.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-mono text-sm uppercase tracking-[.2em] text-white transition hover:border-[color:var(--accent)] hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" /> Return home
        </Link>
      </section>
    </main>
  );
}
