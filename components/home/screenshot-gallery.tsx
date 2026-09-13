"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "../../lib/i18n/dictionary";
import { interpolate } from "../../lib/i18n/interpolate";

/**
 * Image order. The caption array in every locale file is index-aligned with
 * this list; changing one without the others mislabels a screen.
 */
export const SCREENSHOT_PATHS = [
  "/lifepoem/screenshots/1.jpg",
  "/lifepoem/screenshots/2.jpg",
  "/lifepoem/screenshots/3.jpg",
  "/lifepoem/screenshots/4.jpg",
  "/lifepoem/screenshots/5.jpg",
  "/lifepoem/screenshots/6.jpg",
] as const;

/** Deliberate travel, so an unsteady hand does not change slides by accident. */
const SWIPE_MIN_DISTANCE = 48;
const SWIPE_MAX_DURATION = 300;

type ScreenshotGalleryProps = {
  gallery: Dictionary["gallery"];
  a11y: Dictionary["a11y"];
};

export function ScreenshotGallery({ gallery, a11y }: ScreenshotGalleryProps) {
  const count = SCREENSHOT_PATHS.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const touch = useRef<{ x: number; y: number; at: number } | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAnimate(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(index - 1);
    else if (event.key === "ArrowRight") go(index + 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(count - 1);
    else return;
    event.preventDefault();
  };

  const onTouchStart = (event: React.TouchEvent) => {
    const point = event.touches[0];
    touch.current = { x: point.clientX, y: point.clientY, at: Date.now() };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;

    const point = event.changedTouches[0];
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;

    // Ignore anything that reads as vertical scrolling rather than a swipe.
    if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;
    if (Math.abs(dx) <= Math.abs(dy)) return;
    if (Date.now() - start.at > SWIPE_MAX_DURATION) return;

    go(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <div className="rounded-frame border border-edge bg-parchment p-[clamp(18px,3vw,34px)]">
      <div
        role="region"
        aria-label={a11y.galleryRegion}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="overflow-hidden"
      >
        <div
          className="flex w-[600%]"
          style={{
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
                className="grid w-[16.6667%] shrink-0 grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] items-center gap-8"
              >
                <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[300px] overflow-hidden rounded-phone border border-edge">
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
            className="inline-flex min-h-12 items-center rounded-control border border-brand px-5 py-3 text-row font-semibold text-brand hover:bg-tint"
          >
            {gallery.previous}
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={a11y.nextScreenshot}
            className="inline-flex min-h-12 items-center rounded-control bg-brand px-5 py-3 text-row font-semibold text-white hover:bg-brand-hover"
          >
            {gallery.next}
          </button>
        </div>

        <p aria-live="polite" className="text-row font-semibold text-ink">
          {interpolate(a11y.galleryPosition, { current: index + 1, total: count })}
        </p>

        <ul className="m-0 flex list-none gap-0 p-0" aria-label={a11y.screenshotSlides}>
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
                  className={`block h-3 rounded-[6px] border border-brand transition-all ${
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
