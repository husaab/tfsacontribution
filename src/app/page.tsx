import { TFSACalculator } from "@/components/tfsa-calculator";
import { TFSAEducation } from "@/components/tfsa-education";

export default function Home() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">TFSA Contribution Room</h1>
        <p className="mt-2 text-muted-foreground">
          Find out how much you can contribute to your Tax-Free Savings Account.
        </p>
      </div>

      <TFSACalculator />

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Understanding Your TFSA
        </h2>
        <TFSAEducation />
      </section>
    </div>
  );
}
