"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format";

export function RangeField({
  id,
  label,
  subtitle,
  value,
  max,
  step = 100,
  onChange,
}: {
  id: string;
  label: string;
  subtitle?: string;
  value: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  const effectiveMax = Math.max(max, 0);
  const clamped = Math.min(value, effectiveMax);

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
          <Slider
            id={id}
            min={0}
            max={effectiveMax}
            step={step}
            value={[clamped]}
            onValueChange={([v]) => onChange(v)}
            disabled={effectiveMax === 0}
            className="[&_[data-slot=slider-track]]:h-2.5 [&_[data-slot=slider-track]]:bg-paper [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-terra-deep [&_[data-slot=slider-range]]:to-terra [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:border-hairline [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_4px_12px_-2px_rgba(110,65,25,0.4)]"
          />
          <div className="flex justify-between text-[11px] text-espresso/45">
            <span>$0</span>
            <span>{formatCurrency(effectiveMax)}</span>
          </div>
        </div>
        <div className="relative w-32">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-espresso/55">
            $
          </span>
          <Input
            type="number"
            min={0}
            max={effectiveMax}
            value={value}
            onChange={(e) => {
              const parsed = parseInt(e.target.value, 10);
              if (isNaN(parsed)) onChange(0);
              else onChange(Math.min(Math.max(parsed, 0), effectiveMax));
            }}
            className="pl-7 text-right"
          />
        </div>
      </div>
    </div>
  );
}
