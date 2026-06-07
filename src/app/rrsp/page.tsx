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
    <div className="space-y-14">
      <RRSPCalculator />

      <section>
        <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-espresso">
          Understanding RRSPs and METR
        </h2>
        <RRSPEducation />
      </section>
    </div>
  );
}
