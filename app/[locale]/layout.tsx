import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Sans_Tamil, Noto_Serif_SC, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { SkipLink } from "../../components/site/skip-link";
import { getDictionary } from "../../lib/i18n/get-dictionary";
import { isLocale, locales, localeToHtmlLang } from "../../lib/i18n/config";
import { absoluteUrl, languageAlternates, siteOrigin } from "../../lib/site";

/*
 * This is the root layout. It sits under the [locale] segment on purpose: that is
 * how the html lang attribute gets the right value in the server-rendered HTML
 * rather than being patched by client JavaScript after hydration.
 */

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans-3",
  display: "swap",
});

/*
 * The CJK and Tamil families are self-hosted but deliberately not preloaded:
 * preload defaults to true, and preloading a Chinese webfont on every English
 * page would cost far more than it saves. They still load via CSS on the locales
 * whose stylesheet rules reference them.
 */
const notoSerifSC = Noto_Serif_SC({
  weight: ["500", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
});

const notoSansTamil = Noto_Sans_Tamil({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-tamil",
  display: "swap",
  preload: false,
});

const fontVariables = [
  sourceSerif.variable,
  sourceSans.variable,
  notoSerifSC.variable,
  notoSansSC.variable,
  notoSansTamil.variable,
].join(" ");

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteOrigin),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: absoluteUrl(locale),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      siteName: dict.brand.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: absoluteUrl(locale),
      locale: localeToHtmlLang(locale).replace("-", "_"),
      images: [{ url: "/lifepoem/og-image.webp", width: 1200, height: 630, alt: dict.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/lifepoem/og-image.webp"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    /*
     * data-scroll-behavior is required from Next.js 16 onward: the router no
     * longer overrides scroll-behavior: smooth during navigation without it.
     */
    <html
      lang={localeToHtmlLang(locale)}
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <SkipLink label={dict.a11y.skipToContent} />
        {children}
      </body>
    </html>
  );
}
