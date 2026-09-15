"use client";

import Image from "next/image";

import type { Dictionary } from "../../lib/i18n/dictionary";
import { interpolate } from "../../lib/i18n/interpolate";
import { SCREENSHOT_PATHS, SCREENSHOT_RATIO } from "../../lib/screenshots";
import { useCarousel } from "./use-carousel";

type ScreenshotGalleryProps = {
  gallery: Dictionary["gallery"];
  a11y: Dictionary["a11y"];
};

export function ScreenshotGallery({ gallery, a11y }: ScreenshotGalleryProps) {
  const count = SCREENSHOT_PATHS.length;
  const { index, go, animate, controls } = useCarousel(count);

  return (
    <div className="rounded-frame border border-edge bg-parchment p-[clamp(18px,3vw,34px)]">
      <div
        role="region"
        aria-label={a11y.galleryRegion}
        {...controls}
        className="overflow-hidden"
      >
        <div
          className="flex"
          style={{
            width: `${count * 100}%`,
            transform: `translateX(-${index * (100 / count)}%)`,
            transition: animate ? "transform .45s cubic-bezier(.4,0,.2,1)" : "none",
          }}
        >
          {SCREENSHOT_PATHS.map((path, slide) => {
            const caption = gallery.slides[slide];
            const current = slide === index;
            return (
              <div
                key={path}
                aria-hidden={!current}
                style={{ width: `${100 / count}%` }}
                className="grid shrink-0 grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] items-center gap-8"
              >
                <div
                  style={{ aspectRatio: SCREENSHOT_RATIO }}
                  className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-phone border border-edge"
                >
                  <Image
                    src={path}
                    alt={caption.alt}
                    fill
                    sizes="(max-width: 640px) 80vw, 300px"
                    preload={slide === 0}
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex max-w-[420px] flex-col gap-3">
                  <p className="text-label font-semibold uppercase text-brand">
                    {interpolate(gallery.counter, { current: slide + 1, total: count })}
                  </p>
                  <h3 className="font-display text-slide font-semibold text-ink">{caption.title}</h3>
                  <p className="text-body text-muted">{caption.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-5">
        {/* Wraps because the Tamil and Malay labels are wider than a 320px
            viewport allows side by side. */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={a11y.prevScreenshot}
            className="inline-flex min-h-tap-md items-center rounded-control border border-brand px-5 py-3 text-row font-semibold text-brand hover:bg-tint"
          >
            {gallery.previous}
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={a11y.nextScreenshot}
            className="inline-flex min-h-tap-md items-center rounded-control bg-brand px-5 py-3 text-row font-semibold text-white hover:bg-brand-hover"
          >
            {gallery.next}
          </button>
        </div>

        <p aria-live="polite" className="text-row font-semibold text-ink">
          {interpolate(a11y.galleryPosition, { current: index + 1, total: count })}
        </p>

        {/* Wraps rather than shrinks: ten 44px hit areas exceed a 390px viewport
            in one row, and 44px is the touch-target floor. */}
        <ul
          className="m-0 flex list-none flex-wrap justify-center gap-0 p-0"
          aria-label={a11y.screenshotSlides}
        >
          {SCREENSHOT_PATHS.map((path, slide) => (
            <li key={path}>
              <button
                type="button"
                onClick={() => go(slide)}
                aria-current={slide === index}
                aria-label={interpolate(a11y.showScreen, { current: slide + 1, total: count })}
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
    </div>
  );
}
