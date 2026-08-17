import type { Profile } from "@/types";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { EmptyState } from "@/components/common/EmptyState";

export function ProfileGrid({ profiles }: { profiles: Profile[] }) {
  if (!profiles.length) {
    return (
      <EmptyState
        title="No profiles found"
        description="Try adjusting filters or search criteria to discover more matches."
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
