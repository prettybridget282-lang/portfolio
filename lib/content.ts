// Everything on the site reads from this file.
// Change copy here — no need to touch the page components.

export const site = {
  name: "Bridget Monday",
  role: "Product Designer and Design Engineer",
  tagline:
    "I design products people figure out on the first try and come back to.",
  location: "Nigeria",
  email: "bridgetmondayburabari@gmail.com",
  /* Flip to false when you stop taking work — the pill hides itself. */
  available: true,
  availabilityLabel: "Available for work",
  socials: [
    { label: "Behance", href: "https://www.behance.net/bridgetmonday282" },
    { label: "X", href: "https://x.com/" }, // TODO: your handle
    { label: "LinkedIn", href: "https://linkedin.com/in/" }, // TODO
  ],
}

// Header nav. Hash links scroll within the home page; "/about" is its own
// route, so it's matched by pathname instead.
export const nav = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Me", href: "/about" },
  { label: "CV", href: "/cv.pdf" },
  { label: "Contact", href: "#contact" },
]

// Named fields rather than an indexed array — the sections on /about read
// from these directly, so reordering copy can't silently move a paragraph
// into the wrong section.
export const about = {
  heading: "What I do",
  /** The paragraph beside the portrait. */
  intro:
    "I'm a product designer with 2+ years designing digital products that balance user research, strategic thinking, and interfaces people don't have to think about. I've worked as a Product Design Facilitator at Scopevale and a Product Designer at Agrisense Technologies.",
  whatIDo: [
    "I design digital products that work for both people and the business behind them.",
    "I turn complex problems into clear, intuitive experiences that help users accomplish what they need while supporting business goals like conversion, retention, and growth.",
    "From research and user flows to UI design, prototyping, and development, I work across the product to create experiences that are useful, measurable, and built to deliver value.",
  ],
  outside: [
    "I write for product designers about AI tools, focusing on how to use generative tools to create UI that aligns with existing design systems and identifying which tools are worth the investment of time.",
    "Beyond that, I love shopping🛍️, cooking👩🏾‍🍳, and spending quality time with my loved ones🤗",
  ],
}

// Straight from her CV — don't add anything she hasn't listed there.
export const skills: string[] = [
  "UX Research",
  "UI/UX Design",
  "Prototyping",
  "Product Development",
]

// Only put numbers here you can back up.
export const record: { value: string; label: string }[] = [
  { value: "2+ yrs", label: "Designing digital products" },
  { value: "6", label: "Published case studies" },
  { value: "2", label: "Product teams worked with" },
]

export const roles: { title: string; org: string; place: string }[] = [
  { title: "Product Design Facilitator", org: "Scopevale", place: "Nigeria" },
  { title: "Product Designer", org: "Agrisense Technologies", place: "Kenya" },
]

// The hero pitch, rewritten per visitor. The first entry is the default —
// it has to carry the whole pitch on its own, since most people never click.
export type Audience = {
  id: string
  label: string
  body: string
}

export const audiences: Audience[] = [
  {
    id: "anyone",
    label: "For anyone",
    body: "I design apps. Before anyone builds one, I decide what every screen looks like and what happens when you tap or interact with things in the app",
  },
  {
    id: "founders",
    label: "Founders",
    body: "No jargon, just screens. You'll know what changes cost before you approve them, and your developer gets buildable files.",
  },
  {
    id: "recruiters",
    label: "Recruiters",
    body: "I'm a Product Designer with 2+ years' experience creating intuitive mobile and web products through research, UX, UI, prototyping, and developer collaboration.",
  },
  {
    id: "developers",
    label: "Developers",
    body: "I hand over screens you can build from: empty, loading and error states, named components, not just the happy path.",
  },
]

export type CaseStudy = {
  slug: string
  title: string
  /** One line, shown under the title in the work list. Keep it short. */
  blurb: string
  summary: string
  sector: string
  year: string
  tags: string[]
  href: string
  featured?: boolean
  /** Cover image in /public. Falls back to a placeholder panel when absent. */
  cover?: string
  /** Intrinsic size of `cover`. The grid shows every cover at its own aspect
   *  ratio, so these are what reserve the right height before it loads. */
  coverW?: number
  coverH?: number
  /** Silent looping clip in /public, shown instead of the cover. `cover` is
   *  still required alongside it — it becomes the poster frame. */
  video?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "move-naija",
    title: "Move Naija Version 2: Public Ride-Sharing Service",
    blurb:
      "I reimagined Move Naija with stronger safety measures, evolving it from static screens and a Figma prototype into a working product.",
    summary:
      "The second version of Move Naija: a riding and transit app for Nigerian cities where passengers name their own fare and drivers bid for the trip. I designed the full passenger journey — onboarding, the map-first home, the bidding round, and the trip itself.",
    sector: "Transit",
    year: "2026",
    tags: ["Mobile", "Maps", "Marketplace"],
    href: "#", // TODO: link to the live demo once it's deployed
    featured: true,
  },
  {
    slug: "paxum-bank",
    title: "Paxum Bank app redesign",
    blurb: "A fintech banking app redesign",
    summary:
      "A fintech case study. Reworking a banking app's core flows so that moving money stops feeling like a risk you're taking.",
    sector: "Fintech",
    year: "2025",
    tags: ["Fintech", "Redesign", "Mobile"],
    href: "https://www.behance.net/gallery/240571761/Paxum-bank-app-Redesign-(Fintech-Casestudy)",
    featured: true,
  },
  {
    slug: "public-ride-sharing",
    title: "Move Naija Version 1: Public Ride-Sharing Service",
    cover: "/work/public-ride-sharing-native.jpg",
    coverW: 1600,
    coverH: 1600,
    blurb:
      "I noticed a gap in Nigeria's public transportation experience and explored how technology could make shared rides more convenient, predictable, and seamless for everyday commuters.",
    summary:
      "The first version of Move Naija. Designing shared movement for a city — matching riders going the same way, and making a shared seat feel like a choice rather than a compromise. Everything learned here fed the v2 redesign.",
    sector: "Transit",
    year: "2025",
    tags: ["Mobile", "Maps"],
    href: "https://www.behance.net/gallery/232148141/Public-Ride-sharing-App",
  },
  {
    slug: "doctor-appointment",
    title: "Medi Guard",
    blurb:
      "MediGuard explores how AI can make healthcare more accessible in Nigeria by helping people understand their symptoms, reduce hospital wait times, and choose trusted specialists based on their credentials, experience, and patient reviews.",
    summary:
      "Booking care in a few taps — scheduling, reminders, and the small reassurances that make someone actually show up.",
    sector: "Health",
    year: "2024",
    tags: ["Mobile", "Booking"],
    href: "https://www.behance.net/gallery/222136607/Online-Doctor-Appointment-App",
    cover: "/work/doctor-appointment-native.jpg",
    coverW: 1553,
    coverH: 1600,
  },
  {
    slug: "nino",
    title: "NINO Food Delivery Experience",
    blurb:
      "A dedicated marketplace that helps Nigerians discover and order fresh bread, pastries, cakes, and other baked goods from trusted local bakers, all in one place.",
    summary:
      "An end-to-end food delivery experience, from the first craving to the knock on the door.",
    sector: "Commerce",
    year: "2024",
    tags: ["Mobile", "Commerce"],
    href: "https://www.behance.net/gallery/215758013/NINO-Seamless-Food-Delivery-Experience-Design",
    cover: "/work/nino-fit.jpg",
    coverW: 1553,
    coverH: 1600,
  },
]

// Her own process, in her words. Five phases, not the reference's four —
// understanding and research are separate steps for her.
export type ProcessStep = { name: string; detail: string }

export const processSteps: ProcessStep[] = [
  {
    name: "Understand",
    detail:
      "The problem from the user's side first, then the business goal behind it.",
  },
  {
    name: "Research",
    detail: "Competitor analysis, then user research.",
  },
  {
    name: "Structure",
    detail: "User flows, sitemap, information architecture.",
  },
  {
    name: "Design",
    detail:
      "Low-fidelity wireframes first, then high-fidelity once the client and stakeholders agree.",
  },
  {
    name: "Test and ship",
    detail: "User testing, iterate on what it surfaces, then ship.",
  },
]

export type Article = {
  title: string
  blurb: string
  href: string
  source?: string
}

// From her Medium feed. Blurbs are condensed from her own openings.
export const articles: Article[] = [
  {
    title: "Using Moonchild AI to build a Design System for your Lovable Project",
    blurb:
      "Most Lovable users can't sync a design system — it's locked behind Enterprise. So most people build without one, and AI without structure doesn't hold the line.",
    href: "https://medium.com/@bridgetdesigns/using-moonchild-ai-to-build-a-design-system-for-your-lovable-project-839a7e2b3044",
    source: "Medium",
  },
  {
    title: "How to generate UI with AI using your existing design system in 2026",
    blurb:
      "Teams generate 50+ AI mockups a month, then spend hours fixing every one to match the system. At some point you have to ask whether that's actually faster.",
    href: "https://medium.com/@bridgetdesigns/how-to-generate-ui-with-ai-using-your-existing-design-system-in-2026-53b2c4e0702a",
    source: "Medium",
  },
  {
    title: "9 Best AI Design Tools Every Product Designer Needs in 2026",
    blurb:
      "Three directions by Friday, wireframes for a new feature, a dashboard redesign in the backlog. The tools worth the time, and what each is actually for.",
    href: "https://medium.com/@bridgetdesigns/9-best-ai-tools-every-product-designer-needs-in-2026-5a458201309e",
    source: "Medium",
  },
]

export type Testimonial = {
  quote: string
  name: string
  title: string
}

// Leave empty until you have real ones — the section hides itself.
export const testimonials: Testimonial[] = []
