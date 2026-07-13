const DAY_MS = 86_400_000;

export function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? date
    : null;
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function addUtcDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

export function addUtcMonths(date: Date, months: number): Date {
  const targetMonth = date.getUTCMonth() + months;
  const first = new Date(Date.UTC(date.getUTCFullYear(), targetMonth, 1));
  const lastDay = new Date(
    Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0),
  ).getUTCDate();
  return new Date(
    Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), Math.min(date.getUTCDate(), lastDay)),
  );
}

export function addUtcYears(date: Date, years: number): Date {
  const targetYear = date.getUTCFullYear() + years;
  const month = date.getUTCMonth();
  const lastDay = new Date(Date.UTC(targetYear, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(targetYear, month, Math.min(date.getUTCDate(), lastDay)));
}

export function daysBetween(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / DAY_MS);
}

export function calendarDifference(start: Date, end: Date): {
  years: number;
  months: number;
  days: number;
} {
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  if (addUtcYears(start, years) > end) years -= 1;
  const yearAnchor = addUtcYears(start, years);

  let months = 0;
  while (months < 11 && addUtcMonths(yearAnchor, months + 1) <= end) months += 1;
  const monthAnchor = addUtcMonths(yearAnchor, months);

  return { years, months, days: daysBetween(monthAnchor, end) };
}
