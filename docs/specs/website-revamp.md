# Spec: LifePoem website revamp

Status: ready-for-agent (pending publication — issue tracker not yet configured in this session)
Source design: `Box-sizing reset fix.zip` → `LifePoem Website.dc.html` (Claude Design canvas, five tabs)
Locales in scope: `en`, `zh`, `ms`, `ta`

## Problem Statement

The LifePoem marketing site does not present the product the way the product deserves. A visitor arriving today sees a single full-bleed banner image with the headline burned into the pixels, a row of store badges, three value-prop cards, and a screenshot carousel whose captions describe screens that are not the screens being shown. Nothing explains how the app actually works, nothing shows what a finished life story looks like, and the page never makes the case for why an older adult or their family would want it.

The problems compound for the people this product is for:

- The hero's headline, tagline and language list are **inside a raster image**, so a visitor on `/zh`, `/ms` or `/ta` reads English marketing copy no matter which language they chose, and a screen-reader user gets one long alt string instead of a page.
- Every locale is served with `lang="en"` in the server HTML and corrected only after JavaScript runs, so assistive technology and search crawlers see the wrong language for three of the four locales.
- The screenshot gallery's captions are misaligned with the images: slides describing the story view and the share sheet sit next to screenshots of the share sheet and the settings screen respectively, and one caption still promises "Chinese or English" support on a product that now ships four languages.
- The Google Play badge is a hand-drawn imitation built from Arial text elements, sitting next to Apple's genuine badge — visibly wrong, and in breach of Google Play's brand guidelines.
- The support form cannot tell a visitor what they got wrong. Invalid input and a failed email delivery produce the identical message, typed values are discarded on failure, there is no indication that a submission is in flight, and the three fields have no visible labels at all — only placeholders that vanish on focus.
- The account-deletion page exists, is prerendered in four languages, and is required by Google Play policy to be discoverable — but nothing on the site links to it.
- The Support URL registered in App Store Connect points at a route that does not exist on this site, so that link is broken in production right now.
- A four-locale site has no `hreflang`, no canonical URLs, no sitemap, no robots file and no OpenGraph metadata, so it competes with itself in search results and renders as a bare URL when shared.
- The site's own privacy policy does not disclose that the support form collects a name, email address and message and forwards them through a third-party email provider — a finding raised in the project's PDPA alignment review and assigned to the website owner.

A finished design prototype now exists that addresses the presentation problems. It has never been built.

## Solution

Rebuild the website to the approved design prototype, faithfully, and fix the correctness problems found underneath it while doing so.

A visitor lands on a page that opens with a real HTML headline — "Your life stories, in your own words." — set in the brand serif, in their own language, beside a framed product visual. Below it, three numbered steps explain what using the app is actually like. A calm bordered list answers the objections an older adult brings: no writing skill needed, large text and clear controls, read-aloud, four familiar languages, prompts that never hurry. A gallery walks through six real screens of the app with captions that match the pictures, navigable by button, dot, arrow key or swipe, and announced politely to screen readers. A tabbed card shows what a finished life story looks like in prose, diary and letter form, permanently badged as an illustrative example so nobody mistakes it for a customer's story. A dark closing panel asks for one memory and offers both store badges. A footer carries the legal documents, the support address, the account-deletion page and a language switcher.

The support page becomes a form that works: visible labels, help text placed above each field so it is read before the input, 56px inputs, a 64px submit button, a live character count against the ten-character minimum, per-field error messages, a disabled spinner state while sending, retained input when something fails, and three distinct outcomes — accepted, your details need fixing, or our email provider could not take it (with the support address offered as a fallback).

Legal documents keep their approved wording byte-for-byte and gain the designed reading shell: a heading band, effective date, a 68-character measure, and an "On this page" contents rail that sticks on desktop and collapses into a disclosure on narrow screens.

Choosing a language keeps the visitor exactly where they were — same path, same query string, same fragment — and is remembered on their next visit.

And the whole thing is provable: an end-to-end browser suite covering every page in every locale, plus one live send through the real email provider that lands in the real support mailbox.

## User Stories

### Prospective storyteller (the older adult)

1. As an older adult considering LifePoem, I want the first screen to tell me in plain words what this is, so that I do not have to guess whether it is for me.
2. As an older adult, I want to read that no writing skill is required, so that I do not disqualify myself before trying.
3. As an older adult, I want to see that there are three simple steps, so that the whole thing feels finishable.
4. As an older adult, I want body text that never drops below 18px, so that I can read the page without reaching for glasses.
5. As an older adult, I want tap targets of at least 44px everywhere and 64px on the main actions, so that I hit what I aim at.
6. As an older adult, I want to be told that I can speak instead of type, so that a keyboard is not a barrier.
7. As an older adult, I want to know the app will read questions and my finished story aloud, so that I can use it when reading is tiring.
8. As an older adult, I want to know nothing on screen will rush me, so that I do not feel tested.
9. As an older adult, I want to see what a finished life story actually looks like, so that I understand what I would be getting.
10. As an older adult, I want the example story clearly marked as an example, so that I am not misled into thinking it is someone's real memory.
11. As an older adult using 200% browser zoom, I want the page to reflow rather than scroll sideways, so that I can read it magnified.
12. As an older adult who prefers reduced motion, I want the gallery not to animate, so that movement does not disorient me.

### Adult child evaluating for a parent

13. As the adult child of a prospective user, I want to see the actual app screens, so that I can judge whether my mother could operate it.
14. As the adult child, I want the seven life stages named, so that I know what ground the app covers.
15. As the adult child, I want to know a finished story can be shared as a card to WhatsApp or WeChat, so that I can see how the family would receive it.
16. As the adult child, I want to know which platforms the app is on before I click, so that I do not send my father to the wrong store.
17. As the adult child, I want the download buttons to open the correct store listing in a new tab, so that I do not lose the page I was reading.
18. As the adult child, I want honest statements about what needs an internet connection, so that I can set my parent up realistically.

### Multilingual visitor

19. As a Chinese-speaking visitor, I want the headline, tagline and every section in Chinese, so that no part of the page is a foreign-language image.
20. As a Chinese-speaking visitor, I want headings in a Chinese serif and body text at a taller line height, so that the type is comfortable rather than cramped Latin metrics.
21. As a Tamil-speaking visitor, I want a line height that gives ascenders and descenders room, so that the text does not collide with itself.
22. As a Malay-speaking visitor, I want my longer labels to wrap rather than clip, so that no button loses its last word.
23. As a multilingual visitor, I want switching language to keep me on the same page, so that I do not get thrown back to the home page.
24. As a multilingual visitor deep inside a legal document, I want switching language to keep my query string and my position in the document, so that I do not lose my place.
25. As a returning multilingual visitor, I want my language choice remembered, so that I am not re-negotiated from my browser headers every visit.
26. As a multilingual visitor, I want the language menu to show which language is currently active, so that I know what I am switching from.
27. As a multilingual visitor, I want no page to show me a raw dotted translation key, so that I never see the site's plumbing.

### Assistive technology and keyboard users

28. As a screen-reader user, I want the server-rendered page to declare the correct language, so that my synthesiser uses the right voice from the first word.
29. As a screen-reader user, I want each screenshot to carry a caption that describes the screen it shows, so that the description matches reality.
30. As a screen-reader user, I want the gallery to announce which screen I am on when it changes, so that I can follow my position.
31. As a screen-reader user, I want off-screen gallery slides hidden from me, so that I do not read six screens at once.
32. As a keyboard user, I want arrow, Home and End keys to move the gallery, so that I do not need a pointer.
33. As a keyboard user, I want a visible 3px focus ring on every interactive element including badge links and gallery dots, so that I always know where I am.
34. As a keyboard user, I want the language menu to close on Escape and return focus to its trigger, so that I am never stranded inside it.
35. As a keyboard user, I want the mobile navigation panel to be an inline disclosure with no focus trap, so that I cannot get stuck in a modal.
36. As a keyboard user following an in-page anchor, I want the sticky header not to cover the heading I jumped to, so that I land on what I clicked.
37. As a screen-reader user on the support form, I want each field's help text associated with its input, so that guidance is read before I type.
38. As a screen-reader user submitting an invalid form, I want the error announced as an alert and each field marked invalid, so that I know what to fix without hunting.

### Support seeker

39. As a visitor needing help, I want every field labelled visibly, so that I still know what a box is for after I start typing in it.
40. As a visitor needing help, I want help text above each field, so that I read the guidance before the input rather than after.
41. As a visitor needing help, I want to be told exactly which field is wrong and why, so that I am not left guessing.
42. As a visitor needing help, I want a live count of my characters against the ten-character minimum, so that the rule is visible before I submit.
43. As a visitor needing help, I want the button to show that it is sending and refuse a second press, so that I do not submit twice.
44. As a visitor needing help, I want my typed message preserved if something goes wrong, so that I do not have to write it again.
45. As a visitor needing help, I want "your details need fixing" and "our email provider failed" to be different messages, so that I do not retype a perfectly good message because of an outage.
46. As a visitor needing help, I want the support email address offered when delivery fails, so that I have a way through regardless.
47. As a visitor needing help, I want the success message to say the provider accepted my message rather than promising a reply time, so that I am not told something the site cannot guarantee.
48. As a visitor needing help, I want to know what happens to my name, email and message, so that I can decide whether to send them.
49. As a visitor with JavaScript unavailable, I want the form to still submit and validate, so that an old phone does not lock me out of support.
50. As a visitor arriving from the App Store's support link, I want that URL to resolve to the support page, so that the link in the store listing is not broken.

### Someone leaving

51. As a user who wants to delete their account, I want a link to the deletion page in the footer of every page, so that I can find it without searching.
52. As a user who wants to delete their account, I want the steps to name the screen the option is actually on, so that I am not sent to the wrong place.
53. As a user who wants to delete their account, I want to be told what deletion covers before I commit, so that there are no surprises.

### Store reviewers and crawlers

54. As an App Store reviewer, I want the registered Support URL to load a working support page, so that the submission is not rejected for a dead link.
55. As a Google Play reviewer, I want the account-deletion URL to be reachable from the site, so that the data-safety declaration holds up.
56. As a search crawler, I want each locale to declare canonical and alternate URLs, so that four translations of one page are not treated as duplicates.
57. As a search crawler, I want a sitemap and a robots file, so that I can discover every page in every locale.
58. As someone sharing a link in a chat group, I want OpenGraph metadata and an image, so that the link renders as a card rather than a bare URL.
59. As a visitor on a slow connection, I want the hero image to be a modern compressed format at the size it is displayed, so that the page paints quickly.

### Maintainers

60. As a developer, I want the design's colours, type scale, spacing and radii expressed as theme tokens, so that I style with names rather than pasted hex values.
61. As a developer, I want the design system sheet and handoff notes stored in the repo, so that the source of truth outlives a zip file in a downloads folder.
62. As a developer, I want the touch-target floors and minimum body size written into the repo's agent instructions, so that later work does not quietly drift off the design.
63. As a developer, I want a browser suite that loads every page in every locale, so that a broken locale cannot reach production unnoticed.
64. As a developer, I want the support form's field errors, honeypot and delivery-failure behaviour covered by tests, so that the email path has a regression net.
65. As a developer, I want the email transport swappable by configuration, so that tests never send real mail and production can never accidentally stub it.
66. As a developer, I want the system design document rewritten to match what ships, so that the next person reads the truth.
67. As a developer, I want a log of every place the build deviated from the prototype and why, so that differences are decisions rather than mistakes.
68. As a translator, I want one list of every key I need to review, so that I can check the machine-written Chinese, Malay and Tamil in one pass.
69. As the person responsible for PDPA, I want the privacy policy to disclose website contact collection and the third-party email provider in all four languages, so that the published notice matches the actual data flow.
70. As the site owner, I want the deployment requirements written down, so that whoever deploys knows a static export cannot host the support form.

## Implementation Decisions

### Fidelity and scope of the port

- Only the prototype's **Website** tab ships. The Mobile 390 artboards, the locale-adaptation boards, the Design system sheet and the Handoff notes are documentation, not routes. The prototype's own review affordances — the asset-label annotations, the "Review: form states" panel and the contact-state override — are stripped.
- The port is **pixel-faithful**: the prototype's layout, spacing rhythm, type scale, radii, elevation and colour values are reproduced as specified, and its copy ships verbatim except where noted under "Copy corrections".
- One deliberate deviation is accepted: the prototype's `style-hover` attribute has no React equivalent and is re-authored as real hover rules.

### Design tokens and typography

- The prototype's palette, type scale, spacing steps, radii and elevations become **Tailwind theme tokens**, replacing the current practice of writing arbitrary CSS-variable values inline at every call site. Two colours are additions to the app palette — an error red and a success green — because status messages need a non-brown signal; both are always paired with an icon and wording so nothing depends on colour alone.
- Five font families are **self-hosted through the framework's font pipeline**: the brand serif and sans for Latin, a Chinese serif for headings and Chinese sans for body, and a Tamil sans. The remote blocking stylesheet import is removed, as is the unused Geist pair inherited from the scaffold. The mono family used for annotations in the prototype is not shipped.
- Script-specific metrics are part of the token set, not ad-hoc overrides: Chinese body copy runs at a taller line height than Latin, and Tamil taller still, with correspondingly relaxed heading leading.
- Body copy never drops below 18px; the small/help size floor is 16px; legal documents read at 19px over a 68-character measure. Touch targets are 44px minimum, 56px for page actions, 64px for the support submit and the download buttons.

### Home page composition

The home page is built as the prototype orders it: hero, "how it works", "made for your pace", the app gallery, the example story section, and the download panel, above the shared footer.

- The **hero** keeps its framed 4:5 card. The existing hero asset is landscape with marketing text baked into it and is center-cropped to fit. This is a knowingly accepted compromise, recorded in the deviation log: roughly three-fifths of the image is discarded, its burned-in English text is cut mid-sentence, and it remains English on every locale. The headline, tagline, language list and floating life-stage chip are real HTML and translate.
- **"How it works"** presents three numbered steps, each with a medallion numeral, a heading, a sentence of body copy and a quieter aside line.
- **"Made for your pace"** is a single bordered list of five rows, not five cards — the prototype is explicit that this keeps the section calm.
- The **example story** section is a tabbed card offering the app's three real story formats — prose, diary and letter — each carrying an invented sample story permanently badged as an illustrative example, with the prototype's footnote stating the text was created for the design and is not a customer story. Three formats across four locales means twelve pieces of sample prose are authored.
- The **download panel** is the dark closing section carrying the second pair of store badges.

### Screenshot gallery

- The gallery is a transform-based track with wrap-around previous/next controls, six indicator buttons, arrow/Home/End key handling on a focusable region, a polite live counter, off-screen slides hidden from assistive technology, and no autoplay. The transition is disabled when the visitor prefers reduced motion.
- **Touch swipe is added**, which the prototype describes but does not implement. It requires deliberate horizontal travel over a short interval and ignores gestures that read as vertical scrolling, so an unsteady hand does not change slides by accident.
- **Slide captions are a verified merge.** Both the currently shipped caption set and the prototype's set were checked against the six real screenshot files. The shipped captions are accurate for the first three slides; the prototype's are accurate for the fourth and fifth; the sixth is corrected because the real screenshot shows language and AI-sharing controls, not the reading-size and read-aloud settings the prototype's caption promises. The prototype's own handoff notes require exactly this check, stating its captions were provisional because the screenshot files were not supplied with the brief.
- The image path list and the per-locale caption arrays must stay index-aligned; the browser suite asserts this by rendering every slide in every locale.

### Copy corrections

Four statements in the prototype are false against the shipped app and are corrected with the smallest edit that preserves the design's voice. Every change is recorded word-for-word in the deviation log.

- The claim that a visitor can skip questions is removed; no skip affordance exists anywhere in the app's conversation.
- A life stage named "love" is corrected to the app's actual name for it, **Romance**.
- The sixth slide caption is rewritten to describe language and AI-sharing controls, which is what that screen contains. Reading size is an A/A+/A++ chip inside the conversation and story views, not a setting, and is not persisted; there is no read-aloud setting at all, only per-message and per-story controls.
- The sync claim is qualified to signed-in use, because guest sessions never sync to the cloud.

Additionally, the site adopts the app's vocabulary: these are **life stages**, not chapters, and there are seven of them — Childhood, School, Career, Romance, Family, Reflections, Wishes.

### Support form

The contact server action is rebuilt to return a typed result consumed by the framework's form-state hook, rather than redirecting with a status query parameter. The shape, which encodes the decision more precisely than prose:

```
type ContactResult =
  | { ok: true }
  | { fieldErrors: { name?: string; email?: string; message?: string } }
  | { deliveryFailed: true }
```

- Per-field errors become possible for the first time, which is what the design requires and what the prototype's handoff notes flag as beyond the current implementation.
- A delivery failure is now distinguishable from invalid input, closing a real defect where both rendered the same message.
- Submitted values survive a failed attempt.
- The status query parameter disappears, which also means the support route no longer opts out of static rendering and a refresh no longer re-displays a stale success message.
- The honeypot keeps its current behaviour: a filled honeypot reports success without sending.
- Validation rules are unchanged — non-empty name, an email shape check, and a ten-character minimum on the message after trimming — and are enforced on the server regardless of what the client checked.
- The submit control is disabled with a spinner while in flight; a live character count sits under the message field.
- The existing per-locale contact notice is kept verbatim as the PDPA disclosure, alongside the prototype's shorter reassurance line.

### Email transport

- The mail transport is **selected by configuration**, defaulting to the real provider. A recording stub is selectable only outside production; selecting it in a production environment fails loudly rather than silently disabling email. This is the single mechanism that lets the browser suite assert on the delivered payload without sending mail.
- The provider contract is otherwise unchanged: sender display name, the visitor's address as reply-to, a subject naming the sender, and a plain-text body.

### Locale handling

- The locale switcher becomes the designed dropdown menu, replacing the native select. It carries the keyboard behaviour the prototype does not model: Escape to close, click-outside to dismiss, focus returned to the trigger, and arrow-key movement between options.
- Switching preserves **pathname, query string and fragment**, which today's switcher drops — a gap the prototype's handoff notes call out explicitly.
- A locale cookie is written on explicit choice and read by the locale-negotiation layer, so a returning visitor is not re-negotiated from browser headers. Header negotiation remains the fallback for visitors with no cookie.
- The correct language is rendered in the **server HTML**, replacing the current approach of shipping `en` and patching it after hydration.

### Navigation

- Mobile navigation is an **inline expanding panel** that pushes content down: no overlay, no focus trap, no scroll lock, nothing a shaky user can get trapped inside. The language control and the download call-to-action stay outside the panel, keeping language one tap away as the prototype's artboard requires. Rows are 56px.
- In-page anchor targets carry scroll offsets so the sticky header does not cover the heading a visitor jumped to.

### Legal documents

- The three legal document types keep their approved wording **byte-for-byte** and gain the designed shell: heading band, optional effective date, the 68-character measure, a sticky contents rail on desktop that collapses to a disclosure on narrow screens, cross-link and back link.
- Contents-rail anchors are **derived as slugs from section titles**, so no legal file is restructured to add identifiers. The trade-off is accepted: editing a section title changes its fragment, and nothing links to these fragments externally today.
- The terms documents have no effective date and simply omit that line.
- Two pieces of dead code in the legal view are removed: label props that are passed and destructured but never rendered, and a closing-note branch no document sets.
- The **account-deletion page is linked from the footer** on every page, closing a discoverability gap that Google Play policy cares about.

### PDPA disclosure

- The privacy document in all four locales gains a section disclosing that the website's support form collects a name, email address and message, and that these are forwarded through a third-party email provider to the support mailbox — the finding the project's PDPA alignment review assigned to the website owner.
- The document version string and effective date are **left unchanged**, as directed. This is recorded as a known departure from the review's own instruction that notices be approved and versioned, and is called out in the commit so it can be revisited.

### Correctness fixes outside the design

- Canonical and alternate-language metadata for all four locales, a sitemap, a robots file, and OpenGraph/Twitter metadata with a share image.
- A **support route alias** redirecting to the localised support page, because the Support URL registered in App Store Connect points at a path this site does not serve.
- The hero asset is converted to a modern compressed format at correct dimensions, replacing a 1.74 MB PNG serving as the largest-contentful-paint element with a one-pixel aspect-ratio mismatch.
- Scaffold leftovers are removed: five unreferenced SVGs and the untouched starter README, which still instructs the reader to edit a file that does not exist.

### Deployment

- Configuration is written for **Vercel**, plus a web workflow in the style of the existing mobile one. Nothing is pushed or deployed.
- Deployment requirements are documented explicitly: a Node runtime is required because the email transport uses Node's HTTPS module, a static export therefore cannot host the support form, and three environment variables must be present in the server environment.

## Testing Decisions

### What makes a good test here

A good test drives the site the way a visitor does and asserts only what a visitor can observe: what the page renders, what it announces, where a link points, what happens when a form is submitted. It never reaches into component internals, never asserts on class names or markup structure as a proxy for behaviour, and never asserts that a particular function was called. A test that would survive the whole page being reimplemented with the same visible behaviour is a good test; a test that breaks when a wrapper element changes is not.

### The seam

There is **one seam: the site over HTTP, driven in a real browser.** Every assertion in the suite happens at that boundary.

The email path reaches the same seam through configuration rather than through a second test harness. The suite boots the server with the recording transport selected, drives the real form in the real browser, and then reads the recorded payload to assert what would have been sent — recipient, reply-to, subject and body. No second seam, no unit-level harness around the action, and the form-to-action wiring is covered because the test types into actual inputs rather than constructing form data by hand.

### Prior art

**There is none.** The repository has no test framework, no test directory and no test script; the only existing check is a script that sends a real email and does not exercise the form. This suite establishes the pattern, which is itself a reason to keep the seam count at one.

### What the suite covers

- Every page in every locale loads and renders its expected heading: home, support, privacy, terms and account deletion across all four locales.
- No page renders a raw dotted translation key. This is a cheap and effective parity check, because the translation helper returns the key itself when a string is missing — so a missing or misspelled key surfaces as visible text the test can catch, in any locale.
- The server HTML declares the correct language per locale.
- Both store badges link to the exact expected store URLs, open in a new tab, and carry accessible names.
- The gallery advances and wraps by button, by dot, by arrow key and by swipe; the live counter tracks position; off-screen slides are hidden from assistive technology; six slides render with non-empty captions in every locale.
- The example story card switches between the three story formats and keeps its illustrative-example badge in every state.
- Language switching preserves path, query and fragment, sets the cookie, and a subsequent prefix-less visit lands on the chosen locale.
- The mobile navigation panel opens and closes, and its rows and targets meet the size floors.
- The support form: each field's error appears for its own field and nowhere else; a valid submission reports success and produces exactly one recorded payload with the right recipient, reply-to, subject and body; a filled honeypot reports success and records nothing; a transport failure renders the delivery-failure state with the support address, distinct from the validation state; typed values survive a failure; the submit control is disabled while in flight.
- The support route alias redirects to the localised support page.
- The account-deletion page is reachable by following a link from the home page footer, in every locale.
- Sitemap and robots respond, and canonical and alternate-language metadata are present for each locale.

### Outside the suite

One **live end-to-end send** through the real email provider, run once with a real token, asserting a successful provider response — with inbox receipt confirmed by the site owner. This is the only check the suite cannot make, and it is deliberately manual rather than automated so that it never runs on every commit.

## Out of Scope

- **Deploying.** Configuration is written; nothing is pushed to any host.
- **Changing the mobile app.** The false copy is corrected on the website rather than by building the features it described. Specifically out of scope: adding a skip-question control, moving reading size into Settings, adding a read-aloud setting, and persisting either the reading size or the locale choice in the app.
- **Authoring the official Google Play badge.** The slot is built to the correct proportions; the compliant asset must be downloaded by the owner under Google's brand terms. Until it lands, the existing imitation remains visible.
- **Native-speaker translation review.** All new Chinese, Malay and Tamil copy — marketing text and twelve pieces of sample story prose — is machine-authored. A review list is produced; the review itself is not done here.
- **Bumping the privacy document version.** Directed to leave the version string and effective date as they are, despite editing published policy text.
- **Replacing the hero image.** The existing landscape asset with burned-in English text is cropped into the portrait slot. Producing a text-free portrait hero is a separate piece of work.
- **The print-order deletion contradiction.** The PDPA review found that published website copy promises deletion of saved print-order details while the app logs and swallows cloud-cleanup errors. That is an app-side defect.
- **Testimonials, ratings and FAQ.** The prototype deliberately omits them and so does this build.
- **Analytics, a cookie-consent banner and a cookie policy.** Absent today and not added, despite four-locale regional targeting.
- **Rate limiting, CAPTCHA, field-length caps and duplicate-submission protection** on the public support action.
- **Delivery monitoring, a durable queue, retries or idempotency** for support email. Success continues to mean the provider accepted the message, not that it was delivered.
- **Executing account deletion from the website.** The deletion page instructs; it does not act.
- **Reviewing the locale-negotiation layer against the framework's newer replacement convention**, which the system design document flags as pending.

## Further Notes

### Known compromises accepted by the owner

1. The cropped hero will look compromised, and its burned-in English text appears on every locale.
2. Published policy text changes without a version bump.
3. The Play badge stays non-compliant until the official asset is supplied.
4. Sample story prose in three languages is machine-authored and needs review before launch.
5. All new marketing copy in three languages likewise.
6. Legal fragments derive from section titles and will change if a title is edited.

### Blockers, and what they block

Two inputs are needed from the owner, and neither blocks the build — only the final verification step:

- The official Google Play badge asset at the expected location. A guided script is provided for obtaining it.
- A local environment file containing the email provider token, written by the owner so the secret never passes through the agent. The sending domain is confirmed verified with the provider, and the test sends from and to the support address.

### Vocabulary this spec commits to

- **Life stage**, never "chapter". Seven of them: Childhood, School, Career, Romance, Family, Reflections, Wishes.
- **Support** is the outward-facing name used in copy and store listings; **contact** is the route and component name. The alias reconciles the two.
- **Reading size** is a cycling control inside the conversation and story views, not a setting, and not persisted.
- **Sync** means signed-in cloud sync. Guest use is local-only, permanently.

### Sequencing

Domain glossary and tokens first, then the home page sections, the gallery with verified captions, the support form rebuild, the legal shell, the locale switcher and mobile navigation, the metadata and correctness fixes, the PDPA disclosure as its own clearly marked commit, then the browser suite, then the live send, and finally the documentation and deviation log.

Handover is a local branch with a commit-by-commit summary. No pull request is opened.
