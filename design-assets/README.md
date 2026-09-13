# Source artwork

Not served. Files here are masters kept for regenerating the assets in
`public/lifepoem/`; nothing in `app/` or `components/` references them.

## `hero-source.png`

1488×719, 1.74 MB. The original brand banner, with "Life Poem / Your Voice,
Your Legacy / A voice-first memoir for older adults. / Made in English, 中文,
Bahasa Melayu, & தமிழ்." painted into the image.

Two served assets are derived from it:

- **`public/lifepoem/hero-portrait.webp`** (820×1025, 93 KiB) — a 4:5 crop of the
  left region only: the couple on the bench at sunset. That region carries no
  text, which is why the home page hero reads correctly in all four locales
  while the headline beside it stays translatable HTML.
- **`public/lifepoem/og-image.webp`** (1200×630, 139 KiB) — a centre crop, which
  deliberately keeps the painted wordmark and tagline, because a social share
  card wants them.

To regenerate, crop `{left: 0, top: 0, width: 575, height: 719}` for the hero and
centre-crop to 1369×719 for the share card, then resize and encode as WebP.
`sharp` is already available as a transitive dependency.
