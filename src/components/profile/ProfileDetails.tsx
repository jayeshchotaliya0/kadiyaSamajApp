import type { MatchIndicator, Profile } from "@/types";
import { Check, X } from "lucide-react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DetailGrid({ items }: { items: { label: string; value: string | number }[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-bg/70 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
            {item.label}
          </dt>
          <dd className="mt-1 font-semibold text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProfileDetails({
  profile,
  matches,
}: {
  profile: Profile;
  matches: MatchIndicator[];
}) {
  return (
    <div className="space-y-5">
      <Section title="About Me">
        <p className="leading-7 text-ink-soft">{profile.about}</p>
      </Section>

      <Section title="Personal Details">
        <DetailGrid
          items={[
            { label: "Age", value: profile.age },
            { label: "Height", value: profile.height },
            { label: "Marital Status", value: profile.maritalStatus },
            { label: "Religion", value: profile.religion },
            { label: "Community", value: profile.community },
            { label: "Surname", value: profile.surname },
            { label: "Gotra", value: profile.gotra },
            { label: "Mother Tongue", value: profile.motherTongue },
            { label: "City", value: profile.city },
            { label: "State", value: profile.state },
          ]}
        />
      </Section>

      <Section title="Education & Career">
        <DetailGrid
          items={[
            { label: "Education", value: profile.education },
            { label: "Degree", value: profile.degree },
            { label: "Occupation", value: profile.occupation },
            { label: "Company", value: profile.company },
            { label: "Experience", value: profile.experience },
            { label: "Income", value: profile.income },
          ]}
        />
      </Section>

      <Section title="Family Details">
        <DetailGrid
          items={[
            { label: "Family Type", value: profile.familyType },
            { label: "Father's Occupation", value: profile.fatherOccupation },
            { label: "Mother's Occupation", value: profile.motherOccupation },
            { label: "Brothers", value: profile.brothers },
            { label: "Sisters", value: profile.sisters },
            { label: "Family Status", value: profile.familyStatus },
          ]}
        />
      </Section>

      <Section title="Hobbies & Interests">
        <div className="flex flex-wrap gap-2">
          {profile.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm font-medium"
            >
              {hobby}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Lifestyle">
        <DetailGrid
          items={[
            { label: "Food Preference", value: profile.foodPreference },
            { label: "Smoking", value: profile.smoking },
            { label: "Drinking", value: profile.drinking },
            { label: "Lifestyle", value: profile.lifestyle },
          ]}
        />
      </Section>

      <Section title="Partner Preferences">
        <DetailGrid
          items={[
            {
              label: "Age",
              value: `${profile.partnerPreferences.ageFrom} - ${profile.partnerPreferences.ageTo}`,
            },
            { label: "City", value: profile.partnerPreferences.city || "Any" },
            { label: "State", value: profile.partnerPreferences.state || "Any" },
            {
              label: "Education",
              value: profile.partnerPreferences.education || "Any",
            },
            {
              label: "Occupation",
              value: profile.partnerPreferences.occupation || "Any",
            },
            {
              label: "Marital Status",
              value: profile.partnerPreferences.maritalStatus || "Any",
            },
            {
              label: "Community",
              value: profile.partnerPreferences.community || "Any",
            },
          ]}
        />
        <div className="mt-5 space-y-2">
          <p className="text-sm font-semibold text-ink">Visual matching indicators</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {matches.map((match) => (
              <div
                key={match.label}
                className="flex items-center justify-between rounded-2xl border border-line px-4 py-3"
              >
                <span className="font-medium">{match.label}</span>
                <span
                  className={`inline-flex items-center gap-1 text-sm font-bold ${
                    match.matched ? "text-success" : "text-ink-soft"
                  }`}
                >
                  {match.matched ? (
                    <>
                      <Check className="h-4 w-4" /> Match
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4" /> Partial
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
