'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { ChevronDown, LogOut, Menu, User } from "lucide-react"
import { useRouter } from "next/navigation"

type TopBarProps = {
  setSidebarOpen: (open: boolean) => void;
};

export default function TopBar({ setSidebarOpen }: TopBarProps) {
    const { user, signOut } = useAuth()      
    const router = useRouter();  
   

    const handleSignOut = async () => {
        await signOut();
        router.push('/login') // or '/admin/login'
      }       

return (
 <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/90 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Menu className="h-6 w-6" />
    </button>

    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <div className="flex flex-1"></div>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{user?.email || 'User'}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>    
)
}