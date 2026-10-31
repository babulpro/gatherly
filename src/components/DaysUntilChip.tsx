"use client";

import { useEffect, useState } from "react";
import { daysUntil } from "@/lib/events";

export function DaysUntilChip({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(daysUntil(date));
  }, [date]);

  return (
    <span className={className} suppressHydrationWarning>
      {label ?? "\u00A0"}
    </span>
  );
}

export default DaysUntilChip;