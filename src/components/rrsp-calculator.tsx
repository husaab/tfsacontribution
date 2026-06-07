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
import { formatCurrency, formatPercent } from "@/lib/format";
import {
  calculateRRSP,
  PROVINCES,
  RRSP_ANNUAL_LIMIT,
  type Province,
} from "@/lib/rrsp";

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
  const hasResults = income > 0 && rrspRoom > 0;

  return (
    <div className="space-y-8">
      {hasResults ? (
        <ResultsHero
          eyebrow={`RRSP · ${taxYear}`}
          kicker="Your optimal contribution"
          figure={formatCurrency(result.maxContribution)}
          context="limited by your RRSP room"
          donut={
            <RoomDonut
              used={result.maxContribution}
              limit={rrspRoom}
              label="Room used"
              centerValue={formatCurrency(result.maxContribution)}
            />
          }
          stats={[
            {
              label: "Total net benefit",
              value: formatCurrency(result.totalNetBenefit),
              accent: true,
              hint: `If you contribute ${formatCurrency(result.maxContribution)}`,
            },
            {
              label: "Tax savings",
              value: formatCurrency(result.totalTaxSavings),
            },
            {
              label: "Benefit increase",
              value: formatCurrency(result.totalBenefitIncrease),
            },
          ]}
        />
      ) : (
        <ResultsHero
          eyebrow={`RRSP · ${taxYear}`}
          kicker="Let's optimize your contribution"
          state="empty"
          notice="Enter your income and RRSP room below to see your optimization results, powered by your Marginal Effective Tax Rate (METR)."
        />
      )}

      <Bezel className="rounded-[1.75rem]" innerClassName="rounded-[1.4rem] p-6 sm:p-7">
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-espresso/60">
            This calculator uses your Marginal Effective Tax Rate (METR), which
            includes the impact of government benefits and tax credits. Now updated
            with {taxYear} tax year data — RRSP annual limit {formatCurrency(annualLimit)}.
          </p>

          {/* Tax Year */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Label className="text-[15px] font-medium text-espresso">
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
            <Label className="text-[15px] font-medium text-espresso">
              Province/Territory <span className="text-destructive">*</span>
            </Label>
            <Select value={province} onValueChange={(v) => setProvince(v as Province)}>
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

          {/* Income */}
          <RangeField
            id="income"
            label="Income *"
            value={income}
            max={500000}
            step={1000}
            onChange={setIncome}
          />

          {/* RRSP Room */}
          <RangeField
            id="rrsp-room"
            label="RRSP Room *"
            value={rrspRoom}
            max={200000}
            step={500}
            onChange={setRrspRoom}
          />

          {/* Kids under 6 */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Label className="text-[15px] font-medium text-espresso">
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
            <Label className="text-[15px] font-medium text-espresso">
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

          {/* Has Spouse */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Label className="text-[15px] font-medium text-espresso">Have a Spouse</Label>
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
            <RangeField
              id="spouse-income"
              label="Spouse Income"
              value={spouseIncome}
              max={500000}
              step={1000}
              onChange={setSpouseIncome}
            />
          )}
        </div>
      </Bezel>

      {/* METR breakdown tables */}
      {hasResults && (
        <div className="space-y-6">
          <Bezel
            className="rounded-[1.75rem]"
            innerClassName="rounded-[1.4rem] p-0 overflow-hidden"
          >
            <div className="px-6 pt-5">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-espresso">
                Marginal Effective Tax Rate (METR) Breakdown
              </h3>
            </div>
            <table className="mt-4 w-full text-sm">
              <caption className="sr-only">
                METR breakdown for your full RRSP contribution
              </caption>
              <thead>
                <tr className="border-b border-hairline bg-paper">
                  <th className="px-6 py-3 text-left font-medium text-espresso/55">
                    Component
                  </th>
                  <th className="px-6 py-3 text-right font-medium text-espresso/55">
                    Effective Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-hairline">
                  <td className="px-6 py-3 text-espresso/70">Federal Tax Rate</td>
                  <td className="px-6 py-3 text-right font-medium text-espresso">
                    {formatPercent(result.metrAtMax.federalRate)}
                  </td>
                </tr>
                <tr className="border-b border-hairline">
                  <td className="px-6 py-3 text-espresso/70">Provincial Tax Rate</td>
                  <td className="px-6 py-3 text-right font-medium text-espresso">
                    {formatPercent(result.metrAtMax.provincialRate)}
                  </td>
                </tr>
                {(kidsUnder6 > 0 || kids6to17 > 0) && (
                  <tr className="border-b border-hairline">
                    <td className="px-6 py-3 text-espresso/70">CCB Clawback Rate</td>
                    <td className="px-6 py-3 text-right font-medium text-espresso">
                      {formatPercent(result.metrAtMax.ccbClawbackRate)}
                    </td>
                  </tr>
                )}
                <tr className="border-b border-hairline">
                  <td className="px-6 py-3 text-espresso/70">GST/HST Credit Clawback</td>
                  <td className="px-6 py-3 text-right font-medium text-espresso">
                    {formatPercent(result.metrAtMax.gstClawbackRate)}
                  </td>
                </tr>
                <tr className="bg-accent">
                  <td className="px-6 py-3 font-semibold text-espresso">Total METR</td>
                  <td className="px-6 py-3 text-right font-bold text-terra-deep">
                    {formatPercent(result.metrAtMax.totalMETR)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Bezel>

          {result.metrBreakdowns.length > 2 && (
            <Bezel
              className="rounded-[1.75rem]"
              innerClassName="rounded-[1.4rem] p-0 overflow-hidden"
            >
              <div className="px-6 pt-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-espresso">
                  METR at Different Contribution Levels
                </h3>
              </div>
              <div className="mt-4 max-h-72 overflow-y-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    METR at different RRSP contribution levels
                  </caption>
                  <thead className="sticky top-0 z-10 bg-paper shadow-[0_1px_0_0] shadow-hairline">
                    <tr>
                      <th className="px-5 py-3 text-left font-medium text-espresso/55">
                        Contribution
                      </th>
                      <th className="px-5 py-3 text-right font-medium text-espresso/55">
                        Tax Savings
                      </th>
                      <th className="px-5 py-3 text-right font-medium text-espresso/55">
                        Benefit Increase
                      </th>
                      <th className="px-5 py-3 text-right font-medium text-espresso/55">
                        Net Benefit
                      </th>
                      <th className="px-5 py-3 text-right font-medium text-espresso/55">
                        METR
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.metrBreakdowns
                      .filter(
                        (_, i) =>
                          i % 2 === 0 || i === result.metrBreakdowns.length - 1
                      )
                      .map((b) => (
                        <tr
                          key={b.contribution}
                          className="border-b border-hairline last:border-0"
                        >
                          <td className="px-5 py-2.5 text-espresso">
                            {formatCurrency(b.contribution)}
                          </td>
                          <td className="px-5 py-2.5 text-right font-medium text-espresso">
                            {formatCurrency(b.taxSavings)}
                          </td>
                          <td className="px-5 py-2.5 text-right font-medium text-espresso">
                            {formatCurrency(b.benefitIncrease)}
                          </td>
                          <td className="px-5 py-2.5 text-right font-medium text-terra-deep">
                            {formatCurrency(b.netBenefit)}
                          </td>
                          <td className="px-5 py-2.5 text-right font-medium text-espresso">
                            {formatPercent(b.totalMETR)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Bezel>
          )}
        </div>
      )}
    </div>
  );
}
