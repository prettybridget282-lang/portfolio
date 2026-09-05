"use client";

import { useRef, useState } from "react";
import { audiences } from "@/lib/content";

export function AudienceSwitcher() {
  const [activeId, setActiveId] = useState(audiences[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = audiences.findIndex((a) => a.id === activeId);
  const active = audiences[activeIndex] ?? audiences[0];

  // Arrow keys move between tabs and take focus with them, which is what
  // screen reader users expect from a tablist.
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;

    event.preventDefault();
    const next = (activeIndex + step + audiences.length) % audiences.length;
    setActiveId(audiences[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Who's reading"
        onKeyDown={handleKeyDown}
        className="flex flex-wrap gap-2"
      >
        {audiences.map((audience, i) => {
          const selected = audience.id === activeId;
          return (
            <button
              key={audience.id}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`audience-tab-${audience.id}`}
              aria-selected={selected}
              aria-controls="audience-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(audience.id)}
              className={
                /*
                  The selected tab used to be solid ink — the same treatment as
                  the primary CTA below it, so the two competed. A soft fill
                  reads as selected without claiming to be the action.
                */
                selected
                  ? "rounded-full border border-rule bg-rule px-3 py-1 text-xs text-ink"
                  : "rounded-full border border-rule px-3 py-1 text-xs text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
              }
            >
              {audience.label}
            </button>
          );
        })}
      </div>

      {/*
        The panel hugs the active paragraph so the gap below it is always 20px.
        The trade-off is that the buttons underneath move when the copy length
        changes between tabs.
      */}
      <div
        role="tabpanel"
        id="audience-panel"
        aria-labelledby={`audience-tab-${active.id}`}
        className="mt-5 max-w-[578px]"
      >
        {/* Figma spec: Inter 18/24, -0.5px, centred in a 578px frame. */}
        <p className="text-lg leading-[26px] tracking-[-0.5px] text-ink-soft">
          {active.body}
        </p>
      </div>
    </div>
  );
}
