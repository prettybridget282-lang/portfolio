import Image from "next/image";
import type { Metadata } from "next";
import { about, site, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: about.intro,
};

/**
 * Its own route rather than a homepage section, following
 * mercyasuquo.framer.website/about: greeting and intro on the left, circular
 * portrait on the right, then numbered blocks below.
 */
export default function About() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6">
      <section className="pb-[120px] pt-[120px]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <h1 className="font-display text-[48px] leading-[1.05] tracking-[-0.5px] text-ink sm:text-[64px]">
              Hi, I&rsquo;m {site.name.split(" ")[0]}
            </h1>
            <p className="mt-6 max-w-[520px] text-lg leading-[26px] tracking-[-0.5px] text-ink-soft">
              {about.intro}
            </p>
          </div>

          <div className="md:justify-self-end">
            <Image
              src="/portrait.jpg"
              alt={`${site.name}, ${site.role}`}
              width={1080}
              height={1080}
              priority
              sizes="(max-width: 768px) 60vw, 360px"
              className="aspect-square w-48 rounded-full object-cover object-center sm:w-64 md:w-full md:max-w-[360px]"
            />
          </div>
        </div>

        {/*
          Built like the "OUTSIDE THE SCREEN" block on abatisamuel.pro/samuel:
          a small uppercase label, then stacked paragraphs with the last one
          in full ink. The label is Inter rather than his mono, to stay inside
          her two-font rule.
        */}
        <div className="mt-20 max-w-[760px] space-y-16">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-ink-faint">
              {about.heading}
            </h2>
            <div className="mt-6 space-y-5">
              {about.whatIDo.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-lg leading-[26px] tracking-[-0.5px] text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Skills, as on ajanwachuku.work/me: one inline dot-separated row. */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-ink-faint">
              Skills
            </h2>
            <ul className="mt-6 flex flex-wrap items-center gap-y-2 text-base text-ink">
              {skills.map((skill, i, all) => (
                /* The separator trails its own item so a wrapped line never
                   begins with a stray dot. */
                <li key={skill} className="whitespace-nowrap">
                  {skill}
                  {i < all.length - 1 && (
                    <span aria-hidden="true" className="px-3 text-ink-faint">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-ink-faint">
              Outside of design
            </h2>
            {/* Last line in full ink, as the reference does — it's the
                personal one, and it should land hardest. */}
            <p className="mt-6 text-lg leading-[26px] tracking-[-0.5px] text-ink-soft">
              {about.outside[0]}
            </p>
            <p className="mt-5 text-lg leading-[26px] tracking-[-0.5px] text-ink">
              {about.outside[1]}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
