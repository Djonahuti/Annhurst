'use client'
import LogoSwitcher from "@/components/LogoSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/lib/supabase/client";
import { Bus, Coins, Contact, FileText, Home, Mail, Settings, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Mailbox', href: '/my-inbox', icon: Mail },
    { name: 'Add Bus', href: '/admin/add-bus', icon: Bus },
    { name: 'Drivers', href: '/admin/drivers', icon: Contact },
    { name: 'View Users', href: '/admin/users', icon: Users },
    { name: 'Payments', href: '/admin/payments', icon: Coins },
    { name: 'Pages', href: '/admin/pages', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  type Settings = {
    logo?: string;
    logo_blk?: string;
    footer_write?: string;
    footer_head?: string;
    email?: string[];
    phone?: string[];
  };

  type SidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
  };

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const pathname = usePathname();
    const [settings, setSettings] = useState<Settings | null>(null);
  
    useEffect(() => {
      const fetchSettings = async () => {
        const { data, error } = await supabase.from("settings").select("*").single();
        if (!error) setSettings(data);
      };
      fetchSettings();
    }, []);
    
  
    if (!settings) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      );
    }
  
    const settingsContent: Settings = settings || {};

return (
    <div>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-50 w-64 sm:ring-1 sm:ring-gray-900/10 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/90">
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div className="flex items-center space-x-2">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
              {(settingsContent.logo || settingsContent.logo_blk) && (
            <>
              <LogoSwitcher
                logo={settingsContent.logo}
                logo_blk={settingsContent.logo_blk}
                width={256}
                height={64}
                alt="Annhurst Logo"
                className="h-10 w-auto"
              />
            </>
          )}
              </Link>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-6 px-3">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-red-50 text-primary border border-primary'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-colors'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
              <li className='mt-auto'><ThemeToggle/></li>              
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-600 px-6">
          <div className="flex h-16 items-center">
            <div className="flex items-center space-x-2">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
              {(settingsContent.logo || settingsContent.logo_blk) && (
            <>
              <LogoSwitcher
                logo={settingsContent.logo}
                logo_blk={settingsContent.logo_blk}
                width={256}
                height={64}
                alt="Annhurst Logo"
                className="h-10 w-auto"
              />
            </>
          )}
              </Link>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive
                              ? 'bg-red-50 text-primary border border-primary'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-colors'
                          }`}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                  <li className='mt-auto'><ThemeToggle/></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>        
    </div>
);
}