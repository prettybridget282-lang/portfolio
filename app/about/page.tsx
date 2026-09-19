import Image from "next/image";
import type { Metadata } from "next";
import { about, roles, site, skills } from "@/lib/content";

const FLAG = "🇳🇬";

/** Turns any organisation name that has a site (see `roles`) into a link to it. */
function withOrgLinks(text: string) {
  // Case-insensitive: her intro writes "AgriSense", the roles list "Agrisense".
  const lower = text.toLowerCase();
  const linked = roles.filter(
    (role) => role.href && lower.includes(role.org.toLowerCase()),
  );
  if (!linked.length) return text;
  const pattern = new RegExp(`(${linked.map((role) => role.org).join("|")})`, "i");
  return text.split(pattern).map((piece, i) => {
    const role = linked.find((r) => r.org.toLowerCase() === piece.toLowerCase());
    return role ? (
      <a
        key={i}
        href={role.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink underline underline-offset-4 transition-colors hover:text-accent"
      >
        {piece}
      </a>
    ) : (
      piece
    );
  });
}

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  // Search results get the words only, without the flag.
  description: about.intro.replace(` ${FLAG}`, ""),
};

/**
 * The Nigerian flag, drawn rather than typed. Windows has no flag emoji, so
 * 🇳🇬 shows up there as the letters "NG".
 */
function NigeriaFlag() {
  return (
    <svg
      viewBox="0 0 3 2"
      role="img"
      aria-label="Nigerian flag"
      className="mx-0.5 inline-block h-[0.8em] w-auto -translate-y-px rounded-[2px] align-baseline"
    >
      <rect width="3" height="2" fill="#fff" />
      <rect width="1" height="2" fill="#008751" />
      <rect x="2" width="1" height="2" fill="#008751" />
    </svg>
  );
}

/** Fill for each skill sticker, in order. */
const STICKERS = [
  "var(--sticker-1)",
  "var(--sticker-2)",
  "var(--sticker-3)",
  "var(--sticker-4)",
];

/**
 * After the about section on gracedaniyan.com: a label, a big line with one
 * phrase in italic, skills as pastel stickers, and the portrait as a
 * taped polaroid on the right.
 */
export default function About() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6">
      <section className="pb-[120px] pt-[120px]">
        <div className="grid gap-16 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              About me
            </p>
            <h1 className="mt-5 max-w-[18ch] font-hero text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[46px]">
              {about.headline.before}
              <em className="font-medium">{about.headline.accent}</em>
              {about.headline.after}
            </h1>

            <ul className="mt-8 flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <li
                  key={skill}
                  className="sticker rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em]"
                  style={{ background: STICKERS[i % STICKERS.length] }}
                >
                  {skill}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[34rem] text-lg leading-[1.6] text-ink-soft">
              {about.intro.split(FLAG).map((part, i) => (
                <span key={i}>
                  {i > 0 && <NigeriaFlag />}
                  {withOrgLinks(part)}
                </span>
              ))}
            </p>
          </div>

          {/* The polaroid. Its frame is white in both themes, like a print. */}
          <div className="flex justify-center md:col-span-5">
            <figure className="polaroid relative w-full max-w-[290px] bg-white p-3 pb-6">
              <span
                aria-hidden="true"
                className="polaroid-tape -left-7 rotate-[-38deg]"
              />
              <span
                aria-hidden="true"
                className="polaroid-tape -right-7 rotate-[38deg]"
              />
              <Image
                src="/portrait.jpg"
                alt={`${site.name}, ${site.role}`}
                width={1080}
                height={1080}
                priority
                sizes="290px"
                className="aspect-[3/4] w-full object-cover object-center"
              />
              <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#14161c]">
                {site.name.split(" ").slice(0, 2).join(" ")}
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-24 max-w-[760px] space-y-16">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-ink-faint">
              {about.heading}
            </h2>
            <div className="mt-6 space-y-5">
              {about.whatIDo.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-lg leading-[1.6] text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-ink-faint">
              Where I&rsquo;ve worked
            </h2>
            <ul className="mt-6 border-t border-rule">
              {roles.map((role) => (
                <li
                  key={role.org}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
                >
                  {role.href ? (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-hero text-lg font-bold text-ink underline underline-offset-4 transition-colors hover:text-accent"
                    >
                      {role.org}
                    </a>
                  ) : (
                    <span className="font-hero text-lg font-bold text-ink">
                      {role.org}
                    </span>
                  )}
                  <span className="text-base text-ink-soft">
                    {role.title} · {role.place}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-ink-faint">
              Outside of design
            </h2>
            {/* Last line in full ink — it's the personal one, emojis and all,
                and it should land hardest. */}
            <p className="mt-6 text-lg leading-[1.6] text-ink-soft">
              {about.outside[0]}
            </p>
            <p className="mt-5 text-lg leading-[1.6] text-ink">
              {about.outside[1]}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
