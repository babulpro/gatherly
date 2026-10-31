"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/events?q=${encodeURIComponent(q)}`);
      }}
      className="flex w-full max-w-xl items-center gap-2 rounded-full border border-separator bg-background p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/40"
    >
      <svg className="ml-3 h-5 w-5 shrink-0 text-default-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3-3" />
      </svg>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search events, causes or cities…"
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-default-400"
      />
      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}