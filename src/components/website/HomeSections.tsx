"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Search,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { STATS, WHY_CHOOSE_US } from "@/constants/brand";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { ProfileCard } from "@/components/profile/ProfileCard";
import type { Profile } from "@/types";
import type { SuccessStory } from "@/types";
import { formatDate } from "@/utils/format";

const iconMap = {
  Users,
  BadgeCheck,
  Shield,
  Search,
  HeartHandshake,
  Sparkles,
} as const;

function SectionHeader({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      {href ? (
        <Link href={href} className="btn-ghost self-start">
          View All
        </Link>
      ) : null}
    </div>
  );
}

function ProfileCarousel({ profiles }: { profiles: Profile[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" className="btn-ghost px-3 py-2" onClick={() => scroll(-1)} aria-label="Previous">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" className="btn-ghost px-3 py-2" onClick={() => scroll(1)} aria-label="Next">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scrollbar-thin"
      >
        {profiles.map((profile) => (
          <div key={profile.id} className="w-[280px] shrink-0 snap-start sm:w-[300px]">
            <ProfileCard profile={profile} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeSections({
  featured,
  men,
  women,
  latest,
  stories,
}: {
  featured: Profile[];
  men: Profile[];
  women: Profile[];
  latest: Profile[];
  stories: SuccessStory[];
}) {
  return (
    <>
      <section className="container-wide py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.05 }}
              className="surface-card p-6"
            >
              <p className="font-display text-3xl font-bold text-secondary">{stat.value}</p>
              <p className="mt-2 font-semibold text-ink-soft">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-wide pb-16">
        <SectionHeader
          title="Featured Profiles"
          subtitle="Handpicked community profiles to help you begin your search with confidence."
          href="/profiles"
        />
        <ProfileGrid profiles={featured} />
      </section>

      <section className="bg-bg-soft/70 py-16">
        <div className="container-wide">
          <SectionHeader
            title="Featured Men"
            subtitle="Explore verified and recently active male profiles from the community."
            href="/profiles?gender=male"
          />
          <ProfileCarousel profiles={men} />
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <SectionHeader
            title="Featured Women"
            subtitle="Discover elegant profiles of women looking for a meaningful partnership."
            href="/profiles?gender=female"
          />
          <ProfileCarousel profiles={women} />
        </div>
      </section>

      <section className="container-wide pb-16">
        <SectionHeader
          title="Recently Joined"
          subtitle="Fresh faces from the Kadiya Kumbhar / Prajapati community."
          href="/profiles"
        />
        <ProfileGrid profiles={latest} />
      </section>

      <section className="bg-[#102926] py-16 text-white">
        <div className="container-wide">
          <SectionHeader
            title="Success Stories"
            subtitle="Real community journeys that began with trust, conversation, and shared values."
            href="/success-stories"
          />
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scrollbar-thin">
            {stories.map((story) => (
              <article
                key={story.id}
                className="w-[320px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 sm:w-[360px]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={story.image}
                    alt={`${story.brideName} and ${story.groomName}`}
                    fill
                    className="object-cover"
                    sizes="360px"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="font-display text-xl font-bold">
                    {story.brideName} & {story.groomName}
                  </h3>
                  <p className="text-sm leading-7 text-white/75">{story.story}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    {formatDate(story.date)} · {story.city}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-16">
        <SectionHeader
          title="Why Choose Us"
          subtitle="A premium matrimonial experience shaped around community trust and family comfort."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <motion.article
                key={item.title}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="surface-card p-6"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-ink-soft leading-7">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>
    </>
  );
}
