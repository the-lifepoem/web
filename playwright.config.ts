import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * One seam: the site over HTTP in a real browser.
 *
 * The email path reaches that same seam through configuration rather than a
 * second harness — the server boots with the recording transport, the specs
 * drive the real form, and then read the recorded payload back off disk.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],

  webServer: {
    command: `npm run build && npx next start --port ${PORT}`,
    url: BASE_URL,
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_PUBLIC_SITE_URL: BASE_URL,
      // The stub records instead of sending. The acknowledgement is required
      // because next start sets NODE_ENV=production; without it the server
      // refuses to boot with a stubbed mail transport, which is the point.
      CONTACT_TRANSPORT: "stub",
      CONTACT_TRANSPORT_STUB_ACK: "i-understand-no-email-will-be-sent",
      CONTACT_OUTBOX: ".contact-outbox.jsonl",
      CONTACT_STUB_DELAY_MS: "400",
      CONTACT_TO_EMAIL: "support@lifepoem.one",
    },
  },
});
