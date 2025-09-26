'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import LogoSwitcher from '@/components/LogoSwitcher';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type Settings = {
  logo?: string;
  logo_blk?: string;
  footer_write?: string;
  footer_head?: string;
  email?: string[];
  phone?: string[];
};

export default function Login() {
  const { signIn } = useAuth()  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)  
  const router = useRouter();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from("settings").select("*").single();
      if (!error) setSettings(data);
    };
    fetchSettings();
  }, []);  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error, role } = await signIn(email, password)
      if (error) {
        toast(
          <div>
            <strong>Login failed</strong>
            <div>{error.message || "Invalid credentials. Please try again."}</div>
          </div>,
          { className: "destructive" }
        )
        setError(error.message)
        setIsLoading(false)
        return
      }
      toast(
        <div>
          <strong>Login successful</strong>
          <div>Welcome!</div>
        </div>
      )
      if (role === 'driver') router.push('/profile')
      else if (role === 'admin') router.push('/admin')
      else if (role === 'coordinator') router.push('/user')
      else {
        setError('No role assigned to this user')
        setIsLoading(false)
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast(
        <div>
          <strong>Login failed</strong>
          <div>{error?.message || "Unexpected error. Please try again."}</div>
        </div>,
        { className: "destructive" }
      )
      setError(error?.message || 'Unexpected error')
    } finally {
      setIsLoading(false)
    }
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const settingsContent: Settings = settings || {};  

  return (
    <div className='space-y-4'>

        <div className="text-center mb-3">
          <div className="mx-auto h-16 w-16 rounded-lg flex items-center justify-center">
            <Link href="/">
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
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome Back
          </p>
        </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
       value={email} 
       onChange={(e) => setEmail(e.target.value)} 
       placeholder='Email' 
      />
      
      <div className='relative'>
        <Input
         type={showPassword ? 'text' : 'password'} 
         value={password} 
         onChange={(e) => setPassword(e.target.value)} 
         placeholder='Password' 
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>        
      </div>  
      <Button type="submit" className="w-full text-gray-200" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
    </div>
  );
}