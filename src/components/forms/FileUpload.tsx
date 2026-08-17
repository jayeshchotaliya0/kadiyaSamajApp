"use client";

import Image from "next/image";
import { ImagePlus, Trash2, Star } from "lucide-react";

export interface UploadItem {
  id: string;
  url: string;
  primary?: boolean;
}

export function FileUpload({
  images,
  onAdd,
  onRemove,
  onSetPrimary,
}: {
  images: UploadItem[];
  onAdd: (files: FileList | null) => void;
  onRemove: (id: string) => void;
  onSetPrimary: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-bg-soft/60 px-6 py-10 text-center transition hover:border-secondary/40">
        <ImagePlus className="mb-3 h-8 w-8 text-secondary" />
        <span className="font-semibold text-ink">Upload photo</span>
        <span className="mt-1 text-sm text-ink-soft">
          JPG or PNG. Frontend preview only.
        </span>
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => onAdd(e.target.files)}
        />
      </label>

      {images.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-2xl border border-line"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.url}
                  alt="Uploaded preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-secondary"
                  onClick={() => onSetPrimary(image.id)}
                >
                  <Star
                    className={`h-3.5 w-3.5 ${image.primary ? "fill-accent text-accent" : ""}`}
                  />
                  {image.primary ? "Primary" : "Set primary"}
                </button>
                <button
                  type="button"
                  className="rounded-full p-1.5 text-danger hover:bg-danger/10"
                  onClick={() => onRemove(image.id)}
                  aria-label="Remove image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
