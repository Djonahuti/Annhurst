'use client'
import AdminSidebar from "@/components/Shared/Admin/sidebar";
import TopBar from "@/components/Shared/Admin/TopBar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "sonner";


export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || role !== 'admin')) {
      router.push('/login')
    }
  }, [user, role, loading])  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/80">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="lg:pl-64">  
        <TopBar setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main> 
        
        <Toaster />    
        </div>

    </div>
  );
}