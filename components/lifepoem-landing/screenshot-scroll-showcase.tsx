"use client";

import { ScreenshotSlider } from "./screenshot-slider";
import { useTranslations } from "../i18n/translations-provider";

export function ScreenshotScrollShowcase() {
  const { dict } = useTranslations();

  return (
    <section id="screenshots" className="bg-[var(--lifepoem-bg)] pb-24 pt-16 lg:pb-28 lg:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-2xl font-bold text-[var(--lifepoem-text)] sm:text-3xl">
          {dict.screenshots.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--lifepoem-text-muted)]">
          {dict.screenshots.sub}
        </p>
        <ScreenshotSlider />
      </div>
    </section>
  );
}
