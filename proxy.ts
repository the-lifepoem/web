import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { LOCALE_COOKIE, defaultLocale, isLocale, locales, type Locale } from "./lib/i18n/config";

/**
 * Locale negotiation. Renamed from middleware.ts: Next.js 16 deprecated the
 * middleware convention in favour of proxy, which runs on the Node.js runtime.
 */

function negotiateLocale(request: NextRequest): Locale {
  // An explicit choice beats the browser's preference. The switcher writes this
  // cookie, so returning visitors are not re-negotiated on every visit.
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (chosen && isLocale(chosen)) return chosen;

  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  // Quality-weighted, rather than trusting the first tag: a header of
  // "en;q=0.5,zh-CN;q=0.9" should resolve to zh, not en.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), quality: q ? Number.parseFloat(q.split("=")[1]) || 0 : 1 };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const match = locales.find((locale) => tag === locale || tag.startsWith(`${locale}-`));
    if (match) return match;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first && isLocale(first)) return NextResponse.next();

  const locale = negotiateLocale(request);
  const target = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);
  target.search = request.nextUrl.search;
  return NextResponse.redirect(target);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
};
