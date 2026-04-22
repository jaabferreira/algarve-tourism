import type { Locale } from "@algarve-tourism/shared";
import { t } from "@algarve-tourism/shared";

export function getTrustItems(locale: Locale) {
  return [
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      title: t(locale, "trust.licensed"),
      subtitle: t(locale, "trust.licensed_sub"),
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      title: t(locale, "trust.tripadvisor"),
      subtitle: t(locale, "trust.tripadvisor_sub"),
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>',
      title: t(locale, "trust.free_cancel"),
      subtitle: t(locale, "trust.free_cancel_sub"),
    },
    {
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
      title: t(locale, "trust.small_groups"),
      subtitle: t(locale, "trust.small_groups_sub"),
    },
  ];
}
