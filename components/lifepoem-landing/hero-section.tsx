"use client";

import Image from "next/image";

import { LocaleSwitcher } from "../i18n/locale-switcher";
import { useTranslations } from "../i18n/translations-provider";
import { AppStoreButton } from "./app-store-button";

export function HeroSection() {
  const { dict } = useTranslations();

  return (
    <section className="relative overflow-hidden border-b border-[var(--lifepoem-border)] bg-[var(--lifepoem-bg)]">
      <div className="absolute right-4 top-6 z-20 sm:right-8 sm:top-8">
        <LocaleSwitcher />
      </div>
      <div className="absolute left-[4%] top-1/2 z-20 -translate-y-1/2 sm:left-[6%]">
        <AppStoreButton className="inline-block rounded-md transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lifepoem-primary)]" />
      </div>
      <Image
        src="/lifepoem/hero.png"
        alt={dict.hero.imageAlt}
        width={1488}
        height={720}
        priority
        sizes="100vw"
        className="block h-auto w-full"
      />
    </section>
  );
}
