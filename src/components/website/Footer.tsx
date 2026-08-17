import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { BRAND, NAV_LINKS } from "@/constants/brand";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-[#102926] text-white">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo light href="/" />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
            {BRAND.tagline}. A premium, community-focused matrimonial experience
            designed for families who value trust, warmth, and belonging.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin/login" className="hover:text-white">
                Admin
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>{BRAND.email}</li>
            <li>{BRAND.phone}</li>
            <li>{BRAND.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/55">
        © {new Date().getFullYear()} {BRAND.name}. Frontend demo prototype.
      </div>
    </footer>
  );
}
