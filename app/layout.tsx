import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { InlineScript } from "@/app/components/inline-script";
import { SiteHeader } from "@/app/components/site-header";
import { nav, site } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        {/*
          Runs while the HTML is still parsing, so a saved theme is applied
          before the first paint. With nothing saved, the system theme wins.
        */}
        <InlineScript
          html={`(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`}
        />
      </head>
      {/* Header and footer live here so every route shares them. */}
      <body className="min-h-full flex flex-col">
        <SiteHeader nav={nav} socials={site.socials} />

        {children}

        <footer className="border-t border-rule">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink-soft">
            <p>
              {site.name}, {site.role}. {site.location}.
            </p>
            <ul className="flex gap-6">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
