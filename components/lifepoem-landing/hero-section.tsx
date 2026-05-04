"use client";

import { LocaleSwitcher } from "../i18n/locale-switcher";
import { useTranslations } from "../i18n/translations-provider";

export function HeroSection() {
  const { dict } = useTranslations();

  return (
    <section className="relative overflow-hidden border-b border-[var(--lifepoem-border)] bg-[var(--lifepoem-bg)] px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28">
      <div className="absolute right-4 top-6 z-20 sm:right-8 sm:top-8">
        <LocaleSwitcher />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,var(--lifepoem-primary-soft),transparent_65%)]"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-serif text-sm font-semibold tracking-[0.2em] text-[var(--lifepoem-primary)]">
          {dict.hero.chineseTitle}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[var(--lifepoem-text)] sm:text-5xl">
          {dict.hero.name}
        </h1>
        <p className="mt-4 text-lg text-[var(--lifepoem-text)] sm:text-xl">{dict.hero.tagline}</p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--lifepoem-text-muted)]">
          {dict.hero.intro}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            className="inline-flex h-14 min-w-[10rem] items-center justify-center rounded-[1.25rem] bg-[var(--lifepoem-primary)] px-8 text-base font-semibold text-white shadow-md transition hover:bg-[var(--lifepoem-primary-hover)]"
            href="#screenshots"
          >
            {dict.hero.ctaApp}
          </a>
          <a
            className="inline-flex h-14 min-w-[10rem] items-center justify-center rounded-[1.25rem] border-2 border-[var(--lifepoem-primary)] bg-white/90 px-8 text-base font-semibold text-[var(--lifepoem-primary)] backdrop-blur transition hover:bg-[var(--lifepoem-primary-soft)]"
            href="#about"
          >
            {dict.hero.ctaAbout}
          </a>
        </div>
      </div>
    </section>
  );
}
