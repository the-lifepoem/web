import { AppStoreButton } from "./app-store-button";
import { PlayStoreButton } from "./play-store-button";

const badgeClassName =
  "inline-block rounded-md transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lifepoem-primary)]";

export function StoreBadges() {
  return (
    <section className="border-b border-[var(--lifepoem-border)] bg-[var(--lifepoem-bg)] px-4 py-8 sm:py-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 sm:gap-6">
        <AppStoreButton className={badgeClassName} />
        <PlayStoreButton className={badgeClassName} />
      </div>
    </section>
  );
}
