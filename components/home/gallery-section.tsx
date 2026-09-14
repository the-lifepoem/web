import type { Dictionary } from "../../lib/i18n/dictionary";
import { interpolate } from "../../lib/i18n/interpolate";
import { SectionHeading } from "../site/section-heading";
import { SCREENSHOT_PATHS } from "../../lib/screenshots";
import { ScreenshotGallery } from "./screenshot-gallery";

export function GallerySection({ gallery, a11y }: { gallery: Dictionary["gallery"]; a11y: Dictionary["a11y"] }) {
  return (
    <section id="inside-the-app" className="border-y border-edge bg-card px-6 py-22">
      <div className="mx-auto flex max-w-section flex-col gap-13">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          heading={gallery.heading}
          aside={
            <p className="max-w-[34ch] text-row text-muted">
              {/* Counted from the image list, so the copy cannot claim a number
                  the gallery does not show. */}
              {interpolate(gallery.note, { count: SCREENSHOT_PATHS.length })}
            </p>
          }
        />
        <ScreenshotGallery gallery={gallery} a11y={a11y} />
      </div>
    </section>
  );
}
