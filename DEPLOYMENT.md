# Deploying the LifePoem website

Host: **Vercel**. `vercel.json` sets the framework, pins the region to Singapore
(`sin1`, closest to the audience) and adds security and asset-cache headers.

## Hard requirements

- **A Node.js runtime.** The support form is a Server Action and its email
  transport uses Node's `https` module. **A static export cannot host this
  site** — the form would 404.
- Node **20.9 or newer** (Next.js 16 dropped Node 18).
- Outbound HTTPS to `api.mailersend.com`, and tolerance for a request that can
  take up to the 60-second transport timeout.

## Environment variables

Set these in the Vercel project, for Production and Preview:

| Variable | Required | Notes |
| --- | --- | --- |
| `MAILERSEND_API_TOKEN` | yes | Sending token. Never commit it. |
| `MAILERSEND_FROM_EMAIL` | yes | Must be on a domain verified in MailerSend, or the API returns 422. |
| `CONTACT_TO_EMAIL` | no | Defaults to `support@lifepoem.one`. See the warning below before changing it. |
| `NEXT_PUBLIC_SITE_URL` | yes | Absolute origin, e.g. `https://lifepoem.one`. Canonical URLs, hreflang, the sitemap and OpenGraph tags all derive from it; a wrong value silently publishes wrong canonicals. |

### Changing the support address

`support@lifepoem.one` is not only an environment variable. It is written into
visitor-facing copy in all four locales — the delivery-failure fallback, the
"write to us directly" card, the success message and the footer — and into the
twelve legal documents. Setting `CONTACT_TO_EMAIL` alone would route mail to a
new address while the page still tells people to write to the old one. Change
the copy in `messages/*.json` and the legal documents at the same time.

**Do not set `CONTACT_TRANSPORT` in production.** Unset means the real provider.
Setting it to `stub` under `NODE_ENV=production` is refused at request time
unless `CONTACT_TRANSPORT_STUB_ACK` is also present — the failure is deliberate
and loud, because a site that quietly stopped sending support email would be
worse than one that errors.

## URLs referenced from outside this repo

Changing the shape of these breaks fields already saved in store consoles:

- `/{locale}/privacy` — the Play data-safety declaration points at `/en/privacy`.
- `/delete-account` — Play requires a reachable deletion URL; the prefix-less
  form works through the locale proxy, and the footer links to it on every page.
- `/support` — registered as the App Store Connect Support URL. It is a
  permanent redirect to the localised contact page. This route did not exist
  before; the store link was 404ing.

## Verifying a deploy

```
npm run typecheck && npm run lint && npm run check:locales && npm run test:e2e
```

Then, once per environment, confirm real delivery — the one thing the suite
cannot prove:

```
npm run test:mail
```

That sends a genuine email. Check the support mailbox actually received it.

## DNS and domain

Not configured here. The canonical origin is `https://lifepoem.one`; point the
apex and `www` at Vercel and set `www` to redirect to the apex, so canonical
URLs and the sitemap agree with what visitors reach.
