import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RRSPEducation() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* What is an RRSP */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What is an RRSP?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            A{" "}
            <strong className="text-foreground">
              Registered Retirement Savings Plan (RRSP)
            </strong>{" "}
            is a Canadian retirement savings account. Contributions are
            tax-deductible, meaning they reduce your taxable income in the year
            you contribute.
          </p>
          <p>
            Investment growth inside the RRSP is tax-sheltered. You only pay tax
            when you withdraw funds, typically in retirement when your income
            (and tax rate) may be lower. This &quot;tax deferral&quot; is one of
            the core benefits of an RRSP.
          </p>
        </CardContent>
      </Card>

      {/* How RRSP Room Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How RRSP Room Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Each year you earn RRSP contribution room equal to{" "}
            <strong className="text-foreground">
              18% of your previous year&apos;s earned income
            </strong>
            , up to the annual maximum ($32,490 for 2025, $33,810 for 2026),
            minus any pension adjustment (PA).
          </p>
          <p>
            Unused room carries forward indefinitely. You can find your current
            RRSP deduction limit on your latest Notice of Assessment from the
            CRA, or by logging into your CRA My Account.
          </p>
          <p>
            Over-contributions exceeding $2,000 above your limit are penalized
            at{" "}
            <strong className="text-foreground">1% per month</strong> on the
            excess.
          </p>
        </CardContent>
      </Card>

      {/* What is METR */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            What is METR?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Most people know their{" "}
            <strong className="text-foreground">marginal tax rate</strong>,
            the percentage of tax they pay on each additional dollar of income
            based on federal and provincial tax brackets. Your{" "}
            <strong className="text-foreground">
              Marginal Effective Tax Rate (METR)
            </strong>{" "}
            goes further: it includes not only income tax, but also the
            reduction in government benefits that happens as your income rises.
          </p>
          <p>
            Several government benefits are{" "}
            <strong className="text-foreground">income-tested</strong>,
            meaning the government gradually reduces (or &quot;claws back&quot;)
            the amount you receive as your income increases. The two biggest
            ones are the{" "}
            <strong className="text-foreground">
              Canada Child Benefit (CCB)
            </strong>
            , which can be clawed back at rates of 7% to 23% depending on how
            many children you have, and the{" "}
            <strong className="text-foreground">GST/HST Credit</strong>, which
            is clawed back at 5% above the income threshold. These clawbacks
            act like hidden taxes, for every extra dollar you earn, you lose
            a portion of these benefits on top of the income tax you pay.
          </p>
          <p>
            For example, a family with two children earning $60,000 might have
            a marginal tax rate of 29.65% (federal + provincial), but their
            METR could be{" "}
            <strong className="text-foreground">over 48%</strong> once the
            13.5% CCB clawback and 5% GST clawback are added in.
          </p>
          <p>
            This matters for RRSP decisions because when you contribute to an
            RRSP, your taxable income drops. This not only{" "}
            <strong className="text-foreground">reduces your income taxes</strong>,
            but also{" "}
            <strong className="text-foreground">
              restores the government benefits
            </strong>{" "}
            that were being clawed back. Your METR captures both effects,
            showing you the true value of each RRSP dollar, which is often
            significantly higher than what a basic tax calculator would suggest.
          </p>
        </CardContent>
      </Card>

      {/* RRSP vs TFSA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">RRSP vs TFSA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Both RRSPs and TFSAs shelter your investments from tax, but they
            work in opposite ways. Understanding the difference helps you
            decide where each dollar should go.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">RRSP:</strong> Contributions
                are tax-deductible now, but withdrawals are taxed as income
                later. This works in your favour when your tax rate today is
                higher than it will be in retirement, you get a bigger
                deduction now and pay less tax when you take the money out.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">TFSA:</strong> Contributions
                are made with after-tax dollars (no deduction), but all
                investment growth and withdrawals are completely tax-free
                forever. This makes TFSAs ideal for short and medium-term
                goals, emergency funds, or when you expect to be in the same
                or higher tax bracket in retirement.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">METR advantage:</strong> If
                you are in a high METR zone, for example, a family with
                children in the CCB clawback income range, RRSP contributions
                can be especially powerful because they restore clawed-back
                benefits on top of the tax savings. A basic tax calculator
                would miss this extra value entirely.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">RRSP withdrawals affect
                benefits:</strong> Keep in mind that RRSP withdrawals in
                retirement count as taxable income, which can reduce
                income-tested benefits like OAS and GIS. TFSA withdrawals do
                not affect these benefits at all.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">General rule:</strong> If
                you are in a lower tax bracket, maximize your TFSA first. When
                your income (and METR) is higher, prioritize your RRSP. Many
                Canadians benefit from contributing to both.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Key Rules */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Key Rules to Remember</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Your annual RRSP room is 18% of last year&apos;s earned income, up
              to the annual maximum, minus any pension adjustment.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Unused contribution room carries forward indefinitely, it never
              expires.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              You have until 60 days after year-end (typically March 1) to make
              contributions that count for the prior tax year.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Over-contributions beyond the $2,000 lifetime buffer are
              penalized at 1% per month on the excess.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              You must convert your RRSP to a RRIF or annuity by December 31
              of the year you turn 71.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Withdrawals are subject to withholding tax and are included in
              your taxable income for the year.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
