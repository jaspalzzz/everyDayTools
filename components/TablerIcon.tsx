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
  IconBriefcaseOff,
  IconBusinessplan,
  IconCalculator,
  IconCalendarClock,
  IconCalendarDollar,
  IconCalendarDue,
  IconCalendarWeek,
  IconCash,
  IconCashBanknote,
  IconBuilding,
  IconChevronDown,
  IconChevronRight,
  IconFileCertificate,
  IconFileDescription,
  IconClockDollar,
  IconClockHour4,
  IconDots,
  IconFileCheck,
  IconFileDownload,
  IconFileOff,
  IconFileText,
  IconGavel,
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
  IconShieldCheck,
  IconTrendingUp,
  IconUsers,
  IconUsersGroup,
  IconMenu2,
  IconCheck,
  IconLink,
  IconWallet,
  IconWorld,
  IconX,
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
  "ti-briefcase-off": IconBriefcaseOff,
  "ti-businessplan": IconBusinessplan,
  "ti-calculator": IconCalculator,
  "ti-calendar-clock": IconCalendarClock,
  "ti-calendar-dollar": IconCalendarDollar,
  "ti-calendar-due": IconCalendarDue,
  "ti-calendar-week": IconCalendarWeek,
  "ti-cash": IconCash,
  "ti-cash-banknote": IconCashBanknote,
  "ti-building": IconBuilding,
  "ti-chevron-down": IconChevronDown,
  "ti-chevron-right": IconChevronRight,
  "ti-file-certificate": IconFileCertificate,
  "ti-file-description": IconFileDescription,
  "ti-clock-dollar": IconClockDollar,
  "ti-clock-hour-4": IconClockHour4,
  "ti-dots": IconDots,
  "ti-file-check": IconFileCheck,
  "ti-file-download": IconFileDownload,
  "ti-file-off": IconFileOff,
  "ti-file-text": IconFileText,
  "ti-gavel": IconGavel,
  "ti-gift": IconGift,
  "ti-home": IconHome,
  "ti-home-heart": IconHomeHeart,
  "ti-info-circle": IconInfoCircle,
  "ti-loader-2": IconLoader2,
  "ti-lock": IconLock,
  "ti-check": IconCheck,
  "ti-link": IconLink,
  "ti-menu-2": IconMenu2,
  "ti-mood-sick": IconMoodSick,
  "ti-plant-2": IconPlant2,
  "ti-scale": IconScale,
  "ti-search": IconSearch,
  "ti-shield-check": IconShieldCheck,
  "ti-trending-up": IconTrendingUp,
  "ti-users": IconUsers,
  "ti-users-group": IconUsersGroup,
  "ti-wallet": IconWallet,
  "ti-world": IconWorld,
  "ti-x": IconX,
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
