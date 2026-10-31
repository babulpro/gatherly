"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { CATEGORY_META, EVENTS, formatDate, type SocialEvent } from "@/lib/events";

const TABS = ["Created", "Joined", "Past"] as const;
type Tab = (typeof TABS)[number];

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-separator bg-background p-5">
      <p className="text-xs font-medium text-default-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-0.5 text-xs text-default-400">{hint}</p>
    </div>
  );
}

function EventRow({ event, action }: { event: SocialEvent; action: string }) {
  const meta = CATEGORY_META[event.category];
  return (
    <div className="flex items-center gap-4 rounded-xl border border-separator bg-background p-3 transition hover:border-primary/30">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br ${meta.cover} text-xl`}>
        {meta.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <Link href={`/events/${event.id}`} className="block truncate text-sm font-medium text-foreground hover:text-primary">
          {event.title}
        </Link>
        <p className="truncate text-xs text-default-500">
          {formatDate(event.date)} · {event.location.city} · {event.joined}/{event.capacity} joined
        </p>
      </div>
      <button className="shrink-0 cursor-pointer rounded-lg border border-separator px-3 py-1.5 text-xs font-medium text-default-600 transition hover:border-primary/40 hover:text-primary">
        {action}
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [tab, setTab] = useState<Tab>("Joined");
  const user = session?.user;

  // TODO: replace with real fetch: GET /api/me/events, /api/me/joined
  const created = EVENTS.slice(0, 2);
  const joined = EVENTS.slice(2, 5);
  const past = EVENTS.slice(5, 7);

  if (isPending) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center text-default-500">
        Loading your dashboard…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <div className="text-5xl">🔒</div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Sign in to continue</h1>
        <p className="mt-2 text-sm text-default-500">
          Your dashboard shows the events you've created and joined.
        </p>
        <Link
          href="/sign-in"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const data = tab === "Created" ? created : tab === "Joined" ? joined : past;
  const actionLabel = tab === "Created" ? "Manage" : tab === "Joined" ? "Leave" : "View";

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Hello, {user.name?.split(" ")[0] || "friend"} 👋
          </h1>
          <p className="mt-1 text-default-500">
            Here's your volunteering snapshot.
          </p>
        </div>
        <Link
          href="/events/create"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          + Create event
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Events created" value={String(created.length)} hint="You're organizing" />
        <StatCard label="Events joined" value={String(joined.length)} hint="Upcoming" />
        <StatCard label="Hours volunteered" value="18" hint="All time" />
        <StatCard label="People impacted" value="240+" hint="Estimated reach" />
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-1 border-b border-separator">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative cursor-pointer px-4 py-2.5 text-sm font-medium transition ${
                tab === t ? "text-primary" : "text-default-500 hover:text-foreground"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-2.5">
          {data.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-separator py-16 text-center">
              <p className="font-medium text-foreground">Nothing here yet</p>
              <p className="mt-1 text-sm text-default-500">
                {tab === "Created"
                  ? "Create your first event to get started."
                  : "Browse events and join a cause near you."}
              </p>
              <Link
                href={tab === "Created" ? "/events/create" : "/events"}
                className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
              >
                {tab === "Created" ? "Host an event →" : "Explore events →"}
              </Link>
            </div>
          ) : (
            data.map((e) => <EventRow key={e.id} event={e} action={actionLabel} />)
          )}
        </div>
      </div>
    </div>
  );
}