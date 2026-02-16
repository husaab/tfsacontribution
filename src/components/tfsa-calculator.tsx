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
  type TFSAMode,
  ASSUMED_NEXT_YEAR_LIMIT,
  CURRENT_YEAR,
  calculateTFSA,
  getCumulativeLimit,
  getEligibilityYear,
} from "@/lib/tfsa";

function formatCurrency(value: number): string {
  return value.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/** A slider + dollar input row that stays synced */
function SliderField({
  label,
  value,
  max,
  onChange,
  id,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
  id: string;
}) {
  const effectiveMax = Math.max(max, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
      </div>
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

export function TFSACalculator() {
  const [mode, setMode] = useState<TFSAMode>("birth");
  const [yearValue, setYearValue] = useState(1991);
  const [totalContributions, setTotalContributions] = useState(0);
  const [withdrawalsBefore2026, setWithdrawalsBefore2026] = useState(0);
  const [withdrawalsIn2026, setWithdrawalsIn2026] = useState(0);

  // Derived values
  const eligibilityYear = useMemo(
    () => getEligibilityYear(mode, yearValue),
    [mode, yearValue]
  );
  const isEligible = eligibilityYear <= CURRENT_YEAR;
  const cumulativeLimit = useMemo(
    () => (isEligible ? getCumulativeLimit(eligibilityYear) : 0),
    [eligibilityYear, isEligible]
  );

  // Clamp dependent fields when maxes change
  const clampedContributions = Math.min(totalContributions, cumulativeLimit);
  const maxWithdrawalsBefore = clampedContributions;
  const clampedWithdrawalsBefore = Math.min(
    withdrawalsBefore2026,
    maxWithdrawalsBefore
  );
  const maxWithdrawalsIn2026 = clampedContributions - clampedWithdrawalsBefore;
  const clampedWithdrawalsIn2026 = Math.min(
    withdrawalsIn2026,
    maxWithdrawalsIn2026
  );

  const result = useMemo(
    () =>
      calculateTFSA({
        mode,
        yearValue,
        totalContributions: clampedContributions,
        withdrawalsBefore2026: clampedWithdrawalsBefore,
        withdrawalsIn2026: clampedWithdrawalsIn2026,
      }),
    [
      mode,
      yearValue,
      clampedContributions,
      clampedWithdrawalsBefore,
      clampedWithdrawalsIn2026,
    ]
  );

  // Year slider config
  const yearMin = mode === "birth" ? 1900 : CURRENT_YEAR - 60;
  const yearMax = CURRENT_YEAR;

  function handleModeChange(newMode: TFSAMode) {
    setMode(newMode);
    setYearValue(newMode === "birth" ? 1991 : CURRENT_YEAR);
    setTotalContributions(0);
    setWithdrawalsBefore2026(0);
    setWithdrawalsIn2026(0);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          TFSA Contribution Room Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate your available TFSA contribution room based on your personal
          details.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode selector */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Label className="text-sm font-medium">
            Use year of birth or year of Canadian residency
          </Label>
          <Select value={mode} onValueChange={handleModeChange}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="birth">Year of birth</SelectItem>
              <SelectItem value="residency">Year of residency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Year slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="year-input" className="text-sm font-medium">
              {mode === "birth"
                ? "What year were you born in?"
                : "What year did you become a Canadian resident?"}
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <Slider
                id="year-slider"
                min={yearMin}
                max={yearMax}
                step={1}
                value={[yearValue]}
                onValueChange={([v]) => setYearValue(v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{yearMin}</span>
                <span>{yearMax}</span>
              </div>
            </div>
            <Input
              id="year-input"
              type="number"
              min={yearMin}
              max={yearMax}
              value={yearValue}
              onChange={(e) => {
                const parsed = parseInt(e.target.value, 10);
                if (!isNaN(parsed)) {
                  setYearValue(Math.min(Math.max(parsed, yearMin), yearMax));
                }
              }}
              className="w-24 text-right"
            />
          </div>
        </div>

        {/* Year turned 18 (birth mode only) */}
        {mode === "birth" && (
          <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
            <span className="text-sm font-medium">Year when you turned 18</span>
            <span className="text-sm font-semibold">
              {yearValue + 18}
            </span>
          </div>
        )}

        {/* Not eligible message */}
        {!isEligible && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {mode === "birth"
              ? `You are not eligible for a TFSA as you are under 18 in ${CURRENT_YEAR}. You will start accumulating room in ${eligibilityYear}.`
              : `You have not yet gained residency. Contribution room starts in the year you become a Canadian resident.`}
          </div>
        )}

        {isEligible && (
          <>
            <Separator />

            {/* Total contributions */}
            <SliderField
              id="contributions"
              label="How much have you contributed to your TFSA in total?"
              value={clampedContributions}
              max={cumulativeLimit}
              onChange={(v) => setTotalContributions(v)}
            />

            {/* Withdrawals before current year */}
            <SliderField
              id="withdrawals-before"
              label={`How much have you withdrawn from your TFSA in total before ${CURRENT_YEAR}?`}
              value={clampedWithdrawalsBefore}
              max={maxWithdrawalsBefore}
              onChange={(v) => setWithdrawalsBefore2026(v)}
            />

            {/* Withdrawals in current year */}
            <SliderField
              id="withdrawals-current"
              label={`How much have you withdrawn from your TFSA in ${CURRENT_YEAR}?`}
              value={clampedWithdrawalsIn2026}
              max={maxWithdrawalsIn2026}
              onChange={(v) => setWithdrawalsIn2026(v)}
            />

            <Separator />

            {/* Results */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Results
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-accent/50 px-4 py-4">
                  <p className="text-sm text-muted-foreground">
                    Contribution room in {CURRENT_YEAR}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {formatCurrency(result.room2026)}
                  </p>
                </div>
                <div className="rounded-lg border bg-accent/50 px-4 py-4">
                  <p className="text-sm text-muted-foreground">
                    Projected room in {CURRENT_YEAR + 1}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {formatCurrency(result.room2027)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Assumes {formatCurrency(ASSUMED_NEXT_YEAR_LIMIT)} annual limit
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
