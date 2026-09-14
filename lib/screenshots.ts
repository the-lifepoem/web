/**
 * The app screenshots the gallery shows, in the order a visitor should see them.
 *
 * Deliberately not declared in the gallery component: that module is
 * "use client", and a plain value exported from a client module reaches a server
 * component as a module-reference proxy, so reading `.length` there yields
 * nothing. Both the client gallery and the server section import it from here.
 *
 * Ordered as a walkthrough, not by filename. The captures arrived with the
 * finished story before the conversation that produces it, which reads
 * backwards to someone deciding whether to download.
 *
 * Index-aligned with `gallery.slides` in every locale file. `npm run
 * check:locales` fails if the lengths drift apart.
 */
export const SCREENSHOT_PATHS = [
  "/lifepoem/screenshots/1.webp", // welcome
  "/lifepoem/screenshots/2.webp", // sign in — phone number
  "/lifepoem/screenshots/3.webp", // sign in — code
  "/lifepoem/screenshots/4.webp", // life stages
  "/lifepoem/screenshots/7.webp", // conversation
  "/lifepoem/screenshots/5.webp", // finished story
  "/lifepoem/screenshots/6.webp", // story card
  "/lifepoem/screenshots/9.webp", // print order
  "/lifepoem/screenshots/8.webp", // account
  "/lifepoem/screenshots/10.webp", // settings
] as const;

/** Native aspect ratio of the captures (1206x2622), so nothing is cropped. */
export const SCREENSHOT_RATIO = "1206 / 2622";
