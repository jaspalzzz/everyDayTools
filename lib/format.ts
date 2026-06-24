import { COUNTRIES, type CountryCode } from "./types";

/**
 * Currency formatting, locale-aware and centralised so no component
 * hardcodes a currency symbol (i18n requirement).
 */
export function formatCurrency(
  amount: number,
  country: CountryCode,
  opts: { decimals?: number } = {},
): string {
  const { currency, locale } = COUNTRIES[country];
  const decimals = opts.decimals ?? 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function formatNumber(value: number, country: CountryCode = "UK"): string {
  const { locale } = COUNTRIES[country];
  return new Intl.NumberFormat(locale).format(value);
}

/** Pluralise a unit: pluralUnit(1, "week") -> "1 week", pluralUnit(3, "week") -> "3 weeks". */
export function pluralUnit(count: number, unit: string): string {
  const rounded = Math.round(count * 100) / 100;
  return `${rounded} ${unit}${rounded === 1 ? "" : "s"}`;
}

/** Clamp a possibly-NaN numeric input to a safe non-negative number. */
export function safeNumber(value: number | string | undefined, fallback = 0): number {
  const n = typeof value === "string" ? parseFloat(value) : value;
  return typeof n === "number" && Number.isFinite(n) && n >= 0 ? n : fallback;
}
