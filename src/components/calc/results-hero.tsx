"use client";

import { Eyebrow } from "./eyebrow";
import { StatCard } from "./stat-card";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export interface HeroStat {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}

export function ResultsHero({
  eyebrow,
  kicker,
  figure,
  context,
  donut,
  stats = [],
  state = "default",
  notice,
}: {
  eyebrow: string;
  kicker?: string;
  figure?: string;
  context?: string;
  donut?: React.ReactNode;
  stats?: HeroStat[];
  state?: "default" | "ineligible" | "empty";
  notice?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        // Mobile reveal is opacity-only (a transform would break the sticky child below).
        // Desktop gets the richer translate + blur reveal.
        "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        shown
          ? "opacity-100 md:translate-y-0 md:blur-0"
          : "opacity-0 md:translate-y-8 md:blur-sm",
        // On mobile, pin the summary to the top while the inputs scroll underneath.
        state === "default" && "max-md:sticky max-md:top-20 max-md:z-20"
      )}
    >
      {state !== "default" ? (
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          {kicker && (
            <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink">
              {kicker}
            </p>
          )}
          {notice && (
            <p className="mt-3 text-base leading-relaxed text-espresso/70">{notice}</p>
          )}
        </div>
      ) : (
        <>
          {/* Mobile: compact sticky summary card */}
          <div className="rounded-[1.5rem] border border-hairline bg-cream/90 px-5 py-4 shadow-[0_16px_36px_-22px_rgba(90,55,25,0.55)] backdrop-blur-md md:hidden">
            <Eyebrow>{eyebrow}</Eyebrow>
            {kicker && (
              <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-medium text-espresso/80">
                {kicker}
              </p>
            )}
            <p className="font-[family-name:var(--font-display)] text-[2.5rem] font-semibold leading-[0.95] tracking-[-0.03em] tabular-nums text-ink">
              {figure}
            </p>
            {context && <p className="mt-1 text-xs text-espresso/60">{context}</p>}
          </div>

          {/* Desktop: full hero (figure + donut + stats) */}
          <div className="hidden md:block">
            <Eyebrow>{eyebrow}</Eyebrow>
            <div className="mt-5 grid items-end gap-8 md:grid-cols-[1.35fr_0.9fr]">
              <div>
                {kicker && (
                  <p className="font-[family-name:var(--font-display)] text-xl font-medium text-espresso">
                    {kicker}
                  </p>
                )}
                <p className="mt-1 font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,6.5rem)] font-semibold leading-[0.86] tracking-[-0.03em] tabular-nums text-ink">
                  {figure}
                </p>
                {context && (
                  <p className="mt-3 flex items-center gap-3 text-sm text-espresso/60">
                    <span>{context}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-hairline to-transparent" />
                  </p>
                )}
              </div>
              {donut && (
                <div className="rounded-[1.75rem] border border-white/60 bg-white/45 p-1.5 shadow-[0_20px_50px_-28px_rgba(90,55,25,0.45),inset_0_1px_1px_rgba(255,255,255,0.8)]">
                  <div className="rounded-[1.4rem] bg-white px-5 py-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                    {donut}
                  </div>
                </div>
              )}
            </div>

            {stats.length > 0 && (
              <div className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
