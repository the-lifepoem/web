import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "../../lib/i18n/dictionary";
import { StoreBadges } from "../site/store-badges";

export function HeroSection({ hero, store }: { hero: Dictionary["hero"]; store: Dictionary["store"] }) {
  return (
    <section className="px-6 pb-22 pt-18">
      <div className="mx-auto grid max-w-shell grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-center gap-14">
        <div className="flex max-w-[620px] flex-col gap-7">
          <p className="text-eyebrow font-semibold uppercase text-brand">{hero.eyebrow}</p>
          <h1 className="font-display text-display font-semibold text-ink text-pretty">{hero.heading}</h1>
          <p className="max-w-[34ch] text-lead text-muted">{hero.lead}</p>

          <StoreBadges labels={store} />

          <Link href="#how-it-works" className="inline-flex min-h-tap items-center text-[19px] font-semibold text-brand">
            {hero.seeHow}
          </Link>

          <p className="border-t border-edge pt-6 text-row text-muted">{hero.availableIn}</p>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="rounded-frame border border-edge bg-card p-[26px] shadow-frame">
            {/*
             * 4:5 portrait crop of the brand artwork. The crop deliberately takes
             * the left of the original, which carries no baked-in text, so the
             * hero reads the same in every locale and the headline above is real
             * translatable HTML.
             */}
            <Image
              src="/lifepoem/hero-portrait.webp"
              alt={hero.imageAlt}
              width={820}
              height={1025}
              sizes="(max-width: 900px) 90vw, 410px"
              preload
              className="block h-auto w-full rounded-media"
            />
          </div>

          <p className="absolute bottom-[34px] left-[-18px] flex flex-col gap-0.5 rounded-panel border border-edge bg-card px-4 py-3 shadow-card">
            <span className="text-eyebrow font-semibold uppercase text-brand">{hero.chipEyebrow}</span>
            <span className="font-display text-[19px] text-ink">{hero.chipValue}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
