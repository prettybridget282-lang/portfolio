import { SocialIcon } from "@/app/components/social-icon";
import { site } from "@/lib/content";

/*
  Contact, after the footer on rachelatwork.com/about: the page above ends in
  big rounded corners and gives way to a black band holding the email address
  set very large, one line in her own voice, and a row of plain social marks.
  No form and no buttons. The resume lives in the nav only (her call).

  It closes every page, so the nav's Contact link always has somewhere to land.
*/
export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 pb-[100px] pt-[140px]">
        <a
          href={`mailto:${site.email}`}
          // Sized from the viewport so the whole address fits on one line from
          // a 390px phone up, capped at Rachel's 60px. break-all is the
          // fallback for anything narrower.
          className="inline-block break-all font-hero font-medium leading-none tracking-[-0.04em] underline decoration-1 underline-offset-[0.12em] transition-colors hover:text-accent"
          style={{ fontSize: "clamp(20px, 5.2vw, 60px)" }}
        >
          {site.email}
        </a>

        <p className="mt-5 max-w-[34rem] text-base font-medium leading-relaxed text-white/85">
          Have a project in mind, a role to discuss, or just want to say hi?
          I&rsquo;m always open to meaningful conversations and new
          opportunities.
        </p>

        <ul className="mt-10 flex flex-wrap items-center gap-6">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="block transition-colors hover:text-accent"
              >
                <SocialIcon label={social.label} size={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
