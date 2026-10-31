export function LogoMark({
  className = "h-8 w-8",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* three arcs meeting at center = "gather" */}
      <path
        d="M20 6c7.732 0 14 6.268 14 14"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M34 20c0 7.732-6.268 14-14 14"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M20 34C12.268 34 6 27.732 6 20"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M6 20C6 12.268 12.268 6 20 6"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="0.1 14"
      />
      <circle cx="20" cy="20" r="3.5" fill={color} />
    </svg>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      Gather<span className="text-primary">ly</span>
    </span>
  );
}