"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProfileFilter } from "@/components/filters/ProfileFilter";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { SearchBar } from "@/components/common/SearchBar";
import { Pagination } from "@/components/common/Pagination";
import { profiles } from "@/data/profiles";
import { filterProfiles, paginate } from "@/utils/filters";
import type { ProfileFilters } from "@/types";

function ProfilesContent() {
  const searchParams = useSearchParams();
  const initial: ProfileFilters = {
    gender: searchParams.get("gender") || undefined,
    ageFrom: searchParams.get("ageFrom")
      ? Number(searchParams.get("ageFrom"))
      : undefined,
    ageTo: searchParams.get("ageTo")
      ? Number(searchParams.get("ageTo"))
      : undefined,
    city: searchParams.get("city") || undefined,
    state: searchParams.get("state") || undefined,
    occupation: searchParams.get("occupation") || undefined,
  };

  const [filters, setFilters] = useState<ProfileFilters>(initial);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(
    () => filterProfiles(profiles, { ...filters, search }),
    [filters, search],
  );
  const paged = paginate(filtered, page, 12);

  return (
    <div className="container-wide py-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="section-title">Find Matches</h1>
          <p className="section-subtitle">
            Browse {filtered.length} community profiles with instant frontend filters.
          </p>
        </div>
        <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <SearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Search by name, city, occupation..."
          />
          <button
            type="button"
            className="btn-ghost lg:hidden"
            onClick={() => setShowFilters((v) => !v)}
          >
            Filters
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <ProfileFilter
            value={filters}
            onChange={(next) => {
              setFilters(next);
              setPage(1);
            }}
            onReset={() => {
              setFilters({});
              setSearch("");
              setPage(1);
            }}
          />
        </div>
        <div className="space-y-6">
          <ProfileGrid profiles={paged.items} />
          <Pagination page={page} totalPages={paged.totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default function ProfilesPage() {
  return (
    <Suspense fallback={<div className="container-wide py-10">Loading profiles...</div>}>
      <ProfilesContent />
    </Suspense>
  );
}
