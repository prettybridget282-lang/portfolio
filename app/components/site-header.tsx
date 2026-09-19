"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteNav } from "@/app/components/site-nav";

type NavItem = { label: string; href: string };

/**
 * Two states, modelled on abatisamuel.pro.
 *
 * At rest the links sit at the right gutter.
 * Once the page scrolls it collapses into a centred pill floating over the
 * content.
 *
 * The <header> stays `sticky` rather than switching to `fixed` — sticky keeps
 * its space in the flow, so the page doesn't jump upward the moment the pill
 * appears. Only the inner container restyles.
 *
 * A case study page hides it altogether: there the only way out is "Back to
 * work", so the nav sitting above it was just confusing.
 */
export function SiteHeader({ nav }: { nav: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/work/")) return null;

  return (
    <header className="sticky top-0 z-50">
      <div
        className={
          scrolled
            ? // 28px above the pill, after fangming.li. py-1 rather than py-3
              // because the nav items are now 44px tall themselves; the pill
              // stays about the height it was.
              "mx-auto mt-7 flex w-fit items-center gap-6 rounded-full bg-paper-raised px-5 py-1 shadow-sm transition-all duration-300"
            : // 28px above and below the resting nav, after fangming.li.
              "mx-auto flex max-w-6xl items-center justify-end gap-8 px-6 py-7 transition-all duration-300"
        }
      >
        <SiteNav items={nav} />

        <div className="flex items-center gap-5 sm:hidden">
          <details className="relative">
            <summary className="cursor-pointer list-none text-sm text-ink-soft">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 flex w-40 flex-col gap-3 rounded-lg border border-rule bg-paper-raised p-4 shadow-lg">
              {nav.map((item) => (
                <a
                  key={item.href}
                  // Section links go via the home page, so they also work
                  // from /about and the project pages. #contact is the
                  // footer, which every page has.
                  href={
                    item.href.startsWith("#") && item.href !== "#contact"
                      ? `/${item.href}`
                      : item.href
                  }
                  /* Files and off-site links only — internal routes stay in
                     the same tab. */
                  target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noreferrer" : undefined}
                  className="text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
