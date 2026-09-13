import Image from "next/image";

export const APP_STORE_URL = "https://apps.apple.com/sg/app/life-poem/id6766281573";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=one.lifepoem.android";

/**
 * Both badges are official vendor artwork used unmodified at their own
 * proportions, which is what each vendor's brand guidelines require. The widths
 * below come from the design prototype's asset slots.
 */
const APP_STORE = { width: 186, height: 63 } as const; // 119:40
const PLAY_STORE = { width: 200, height: 59 } as const; // 135:40

type StoreBadgesProps = {
  labels: { appStoreAlt: string; playStoreAlt: string };
  /** The dark download panel needs light-on-dark focus treatment. */
  tone?: "light" | "dark";
  className?: string;
};

export function StoreBadges({ labels, tone = "light", className = "" }: StoreBadgesProps) {
  const link =
    "inline-flex rounded-[10px] transition hover:opacity-90 " +
    (tone === "dark" ? "focus-visible:outline-on-dark" : "");

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <a href={APP_STORE_URL} target="_blank" rel="noreferrer" aria-label={labels.appStoreAlt} className={link}>
        <Image
          src="/lifepoem/app-store-badge.svg"
          alt=""
          width={APP_STORE.width}
          height={APP_STORE.height}
          className="h-auto w-[186px] max-w-full"
          unoptimized
        />
      </a>
      <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" aria-label={labels.playStoreAlt} className={link}>
        <Image
          src="/lifepoem/google-play-badge.svg"
          alt=""
          width={PLAY_STORE.width}
          height={PLAY_STORE.height}
          className="h-auto w-[200px] max-w-full"
          unoptimized
        />
      </a>
    </div>
  );
}
