import Image from "next/image";
import { AudienceSwitcher } from "@/app/components/audience-switcher";
import { ContactForm } from "@/app/components/contact-form";
import { CoverVideo } from "@/app/components/cover-video";
import { SocialIcon } from "@/app/components/social-icon";
import {
  caseStudies,
  processSteps,
  site,
  testimonials,
} from "@/lib/content";

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-t border-rule pt-4">
      <span className="text-xs tracking-widest text-ink-faint">{index}</span>
      <h2 className="text-xs uppercase tracking-[0.2em] text-ink-soft">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  const work = [...caseStudies].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <>
      <main id="top" className="mx-auto w-full max-w-6xl flex-1 px-6">
        {/* Hero */}
        {/* Hugs its content: height is the content plus the 120px padding,
            with no viewport-height floor. */}
        {/* pb 57 + the work section's pt 60 + 3px of heading leading = the
            120px gap under the scroll cue. */}
        <section className="flex flex-col justify-center pb-[57px] pt-[120px]">
          <div>
            <div className="text-left">
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-ink-faint">
                {site.role}
              </p>
              {/*
                Figma spec: 60/72, -0.5px, centred in an 849px frame.
                leading-[1.2] is that 72px at 60px, and keeps a sane ratio at
                the 36px mobile size, which keeps both buttons above the fold.
              */}
              {/* Figma sizing: 64/64, -0.5px, 829px frame — in Instrument
                  Serif, her display face. Mobile keeps 36/42, since 64px
                  would run to six lines at 375. */}
              <h1 className="max-w-[622px] font-display text-4xl leading-[42px] tracking-[-0.5px] sm:text-[64px] sm:leading-[64px]">
                {site.tagline}
              </h1>
              <AudienceSwitcher />

              <div className="mt-8 flex items-center gap-6">
                {/* Secondary: same outlined treatment as the audience pills. */}
                <a
                  href="#contact"
                  className="rounded-full border border-rule px-[23px] py-[11px] text-sm text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
                >
                  Contact me
                </a>
                {/* Primary. */}
                <a
                  href="#contact"
                  className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition-opacity hover:opacity-85"
                >
                  Work with me
                </a>
              </div>

            </div>

            {/* Scroll cue. Sits outside the centred block so it aligns to the
                page's left gutter. A link, not plain text, since a cue you
                can't tap is a tease on a touch screen. */}
            <a
              href="#work"
              className="mt-[84px] inline-flex items-center gap-2 text-xs text-ink-faint transition-colors hover:text-ink-soft"
            >
              Scroll
              <span aria-hidden="true">↓</span>
            </a>
          </div>

        </section>

        {/* 01 Work */}
        {/* 60/60: both gaps around this section come to 120px. */}
        <section id="work" className="scroll-mt-24 py-[60px]">
          {/*
            Scale and centring follow the "LATEST WORK" heading at
            mercyasuquo.framer.website (96px, set solid); the face is her own
            display serif rather than the condensed sans that site uses.
          */}
          <h2 className="mb-10 font-display text-[32px] leading-tight text-ink">
            My Works
          </h2>

          {/*
            A card grid modelled on ajanwachuku.work/home: image first at its
            own aspect ratio, then title and year on one row, then the blurb.
            items-start keeps each card at its natural height rather than
            stretching it to match the tallest card in the row — that's what
            lets covers of different shapes stagger.
          */}
          <div className="grid items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((c) => (
              <article key={c.slug}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View the ${c.title} case study`}
                  className="group block"
                >
                  {c.video && c.cover ? (
                    <CoverVideo
                      src={c.video}
                      poster={c.cover}
                      label={`${c.title} — project preview`}
                    />
                  ) : c.cover ? (
                    <Image
                      src={c.cover}
                      alt={`${c.title} — project snippet`}
                      width={c.coverW ?? 1600}
                      height={c.coverH ?? 1600}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      /* h-auto: the cover keeps its own proportions, which is
                         what lets cards of different shapes stagger. */
                      className="h-auto w-full transition-opacity group-hover:opacity-90"
                    />
                  ) : (
                    /* Shown until a cover lands in /public/work. Square, so it
                       sits neutrally among covers of varying shapes. */
                    <div className="flex aspect-square w-full items-center justify-center border border-dashed border-rule bg-paper-raised">
                      <span className="px-6 text-center font-mono text-xs tracking-widest text-ink-faint">
                        cover image
                        <br />
                        /work/{c.slug}.jpg
                      </span>
                    </div>
                  )}
                </a>

                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl leading-tight">
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {c.title}
                    </a>
                  </h3>
                  <span className="shrink-0 text-sm text-ink-faint">
                    {c.year}
                  </span>
                </div>

                <p className="mt-2 text-base leading-relaxed text-ink-soft">
                  {c.blurb}
                </p>
              </article>
            ))}
          </div>

        </section>

        {/*
          Process. Structured like the reference at abatisamuel.pro — numbered
          rows, name and detail side by side — but as a plain hairline-divided
          list rather than a bordered card, which matches the rest of this page
          (no panels anywhere else on it).
        */}
        <section id="process" className="scroll-mt-24 pb-[120px] pt-[60px]">
          <h2 className="mb-10 font-display text-[32px] leading-tight text-ink">
            My Process
          </h2>

          <ol className="border-t border-rule">
            {processSteps.map((step, i) => (
              <li
                key={step.name}
                className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[3rem_1fr_1.6fr] sm:items-baseline sm:gap-8 sm:py-8"
              >
                <span className="text-sm text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl leading-tight">
                  {step.name}
                </h3>
                <p className="text-base leading-relaxed text-ink-soft">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 04 Testimonials — renders once there are real ones */}
        {testimonials.length > 0 && (
          <section className="scroll-mt-24 py-20">
            <SectionLabel index="03" title="Testimonials" />
            <div className="grid gap-8 sm:grid-cols-2">
              {testimonials.map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-xl border border-rule bg-paper-raised p-8"
                >
                  <p className="font-display text-xl leading-snug">
                    “{t.quote}”
                  </p>
                  <footer className="mt-6 text-sm text-ink-soft">
                    {t.name} · {t.title}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/*
          Contact, following mercyasuquo.framer.website/contact: heading,
          invitation and social marks on the left, the form on the right.
        */}
        <section id="contact" className="scroll-mt-24 pb-[120px] pt-[60px]">
          <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
            <div>
          {/* Availability pill, as on ajanwachuku.work/contact. Driven by
              site.available, so switching it off hides it. */}
          {site.available && (
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-rule px-3.5 py-1.5 text-sm text-ink-soft">
              {/* The dot carries the signal; the chip itself stays neutral so
                  the only green on the page is 6px wide. */}
              <span
                aria-hidden="true"
                className="relative flex h-2 w-2 items-center justify-center"
              >
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-ok" />
              </span>
              {site.availabilityLabel}
            </p>
          )}

          <h2 className="max-w-[720px] font-display text-[48px] leading-[1.05] tracking-[-0.5px] text-ink sm:text-[72px]">
            Let&rsquo;s work together
          </h2>

          <p className="mt-6 max-w-[520px] text-lg leading-[26px] tracking-[-0.5px] text-ink-soft">
            Have a project in mind, a role to discuss, or just want to say hi?
            I&rsquo;m always open to meaningful conversations and new
            opportunities.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block font-display text-2xl text-[#0E6CD0] underline underline-offset-8 sm:text-3xl"
          >
            {site.email}
          </a>

          {/* Same marks as the header, at button size. */}
          <ul className="mt-10 flex flex-wrap gap-3">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink-faint hover:text-accent"
                >
                  <SocialIcon label={social.label} />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink-faint hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
              </a>
            </li>
              </ul>
            </div>

            <ContactForm email={site.email} />
          </div>
        </section>
      </main>
    </>
  );
}
