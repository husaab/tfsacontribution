"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  calculateFHSA,
  FHSA_ASSUMED_NEXT_YEAR_LIMIT,
  FHSA_CURRENT_YEAR,
  FHSA_LIFETIME_LIMIT,
  FHSA_START_YEAR,
} from "@/lib/fhsa";

function formatCurrency(value: number): string {
  return value.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function SliderField({
  label,
  value,
  max,
  onChange,
  id,
  subtitle,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
  id: string;
  subtitle?: string;
}) {
  const effectiveMax = Math.max(max, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
      </div>
      {subtitle && (
        <p className="text-xs text-muted-foreground -mt-1">{subtitle}</p>
      )}
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-1">
          <Slider
            id={id}
            min={0}
            max={effectiveMax}
            step={100}
            value={[Math.min(value, effectiveMax)]}
            onValueChange={([v]) => onChange(v)}
            disabled={effectiveMax === 0}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>{formatCurrency(effectiveMax)}</span>
          </div>
        </div>
        <div className="relative w-32">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            type="number"
            min={0}
            max={effectiveMax}
            value={value}
            onChange={(e) => {
              const parsed = parseInt(e.target.value, 10);
              if (isNaN(parsed)) {
                onChange(0);
              } else {
                onChange(Math.min(Math.max(parsed, 0), effectiveMax));
              }
            }}
            className="pl-7 text-right"
          />
        </div>
      </div>
    </div>
  );
}

export function FHSACalculator() {
  const [yearOpened, setYearOpened] = useState(FHSA_START_YEAR);
  const [contributions, setContributions] = useState<Record<number, number>>(
    {}
  );

  const result = useMemo(
    () => calculateFHSA(yearOpened, contributions),
    [yearOpened, contributions]
  );

  function handleYearOpenedChange(year: string) {
    setYearOpened(parseInt(year, 10));
    setContributions({});
  }

  function handleContributionChange(year: number, value: number) {
    setContributions((prev) => ({ ...prev, [year]: value }));
  }

  const yearOptions: number[] = [];
  for (let y = FHSA_START_YEAR; y <= FHSA_CURRENT_YEAR; y++) {
    yearOptions.push(y);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          FHSA Contribution Room Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate your available FHSA participation room based on when you
          opened your account and your contribution history. This calculator
          assumes standard contributions with no over-contributions or taxable
          withdrawals.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Year opened selector */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Label className="text-sm font-medium">
            What year did you open your first FHSA?
          </Label>
          <Select
            value={yearOpened.toString()}
            onValueChange={handleYearOpenedChange}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Per-year contribution sliders */}
        {result.years.map((detail) => (
          <SliderField
            key={detail.year}
            id={`fhsa-contrib-${detail.year}`}
            label={
              detail.year === FHSA_CURRENT_YEAR
                ? `How much have you contributed to your FHSA in ${detail.year}?`
                : `How much did you contribute to your FHSA in ${detail.year}?`
            }
            subtitle={
              detail.carryforward > 0
                ? `Includes ${formatCurrency(detail.carryforward)} carryforward from prior year`
                : undefined
            }
            value={detail.contributions}
            max={detail.room}
            onChange={(v) => handleContributionChange(detail.year, v)}
          />
        ))}

        <Separator />

        {/* Results */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Results
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-accent/50 px-4 py-4">
              <p className="text-sm text-muted-foreground">
                Remaining room in {FHSA_CURRENT_YEAR}
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatCurrency(result.remainingRoom)}
              </p>
            </div>
            <div className="rounded-lg border bg-accent/50 px-4 py-4">
              <p className="text-sm text-muted-foreground">
                Projected room in {FHSA_CURRENT_YEAR + 1}
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatCurrency(result.projectedRoomNextYear)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Assumes {formatCurrency(FHSA_ASSUMED_NEXT_YEAR_LIMIT)} annual
                limit
              </p>
            </div>
            <div className="rounded-lg border bg-accent/50 px-4 py-4">
              <p className="text-sm text-muted-foreground">
                Lifetime contributions
              </p>
              <p className="mt-1 text-2xl font-bold">
                {formatCurrency(result.lifetimeContributions)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                of {formatCurrency(FHSA_LIFETIME_LIMIT)} lifetime limit
              </p>
            </div>
            <div className="rounded-lg border bg-accent/50 px-4 py-4">
              <p className="text-sm text-muted-foreground">
                Remaining lifetime limit
              </p>
              <p className="mt-1 text-2xl font-bold">
                {formatCurrency(result.lifetimeRemaining)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
