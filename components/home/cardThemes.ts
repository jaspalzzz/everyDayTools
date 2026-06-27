/** Pastel icon-box accents matching the design template. */
export const CARD_THEMES = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-500",
  purple: "bg-violet-50 text-violet-500",
  orange: "bg-orange-50 text-orange-500",
  red: "bg-red-50 text-red-500",
  gray: "bg-surface-muted text-ink-soft",
} as const;

export type CardTheme = keyof typeof CARD_THEMES;
