'use client'
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Toaster } from "sonner"
import { AppSidebar } from "@/components/mail/Sidebar"
import { MailHeader } from "@/components/mail/MailHeader"
import { MailProvider } from "@/components/mail/MailProvider"

export default function MailLayout({
   children 
}: {
   children: React.ReactNode 
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
    <MailProvider>
    <AppSidebar />
      <SidebarInset>
        <MailHeader />
        <main>
            <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-900/80">
                {children}
                <Toaster />
            </div>
        </main>
      </SidebarInset>        
    </MailProvider>    

    </SidebarProvider>
  )
}