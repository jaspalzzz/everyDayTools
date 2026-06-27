"use client";

import {
  IconAlertTriangle,
  IconArrowRight,
  IconArrowsExchange,
  IconBabyBottle,
  IconBabyCarriage,
  IconBeach,
  IconBolt,
  IconBriefcase,
  IconBusinessplan,
  IconCalendarClock,
  IconCalendarDollar,
  IconCalendarDue,
  IconCalendarWeek,
  IconCash,
  IconCashBanknote,
  IconChevronDown,
  IconClockDollar,
  IconClockHour4,
  IconFileDownload,
  IconFileOff,
  IconGift,
  IconHome,
  IconHomeHeart,
  IconInfoCircle,
  IconLoader2,
  IconLock,
  IconMoodSick,
  IconPlant2,
  IconScale,
  IconSearch,
  IconTrendingUp,
  IconUsersGroup,
  IconWallet,
  IconWorld,
} from "@tabler/icons-react";
import type { ComponentType, SVGAttributes } from "react";

const ICON_MAP: Record<string, ComponentType<SVGAttributes<SVGElement> & { size?: number; stroke?: number }>> = {
  "ti-alert-triangle": IconAlertTriangle,
  "ti-arrow-right": IconArrowRight,
  "ti-arrows-exchange": IconArrowsExchange,
  "ti-baby-bottle": IconBabyBottle,
  "ti-baby-carriage": IconBabyCarriage,
  "ti-beach": IconBeach,
  "ti-bolt": IconBolt,
  "ti-briefcase": IconBriefcase,
  "ti-businessplan": IconBusinessplan,
  "ti-calendar-clock": IconCalendarClock,
  "ti-calendar-dollar": IconCalendarDollar,
  "ti-calendar-due": IconCalendarDue,
  "ti-calendar-week": IconCalendarWeek,
  "ti-cash": IconCash,
  "ti-cash-banknote": IconCashBanknote,
  "ti-chevron-down": IconChevronDown,
  "ti-clock-dollar": IconClockDollar,
  "ti-clock-hour-4": IconClockHour4,
  "ti-file-download": IconFileDownload,
  "ti-file-off": IconFileOff,
  "ti-gift": IconGift,
  "ti-home": IconHome,
  "ti-home-heart": IconHomeHeart,
  "ti-info-circle": IconInfoCircle,
  "ti-loader-2": IconLoader2,
  "ti-lock": IconLock,
  "ti-mood-sick": IconMoodSick,
  "ti-plant-2": IconPlant2,
  "ti-scale": IconScale,
  "ti-search": IconSearch,
  "ti-trending-up": IconTrendingUp,
  "ti-users-group": IconUsersGroup,
  "ti-wallet": IconWallet,
  "ti-world": IconWorld,
};

/**
 * Thin wrapper that maps Tabler webfont class names to tree-shaken SVG
 * components. Drop-in replacement for `<i className="ti ti-xxx">` —
 * eliminates the CDN webfont stylesheet.
 */
export function TablerIcon({
  name,
  className,
  size = 20,
  "aria-hidden": ariaHidden,
}: {
  name: string;
  className?: string;
  size?: number;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} aria-hidden={ariaHidden} />;
}
