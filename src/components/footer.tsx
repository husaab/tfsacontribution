import Link from "next/link";
import { Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "TFSA Contribution" },
  { href: "/fhsa", label: "FHSA Contribution" },
  { href: "/rrsp", label: "RRSP Contribution" },
];

export function Footer() {
  return (
    <footer className="relative z-[2] mt-20 w-full bg-gradient-to-b from-espresso to-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/45">
              Calculators
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/45">
              Contact
            </h3>
            <div className="mt-4">
              <a
                href="mailto:info@tfsacontribution.com"
                className="inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
              >
                <Mail className="h-4 w-4 shrink-0" />
                info@tfsacontribution.com
              </a>
            </div>
          </div>

          {/* About blurb */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/45">
              About
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/55">
              Free calculators to help Canadians understand and maximize their
              registered account contribution room.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5">
          <p className="text-center text-xs text-cream/40">
            &copy; {new Date().getFullYear()} TFSA Contribution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
