import type { Dictionary } from "../../lib/i18n/dictionary";
import { SectionHeading } from "../site/section-heading";

export function HowItWorks({ content }: { content: Dictionary["howItWorks"] }) {
  return (
    <section id="how-it-works" className="border-y border-edge bg-card px-6 py-22">
      <div className="mx-auto flex max-w-section flex-col gap-13">
        <SectionHeading eyebrow={content.eyebrow} heading={content.heading} lead={content.lead} />

        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-8 p-0">
          {content.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-4">
              <span
                aria-hidden="true"
                className="flex size-14 items-center justify-center rounded-full border border-edge bg-parchment font-display text-wordmark text-brand"
              >
                {index + 1}
              </span>
              <h3 className="font-display text-card font-semibold text-ink">{step.title}</h3>
              <p className="text-body text-muted">{step.body}</p>
              <p className="border-l-[3px] border-edge pl-4 text-row text-muted">{step.aside}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
