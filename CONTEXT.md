# LifePoem — domain glossary (website)

The vocabulary this repo commits to. Terms here are the canonical ones: use them in
copy, in code identifiers, and in conversation. Where the website historically used a
different word, the divergence is recorded so it does not creep back.

This file is a glossary, not a spec and not a design document. No implementation
details belong here.

## Product

**LifePoem** (Chinese: 岁月故事) — the mobile app. The website exists to explain it and
to support the people using it. The website is never "the product" on its own.

**Storyteller** — the person telling their life story into the app, typically an older
adult. The website's primary reader. Not "user" in copy.

**Life stage** — one of the seven parts of a life the app invites a storyteller to talk
about: Childhood, School, Career, Romance, Family, Reflections, Wishes.

> Never "chapter". The design prototype used "chapter" throughout and named the fourth
> stage "love"; both are wrong. The app says "life stage" and "Romance", and the story
> header reads "STAGE 1 · Childhood".

**Story** — the written piece the app produces from a conversation about one life stage.

**Story format** — the shape a story takes: Prose, Diary or Letter. Exactly three.

**Story card** — a story rendered as a shareable image. What a storyteller sends to
family through WhatsApp, Facebook, Instagram or WeChat.

**Reading size** — the A / A+ / A++ control that enlarges text inside the conversation
and story views.

> Not a setting. It is a cycling chip in those two screens only, it does not appear in
> Settings, and it is not remembered between launches. Copy must not call it a setting
> or imply it persists.

**Sync** — copying stories between a device and the cloud. Only happens for a signed-in
storyteller; guest use is local-only, permanently. Copy that says stories "sync when you
are back online" must qualify that it requires signing in.

## Website

**Support** — the outward-facing name for getting help. Used in navigation, in body
copy, and in the store listings.

**Contact** — the route and the component name for the same thing. The split is
deliberate and load-bearing: App Store Connect registers a Support URL that must
resolve, while the codebase and the legal documents already say "contact".

**Support form** — the name/email/message form on the contact route.

**Contact notice** — the per-locale PDPA disclosure shown above the support form.
Distinct from the privacy policy, and approved wording: it is quoted, never paraphrased.

**Legal document** — one of privacy policy, terms of service, or account deletion. All
three share one shape and one presentation. Their wording is approved copy and ships
byte-for-byte; the website styles them and never edits them.

**Locale** — one of `en`, `zh`, `ms`, `ta`. The website's fallback is `en`.

> The app's default is `zh`. The two differ on purpose and neither is a bug. Copy must
> not imply the app opens in English.

**Screenshot slide** — one entry in the app gallery: an image of a real app screen plus
a caption. The image list and the per-locale caption lists are index-aligned; changing
one without the others is a defect.

**Store badge** — the App Store or Google Play download button. Official vendor assets,
used unmodified at their own proportions.

**Illustrative example** — invented content shown to demonstrate the product, carrying a
visible badge saying so. The sample story on the home page is the only one.

## Design

**Design prototype** — the Claude Design canvas the revamp was built from. Its Website
tab is the specification; its other tabs are documentation.

**Artboard** — a fixed-width frame in the prototype showing one screen at one size.
Reference material, never a route.

**Deviation** — a place the build knowingly departs from the prototype. Every deviation
is written down with its reason; an undocumented difference is a mistake, not a
deviation.
