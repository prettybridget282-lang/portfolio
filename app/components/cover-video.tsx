"use client";

import { useEffect, useRef } from "react";

/**
 * A silent looping clip in a cover slot. Autoplay only works muted, so the
 * clip carries no audio track at all. Anyone whose OS asks for less motion
 * gets the poster frame held still instead.
 */
export function CoverVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="aspect-[4/3] w-full object-contain transition-opacity group-hover:opacity-90"
    />
  );
}
