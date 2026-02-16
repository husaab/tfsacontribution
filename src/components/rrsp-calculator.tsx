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
  calculateRRSP,
  PROVINCES,
  RRSP_ANNUAL_LIMIT,
  type Province,
} from "@/lib/rrsp";

function formatCurrency(value: number): string {
  return value.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatPercent(value: number): string {
  return (value * 100).toFixed(1) + "%";
}

/** A slider + dollar input row that stays synced */
function SliderField({
  label,
  value,
  max,
  onChange,
  id,
  step = 100,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
  id: string;
  step?: number;
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
            step={step}
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

export function RRSPCalculator() {
  const [taxYear, setTaxYear] = useState(2025);
  const [province, setProvince] = useState<Province>("AB");
  const [income, setIncome] = useState(0);
  const [rrspRoom, setRrspRoom] = useState(0);
  const [kidsUnder6, setKidsUnder6] = useState(0);
  const [kids6to17, setKids6to17] = useState(0);
  const [hasSpouse, setHasSpouse] = useState(false);
  const [spouseIncome, setSpouseIncome] = useState(0);

  const result = useMemo(
    () =>
      calculateRRSP({
        taxYear,
        province,
        income,
        rrspRoom,
        kidsUnder6,
        kids6to17,
        hasSpouse,
        spouseIncome: hasSpouse ? spouseIncome : 0,
      }),
    [taxYear, province, income, rrspRoom, kidsUnder6, kids6to17, hasSpouse, spouseIncome]
  );

  const annualLimit = RRSP_ANNUAL_LIMIT[taxYear] ?? 33810;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          RRSP Contribution Optimizer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Instead of using only income tax rates, this calculator uses your
          Marginal Effective Tax Rate (METR), which includes the impact of
          government benefits and tax credits. Enter some basic information to
          see your results.
        </p>
        <p className="text-xs text-muted-foreground">
          Now updated with {taxYear} tax year information. RRSP annual limit:{" "}
          {formatCurrency(annualLimit)}.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tax Year */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Label className="text-sm font-medium">
            Tax Year <span className="text-destructive">*</span>
          </Label>
          <Select
            value={taxYear.toString()}
            onValueChange={(v) => setTaxYear(parseInt(v, 10))}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Province */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Label className="text-sm font-medium">
            Province/Territory <span className="text-destructive">*</span>
          </Label>
          <Select
            value={province}
            onValueChange={(v) => setProvince(v as Province)}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES.map((p) => (
                <SelectItem key={p.code} value={p.code}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Income */}
        <SliderField
          id="income"
          label="Income *"
          value={income}
          max={500000}
          step={1000}
          onChange={setIncome}
        />

        {/* RRSP Room */}
        <SliderField
          id="rrsp-room"
          label="RRSP Room *"
          value={rrspRoom}
          max={200000}
          step={500}
          onChange={setRrspRoom}
        />

        <Separator />

        {/* Kids under 6 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Label className="text-sm font-medium">
            Number of kids 5 and younger
          </Label>
          <Select
            value={kidsUnder6.toString()}
            onValueChange={(v) => setKidsUnder6(parseInt(v, 10))}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kids 6–17 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Label className="text-sm font-medium">
            Number of kids between 6 and 17
          </Label>
          <Select
            value={kids6to17.toString()}
            onValueChange={(v) => setKids6to17(parseInt(v, 10))}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Has Spouse */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Label className="text-sm font-medium">Have a Spouse</Label>
          <Select
            value={hasSpouse ? "yes" : "no"}
            onValueChange={(v) => {
              setHasSpouse(v === "yes");
              if (v === "no") setSpouseIncome(0);
            }}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Spouse Income (conditional) */}
        {hasSpouse && (
          <SliderField
            id="spouse-income"
            label="Spouse Income"
            value={spouseIncome}
            max={500000}
            step={1000}
            onChange={setSpouseIncome}
          />
        )}

        <Separator />

        {/* Results */}
        {income > 0 && rrspRoom > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Results
            </h3>

            {/* Summary cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border bg-accent/50 px-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Maximum Contribution
                </p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  {formatCurrency(result.maxContribution)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Limited by your RRSP room
                </p>
              </div>
              <div className="rounded-lg border bg-accent/50 px-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Total Net Benefit
                </p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  {formatCurrency(result.totalNetBenefit)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  If you contribute {formatCurrency(result.maxContribution)}
                </p>
              </div>
              <div className="rounded-lg border bg-accent/50 px-4 py-4">
                <p className="text-sm text-muted-foreground">Tax Savings</p>
                <p className="mt-1 text-2xl font-bold">
                  {formatCurrency(result.totalTaxSavings)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Federal + Provincial tax reduction
                </p>
              </div>
              <div className="rounded-lg border bg-accent/50 px-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Benefit Increase
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {formatCurrency(result.totalBenefitIncrease)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  CCB + GST/HST credit restoration
                </p>
              </div>
            </div>

            {/* METR Breakdown */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-3">
                Marginal Effective Tax Rate (METR) Breakdown
              </h4>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    METR breakdown for your full RRSP contribution
                  </caption>
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        Component
                      </th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                        Effective Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 text-muted-foreground">
                        Federal Tax Rate
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">
                        {formatPercent(result.metrAtMax.federalRate)}
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 text-muted-foreground">
                        Provincial Tax Rate
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">
                        {formatPercent(result.metrAtMax.provincialRate)}
                      </td>
                    </tr>
                    {(kidsUnder6 > 0 || kids6to17 > 0) && (
                      <tr className="border-b border-border">
                        <td className="px-4 py-2.5 text-muted-foreground">
                          CCB Clawback Rate
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium">
                          {formatPercent(result.metrAtMax.ccbClawbackRate)}
                        </td>
                      </tr>
                    )}
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 text-muted-foreground">
                        GST/HST Credit Clawback
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">
                        {formatPercent(result.metrAtMax.gstClawbackRate)}
                      </td>
                    </tr>
                    <tr className="bg-accent">
                      <td className="px-4 py-2.5 font-semibold">Total METR</td>
                      <td className="px-4 py-2.5 text-right font-bold text-primary">
                        {formatPercent(result.metrAtMax.totalMETR)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* METR across contribution levels */}
            {result.metrBreakdowns.length > 2 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-3">
                  METR at Different Contribution Levels
                </h4>
                <div className="rounded-lg border overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <caption className="sr-only">
                        METR at different RRSP contribution levels
                      </caption>
                      <thead className="sticky top-0 z-10 bg-background shadow-[0_1px_0_0] shadow-border">
                        <tr>
                          <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                            Contribution
                          </th>
                          <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                            Tax Savings
                          </th>
                          <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                            Benefit Increase
                          </th>
                          <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                            Net Benefit
                          </th>
                          <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                            METR
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.metrBreakdowns
                          .filter((_, i) => i % 2 === 0 || i === result.metrBreakdowns.length - 1)
                          .map((b) => (
                            <tr
                              key={b.contribution}
                              className="border-b border-border last:border-0"
                            >
                              <td className="px-4 py-2 text-foreground">
                                {formatCurrency(b.contribution)}
                              </td>
                              <td className="px-4 py-2 text-right font-medium">
                                {formatCurrency(b.taxSavings)}
                              </td>
                              <td className="px-4 py-2 text-right font-medium">
                                {formatCurrency(b.benefitIncrease)}
                              </td>
                              <td className="px-4 py-2 text-right font-medium text-primary">
                                {formatCurrency(b.netBenefit)}
                              </td>
                              <td className="px-4 py-2 text-right font-medium">
                                {formatPercent(b.totalMETR)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prompt if inputs are empty */}
        {(income === 0 || rrspRoom === 0) && (
          <div className="rounded-lg bg-muted px-4 py-6 text-center">
            <p className="text-sm text-muted-foreground">
              Enter your income and RRSP room above to see your optimization
              results.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
