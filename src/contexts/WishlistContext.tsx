"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface WishlistContextValue {
  wishlistIds: number[];
  isWishlisted: (id: number) => boolean;
  toggleWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "prajabandhan-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWishlistIds(JSON.parse(raw) as number[]);
    } catch {
      setWishlistIds([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds, hydrated]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setWishlistIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const isWishlisted = useCallback(
    (id: number) => wishlistIds.includes(id),
    [wishlistIds],
  );

  const value = useMemo(
    () => ({ wishlistIds, isWishlisted, toggleWishlist, removeFromWishlist }),
    [wishlistIds, isWishlisted, toggleWishlist, removeFromWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
