"use client";

import { StatCard } from "@/components/common/StatCard";
import {
  ChartCard,
  DistributionPie,
  RegistrationChart,
} from "@/components/admin/ChartCard";
import { profiles } from "@/data/profiles";

const registration = [
  { month: "Jan", count: 42 },
  { month: "Feb", count: 55 },
  { month: "Mar", count: 61 },
  { month: "Apr", count: 48 },
  { month: "May", count: 70 },
  { month: "Jun", count: 66 },
];

export default function AdminDashboardPage() {
  const men = profiles.filter((p) => p.gender === "male").length;
  const women = profiles.filter((p) => p.gender === "female").length;
  const verified = profiles.filter((p) => p.verified).length;
  const pending = profiles.filter((p) => p.status === "pending").length;
  const active = profiles.filter((p) => p.status === "active").length;

  const ageData = [
    { name: "21-25", value: profiles.filter((p) => p.age <= 25).length },
    { name: "26-30", value: profiles.filter((p) => p.age >= 26 && p.age <= 30).length },
    { name: "31+", value: profiles.filter((p) => p.age >= 31).length },
  ];

  const cityMap = profiles.reduce<Record<string, number>>((acc, p) => {
    acc[p.city] = (acc[p.city] || 0) + 1;
    return acc;
  }, {});
  const cityData = Object.entries(cityMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const occMap = profiles.reduce<Record<string, number>>((acc, p) => {
    acc[p.occupation] = (acc[p.occupation] || 0) + 1;
    return acc;
  }, {});
  const occData = Object.entries(occMap).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-ink-soft">Static demo metrics and charts for the matrimonial platform.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Profiles" value={String(profiles.length)} />
        <StatCard label="Men" value={String(men)} />
        <StatCard label="Women" value={String(women)} />
        <StatCard label="Children" value="5" />
        <StatCard label="Verified Profiles" value={String(verified)} />
        <StatCard label="Pending Profiles" value={String(pending)} />
        <StatCard label="Active Profiles" value={String(active)} />
        <StatCard label="New Registrations" value="18" hint="This week (mock)" />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Registration Overview">
          <RegistrationChart data={registration} />
        </ChartCard>
        <ChartCard title="Men vs Women">
          <DistributionPie data={[{ name: "Men", value: men }, { name: "Women", value: women }]} />
        </ChartCard>
        <ChartCard title="Age Distribution">
          <DistributionPie data={ageData} />
        </ChartCard>
        <ChartCard title="City Distribution">
          <DistributionPie data={cityData} />
        </ChartCard>
        <ChartCard title="Occupation Distribution">
          <DistributionPie data={occData} />
        </ChartCard>
      </div>
    </div>
  );
}
