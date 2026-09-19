import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyToc } from "@/app/components/case-study-toc";
import { ToolLogo } from "@/app/components/tool-logo";
import { caseStudies, site, type CaseStudyBlock } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Only the projects in content.ts have pages; anything else is a 404.
export const dynamicParams = false;

function find(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = find((await params).slug);
  if (!study) return {};
  return {
    title: `${study.title} — ${site.name}`,
    description: study.oneLiner,
  };
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-ink">{children}</dd>
    </div>
  );
}

/** A titled part of the story. Its id is what the side contents list and
 *  the page URL point at. */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-28 first:mt-0">
      <h2 className="font-hero text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

const TEXT = "max-w-[40rem] text-base leading-relaxed text-ink-soft";

function Tick({ yes }: { yes: boolean }) {
  return yes ? (
    <>
      <span aria-hidden="true" className="text-ink">
        ✓
      </span>
      <span className="sr-only">Yes</span>
    </>
  ) : (
    <>
      <span aria-hidden="true" className="text-ink-faint">
        ✕
      </span>
      <span className="sr-only">No</span>
    </>
  );
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "p":
      return <p className={TEXT}>{block.text}</p>;

    case "list":
      // "Unclear vehicle type: it showed taxis…" — a short label before the
      // colon is set in full ink, so the point reads before the detail does.
      return (
        <ul className={`${TEXT} list-disc space-y-2 pl-5 marker:text-ink-faint`}>
          {block.items.map((item) => {
            const at = item.indexOf(":");
            const label = at > 0 && at <= 80 ? item.slice(0, at) : null;
            return (
              <li key={item}>
                {label ? (
                  <>
                    <strong className="font-semibold text-ink">{label}:</strong>
                    {item.slice(at + 1)}
                  </>
                ) : (
                  item
                )}
              </li>
            );
          })}
        </ul>
      );

    case "h3":
      return (
        // pt adds to the list's 20px gap: 48px above a sub-heading.
        <h3 className="pt-7 font-hero text-lg font-bold tracking-[-0.01em] text-ink">
          {block.text}
        </h3>
      );

    case "table":
      // Scrolls sideways on a narrow phone rather than squashing the labels.
      // `relative` keeps the screen-reader-only "Yes"/"No" labels (absolutely
      // positioned) inside the scroll box; otherwise they widen the page.
      return (
        <div className="relative overflow-x-auto rounded-[10px] border border-rule">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-rule bg-paper-raised">
                <th scope="col" className="px-4 py-3 text-left font-semibold text-ink">
                  {block.corner ?? <span className="sr-only">Feature</span>}
                </th>
                {block.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-3 text-center font-semibold text-ink"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.label} className="border-b border-rule last:border-b-0">
                  <th scope="row" className="px-4 py-3 text-left font-normal text-ink-soft">
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td key={i} className="px-4 py-3 text-center text-ink">
                      {typeof value === "string" ? value : <Tick yes={value} />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "images":
      // One image runs full width; two or more sit side by side. Class names
      // are written out whole so Tailwind can find them.
      return (
        <div
          className={`grid gap-4 ${
            block.images.length === 1 && !block.columns
              ? ""
              : block.columns === 4
                ? "grid-cols-2 sm:grid-cols-4"
                : block.columns === 3
                  ? "grid-cols-2 sm:grid-cols-3"
                  : "sm:grid-cols-2"
          }`}
        >
          {block.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              sizes="(max-width: 768px) 100vw, 800px"
              className="lift h-auto w-full rounded-[10px] border border-rule"
            />
          ))}
        </div>
      );

    case "video":
      // A walkthrough to watch, not a background loop: it waits for play,
      // and only its first frame loads until then.
      return (
        <video
          src={block.src}
          poster={block.poster}
          width={block.w}
          height={block.h}
          controls
          muted
          playsInline
          preload="metadata"
          aria-label={block.label}
          className="h-auto w-full rounded-[10px] border border-rule bg-white"
        />
      );
  }
}

/*
  A case study page, after the project pages on luluwangyy.github.io: a side
  panel that stays in view (contents and details) beside the story. Previous
  and next links loop through every project, as designerelo.com's do.

  Every case study follows the same order — Overview, My Role, Project
  Duration, Tools Used, then its own sections — and anything not written yet
  is skipped.
*/
export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = find(slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const sections = study.sections ?? [];

  const contents = [
    study.overview && { id: "overview", title: "Overview" },
    study.role && { id: "role", title: "My Role" },
    study.duration && { id: "duration", title: "Project Duration" },
    study.tools?.length && { id: "tools", title: "Tools Used" },
    ...sections.map(({ id, title }) => ({ id, title })),
  ].filter((item): item is { id: string; title: string } => Boolean(item));

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6">
      {/* The site nav is hidden on this page (see site-header.tsx), so this
          is the way back. It stays in view as you read. */}
      <div className="sticky top-0 z-40 -mx-6 bg-paper/90 px-6 pb-5 pt-10 backdrop-blur">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> Back to work
        </Link>
      </div>

      <div className="grid gap-10 pb-[120px] pt-[40px] md:grid-cols-[1fr_3fr] md:gap-14">
        {/* Side panel. Sticky only beside the content; on phones it's a short
            block above it. The top offset clears the floating nav pill. */}
        <aside className="flex flex-col items-start gap-8 md:sticky md:top-24 md:self-start">
          {contents.length > 0 && (
            // The list is for skimming a long page on a big screen; on a
            // phone it would push the story a screen further down.
            <nav aria-label="In this case study" className="hidden md:block">
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-ink-faint">
                In this case study
              </p>
              <CaseStudyToc sections={contents} />
            </nav>
          )}

          <dl className="grid w-full grid-cols-2 gap-5 md:grid-cols-1">
            <Detail label="Year">{study.year}</Detail>
            <Detail label="Industry">{study.sector}</Detail>
          </dl>

          {study.live && (
            <a
              href={study.live}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm font-semibold text-ink underline underline-offset-4 transition-colors hover:text-accent"
            >
              Visit the live app <span aria-hidden="true">↗</span>
            </a>
          )}
        </aside>

        {/* min-w-0: without it the wide comparison table stretches the grid
            column past a phone's width instead of scrolling inside itself. */}
        <article className="min-w-0">
          <div className="lift aspect-[16/10] overflow-hidden rounded-[10px] border border-rule bg-paper-raised">
            {study.cover ? (
              <Image
                src={study.cover}
                alt={`${study.title} — project mockup`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className={`object-cover ${
                  study.coverPosition === "center" ? "object-center" : "object-top"
                }`}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-mono text-xs tracking-widest text-ink-faint">
                  mockup coming
                </span>
              </div>
            )}
          </div>

          <h1 className="mt-10 font-hero text-[36px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[52px]">
            {study.title}
          </h1>

          {/* Until the written case study exists, the card's description
              stands in for the overview. */}
          {!study.overview && (
            <p className="mt-6 max-w-[40rem] font-hero text-xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-2xl">
              {study.blurb}
            </p>
          )}

          <div className="mt-16">
            {study.overview && (
              <Section id="overview" title="Overview">
                <div className="space-y-4">
                  {study.overview.map((p) => (
                    <p key={p.slice(0, 32)} className={TEXT}>
                      {p}
                    </p>
                  ))}
                </div>
              </Section>
            )}

            {study.role && (
              <Section id="role" title="My Role">
                <div className="space-y-4">
                  {study.role.map((p) => (
                    <p key={p.slice(0, 32)} className={TEXT}>
                      {p}
                    </p>
                  ))}
                </div>
              </Section>
            )}

            {study.duration && (
              <Section id="duration" title="Project Duration">
                <p className="font-hero text-2xl font-medium text-ink">
                  {study.duration.total}
                </p>
                {study.duration.phases.length > 0 && (
                  <ol className="mt-6 max-w-[40rem] border-t border-rule">
                    {study.duration.phases.map((phase) => (
                      <li
                        key={phase.what}
                        className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule py-3 text-base"
                      >
                        <span className="text-ink-faint">{phase.when}</span>
                        <span className="text-ink">{phase.what}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </Section>
            )}

            {study.tools && study.tools.length > 0 && (
              <Section id="tools" title="Tools Used">
                <ul className="flex flex-wrap gap-3">
                  {study.tools.map((tool) => (
                    <li
                      key={tool}
                      className="inline-flex items-center gap-2.5 rounded-full border border-rule px-4 py-2 text-base text-ink"
                    >
                      <ToolLogo
                        name={tool}
                        idPrefix="case"
                        fullColour
                        className="h-4 w-auto text-ink"
                      />
                      {tool}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {sections.map((section) => (
              <Section key={section.id} id={section.id} title={section.title}>
                <div className="space-y-5">
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </Section>
            ))}
          </div>

          <nav
            aria-label="More projects"
            className="mt-24 grid gap-4 border-t border-rule pt-8 sm:grid-cols-2"
          >
            <Link href={`/work/${prev.slug}`} className="group block">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                <span aria-hidden="true">←</span> Previous project
              </span>
              <span className="mt-2 block font-hero text-lg font-bold leading-snug text-ink transition-colors group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
            <Link href={`/work/${next.slug}`} className="group block sm:text-right">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                Next project <span aria-hidden="true">→</span>
              </span>
              <span className="mt-2 block font-hero text-lg font-bold leading-snug text-ink transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          </nav>
        </article>
      </div>
    </main>
  );
}
