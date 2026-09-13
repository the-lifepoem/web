import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "../../lib/i18n/config";
import { getDictionary } from "../../lib/i18n/get-dictionary";
import { getDeleteAccountDocument, getPrivacyDocument, getTermsDocument } from "../../lib/legal/get-legal";
import type { LegalDocument } from "../../lib/legal/legal-types";
import { absoluteUrl, languageAlternates, type LocalisedRoute } from "../../lib/site";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { LegalDocumentView } from "./legal-document-view";

/**
 * The three legal routes differ only in which document they load, so the shell,
 * the metadata shape and the locale guard live here once.
 */
export type LegalKind = "privacy" | "terms" | "delete-account";

const DOCUMENTS: Record<LegalKind, (locale: Locale) => LegalDocument> = {
  privacy: getPrivacyDocument,
  terms: getTermsDocument,
  "delete-account": getDeleteAccountDocument,
};

const ROUTES: Record<LegalKind, LocalisedRoute> = {
  privacy: "/privacy",
  terms: "/terms",
  "delete-account": "/delete-account",
};

export async function legalMetadata(kind: LegalKind, localeParam: string): Promise<Metadata> {
  if (!isLocale(localeParam)) return {};
  const doc = DOCUMENTS[kind](localeParam);
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: absoluteUrl(localeParam, ROUTES[kind]),
      languages: languageAlternates(ROUTES[kind]),
    },
  };
}

export async function LegalPage({ kind, localeParam }: { kind: LegalKind; localeParam: string }) {
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam;
  const dict = await getDictionary(locale);
  const doc = DOCUMENTS[kind](locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        nav={dict.nav}
        brand={dict.brand}
        localeNames={dict.localeNames}
        chooseLanguage={dict.a11y.chooseLanguage}
        onHome={false}
      />
      <LegalDocumentView doc={doc} locale={locale} labels={dict.legal} />
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
