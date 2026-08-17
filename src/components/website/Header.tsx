"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Heart } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Drawer } from "@/components/common/Drawer";
import { NAV_LINKS } from "@/constants/brand";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/utils/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition duration-300",
          scrolled
            ? "border-line/80 bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md",
        )}
      >
        <div className="container-wide flex items-center justify-between gap-4 py-3">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:bg-bg hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/wishlist"
              className="btn-ghost px-3 py-2"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="btn-ghost py-2 text-sm">
                  Dashboard
                </Link>
                <button type="button" className="btn-secondary py-2 text-sm" onClick={logoutUser}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost py-2 text-sm">
                  Login
                </Link>
                <Link href="/register" className="btn-primary py-2 text-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/login" className="btn-ghost px-3 py-2 text-sm">
              Login
            </Link>
            <button
              type="button"
              className="btn-ghost px-3 py-2"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <Drawer open={open} onClose={() => setOpen(false)} title="Menu" side="right">
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-3 font-semibold hover:bg-bg"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/wishlist" onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 font-semibold hover:bg-bg">
            Wishlist
          </Link>
          <Link href="/register" onClick={() => setOpen(false)} className="btn-primary mt-3">
            Register
          </Link>
        </nav>
      </Drawer>
    </>
  );
}
