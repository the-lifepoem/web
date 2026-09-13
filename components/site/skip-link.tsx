/**
 * First focusable element on every page, so a keyboard or switch user can reach
 * the content without tabbing through the header, the language menu and the
 * download call-to-action. Visually hidden until focused.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:inline-flex focus:min-h-tap focus:items-center focus:rounded-control focus:bg-card focus:px-4 focus:font-semibold focus:text-ink focus:no-underline focus:shadow-overlay"
    >
      {label}
    </a>
  );
}
