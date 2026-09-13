# Design system

The app palette carried onto the web, with the type scale, spacing, radii and
control states the site uses.

## Colour

| Role | Hex | Contrast |
| --- | --- | --- |
| Warm background | `#F5EFE4` | — |
| Primary brown | `#8B4513` | 7.4:1 on white |
| Primary hover | `#6B3309` | — |
| Main text | `#3E2B1A` | 11.6:1 |
| Muted text | `#5C4A3A` | 6.9:1 |
| Borders | `#D4C4B0` | non-text only |
| Card surface | `#FFFFFF` | — |
| Error (added) | `#9B2C13` | 6.6:1 |
| Success (added) | `#3E6B2A` | 5.4:1 |

Two colours are additions to the app palette: status messages need a non-brown
signal, and both keep an icon plus wording so nothing depends on colour alone.

`#D4C4B0` is a border colour and is not to be used for text — it does not reach
a text contrast ratio.

## Typography

Latin faces are Source Serif 4 (display/headings) and Source Sans 3 (body).

| Role | Family | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| Display / h1 | Source Serif 4 600 | `clamp(40, 5.4vw, 64)` | 1.08 | −.02em |
| Section / h2 | Source Serif 4 | `clamp(31, 3.4vw, 44)` | 1.18 | — |
| Card / h3 | Source Serif 4 | 26 | 1.25 | — |
| Lead | Source Sans 3 | 21 | 1.7 | — |
| Body | Source Sans 3 | 19 | 1.75 | — |
| Small / help | Source Sans 3 | 16 — floor | 1.6 | — |
| Eyebrow | Source Sans 3 600, uppercase | 13 | — | .2em |

Body copy never drops below 18px. 16px is the help-text floor. Legal pages read
at 19px over a 68ch measure.

### Script coverage

| Script | Family | Line height |
| --- | --- | --- |
| Chinese headings | Noto Serif SC | — |
| Chinese body | Noto Sans SC | 1.9 |
| Tamil | Noto Sans Tamil | 2.0 |

## Spacing, radii, elevation

### Spacing scale (4px base)

| Step | Purpose |
| --- | --- |
| 8 | inline gaps |
| 16 | control padding |
| 24 | page gutter |
| 36 | card padding |
| 56 | column gap |
| 88–96 | section rhythm |

### Radii

Sampled steps: 10, 14, 18, 24, pill (999px).

Controls 12–16, cards 18–24, media 20–28. The app's 16–24px character, one step
calmer for larger surfaces.

### Elevation

| Level | Value |
| --- | --- |
| flat | no shadow, 1px `#D4C4B0` border only |
| card | `0 14px 36px rgba(62,43,26,.08)` |
| overlay | `0 18px 44px rgba(62,43,26,.14)` |

Shadows are brown-tinted and used only for the hero frame, story card and
language menu.

## Controls and states

### Buttons

| Variant | Height | Padding | Radius | Text |
| --- | --- | --- | --- | --- |
| Primary | min 64px | 18px 32px | 16px | 20px 600, white on `#8B4513` |
| Hover | min 56px | 16px 26px | 14px | 19px 600, white on `#6B3309` |
| Secondary | min 48px | 12px 20px | 12px | 17px 600, `#8B4513` on 1px `#8B4513` border |
| Disabled | min 48px | 12px 20px | 12px | 17px 600, white on `#8B4513` at opacity .55 |

Focus ring: 3px `#8B4513`, 3px offset, on every interactive element including
badge links and dots.

### Fields

All three states are min-height 56px, 16px horizontal padding, 1.5px border,
14px radius, 19px text.

| State | Border | Notes |
| --- | --- | --- |
| Rest | `#D4C4B0` | placeholder text `#8B7B6C` |
| Focused | `#8B4513` | plus the 3px / 3px-offset focus ring |
| Invalid | `#9B2C13` | error line at 16px 600 in `#9B2C13`, message plus icon, never colour alone |

Labels are always visible; help text sits above the field so it is read before
the input.

### Touch targets

| Size | Radius | Used for |
| --- | --- | --- |
| 44px | 10px | the floor — slider dots and footer links |
| 56px | 12px | page actions |
| 64px | 14px | the form submit and download buttons |

## How these map to code

These values are defined as Tailwind v4 theme tokens in `app/globals.css` under
`@theme`, so a class like `bg-brand`, `text-body`, `rounded-card` or
`min-h-tap-xl` resolves to the value above rather than an ad-hoc number. The
token names below are the ones actually present in that file.

### Colour tokens

| Design-system concept | Token | Value |
| --- | --- | --- |
| Warm background | `--color-parchment` | `#f5efe4` |
| Card surface | `--color-card` | `#ffffff` |
| Primary brown | `--color-brand` | `#8b4513` |
| Primary hover | `--color-brand-hover` | `#6b3309` |
| Main text | `--color-ink` | `#3e2b1a` |
| Muted text | `--color-muted` | `#5c4a3a` |
| Borders | `--color-edge` | `#d4c4b0` |
| Error | `--color-error` | `#9b2c13` |
| Success | `--color-success` | `#3e6b2a` |

`globals.css` also carries roles the design sheet does not enumerate but the
build needs: `--color-paper` (`#fbf7ef`, quiet inset panels), `--color-tint`
(`#f0e4d2`, selected/active fill), `--color-rule` (`#ede3d2`, hairline divider
and nav hover), `--color-faint` (`#8b7b6c`, the placeholder colour, commented
"placeholders only, never body copy"), the dark download panel set
(`--color-dark`, `--color-dark-edge`, `--color-on-dark`,
`--color-on-dark-accent`), and background/edge/ink companions for each status
colour (`--color-error-bg`, `--color-error-edge`, `--color-error-ink`, and the
matching `--color-success-*`).

### Type tokens

Tailwind v4 pairs a `--text-*` token with `--text-*--line-height` and
`--text-*--letter-spacing`, so one utility carries size, leading and tracking.

| Design-system role | Token | Value |
| --- | --- | --- |
| Display / h1 | `--text-display` | `clamp(40px, 5.4vw, 64px)`, 1.08, −0.02em |
| Section / h2 | `--text-section` | `clamp(31px, 3.4vw, 44px)`, 1.18 |
| Card / h3 | `--text-card` | `26px`, 1.25 |
| Lead | `--text-lead` | `21px`, 1.7 |
| Body | `--text-body` | `19px`, 1.75 |
| Small / help | `--text-small` | `16px`, 1.6 |
| Eyebrow | `--text-eyebrow` | `13px`, 1.4, 0.2em |

Additional sizes in the file that the sheet folds into its broader roles:
`--text-page` (`clamp(34px, 4.2vw, 50px)`, legal page titles), `--text-panel`
(`clamp(34px, 4.4vw, 54px)`, the dark download panel heading), `--text-slide`
(`29px`), `--text-row` (`18px`, 1.65) and `--text-label` (`14px`, 0.16em).

### Font-family tokens

Declared in a second `@theme inline` block because they reference variables that
`next/font` defines outside it: `--font-display`, `--font-body`,
`--font-display-zh`, `--font-body-zh`, `--font-body-ta`.

The script-coverage rules are applied in `@layer base` keyed on the server-
rendered `lang` attribute: `html[lang^="zh"] body` gets `--font-body-zh` at
line-height 1.9, `html[lang^="ta"] body` gets `--font-body-ta` at line-height 2,
and `html[lang^="zh"] :is(h1,h2,h3):not(.font-display)` gets `--font-display-zh`
at 1.35 (Tamil headings 1.6). The `.font-display` escape hatch keeps the
wordmark in the Latin serif in every locale.

### Radius tokens

The 12–16 / 18–24 / 20–28 guidance is expressed as named steps rather than
numbers: `--radius-control` (12px), `--radius-field` (14px), `--radius-action`
(16px), `--radius-panel` (18px), `--radius-media` (20px), `--radius-card`
(24px), `--radius-frame` (28px), `--radius-phone` (26px).

### Elevation tokens

`--shadow-card` (`0 14px 36px rgba(62,43,26,0.08)`) and `--shadow-overlay`
(`0 18px 44px rgba(62,43,26,0.14)`) are the sheet's card and overlay values
verbatim. Two more exist for the surfaces the sheet names: `--shadow-form`
(`0 14px 36px rgba(62,43,26,0.07)`) and `--shadow-frame`
(`0 18px 44px rgba(62,43,26,0.1)`, the hero frame).

### Touch-target tokens

`--spacing-tap` (44px), `--spacing-tap-lg` (56px) and `--spacing-tap-xl` (64px),
used as `min-h-tap`, `min-h-tap-lg` and `min-h-tap-xl`. The file's own comment
gives the reason: "Named so a call site cannot quietly go below them."

### Container tokens

`--container-shell` (1240px), `--container-section` (1160px),
`--container-narrow` (1040px), `--container-panel` (820px).

### The focus ring

Not a token — it is a base-layer rule, so it cannot be omitted per component:

```css
*:focus-visible {
  outline: 3px solid var(--color-brand);
  outline-offset: 3px;
  border-radius: 4px;
}
```

The placeholder colour is likewise applied globally via
`input::placeholder, textarea::placeholder { color: var(--color-faint); }`.
