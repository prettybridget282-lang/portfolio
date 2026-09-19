// Everything on the site reads from this file.
// Change copy here — no need to touch the page components.

export const site = {
  name: "Bridget Monday Burabari",
  role: "Product Designer and Design Engineer",
  tagline:
    "I design products people figure out on the first try and come back to.",
  location: "Nigeria",
  /** The hero's first fact, before the case-study count. From her CV. */
  experience: "Two years designing mobile products.",
  email: "bridgetmondayburabari@gmail.com",
  /* Flip to false when you stop taking work — the pill hides itself. */
  available: true,
  availabilityLabel: "I'm available to work with you",
  socials: [
    { label: "X", href: "https://x.com/uxui_Briii" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bridget-monday/" },
  ],
}

// Header nav. Hash links scroll within the home page; "/about" is its own
// route, so it's matched by pathname instead.
export const nav = [
  { label: "Home", href: "#top" },
  { label: "Me", href: "/about" },
  { label: "Work", href: "#work" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1u2-UciLIhvDlSoKpRsmBM2ByPp_9OsHS/view?usp=drive_link",
  },
  { label: "Contact", href: "#contact" },
]

// Named fields rather than an indexed array — the sections on /about read
// from these directly, so reordering copy can't silently move a paragraph
// into the wrong section.
export const about = {
  /** The big line at the top of /about. `accent` is set in italic. Built from
   *  her own intro below. */
  headline: {
    before: "Product designer with ",
    accent: "2+ years",
    after: " designing products people don't have to think about.",
  },
  heading: "What I do",
  /** The paragraph beside the portrait. */
  intro:
    "I'm a product designer from Nigeria 🇳🇬, currently teaching mobile app design at Scopevale. I started out studying Political Science, then moved into product design, designing landing pages as a design intern at Agrisense Technologies along the way.",
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

// `href`: the organisation's own site. Wherever its name appears on the About
// page (the list and the intro), it links there.
export const roles: { title: string; org: string; place: string; href?: string }[] = [
  { title: "Product Design Facilitator", org: "Scopevale", place: "Nigeria" },
  { title: "Product Design Intern", org: "Agrisense Technologies", place: "Kenya", href: "https://www.agrisensetech.com/" },
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

export type CaseStudyImage = { src: string; alt: string; w: number; h: number }

/** The pieces a case study section is built from, rendered in order. */
export type CaseStudyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  /** A small heading inside a section, e.g. "Competitor analysis". */
  | { type: "h3"; text: string }
  /** A comparison table: a tick or a cross per column, or a short text value. */
  | {
      type: "table"
      /** Text for the top-left header cell, above the row labels. */
      corner?: string
      columns: string[]
      rows: { label: string; values: (boolean | string)[] }[]
    }
  /** One image runs full width; two or more sit side by side, two to a row
   *  unless `columns` says otherwise (phone screens read better four across). */
  | { type: "images"; images: CaseStudyImage[]; columns?: 2 | 3 | 4 }
  /** A silent walkthrough with play controls. `poster` shows until it plays. */
  | { type: "video"; src: string; poster: string; label: string; w: number; h: number }

/** One part of a case study page, after the fixed Overview / My Role /
 *  Project Duration / Tools Used opening. */
export type CaseStudySection = {
  /** Used in the page URL (#research) and the side contents list. */
  id: string
  title: string
  blocks: CaseStudyBlock[]
}

export type CaseStudy = {
  slug: string
  title: string
  /** The single line on the work card. Condensed from `blurb`. */
  oneLiner: string
  /** The longer description, shown on the case study page. */
  blurb: string
  summary: string
  sector: string
  year: string
  tags: string[]
  featured?: boolean
  /** Cover image in /public. Falls back to a placeholder panel when absent. */
  cover?: string
  /** Intrinsic size of `cover`. The grid shows every cover at its own aspect
   *  ratio, so these are what reserve the right height before it loads. */
  coverW?: number
  coverH?: number
  /** Which part of the cover stays in view when it's cropped to 16:10.
   *  Defaults to the top. */
  coverPosition?: "top" | "center"
  /** Silent looping clip in /public, shown instead of the cover. `cover` is
   *  still required alongside it — it becomes the poster frame. */
  video?: string
  /** Counts toward "… with AI inside" in the work heading note. */
  ai?: boolean
  /** The working build, linked from the project page's side panel. */
  live?: string
  /*
    The written case study. Every page follows the same order: Overview, My
    Role, Project Duration, Tools Used, then `sections` (Challenge / Problem,
    Research, Solution, Visual Designs, Takeaway). Anything left out is simply
    skipped, and the side contents list appears once there's something in it.
  */
  overview?: string[]
  role?: string[]
  duration?: { total: string; phases: { when: string; what: string }[] }
  /** Tool names. Ones with a logo (Figma, Claude, …) show it beside the name. */
  tools?: string[]
  sections?: CaseStudySection[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "tapah",
    title: "Tapah: Manifestation App",
    oneLiner:
      "A manifestation app for writing what you're calling into your life, in words, voice notes and pictures.",
    blurb:
      "Tapah is a manifestation app where you write what you're calling into your life, in words, voice notes, photos and stickers, and keep it safe in your account.",
    summary:
      "A web app built around one question: what are you calling into your life? You write a manifestation piece by piece, save it, and come back to it.",
    sector: "Wellbeing",
    year: "2026",
    tags: ["Web app", "Mobile"],
    live: "https://calling-in.vercel.app/",
    cover: "/work/tapah-cover.jpg",
    coverW: 2400,
    coverH: 1800,
    // A laptop mockup centred in a 4:3 frame: cropping from the top would cut
    // off the bottom of the laptop.
    coverPosition: "center",
    // Only the parts she asked for: My Role, Project Duration, Tools Used,
    // Visual Designs and Takeaway. Facts come from the build and its history.
    role: [
      "I designed Tapah and built it into a live web app. I shaped every screen and interaction, from the painted splash and the writing experience to voice notes, photos, sign-in, syncing, sharing and settings, working with Claude as my coding partner and testing each change on my own phone.",
    ],
    duration: {
      total: "1 week, ongoing",
      phases: [
        { when: "10–11 Sep", what: "Painted home, writing and saved screens; live on Vercel" },
        { when: "12 Sep", what: "Chat-style writing: text, voice notes, images and stickers" },
        { when: "13 Sep", what: "Accounts: Google and email sign-in, syncing, share links, Trash" },
        { when: "14 Sep", what: "Favourites, photo captions, video notes and save feedback" },
        { when: "15 Sep", what: "Splash and list redesign, search and filter, iPhone fixes" },
        { when: "16–17 Sep", what: "Profile photo, settings, delete account and dark mode" },
      ],
    },
    tools: ["Figma", "Claude", "Vercel", "Convex", "Resend"],
    sections: [
      {
        id: "visual-designs",
        title: "Visual Designs",
        // Screens from the live build at phone size (390×844 at 2×) and
        // desktop size (1440×900, saved at 1920 wide), filled with sample
        // manifestations, not anyone's real ones.
        blocks: [
          { type: "h3", text: "Mobile" },
          {
            type: "images",
            columns: 4,
            images: [
              { src: "/work/tapah/splash.jpg", alt: "Tapah splash: a painted meadow at sunrise with the question “What are you calling into your life?” and a Write a manifestation button", w: 780, h: 1688 },
              { src: "/work/tapah/list.jpg", alt: "The list of saved manifestations with search, filter, All and Favourites tabs, one pinned card and a Write another button", w: 780, h: 1688 },
              { src: "/work/tapah/writing-filled.jpg", alt: "Writing a manifestation: a text piece, a photo with a caption and a voice note in a timeline, with the composer below", w: 780, h: 1688 },
              { src: "/work/tapah/stickers.jpg", alt: "The sticker tray open above the composer, with stickers like Already mine and Thank you", w: 780, h: 1688 },
              { src: "/work/tapah/search-results.jpg", alt: "Searching manifestations for the word light, with one matching card", w: 780, h: 1688 },
              { src: "/work/tapah/settings.jpg", alt: "Settings: Mode (Automatic, Light, Dark), Theme swatches and a Music while writing switch", w: 780, h: 1688 },
            ],
          },
          { type: "h3", text: "Web" },
          {
            type: "images",
            images: [
              { src: "/work/tapah/web-list.jpg", alt: "Tapah on desktop: the list of saved manifestations with search, filter and tabs", w: 1920, h: 1200 },
              { src: "/work/tapah/web-writing-filled.jpg", alt: "Tapah on desktop: writing a manifestation with a text piece, a captioned photo and a voice note", w: 1920, h: 1200 },
              { src: "/work/tapah/web-voice-review.jpg", alt: "Tapah on desktop: reviewing a voice note with Discard, Send as text, Send as voice and Send both", w: 1920, h: 1200 },
              { src: "/work/tapah/web-stickers.jpg", alt: "Tapah on desktop: the sticker tray open above the composer", w: 1920, h: 1200 },
            ],
          },
        ],
      },
      {
        id: "takeaway",
        title: "Takeaway",
        blocks: [
          {
            type: "p",
            text: "Building Tapah for real showed me how much design happens after the screens look finished: what a voice note does when it fails to send on an iPhone, where Save should sit so nobody loses their words, and making sure nothing sends until you choose to send it. Testing on my own phone caught problems no mockup would have.",
          },
        ],
      },
    ],
  },
  {
    slug: "move-naija",
    title: "Move Naija Version 2: Public Ride-Sharing Service",
    oneLiner:
      "Move Naija rebuilt with stronger safety, from static screens into a working product.",
    blurb:
      "I reimagined Move Naija with stronger safety measures, evolving it from static screens and a Figma prototype into a working product.",
    summary:
      "The second version of Move Naija: a riding and transit app for Nigerian cities where passengers name their own fare and drivers bid for the trip. I designed the full passenger journey — onboarding, the map-first home, the bidding round, and the trip itself.",
    sector: "Transportation",
    year: "2026",
    tags: ["Mobile", "Maps", "Marketplace"],
    live: "https://move-naija-jet.vercel.app/",
    cover: "/work/move-naija-v2-cover.jpg",
    coverW: 1536,
    coverH: 1024,
    // Her own Figma case study leads here: her About line, her four problems,
    // her "What broke in the old design", and her four solution headings.
    // Only two notes from the build survive (the 60-second round, and a
    // driver needing room for the whole party).
    overview: [
      "A shared-ride app for Nigerians that connects riders to danfos, minibuses and taxis. Riders can see available seats and name their price.",
      "It covers rides inside a city and short trips between neighbouring ones, and version 2 takes it out of Figma and into a working product built on real Port Harcourt stops, vehicles and fares.",
    ],
    role: ["I designed Move Naija and shipped it."],
    duration: {
      total: "3 weeks",
      phases: [
        { when: "Week 1", what: "UX research, user interviews and UI exploration" },
        { when: "Week 2", what: "Design execution and AI product building" },
        { when: "Week 3", what: "User testing" },
      ],
    },
    tools: ["Figma", "Claude", "Supabase", "Vercel"],
    sections: [
      {
        id: "challenge",
        title: "Challenge / Problem",
        blocks: [
          {
            type: "p",
            text: "Four things make shared transport hard for the people who use it every day.",
          },
          {
            type: "list",
            items: [
              "Time: long waits for vehicles, vehicles that don't leave until every seat is sold, and no way to see available seats beforehand.",
              "Safety: unverified drivers, and no one knows where you are once you board.",
              "Comfort: overcrowded, stuffy vehicles and poor vehicle conditions.",
              "Price: fares are haggled at the park, so you never know the real price.",
            ],
          },
        ],
      },
      {
        id: "old-design",
        title: "What broke in the old design",
        blocks: [
          { type: "h3", text: "Home screen" },
          {
            type: "list",
            items: [
              "Unclear vehicle type: it showed taxis on the map without clearly indicating whether other ride types were available, leaving riders uncertain about their options.",
              "Poor distance info: it listed three destinations with their distances, but left riders to figure out what those options meant and which one was most relevant to their journey.",
            ],
          },
          {
            type: "images",
            columns: 2,
            images: [
              { src: "/work/move-naija/old-home.jpg", alt: "The old home screen: a map of taxis with a Where to? field and three nearby destinations listed by distance in kilometres", w: 900, h: 1896 },
            ],
          },
          { type: "h3", text: "Booking screens" },
          {
            type: "p",
            text: "Riders first had to select a vehicle and view a fixed fare, then move to another screen to configure seats, negotiate their fare and choose a payment method. This created unnecessary back-and-forth and separated decisions that were all part of configuring the same ride.",
          },
          {
            type: "images",
            columns: 2,
            images: [
              { src: "/work/move-naija/old-booking.jpg", alt: "The old booking screens: a vehicle list with fixed fares, then a separate ride details screen for seats, fare and payment", w: 900, h: 1896 },
            ],
          },
          { type: "h3", text: "Ride tracking" },
          {
            type: "list",
            items: [
              "No safety reassurance: there was nothing to help the rider feel informed and secure during pickup.",
              "Limited ride visibility: the rider had to stay on the tracking screen to watch the driver arrive, with no way to check the ride's progress while using the rest of the app.",
              "Limited driver info: only basic details such as the driver's name, vehicle type and vehicle number.",
            ],
          },
          {
            type: "images",
            columns: 2,
            images: [
              { src: "/work/move-naija/old-tracking.jpg", alt: "The old ride tracking screen: the driver arriving, with only a name, vehicle and plate, and Cancel and Share ride buttons", w: 900, h: 1896 },
            ],
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        blocks: [
          { type: "h3", text: "See fares before you make a choice" },
          {
            type: "list",
            items: [
              "Recognise vehicles at a glance: the different vehicle types are shown on the map.",
              "Fares on the home screen: every nearby destination carries its price, so cost is something you weigh before you commit instead of after.",
              "See estimated travel time instead of relying on distance. Nobody chooses a trip because it's 8.3km away.",
            ],
          },
          {
            type: "images",
            columns: 2,
            images: [
              { src: "/work/move-naija/home.jpg", alt: "The new home screen: a live map with vehicles nearby and nearby destinations priced from ₦300 with travel times", w: 900, h: 1520 },
            ],
          },
          { type: "h3", text: "Choose ride and decide in one place" },
          {
            type: "list",
            items: [
              "Choose your seats first: see available seats and pick what works before finding a driver.",
              "Set your fare, with a suggested price: use the suggested per-seat fare as a reference, then adjust it to what works for you. Your total updates automatically.",
              "A driver can only bid if they have room for your whole party, so nobody in your group is split off.",
            ],
          },
          {
            type: "images",
            columns: 2,
            images: [
              { src: "/work/move-naija/seats.jpg", alt: "Choosing seats: how many seats, then bus, mini bus and taxi each with a per-seat fare", w: 900, h: 1312 },
            ],
          },
          {
            type: "images",
            columns: 2,
            images: [
              { src: "/work/move-naija/fare.jpg", alt: "Naming your price: ₦400 per seat against a recommended ₦500, with the total for eight seats and Find driver", w: 900, h: 1530 },
            ],
          },
          { type: "h3", text: "See what each offer costs you" },
          {
            type: "list",
            items: [
              "Every offer is priced against your own, so you can see what saying yes actually costs you.",
              "View the driver's profile before you accept, with their rating, vehicle and free seats on the card.",
              "Auto-accept an offer that matches your price if you'd rather not sit through the round, which lasts 60 seconds.",
            ],
          },
          {
            type: "images",
            columns: 2,
            images: [
              { src: "/work/move-naija/offers.jpg", alt: "Eight drivers sent an offer: cards showing each price against yours, the driver rating and seats free, each with Accept", w: 900, h: 1520 },
            ],
          },
          { type: "h3", text: "Know your driver before you ride" },
          {
            type: "list",
            items: [
              "Track your ride without being stuck on one screen: the trip stays reachable while you use other parts of the app.",
              "Know who you're riding with: the driver's licence, vehicle registration and identity are checked, with ratings from past passengers.",
              "Safety tools, right when you need them: share the trip, read the safety rules, or call 112 without leaving the ride.",
            ],
          },
          {
            type: "images",
            columns: 2,
            images: [
              { src: "/work/move-naija/trip.jpg", alt: "The trip screen: the driver arriving in five minutes, plate and vehicle, seats booked, contact and safety rules, share trip, Call 112 and Cancel ride", w: 900, h: 1560 },
            ],
          },
        ],
      },
      {
        id: "takeaway",
        title: "What I learnt from the project",
        blocks: [
          {
            type: "list",
            items: [
              "Prototype early, find gaps sooner: designing individual screens can make a flow feel complete when it isn't. Building and testing the prototype helped me uncover missing screens, broken connections, and UX gaps that weren't obvious while designing.",
              "Design for the user's goal, not the screen: I stopped evaluating the work by how good an individual screen looked and focused more on whether each decision helped users accomplish the goal that brought them to Move Naija in the first place.",
              "Good UX requires trade-offs: the bidding flow was one of the hardest parts to resolve. I had to continuously decide what information users actually needed, what could be removed, and how to keep the process useful without making it feel complicated.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "public-ride-sharing",
    title: "Move Naija Version 1: Public Ride-Sharing Service",
    cover: "/work/public-ride-sharing-native.jpg",
    coverW: 1600,
    coverH: 1600,
    oneLiner:
      "Making shared public rides in Nigeria more convenient and predictable.",
    blurb:
      "I noticed a gap in Nigeria's public transportation experience and explored how technology could make shared rides more convenient, predictable, and seamless for everyday commuters.",
    summary:
      "The first version of Move Naija. Designing shared movement for a city — matching riders going the same way, and making a shared seat feel like a choice rather than a compromise. Everything learned here fed the v2 redesign.",
    sector: "Transit",
    year: "2025",
    tags: ["Mobile", "Maps"],
    // From her Behance case study, tightened. Role, duration and tools are
    // from her directly (not on Behance); there's no takeaway yet.
    overview: [
      "Move Naija is a concept ride-hailing app that makes Nigeria's public transport smarter, safer and easier to navigate. It's built for everyday commuters, traders, businesswomen, students and working people, especially those who aren't tech-savvy but are used to smartphones.",
      "In many Nigerian cities, public transport is unreliable, overcrowded and confusing. Commuters deal with long waits, unclear routes, and no idea who's driving them or where their ride is. Move Naija helps them find nearby buses or shared rides, understand the routes on offer, and reach their destination with more ease, speed and confidence.",
    ],
    role: ["I was the product designer on Move Naija."],
    duration: { total: "4 weeks", phases: [] },
    tools: ["Figma", "Google Docs"],
    sections: [
      {
        id: "challenge",
        title: "Challenge / Problem",
        blocks: [
          {
            type: "p",
            text: "Public transport in Nigerian cities is a daily struggle: unpredictable, unsafe and full of uncertainty. Commuters often wait 20–40 minutes for a bus with no idea when it'll arrive, how full it'll be, or whether it's even going their way. First-time travellers and people new to a route face even more confusion and delay.",
          },
          {
            type: "p",
            text: "Unlike private ride-hailing apps like Uber or Bolt, local buses and shared rides have no real-time tracking, no route transparency, and no driver identity or safety information.",
          },
          {
            type: "p",
            text: "“I just stand there and wait. Sometimes I miss important meetings because I don't know when a bus will come.”",
          },
          {
            type: "p",
            text: "For the average commuter, whether a student, trader or working professional, these small uncertainties add up to lost time, stress and missed opportunities. A typical day begins and ends with guesswork.",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        blocks: [
          {
            type: "p",
            text: "To dig into why commuters struggle, I ran structured one-on-one interviews with 10 people who rely on public transport, from students and civil servants to small business owners. I chose interviews because I wanted to hear their stories directly and in their own words: not just what they do, but why they do it, what they avoid, what frustrates them, and what they wish existed.",
          },
          {
            type: "p",
            text: "These conversations showed me the deeper issues behind the everyday chaos, and they shaped every design decision I made.",
          },
          { type: "h3", text: "User personas" },
          {
            type: "images",
            images: [
              {
                src: "/work/move-naija-v1/user-personas.png",
                alt: "Two user personas: Ayo Dele, a 22-year-old student in Lekki, Lagos, and Chimamanda Ebele, a 34-year-old lawyer in Old GRA, Port Harcourt, with their goals, pain points and preferences",
                w: 1400,
                h: 1376,
              },
            ],
          },
          {
            type: "p",
            text: "I chose Ayo and Chimamanda because they reflect two different but very real kinds of commuter I met during my research.",
          },
          {
            type: "p",
            text: "Ayo is a 22-year-old student in Lagos. He represents young, time-conscious commuters getting around the city on a tight budget while juggling school.",
          },
          {
            type: "p",
            text: "Chimamanda is a 34-year-old lawyer in Port Harcourt. She reflects working professionals, especially women, who rely on public transport but put safety, routine and clarity first.",
          },
          {
            type: "p",
            text: "Their lives are different, but their challenges connect: both want a way of getting around that is smarter, safer and less stressful. These personas shaped Move Naija's features and experience.",
          },
          { type: "h3", text: "Research takeaway" },
          {
            type: "p",
            text: "80% of respondents were dissatisfied with public transport overall, which points to a lack of transport apps that address their commuting problems. The top reasons:",
          },
          {
            type: "list",
            items: [
              "No reliable waiting time: 50%",
              "Poor access to driver information: 25%",
              "Overcrowded vehicles: 20%",
              "No real-time updates: 5%",
            ],
          },
          { type: "h3", text: "Competitor analysis" },
          {
            type: "p",
            text: "I compared Move Naija with Bolt and inDrive, looking at their strengths, gaps and user experience patterns, to find where Move Naija could offer a more local, affordable alternative:",
          },
          {
            type: "table",
            corner: "Competitor Analysis",
            columns: ["Move Naija", "Bolt", "inDrive"],
            rows: [
              { label: "Ride type", values: ["Shared ride", "Private ride", "Private ride"] },
              { label: "Coverage", values: ["Local", "Global", "Global"] },
              { label: "Target users", values: ["Everyday commuters", "Urban professionals", "Budget-conscious users"] },
            ],
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        blocks: [
          {
            type: "p",
            text: "Using what I learned from real commuters, I focused on a solution that cuts waiting time, improves safety and fits into everyday Nigerian life. I made four core design decisions:",
          },
          {
            type: "list",
            items: [
              "Show real-time ride availability to cut down long, uncertain waits.",
              "Design for clarity, with simple flows and large, readable visuals for every level of tech experience.",
              "Offer flexible payment, including cash and card, without overcomplicating the experience.",
              "Show key ride details upfront, like vehicle capacity and driver identity, so riders feel more in control.",
            ],
          },
          {
            type: "p",
            text: "These choices shaped every screen and interaction that followed.",
          },
          { type: "h3", text: "Information architecture" },
          {
            type: "images",
            images: [
              {
                src: "/work/move-naija-v1/information-architecture.png",
                alt: "Move Naija sitemap: Homepage, Rides and Profile, each with the screens beneath it",
                w: 1400,
                h: 1090,
              },
            ],
          },
          { type: "h3", text: "User flow" },
          {
            type: "images",
            images: [
              {
                src: "/work/move-naija-v1/user-flow.png",
                alt: "User flow from opening the app, through searching and entering a route, selecting and confirming a ride, finding a driver, to tracking the ride, completing it and leaving a review",
                w: 1400,
                h: 867,
              },
            ],
          },
        ],
      },
      {
        id: "visual-designs",
        title: "Visual Designs",
        blocks: [
          {
            type: "p",
            text: "I turned the user flows and priorities into a clean, simple interface. The goal was for it to feel familiar and easy, especially for people who depend on local transport and aren't tech-savvy. Every screen guides riders from finding a ride to reaching their destination, with clear visuals and cues at each step.",
          },
          { type: "h3", text: "Selected screens" },
          {
            type: "images",
            images: [
              {
                src: "/work/move-naija-v1/selected-screens.png",
                alt: "Six Move Naija screens: the map home with Where to?, entering a route, choosing a taxi or minibus, ride details with seats and payment, the driver arriving, and rating the ride",
                w: 1400,
                h: 1408,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "doctor-appointment",
    title: "Medi Guard",
    oneLiner:
      "A hospital app for booking appointments and managing prescriptions, with an AI health assistant.",
    ai: true,
    blurb:
      "Medi-Guard is a hospital app that lets patients book appointments, view their medical records, request prescription refills and chat with doctors, with MediBot, an AI health assistant, on hand for their questions.",
    summary:
      "Booking care in a few taps — scheduling, reminders, and the small reassurances that make someone actually show up.",
    sector: "Health",
    year: "2025",
    tags: ["Mobile", "Booking"],
    cover: "/work/doctor-appointment-native.jpg",
    coverW: 1553,
    coverH: 1600,
    // From her Behance case study, tightened. Images are her exports with
    // their built-in titles cropped off (the page sets the titles).
    overview: [
      "Medi-Guard is a mobile app for Medi-Guard Hospital, a fictional institution, designed to make healthcare more accessible and convenient for patients.",
      "Patients can book appointments, view their medical records, request prescription refills and chat with doctors, all from their phones. It saves time, cuts paperwork and puts patients in control of their care, while staying true to the hospital's trusted brand.",
    ],
    role: [
      "As the sole designer on Medi-Guard, I managed the whole project from concept to completion. I ran healthcare user research to find patients' most pressing needs, then turned those insights into user flows and interactive prototypes.",
      "The project called for a visual identity that balanced clinical precision with accessibility. Through repeated iteration, I refined both how the app works and how it looks.",
    ],
    duration: {
      total: "8 weeks",
      phases: [
        { when: "Step 1", what: "Research" },
        { when: "Step 2", what: "Sitemap" },
        { when: "Step 3", what: "Wireframes" },
        { when: "Step 4", what: "Prototype" },
      ],
    },
    tools: ["Figma"],
    sections: [
      {
        id: "challenge",
        title: "Challenge / Problem",
        blocks: [
          {
            type: "p",
            text: "Patients want quality healthcare but struggle to get timely, convenient care. Many hospitals still rely on outdated, in-person processes that lead to long waits, administrative bottlenecks and unnecessary stress.",
          },
          {
            type: "p",
            text: "Existing options, like phone calls or basic websites, can't handle appointments, medical records or direct contact with doctors. Patients are left with scattered, inefficient options and no good way to manage their healthcare.",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        blocks: [
          {
            type: "p",
            text: "I ran a survey through Google Forms to understand how Medi-Guard Hospital could improve its services and fix the pain points of a traditional hospital visit. Patients told me about:",
          },
          {
            type: "list",
            items: [
              "Frustrating wait times for appointments and test results.",
              "Overwhelming paperwork at registration and during visits.",
              "Difficulty getting care when they live far from the hospital.",
              "Inconsistent communication with the healthcare team.",
              "Poor coordination of their care across hospital departments.",
            ],
          },
          {
            type: "p",
            text: "These findings confirmed the need for a dedicated app to complement the hospital's physical services and make the patient experience smoother.",
          },
          { type: "h3", text: "Design goal" },
          {
            type: "p",
            text: "The aim was to join traditional medical services with digital ones, give patients more control, and make care delivery more effective.",
          },
          {
            type: "list",
            items: [
              "Create a seamless healthcare experience through digital integration: a human-centred interface that supports patients from appointment to recovery.",
              "Boost patient control with smart health tools: instant access to health records and test results, and direct conversations with doctors that build confidence.",
              "Enhance safety and reliability of care: medication reminders, interaction warnings and prescription tracking, plus personalised care plans with progress monitoring.",
              "Optimise healthcare efficiency and coordination: less paperwork and shorter waits for patients and staff, and AI-powered health education to help patients understand and follow their treatment.",
            ],
          },
          { type: "h3", text: "User personas" },
          {
            type: "images",
            images: [
              {
                src: "/work/medi-guard/user-personas.png",
                alt: "Two user personas: Folarin Falana, a 27-year-old banker, and Tiwatope Balogun, a 24-year-old runway model, with their motivations, goals and frustrations",
                w: 1400,
                h: 1297,
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        blocks: [
          {
            type: "p",
            text: "Medi-Guard makes managing care simpler for patients, caregivers and doctors. It tackles key pain points in the Nigerian healthcare system through:",
          },
          {
            type: "list",
            items: [
              "Direct communication: patients reach their healthcare team quickly for consultations and questions.",
              "Personalised reminders: medication alerts fitted to each patient's schedule, so doses aren't missed.",
              "Digital records: secure access to prescription history and treatment plans in one place.",
              "Simple refills: renewing a prescription takes one tap, so treatment isn't interrupted.",
              "Medication information: dosage guidance, side effects and drug interactions, so patients can make informed decisions.",
            ],
          },
          { type: "h3", text: "Information architecture" },
          {
            type: "images",
            images: [
              {
                src: "/work/medi-guard/information-architecture.png",
                alt: "Medi-Guard sitemap: Homepage, Appointment, Prescription and Profile, each with the screens beneath it",
                w: 1400,
                h: 1389,
              },
            ],
          },
        ],
      },
      {
        id: "visual-designs",
        title: "Visual Designs",
        blocks: [
          { type: "h3", text: "Style guide" },
          {
            type: "images",
            images: [
              {
                src: "/work/medi-guard/style-guide.png",
                alt: "Medi-Guard style guide: teal accent and neutral grey palettes, Raleway and Inter typography, and the icon set",
                w: 1400,
                h: 936,
              },
            ],
          },
          { type: "h3", text: "Selected screens" },
          {
            type: "images",
            images: [
              {
                src: "/work/medi-guard/selected-screens.png",
                alt: "Final Medi-Guard screens: login,account security, consent, home, our doctors, appointments, payment successful, prescriptions, profile, the MediBot welcome screen and a MediBot chat",
                w: 1400,
                h: 3325,
              },
            ],
          },
          { type: "h3", text: "Prototype" },
          {
            type: "video",
            src: "/work/medi-guard/prototype.mp4",
            poster: "/work/medi-guard/prototype-poster.jpg",
            label: "Medi-Guard prototype walkthrough: onboarding, login, home, notifications, finding and filtering doctors, booking and paying for an appointment, appointments, prescriptions and a chat with MediBot",
            w: 1600,
            h: 1080,
          },
        ],
      },
      {
        id: "takeaway",
        title: "Takeaway",
        blocks: [
          {
            type: "p",
            text: "Working on Medi-Guard alone taught me how to simplify and modernise traditional healthcare processes. I got better at designing friendly interfaces while protecting patient data and privacy, and I came to understand healthcare workflows much more deeply.",
          },
          {
            type: "p",
            text: "Most of all, I learned to balance accessibility with security, keeping the app easy to use while protecting sensitive information. Working independently sharpened my problem-solving, and the project gave me confidence in redesigning traditional systems.",
          },
        ],
      },
    ],
  },
  {
    slug: "nino",
    title: "NINO Food Delivery Experience",
    oneLiner:
      "Discover and order fresh baked goods from trusted local bakers.",
    blurb:
      "A dedicated marketplace that helps Nigerians discover and order fresh bread, pastries, cakes, and other baked goods from trusted local bakers, all in one place.",
    summary:
      "An end-to-end food delivery experience, from the first craving to the knock on the door.",
    sector: "Commerce",
    year: "2024",
    tags: ["Mobile", "Commerce"],
    cover: "/work/nino-fit.jpg",
    coverW: 1553,
    coverH: 1600,
    // From her own case study write-up, tightened. Images are her exports
    // with their built-in titles cropped off (the page sets the titles).
    overview: [
      "NINO is a mobile app for ordering freshly made cakes, bread and pastries in Nigeria. Whether you're planning a celebration, treating yourself or stocking up on favourites, NINO connects you with trusted bakers and pastry chefs.",
      "With personalised recommendations and convenient delivery, it makes ordering baked goods effortless. For now it focuses only on the Nigerian market, so the experience is built around local tastes.",
    ],
    role: [
      "I was the UI/UX designer on NINO. I ran the user research, designed the wireframes, prototypes and high-fidelity screens, and iterated on the designs based on feedback, keeping the experience intuitive for users while meeting the business's goals.",
    ],
    duration: {
      total: "8 weeks",
      phases: [
        { when: "Week 1", what: "Research" },
        { when: "Week 2", what: "More research" },
        { when: "Week 3", what: "Sitemap and sketches" },
        { when: "Weeks 5–8", what: "Low- and high-fidelity wireframes" },
        { when: "Weeks 5–8", what: "Prototype" },
      ],
    },
    tools: ["Figma"],
    sections: [
      {
        id: "challenge",
        title: "Challenge / Problem",
        blocks: [
          {
            type: "p",
            text: "People in Nigeria who want good cakes, bread and pastries struggle to find a platform built for them. Some services sell baked goods alongside everything else, but they lack the range, specialisation and smooth experience that baked-goods lovers want.",
          },
          {
            type: "p",
            text: "Existing options mostly run as websites, which makes them awkward on a phone, or they're missing features like personalised recommendations and real-time order tracking. Customers are left with scattered options and no platform dedicated to fresh, varied, premium baked goods.",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        blocks: [
          {
            type: "p",
            text: "To understand NINO's potential users, I ran a survey through Google Forms to uncover their pain points, needs and expectations. What they told me:",
          },
          {
            type: "list",
            items: [
              "They struggle to find diverse, high-quality baked goods through mobile apps.",
              "Real-time tracking and detailed product photos are highly wanted.",
              "Bank transfers and in-app wallets are the most preferred ways to pay.",
              "Delivery delays are a major concern.",
              "Most still order the traditional way, which points to the need for a better digital option.",
              "It's hard to find an app dedicated only to baked goods.",
            ],
          },
          { type: "h3", text: "Competitor analysis" },
          {
            type: "p",
            text: "I compared NINO with Glovo and Creamixcakes:",
          },
          {
            type: "table",
            corner: "Competitor Analysis",
            columns: ["NINO", "Glovo", "Creamixcakes"],
            rows: [
              { label: "Mobile accessibility", values: [true, true, false] },
              { label: "Focused on baked goods", values: [true, false, true] },
              { label: "Order tracking", values: [true, true, false] },
              { label: "Local presence", values: [true, false, true] },
              { label: "Global presence", values: [false, true, false] },
              { label: "Bank transfer and wallet", values: [true, true, false] },
              { label: "Delivery efficiency", values: [true, true, false] },
              { label: "Visual transparency and trust", values: [true, true, false] },
            ],
          },
          { type: "h3", text: "User personas" },
          {
            type: "images",
            images: [
              {
                src: "/work/nino/user-personas.png",
                alt: "Two user personas: Florence Fummi, a 25-year-old event planner, and Victor Ace, a 22-year-old student, with their goals, pain points and preferences",
                w: 1400,
                h: 1388,
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        title: "Solution",
        blocks: [
          {
            type: "p",
            text: "NINO is a mobile platform built for baked-goods lovers in Nigeria. By focusing only on cakes, bread and pastries, it brings convenience, quality and personalisation together to solve the problems above.",
          },
          { type: "p", text: "Key features:" },
          {
            type: "list",
            items: [
              "Specialised product selection",
              "Personalised recommendations",
              "Real-time order tracking",
              "Mobile-first accessibility",
              "Fast, convenient delivery",
              "A localised experience",
            ],
          },
          { type: "h3", text: "Information architecture" },
          {
            type: "images",
            images: [
              {
                src: "/work/nino/information-architecture.png",
                alt: "NINO sitemap: Homepage, Order, Support and Profile, each with the screens beneath it",
                w: 1400,
                h: 1150,
              },
            ],
          },
        ],
      },
      {
        id: "visual-designs",
        title: "Visual Designs",
        blocks: [
          { type: "h3", text: "Style guide" },
          {
            type: "images",
            images: [
              {
                src: "/work/nino/style-guide.png",
                alt: "NINO style guide: colour palette of purple, yellow, grey and amber, Inter typography, and the icon set",
                w: 1400,
                h: 1150,
              },
            ],
          },
          { type: "h3", text: "Low-fidelity wireframes" },
          {
            type: "images",
            images: [
              {
                src: "/work/nino/low-fidelity-wireframes.png",
                alt: "Grey low-fidelity wireframes for onboarding, sign-in, OTP verification and the home screen",
                w: 1400,
                h: 2264,
              },
            ],
          },
          { type: "h3", text: "Selected screens" },
          {
            type: "images",
            images: [
              {
                src: "/work/nino/selected-screens.png",
                alt: "Nine final NINO screens: home, product detail, sign-in, empty cart, cart, order confirmed, delivery tracking, support and profile",
                w: 1400,
                h: 2586,
              },
            ],
          },
        ],
      },
      {
        id: "takeaway",
        title: "Takeaway",
        blocks: [
          {
            type: "p",
            text: "Designing NINO taught me to put empathy for users first, to iterate on feedback, and to balance how something looks with how it works. From uncovering pain points to working with developers and checking accessibility, every step reinforced that design has to fit real-world needs. Most of all, I learned that good design is about creating experiences that mean something to the people using them.",
          },
        ],
      },
    ],
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
