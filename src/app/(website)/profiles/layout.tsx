import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Matches",
  description: "Browse Kadiya Kumbhar / Prajapati matrimonial profiles.",
};

export default function ProfilesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
