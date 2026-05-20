"use client";

import Image from "next/image";

import { useTranslations } from "../i18n/translations-provider";

const APP_STORE_URL = "https://apps.apple.com/sg/app/life-poem/id6766281573";

type AppStoreButtonProps = {
  className?: string;
};

export function AppStoreButton({ className }: AppStoreButtonProps) {
  const { dict } = useTranslations();

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={dict.hero.appStoreAlt}
    >
      <Image
        src="/lifepoem/app-store-badge.svg"
        alt=""
        width={120}
        height={40}
        className="h-10 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:h-12 md:h-14"
      />
    </a>
  );
}
