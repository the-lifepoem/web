import { LegalPage, legalMetadata } from "../../../components/legal/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return legalMetadata("delete-account", locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalPage kind="delete-account" localeParam={locale} />;
}
