"use client";

import { Eyebrow } from "./eyebrow";
import { StatCard } from "./stat-card";
import { ExportButton } from "./export-button";
import type { RecapData } from "./recap-card";
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
  recap,
}: {
  eyebrow: string;
  kicker?: string;
  figure?: string;
  context?: string;
  donut?: React.ReactNode;
  stats?: HeroStat[];
  state?: "default" | "ineligible" | "empty";
  notice?: string;
  recap?: RecapData;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        // Stickiness lives on the column wrapper (CalculatorShell). Keep the mobile
        // reveal opacity-only and the desktop reveal as translate + blur.
        "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        shown
          ? "opacity-100 md:translate-y-0 md:blur-0"
          : "opacity-0 md:translate-y-8 md:blur-sm"
      )}
    >
      {state !== "default" ? (
        // The wrapper column is sticky on mobile, so this needs an opaque card
        // backdrop (like the eligible compact card) or it pins transparently
        // over the inputs while scrolling.
        <div className="max-w-2xl rounded-[1.5rem] border border-hairline bg-cream/90 px-5 py-4 shadow-[0_16px_36px_-22px_rgba(90,55,25,0.55)] backdrop-blur-md md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none md:backdrop-blur-none">
          <Eyebrow>{eyebrow}</Eyebrow>
          {kicker && (
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink md:mt-5 md:text-3xl">
              {kicker}
            </p>
          )}
          {notice && (
            <p className="mt-2 text-sm leading-relaxed text-espresso/70 md:mt-3 md:text-base">
              {notice}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Mobile: compact sticky summary card */}
          <div className="rounded-[1.5rem] border border-hairline bg-cream/90 px-5 py-4 shadow-[0_16px_36px_-22px_rgba(90,55,25,0.55)] backdrop-blur-md md:hidden">
            <div className="flex items-center justify-between gap-3">
              <Eyebrow>{eyebrow}</Eyebrow>
              {recap && <ExportButton recap={recap} variant="icon" />}
            </div>
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

          {/* Desktop: sticky summary panel (figure + donut + stats stacked for the column) */}
          <div className="hidden md:block">
            <Eyebrow>{eyebrow}</Eyebrow>
            <div className="mt-5">
              {kicker && (
                <p className="font-[family-name:var(--font-display)] text-lg font-medium text-espresso">
                  {kicker}
                </p>
              )}
              <p className="mt-1 font-[family-name:var(--font-display)] text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.03em] tabular-nums text-ink">
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
              <div className="mt-6 w-full rounded-[1.75rem] border border-white/60 bg-white/45 p-1.5 shadow-[0_20px_50px_-28px_rgba(90,55,25,0.45),inset_0_1px_1px_rgba(255,255,255,0.8)]">
                <div className="rounded-[1.4rem] bg-white px-6 py-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  {donut}
                </div>
              </div>
            )}

            {stats.length > 0 && (
              <div className="mt-6 grid gap-3.5">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>
            )}

            {recap && (
              <div className="mt-5">
                <ExportButton recap={recap} variant="full" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
