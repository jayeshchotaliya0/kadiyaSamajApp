import type { Metadata } from "next";
import { HeroSection } from "@/components/website/HeroSection";
import { HomeSections } from "@/components/website/HomeSections";
import {
  getFeaturedProfiles,
  getLatestProfiles,
} from "@/data/profiles";
import { successStories } from "@/data/successStories";
import { BRAND } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Home",
  description: BRAND.tagline,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeSections
        featured={getFeaturedProfiles(undefined, 8)}
        men={getFeaturedProfiles("male", 10)}
        women={getFeaturedProfiles("female", 10)}
        latest={getLatestProfiles(8)}
        stories={successStories}
      />
    </>
  );
}
