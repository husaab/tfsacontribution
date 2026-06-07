import type { Metadata } from "next";
import { FHSACalculator } from "@/components/fhsa-calculator";
import { FHSAEducation } from "@/components/fhsa-education";

export const metadata: Metadata = {
  title: "FHSA Contribution Room Calculator",
  description:
    "Calculate your First Home Savings Account participation room and carryforward.",
};

export default function FHSAPage() {
  return (
    <div className="space-y-14">
      <FHSACalculator />

      <section>
        <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-espresso">
          Understanding your FHSA
        </h2>
        <FHSAEducation />
      </section>
    </div>
  );
}
