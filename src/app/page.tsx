import { TFSACalculator } from "@/components/tfsa-calculator";
import { TFSAEducation } from "@/components/tfsa-education";

export default function Home() {
  return (
    <div className="space-y-14">
      <TFSACalculator />

      <section>
        <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-espresso">
          Understanding your TFSA
        </h2>
        <TFSAEducation />
      </section>
    </div>
  );
}
