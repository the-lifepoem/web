# Responsive behaviour and handoff

## Responsive behaviour

- **1440 desktop:** hero is a two-column editorial split; "inside the app" shows
  screenshot and caption side by side; legal pages get a sticky contents rail.
- **768 tablet:** every two-column grid is `repeat(auto-fit, minmax(…, 1fr))`, so
  columns collapse on their own without a breakpoint. The contents rail drops
  above the article.
- **390 mobile:** order is headline, explanation, downloads, then visual. Store
  badges go full-width and stack. Nav collapses to a menu button with the
  language chip kept outside it, so language stays one tap away.
- **320:** nothing has a fixed width, no text container has a fixed height, and
  headings use `clamp()` rather than viewport-only sizes, so wrapping absorbs the
  extra length from Malay and Tamil.
- **200% zoom:** layout is the same code path as the 768 view, so reflow rather
  than horizontal scrolling.

## Component mapping

| Component | Behaviour | Implemented in |
| --- | --- | --- |
| Header + LocaleSwitcher | Sticky, blurred paper background; menu keeps the current path on switch | `components/site/site-header.tsx` + `components/site/locale-menu.tsx` |
| StoreBadges | One component, two sizes (hero, footer CTA); official SVGs at native ratio | `components/site/store-badges.tsx` |
| SectionHeading | Eyebrow + h2 + optional lead; used by five sections | `components/site/section-heading.tsx` |
| HowItWorksStep | Numbered medallion, title, copy, quiet aside line | no separate file — inline `<li>` inside `components/home/how-it-works.tsx` |
| FeatureList | A single bordered list, not five cards — keeps the "made for your pace" section calm | no separate file — merged into `components/home/pace-section.tsx` |
| ScreenshotGallery | Local slide state, wrap-around prev/next, indicator buttons, arrow/Home/End keys, aria-live counter, no autoplay, transition gated on reduced motion | `components/home/screenshot-gallery.tsx`, wrapped by `components/home/gallery-section.tsx` |
| ExampleStoryCard | Prose / diary / letter tabs, permanently labelled "Illustrative example" | `components/home/example-story.tsx` |
| DownloadSection + Footer | Dark ink panel, then the paper footer with legal, support and language access | `components/home/download-section.tsx` and `components/site/site-footer.tsx` |
| Field / StatusMessage | Label, help text, input, error line; alert region for form-level status | no separate files — module-local `Field`, `FieldError` and `Alert` inside `components/contact/contact-form.tsx` |
| LegalDocumentView | Heading band, effective date, optional contents, sections of paragraphs/bullets, cross-link, back link | `components/legal/legal-document-view.tsx`, with the route shell in `components/legal/legal-page.tsx` |

Notes from reading the files:

- **The switcher is one component in two shapes.** `LocaleMenu` takes a
  `variant` prop: `"menu"` renders the header dropdown, `"pills"` renders the
  flat row of language pills in the footer. The prototype treats the footer's
  language access as part of the Footer row; in code it is the same component.
- **`HowItWorksStep` and `FeatureList` were never extracted.** Both are loops
  inside their parent section. `pace-section.tsx` carries a comment naming the
  prototype's distinction explicitly: "One bordered list rather than five cards,
  which is what keeps this section calm."
- **`Field` / `StatusMessage` are not exported.** `contact-form.tsx` defines
  `Field`, `FieldError` and `Alert` privately; `Alert` is the prototype's
  `StatusMessage` (it renders `role="alert"`). The success state is a separate
  `role="status"` branch that replaces the whole form.
- **`ScreenshotGallery` gained behaviour the prototype does not list.** Verified
  in the file: `ArrowLeft`/`ArrowRight`/`Home`/`End` handling, an `aria-live="polite"`
  counter, reduced-motion gating via `matchMedia`, and touch swipe with
  `SWIPE_MIN_DISTANCE = 48` / `SWIPE_MAX_DURATION = 300` ("Deliberate travel, so
  an unsteady hand does not change slides by accident").
- **`SCREENSHOT_PATHS` is exported** from `screenshot-gallery.tsx` and is
  index-aligned with the caption array in every locale file, as the prototype
  requires.

## Proposed beyond the current implementation

The prototype flagged three things as going beyond what was implemented at the
time. All three are now in the code; the status lines below are from reading the
files named.

### Field-level validation messages

**Prototype note:** Today one shared message covers both invalid input and
delivery failure. This design shows a message per field plus a form-level alert.
That is an implementation enhancement: it needs the server action to return
which fields failed, and the failure state kept distinct from the invalid state.

**Now implemented.** `app/[locale]/contact/actions.ts` returns a discriminated
`ContactResult` whose `invalid` branch carries `fieldErrors: ContactFieldErrors`
— per-field codes (`name: "required"`, `email: "invalid"`, `message: "tooShort"`)
that the form translates, with a source comment saying "Never prose." The
failure state is a distinct `{ status: "failed" }` branch, commented "The
provider would not accept the message. Distinct from invalid input."
`components/contact/contact-form.tsx` renders both layers: `<Alert>` at the top
of the form for the form-level message, and a `<FieldError>` under each field
whose code is set, with `aria-invalid` on the input and a `!` icon beside the
text. Both branches echo `values` back so a rejected attempt does not make the
visitor retype anything.

### Language switch preserving query and fragment

**Prototype note:** The switcher currently keeps the path but drops the query
string and hash. The design assumes a visitor deep in a legal page stays where
they were, which means carrying both across the push.

**Now implemented.** `components/site/locale-menu.tsx` captures
`window.location.search + window.location.hash` into a `tail` state on mount
(re-run on `pathname` change) and appends it to the `href` of every option. The
`choose` handler pushes `/${next}${stripLocale(pathname)}${window.location.search}${window.location.hash}`,
reading them live at click time. The comment explains why it is not
`useSearchParams`: that hook "would opt every page carrying this header out of
static rendering."

### Character counter on the message field

**Prototype note:** Shown so the 10-character minimum is visible before
submitting. Client-side only; it adds no server behaviour.

**Now implemented, client-side only.** `contact-form.tsx` holds
`messageLength` in `useState`, updates it from the textarea's `onChange` using
`event.target.value.trim().length`, and renders it through the `characterCount`
dictionary string (`"{count} characters"` in `messages/en.json`). The textarea
also carries `minLength={MESSAGE_MIN_LENGTH}`, where `MESSAGE_MIN_LENGTH = 10`
is exported from the server action — so client and server share the constant,
and the server revalidates regardless ("the client's own checks are a courtesy,
not a gate").

## Assets still needed

None of the supplied assets came with the original brief, so every image
position in the prototype is a labelled slot at the correct ratio rather than an
invented app screen. Status below is from listing
`public/lifepoem/` and grepping the code for each path.

| Asset | Status | Size |
| --- | --- | --- |
| `public/lifepoem/hero.png` | present, but **not referenced by any code** | 1,822,440 bytes |
| `public/lifepoem/hero-portrait.webp` | present and used — this is what the hero renders | 93,338 bytes |
| `public/lifepoem/screenshots/1.jpg` | present | 296,548 bytes |
| `public/lifepoem/screenshots/2.jpg` | present | 181,478 bytes |
| `public/lifepoem/screenshots/3.jpg` | present | 113,160 bytes |
| `public/lifepoem/screenshots/4.jpg` | present | 280,998 bytes |
| `public/lifepoem/screenshots/5.jpg` | present | 251,878 bytes |
| `public/lifepoem/screenshots/6.jpg` | present | 166,026 bytes |
| `public/lifepoem/app-store-badge.svg` | present — official Apple artwork | 10,804 bytes |
| `public/lifepoem/google-play-badge.svg` | present — **hand-drawn imitation, not Google's artwork** | 744 bytes |
| `public/lifepoem/og-image.webp` | present and used in `app/[locale]/layout.tsx` metadata | 142,468 bytes |

### Hero image

The prototype asked for `hero.png` shown at 4:5 in the framed presentation.
`hero.png` is still on disk at 1.8 MB but nothing imports it.
`components/home/hero-section.tsx` renders `/lifepoem/hero-portrait.webp` at
`width={820} height={1025}` — a 4:5 crop. Its comment records the reason for the
crop: it "deliberately takes the left of the original, which carries no baked-in
text, so the hero reads the same in every locale and the headline above is real
translatable HTML." Treat `hero.png` as the source original, not a live asset.

### Screenshots

All six 9:19.5 phone captures are in place and listed in `SCREENSHOT_PATHS` in
`components/home/screenshot-gallery.tsx`. The prototype's warning still stands:
slide titles, captions and order were provisional and must be checked against
the real images, and the caption index has to stay aligned with
`SCREENSHOT_PATHS`.

### Store badges

`app-store-badge.svg` is genuine. Its root element is
`<svg id="livetype" width="119.66407" height="40" viewBox="0 0 119.66407 40">`
and it carries Apple's own filename as its `<title>`
(`Download_on_the_App_Store_Badge_US-UK_RGB_blk_4SVG_092917`), with the wordmark
as vector `<path>` data.

**`google-play-badge.svg` is a hand-drawn imitation, not Google's official
artwork.** It is 744 bytes of hand-written SVG: four `<polygon>` elements
approximating the Play triangle, and two `<text>` elements —

```xml
<text x="36" y="16" … font-family="Arial, Helvetica, sans-serif" …>GET IT ON</text>
<text x="35.5" y="30" … font-family="Arial, Helvetica, sans-serif" …>Google Play</text>
```

Because the wordmark is live text rather than paths, it renders in whatever
system font the viewer has and will look wrong on other platforms. It also
breaches the Google Play brand guidelines, which require the badge unmodified.

`scripts/install-play-badge.sh` exists to walk an operator through replacing it.
It cannot be automated — Google requires a human to accept the brand guidelines
before downloading. The script prints the badge-generator and guidelines URLs,
tells the operator to pick SVG (not PNG, because the site scales the badge),
then verifies the replacement: it fails if the file is missing, is not an SVG,
**contains `<text>` elements**, or is under 3,000 bytes, and warns if there is no
`viewBox`. Running it today against the current file fails on the `<text>` check
with "This is the imitation, not the real one."

Both badges are consumed by `components/site/store-badges.tsx`, which renders
them `unoptimized` at their own proportions — App Store at 186×63 (119:40), Play
at 200×59 (135:40) — with a source comment that each vendor's guidelines require
unmodified use.

### Legal wording

The prototype shipped length-accurate stand-in text and needed real wording for
privacy, terms and deletion steps in all four locales. **Real documents now
exist for every locale:** `lib/legal/documents/{privacy,terms,delete-account}/`
each contain `en.ts`, `ms.ts`, `ta.ts` and `zh.ts`, wired up in
`lib/legal/get-legal.ts`.

One gap remains next door, in the UI strings rather than the legal text:
`messages/ta.json` has 67 of the 164 keys the other three locales carry, and
`node scripts/check-locale-parity.mjs` reports 240 parity problems, all Tamil.

## Held to the existing implementation

Deliberately not designed in, because the product does not do them:

- no website delete action,
- no testimonials or ratings,
- success copy says the provider accepted the message rather than promising a
  reply,
- the offline line separates local storage from AI processing.
