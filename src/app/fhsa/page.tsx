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
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          FHSA Contribution Room
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find out how much you can contribute to your First Home Savings
          Account.
        </p>
      </div>

      <FHSACalculator />

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Understanding Your FHSA
        </h2>
        <FHSAEducation />
      </section>
    </div>
  );
}
