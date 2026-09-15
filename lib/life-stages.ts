/**
 * The seven paintings behind the hero carousel, one per life stage, in the order
 * the app walks through them.
 *
 * Index-aligned with `stages.items` and `stages.artAlts` in every locale file:
 * slide *n* shows this painting, is captioned with that stage's name and is
 * described by that alt string. `npm run check:locales` fails if the array
 * lengths drift apart, and `e2e/hero-stages.spec.ts` fails if the names stop
 * lining up with the pictures.
 *
 * Declared here rather than in the carousel for the same reason as
 * `lib/screenshots.ts`: that module is "use client", and a plain value exported
 * from a client module reaches a server component as a module-reference proxy.
 */
export const LIFE_STAGE_ART = [
  "/lifepoem/stages/1-childhood.webp",
  "/lifepoem/stages/2-school.webp",
  "/lifepoem/stages/3-career.webp",
  "/lifepoem/stages/4-romance.webp",
  "/lifepoem/stages/5-family.webp",
  "/lifepoem/stages/6-reflections.webp",
  "/lifepoem/stages/7-wishes.webp",
] as const;

/** 4:5 portrait, the crop the hero frame was drawn around. */
export const LIFE_STAGE_ART_RATIO = "820 / 1025";
