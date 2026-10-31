"use client";

import { useState } from "react";
import { CATEGORIES, CATEGORY_META, type EventCategory, type SocialEvent } from "@/lib/events";
import { EventCard } from "@/components/EventCard";

const inputCls =
  "w-full rounded-xl border border-separator bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-default-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/30";

const labelCls = "mb-1.5 block text-sm font-medium text-foreground";

export default function CreateEventPage() {
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

  const set = (k: keyof typeof f, v: string | number) =>
    setF((p) => ({ ...p, [k]: v }));

  const preview: SocialEvent = {
    id: "preview",
    title: f.title || "Your event title",
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
    organizer: { id: "me", name: "You" },
    tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
  };

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
        {/* Form */}
        <form className="space-y-6 rounded-2xl border border-separator bg-background p-6">
          <div>
            <label className={labelCls}>Event title</label>
            <input
              className={inputCls}
              placeholder="e.g. Riverside Cleanup Drive"
              value={f.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Short summary</label>
            <input
              className={inputCls}
              placeholder="One line that explains the impact"
              value={f.summary}
              onChange={(e) => set("summary", e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("category", c)}
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
            <label className={labelCls}>Description</label>
            <textarea
              rows={5}
              className={inputCls}
              placeholder="What will volunteers do? What should they bring?"
              value={f.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Date</label>
              <input
                type="date"
                className={inputCls}
                value={f.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Start time</label>
              <input
                type="time"
                className={inputCls}
                value={f.time}
                onChange={(e) => set("time", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Duration (hrs)</label>
              <input
                type="number"
                min={1}
                className={inputCls}
                value={f.durationHours}
                onChange={(e) => set("durationHours", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Venue</label>
              <input
                className={inputCls}
                placeholder="Community hall, park, etc."
                value={f.locationName}
                onChange={(e) => set("locationName", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>City</label>
              <input
                className={inputCls}
                placeholder="Dhaka"
                value={f.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Volunteer capacity</label>
              <input
                type="number"
                min={1}
                className={inputCls}
                value={f.capacity}
                onChange={(e) => set("capacity", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Tags (comma separated)</label>
              <input
                className={inputCls}
                placeholder="cleanup, outdoors"
                value={f.tags}
                onChange={(e) => set("tags", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-separator pt-5">
            <button
              type="button"
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-default-600 transition hover:bg-default-100"
            >
              Save draft
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Publish event
            </button>
          </div>
        </form>

        {/* Live preview */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-default-400">
            Live preview
          </p>
          <EventCard event={preview} />
          <p className="mt-3 text-center text-xs text-default-400">
            This is how volunteers will see it.
          </p>
        </aside>
      </div>
    </div>
  );
}