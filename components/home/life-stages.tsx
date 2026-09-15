import Image from "next/image";

import type { Dictionary } from "../../lib/i18n/dictionary";

/**
 * The seven life stages, in the order the app walks through them, closing the
 * hero. The names are the app's own — taken from its string table in every
 * locale, so the site and the app never disagree about what a stage is called.
 *
 * The illustration carries no baked-in text, for the same reason the hero
 * portrait does not: one file serves all four locales and the labels beside it
 * are real translatable HTML.
 */
export function LifeStages({ content }: { content: Dictionary["stages"] }) {
  return (
    <div className="mx-auto mt-20 flex max-w-shell flex-col gap-10 border-t border-edge pt-16">
      <div className="flex max-w-[46ch] flex-col gap-4">
        <p className="text-eyebrow font-semibold uppercase text-brand">{content.eyebrow}</p>
        <h2 className="font-display text-section font-semibold text-ink">{content.heading}</h2>
        <p className="text-body text-muted">{content.lead}</p>
      </div>

      <div className="overflow-hidden rounded-media border border-edge bg-paper">
        <Image
          src="/lifepoem/life-stages.svg"
          alt={content.imageAlt}
          width={1200}
          height={340}
          sizes="(max-width: 1240px) 100vw, 1240px"
          className="block h-auto w-full"
        />
      </div>

      {/* An ordered list because the order is the point: the app opens the next
       * stage only once the one before it has a story. */}
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(152px,100%),1fr))] gap-4 p-0">
        {content.items.map((name, index) => (
          <li
            key={name}
            className="flex min-h-tap-lg flex-col items-center justify-center gap-3 rounded-panel border border-edge bg-card px-4 py-5 text-center"
          >
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-full border border-edge bg-parchment font-display text-lockup text-brand"
            >
              {index + 1}
            </span>
            <h3 className="text-row font-semibold text-ink">{name}</h3>
          </li>
        ))}
      </ol>
    </div>
  );
}
