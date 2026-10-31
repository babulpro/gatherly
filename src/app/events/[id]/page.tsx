import Link from "next/link";
import { notFound } from "next/navigation";
 
import { JoinButton } from "@/components/JoinButton";
import { CATEGORY_META,daysUntil,
  formatDate,
  formatTime,
  getEvent, } from "@/lib/events";

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
  const pct = Math.min(100, Math.round((event.joined / event.capacity) * 100));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-default-500 transition hover:text-foreground"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Back to events
      </Link>

      {/* Cover */}
      <div className={`relative mt-4 flex h-56 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br ${meta.cover}`}>
        <span className="text-7xl">{meta.emoji}</span>
        <span className={`absolute left-5 top-5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${meta.chip}`}>
          {meta.label}
        </span>
        <span className="absolute bottom-5 left-5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {daysUntil(event.date)}
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {event.title}
          </h1>
          <p className="mt-2 text-default-500">{event.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {event.tags.map((t) => (
              <span key={t} className="rounded-full bg-default-100 px-2.5 py-1 text-xs text-default-600">
                #{t}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-default-400">
              About this event
            </h2>
            <p className="mt-2 leading-relaxed text-default-700">
              {event.description}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-separator p-5">
            <h2 className="text-sm font-semibold text-foreground">Organized by</h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {event.organizer.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{event.organizer.name}</p>
                <p className="text-xs text-default-500">Verified community organizer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-separator bg-background p-5 shadow-sm">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
                <div>
                  <p className="font-medium text-foreground">{formatDate(event.date)}</p>
                  <p className="text-default-500">
                    {formatTime(event.date)} · {event.durationHours}h
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="font-medium text-foreground">{event.location.name}</p>
                  <p className="text-default-500">{event.location.city}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-separator pt-5">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-default-500">{event.joined} joined</span>
                <span className="font-medium text-primary">
                  {spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-default-200">
                <div
                  className={`h-full rounded-full ${spotsLeft > 0 ? "bg-primary" : "bg-danger"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="mt-5">
              <JoinButton eventId={event.id} full={spotsLeft <= 0} />
            </div>

            <p className="mt-3 text-center text-xs text-default-400">
              Free · No experience needed
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}