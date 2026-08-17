"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SearchForm } from "@/components/website/SearchForm";
import { BRAND } from "@/constants/brand";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.svg"
          alt="Prajabandhan matrimonial hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#083532]/94 via-[#0e5c56]/78 to-[#7f1538]/72" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="container-wide relative flex min-h-[min(92vh,900px)] flex-col justify-center gap-10 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center text-white"
        >
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
            {BRAND.name}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Find Your Perfect Life Partner
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
            Discover trusted matrimonial profiles from the Kadiya Kumbhar /
            Prajapati community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="mx-auto w-full max-w-5xl"
        >
          <SearchForm />
        </motion.div>
      </div>
    </section>
  );
}
