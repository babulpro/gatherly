"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  CATEGORIES,
  CATEGORY_META,
  type EventCategory,
  type SocialEvent,
} from "@/lib/events";
import { EventCard } from "@/components/EventCard";

const inputCls =
  "w-full rounded-xl border border-separator bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-default-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/30";

const labelCls = "mb-1.5 block text-sm font-medium text-foreground";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [f, setF] = useState({
    title: "",
    summary: "",
    description: "",
    category: "environment" as EventCategory,
    date: "",
    time: "09:00",
    durationHours: 3,
    locationName: "",
    city: "",
    capacity: 50,
    tags: "",
  });

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const previewReady = f.title.trim() !== "" && f.date !== "";

  const preview: SocialEvent = useMemo(
    () => ({
      id: "preview",
      title: f.title,
      summary: f.summary || "A short one-line summary of your event.",
      description: f.description,
      category: f.category,
      date: f.date ? new Date(`${f.date}T${f.time || "09:00"}`).toISOString() : "",
      durationHours: Number(f.durationHours) || 1,
      location: {
        name: f.locationName || "Venue name",
        city: f.city || "City",
      },
      capacity: Number(f.capacity) || 50,
      joined: 0,
      organizer: { id: "me", name: session?.user?.name || "You" },
      tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
    }),
    [f, session?.user?.name]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!session?.user) {
      router.push("/sign-in?redirect=/events/create");
      return;
    }

    if (!f.title.trim()) return setError("Please enter an event title.");
    if (!f.date) return setError("Please pick a date.");
    if (!f.locationName.trim()) return setError("Please enter a venue.");
    if (!f.city.trim()) return setError("Please enter a city.");
    const cap = Number(f.capacity);
    if (!cap || cap < 1) return setError("Capacity must be at least 1.");

    setSubmitting(true);
    try {
      // TODO: POST /api/events
      await new Promise((r) => setTimeout(r, 800));
      router.push("/dashboard?created=1");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Host an event
        </h1>
        <p className="mt-1 text-default-500">
          Fill in the details — the preview updates as you type.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <form
          onSubmit={onSubmit}
          className="space-y-6 rounded-2xl border border-separator bg-background p-6"
        >
          <div>
            <label htmlFor="title" className={labelCls}>
              Event title
            </label>
            <input
              id="title"
              className={inputCls}
              placeholder="e.g. Riverside Cleanup Drive"
              value={f.title}
              onChange={(e) => set("title", e.target.value)}
              maxLength={80}
            />
            <p className="mt-1 text-right text-xs text-default-400">
              {f.title.length}/80
            </p>
          </div>

          <div>
            <label htmlFor="summary" className={labelCls}>
              Short summary
            </label>
            <input
              id="summary"
              className={inputCls}
              placeholder="One line that explains the impact"
              value={f.summary}
              onChange={(e) => set("summary", e.target.value)}
              maxLength={140}
            />
            <p className="mt-1 text-right text-xs text-default-400">
              {f.summary.length}/140
            </p>
          </div>

          <div>
            <span className={labelCls}>Category</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("category", c)}
                  aria-pressed={f.category === c}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition ${
                    f.category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-separator text-default-600 hover:border-primary/40"
                  }`}
                >
                  {CATEGORY_META[c].emoji} {CATEGORY_META[c].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className={labelCls}>
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              className={inputCls}
              placeholder="What will volunteers do? What should they bring?"
              value={f.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="date" className={labelCls}>
                Date
              </label>
              <input
                id="date"
                type="date"
                className={inputCls}
                value={f.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="time" className={labelCls}>
                Start time
              </label>
              <input
                id="time"
                type="time"
                className={inputCls}
                value={f.time}
                onChange={(e) => set("time", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="duration" className={labelCls}>
                Duration (hrs)
              </label>
              <input
                id="duration"
                type="number"
                min={1}
                className={inputCls}
                value={f.durationHours}
                onChange={(e) => set("durationHours", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="venue" className={labelCls}>
                Venue
              </label>
              <input
                id="venue"
                className={inputCls}
                placeholder="Community hall, park, etc."
                value={f.locationName}
                onChange={(e) => set("locationName", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="city" className={labelCls}>
                City
              </label>
              <input
                id="city"
                className={inputCls}
                placeholder="Dhaka"
                value={f.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="capacity" className={labelCls}>
                Volunteer capacity
              </label>
              <input
                id="capacity"
                type="number"
                min={1}
                className={inputCls}
                value={f.capacity}
                onChange={(e) => set("capacity", Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="tags" className={labelCls}>
                Tags (comma separated)
              </label>
              <input
                id="tags"
                className={inputCls}
                placeholder="cleanup, outdoors"
                value={f.tags}
                onChange={(e) => set("tags", e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
            >
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-separator pt-5">
            <button
              type="button"
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-default-600 transition hover:bg-default-100"
            >
              Save draft
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Publishing…" : "Publish event"}
            </button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-default-400">
            Live preview
          </p>

          {previewReady ? (
            <>
              <EventCard event={preview} />
              <p className="mt-3 text-center text-xs text-default-400">
                This is how volunteers will see it.
              </p>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-separator p-8 text-center">
              <div className="text-3xl">✨</div>
              <p className="mt-3 text-sm font-medium text-foreground">
                Your preview appears here
              </p>
              <p className="mt-1 text-xs text-default-500">
                Add a title and date to see the live preview.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}