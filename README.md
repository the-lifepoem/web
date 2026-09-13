# LifePoem website

The marketing and support site for **LifePoem** (岁月故事), a voice-first memoir
app for older adults. Next.js 16 App Router, React 19, Tailwind CSS v4,
TypeScript. Four locales: `en`, `zh`, `ms`, `ta`.

## Getting started

```bash
npm install
cp .env.example .env      # then fill in MAILERSEND_API_TOKEN
npm run dev               # http://localhost:3000 → redirects to a locale
```

Visiting `/` negotiates a locale and redirects. Every page lives under a locale
prefix: `/en`, `/zh/contact`, `/ta/privacy`, and so on.

## Layout

| Path | What lives there |
| --- | --- |
| `app/[locale]/` | The root layout and all five routes. There is no `app/layout.tsx` — the root layout sits under `[locale]` so `lang` is correct in the server-rendered HTML. |
| `proxy.ts` | Locale negotiation and redirects. Replaces `middleware.ts`, which Next.js 16 deprecated. |
| `components/site/` | Header, footer, locale menu, store badges. |
| `components/home/` | The home page's six sections. |
| `components/contact/` | The support form. |
| `components/legal/` | The shared shell for privacy, terms and account deletion. |
| `lib/contact/` | The email transport seam. |
| `lib/legal/documents/` | Approved legal copy, twelve files. Style it; never edit its wording. |
| `messages/` | Dictionaries. `en.json` is the source of truth. |
| `e2e/` | The end-to-end suite — the project's only test seam. |

## Commands

```bash
npm run dev              # development server
npm run build            # production build
npm run typecheck        # tsc --noEmit
npm run lint             # eslint
npm run check:locales    # zh/ms/ta must match en.json exactly
npm run test:e2e         # Playwright, with the mail transport stubbed
npm run test:live-email  # sends a REAL email; run deliberately
npm run test:mail        # smoke-test the MailerSend token directly
```

## Documentation

- **`AGENTS.md`** — design-token and content rules. Read before changing UI.
- **`CONTEXT.md`** — the domain glossary. "Life stage", not "chapter".
- **`system-design.md`** — as-built architecture.
- **`docs/design-system.md`** — colours with contrast ratios, type scale, spacing, control states.
- **`docs/responsive-and-handoff.md`** — breakpoint behaviour and component mapping.
- **`docs/deviations.md`** — every place the build departs from the design prototype, and why.
- **`docs/specs/website-revamp.md`** — the spec this rebuild was built from.
- **`DEPLOYMENT.md`** — Vercel, environment variables, and the URLs that store listings depend on.

## Two things still outstanding

1. `public/lifepoem/google-play-badge.svg` is a hand-drawn imitation, not
   Google's official artwork. Run `scripts/install-play-badge.sh`.
2. New `zh`, `ms` and `ta` copy is machine-authored and wants a native reader
   before launch. It uses the mobile app's own terminology for product terms.
