"use client";

import Link from "next/link";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { useWishlist } from "@/contexts/WishlistContext";
import { profiles } from "@/data/profiles";

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const wishlisted = profiles.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="container-wide py-10">
      <div className="mb-8">
        <h1 className="section-title">Wishlist</h1>
        <p className="section-subtitle">
          Saved profiles persist in localStorage for this browser demo.
        </p>
      </div>

      {!wishlisted.length ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Tap the heart icon on any profile card to save it here."
          action={
            <Link href="/profiles" className="btn-primary">
              Find Matches
            </Link>
          }
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {wishlisted.map((profile) => (
              <button
                key={profile.id}
                type="button"
                className="btn-ghost text-sm"
                onClick={() => removeFromWishlist(profile.id)}
              >
                Remove {profile.name.split(" ")[0]}
              </button>
            ))}
          </div>
          <ProfileGrid profiles={wishlisted} />
        </div>
      )}
    </div>
  );
}
