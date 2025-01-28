import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const nextIntlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  nextIntlMiddleware(req);

  const supabase = createClient();

  const { data } = await (await supabase).auth.getSession();

  const session = data?.session;

  const isLoginPage = req.nextUrl.pathname.includes("/login");
  const isRestrictedPage = ["/profile","create-product"].some((path) =>
    req.nextUrl.pathname.includes(path)
  );

  if (!session && !isLoginPage && isRestrictedPage) {
    const locale = req.nextUrl.pathname.startsWith("/ka") ? "ka" : "en";
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (
    !req.nextUrl.pathname.startsWith("/en") &&
    !req.nextUrl.pathname.startsWith("/ka")
  ) {
    const defaultLocale = "en";
    const redirectUrl = new URL(
      `/${defaultLocale}${req.nextUrl.pathname}`,
      req.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/", "/(ka|en)/:path*"],
};
