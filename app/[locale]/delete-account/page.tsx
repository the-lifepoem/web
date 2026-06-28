import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocaleSwitcher } from "../../../components/i18n/locale-switcher";
import { LegalDocumentView } from "../../../components/legal/legal-document-view";
import { getDictionary } from "../../../lib/i18n/get-dictionary";
import { isLocale, type Locale } from "../../../lib/i18n/config";
import { getDeleteAccountDocument } from "../../../lib/legal/get-legal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const doc = getDeleteAccountDocument(raw as Locale);
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DeleteAccountPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const doc = getDeleteAccountDocument(locale);

  return (
    <div className="min-h-full bg-[var(--lifepoem-bg)]">
      <div className="mx-auto flex max-w-3xl justify-end px-4 pt-6 sm:px-6">
        <LocaleSwitcher />
      </div>
      <LegalDocumentView
        doc={doc}
        locale={locale}
        labels={{
          home: dict.legal.home,
          linkPrivacy: dict.legal.linkPrivacy,
          linkTerms: dict.legal.linkTerms,
        }}
      />
    </div>
  );
}
