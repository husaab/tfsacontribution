import { Bezel } from "@/components/calc/bezel";

function EduHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-espresso">
      {children}
    </h3>
  );
}

export function FHSAEducation() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* What is an FHSA */}
      <Bezel innerClassName="p-6">
        <EduHeading>What is an FHSA?</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>
            The{" "}
            <strong className="text-espresso">First Home Savings Account (FHSA)</strong>{" "}
            is a registered plan introduced in 2023 that helps Canadians save
            for their first home. It combines the best features of an RRSP and a
            TFSA.
          </p>
          <p>
            Contributions are tax-deductible (like an RRSP), investment growth
            is tax-free, and qualifying withdrawals to purchase your first home
            are also tax-free (like a TFSA).
          </p>
        </div>
      </Bezel>

      {/* How participation room works */}
      <Bezel innerClassName="p-6">
        <EduHeading>How Participation Room Works</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>
            You get <strong className="text-espresso">$8,000</strong> of FHSA
            participation room each year, starting the year you open your first
            FHSA.
          </p>
          <p>
            Unused room carries forward to the next year, but the maximum
            carryforward is <strong className="text-espresso">$8,000</strong>.
            This means the most you can contribute in any single year is{" "}
            <strong className="text-espresso">$16,000</strong>.
          </p>
          <p>
            Your lifetime contribution limit is{" "}
            <strong className="text-espresso">$40,000</strong>.
          </p>
        </div>
      </Bezel>

      {/* Eligibility */}
      <Bezel innerClassName="p-6">
        <EduHeading>Eligibility</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>To open an FHSA, you must:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Be a Canadian resident</li>
            <li>
              Be at least 18 years old (or the age of majority in your province)
            </li>
            <li>
              Be a first-time home buyer, you and your spouse or common-law
              partner must not have owned a qualifying home in the current year
              or the previous 4 calendar years
            </li>
          </ul>
          <p>The FHSA has been available since April 1, 2023.</p>
        </div>
      </Bezel>

      {/* Key rules */}
      <Bezel innerClassName="p-6">
        <EduHeading>Key Rules to Remember</EduHeading>
        <ul className="mt-4 space-y-2 text-sm text-espresso/70">
          {[
            "RRSP transfers to your FHSA count toward your participation room for the year.",
            "Unlike a TFSA, withdrawals do not restore your contribution room.",
            "You can hold multiple FHSAs, but your participation room applies across all of them.",
            "The account must be closed by December 31 of the year you turn 71, or 15 years after opening, whichever comes first.",
            "Unused FHSA savings can be transferred to your RRSP or RRIF tax-free.",
            "Investment income earned inside your FHSA does not affect your participation room.",
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </Bezel>
    </div>
  );
}
