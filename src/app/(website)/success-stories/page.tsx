import type { Metadata } from "next";
import Image from "next/image";
import { successStories } from "@/data/successStories";
import { formatDate } from "@/utils/format";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Community success stories from Prajabandhan members.",
};

export default function SuccessStoriesPage() {
  return (
    <div className="container-wide py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="section-title">Success Stories</h1>
        <p className="section-subtitle">
          Celebrating unions from the Kadiya Kumbhar / Prajapati community.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {successStories.map((story) => (
          <article key={story.id} className="surface-card overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src={story.image}
                alt={`${story.brideName} and ${story.groomName}`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            <div className="space-y-3 p-5">
              <h2 className="font-display text-xl font-bold">
                {story.brideName} & {story.groomName}
              </h2>
              <p className="text-sm leading-7 text-ink-soft">{story.story}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                {formatDate(story.date)} · {story.city}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
