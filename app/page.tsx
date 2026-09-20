import { AudienceSwitcher } from "@/app/components/audience-switcher";
import { Reveal } from "@/app/components/reveal";
import { WorkCard } from "@/app/components/work-card";
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
        {/*
          Hero: the statement, what backs it up, and where to go next —
          left-aligned like the rest of the page. Tall enough that the
          first screen holds the hero alone: the viewport less the header,
          which is 76px on phones (just the Menu) and 100px once the nav row
          shows. Each part fades up on load, 80ms after the one before.
        */}
        <section className="flex min-h-[calc(100svh-76px)] flex-col items-start pb-[60px] pt-0 sm:min-h-[calc(100svh-100px)] sm:pt-[48px]">
          {/* Availability tag above the statement, after rueuxdesign.vzy.io:
              a small quiet label with a glowing green dot, no link. */}
          <p
            className="hero-in mb-5 inline-flex items-center gap-2 rounded-full bg-paper-raised px-3 py-1 text-sm text-ink-soft"
            style={{ animationDelay: "0ms" }}
          >
            <span
              aria-hidden="true"
              className="glow-dot size-2 shrink-0 rounded-full bg-ok"
            />
            {site.availabilityLabel}
          </p>
          {/* Her spec at 64/62, nudged up a step to 72/70. -1px letter
              spacing, in an 889px column. Phones are at 44px, where 889px
              can't apply. */}
          <h1
            className="hero-in max-w-[20em] font-hero text-[44px] font-medium leading-[52px] tracking-[-1px] text-ink sm:max-w-[889px] sm:text-[72px] sm:leading-[74px]"
            style={{ animationDelay: "0ms" }}
          >
            {/* In an 889px column the line would run on to "figure", so the
                break after "people" is set here. Phones wrap on their own. */}
            {site.tagline.split(" people ")[0]} people
            <br className="hidden sm:block" />{" "}
            {site.tagline.split(" people ")[1]}
          </h1>

          {/* Her audience tabs, back in the hero: one pitch per visitor, with
              "For anyone" carrying it for everyone who never clicks. */}
          <div className="hero-in" style={{ animationDelay: "80ms" }}>
            <AudienceSwitcher />
          </div>

          {/* Scroll cue, anchored to the bottom of the screen (mt-auto) so
              the empty space reads as deliberate. A link, not plain text,
              since a cue you can't tap is a tease on a touch screen. */}
          <a
            href="#work"
            className="hero-in mt-auto inline-flex items-center gap-2 pt-8 sm:pt-16 text-sm font-semibold text-ink underline underline-offset-4 transition-colors hover:text-accent"
            style={{ animationDelay: "160ms" }}
          >
            Scroll
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-24 py-[60px]">
          <h2 className="mb-10 font-hero text-[32px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[40px]">
            Selected Work
          </h2>

          {/*
            Cards after vladshumov.com/products. items-stretch so every card in
            a row is the same height; each arrives on scroll a beat after the
            one before it.
          */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 90} className="h-full">
                <WorkCard study={c} />
              </Reveal>
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
          <h2 className="mb-10 font-hero text-[32px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[40px]">
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
                <h3 className="font-hero text-2xl font-medium leading-tight tracking-[-0.01em]">
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
                  <p className="font-hero text-xl leading-snug">
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
      </main>
    </>
  );
}
