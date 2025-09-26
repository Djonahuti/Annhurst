'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Label>Email</Label>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Label>Password</Label>
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
}