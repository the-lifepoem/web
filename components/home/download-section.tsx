import type { Dictionary } from "../../lib/i18n/dictionary";
import { StoreBadges } from "../site/store-badges";

export function DownloadSection({
  content,
  store,
}: {
  content: Dictionary["download"];
  store: Dictionary["store"];
}) {
  return (
    <section id="download" className="bg-dark px-6 py-24 text-on-dark">
      <div className="mx-auto flex max-w-panel flex-col items-center gap-6.5 text-center">
        <p className="text-eyebrow font-semibold uppercase text-on-dark-accent">{content.eyebrow}</p>
        <h2 className="font-display text-panel font-semibold text-on-dark">{content.heading}</h2>
        <p className="max-w-[46ch] text-lead text-on-dark">{content.lead}</p>
        <StoreBadges labels={store} tone="dark" className="justify-center" />
        <p className="text-[17px] text-on-dark-accent">{content.languages}</p>
      </div>
    </section>
  );
}
