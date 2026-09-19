import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

/*
  A project card, after vladshumov.com/products: image on top at 16:10, then
  the title and one line. Every card opens the project's own case study page.

  The image slot is sized for the wide Figma mockups she's making. Until one
  exists, the current cover fills it, cropped from the top, and a project with
  no cover shows a quiet placeholder.
*/
export function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="block h-full overflow-hidden rounded-[10px] border border-rule bg-paper-raised transition-colors duration-300 hover:border-ink-faint"
    >
      {/* No lift here — that effect belongs to the images on case study
          pages (.lift in globals.css). */}
      <div className="relative aspect-[16/10] bg-paper">
        {study.cover ? (
          <Image
            src={study.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className={`object-cover ${
              study.coverPosition === "center" ? "object-center" : "object-top"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-xs tracking-widest text-ink-faint">
              mockup coming
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-hero text-xl font-bold leading-snug tracking-[-0.01em] text-ink">
            {study.title}
          </h3>
          <span className="shrink-0 text-sm text-ink-faint">{study.year}</span>
        </div>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          {study.oneLiner}
        </p>
      </div>
    </Link>
  );
}
