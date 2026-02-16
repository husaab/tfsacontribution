import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const annualLimits = [
  { year: "2009", limit: "$5,000" },
  { year: "2010", limit: "$5,000" },
  { year: "2011", limit: "$5,000" },
  { year: "2012", limit: "$5,000" },
  { year: "2013", limit: "$5,500" },
  { year: "2014", limit: "$5,500" },
  { year: "2015", limit: "$10,000" },
  { year: "2016", limit: "$5,500" },
  { year: "2017", limit: "$5,500" },
  { year: "2018", limit: "$5,500" },
  { year: "2019", limit: "$6,000" },
  { year: "2020", limit: "$6,000" },
  { year: "2021", limit: "$6,000" },
  { year: "2022", limit: "$6,000" },
  { year: "2023", limit: "$6,500" },
  { year: "2024", limit: "$7,000" },
  { year: "2025", limit: "$7,000" },
  { year: "2026", limit: "$7,000" },
];

export function TFSAEducation() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* What is a TFSA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What is a TFSA?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            A <strong className="text-foreground">Tax-Free Savings Account (TFSA)</strong> is
            a registered account introduced by the Canadian government in 2009. Any income
            earned within the account, including interest, dividends, and capital gains is
            completely tax-free, even when withdrawn.
          </p>
          <p>
            Unlike an RRSP, contributions to a TFSA are not tax-deductible, but withdrawals
            are never taxed. This makes it one of the most flexible savings vehicles available
            to Canadian residents.
          </p>
        </CardContent>
      </Card>

      {/* How contribution room works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Contribution Room Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Contribution room accumulates every year starting from the year you turn 18 (or
            2009, whichever is later), as long as you are a Canadian resident with a valid
            SIN.
          </p>
          <p>
            Unused room carries forward indefinitely. If you withdraw money from your TFSA,
            that amount is added back to your contribution room at the beginning of the
            <strong className="text-foreground"> following calendar year</strong>.
          </p>
          <p>
            Over-contributing results in a penalty tax of 1% per month on the excess amount.
          </p>
        </CardContent>
      </Card>

      {/* Annual contribution limits table */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Annual TFSA Contribution Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">Annual TFSA contribution limits from 2009 to 2026</caption>
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left font-medium text-muted-foreground">Year</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">Annual Limit</th>
                </tr>
              </thead>
              <tbody>
                {annualLimits.map((row) => (
                  <tr key={row.year} className="border-b border-border last:border-0">
                    <td className="py-2.5 text-foreground">{row.year}</td>
                    <td className="py-2.5 text-right font-medium text-foreground">{row.limit}</td>
                  </tr>
                ))}
                <tr className="bg-accent">
                  <td className="py-2.5 font-semibold text-foreground">Total (2009–2026)</td>
                  <td className="py-2.5 text-right font-bold text-primary">$109,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key rules */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Key Rules to Remember</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              You must be 18 or older and a Canadian resident with a valid SIN to accumulate
              contribution room.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Unused contribution room carries forward to future years, it never expires.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Withdrawals are added back to your contribution room on January 1 of the next
              year.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Over-contributions are subject to a 1% per month penalty tax on the excess
              amount.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Transfers between your own TFSAs do not affect your contribution room.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              The annual limit is indexed to inflation and rounded to the nearest $500.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
