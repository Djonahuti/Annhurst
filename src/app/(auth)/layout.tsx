import { ReactNode } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type Settings = {
  logo?: string;
  logo_blk?: string;
  footer_write?: string;
  footer_head?: string;
  email?: string[];
  phone?: string[];
  bottom_left?: string;
};

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();

  const { data: settings } = await supabase
    .from('settings')
    .select('logo, logo_blk, footer_write, footer_head, email, phone, bottom_left')
    .single();

    const settingsContent: Settings = settings || {};

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 bg-gradient-to-r dark:from-gray-400 dark:to-red-300">
      <Card className="w-full max-w-md space-y-8 p-4">
        <CardContent>{children}</CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You Have a Bus, but don&apos;t have Login Credentials?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact your coordinator
            </Link>
          </p>
        </CardFooter> 

      <div className="mt-6 text-center">
      {(settingsContent) && (
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} {settingsContent.bottom_left || "Company"}
        </p>
      )}
      </div>               
      </Card>
    </div>
  );
}