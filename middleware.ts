import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, isLocale, type Locale } from "./lib/i18n/config";

function negotiateLocale(request: NextRequest): Locale {
  const al = request.headers.get("accept-language");
  if (!al) return defaultLocale;
  const primary = al.split(",")[0]?.trim().split(";")[0]?.toLowerCase() ?? "";
  if (primary.startsWith("zh")) return "zh";
  if (primary.startsWith("ms")) return "ms";
  if (primary.startsWith("ta")) return "ta";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  const locale = negotiateLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
