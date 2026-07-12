import { NextResponse, type NextRequest } from "next/server";

/**
 * CIN middleware — the dispatcher.
 * Path-based is the default and needs zero DNS.
 * The host-based branch is the same file if we ever buy a domain.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const sub = host.split(":")[0].split(".")[0];
  const isSubdomainTenant =
    !host.startsWith("localhost") &&
    !["www", "cin", "vercel"].includes(sub) &&
    host.split(".").length > 2;

  // IMPORTANT: Allow root page and explicit paths like /login, /signup, /provision
  // to be accessed without a tenant context.
  const path = req.nextUrl.pathname;
  if (path === "/" || path.startsWith("/login") || path.startsWith("/signup") || path.startsWith("/provision")) {
    return NextResponse.next();
  }

  if (isSubdomainTenant && !req.nextUrl.pathname.startsWith("/t/")) {
    return NextResponse.rewrite(
      new URL(`/t/${sub}${req.nextUrl.pathname}`, req.url),
    );
  }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
