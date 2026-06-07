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
        "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-sm"
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>

      {state !== "default" ? (
        <div className="mt-5 max-w-2xl">
          {kicker && (
            <p className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink">
              {kicker}
            </p>
          )}
          {notice && (
            <p className="mt-3 text-base leading-relaxed text-espresso/70">{notice}</p>
          )}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
