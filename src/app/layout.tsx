export const dynamic = 'force-dynamic'
import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Playfair_Display } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/Shared/theme-provider'
import { SupabaseProvider } from '@/contexts/SupabaseContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const inter = Inter({ subsets: ['latin'] })
const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display'
})


export const metadata = {
  title: 'Annhurst Transport Limited',
  description: 'Annhurst Transport Service Limited provides comprehensive bus higher purchase solutions for transportation businesses.',
};
export default async function RootLayout({ children }: { children: ReactNode }) {
  // Fetch logo from Supabase server client
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('settings').select('logo_blk').single();
  let faviconUrl: string | undefined = undefined;
  let faviconType: string | undefined = undefined;
  if (data?.logo_blk) {
    const { data: urlData } = supabase.storage.from('receipts').getPublicUrl(data.logo_blk);
    faviconUrl = urlData.publicUrl ?? undefined;
    // Detect file extension and set MIME type
    if (data.logo_blk.endsWith('.svg')) {
      faviconType = 'image/svg+xml';
    } else if (data.logo_blk.endsWith('.jpg') || data.logo_blk.endsWith('.jpeg')) {
      faviconType = 'image/jpg';
    } else if (data.logo_blk.endsWith('.png')) {
      faviconType = 'image/png';
    } else if (data.logo_blk.endsWith('.ico')) {
      faviconType = 'image/x-icon';
    } else {
      faviconType = undefined;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ...existing metadata... */}
        {faviconUrl && (
          <link key='favicon' rel="icon" href={faviconUrl} {...(faviconType ? { type: faviconType } : {})} />
        )}
      </head>
      <body className={cn(inter.className, playfairDisplay.variable, "bg-background text-foreground")}> 
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
