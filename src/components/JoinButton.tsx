"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function JoinButton({
  eventId,
  full,
}: {
  eventId: string;
  full: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (!session?.user) {
      router.push(`/sign-in?redirect=/events/${eventId}`);
      return;
    }
    setLoading(true);
    // TODO: POST /api/events/:id/join  |  DELETE /api/events/:id/join
    await new Promise((r) => setTimeout(r, 600));
    setJoined((v) => !v);
    setLoading(false);
  }

  if (full && !joined) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-xl bg-default-200 py-3 text-sm font-semibold text-default-500"
      >
        Event is full
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`w-full cursor-pointer rounded-xl py-3 text-sm font-semibold transition disabled:opacity-60 ${
        joined
          ? "border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15"
          : "bg-primary text-primary-foreground hover:opacity-90"
      }`}
    >
      {loading ? "Please wait…" : joined ? "✓ You're in — Leave event" : "Join this event"}
    </button>
  );
}