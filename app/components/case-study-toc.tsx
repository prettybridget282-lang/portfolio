"use client";

import { useEffect, useState } from "react";

/**
 * The "In this case study" list in the side panel, with the section being
 * read marked — after the sticky contents on Yueyi Wang's case study pages.
 */
export function CaseStudyToc({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [current, setCurrent] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // Same band as the header nav: whichever section crosses the middle of
    // the viewport is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <ol className="space-y-2.5 border-l border-rule">
      {sections.map((s) => {
        const active = s.id === current;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active ? "true" : undefined}
              onClick={() => setCurrent(s.id)}
              className={`-ml-px block border-l py-0.5 pl-4 text-sm transition-colors ${
                active
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {s.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
