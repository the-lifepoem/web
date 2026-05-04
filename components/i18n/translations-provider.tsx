"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { Locale } from "../../lib/i18n/config";
import type { Dictionary } from "../../lib/i18n/dictionary";

type TranslationsContextValue = {
  locale: Locale;
  dict: Dictionary;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const TranslationsContext = createContext<TranslationsContextValue | null>(null);

function getNested(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>(function walk(acc, part) {
    if (acc !== null && acc !== undefined && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function TranslationsProvider({
  children,
  locale,
  dict,
}: {
  children: ReactNode;
  locale: Locale;
  dict: Dictionary;
}) {
  const t = useMemo(
    function createT() {
      return function t(key: string, vars?: Record<string, string | number>) {
        const raw = getNested(dict as unknown, key);
        if (typeof raw !== "string") return key;
        let s = raw;
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            s = s.replaceAll(`{${k}}`, String(v));
          }
        }
        return s;
      };
    },
    [dict],
  );

  const value = useMemo(
    function memoCtx() {
      return { locale, dict, t };
    },
    [locale, dict, t],
  );

  return <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>;
}

export function useTranslations() {
  const ctx = useContext(TranslationsContext);
  if (!ctx) {
    throw new Error("useTranslations must be used within TranslationsProvider");
  }
  return ctx;
}
