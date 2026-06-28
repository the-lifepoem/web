import type { Locale } from "../i18n/config";
import type { LegalDocument } from "./legal-types";
import privacyEn from "./documents/privacy/en";
import privacyMs from "./documents/privacy/ms";
import privacyTa from "./documents/privacy/ta";
import privacyZh from "./documents/privacy/zh";
import termsEn from "./documents/terms/en";
import termsMs from "./documents/terms/ms";
import termsTa from "./documents/terms/ta";
import termsZh from "./documents/terms/zh";
import deleteAccountEn from "./documents/delete-account/en";
import deleteAccountMs from "./documents/delete-account/ms";
import deleteAccountTa from "./documents/delete-account/ta";
import deleteAccountZh from "./documents/delete-account/zh";

const termsByLocale: Record<Locale, LegalDocument> = {
  en: termsEn,
  zh: termsZh,
  ms: termsMs,
  ta: termsTa,
};

const privacyByLocale: Record<Locale, LegalDocument> = {
  en: privacyEn,
  zh: privacyZh,
  ms: privacyMs,
  ta: privacyTa,
};

const deleteAccountByLocale: Record<Locale, LegalDocument> = {
  en: deleteAccountEn,
  zh: deleteAccountZh,
  ms: deleteAccountMs,
  ta: deleteAccountTa,
};

export function getTermsDocument(locale: Locale): LegalDocument {
  return termsByLocale[locale];
}

export function getPrivacyDocument(locale: Locale): LegalDocument {
  return privacyByLocale[locale];
}

export function getDeleteAccountDocument(locale: Locale): LegalDocument {
  return deleteAccountByLocale[locale];
}
