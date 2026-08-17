import { BRAND } from "@/constants/brand";

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <div className="surface-card max-w-3xl p-8">
        <h1 className="section-title">About {BRAND.name}</h1>
        <p className="section-subtitle">
          {BRAND.name} is a premium matrimonial experience crafted for the{" "}
          {BRAND.community} community. This phase delivers a complete frontend
          prototype focused on elegant design, clear search flows, and a
          trustworthy family-friendly interface.
        </p>
        <div className="mt-8 space-y-4 text-ink-soft leading-8">
          <p>
            Our goal is to help families discover compatible life partners with
            warmth, privacy, and community context — without unnecessary clutter.
          </p>
          <p>
            Branding, layouts, and components are original. Backend, database,
            and authentication will be connected in a later phase.
          </p>
        </div>
      </div>
    </div>
  );
}
