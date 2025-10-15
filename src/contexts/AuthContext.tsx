'use client'
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { useSupabase } from './SupabaseContext'

interface AuthContextType {
  user: User | null
  loading: boolean
  role: 'driver' | 'admin' | 'coordinator' | null
  adminRole: 'viewer' | 'editor' | 'admin' | null
  signIn: (email: string, password: string) => Promise<{ error: Error | null, role?: string | null, adminRole?: 'viewer' | 'editor' | 'admin' | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { supabase } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<'driver' | 'admin' | 'coordinator' | null>(null)
  const [adminRole, setAdminRole] = useState<'viewer' | 'editor' | 'admin' | null>(null)

  const fetchUserRole = useCallback(async (email: string) => {
    try {
      // Check role tables and banned status
      let foundRole: 'driver' | 'admin' | 'coordinator' | undefined = undefined
      let banned = false;

      const { data: driver } = await supabase.from('driver').select('id, banned').eq('email', email).single()
      if (driver) {
        foundRole = 'driver';
        if (driver.banned) banned = true;
      }

      const { data: admin } = await supabase.from('admins').select('id, banned, role').eq('email', email).single()
      if (admin) {
        foundRole = 'admin';
        if (admin.banned) banned = true;
        setAdminRole((admin.role as 'viewer' | 'editor' | 'admin') ?? null)
        if (admin.role) localStorage.setItem('adminRole', admin.role as string)
      }

      const { data: coordinator } = await supabase.from('coordinators').select('id, banned').eq('email', email).single()
      if (coordinator) {
        foundRole = 'coordinator';
        if (coordinator.banned) banned = true;
      }

      if (banned) {
        // If user is banned, sign them out
        await supabase.auth.signOut()
        setRole(null)
        setAdminRole(null)
        localStorage.removeItem("role")
        localStorage.removeItem("adminRole")
        return
      }

      setRole(foundRole ?? null)
      if (foundRole) localStorage.setItem("role", foundRole)
      if (!admin) {
        setAdminRole(null)
        localStorage.removeItem('adminRole')
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
    }
  }, [supabase])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        const savedRole = localStorage.getItem("role") as 'driver' | 'admin' | 'coordinator' | null
        if (savedRole) {
          setRole(savedRole)
          const savedAdminRole = localStorage.getItem('adminRole') as 'viewer' | 'editor' | 'admin' | null
          setAdminRole(savedAdminRole ?? null)
        } else {
          // If no role in localStorage, fetch it from database
          await fetchUserRole(session.user.email!)
        }
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (!session) {
        setRole(null)
        setAdminRole(null)
        localStorage.removeItem("role")
        localStorage.removeItem("adminRole")
      } else {
        const savedRole = localStorage.getItem("role") as 'driver' | 'admin' | 'coordinator' | null
        if (savedRole) {
          setRole(savedRole)
          const savedAdminRole = localStorage.getItem('adminRole') as 'viewer' | 'editor' | 'admin' | null
          setAdminRole(savedAdminRole ?? null)
        } else {
          // If no role in localStorage, fetch it from database
          await fetchUserRole(session.user.email!)
        }
      }      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase, fetchUserRole])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error }

    // Use the fetchUserRole function to get role and check banned status
    await fetchUserRole(email)
    
    // Get the role that was set by fetchUserRole
    const currentRole = localStorage.getItem("role") as 'driver' | 'admin' | 'coordinator' | null
    const currentAdminRole = localStorage.getItem('adminRole') as 'viewer' | 'editor' | 'admin' | null

    return { error: null, role: currentRole, adminRole: currentAdminRole }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setRole(null)
    setAdminRole(null)
    localStorage.removeItem("role")
    localStorage.removeItem("adminRole")
  }

  const value = {
    user,
    loading,
    role,
    adminRole,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 