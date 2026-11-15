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
        {/* The address itself isn't shown (her call): it sits behind the mail
            icon at the start of the social row. */}
        <p className="max-w-[34rem] text-base font-medium leading-relaxed text-white/85">
          Have a project in mind, a role to discuss, or just want to say hi?
          I&rsquo;m always open to meaningful conversations and new
          opportunities.
        </p>

        <ul className="mt-10 flex flex-wrap items-center gap-6">
          <li>
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              title={site.email}
              className="block transition-colors hover:text-accent"
            >
              {/* 24, not 20: the envelope only fills 20×16 of its box, while X
                  and LinkedIn fill theirs, so this makes them read the same size. */}
              <SocialIcon label="Email" size={24} />
            </a>
          </li>
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
