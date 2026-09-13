# Where the build departs from the design prototype

The prototype's Website tab was treated as the specification. Everything below is
a place the shipped site differs from it, with the reason. An undocumented
difference is a mistake; these are decisions.

## Copy corrected because the prototype's wording was false

Four statements were checked against the Flutter app's source and found wrong.
The design's voice and rhythm are preserved; only untrue words moved.

| Where | Prototype said | Ships as | Why |
| --- | --- | --- | --- |
| `howItWorks.steps[1].aside` | "One question at a time. Answer what you like, **skip what you don't**." | "One question at a time, and you answer in your own words. Nothing is timed." | There is no skip-question control anywhere in the app's conversation. The only "Skip" string in the app dismisses a text-input dialog on the story screen. |
| `howItWorks.steps[2].aside`, `pace.offlineBody` | "Stories stay on your device and **sync when you are back online**." | "…sync to your account once you **sign in** and reconnect." | Cloud sync only runs for a signed-in account. Guest sessions fall back to local-only storage and never sync. |
| `gallery.slides[5]` | "Set it up the way you like — **reading size, read-aloud and language** all sit in one place." | "Language and privacy, in one place — choose from four languages, open the policies, and turn AI processing off whenever you want." | The app's Settings screen contains language, privacy links and AI-sharing controls only. Reading size is an A/A+/A++ chip inside the conversation and story views, and there is no read-aloud setting at all. Screenshot 6 visibly shows the real screen, so the prototype's caption contradicted the picture beside it. |
| `gallery.slides[1].body` | "Seven **chapters**… childhood, school, career, **love**, family, reflections and wishes" | "Seven **life stages**… childhood, school, career, **romance**, family, reflections and wishes" | The app's own term is "life stage" and the fourth stage is named Romance. Recorded in `CONTEXT.md` so it cannot drift back. |

The same vocabulary correction applies to `hero.chipEyebrow` ("Chapter" →
"Life stage") and `example.stage` ("Chapter: Childhood" → "Life stage:
Childhood"). Each locale uses the app's own translated term for these, taken
from the app's string table rather than translated afresh.

## Screenshot captions are a verified merge

The prototype's handoff notes state its captions were provisional because the
screenshot files were not supplied with the brief, and require them to be
checked against the real images. They were. All six images were examined.

| Slide | Real screen | Title | Body |
| --- | --- | --- | --- |
| 1 | Welcome screen | Previously shipped | Rewritten — the old body promised a "typing animation"; the screen shows a single large button |
| 2 | Life-stage list | Previously shipped | Prototype body, corrected for vocabulary |
| 3 | Conversation with hold-to-talk | Previously shipped | Previously shipped, verbatim |
| 4 | Finished story, prose | Prototype | Prototype |
| 5 | Story card with share targets | Prototype | Prototype |
| 6 | Settings | Rewritten | Rewritten — see the table above |

**All six `alt` strings were rewritten**, in every locale. The previous ones were
vague ("LifePoem app — welcome or home") where alt text has to say what the
screen actually shows; they now name the screen and its controls.

The prototype's slide order assumed no welcome-screen slide and treated the
single conversation screenshot as two separate screens, so its slides 1–3 could
not ship against the real files.

## Hero image

The prototype specifies a 4:5 portrait visual in a framed card, and states as a
rule that no text sits inside an image. The available artwork is a 1488×719
landscape banner with the headline, tagline and language list painted into it.

**Resolved better than the agreed compromise.** The plan was a centre crop,
accepting that the baked-in text would be cut mid-sentence and would read English
on every locale. On inspection the left third of the artwork — an elderly couple
on a bench watching the sunset — carries no text at all. The crop takes that
region instead, so the framed 4:5 slot is filled with a locale-neutral image and
the headline above it is real translatable HTML, exactly as the prototype
intended.

Side effect: 1.74 MB PNG → 93 KiB WebP, as the largest-contentful-paint element.
The original moved to `design-assets/hero-source.png` — kept as the master, but
out of `public/` so it is no longer deployed. `design-assets/README.md` records
the crop values for regenerating both derived assets.

## The support form's result type differs from the spec

The spec inlined the result union as `{ ok: true } | { fieldErrors } |
{ deliveryFailed: true }`. What ships is a `status`-discriminated union —
`idle | sent | invalid | failed` — carrying error *codes* rather than prose, plus
the submitted values.

Three reasons it grew: `useActionState` needs an initial state, so `idle` has to
exist; echoing `values` back is what makes "typed values survive a rejected
submission" work; and returning codes instead of sentences keeps the translated
error text in the dictionary where the rest of the copy lives, rather than in the
server action. Behaviourally it is a superset of what the spec asked for.

## Filled in because the prototype left it undefined

- **Mobile navigation.** The prototype's desktop markup has no mobile nav; only a
  390px artboard hinting at a hamburger with the language chip outside it. Built
  as an inline expanding panel that pushes content down — no overlay, no focus
  trap, no scroll lock, so an unsteady user cannot get trapped in a modal. Rows
  are 56px. The language control and the download call-to-action stay outside
  the panel, keeping language one tap away as the artboard requires.
- **Language-menu keyboard behaviour.** The prototype models the open and closed
  states but no dismissal. Added: Escape closes and returns focus to the
  trigger, a pointer-down outside dismisses, and Up/Down move between options.
- **A skip link.** Not in the prototype at all. The first focusable element on
  every page now jumps to the content, so a keyboard or switch user does not tab
  through the wordmark, three nav links, the language menu and the download
  button to reach the page. Hard to justify omitting on a site built for older
  adults.
- **Gallery swipe.** The prototype says "swipe also works" but does not
  implement it. Added with a deliberate threshold — more than 48px of horizontal
  travel within 300ms, and ignored when the gesture reads as vertical scrolling —
  so a shaky tap does not change slides.
- **Story-format tabs.** The prototype uses `role="tab"` with no `tabpanel` and
  no `aria-controls`. Implemented as a complete tab pattern with a real panel,
  `aria-controls`, `aria-labelledby` and roving `tabindex`.
- **Legal contents rail.** The prototype shows a sticky desktop rail collapsing
  to a disclosure under 900px but does not say how. Implemented as a single
  `<details>` element at every width, forced open above 900px by CSS that
  overrides the user-agent rule hiding a closed element's content. One element,
  one set of links, no JavaScript, no duplicated navigation landmark.
- **Legal section anchors.** `LegalDocument` has no section ids, so the rail
  needs them. Derived as slugs from section headings, keeping Unicode letters so
  Chinese and Tamil headings produce real ids rather than empty strings. The
  twelve approved legal files are untouched. Trade-off: editing a heading changes
  its fragment. Nothing links to these fragments from outside the site.

## Removed from the prototype

The prototype's own review affordances, as its handoff notes instruct: the
asset-slot annotations and their `showAssetLabels` switch, the "Review: form
states" panel and its `contactState` override, the monospace annotation
typeface (IBM Plex Mono, never used for product copy), and the five-tab toolbar.
The Mobile, locale-adaptation, Design system and Handoff tabs became
`docs/design-system.md` and `docs/responsive-and-handoff.md` instead of routes.

## Architecture changes made while rebuilding

- **The translations context provider is gone.** It serialised the entire
  dictionary into every client bundle and exposed a `t()` helper that returned
  the key itself when a string was missing. Sections are now server components
  receiving the dictionary slice they need, and the five client components
  (header, locale menu, gallery, story tabs, support form) take explicit props. A missing key is now a type error at build time rather than a
  dotted key rendered on the page.
- **`middleware.ts` is now `proxy.ts`.** Next.js 16 deprecated the middleware
  convention; the proxy runs on the Node runtime and the edge runtime is not
  available there.
- **The root layout moved under `[locale]`.** That is what lets `lang` be correct
  in the server-rendered HTML instead of being patched after hydration.
- **Locale negotiation is quality-weighted.** It previously read only the first
  `Accept-Language` tag, so `en;q=0.5,zh-CN;q=0.9` resolved to English.
- **The three legal routes share one shell.** They were 95% duplicated.
- **Fonts are self-hosted** through the framework's font pipeline, replacing a
  render-blocking third-party stylesheet import, and Geist is gone — the new
  design does not use it. The Chinese and Tamil families are deliberately not
  preloaded: preload defaults to on, and preloading a Chinese webfont on every
  English page costs far more than it saves.
- **The contact status query parameter is gone.** Outcomes are returned values
  now, so the route no longer opts out of static rendering and a refresh no
  longer re-displays a stale success message.

## Beyond what the spec asked for

Two small additions, recorded because they were not requested:

- **Security headers** in `vercel.json` — HSTS, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff` and a referrer policy. The spec asked only
  for Vercel configuration; writing that file without them seemed worse than
  the alternative. No Content-Security-Policy is set.
- **A second assertion boundary in CI.** The spec commits to one test seam, the
  browser over HTTP, and the end-to-end suite honours that. But
  `scripts/check-locale-parity.mjs` asserts on the dictionary JSON directly and
  runs as its own CI step. It is a static consistency check on data — array
  lengths and placeholder survival, which no amount of browsing can see — rather
  than a test of behaviour, so it is a deliberate exception rather than a drift
  back to two seams.

## A vocabulary exception

`example.formats.prose.definition` reads "reads like a short chapter from a
memoir". `CONTEXT.md` bans "chapter" — but for the app's *life stages*, which
this is not: here it means a chapter of a book. Left as written, and noted so a
future reader does not "fix" it into nonsense.

## Not done

- `public/lifepoem/google-play-badge.svg` is still a hand-drawn imitation built
  from Arial `<text>` elements. It breaches Google Play's brand guidelines and
  renders differently across platforms. The slot is built to the correct 135×40
  proportions and will be right the moment the official asset lands; run
  `scripts/install-play-badge.sh`.
- New Chinese, Malay and Tamil copy is machine-authored, including twelve pieces
  of sample story prose. It uses the app's own terminology for every product
  term, but the prose itself wants a native reader before launch.
