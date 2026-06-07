import { Bezel } from "@/components/calc/bezel";

function EduHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-espresso">
      {children}
    </h3>
  );
}

export function RRSPEducation() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* What is an RRSP */}
      <Bezel innerClassName="p-6">
        <EduHeading>What is an RRSP?</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>
            A{" "}
            <strong className="text-espresso">
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
        </div>
      </Bezel>

      {/* How RRSP Room Works */}
      <Bezel innerClassName="p-6">
        <EduHeading>How RRSP Room Works</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>
            Each year you earn RRSP contribution room equal to{" "}
            <strong className="text-espresso">
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
            at <strong className="text-espresso">1% per month</strong> on the
            excess.
          </p>
        </div>
      </Bezel>

      {/* What is METR */}
      <Bezel innerClassName="p-6">
        <EduHeading>What is METR?</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>
            Most people know their{" "}
            <strong className="text-espresso">marginal tax rate</strong>, the
            percentage of tax they pay on each additional dollar of income based
            on federal and provincial tax brackets. Your{" "}
            <strong className="text-espresso">
              Marginal Effective Tax Rate (METR)
            </strong>{" "}
            goes further: it includes not only income tax, but also the
            reduction in government benefits that happens as your income rises.
          </p>
          <p>
            Several government benefits are{" "}
            <strong className="text-espresso">income-tested</strong>, meaning
            the government gradually reduces (or &quot;claws back&quot;) the
            amount you receive as your income increases. The two biggest ones
            are the{" "}
            <strong className="text-espresso">Canada Child Benefit (CCB)</strong>
            , which can be clawed back at rates of 7% to 23% depending on how
            many children you have, and the{" "}
            <strong className="text-espresso">GST/HST Credit</strong>, which is
            clawed back at 5% above the income threshold. These clawbacks act
            like hidden taxes, for every extra dollar you earn, you lose a
            portion of these benefits on top of the income tax you pay.
          </p>
          <p>
            For example, a family with two children earning $60,000 might have a
            marginal tax rate of 29.65% (federal + provincial), but their METR
            could be <strong className="text-espresso">over 48%</strong> once
            the 13.5% CCB clawback and 5% GST clawback are added in.
          </p>
          <p>
            This matters for RRSP decisions because when you contribute to an
            RRSP, your taxable income drops. This not only{" "}
            <strong className="text-espresso">reduces your income taxes</strong>,
            but also{" "}
            <strong className="text-espresso">
              restores the government benefits
            </strong>{" "}
            that were being clawed back. Your METR captures both effects,
            showing you the true value of each RRSP dollar, which is often
            significantly higher than what a basic tax calculator would suggest.
          </p>
        </div>
      </Bezel>

      {/* RRSP vs TFSA */}
      <Bezel innerClassName="p-6">
        <EduHeading>RRSP vs TFSA</EduHeading>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-espresso/70">
          <p>
            Both RRSPs and TFSAs shelter your investments from tax, but they
            work in opposite ways. Understanding the difference helps you decide
            where each dollar should go.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
              <span>
                <strong className="text-espresso">RRSP:</strong> Contributions
                are tax-deductible now, but withdrawals are taxed as income
                later. This works in your favour when your tax rate today is
                higher than it will be in retirement, you get a bigger deduction
                now and pay less tax when you take the money out.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
              <span>
                <strong className="text-espresso">TFSA:</strong> Contributions
                are made with after-tax dollars (no deduction), but all
                investment growth and withdrawals are completely tax-free
                forever. This makes TFSAs ideal for short and medium-term goals,
                emergency funds, or when you expect to be in the same or higher
                tax bracket in retirement.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
              <span>
                <strong className="text-espresso">METR advantage:</strong> If
                you are in a high METR zone, for example, a family with children
                in the CCB clawback income range, RRSP contributions can be
                especially powerful because they restore clawed-back benefits on
                top of the tax savings. A basic tax calculator would miss this
                extra value entirely.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
              <span>
                <strong className="text-espresso">
                  RRSP withdrawals affect benefits:
                </strong>{" "}
                Keep in mind that RRSP withdrawals in retirement count as
                taxable income, which can reduce income-tested benefits like OAS
                and GIS. TFSA withdrawals do not affect these benefits at all.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
              <span>
                <strong className="text-espresso">General rule:</strong> If you
                are in a lower tax bracket, maximize your TFSA first. When your
                income (and METR) is higher, prioritize your RRSP. Many
                Canadians benefit from contributing to both.
              </span>
            </li>
          </ul>
        </div>
      </Bezel>

      {/* Key Rules */}
      <Bezel className="md:col-span-2" innerClassName="p-6">
        <EduHeading>Key Rules to Remember</EduHeading>
        <ul className="mt-4 grid gap-3 text-sm text-espresso/70 sm:grid-cols-2">
          {[
            "Your annual RRSP room is 18% of last year's earned income, up to the annual maximum, minus any pension adjustment.",
            "Unused contribution room carries forward indefinitely, it never expires.",
            "You have until 60 days after year-end (typically March 1) to make contributions that count for the prior tax year.",
            "Over-contributions beyond the $2,000 lifetime buffer are penalized at 1% per month on the excess.",
            "You must convert your RRSP to a RRIF or annuity by December 31 of the year you turn 71.",
            "Withdrawals are subject to withholding tax and are included in your taxable income for the year.",
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
              {rule}
            </li>
          ))}
        </ul>
      </Bezel>
    </div>
  );
}
