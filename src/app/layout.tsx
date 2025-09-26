export const dynamic = 'force-dynamic'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/Shared/theme-provider'
import { SupabaseProvider } from '@/contexts/SupabaseContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Annhurst Transport Limited',
  description: 'Annhurst Transport Service Limited provides comprehensive bus higher purchase solutions for transportation businesses.',
}

export default function RootLayout({
   children 
}: {
   children: React.ReactNode 
}) { 

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background text-foreground")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
