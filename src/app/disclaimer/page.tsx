import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important information about the calculators and content on TFSA Contribution. The information provided is for general educational purposes only and is not financial advice.",
};

export default function DisclaimerPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Disclaimer"
      intro="The calculators and information on this site are provided for general educational purposes only."
      updated="June 7, 2026"
    >
      <ContentSection heading="Not financial advice">
        <p>
          TFSA Contribution is an educational tool. Nothing on this site
          constitutes financial, investment, tax, legal, or accounting advice,
          and it should not be relied upon as such. We are not a financial
          institution, advisor, or registered representative.
        </p>
        <p>
          Before making any decision about contributing to, withdrawing from, or
          investing within a TFSA, FHSA, RRSP, or any other account, you should
          consult a qualified professional who can consider your personal
          circumstances.
        </p>
      </ContentSection>

      <ContentSection heading="Accuracy of calculations">
        <p>
          Our calculators are based on contribution rules and annual limits
          published by the Canada Revenue Agency (CRA). While we work to keep
          them current and correct, we make no guarantee that results are
          accurate, complete, or applicable to your situation.
        </p>
        <p>
          The official and authoritative record of your contribution room is
          your <strong className="text-espresso">CRA My Account</strong>. Always
          verify your available room with the CRA and your financial institution
          before contributing, to avoid over-contribution penalties.
        </p>
      </ContentSection>

      <ContentSection heading="Limitation of liability">
        <p>
          You use this site at your own risk. To the fullest extent permitted by
          law, we are not liable for any loss or damage arising from your use of,
          or reliance on, the calculators or content provided here, including any
          over-contribution taxes or penalties.
        </p>
      </ContentSection>

      <ContentSection heading="External links">
        <p>
          This site may link to third-party websites for reference. We are not
          responsible for the content or accuracy of external sites.
        </p>
      </ContentSection>

      <ContentSection heading="Questions">
        <p>
          If anything here is unclear, contact us at{" "}
          <a
            href="mailto:info@tfsacontribution.com"
            className="font-medium text-terra-deep underline-offset-2 hover:underline"
          >
            info@tfsacontribution.com
          </a>
          . See also our{" "}
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
