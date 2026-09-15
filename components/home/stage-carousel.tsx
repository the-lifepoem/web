"use client";

import Image from "next/image";

import type { Dictionary } from "../../lib/i18n/dictionary";
import { interpolate } from "../../lib/i18n/interpolate";
import { LIFE_STAGE_ART, LIFE_STAGE_ART_RATIO } from "../../lib/life-stages";
import { useCarousel } from "./use-carousel";

type StageCarouselProps = {
  hero: Dictionary["hero"];
  stages: Dictionary["stages"];
  a11y: Dictionary["a11y"];
};

/**
 * The hero artwork, one painting per life stage, swipeable.
 *
 * The chip below the frame names the stage on show rather than repeating a fixed
 * word, so the picture and the label can never disagree; it is a live region
 * because for a screen-reader user the name is the only thing that changes when
 * the slide does.
 *
 * Indicators carry the stage name instead of a slide number: seven dots is more
 * than a listener can count, and the names are already the site's vocabulary.
 * There are no previous/next buttons here — the gallery further down the page
 * has those, and the hero column already holds both store badges and the
 * primary link.
 */
export function StageCarousel({ hero, stages, a11y }: StageCarouselProps) {
  const count = LIFE_STAGE_ART.length;
  const { index, go, animate, controls } = useCarousel(count);

  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col">
      <div className="relative">
        <div className="rounded-frame border border-edge bg-card p-[26px] shadow-frame">
          <div
            role="region"
            aria-label={a11y.stageRegion}
            {...controls}
            className="overflow-hidden rounded-media"
          >
            <div
              className="flex"
              style={{
                width: `${count * 100}%`,
                transform: `translateX(-${index * (100 / count)}%)`,
                transition: animate ? "transform .45s cubic-bezier(.4,0,.2,1)" : "none",
              }}
            >
              {LIFE_STAGE_ART.map((path, slide) => (
                <div
                  key={path}
                  aria-hidden={slide !== index}
                  style={{ width: `${100 / count}%` }}
                  className="shrink-0"
                >
                  <div
                    style={{ aspectRatio: LIFE_STAGE_ART_RATIO }}
                    className="relative w-full overflow-hidden rounded-media"
                  >
                    <Image
                      src={path}
                      alt={stages.artAlts[slide]}
                      fill
                      sizes="(max-width: 900px) 90vw, 410px"
                      preload={slide === 0}
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="absolute bottom-[34px] left-[-18px] flex flex-col gap-0.5 rounded-panel border border-edge bg-card px-4 py-3 shadow-card">
          <span className="text-eyebrow font-semibold uppercase text-brand">{hero.chipEyebrow}</span>
          <span aria-live="polite" className="font-display text-lockup-sm text-ink">
            {stages.items[index]}
          </span>
        </p>
      </div>

      {/* Wraps rather than shrinks: seven 44px hit areas fit a 320px viewport
          only just, and 44px is the touch-target floor. */}
      <ul
        aria-label={stages.eyebrow}
        className="m-0 mt-5 flex list-none flex-wrap justify-center gap-0 p-0"
      >
        {stages.items.map((name, slide) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => go(slide)}
              aria-current={slide === index}
              aria-label={interpolate(a11y.showStage, { stage: name })}
              className="flex size-tap items-center justify-center bg-transparent"
            >
              <span
                aria-hidden="true"
                className={`block h-3 rounded-full border border-brand transition-all ${
                  slide === index ? "w-[30px] bg-brand" : "w-3 bg-card"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
