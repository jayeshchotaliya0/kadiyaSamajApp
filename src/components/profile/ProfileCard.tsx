"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { Profile } from "@/types";
import { WishlistButton } from "@/components/profile/WishlistButton";

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="surface-card group overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={profile.image}
          alt={`${profile.name} profile photo`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <div className="absolute right-3 top-3">
          <WishlistButton profileId={profile.id} />
        </div>
        {profile.verified ? (
          <span className="badge-verified absolute left-3 top-3 bg-white/95">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        ) : null}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-display text-lg font-bold">{profile.name}</h3>
          <p className="text-sm text-white/85">
            {profile.age} yrs · {profile.surname}
          </p>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
          <MapPin className="h-4 w-4 text-secondary" />
          {profile.city}, {profile.state}
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-ink-soft">Education</p>
            <p className="font-semibold">{profile.degree}</p>
          </div>
          <div>
            <p className="text-ink-soft">Occupation</p>
            <p className="font-semibold">{profile.occupation}</p>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <Link href={`/profile/${profile.id}`} className="btn-primary flex-1 py-2.5 text-sm">
            View Profile
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
