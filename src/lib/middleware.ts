import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Create a response object
  const supabaseResponse = NextResponse.next({
    request: req,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the user's session. This is important for Server Components
  // and for protecting routes.
  // The call to getUser() or getSession() will refresh the session cookies.
  await supabase.auth.getSession();
  
  // Return the modified response object, which now has the updated cookies
  return supabaseResponse;
}

export const config = {
  matcher: ['/dashboard/:path*', '/driver/:path*', '/coordinator/:path*', '/admin/:path*'],
};