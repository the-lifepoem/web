"use client";

import { useEffect } from "react";

import { localeToHtmlLang, type Locale } from "../../lib/i18n/config";

export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(
    function syncLang() {
      document.documentElement.lang = localeToHtmlLang(locale);
    },
    [locale],
  );
  return null;
}
