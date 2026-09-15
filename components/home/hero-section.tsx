import Link from "next/link";

import type { Dictionary } from "../../lib/i18n/dictionary";
import { StoreBadges } from "../site/store-badges";
import { LifeStages } from "./life-stages";
import { StageCarousel } from "./stage-carousel";

export function HeroSection({
  hero,
  stages,
  store,
  a11y,
}: {
  hero: Dictionary["hero"];
  stages: Dictionary["stages"];
  store: Dictionary["store"];
  a11y: Dictionary["a11y"];
}) {
  return (
    <section className="px-6 pb-22 pt-18">
      <div className="mx-auto grid max-w-shell grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-center gap-14">
        <div className="flex max-w-[620px] flex-col gap-7">
          <p className="text-eyebrow font-semibold uppercase text-brand">{hero.eyebrow}</p>
          <h1 className="font-display text-display font-semibold text-ink text-pretty">{hero.heading}</h1>
          <p className="max-w-[34ch] text-lead text-muted">{hero.lead}</p>

          <StoreBadges labels={store} />

          <Link href="#how-it-works" className="inline-flex min-h-tap items-center text-body font-semibold text-brand">
            {hero.seeHow}
          </Link>

          <p className="border-t border-edge pt-6 text-row text-muted">{hero.availableIn}</p>
        </div>

        <StageCarousel hero={hero} stages={stages} a11y={a11y} />
      </div>

      <LifeStages content={stages} />
    </section>
  );
}
