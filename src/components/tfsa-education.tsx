import { Bezel } from "@/components/calc/bezel";

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

function EduHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-espresso">
      {children}
    </h3>
  );
}

export function TFSAEducation() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* What is a TFSA */}
      <Bezel innerClassName="p-6">
        <EduHeading>What is a TFSA?</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>
            A <strong className="text-espresso">Tax-Free Savings Account (TFSA)</strong> is
            a registered account introduced by the Canadian government in 2009. Any income
            earned within the account, including interest, dividends, and capital gains is
            completely tax-free, even when withdrawn.
          </p>
          <p>
            Unlike an RRSP, contributions to a TFSA are not tax-deductible, but withdrawals
            are never taxed. This makes it one of the most flexible savings vehicles available
            to Canadian residents.
          </p>
        </div>
      </Bezel>

      {/* How contribution room works */}
      <Bezel innerClassName="p-6">
        <EduHeading>How Contribution Room Works</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>
            Contribution room accumulates every year starting from the year you turn 18 (or
            2009, whichever is later), as long as you are a Canadian resident with a valid
            SIN.
          </p>
          <p>
            Unused room carries forward indefinitely. If you withdraw money from your TFSA,
            that amount is added back to your contribution room at the beginning of the
            <strong className="text-espresso"> following calendar year</strong>.
          </p>
          <p>
            Over-contributing results in a penalty tax of 1% per month on the excess amount.
          </p>
        </div>
      </Bezel>

      {/* Annual contribution limits table */}
      <Bezel className="md:col-span-2" innerClassName="p-6">
        <EduHeading>Annual TFSA Contribution Limits</EduHeading>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Annual TFSA contribution limits from 2009 to 2026</caption>
            <thead>
              <tr className="border-b border-hairline">
                <th className="pb-3 text-left font-medium text-espresso/55">Year</th>
                <th className="pb-3 text-right font-medium text-espresso/55">Annual Limit</th>
              </tr>
            </thead>
            <tbody>
              {annualLimits.map((row) => (
                <tr key={row.year} className="border-b border-hairline last:border-0">
                  <td className="py-2.5 text-espresso">{row.year}</td>
                  <td className="py-2.5 text-right font-medium text-espresso">{row.limit}</td>
                </tr>
              ))}
              <tr className="bg-accent">
                <td className="py-2.5 font-semibold text-espresso">Total (2009–2026)</td>
                <td className="py-2.5 text-right font-bold text-terra-deep">$109,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Bezel>

      {/* Key rules */}
      <Bezel className="md:col-span-2" innerClassName="p-6">
        <EduHeading>Key Rules to Remember</EduHeading>
        <ul className="mt-4 grid gap-3 text-sm text-espresso/70 sm:grid-cols-2">
          {[
            "You must be 18 or older and a Canadian resident with a valid SIN to accumulate contribution room.",
            "Unused contribution room carries forward to future years, it never expires.",
            "Withdrawals are added back to your contribution room on January 1 of the next year.",
            "Over-contributions are subject to a 1% per month penalty tax on the excess amount.",
            "Transfers between your own TFSAs do not affect your contribution room.",
            "The annual limit is indexed to inflation and rounded to the nearest $500.",
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
