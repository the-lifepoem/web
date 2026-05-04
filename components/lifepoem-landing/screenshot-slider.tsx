"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { useTranslations } from "../i18n/translations-provider";
import { SCREENSHOT_PATHS } from "./lifepoem-landing-content";

export function ScreenshotSlider() {
  const { dict, t } = useTranslations();
  const slides = dict.screenshots.slides;
  const [index, setIndex] = useState(0);
  const count = SCREENSHOT_PATHS.length;

  const goPrev = useCallback(function goPrev() {
    setIndex(function prev(i) {
      return (i - 1 + count) % count;
    });
  }, [count]);

  const goNext = useCallback(function goNext() {
    setIndex(function prev(i) {
      return (i + 1) % count;
    });
  }, [count]);

  const step = slides[index];
  if (!step) return null;

  return (
    <div className="mx-auto mt-12 w-full max-w-[380px] px-1">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--lifepoem-border)] bg-[var(--lifepoem-card)] shadow-[0_24px_60px_rgba(62,43,26,0.12)]">
        <div
          className="flex motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {SCREENSHOT_PATHS.map(function mapPath(src, i) {
            return (
              <div key={src} className="min-w-full shrink-0">
                <div className="relative aspect-[9/19.5] w-full max-h-[min(88svh,820px)]">
                  <Image
                    src={src}
                    alt={slides[i]?.alt ?? ""}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 380px"
                    priority={i === 0}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--lifepoem-border)] bg-[var(--lifepoem-card)]/95 text-lg text-[var(--lifepoem-primary)] shadow-md backdrop-blur transition hover:bg-[var(--lifepoem-bg)]"
          aria-label={dict.a11y.prevScreenshot}
          onClick={goPrev}
        >
          ‹
        </button>
        <button
          type="button"
          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--lifepoem-border)] bg-[var(--lifepoem-card)]/95 text-lg text-[var(--lifepoem-primary)] shadow-md backdrop-blur transition hover:bg-[var(--lifepoem-bg)]"
          aria-label={dict.a11y.nextScreenshot}
          onClick={goNext}
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2.5" role="tablist" aria-label={dict.a11y.screenshotSlides}>
        {SCREENSHOT_PATHS.map(function dot(_, i) {
          const isActive = i === index;
          return (
            <button
              key={SCREENSHOT_PATHS[i]}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={t("a11y.slideNumber", { current: i + 1, total: count })}
              className={
                "h-2.5 rounded-full transition-all " +
                (isActive
                  ? "w-8 bg-[var(--lifepoem-primary)]"
                  : "w-2.5 bg-[var(--lifepoem-border)] hover:bg-[var(--lifepoem-text-muted)]")
              }
              onClick={function selectSlide() {
                setIndex(i);
              }}
            />
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <h3 className="font-serif text-lg font-semibold text-[var(--lifepoem-text)]">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--lifepoem-text-muted)]">{step.body}</p>
      </div>
    </div>
  );
}
