import type { Dictionary } from "../../lib/i18n/dictionary";
import { SectionHeading } from "../site/section-heading";
import { ScreenshotGallery } from "./screenshot-gallery";

export function GallerySection({ gallery, a11y }: { gallery: Dictionary["gallery"]; a11y: Dictionary["a11y"] }) {
  return (
    <section id="inside-the-app" className="border-y border-edge bg-card px-6 py-22">
      <div className="mx-auto flex max-w-section flex-col gap-13">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          heading={gallery.heading}
          aside={<p className="max-w-[34ch] text-row text-muted">{gallery.note}</p>}
        />
        <ScreenshotGallery gallery={gallery} a11y={a11y} />
      </div>
    </section>
  );
}
