import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /*
       * App Store Connect registers https://lifepoem.one/support as the app's
       * Support URL, and Play's data-safety declaration points at
       * /delete-account without a locale prefix. Both are live in store
       * consoles, so both must resolve here. The locale proxy then sends them
       * on to the visitor's language.
       */
      { source: "/support", destination: "/contact", permanent: true },
      { source: "/:locale(en|zh|ms|ta)/support", destination: "/:locale/contact", permanent: true },
    ];
  },
};

export default nextConfig;
