"use client";

import { useLayoutEffect } from "react";

const STORAGE_KEY = "theme";

export function ThemeToggle() {
  // React's dev-only remount strips the attribute the inline script set.
  // Re-applying here runs before paint; it's a no-op in production.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) document.documentElement.setAttribute("data-theme", saved);
    } catch {
      // localStorage can throw in private mode — the system theme still applies.
    }
  }, []);

  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference just won't survive the next visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className="-mr-1 grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-raised hover:text-ink"
    >
      {/* Moon — shown in light mode */}
      <svg
        className="icon-moon size-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
      </svg>

      {/* Sun — shown in dark mode, optically smaller to match the moon's mass */}
      <svg
        className="icon-sun size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v1.8M12 19.2V21M3 12h1.8M19.2 12H21M5.6 5.6l1.3 1.3M17.1 17.1l1.3 1.3M18.4 5.6l-1.3 1.3M6.9 17.1l-1.3 1.3" />
      </svg>
    </button>
  );
}
