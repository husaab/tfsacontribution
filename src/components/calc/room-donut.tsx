"use client";

export function RoomDonut({
  used,
  limit,
  label = "Room used",
  centerValue,
}: {
  used: number;
  limit: number;
  label?: string;
  centerValue?: string;
}) {
  const pct = limit > 0 ? Math.min(1, Math.max(0, used / limit)) : 0;
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative h-[120px] w-[120px] shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="var(--paper)" strokeWidth="14" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="var(--terra)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            style={{ transition: "stroke-dashoffset 600ms var(--ease-fluid)" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
          {Math.round(pct * 100)}%
        </span>
      </div>
      <div className="pr-2 text-right">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-espresso/55">
          {label}
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-espresso tabular-nums">
          {centerValue}
        </p>
      </div>
    </div>
  );
}
