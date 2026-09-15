# Source artwork

Not served. Files here are masters kept for regenerating the assets in
`public/lifepoem/`; nothing in `app/` or `components/` references them.

## `hero-source.png`

1488×719, 1.74 MB. The original brand banner, with "Life Poem / Your Voice,
Your Legacy / A voice-first memoir for older adults. / Made in English, 中文,
Bahasa Melayu, & தமிழ்." painted into the image.

Two assets are derived from it:

- **`design-assets/hero-portrait.webp`** (820×1025, 93 KiB) — a 4:5 crop of the
  left region only: the couple on the bench at sunset. That region carries no
  text, which is why the home page hero read correctly in all four locales while
  the headline beside it stayed translatable HTML. No longer served; see below.
- **`public/lifepoem/og-image.webp`** (1200×630, 139 KiB) — a centre crop, which
  deliberately keeps the painted wordmark and tagline, because a social share
  card wants them.

To regenerate, crop `{left: 0, top: 0, width: 575, height: 719}` for the hero and
centre-crop to 1369×719 for the share card, then resize and encode as WebP.
`sharp` is already available as a transitive dependency.

## `stages/`

Seven paintings, 1122x1402 WebP at quality 92, one per life stage, in the app's
order: `1-childhood`, `2-school`, `3-career`, `4-romance`, `5-family`,
`6-reflections`, `7-wishes`. They are the hero carousel's source artwork.

Generated rather than photographed or commissioned, from one brief per stage
against a common style block: soft watercolour and ink wash, sepia and antique
gold on warm cream, gold-leaf sprigs curling in over the corners, a Southeast
Asian mid-century setting, full bleed, and three hard constraints — no text or
signature anywhere in the frame, no legible faces, nothing modern. The style
reference passed with every prompt was `hero-portrait.webp`, which is why the set
sits beside the original brand artwork rather than replacing its look. The scenes
deliberately reuse the motifs the stage band already names in `stages.imageAlt`:
the paper boat, the open book, the work bag, two cups of tea, the house beside a
tree, the lit lantern, the paper plane.

`public/lifepoem/stages/*.webp` are derived from these: resized to 820x1025
(`fit: "cover"`, which is close to a no-op at 4:5) and encoded as WebP at quality
82, around 220 KiB each. The 820x1025 box is the same one the previous single
hero portrait used, so the frame around it did not have to move.

## `hero-portrait.webp`

820x1025, 93 KiB. The 4:5 crop of `hero-source.png` that the hero rendered until
the seven stage paintings replaced it. Moved out of `public/` because nothing
serves it any more; kept because it is the style reference the seven were
generated against, and because `og-image.webp` still comes from the same master.

## `screenshot-8-redacted.png`

1206x2622. The account-screen capture with the signed-in phone number blurred.
The original capture showed `+65 8123 4567` — the app's own placeholder, but a
validly-formed Singapore mobile number in a live allocated range, which should
not appear on a public page.

`public/lifepoem/screenshots/8.webp` is generated from this file, not from the
original capture. To regenerate: resize to 828px wide, encode as WebP at quality
80. If a clean re-capture becomes available, replace this master and regenerate.
