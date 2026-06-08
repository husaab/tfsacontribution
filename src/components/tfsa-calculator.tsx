"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ResultsHero } from "@/components/calc/results-hero";
import { RoomDonut } from "@/components/calc/room-donut";
import { RangeField } from "@/components/calc/range-field";
import { Bezel } from "@/components/calc/bezel";
import { CalculatorShell } from "@/components/calc/calculator-shell";
import { toast } from "@/components/ui/sonner";
import { formatCurrency } from "@/lib/format";
import { flexMessage } from "@/lib/flex";
import {
  type TFSAMode,
  ASSUMED_NEXT_YEAR_LIMIT,
  CURRENT_YEAR,
  calculateTFSA,
  getCumulativeLimit,
  getEligibilityYear,
} from "@/lib/tfsa";

export function TFSACalculator() {
  const [mode, setMode] = useState<TFSAMode>("birth");
  const [yearValue, setYearValue] = useState(1991);
  const [totalContributions, setTotalContributions] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioCap, setPortfolioCap] = useState(200000);
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
  const clampedPortfolio = Math.min(Math.max(portfolioValue, 0), portfolioCap);
  // Withdrawals are bounded by the account's current value (which can exceed
  // contributions thanks to growth), not by the amount contributed.
  const maxWithdrawalsBefore = clampedPortfolio;
  const clampedWithdrawalsBefore = Math.min(
    withdrawalsBefore2026,
    maxWithdrawalsBefore
  );
  const maxWithdrawalsIn2026 = clampedPortfolio - clampedWithdrawalsBefore;
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
    setPortfolioValue(0);
    setPortfolioCap(200000);
    setWithdrawalsBefore2026(0);
    setWithdrawalsIn2026(0);
  }

  function bumpPortfolioCap() {
    const next = portfolioCap + 200000;
    setPortfolioCap(next);
    toast(flexMessage(next));
  }

  return (
    <CalculatorShell
      results={
        isEligible ? (
        <ResultsHero
          eyebrow="TFSA · 2026"
          kicker="You can still contribute"
          figure={formatCurrency(result.room2026)}
          context={`of your ${formatCurrency(cumulativeLimit)} cumulative room`}
          donut={
            <RoomDonut
              used={clampedContributions}
              limit={cumulativeLimit}
              centerValue={formatCurrency(clampedContributions)}
            />
          }
          stats={[
            {
              label: "Projected · 2027",
              value: formatCurrency(result.room2027),
              accent: true,
              hint: `Assumes ${formatCurrency(ASSUMED_NEXT_YEAR_LIMIT)} annual limit`,
            },
            {
              label: "Contributed to date",
              value: formatCurrency(clampedContributions),
            },
            {
              label: "Current value",
              value: formatCurrency(clampedPortfolio),
            },
          ]}
          recap={{
            eyebrow: "TFSA · 2026",
            kicker: "You can still contribute",
            figure: formatCurrency(result.room2026),
            context: `of your ${formatCurrency(cumulativeLimit)} cumulative room`,
            pct: cumulativeLimit > 0 ? clampedContributions / cumulativeLimit : 0,
            pctLabel: "room used",
            stats: [
              {
                label: "Projected · 2027",
                value: formatCurrency(result.room2027),
                accent: true,
              },
              {
                label: "Contributed to date",
                value: formatCurrency(clampedContributions),
              },
              {
                label: "Current value",
                value: formatCurrency(clampedPortfolio),
              },
            ],
            filename: "tfsa-contribution-room",
          }}
        />
      ) : (
        <ResultsHero
          eyebrow="TFSA"
          kicker="Not eligible yet"
          state="ineligible"
          notice={
            mode === "birth"
              ? `You're under 18 in ${CURRENT_YEAR}. You'll start accumulating contribution room in ${eligibilityYear}.`
              : `Contribution room starts in the year you become a Canadian resident.`
          }
        />
        )
      }
      inputs={
        <Bezel className="rounded-[1.75rem]" innerClassName="rounded-[1.4rem] p-6 sm:p-7">
        <div className="space-y-6">
          {/* Mode selector */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Label className="text-[15px] font-medium text-espresso">
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

          {/* Year slider */}
          <div className="space-y-3">
            <Label htmlFor="year-input" className="text-[15px] font-medium text-espresso">
              {mode === "birth"
                ? "What year were you born in?"
                : "What year did you become a Canadian resident?"}
            </Label>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-1.5">
                <Slider
                  id="year-slider"
                  min={yearMin}
                  max={yearMax}
                  step={1}
                  value={[yearValue]}
                  onValueChange={([v]) => setYearValue(v)}
                  className="[&_[data-slot=slider-track]]:h-2.5 [&_[data-slot=slider-track]]:bg-paper [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-terra-deep [&_[data-slot=slider-range]]:to-terra [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:border-hairline [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_4px_12px_-2px_rgba(110,65,25,0.4)]"
                />
                <div className="flex justify-between text-[11px] text-espresso/45">
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
            <div className="flex items-center justify-between rounded-2xl bg-paper px-4 py-3">
              <span className="text-sm font-medium text-espresso">
                Year when you turned 18
              </span>
              <span className="font-[family-name:var(--font-display)] text-base font-semibold text-terra-deep">
                {yearValue + 18}
              </span>
            </div>
          )}

          {/* Contribution & withdrawal inputs (eligible only) */}
          {isEligible && (
            <>
              <RangeField
                id="contributions"
                label="How much have you contributed to your TFSA in total?"
                value={clampedContributions}
                max={cumulativeLimit}
                onChange={setTotalContributions}
              />
              <RangeField
                id="portfolio-value"
                label="What is your TFSA worth today?"
                subtitle="Include growth — withdrawing the full value restores that much room next year."
                value={clampedPortfolio}
                max={portfolioCap}
                step={1000}
                onBumpMax={bumpPortfolioCap}
                onChange={setPortfolioValue}
              />
              <RangeField
                id="withdrawals-before"
                label={`How much have you withdrawn from your TFSA before ${CURRENT_YEAR}?`}
                value={clampedWithdrawalsBefore}
                max={maxWithdrawalsBefore}
                disabledHint="Enter what your TFSA is worth today first."
                onChange={setWithdrawalsBefore2026}
              />
              <RangeField
                id="withdrawals-current"
                label={`How much have you withdrawn from your TFSA in ${CURRENT_YEAR}?`}
                value={clampedWithdrawalsIn2026}
                max={maxWithdrawalsIn2026}
                disabledHint="Enter what your TFSA is worth today first."
                onChange={setWithdrawalsIn2026}
              />
            </>
          )}
        </div>
        </Bezel>
      }
    />
  );
}
