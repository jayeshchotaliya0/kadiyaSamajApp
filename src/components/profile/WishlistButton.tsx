"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/utils/cn";

export function WishlistButton({
  profileId,
  className,
}: {
  profileId: number;
  className?: string;
}) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(profileId);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(profileId);
      }}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/90 text-ink shadow-sm backdrop-blur transition hover:scale-105",
        active && "text-primary",
        className,
      )}
    >
      <Heart className={cn("h-5 w-5", active && "fill-primary")} />
    </motion.button>
  );
}
