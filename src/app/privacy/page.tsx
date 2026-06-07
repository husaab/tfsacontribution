import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, ContentSection } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TFSA Contribution collects, uses, and protects information, including the use of cookies and third-party advertising.",
};

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains what information we collect when you use tfsacontribution.com, how it is used, and the choices you have."
      updated="June 7, 2026"
    >
      <ContentSection heading="Who we are">
        <p>
          TFSA Contribution (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the
          site&rdquo;) operates the website at{" "}
          <strong className="text-espresso">tfsacontribution.com</strong> and
          provides free calculators that help Canadians estimate their
          registered account contribution room. You can reach us at{" "}
          <a
            href="mailto:info@tfsacontribution.com"
            className="font-medium text-terra-deep underline-offset-2 hover:underline"
          >
            info@tfsacontribution.com
          </a>
          .
        </p>
      </ContentSection>

      <ContentSection heading="Information we collect">
        <p>
          Our calculators run entirely in your browser. The figures you enter
          (such as contribution amounts or birth year) are{" "}
          <strong className="text-espresso">not sent to or stored by us</strong>{" "}
          on a server. We do not require you to create an account, and we do not
          ask for personally identifying information to use the tools.
        </p>
        <p>
          Like most websites, we automatically receive standard technical data
          when you visit, such as your browser type, device, approximate
          region, and the pages you view. This is collected through analytics
          and advertising services described below.
        </p>
      </ContentSection>

      <ContentSection heading="Cookies and similar technologies">
        <p>
          A cookie is a small file stored on your device. We and our service
          providers use cookies and similar technologies to understand how the
          site is used and to serve advertising. You can disable cookies in your
          browser settings, though some features may not work as intended.
        </p>
      </ContentSection>

      <ContentSection heading="Analytics">
        <p>
          We use Vercel Analytics to measure aggregate, anonymized traffic
          (such as page views and visit counts) so we can improve the site.
          This data does not identify you personally.
        </p>
      </ContentSection>

      <ContentSection heading="Advertising and Google AdSense">
        <p>
          We display ads served by Google, including through Google AdSense.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Third-party vendors, including Google, use cookies to serve ads
            based on your prior visits to this and other websites.
          </li>
          <li>
            Google&rsquo;s use of advertising cookies enables it and its
            partners to serve ads to you based on your visit to this site and/or
            other sites on the Internet.
          </li>
          <li>
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-terra-deep underline-offset-2 hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </li>
          <li>
            You can also opt out of third-party vendors&rsquo; use of cookies
            for personalized advertising at{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-terra-deep underline-offset-2 hover:underline"
            >
              aboutads.info
            </a>
            .
          </li>
        </ul>
        <p>
          For more on how Google uses data when you use our partners&rsquo;
          sites or apps, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-terra-deep underline-offset-2 hover:underline"
          >
            Google&rsquo;s privacy &amp; terms
          </a>
          .
        </p>
      </ContentSection>

      <ContentSection heading="Your rights and choices">
        <p>
          Depending on where you live, you may have rights to access or limit
          the processing of your data. Because we do not collect personally
          identifying information ourselves, most choices are controlled through
          your browser settings and the advertising opt-out links above.
        </p>
      </ContentSection>

      <ContentSection heading="Children&rsquo;s privacy">
        <p>
          This site is intended for adults managing their own finances and is
          not directed at children under 13. We do not knowingly collect
          information from children.
        </p>
      </ContentSection>

      <ContentSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be
          reflected by the &ldquo;last updated&rdquo; date above.
        </p>
      </ContentSection>

      <ContentSection heading="Contact">
        <p>
          Questions about this policy can be sent to{" "}
          <a
            href="mailto:info@tfsacontribution.com"
            className="font-medium text-terra-deep underline-offset-2 hover:underline"
          >
            info@tfsacontribution.com
          </a>
          . See also our{" "}
          <Link
            href="/disclaimer"
            className="font-medium text-terra-deep underline-offset-2 hover:underline"
          >
            disclaimer
          </Link>
          .
        </p>
      </ContentSection>
    </ContentPage>
  );
}
