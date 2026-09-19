"use client";

import { useEffect, useRef } from "react";

/**
 * Grows and fades its content into place as it scrolls into view, after the
 * work list on designerelo.com.
 *
 * The server renders content fully visible. Only once this runs does anything
 * below the fold get hidden, so if JavaScript never loads nothing is lost, and
 * what's already on screen never blinks. The styles themselves sit behind a
 * reduced-motion guard in globals.css (.reveal).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger, in ms, so a row of cards arrives one after another. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
