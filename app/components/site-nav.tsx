"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { label: string; href: string };

/**
 * The header nav, with the section you're currently reading set in bold.
 *
 * Only same-page anchors can ever be current — a file link like /cv.pdf never
 * is. Each link reserves the width of its own bold text (see .nav-link in
 * globals.css), so the row doesn't shift as the bold moves between items.
 */
export function SiteNav({ items }: { items: NavItem[] }) {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;

    const sections = items
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    // The band is the middle of the viewport: whichever section crosses it is
    // the one being read. Above the first section, nothing is current.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setCurrentId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    // Back at the very top, no section is current.
    const onScroll = () => {
      if (window.scrollY < 80) setCurrentId(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items, onHome]);

  return (
    // After fangming.li: 12px between items, and each item carries 14px of
    // side padding, so the visible gap from one word to the next is 40px.
    <nav className="hidden gap-3 sm:flex">
      {items.map((item) => {
        const isHash = item.href.startsWith("#");
        // Only files and off-site links get a new tab. Internal routes like
        // /about must stay in the same one.
        const opensAway =
          item.href.startsWith("http") || item.href.endsWith(".pdf");
        // A hash link only resolves on the home page; from anywhere else it
        // has to go home first. #contact is the footer, which every page has.
        const href =
          isHash && !onHome && item.href !== "#contact"
            ? `/${item.href}`
            : item.href;

        // On a project page, Work is where you are.
        const isCurrent = isHash
          ? onHome
            ? item.href.slice(1) === currentId
            : item.href === "#work" && pathname.startsWith("/work/")
          : !opensAway && pathname === item.href;

        return (
          <a
            key={item.href}
            href={href}
            data-label={item.label}
            aria-current={isCurrent ? "page" : undefined}
            target={opensAway ? "_blank" : undefined}
            rel={opensAway ? "noreferrer" : undefined}
            onClick={() => {
              if (isHash && onHome) setCurrentId(item.href.slice(1));
            }}
            // 16px Inter in full ink; spacing after fangming.li. Height comes
            // from line-height rather than flex: flex would turn .nav-link's
            // width-reserving ::before into a visible flex item.
            className={`nav-link px-[14px] text-base leading-[44px] text-ink transition-colors hover:text-accent ${
              isCurrent ? "font-semibold" : ""
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
