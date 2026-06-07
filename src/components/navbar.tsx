"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "TFSA Contribution" },
  { href: "/fhsa", label: "FHSA Contribution" },
  { href: "/rrsp", label: "RRSP Contribution" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-40 w-full px-4">
      <div className="mx-auto mt-4 flex w-max max-w-full items-center gap-3 rounded-full border border-white/60 bg-white/55 px-3 py-2 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(80,45,20,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)] sm:gap-5 sm:px-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="TFSA Calculator home"
          className="flex items-center pl-1"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/tfsa-logo-official.png"
            alt="TFSA Calculator"
            width={140}
            height={48}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-terra-deep"
                    : "text-espresso/60 hover:text-espresso"
                }`}
              >
                {link.label}
                {isActive && (
                  <div className="mx-auto mt-0.5 h-0.5 w-5 rounded-full bg-terra" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger (morphs to X) */}
        <button
          type="button"
          className="relative h-9 w-9 md:hidden"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-espresso transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-espresso transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-cream/80 backdrop-blur-2xl transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((link, i) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ transitionDelay: mobileMenuOpen ? `${i * 60}ms` : "0ms" }}
              className={`font-[family-name:var(--font-display)] text-3xl font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${isActive ? "text-terra-deep" : "text-espresso/70"}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
