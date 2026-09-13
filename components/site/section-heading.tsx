import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  lead?: string;
  /** Rendered to the right of the heading on wide screens. */
  aside?: ReactNode;
  tone?: "light" | "dark";
};

/**
 * Eyebrow + h2 + optional lead. Used by five sections, which is why the
 * prototype names it as its own component.
 */
export function SectionHeading({ eyebrow, heading, lead, aside, tone = "light" }: SectionHeadingProps) {
  const eyebrowTone = tone === "dark" ? "text-on-dark-accent" : "text-brand";
  const headingTone = tone === "dark" ? "text-on-dark" : "text-ink";
  const leadTone = tone === "dark" ? "text-on-dark" : "text-muted";

  return (
    <div className={aside ? "flex flex-wrap items-end justify-between gap-6" : undefined}>
      {/* min-w-0 lets this shrink below its min-content width, which a flex item
          will not do by default — without it a long Tamil heading overflows. */}
      <div className="flex min-w-0 max-w-[46ch] flex-col gap-4">
        <p className={`text-eyebrow font-semibold uppercase ${eyebrowTone}`}>{eyebrow}</p>
        <h2 className={`font-display text-section font-semibold ${headingTone}`}>{heading}</h2>
        {lead ? <p className={`text-lead ${leadTone}`}>{lead}</p> : null}
      </div>
      {aside}
    </div>
  );
}
