/**
 * Official logo URLs for tech stack (Devicons CDN).
 * Used on home page "My Tech Stack" and resume TECHNICAL SKILLS section.
 */
const DEVICON_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

/** Devicon path: /{name}/{name}-original.svg (or -plain for some) */
function devicon(name: string, style: "original" | "plain" = "original"): string {
  return `${DEVICON_CDN}/${name}/${name}-${style}.svg`;
}

/** Simple Icons fallback when devicon doesn't have it */
function simpleIcon(name: string, color?: string): string {
  const base = `${SIMPLE_ICONS_CDN}/${name}`;
  return color ? `${base}/${color.replace("#", "")}` : base;
}

/**
 * Map: display name (or key) -> logo image URL.
 * Prefer devicon; use simpleicons for Supabase, Notion, etc. when needed.
 */
export const TECH_LOGOS: Record<string, string> = {
  Flutter: devicon("flutter"),
  Python: devicon("python"),
  Dart: devicon("dart"),
  Firebase: devicon("firebase"),
  Firestore: devicon("firebase"), // reuse Firebase
  Supabase: simpleIcon("supabase", "#3ECF8E"),
  Figma: devicon("figma"),
  "Next.js": devicon("nextjs", "plain"),
  TypeScript: devicon("typescript"),
  "Tailwind CSS": devicon("tailwindcss"),
  Git: devicon("git"),
  GitHub: devicon("github"),
  Notion: simpleIcon("notion"),
  Streamlit: simpleIcon("streamlit", "#FF4B4B"),
  Plotly: simpleIcon("plotly", "#3F4F75"),
  pandas: devicon("pandas"),
  NumPy: devicon("numpy"),
  Vercel: simpleIcon("vercel", "#000"),
  AWS: devicon("amazonwebservices", "plain"),
  Cisco: simpleIcon("cisco", "#049FD9"),
  HTML: devicon("html5"),
  JavaScript: devicon("javascript"),
  React: devicon("react"),
  Node: devicon("nodejs"),
  Express: simpleIcon("express", "#000"),
  Radix: simpleIcon("radixui", "#161618"),
  Cursor: simpleIcon("cursor", "#000"),
};

/**
 * Get logo URL for a tech name (case-insensitive match, then key match).
 */
export function getTechLogo(name: string): string | undefined {
  const key = Object.keys(TECH_LOGOS).find(
    (k) => k.toLowerCase() === name.toLowerCase() || k === name
  );
  return key ? TECH_LOGOS[key] : undefined;
}
