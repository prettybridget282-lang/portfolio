/*
  Brand colours for the tools she works with, shared by the cursor trail and
  the tool logos on case study pages so the two can never drift apart.

  Figma, Claude, Google and Gemini are Simple Icons' official hexes. ChatGPT's
  green comes from the selfh.st icon set; Lovable's gradient stops match both
  Devicon and thesvg. Vercel's brand is plain black, which would vanish in dark
  mode, so it has no fill here and follows the text colour instead.
*/
export const BRAND: Record<string, { fill?: string; gradient?: string[] }> = {
  Figma: { fill: "#F24E1E" },
  Claude: { fill: "#D97757" },
  ChatGPT: { fill: "#74AA9C" },
  Vercel: {},
  Google: { fill: "#4285F4" },
  Gemini: { fill: "#8E75B2" },
  Lovable: { gradient: ["#FF8E63", "#FF7EB0", "#4B73FF"] },
};
