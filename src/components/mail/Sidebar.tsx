"use client"

import * as React from "react"
import { ArchiveX, Clock5, File, Inbox, Milestone, AlertOctagon, SendHorizontal, Star, Trash2 } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Contact } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase/client"
import { MailContext } from "@/contexts/MailContext"
import { NavUser } from "./NavUser"
import { useEffect as useThemeEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext"
import { Badge } from "../ui/badge"
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle"

interface Settings {
  logo: string | null;
  logo_blk: string | null;
} 

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inbox",
      url: "/mail",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Sent",
      url: "#",
      icon: SendHorizontal,
      isActive: false,
    },
    {
      title: "Starred",
      url: "#",
      icon: Star,
      isActive: false,
    },
    {
      title: "Snoozed",
      url: "#",
      icon: Clock5,
      isActive: false,
    },
    {
      title: "Important",
      url: "#",
      icon: Milestone,
      isActive: false,
    },
    {
      title: "Drafts",
      url: "#",
      icon: File,
      isActive: false,
    },
    {
      title: "Spam",
      url: "#",
      icon: AlertOctagon,
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
      isActive: false,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const { setOpen } = useSidebar()
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const { setSelectedMail, activeFilter, setActiveFilter } = React.useContext(MailContext)
    const [settings, setSettings] = React.useState<Settings | null>(null);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const { user, role } = useAuth()   // ✅ new
  const [searchQuery, setSearchQuery] = React.useState("");

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter contacts based on search
  const filteredContacts = contacts.filter((contact) => {
    const q = searchQuery.toLowerCase();
    return (
      contact.sender?.toLowerCase().includes(q) ||
      (typeof contact.receiver === "string" ? contact.receiver.toLowerCase().includes(q) : false) ||
      (typeof contact.subject?.subject === "string" ? contact.subject.subject.toLowerCase().includes(q) : false) ||
      (typeof contact.message === "string" ? contact.message.toLowerCase().includes(q) : false)
    );
  });

  React.useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from("settings").select("*").single();
      if (!error) setSettings(data);
    };
    fetchSettings();
  }, []);  

  const handleSelectMail = async (mail: Contact) => {
    setOpen(true)
    setSelectedMail(mail); // This now pushes it to Inbox.tsx

    // Mark the contact as read
    await supabase
      .from('contact')
      .update({ is_read: true })
      .eq('id', mail.id);
  }
  
  React.useEffect(() => {
    const fetchContact = async () => {
      let query =  supabase
        .from('contact')
        .select('*, driver(name, email, avatar), subject(subject)')
        .order('created_at', { ascending: false }); // Optional: Order by submission date

      // --- Role-based visibility rules ---
      if (role === 'driver' || role === 'coordinator') {
        if (activeFilter === 'Sent') {
          query = query.eq('sender_email', user?.email || '');
        } else {
          // Default and other tabs: only messages received by the user
          query = query.eq('receiver_email', user?.email || '');
        }
      } else if (role === 'admin') {
        if (activeFilter === 'Sent') {
          // Admin sees only own sent when on Sent
          query = query.eq('sender_email', user?.email || '');
        } else {
          // Admin sees all except their own sent in Inbox/others
          query = query.neq('sender_email', user?.email || '');
        }
      }

      // Additional UI filters
      if (activeFilter === 'Starred') {
        query = query.eq('is_starred', true);
      } else if (activeFilter === 'Important' && role !== 'admin') {
        query = query.eq('is_read', false);
      }

      // Execute single query after all filters
      const { data, error } = await query
      let mapped: Contact[] = []
      if (!error && data) {
        mapped = (data as Contact[]).map((c) => ({
          ...c,
          source: 'contact',
        }))
      }

      // Admin: optionally augment with external contact_us on Important tab
      let normalizedContacts: Contact[] = []
      if (role === 'admin' && activeFilter === 'Important') {
        const { data: contactUs } = await supabase
          .from('contact_us')
          .select('*')
          .order('created_at', { ascending: false })
        if (contactUs) {
          type ContactUs = {
            id: number;
            name?: string;
            email?: string;
            subject?: string;
            message: string;
            created_at: string;
          };
          normalizedContacts = (contactUs as ContactUs[]).map((c) => ({
            id: c.id,
            coordinator_id: 0,
            driver_id: 0,
            subject_id: 0,
            message: c.message,
            created_at: c.created_at,
            transaction_date: null,
            is_starred: false,
            is_read: false,
            attachment: null,
            sender: c.name || 'Unknown',
            receiver: 'Admin',
            sender_email: c.email || '',
            receiver_email: '',
            driver: null,
            subject: { subject: c.subject || 'Contact Us' },
            coordinator: null,
            source: 'contact_us',
          }))
        }
      }

      setContacts([...mapped, ...normalizedContacts])
    };

    fetchContact();
  }, [activeFilter, role, user]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    const getRelativeTime = (date: Date): string => {
        const now = new Date()
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000) // in seconds
      
        const mins = Math.floor(diff / 60)
        const hours = Math.floor(mins / 60)
        const days = Math.floor(hours / 24)
      
        if (diff < 60) return "Just now"
        if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} ago`
        if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`
        if (days === 1) return "A day ago"
        return `${days} days ago`
    };
          
    const formatSubmittedAt = (timestamp: string): string => {
        const date = new Date(timestamp)
        return `${formatTime(date)} ${getRelativeTime(date)}`
    };
      
    const toggleStar = async (contact: Contact) => {
      const newStarredStatus = !contact.is_starred;
      await supabase
        .from('contact')
        .update({ is_starred: newStarredStatus })
        .eq('id', contact.id);
      
      // Update local state
      setContacts((prevContacts) =>
        prevContacts.map((c) =>
          c.id === contact.id ? { ...c, is_starred: newStarredStatus } : c
        )
      );
    };
    
    const toggleUnreadFilter = async () => {
      const newUnreadStatus = !contacts.every((contact) => contact.is_read);
    
      // Update the database
      await supabase
        .from('contact')
        .update({ is_read: newUnreadStatus })
        .in('id', contacts.map((contact) => contact.id));
    
      // Update local state
      setContacts((prevContacts) =>
        prevContacts.map((contact) => ({
          ...contact,
          is_read: newUnreadStatus,
        }))
      );
    };

  // Listen for theme changes
  useThemeEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    updateTheme();
    mq.addEventListener('change', updateTheme);
    // Listen for class changes (ThemeToggle likely toggles 'dark' class)
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      mq.removeEventListener('change', updateTheme);
      observer.disconnect();
    };
  }, []);

  const getHomeLink = () => {
    if (role === "admin") return "/admin";
    if (role === "coordinator") return "/user";
    if (role === "driver") return "/profile";
    return "/";
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Choose logo based on theme
  const logoKey = theme === 'dark' ? 'logo_blk' : 'logo';
  const logoPath = settings[logoKey] || settings.logo || 'logo.png';
  const logoUrl = logoPath
    ? supabase.storage.from("receipts").getPublicUrl(logoPath).data.publicUrl
    : "/logo/logo.png"; // fallback    

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r sm:ring-1 sm:ring-gray-900/10 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/90"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href={getHomeLink()}>
                  <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground">
                  <img
                  src={logoUrl}
                  alt="logo"
                  width={85}
                  height={20}
                  />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        setActiveFilter(item.title)
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className={`px-2.5 md:px-2 transition-colors ${
                        activeItem?.title === item.title
                          ? 'bg-red-50 text-primary border border-primary'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-colors'
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex flex-col sm:ring-1 sm:ring-gray-900/10 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/90">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch
               className="shadow-none" 
               onCheckedChange={toggleUnreadFilter}
              />
            </Label>
          </div>
          <SidebarInput
           placeholder="Type to search..." 
           value={searchQuery}
           onChange={handleSearchChange}
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                <div
                  key={`${contact.source}-${contact.id}`}
                  onClick={() => handleSelectMail(contact)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedMail(contact);
                  }}
                  className={`flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-red-50 hover:text-primary hover:border-primary ${
                    contact.is_read ? 'myBox' : 'unread font-bold' // Add conditional class
                  }`}
                >
                  <div className="flex w-full items-center gap-2">
                  <Avatar>
                  {contact.driver?.avatar ? (
                    <AvatarImage
                      src={`https://uffkwmtehzuoivkqtefg.supabase.co/storage/v1/object/public/receipts/${contact.driver?.avatar}`}
                      alt={contact.driver?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />                     
                  ):(
                    <AvatarFallback className="rounded-lg">
                      {(activeFilter === 'Sent' ? (contact.receiver || '') : (contact.sender || '')).substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                  </Avatar>
                    <span>{activeFilter === 'Sent' ? (contact.receiver || contact.sender) : contact.sender}</span>{" "}
                    {/* ✅ External badge for contact_us */}
                    {role === "admin" && String(contact.id).startsWith("us-") && (
                      <Link href={`/contact-us/${String(contact.id).replace("us-", "")}`}>
                        <Badge className="ml-2 bg-yellow-500 text-white">External</Badge>
                      </Link>
                    )}
                    <span className="ml-auto text-xs">{formatSubmittedAt(contact.created_at)}</span>
                  </div>
                  <div className="flex justify-between space-x-8 items-center relative gap-1">
                  <span className="font-medium right-2">{contact.subject?.subject}</span>
                  <a
                    href="#"
                    key={`${contact.source || "contact"}-${contact.id}`}
                    onClick={() => handleSelectMail(contact)}
                    className="text-lg left-2 text-yellow-500 hover:text-yellow-600 text-end"
                  >
                      <button onClick={() => toggleStar(contact)}>
                        {contact.is_starred ? '★' : '☆'} {/* Star icon */}
                      </button>
                  </a>                                      
                  </div>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {String(contact.message)}
                  </span>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500">No results found.</p>
            )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
