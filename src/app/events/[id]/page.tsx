import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JoinButton } from "@/components/JoinButton";
import { ShareButton } from "@/components/ShareButton";
import { EventCard } from "@/components/EventCard";
import {
  CATEGORY_META,
  EVENTS,
  daysUntil,
  formatDate,
  formatTime,
  getEvent,
} from "@/lib/events";
import DaysUntilChip from "@/components/DaysUntilChip";

/* ---------- Pre-render every known event ---------- */
export function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

/* ---------- Per-event SEO ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) return { title: "Event not found" };

  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: `${event.title} · Gatherly`,
      description: event.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.summary,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();

  const meta = CATEGORY_META[event.category];
  const spotsLeft = event.capacity - event.joined;
  const full = spotsLeft <= 0;
  const pct = Math.min(100, Math.round((event.joined / event.capacity) * 100));

  const related = EVENTS.filter(
    (e) => e.category === event.category && e.id !== event.id
  ).slice(0, 3);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${event.location.name}, ${event.location.city}`
  )}`;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-28 pt-10 lg:pb-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-default-500"
      >
        <Link href="/events" className="transition hover:text-foreground">
          Events
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/events?category=${event.category}`}
          className="transition hover:text-foreground"
        >
          {meta.label}
        </Link>
        <span aria-hidden>/</span>
        <span className="truncate text-foreground">{event.title}</span>
      </nav>

      {/* Cover */}
      <div
        className={`relative mt-4 flex h-56 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br ${meta.cover} sm:h-64`}
      >
        <span className="text-7xl drop-shadow-sm sm:text-8xl">{meta.emoji}</span>

        <span
          className={`absolute left-5 top-5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${meta.chip}`}
        >
          {meta.label}
        </span>

        <span className="absolute bottom-5 left-5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur-sm">
         <DaysUntilChip
            date={event.date}
            className="absolute bottom-5 left-5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur-sm"
            />
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* ---------- Main column ---------- */}
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
              {event.title}
            </h1>
            <ShareButton title={event.title} />
          </div>

          <p className="mt-2 text-default-500">{event.summary}</p>

          {event.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {event.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-default-100 px-2.5 py-1 text-xs text-default-600"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-default-400">
              About this event
            </h2>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-default-700">
              {event.description}
            </p>
          </section>

          {/* Organizer */}
          <section className="mt-8 rounded-2xl border border-separator p-5">
            <h2 className="text-sm font-semibold text-foreground">
              Organized by
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-base font-bold text-primary">
                {event.organizer.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                  {event.organizer.name}
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label="Verified"
                  >
                    <path d="m5 12 5 5 9-9" />
                  </svg>
                </p>
                <p className="text-xs text-default-500">
                  Verified community organizer
                </p>
              </div>
              <Link
                href={`/organizers/${event.organizer.id}`}
                className="shrink-0 text-xs font-medium text-primary hover:underline"
              >
                View →
              </Link>
            </div>
          </section>
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-separator bg-background p-5 shadow-sm">
            {/* Date + location */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
                <div>
                  <p className="font-medium text-foreground">
                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                  </p>
                  <p className="text-default-500">
                    {formatTime(event.date)} · {event.durationHours}h
                  </p>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:opacity-80"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="font-medium text-foreground">
                    {event.location.name}
                  </p>
                  <p className="text-default-500">{event.location.city}</p>
                </div>
              </a>
            </div>

            {/* CTA first, progress second */}
            <div className="mt-5 border-t border-separator pt-5">
              <JoinButton eventId={event.id} full={full} />

              <div className="mt-3">
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-default-500">
                    {event.joined} joined
                  </span>
                  <span
                    className={`font-medium ${full ? "text-danger" : "text-primary"}`}
                  >
                    {full ? "Full" : `${spotsLeft} spots left`}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-default-200">
                  <div
                    className={`h-full rounded-full ${full ? "bg-danger" : "bg-primary"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-default-400">
                Free · No experience needed
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* ---------- Related ---------- */}
      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                More {meta.label.toLowerCase()} events
              </h2>
              <p className="text-sm text-default-500">
                Similar causes happening soon.
              </p>
            </div>
            <Link
              href={`/events?category=${event.category}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}

      {/* Back link — bottom */}
      <div className="mt-12">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-default-500 transition hover:text-foreground"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to all events
        </Link>
      </div>

      {/* ---------- Sticky mobile CTA ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-separator bg-background/95 px-4 py-3 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-default-500">
              {formatDate(event.date)} · {event.location.city}
            </p>
            <p
              className={`text-xs font-medium ${full ? "text-danger" : "text-primary"}`}
            >
              {full ? "Event full" : `${spotsLeft} spots left`}
            </p>
          </div>
          <JoinButton eventId={event.id} full={full} />
        </div>
      </div>
    </div>
  );
}