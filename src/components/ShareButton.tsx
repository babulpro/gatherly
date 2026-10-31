"use client";

import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // user cancelled — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share this event"
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-separator px-3 py-1.5 text-xs font-medium text-default-600 transition hover:border-primary/40 hover:text-primary"
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="m16 6-4-4-4 4M12 2v13" />
      </svg>
      {copied ? "Link copied" : "Share"}
    </button>
  );
}