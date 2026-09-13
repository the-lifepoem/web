"use client";

import { useId, useState } from "react";

import type { Dictionary } from "../../lib/i18n/dictionary";

type Format = "prose" | "diary" | "letter";

const FORMATS: Format[] = ["prose", "diary", "letter"];

/**
 * The three story formats the app actually produces. The sample text is invented
 * and permanently badged as such — see the footnote, which ships in every locale.
 */
export function ExampleStory({ content }: { content: Dictionary["example"] }) {
  const [format, setFormat] = useState<Format>("prose");
  const baseId = useId();
  const sample = content.samples[format];

  return (
    <section className="px-6 py-23">
      <div className="mx-auto grid max-w-section grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-13">
        <div className="flex max-w-[520px] flex-col gap-5">
          <p className="text-eyebrow font-semibold uppercase text-brand">{content.eyebrow}</p>
          <h2 className="font-display text-section font-semibold text-ink">{content.heading}</h2>
          <p className="text-body text-muted">{content.bodyOne}</p>
          <p className="text-body text-muted">{content.bodyTwo}</p>

          <dl className="m-0 flex flex-col gap-2">
            {FORMATS.map((key) => (
              <div key={key} className="flex gap-4 text-row">
                <dt className="w-[88px] shrink-0 font-semibold text-ink">{content.formats[key].term}</dt>
                <dd className="m-0 text-muted">{content.formats[key].definition}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-4">
          {/* role="tab" with a real tabpanel and aria-controls, which the
           * prototype's markup omitted. */}
          <div role="tablist" aria-label={content.tabsLabel} className="flex flex-wrap gap-2">
            {FORMATS.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                id={`${baseId}-tab-${key}`}
                aria-selected={format === key}
                aria-controls={`${baseId}-panel-${key}`}
                tabIndex={format === key ? 0 : -1}
                onClick={() => setFormat(key)}
                className={`inline-flex min-h-tap items-center rounded-control border border-brand px-4.5 py-2.75 text-control font-semibold ${
                  format === key ? "bg-brand text-white" : "bg-transparent text-brand"
                }`}
              >
                {content.formats[key].term}
              </button>
            ))}
          </div>

          <article
            role="tabpanel"
            id={`${baseId}-panel-${format}`}
            aria-labelledby={`${baseId}-tab-${format}`}
            tabIndex={0}
            className="flex flex-col gap-4 rounded-card bg-card p-[clamp(24px,3vw,40px)] shadow-card"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-edge bg-parchment px-3 py-1 text-label font-bold uppercase text-brand">
                {content.badge}
              </span>
              <span className="text-small text-muted">{content.stage}</span>
            </div>

            {"date" in sample ? <p className="text-small text-muted">{sample.date}</p> : null}
            {"salutation" in sample ? (
              <p className="font-display text-lead text-ink">{sample.salutation}</p>
            ) : (
              <h3 className="font-display text-card font-semibold text-ink">{sample.title}</h3>
            )}

            {sample.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="font-display text-lead text-ink">
                {paragraph}
              </p>
            ))}

            {"signoff" in sample ? <p className="font-display text-lead text-ink">{sample.signoff}</p> : null}

            <p className="border-t border-rule pt-4 text-small text-muted">{content.footnote}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
