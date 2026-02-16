import type { Metadata } from "next";
import { RRSPCalculator } from "@/components/rrsp-calculator";
import { RRSPEducation } from "@/components/rrsp-education";

export const metadata: Metadata = {
  title: "RRSP Contribution Optimizer",
  description:
    "Find the optimal RRSP contribution based on your Marginal Effective Tax Rate (METR). Includes federal and provincial tax rates plus benefit clawbacks.",
};

export default function RRSPPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          RRSP Contribution Optimizer
        </h1>
        <p className="mt-2 text-muted-foreground">
          An RRSP Calculator giving Canadians new insights to make better RRSP
          contribution decisions. Instead of using only income tax rates, this
          calculator uses your Marginal Effective Tax Rate (METR), which
          includes the impact of government benefits and tax credits.
        </p>
      </div>

      <RRSPCalculator />

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Understanding RRSPs and METR
        </h2>
        <RRSPEducation />
      </section>
    </div>
  );
}
