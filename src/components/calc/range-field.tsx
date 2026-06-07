"use client";

import { toast } from "@/components/ui/sonner";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format";

/**
 * Transparent overlay that toasts a hint when a user tries to interact with a
 * control that isn't usable yet (e.g. a disabled slider). Binds native listeners
 * via a ref callback: a disabled form control swallows events, and React's
 * synthetic handlers (and DOM property handlers) do not reliably fire for an
 * overlay sitting over the disabled Radix slider — but addEventListener-bound
 * native listeners do. Covers pointerdown (slide attempts) and click (taps), and
 * reuses a stable toast id so a single gesture shows one toast, not two.
 */
function HintOverlay({ message }: { message: string }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 cursor-not-allowed"
      ref={(el) => {
        if (!el) return;
        const notify = () => toast(message, { id: "range-field-locked" });
        el.addEventListener("pointerdown", notify);
        el.addEventListener("click", notify);
        return () => {
          el.removeEventListener("pointerdown", notify);
          el.removeEventListener("click", notify);
        };
      }}
    />
  );
}

export function RangeField({
  id,
  label,
  subtitle,
  value,
  max,
  step = 100,
  unbounded = false,
  disabledHint,
  onBumpMax,
  bumpLabel = "Worth even more? Tap to flex",
  onChange,
}: {
  id: string;
  label: string;
  subtitle?: string;
  value: number;
  max: number;
  step?: number;
  unbounded?: boolean;
  disabledHint?: string;
  /** When set, a playful button appears once the value hits the cap, letting the user raise it. */
  onBumpMax?: () => void;
  bumpLabel?: string;
  onChange: (v: number) => void;
}) {
  const effectiveMax = Math.max(max, 0);
  const clamped = unbounded
    ? Math.max(value, 0)
    : Math.min(value, effectiveMax);
  // When unbounded, the slider ceiling grows to fit a manually entered value.
  const sliderMax = unbounded ? Math.max(effectiveMax, clamped, step) : effectiveMax;
  const isDisabled = effectiveMax === 0;
  const hint = isDisabled ? disabledHint : undefined;
  const showBump = !!onBumpMax && effectiveMax > 0 && clamped >= effectiveMax;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <Label htmlFor={id} className="text-[15px] font-medium text-espresso">
          {label}
        </Label>
        <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-terra-deep tabular-nums">
          {formatCurrency(clamped)}
        </span>
      </div>
      {subtitle && <p className="-mt-1 text-xs text-espresso/55">{subtitle}</p>}
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="relative">
            <Slider
              id={id}
              min={0}
              max={sliderMax}
              step={step}
              value={[clamped]}
              onValueChange={([v]) => onChange(v)}
              disabled={isDisabled}
              className="[&_[data-slot=slider-track]]:h-2.5 [&_[data-slot=slider-track]]:bg-paper [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-terra-deep [&_[data-slot=slider-range]]:to-terra [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:border-hairline [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_4px_12px_-2px_rgba(110,65,25,0.4)]"
            />
            {hint && <HintOverlay message={hint} />}
          </div>
          <div className="flex justify-between text-[11px] text-espresso/45">
            <span>$0</span>
            <span>{formatCurrency(unbounded ? sliderMax : effectiveMax)}</span>
          </div>
        </div>
        <div className="relative w-32">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-espresso/55">
            $
          </span>
          <Input
            type="number"
            min={0}
            max={unbounded ? undefined : effectiveMax}
            value={value}
            disabled={isDisabled}
            onChange={(e) => {
              const parsed = parseInt(e.target.value, 10);
              if (isNaN(parsed)) onChange(0);
              else if (unbounded) onChange(Math.max(parsed, 0));
              else onChange(Math.min(Math.max(parsed, 0), effectiveMax));
            }}
            className="pl-7 text-right"
          />
          {hint && <HintOverlay message={hint} />}
        </div>
      </div>
      {showBump && (
        <button
          type="button"
          onClick={onBumpMax}
          className="group inline-flex items-center gap-1.5 rounded-full border border-terra/30 bg-terra/10 px-3 py-1 text-xs font-medium text-terra-deep transition hover:border-terra/50 hover:bg-terra/15"
        >
          <span aria-hidden>🤑</span>
          {bumpLabel}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      )}
    </div>
  );
}
