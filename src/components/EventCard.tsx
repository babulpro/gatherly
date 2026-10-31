import { CATEGORY_META,
  formatDate,
  formatTime,
  type SocialEvent } from "@/lib/events";
import Link from "next/link";
import DaysUntilChip from "./DaysUntilChip";
 
export function EventCard({ event }: { event: SocialEvent }) {
  const meta = CATEGORY_META[event.category];
  const spotsLeft = event.capacity - event.joined;
  const pct = Math.min(100, Math.round((event.joined / event.capacity) * 100));
  const full = spotsLeft <= 0;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-separator bg-background transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Cover */}
      <div
        className={`relative flex h-36 items-center justify-center bg-linear-to-br ${meta.cover}`}
      >
        <span className="text-5xl drop-shadow-sm">{meta.emoji}</span>

        <span
          className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${meta.chip}`}
        >
          {meta.label}
        </span>

        {event.isFeatured && (
          <span className="absolute right-3 top-3 rounded-full bg-foreground/85 px-2.5 py-0.5 text-xs font-semibold text-background">
            ★ Featured
          </span>
        )}

        <span className="absolute bottom-3 left-3 rounded-full bg-background/85 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
          <DaysUntilChip
            date={event.date}
            className="absolute bottom-3 left-3 rounded-full bg-background/85 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm"
            />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {event.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-default-500">
          {event.summary}
        </p>

        <div className="mt-3 space-y-1.5 text-sm text-default-600">
          <p className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-default-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            {formatDate(event.date)} · {formatTime(event.date)}
          </p>
          <p className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-default-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{event.location.name}, {event.location.city}</span>
          </p>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-default-500">
              {event.joined}/{event.capacity} volunteers
            </span>
            <span className={full ? "font-medium text-danger" : "font-medium text-primary"}>
              {full ? "Full" : `${spotsLeft} spots left`}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-default-200">
            <div
              className={`h-full rounded-full ${full ? "bg-danger" : "bg-primary"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center gap-2 border-t border-separator pt-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
            {event.organizer.name.charAt(0)}
          </span>
          <span className="truncate text-xs text-default-500">
            by {event.organizer.name}
          </span>
        </div>
      </div>
    </Link>
  );
}