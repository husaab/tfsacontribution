import Link from "next/link";
import { Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "TFSA Contribution" },
  { href: "/fhsa", label: "FHSA Contribution" },
  { href: "/rrsp", label: "RRSP Contribution" },
];

export function Footer() {
  return (
    <footer className="mt-16 w-full bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top border accent */}
        <div className="border-t border-white/10" />

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Calculators
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Contact
            </h3>
            <div className="mt-4">
              <a
                href="mailto:info@tfsacontribution.com"
                className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" />
                info@tfsacontribution.com
              </a>
            </div>
          </div>

          {/* About blurb */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              About
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Free calculators to help Canadians understand and maximize their
              registered account contribution room.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5">
          <p className="text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} TFSA Contribution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
