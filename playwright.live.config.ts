import { defineConfig, devices } from "@playwright/test";

const PORT = 3101;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * The one check the main suite cannot make: a real browser filling the real
 * support form against a server configured with the real email provider, which
 * really sends.
 *
 * Separate from playwright.config.ts on purpose — the main suite must never be
 * able to send mail, and this must never run on every commit. Requires
 * MAILERSEND_API_TOKEN and MAILERSEND_FROM_EMAIL in the environment (web/.env
 * is loaded by Next.js automatically).
 */
export default defineConfig({
  testDir: "./e2e-live",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  timeout: 120_000,
  expect: { timeout: 90_000 },

  use: { baseURL: BASE_URL, trace: "retain-on-failure" },

  projects: [{ name: "desktop", use: { ...devices["Desktop Chrome"] } }],

  webServer: {
    command: `npm run build && npx next start --port ${PORT}`,
    url: BASE_URL,
    timeout: 240_000,
    reuseExistingServer: false,
    // CONTACT_TRANSPORT is deliberately unset: unset means the real provider.
    env: { NEXT_PUBLIC_SITE_URL: BASE_URL },
  },
});
