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
import { ResultsHero } from "@/components/calc/results-hero";
import { RoomDonut } from "@/components/calc/room-donut";
import { RangeField } from "@/components/calc/range-field";
import { Bezel } from "@/components/calc/bezel";
import { CalculatorShell } from "@/components/calc/calculator-shell";
import { toast } from "@/components/ui/sonner";
import { formatCurrency } from "@/lib/format";
import { flexMessage } from "@/lib/flex";
import {
  calculateFHSA,
  FHSA_ASSUMED_NEXT_YEAR_LIMIT,
  FHSA_CURRENT_YEAR,
  FHSA_LIFETIME_LIMIT,
  FHSA_START_YEAR,
} from "@/lib/fhsa";

export function FHSACalculator() {
  const [yearOpened, setYearOpened] = useState(FHSA_START_YEAR);
  const [contributions, setContributions] = useState<Record<number, number>>({});
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioCap, setPortfolioCap] = useState(100000);
  const [withdrawn, setWithdrawn] = useState(0);

  const result = useMemo(
    () => calculateFHSA(yearOpened, contributions),
    [yearOpened, contributions]
  );

  const clampedPortfolio = Math.min(Math.max(portfolioValue, 0), portfolioCap);
  // Informational only: FHSA withdrawals do not restore contribution room.
  const taxFreeGrowth = Math.max(
    0,
    clampedPortfolio - result.lifetimeContributions
  );

  function handleYearOpenedChange(year: string) {
    setYearOpened(parseInt(year, 10));
    setContributions({});
    setPortfolioValue(0);
    setPortfolioCap(100000);
    setWithdrawn(0);
  }

  function bumpPortfolioCap() {
    const next = portfolioCap + 100000;
    setPortfolioCap(next);
    toast(flexMessage(next));
  }

  function handleContributionChange(year: number, value: number) {
    setContributions((prev) => ({ ...prev, [year]: value }));
  }

  const yearOptions: number[] = [];
  for (let y = FHSA_START_YEAR; y <= FHSA_CURRENT_YEAR; y++) {
    yearOptions.push(y);
  }

  return (
    <CalculatorShell
      results={
        <ResultsHero
        eyebrow="FHSA · 2026"
        kicker="You can still contribute"
        figure={formatCurrency(result.remainingRoom)}
        context="of your $40,000 lifetime limit"
        donut={
          <RoomDonut
            used={result.lifetimeContributions}
            limit={FHSA_LIFETIME_LIMIT}
            label="Lifetime used"
            centerValue={formatCurrency(result.lifetimeContributions)}
          />
        }
        stats={[
          {
            label: "Projected · 2027",
            value: formatCurrency(result.projectedRoomNextYear),
            accent: true,
            hint: `Assumes ${formatCurrency(FHSA_ASSUMED_NEXT_YEAR_LIMIT)} annual limit`,
          },
          {
            label: "Lifetime contributed",
            value: formatCurrency(result.lifetimeContributions),
          },
          {
            label: "Tax-free growth",
            value: formatCurrency(taxFreeGrowth),
          },
        ]}
      />
      }
      inputs={
        <Bezel className="rounded-[1.75rem]" innerClassName="rounded-[1.4rem] p-6 sm:p-7">
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-espresso/60">
            Assumes standard contributions with no over-contributions or taxable
            withdrawals.
          </p>

          {/* Year opened selector */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Label className="text-[15px] font-medium text-espresso">
              What year did you open your first FHSA?
            </Label>
            <Select value={yearOpened.toString()} onValueChange={handleYearOpenedChange}>
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

          {/* Per-year contribution sliders */}
          {result.years.map((detail) => (
            <RangeField
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

          <div className="space-y-6 border-t border-hairline pt-6">
            <RangeField
              id="fhsa-portfolio-value"
              label="What is your FHSA worth today?"
              subtitle="Include growth — gains and qualifying withdrawals are tax-free."
              value={clampedPortfolio}
              max={portfolioCap}
              step={1000}
              onBumpMax={bumpPortfolioCap}
              onChange={setPortfolioValue}
            />
            <RangeField
              id="fhsa-withdrawn"
              label="How much have you withdrawn from your FHSA?"
              value={Math.min(withdrawn, clampedPortfolio)}
              max={clampedPortfolio}
              disabledHint="Enter what your FHSA is worth today first."
              onChange={setWithdrawn}
            />
            <p className="rounded-2xl bg-paper px-4 py-3 text-sm leading-relaxed text-espresso/60">
              Unlike a TFSA, FHSA withdrawals do <strong>not</strong> restore
              contribution room. A qualifying withdrawal to buy a home closes the
              account, and growth never creates new room — so these figures are
              informational only and don&apos;t change your remaining room above.
            </p>
          </div>
        </div>
        </Bezel>
      }
    />
  );
}
