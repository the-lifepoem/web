import type { Dictionary } from "../../lib/i18n/dictionary";

export function PaceSection({ content }: { content: Dictionary["pace"] }) {
  return (
    <section className="px-6 py-23">
      <div className="mx-auto grid max-w-section grid-cols-[repeat(auto-fit,minmax(min(330px,100%),1fr))] items-start gap-14">
        <div className="flex max-w-[520px] flex-col gap-5">
          <p className="text-eyebrow font-semibold uppercase text-brand">{content.eyebrow}</p>
          <h2 className="font-display text-section font-semibold text-ink">{content.heading}</h2>
          <p className="text-body text-muted">{content.body}</p>
          <p className="rounded-panel border border-edge bg-card px-5 py-4.5 text-row text-muted">
            <strong className="font-semibold text-ink">{content.offlineLabel}</strong> {content.offlineBody}
          </p>
        </div>

        {/* One bordered list rather than five cards, which is what keeps this
         * section calm — the prototype is explicit about the distinction. */}
        <ul className="m-0 list-none overflow-hidden rounded-media border border-edge bg-card p-0">
          {content.features.map((feature) => (
            <li key={feature.title} className="flex gap-3.5 border-b border-rule px-6 py-5.5 last:border-b-0">
              <span aria-hidden="true" className="mt-2.5 size-3.5 shrink-0 rounded-full bg-brand" />
              <span className="flex flex-col gap-1">
                <h3 className="text-lockup font-semibold text-ink">{feature.title}</h3>
                <span className="text-row text-muted">{feature.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
