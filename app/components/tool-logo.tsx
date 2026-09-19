import { BRAND } from "@/app/components/tool-brand";
import { TOOL_ICONS } from "@/app/components/tool-icons";

/**
 * Figma's full-colour mark: five shapes, each in its own brand colour. The
 * one-colour version in tool-icons.ts stays for the cursor trail, where the
 * logos are tiny.
 */
function FigmaFullColour({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" aria-hidden="true" className={className}>
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}

/**
 * One tool's logo in its brand colour. `idPrefix` keeps the Lovable gradient's
 * id unique when the same logo appears more than once on a page. `fullColour`
 * uses a tool's multi-colour mark where it has one (Figma).
 */
export function ToolLogo({
  name,
  idPrefix,
  className,
  fullColour = false,
}: {
  name: string;
  idPrefix: string;
  className?: string;
  fullColour?: boolean;
}) {
  if (fullColour && name === "Figma") {
    return <FigmaFullColour className={className} />;
  }

  const icon = TOOL_ICONS.find((i) => i.name === name);
  if (!icon) return null;
  const brand = BRAND[name] ?? {};
  const gradientId = `${idPrefix}-${name.toLowerCase()}-gradient`;

  return (
    <svg
      viewBox={icon.viewBox}
      aria-hidden="true"
      className={className}
      fill={
        brand.gradient
          ? `url(#${gradientId})`
          : (brand.fill ?? "currentColor")
      }
    >
      {brand.gradient && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            {brand.gradient.map((colour, i, all) => (
              <stop
                key={colour}
                offset={i / Math.max(all.length - 1, 1)}
                stopColor={colour}
              />
            ))}
          </linearGradient>
        </defs>
      )}
      {icon.paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.fillRule} />
      ))}
    </svg>
  );
}
