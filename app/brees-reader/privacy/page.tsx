import type { Metadata } from "next";
import { site } from "@/lib/content";

/**
 * Privacy policy for the Bree's Reader Chrome extension.
 *
 * The Chrome Web Store requires a public policy URL for every listing, and it
 * has to match what the extension actually does — so keep this page in step
 * with the extension's permissions if they ever change.
 */

const UPDATED = "24 September 2026";

export const metadata: Metadata = {
  title: `Bree’s Reader privacy policy — ${site.name}`,
  description:
    "What Bree’s Reader, the Chrome extension that reads webpages aloud, does with your data: nothing leaves your computer.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-[0.2em] text-ink-faint">{title}</h2>
      <div className="mt-4 space-y-4 text-lg leading-[1.6] text-ink-soft">{children}</div>
    </section>
  );
}

export default function BreesReaderPrivacy() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6">
      <section className="pb-[120px] pt-[120px]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Bree’s Reader
        </p>
        <h1 className="mt-5 max-w-[20ch] font-hero text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[46px]">
          Privacy policy
        </h1>
        <p className="mt-5 text-sm text-ink-faint">Last updated {UPDATED}</p>

        <div className="mt-16 max-w-[760px] space-y-16">
          <Section title="The short version">
            <p>
              Bree’s Reader reads webpages aloud. It collects nothing, sends nothing anywhere, and
              has no accounts, no servers and no analytics. Everything happens on your own computer.
            </p>
          </Section>

          <Section title="What the extension reads">
            <p>
              When you click the Bree’s Reader icon on a page, it reads that page’s text so it can
              speak it. That text is handed straight to the speech voices built into your computer.
              It is never uploaded, stored or shared.
            </p>
            <p>
              The extension only has access to a page after you click its icon on that page. It does
              not run in the background on sites you visit, and it deliberately does nothing at all
              on social media and messaging sites.
            </p>
          </Section>

          <Section title="What it remembers">
            <p>
              Two preferences are saved on your computer using Chrome’s own extension storage: the
              voice you picked and the speed you picked. Nothing else is kept, and neither is sent
              anywhere. Removing the extension removes them.
            </p>
          </Section>

          <Section title="The voices">
            <p>
              Speech comes from the voices installed in Chrome and in your operating system. Some of
              those voices are made by Google or Microsoft and work over the internet, which means
              the sentence being spoken is sent to that voice’s provider by your browser, under
              their privacy policy rather than this one. Voices marked as offline never leave your
              machine. You can choose which voice to use at any time.
            </p>
          </Section>

          <Section title="What it never does">
            <p>
              No accounts. No sign-in. No advertising. No trackers or analytics of any kind. Your
              browsing history, your page content and your preferences are never collected, sold or
              shared with anyone, including me.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Bree’s Reader is a reading tool suitable for general audiences. Because it collects no
              personal information from anyone, it collects none from children either.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If the extension ever gains a feature that handles data differently, this page will be
              updated before that feature ships, and the date at the top will change.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about the extension or this policy:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline underline-offset-4 transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}
