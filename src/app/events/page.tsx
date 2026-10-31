"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, CATEGORY_META, EVENTS, type EventCategory } from "@/lib/events";
import { EventCard } from "@/components/EventCard";

function EventsContent() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<EventCategory | "all">(
    (params.get("category") as EventCategory) ?? "all"
  );
  const [city, setCity] = useState("all");

  const cities = useMemo(
    () => ["all", ...Array.from(new Set(EVENTS.map((e) => e.location.city)))],
    []
  );

  const results = useMemo(() => {
    return EVENTS.filter((e) => {
      const matchesQ =
        !q ||
        e.title.toLowerCase().includes(q.toLowerCase()) ||
        e.summary.toLowerCase().includes(q.toLowerCase()) ||
        e.location.city.toLowerCase().includes(q.toLowerCase());
      const matchesCat = category === "all" || e.category === category;
      const matchesCity = city === "all" || e.location.city === city;
      return matchesQ && matchesCat && matchesCity;
    }).sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }, [q, category, city]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Explore events
        </h1>
        <p className="mt-1 text-default-500">
          {results.length} event{results.length !== 1 && "s"} happening around you.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-separator bg-background px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary/40">
            <svg className="h-4 w-4 text-default-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-default-400"
            />
          </div>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="cursor-pointer rounded-xl border border-separator bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All cities" : c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              category === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-separator text-default-600 hover:border-primary/40"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-separator text-default-600 hover:border-primary/40"
              }`}
            >
              {CATEGORY_META[c].emoji} {CATEGORY_META[c].label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-separator py-20 text-center">
          <div className="text-4xl">🔍</div>
          <p className="mt-3 font-medium text-foreground">No events found</p>
          <p className="mt-1 text-sm text-default-500">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}

      <div className="mt-12 rounded-2xl border border-separator bg-primary/5 p-6 text-center">
        <p className="text-sm text-default-600">Can't find what you're looking for?</p>
        <Link href="/events/create" className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">
          Create your own event →
        </Link>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-6 py-12 text-default-500">Loading events…</div>}>
      <EventsContent />
    </Suspense>
  );
}