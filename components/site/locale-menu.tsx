"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";


import { LOCALE_COOKIE, locales, type Locale } from "../../lib/i18n/config";
import { interpolate } from "../../lib/i18n/interpolate";

type LocaleMenuProps = {
  locale: Locale;
  localeNames: Record<Locale, string>;
  labels: { languageWith: string; chooseLanguage: string; switchKeepsPage: string };
  /** The footer renders the same choice as a flat row of pills. */
  variant?: "menu" | "pills";
};

/** Fonts must follow the script of the label, not the page. */
const SCRIPT_FONT: Partial<Record<Locale, string>> = {
  zh: "font-body-zh",
  ta: "font-body-ta",
};

function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    const rest = segments.slice(2).join("/");
    return rest ? `/${rest}` : "";
  }
  return pathname === "/" ? "" : pathname;
}

export function LocaleMenu({ locale, localeNames, labels, variant = "menu" }: LocaleMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);

  /**
   * Path only. The query string and fragment are added by the click handler from
   * window.location, which avoids useSearchParams — that hook would opt every
   * page carrying this header out of static rendering. Copying the link address
   * without clicking yields the path, which is the right fallback.
   */
  const hrefFor = useCallback((next: Locale) => `/${next}${stripLocale(pathname ?? "/")}`, [pathname]);

  const choose = useCallback(
    (next: Locale) => (event: React.MouseEvent) => {
      event.preventDefault();
      // A preference, not a credential: readable by the proxy layer so a later
      // visit to a prefix-less URL lands on the chosen locale.
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      setOpen(false);
      router.push(`/${next}${stripLocale(pathname ?? "/")}${window.location.search}${window.location.hash}`);
    },
    [pathname, router],
  );

  // Escape closes and returns focus; a click outside dismisses.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const items = panelRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
      if (!items || items.length === 0) return;
      event.preventDefault();
      const current = Array.from(items).indexOf(document.activeElement as HTMLButtonElement);
      const step = event.key === "ArrowDown" ? 1 : -1;
      const next = current < 0 ? 0 : (current + step + items.length) % items.length;
      items[next].focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  if (variant === "pills") {
    return (
      <ul className="flex flex-wrap gap-2" aria-label={labels.chooseLanguage}>
        {locales.map((option) => (
          <li key={option}>
            <a
              href={hrefFor(option)}
              onClick={choose(option)}
              aria-current={option === locale ? "true" : undefined}
              className={`inline-flex min-h-tap items-center rounded-control border border-edge px-4 text-row no-underline ${
                option === locale ? "bg-tint font-semibold text-ink" : "bg-card text-ink"
              } ${SCRIPT_FONT[option] ?? ""}`}
            >
              {localeNames[option]}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((was) => !was)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className="flex min-h-tap items-center gap-2 rounded-control border border-edge bg-card px-4 py-2.5 text-small font-semibold text-ink"
      >
        <span aria-hidden="true" className="text-small">
          🌐
        </span>
        <span>{interpolate(labels.languageWith, { name: localeNames[locale] })}</span>
        <span aria-hidden="true" className="text-brand">
          ▾
        </span>
      </button>

      {open ? (
        <ul
          ref={panelRef}
          id={menuId}
          role="menu"
          aria-label={labels.chooseLanguage}
          className="absolute right-0 top-[calc(100%+8px)] z-[70] m-0 flex w-[248px] list-none flex-col gap-0.5 rounded-action border border-edge bg-card p-2 shadow-overlay"
        >
          {locales.map((option) => (
            <li key={option} role="none">
              <button
                role="menuitem"
                type="button"
                onClick={choose(option)}
                className={`flex min-h-tap-md w-full cursor-pointer justify-between gap-3 rounded-chip border-0 px-3.5 py-3 text-left text-body text-ink ${
                  option === locale ? "bg-tint" : "bg-transparent"
                } ${SCRIPT_FONT[option] ?? ""}`}
              >
                <span>{localeNames[option]}</span>
                <span className="font-bold text-brand">{option === locale ? "✓" : ""}</span>
              </button>
            </li>
          ))}
          <li role="none" className="px-3.5 pb-1 pt-2 text-eyebrow leading-relaxed text-muted">
            {labels.switchKeepsPage}
          </li>
        </ul>
      ) : null}
    </div>
  );
}
