"use client";

import Link from "next/link";
import { StatCard } from "@/components/common/StatCard";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { getFeaturedProfiles, getLatestProfiles } from "@/data/profiles";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const { wishlistIds } = useWishlist();
  const recommended = getFeaturedProfiles("female", 4);
  const latest = getLatestProfiles(4);

  return (
    <div className="container-wide py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="section-title">
            Welcome{user ? `, ${user.name}` : ""}
          </h1>
          <p className="section-subtitle">
            Your member dashboard prototype with static demo metrics.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/my-profile" className="btn-ghost">
            My Profile
          </Link>
          <Link href="/partner-preferences" className="btn-secondary">
            Preferences
          </Link>
          <Link href="/change-password" className="btn-ghost">
            Change Password
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Profile Completion" value="72%" hint="Complete photos & preferences" />
        <StatCard label="Wishlist" value={String(wishlistIds.length)} hint="Saved profiles" />
        <StatCard label="Interests" value="12" hint="Demo received interests" />
        <StatCard label="Profile Views" value="48" hint="Last 30 days (mock)" />
      </div>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-bold">Recommended Matches</h2>
          <Link href="/profiles" className="text-sm font-semibold text-primary">
            View all
          </Link>
        </div>
        <ProfileGrid profiles={recommended} />
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-bold">New Matches</h2>
          <Link href="/wishlist" className="text-sm font-semibold text-primary">
            Open wishlist
          </Link>
        </div>
        <ProfileGrid profiles={latest} />
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5">
          <h3 className="font-display text-lg font-bold">Recently Viewed</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>Neha Kumbhar · Surat</li>
            <li>Isha Kadiya · Vadodara</li>
            <li>Priya Prajapati · Ahmedabad</li>
          </ul>
        </div>
        <div className="surface-card p-5">
          <h3 className="font-display text-lg font-bold">Interests</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>3 new interests waiting</li>
            <li>2 interests accepted</li>
            <li>1 interest pending</li>
          </ul>
        </div>
        <div className="surface-card p-5">
          <h3 className="font-display text-lg font-bold">Partner Preferences</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft">
            Age 24-32 · Gujarat · Graduate+ · Never Married
          </p>
          <Link href="/partner-preferences" className="btn-ghost mt-4">
            Edit preferences
          </Link>
        </div>
      </section>
    </div>
  );
}
