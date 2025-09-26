'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type UserRole = 'driver' | 'coordinator' | 'admin' | 'editor' | 'viewer' | null;

interface AuthContextType {
  userId: string | null;
  role: UserRole;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  role: null,
  isAuthenticated: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAuthenticated(false);
        setUserId(null);
        setRole(null);
        return;
      }
      setIsAuthenticated(true);
      setUserId(user.id);

      // Fetch role
      const { data: admin } = await supabase
        .from('admins')
        .select('role')
        .eq('user_id', user.id)
        .single();
      if (admin) {
        setRole(admin.role);
        return;
      }

      const { data: coordinator } = await supabase
        .from('coordinators')
        .select('id')
        .eq('user_id', user.id)
        .single();
      if (coordinator) {
        setRole('coordinator');
        return;
      }

      const { data: driver } = await supabase
        .from('driver')
        .select('id')
        .eq('user_id', user.id)
        .single();
      if (driver) {
        setRole('driver');
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
      setUserId(session?.user?.id || null);
      checkUser();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserId(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ userId, role, isAuthenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);