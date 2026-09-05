/*
  Runs the script on the server render (where it lands in the HTML and executes
  during parsing) and renders it inert on the client, which is what stops React's
  dev warning about script tags inside components.
*/
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
