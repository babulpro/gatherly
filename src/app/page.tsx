import Link from "next/link";
import { CATEGORIES, CATEGORY_META, EVENTS } from "@/lib/events";
import { EventCard } from "@/components/EventCard";
import { HeroSearch } from "@/components/HeroSearch";

const STATS = [
  { value: "1.2k+", label: "Active volunteers" },
  { value: "320", label: "Events hosted" },
  { value: "48", label: "Cities covered" },
];

export default function HomePage() {
  const featured = EVENTS.filter((e) => e.isFeatured);
  const upcoming = [...EVENTS]
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      {/* HERO */}
      <section className="relative -mx-6 overflow-hidden border-b border-separator px-6 py-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Community-powered social impact
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Small acts.{" "}
            <span className="text-primary">Big local impact.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base text-default-500">
            Discover social service events near you — cleanups, food drives,
            mentoring and more. Join a cause, meet neighbors, and make your city
            a little better.
          </p>

          <div className="mt-8 flex justify-center">
            <HeroSearch />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm">
            <span className="text-default-400">Popular:</span>
            {CATEGORIES.slice(0, 4).map((c) => (
              <Link
                key={c}
                href={`/events?category=${c}`}
                className="rounded-full border border-separator px-2.5 py-0.5 text-default-600 transition hover:border-primary/40 hover:text-primary"
              >
                {CATEGORY_META[c].emoji} {CATEGORY_META[c].label}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 divide-x divide-separator rounded-2xl border border-separator bg-background/60 backdrop-blur">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-5 text-center">
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="mt-0.5 text-xs text-default-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Browse by cause</h2>
            <p className="text-sm text-default-500">Find the cause that speaks to you.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/events?category=${c}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-separator bg-background p-4 text-center transition hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="text-2xl transition group-hover:scale-110">
                {CATEGORY_META[c].emoji}
              </span>
              <span className="text-xs font-medium text-default-600 group-hover:text-primary">
                {CATEGORY_META[c].label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Featured this week</h2>
              <p className="text-sm text-default-500">High-impact events that need volunteers.</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}

      {/* UPCOMING */}
      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Upcoming near you</h2>
            <p className="text-sm text-default-500">Happening in the next few weeks.</p>
          </div>
          <Link href="/events" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-20">
        <h2 className="text-center text-xl font-bold text-foreground">
          How it works
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { n: "01", t: "Discover", d: "Browse events by cause, city or date. Filter to what fits your schedule." },
            { n: "02", t: "Join", d: "One click to reserve a spot. Get reminders and event-day details." },
            { n: "03", t: "Show up", d: "Meet your community, do good, and track your impact over time." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-separator bg-background p-6">
              <span className="text-xs font-bold tracking-widest text-primary">{s.n}</span>
              <h3 className="mt-2 text-base font-semibold text-foreground">{s.t}</h3>
              <p className="mt-1 text-sm text-default-500">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/15 via-primary/5 to-transparent p-10 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Have a cause in mind?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-default-500">
          Create an event in minutes and rally your neighbors around something
          that matters.
        </p>
        <Link
          href="/events/create"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Host an event
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </section>
    </div>
  );
}