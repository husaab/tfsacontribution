import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FHSAEducation() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* What is an FHSA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What is an FHSA?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            The{" "}
            <strong className="text-foreground">
              First Home Savings Account (FHSA)
            </strong>{" "}
            is a registered plan introduced in 2023 that helps Canadians save
            for their first home. It combines the best features of an RRSP and a
            TFSA.
          </p>
          <p>
            Contributions are tax-deductible (like an RRSP), investment growth
            is tax-free, and qualifying withdrawals to purchase your first home
            are also tax-free (like a TFSA).
          </p>
        </CardContent>
      </Card>

      {/* How participation room works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            How Participation Room Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            You get <strong className="text-foreground">$8,000</strong> of FHSA
            participation room each year, starting the year you open your first
            FHSA.
          </p>
          <p>
            Unused room carries forward to the next year, but the maximum
            carryforward is{" "}
            <strong className="text-foreground">$8,000</strong>. This means the
            most you can contribute in any single year is{" "}
            <strong className="text-foreground">$16,000</strong>.
          </p>
          <p>
            Your lifetime contribution limit is{" "}
            <strong className="text-foreground">$40,000</strong>.
          </p>
        </CardContent>
      </Card>

      {/* Eligibility */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Eligibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>To open an FHSA, you must:</p>
          <ul className="list-disc pl-5 space-y-1">
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
        </CardContent>
      </Card>

      {/* Key rules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Rules to Remember</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "RRSP transfers to your FHSA count toward your participation room for the year.",
              "Unlike a TFSA, withdrawals do not restore your contribution room.",
              "You can hold multiple FHSAs, but your participation room applies across all of them.",
              "The account must be closed by December 31 of the year you turn 71, or 15 years after opening, whichever comes first.",
              "Unused FHSA savings can be transferred to your RRSP or RRIF tax-free.",
              "Investment income earned inside your FHSA does not affect your participation room.",
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
