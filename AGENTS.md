<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design tokens

The visual system comes from an approved design prototype and is expressed as
Tailwind v4 theme tokens in `app/globals.css`. Use the token, never a raw value:
write `bg-parchment`, `text-ink`, `rounded-card`, `shadow-card`, `min-h-tap-xl`,
not `bg-[#f5efe4]` or an inline style. `docs/design-system.md` has the full table
with contrast ratios.

This is absolute for colours, shadows, radii, spacing and touch targets — there
is a token for every value the design uses, and a raw one is always a mistake.
If the design needs a size the scale does not have, **add a named token for it**
rather than writing `text-[22px]` at the call site; that is how `--text-wordmark`
and `--text-control` came to exist. The one sanctioned inline style is the
gallery's transform, which has to be computed per slide.

Rules that are not negotiable, because the audience is older adults:

- **Body copy never drops below 18px.** `text-small` (16px) is the floor, and only
  for field help text and footnotes.
- **Touch targets**: `min-h-tap` (44px) is the absolute floor and applies to
  gallery dots and footer links; `min-h-tap-lg` (56px) for page actions and
  mobile nav rows; `min-h-tap-xl` (64px) for the support submit button and the
  download buttons.
- **Focus is always visible**: a 3px brand ring at 3px offset, set globally. Do
  not remove it on any element, badge links and gallery indicators included.
- **Status is never colour alone.** Error and success states pair the colour with
  an icon and wording.
- Motion respects `prefers-reduced-motion`; the gallery checks it directly
  because its transition is applied inline.

# Content rules

- `messages/en.json` is the source of truth. `zh`, `ms` and `ta` must match its
  key paths, array lengths and `{placeholders}` exactly — run
  `npm run check:locales`. The `Dictionary` type is derived from the English
  file, so a missing key is a build error, not a runtime surprise.
- The screenshot image list in `components/home/screenshot-gallery.tsx` and the
  `gallery.slides` array in every locale file are **index-aligned**. Changing one
  without the others mislabels a screen.
- Use the vocabulary in `CONTEXT.md`. In particular: **life stage**, not
  "chapter"; the fourth stage is **Romance**, not "love"; reading size is a
  control inside the app's conversation and story views, not a setting; and
  **sync** only happens for a signed-in storyteller.
- Legal documents under `lib/legal/documents/` are approved copy. Style them,
  never edit their wording.

# Verification

`npm run typecheck` · `npm run lint` · `npm run check:locales` · `npm run test:e2e`

The end-to-end suite is the only test seam: it drives a real browser over HTTP.
Email delivery reaches that same seam through `CONTACT_TRANSPORT=stub`, which
records payloads instead of sending them. The stub refuses to run under
`NODE_ENV=production` without an explicit acknowledgement variable, so a
deployment can never silently stop sending support email.
