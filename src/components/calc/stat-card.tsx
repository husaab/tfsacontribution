import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/60 bg-white/40 p-1.5 shadow-[0_14px_36px_-26px_rgba(90,55,25,0.5),inset_0_1px_1px_rgba(255,255,255,0.7)]">
      <div
        className={cn(
          "rounded-[1.1rem] px-4 py-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]",
          accent
            ? "bg-gradient-to-br from-terra to-terra-deep text-white"
            : "bg-gradient-to-br from-white to-paper"
        )}
      >
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.13em]",
            accent ? "text-white/80" : "text-espresso/55"
          )}
        >
          {label}
        </p>
        <p className="mt-1.5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        {hint && (
          <p className={cn("mt-1 text-xs", accent ? "text-white/75" : "text-espresso/55")}>
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
