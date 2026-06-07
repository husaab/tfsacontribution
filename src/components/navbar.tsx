"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", short: "TFSA", label: "TFSA Contribution" },
  { href: "/fhsa", short: "FHSA", label: "FHSA Contribution" },
  { href: "/rrsp", short: "RRSP", label: "RRSP Contribution" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 w-full px-4">
      <div className="mx-auto mt-4 flex w-max max-w-full items-center gap-2 rounded-full border border-white/60 bg-white/55 px-3 py-2 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(80,45,20,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)] sm:gap-4 sm:px-4">
        {/* Logo */}
        <Link href="/" aria-label="TFSA Calculator home" className="flex shrink-0 items-center pl-1">
          <Image
            src="/tfsa-logo-official.png"
            alt="TFSA Calculator"
            width={140}
            height={48}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Nav links — short labels on mobile, full labels on desktop */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-300 sm:px-3 ${
                  isActive ? "text-terra-deep" : "text-espresso/60 hover:text-espresso"
                }`}
              >
                <span className="md:hidden">{link.short}</span>
                <span className="hidden md:inline">{link.label}</span>
                {isActive && (
                  <div className="mx-auto mt-0.5 h-0.5 w-5 rounded-full bg-terra" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
