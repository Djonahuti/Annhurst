'use client'

import * as React from "react"
import {
  Bell,
  AlertOctagon,
  Inbox,
  MoreHorizontal,
  PersonStanding,
  Scale,
  Cog,
  File,
  Pencil,
  Send,
  Trash2,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { ThemeToggle } from "../ThemeToggle"
import Modal from "@/components/Modal"
import Contact from "./Contact"

type UserData = {
  id: number
  name: string
  email: string
  avatar?: string
}

export function PopRight() {
  const [isPopOpen, setIsPopOpen] = React.useState(false)
  const [unreadCount, setUnreadCount] = React.useState(0);
  const { user, role } = useAuth();

  const data = [
    [
      {
        label: "Inbox",
        icon: Inbox,
        url: "/my-inbox",
        count: unreadCount,
      },
      {
        label: "Sent",
        icon: Send,
        url: "*",
      },
      {
        label: "Compose",
        icon: Pencil,
        url: "/contact",
      },    
    ],
    [
      {
        label: "Draft",
        icon: File,
        url: "*",
      },
      {
        label: "Spam",
        icon: AlertOctagon,
        url: "*",
      },
      {
        label: "Trash",
        icon: Trash2,
        url: "*",
      },    
    ],
    [
      {
        label: "Settings",
        icon: Cog,
        url: "*",
      },
      {
        label: "Accessibily",
        icon: PersonStanding,
        url: "*",
      },
      {
        label: "Penalties Information",
        icon: Scale,
        url: "*",
      },
      {
        label: "Notifications",
        icon: Bell,
        url: "/my-inbox",
      },   
    ],
  ]  

  React.useEffect(() => {
    setIsPopOpen(true)
  }, []);

  const [isContactModalOpen, setContactModalOpen] = React.useState(false);

  const [profile, setProfile] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      let tableName = ""
      if (role === "admin") tableName = "admins"
      else if (role === "coordinator") tableName = "coordinators"
      else if (role === "driver") tableName = "driver"

      if (!tableName) return

      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("email", user.email)
        .single()

      if (error) {
        console.error(`Error fetching ${role} data:`, error.message)
      } else {
        setProfile(data)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user, role])

  React.useEffect(() => {
    const fetchCounts = async () => {
      const { count: unreadCount } = await supabase
        .from('contact')
        .select('id', { count: 'exact', head: true })
        .eq('is_read', false);
      setUnreadCount(unreadCount || 0);
    };
  
    fetchCounts();
  }, []);  

    if (loading){
      return(
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>     
      )
    }

  if (!profile) {
    return <div>No {role} data found.</div>
  } 

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
        {profile.email}
      </div>
      <Avatar className="h-8 w-8 rounded-full">
        {profile.avatar ? (
        <AvatarImage
         src={`https://uffkwmtehzuoivkqtefg.supabase.co/storage/v1/object/public/receipts/${profile.avatar}`}
         alt={profile.name}
         className="rounded-full" 
         />
        ):(
          <AvatarFallback className="rounded-full">{profile.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
        )}
      </Avatar>
      <Popover open={isPopOpen} onOpenChange={setIsPopOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0 bg-gray-50 dark:bg-gray-900/90"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          {item.label === "Compose" ? (
                            role === 'admin' ? (
                              <SidebarMenuButton
                                onClick={() => setContactModalOpen(true)}
                                className="flex items-center gap-2 hover:bg-red-50 hover:text-primary hover:border-primary w-full p-2 rounded hover:border-b"
                              >
                                <item.icon /> <span>{item.label}</span>
                                {typeof item.count === "number" && item.count > 0 && (
                                  <Badge className="ml-auto text-xs bg-red-500 text-white rounded-full">
                                    {item.count}
                                  </Badge>
                                )}
                              </SidebarMenuButton>
                            ) : null
                          ) : (
                            <SidebarMenuButton
                              asChild
                              className="hover:bg-red-50 hover:text-primary hover:border-primary w-full p-2 rounded hover:border-b"
                            >
                              <a href={item.url} className="flex items-center gap-2">
                                <item.icon /> <span>{item.label}</span>
                                {typeof item.count === "number" && item.count > 0 && (
                                  <Badge className="ml-auto text-xs bg-red-500 text-white rounded-full">
                                    {item.count}
                                  </Badge>
                                )}
                              </a>
                            </SidebarMenuButton>
                          )}
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
              <SidebarGroup className="border-b last:border-none">
                <SidebarGroupContent className="gap-0">
                  <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 hover:bg-red-50 hover:text-primary hover:border-primary w-full p-2 rounded hover:border-b">
                          <LogOut /> <span>Log Out</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
      <Modal isOpen2={isContactModalOpen} onClose={() => setContactModalOpen(false)}>
        <Contact coordinatorId={null} />
      </Modal>
      <div className="block md:hidden text-sm">
          <ThemeToggle />
      </div>      
    </div>
  )
}
