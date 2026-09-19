"use client";

import { useEffect, useRef } from "react";
import { BRAND } from "@/app/components/tool-brand";
import { TOOL_ICONS } from "@/app/components/tool-icons";

/*
  A light sprinkle of the tools she works with, trailing the cursor.

  Only on devices with a real pointer — there's no cursor on a touchscreen —
  and never for anyone who has asked their system for reduced motion. Each
  logo is drawn in its brand colour so the tools are easy to recognise.
*/


/** Cursor travel, in px, between one logo and the next. */
const SPACING = 56;
/** Most logos allowed on screen at once. */
const MAX_LIVE = 10;
const SIZE = 14;
const LIFE_MS = 900;

function markup(i: number) {
  const icon = TOOL_ICONS[i % TOOL_ICONS.length];
  const brand = BRAND[icon.name] ?? {};
  const paths = icon.paths
    .map(
      (p) =>
        `<path d="${p.d}"${p.fillRule ? ` fill-rule="${p.fillRule}"` : ""}/>`,
    )
    .join("");

  // A gradient needs an id unique to this one logo, since several can be on
  // screen at once and ids share a single document.
  if (brand.gradient) {
    const id = `tool-trail-gradient-${i}`;
    const stops = brand.gradient
      .map(
        (colour, n) =>
          `<stop offset="${n / (brand.gradient!.length - 1)}" stop-color="${colour}"/>`,
      )
      .join("");
    return `<svg viewBox="${icon.viewBox}" width="${SIZE}" height="${SIZE}" fill="url(#${id})" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient></defs>${paths}</svg>`;
  }

  const fill = brand.fill ?? "currentColor";
  return `<svg viewBox="${icon.viewBox}" width="${SIZE}" height="${SIZE}" fill="${fill}" aria-hidden="true">${paths}</svg>`;
}

export function ToolTrail() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastX: number | null = null;
    let lastY = 0;
    let travelled = 0;
    let index = 0;
    let live = 0;

    function spawn(x: number, y: number) {
      if (!layer || live >= MAX_LIVE) return;
      live++;

      // Markup comes from our own static icon data, never from user input.
      const node = document.createElement("span");
      node.innerHTML = markup(index++);
      node.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${SIZE}px;height:${SIZE}px;margin:${-SIZE / 2}px 0 0 ${-SIZE / 2}px;`;
      layer.appendChild(node);

      // Each logo pops in, drifts a little sideways, sinks a touch, and turns
      // as it fades.
      const dx = (Math.random() - 0.5) * 24;
      const dy = 10 + Math.random() * 14;
      const spin = (Math.random() - 0.5) * 80;
      const animation = node.animate(
        [
          { opacity: 0, transform: "translate(0, 0) scale(0.4) rotate(0deg)" },
          {
            // Near solid at its brightest, so each brand colour registers.
            opacity: 0.9,
            transform: `translate(${dx * 0.3}px, ${dy * 0.2}px) scale(1) rotate(${spin * 0.3}deg)`,
            offset: 0.25,
          },
          {
            opacity: 0,
            transform: `translate(${dx}px, ${dy}px) scale(0.6) rotate(${spin}deg)`,
          },
        ],
        { duration: LIFE_MS, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
      );

      // `finished` rejects if the animation is cancelled (a hidden tab, for
      // one), so cleaning up in finally frees the slot either way. Otherwise a
      // cancelled logo would count against MAX_LIVE forever.
      animation.finished
        .catch(() => {})
        .finally(() => {
          node.remove();
          live--;
        });
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const x = event.clientX;
      const y = event.clientY;
      if (lastX === null) {
        lastX = x;
        lastY = y;
        return;
      }
      travelled += Math.hypot(x - lastX, y - lastY);
      lastX = x;
      lastY = y;
      if (travelled >= SPACING) {
        travelled = 0;
        spawn(x, y);
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      layer.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden text-ink"
      // Above the sticky header (z-50), so logos pass over the nav too.
      style={{ zIndex: 60 }}
    />
  );
}
