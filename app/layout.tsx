import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Caveat, Inter } from "next/font/google";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { ToolTrail } from "@/app/components/tool-trail";
import { nav, site } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// The handwritten asides, like the note beside the work heading — after the
// scribbled notes on sanikasuryawanshi.vercel.app.
const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "600",
});

// Every heading on the site. Satoshi isn't a Google font — it's from Fontshare
// (Indian Type Foundry) under the ITF Free Font License, which permits
// self-hosting; the licence text sits beside the file. The licence forbids
// altering or converting the font, so this is the official variable woff2,
// unmodified. One variable file covers every weight.
const hero = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-hero",
  weight: "300 900",
  display: "swap",
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
      className={`${inter.variable} ${hand.variable} ${hero.variable} h-full antialiased`}
    >
      {/* Header and footer live here so every route shares them. */}
      <body className="min-h-full flex flex-col">
        {/*
          The page itself, on its own panel with big rounded bottom corners.
          The body behind it is black, so the corners curve into the contact
          footer, as on rachelatwork.com. The hairline along the bottom edge
          keeps the curve visible, since the page is already dark.
        */}
        <div className="relative z-10 flex flex-1 flex-col rounded-b-[40px] border-b border-rule bg-paper sm:rounded-b-[64px]">
          <SiteHeader nav={nav} />

          {children}
        </div>

        <SiteFooter />

        <ToolTrail />

        {/* Vercel Web Analytics: visit counts, pages, sources, countries and
            devices, readable only in her Vercel dashboard. Nothing renders. */}
        <Analytics />
      </body>
    </html>
  );
}
