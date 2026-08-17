"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { BadgeCheck, Share2, Heart, Mail, Phone } from "lucide-react";
import { getProfileById, profiles } from "@/data/profiles";
import { ProfileGallery } from "@/components/profile/ProfileGallery";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { WishlistButton } from "@/components/profile/WishlistButton";
import { EmptyState } from "@/components/common/EmptyState";
import { getMatchIndicators } from "@/utils/filters";
import Link from "next/link";

export default function ProfileDetailPage() {
  const params = useParams<{ id: string }>();
  const profile = getProfileById(Number(params.id));
  const [toast, setToast] = useState("");

  const matches = useMemo(() => {
    if (!profile) return [];
    const viewer = profiles.find((p) => p.gender !== profile.gender);
    return getMatchIndicators(profile, viewer?.partnerPreferences);
  }, [profile]);

  if (!profile) {
    return (
      <div className="container-page py-12">
        <EmptyState
          title="Profile not found"
          description="This mock profile does not exist."
          action={
            <Link href="/profiles" className="btn-primary">
              Browse profiles
            </Link>
          }
        />
      </div>
    );
  }

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="container-wide py-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ProfileGallery images={profile.gallery} name={profile.name} />
        <div>
          <div className="surface-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-3xl font-bold">{profile.name}</h1>
                  {profile.verified ? (
                    <span className="badge-verified">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-ink-soft">
                  {profile.age} yrs · {profile.surname} · {profile.city}, {profile.state}
                </p>
              </div>
              <WishlistButton profileId={profile.id} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() => notify("Interest sent (demo)")}
              >
                <Heart className="h-4 w-4" />
                Send Interest
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => notify("Contact request noted (demo)")}
              >
                <Phone className="h-4 w-4" />
                Contact
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => notify("Profile link copied (demo)")}
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => notify(`Email demo: ${profile.email}`)}
              >
                <Mail className="h-4 w-4" />
                Message
              </button>
            </div>
            {toast ? (
              <p className="mt-4 rounded-2xl bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
                {toast}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <ProfileDetails profile={profile} matches={matches} />
          </div>
        </div>
      </div>
    </div>
  );
}
