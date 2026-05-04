import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { SetHtmlLang } from "../../components/i18n/set-html-lang";
import { TranslationsProvider } from "../../components/i18n/translations-provider";
import { getDictionary } from "../../lib/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "../../lib/i18n/config";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <TranslationsProvider locale={locale} dict={dict}>
        {children}
      </TranslationsProvider>
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export function generateStaticParams() {
  return locales.map(function toParam(locale) {
    return { locale };
  });
}
