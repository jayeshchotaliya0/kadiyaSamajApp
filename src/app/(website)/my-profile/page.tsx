"use client";

import { profiles } from "@/data/profiles";
import { ProfileGallery } from "@/components/profile/ProfileGallery";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { getMatchIndicators } from "@/utils/filters";

export default function MyProfilePage() {
  const profile = profiles[0];
  const matches = getMatchIndicators(profile);

  return (
    <div className="container-wide py-10">
      <div className="mb-8">
        <h1 className="section-title">My Profile</h1>
        <p className="section-subtitle">
          Preview of your biodata layout using mock member data.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ProfileGallery images={profile.gallery} name={profile.name} />
        <ProfileDetails profile={profile} matches={matches} />
      </div>
    </div>
  );
}
