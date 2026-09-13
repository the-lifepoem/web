import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  lead?: string;
  /** Rendered to the right of the heading on wide screens. */
  aside?: ReactNode;
};

/**
 * Eyebrow + h2 + optional lead, as the prototype names it. The dark download
 * panel lays its heading out differently and does not use this.
 */
export function SectionHeading({ eyebrow, heading, lead, aside }: SectionHeadingProps) {
  return (
    <div className={aside ? "flex flex-wrap items-end justify-between gap-6" : undefined}>
      {/* min-w-0 lets this shrink below its min-content width, which a flex item
          will not do by default — without it a long Tamil heading overflows. */}
      <div className="flex min-w-0 max-w-[46ch] flex-col gap-4">
        <p className="text-eyebrow font-semibold uppercase text-brand">{eyebrow}</p>
        <h2 className="font-display text-section font-semibold text-ink">{heading}</h2>
        {lead ? <p className="text-lead text-muted">{lead}</p> : null}
      </div>
      {aside}
    </div>
  );
}
