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
        <div className="text-center">
          <p className="font-serif text-sm font-semibold tracking-[0.2em] text-[var(--lifepoem-primary)]">
            {dict.hero.chineseTitle}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[var(--lifepoem-text)] sm:text-5xl">
            {dict.hero.name}
          </h1>
          <p className="mt-4 text-lg text-[var(--lifepoem-text)] sm:text-xl">{dict.hero.tagline}</p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--lifepoem-text-muted)]">
            {dict.hero.intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              className="inline-flex h-14 min-w-[10rem] items-center justify-center rounded-[1.25rem] bg-[var(--lifepoem-primary)] px-8 text-base font-semibold text-white shadow-md transition hover:bg-[var(--lifepoem-primary-hover)]"
              href="#screenshots"
            >
              {dict.hero.ctaApp}
            </a>
            <a
              className="inline-flex h-14 min-w-[10rem] items-center justify-center rounded-[1.25rem] border-2 border-[var(--lifepoem-primary)] bg-[var(--lifepoem-bg)] px-8 text-base font-semibold text-[var(--lifepoem-primary)] transition hover:bg-[var(--lifepoem-primary-soft)]"
              href="#about"
            >
              {dict.hero.ctaAbout}
            </a>
          </div>
        </div>
        <h2 className="mt-20 text-center font-serif text-2xl font-bold text-[var(--lifepoem-text)] sm:text-3xl">
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
