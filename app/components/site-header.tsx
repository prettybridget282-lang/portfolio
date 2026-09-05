"use client";

import { useEffect, useState } from "react";
import { SiteNav } from "@/app/components/site-nav";
import { SocialIcon } from "@/app/components/social-icon";
import { ThemeToggle } from "@/app/components/theme-toggle";

type NavItem = { label: string; href: string };
type Social = { label: string; href: string };

/**
 * Two states, modelled on abatisamuel.pro.
 *
 * At rest it's a full-width row: links at the left gutter, marks at the right.
 * Once the page scrolls it collapses into a centred pill floating over the
 * content.
 *
 * The <header> stays `sticky` rather than switching to `fixed` — sticky keeps
 * its space in the flow, so the page doesn't jump upward the moment the pill
 * appears. Only the inner container restyles.
 */
export function SiteHeader({
  nav,
  socials,
}: {
  nav: NavItem[];
  socials: Social[];
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={
          scrolled
            ? "mx-auto mt-3 flex w-fit items-center gap-6 rounded-full bg-paper-raised px-5 py-3 shadow-sm transition-all duration-300"
            : "mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300"
        }
      >
        <SiteNav items={nav} />

        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="text-ink transition-colors hover:text-accent"
            >
              <SocialIcon label={social.label} />
            </a>
          ))}

          <ThemeToggle />

          <details className="relative sm:hidden">
            <summary className="cursor-pointer list-none text-sm text-ink-soft">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 flex w-40 flex-col gap-3 rounded-lg border border-rule bg-paper-raised p-4 shadow-lg">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  /* Files and off-site links only — internal routes stay in
                     the same tab. */
                  target={item.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={item.href.endsWith(".pdf") ? "noreferrer" : undefined}
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
