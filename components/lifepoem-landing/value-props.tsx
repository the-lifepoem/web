"use client";

import { useTranslations } from "../i18n/translations-provider";

export function ValueProps() {
  const { dict } = useTranslations();
  const items = dict.valueProps.items;

  return (
    <section
      id="about"
      className="border-b border-[var(--lifepoem-border)] bg-[var(--lifepoem-card)] px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-bold text-[var(--lifepoem-text)] sm:text-3xl">
          {dict.valueProps.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--lifepoem-text-muted)]">
          {dict.valueProps.sub}
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.map(function renderProp(row, index) {
            return (
              <li
                key={`${row.title}-${index}`}
                className="rounded-[1.25rem] border border-[var(--lifepoem-border)] bg-[var(--lifepoem-bg)] p-6 shadow-[0_4px_12px_rgba(62,43,26,0.06)]"
              >
                <h3 className="text-lg font-semibold text-[var(--lifepoem-text)]">{row.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--lifepoem-text-muted)]">{row.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
