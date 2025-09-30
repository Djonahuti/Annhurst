'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PopRight } from "../Shared/PopRight";

export function MailHeader() {
  return (
    <>
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b sm:ring-1 sm:ring-gray-900/10 bg-gray-50 dark:bg-gray-900/90 p-4 z-50">
    <div>
    <SidebarTrigger className="-ml-1" />
    <Separator orientation="vertical" className="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>
          <h1 className="text-base font-medium">Inbox</h1>          
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb></div>
    <div className="ml-auto px-3">
      <PopRight />
    </div>
  </header>
  </>
  )
}
