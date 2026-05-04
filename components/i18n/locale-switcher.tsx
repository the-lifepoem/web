"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

import { locales, type Locale } from "../../lib/i18n/config";
import { useTranslations } from "./translations-provider";

function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && (locales as readonly string[]).includes(parts[0] ?? "")) {
    return "/" + parts.slice(1).join("/") || "/";
  }
  return pathname || "/";
}

function hrefForLocale(locale: Locale, pathname: string): string {
  const rest = stripLocale(pathname);
  if (rest === "/") return `/${locale}`;
  return `/${locale}${rest}`;
}

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, dict } = useTranslations();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as Locale;
    router.push(hrefForLocale(next, pathname));
  }

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="lifepoem-locale" className="sr-only">
        {dict.nav.language}
      </label>
      <select
        id="lifepoem-locale"
        value={locale}
        onChange={handleChange}
        aria-label={dict.nav.language}
        className={
          "min-w-[11rem] cursor-pointer appearance-none rounded-full border border-[var(--lifepoem-border)] " +
          "bg-[var(--lifepoem-card)] py-2 pl-4 pr-10 text-sm font-medium text-[var(--lifepoem-text)] shadow-sm " +
          "transition hover:border-[var(--lifepoem-primary)] hover:bg-[var(--lifepoem-bg)] " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lifepoem-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lifepoem-bg)]"
        }
      >
        {locales.map(function optionLocale(l) {
          return (
            <option key={l} value={l}>
              {dict.localeNames[l]}
            </option>
          );
        })}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--lifepoem-primary)]"
      >
        ▾
      </span>
    </div>
  );
}
