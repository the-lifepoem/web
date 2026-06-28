"use client";

import Image from "next/image";

import { useTranslations } from "../i18n/translations-provider";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=one.lifepoem.android";

type PlayStoreButtonProps = {
  className?: string;
};

export function PlayStoreButton({ className }: PlayStoreButtonProps) {
  const { dict } = useTranslations();

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={dict.hero.playStoreAlt}
    >
      <Image
        src="/lifepoem/google-play-badge.svg"
        alt=""
        width={135}
        height={40}
        className="h-10 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:h-12 md:h-14"
      />
    </a>
  );
}
