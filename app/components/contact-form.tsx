"use client";

import { useState } from "react";

/**
 * Contact form modelled on mercyasuquo.framer.website/contact.
 *
 * There is no backend, so submitting composes an email in the visitor's own
 * mail client rather than posting anywhere. That means it works the day the
 * site goes live with nothing to sign up for and nothing that can silently
 * swallow a message. Swapping to a form service later is one fetch() call.
 */
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(
      name ? `Portfolio enquiry from ${name}` : "Portfolio enquiry",
    );
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}${from ? `\n${from}` : ""}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  // Underline-only, as on ajanwachuku.work/contact: no box, no fill, just a
  // hairline under each field and the placeholder doing the label's job.
  const field =
    "w-full border-0 border-b border-rule bg-transparent px-0 py-4 text-base text-ink placeholder:text-ink-faint focus:border-ink-faint focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-rule bg-paper-raised p-6 sm:p-8"
    >
      <label className="block">
        <span className="sr-only">Full name</span>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={field}
        />
      </label>

      <label className="mt-2 block">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          name="email"
          required
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="E-mail address"
          className={field}
        />
      </label>

      <label className="mt-2 block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className={`${field} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="mt-8 w-full rounded-full border border-accent px-6 py-3 text-sm text-accent transition-colors hover:bg-accent hover:text-paper"
      >
        Submit
      </button>

      <p className="mt-4 text-center text-xs text-ink-faint">
        Opens in your email app, addressed to me.
      </p>
    </form>
  );
}
