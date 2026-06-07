import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/content-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "About TFSA Contribution — free, easy-to-understand calculators that help Canadians plan their TFSA, FHSA, and RRSP contribution room.",
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="About"
      title="About TFSA Contribution"
      intro="We build free, clear calculators that help Canadians understand and maximize the contribution room in their registered accounts."
    >
      <ContentSection heading="What we do">
        <p>
          Canada&rsquo;s registered accounts — the TFSA, FHSA, and RRSP — are
          some of the most powerful tools for building tax-advantaged savings,
          but the contribution rules can be confusing. Limits change every year,
          unused room carries forward, and withdrawals affect each account
          differently.
        </p>
        <p>
          Our calculators turn those rules into a simple answer: how much room
          you have, and how it changes year over year. Everything runs in your
          browser, instantly, with no sign-up required.
        </p>
      </ContentSection>

      <ContentSection heading="Our calculators">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link
              href="/"
              className="font-medium text-terra-deep underline-offset-2 hover:underline"
            >
              TFSA Contribution Room Calculator
            </Link>{" "}
            — estimate your Tax-Free Savings Account room from the year you
            turned 18.
          </li>
          <li>
            <Link
              href="/fhsa"
              className="font-medium text-terra-deep underline-offset-2 hover:underline"
            >
              FHSA Contribution Calculator
            </Link>{" "}
            — track your First Home Savings Account participation room and
            carryforward.
          </li>
          <li>
            <Link
              href="/rrsp"
              className="font-medium text-terra-deep underline-offset-2 hover:underline"
            >
              RRSP Contribution Calculator
            </Link>{" "}
            — work out your RRSP deduction limit and contribution headroom.
          </li>
        </ul>
      </ContentSection>

      <ContentSection heading="How we keep it accurate">
        <p>
          Our figures are based on the contribution limits and rules published
          by the Canada Revenue Agency (CRA). We review the calculators when new
          annual limits are announced. That said, the official record of your
          contribution room is always your CRA My Account — we encourage you to
          verify against it before contributing.
        </p>
      </ContentSection>

      <ContentSection heading="Contact us">
        <p>
          Have feedback, found a bug, or have a question? Email us at{" "}
          <a
            href="mailto:info@tfsacontribution.com"
            className="font-medium text-terra-deep underline-offset-2 hover:underline"
          >
            info@tfsacontribution.com
          </a>
          . We read everything.
        </p>
        <p>
          Please also review our{" "}
          <Link
            href="/disclaimer"
            className="font-medium text-terra-deep underline-offset-2 hover:underline"
          >
            disclaimer
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-terra-deep underline-offset-2 hover:underline"
          >
            privacy policy
          </Link>
          .
        </p>
      </ContentSection>
    </ContentPage>
  );
}
