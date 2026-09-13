import { notFound } from "next/navigation";

import { DownloadSection } from "../../components/home/download-section";
import { ExampleStory } from "../../components/home/example-story";
import { GallerySection } from "../../components/home/gallery-section";
import { HeroSection } from "../../components/home/hero-section";
import { HowItWorks } from "../../components/home/how-it-works";
import { PaceSection } from "../../components/home/pace-section";
import { SiteShell } from "../../components/site/site-shell";
import { isLocale } from "../../lib/i18n/config";
import { getDictionary } from "../../lib/i18n/get-dictionary";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <SiteShell locale={locale} dict={dict} onHome>
      <main id="main-content">
        <HeroSection hero={dict.hero} store={dict.store} />
        <HowItWorks content={dict.howItWorks} />
        <PaceSection content={dict.pace} />
        <GallerySection gallery={dict.gallery} a11y={dict.a11y} />
        <ExampleStory content={dict.example} />
        <DownloadSection content={dict.download} store={dict.store} />
      </main>
    </SiteShell>
  );
}
