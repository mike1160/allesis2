import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PREFER_NL_COOKIE = "allesis_prefer_nl";

function countryCode(request: NextRequest): string {
  return (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    ""
  ).toUpperCase();
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Explicit preference: stay on NL site (from /th “← allesis.nl”)
  if (request.nextUrl.searchParams.get("prefer") === "nl") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.delete("prefer");
    const res = NextResponse.redirect(url);
    res.cookies.set(PREFER_NL_COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "lax",
    });
    return res;
  }

  // Thailand visitors landing on homepage → Phuket hub
  const preferNl = request.cookies.get(PREFER_NL_COOKIE)?.value === "1";
  if (path === "/" && countryCode(request) === "TH" && !preferNl) {
    const url = request.nextUrl.clone();
    url.pathname = "/th";
    if (!url.searchParams.has("lang")) {
      url.searchParams.set("lang", "th");
    }
    return NextResponse.redirect(url);
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (path.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (path.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if ((path === "/login" || path === "/registreren") && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*", "/login", "/registreren"],
};
