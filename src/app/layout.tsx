'use client';
import { ReactNode, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';
import './globals.css';
import { Toaster } from 'sonner';

type UserRole = 'driver' | 'coordinator' | 'admin' | 'editor' | 'viewer' | null;

export default function RootLayout({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAuthenticated(false);
        return;
      }
      setIsAuthenticated(true);

      // Fetch role
      const { data: admin } = await supabase
        .from('admins')
        .select('role')
        .eq('user_id', user.id)
        .single();
      if (admin) {
        setUserRole(admin.role);
        return;
      }

      const { data: coordinator } = await supabase
        .from('coordinators')
        .select('id')
        .eq('user_id', user.id)
        .single();
      if (coordinator) {
        setUserRole('coordinator');
        return;
      }

      const { data: driver } = await supabase
        .from('driver')
        .select('id')
        .eq('user_id', user.id)
        .single();
      if (driver) {
        setUserRole('driver');
      }
    };
    checkUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserRole(null);
    router.push('/auth/login');
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
          <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                Annhurst Transport
              </Link>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} md:items-center w-full md:w-auto`}>
                <ul className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:underline">
                      About
                    </Link>
                  </li>
                  {isAuthenticated && userRole === 'driver' && (
                    <li>
                      <Link href="/driver" className="hover:underline">
                        Driver Dashboard
                      </Link>
                    </li>
                  )}
                  {isAuthenticated && userRole === 'coordinator' && (
                    <li>
                      <Link href="/coordinator" className="hover:underline">
                        Coordinator Dashboard
                      </Link>
                    </li>
                  )}
                  {isAuthenticated && ['admin', 'editor', 'viewer'].includes(userRole || '') && (
                    <li>
                      <Link href="/admin" className="hover:underline">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  {isAuthenticated ? (
                    <li>
                      <Button variant="ghost" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </Button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link href="/auth/login" className="hover:underline">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link href="/auth/signup" className="hover:underline">
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </header>
          <main className="container mx-auto py-8">{children}</main>
          <footer className="bg-primary text-primary-foreground p-4 mt-8">
            <div className="container mx-auto text-center">
              &copy; {new Date().getFullYear()} Annhurst Transport Limited
            </div>
          </footer>
        <Toaster />
      </body>
    </html>
  );
}