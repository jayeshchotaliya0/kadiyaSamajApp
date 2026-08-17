"use client";

import Image from "next/image";
import { useState } from "react";

export function ProfileGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-line bg-bg">
        <Image
          src={current}
          alt={`${name} gallery image`}
          fill
          className="object-cover"
          sizes="(max-width:1024px) 100vw, 40vw"
          priority
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={`relative aspect-square overflow-hidden rounded-2xl border ${
              active === index ? "border-secondary ring-2 ring-secondary/30" : "border-line"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image src={image} alt="" fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
