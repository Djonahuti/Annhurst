'use client'
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SettingsData {
  id: number;
  logo: string | null;
  logo_blk: string | null;
  footer_write: string | null;
  footer_head: string | null;
  footer_head2: string | null;
  services: string[] | null;
  phone: string[] | null;
  email: string[] | null;
  address: string | null;
  bottom_left: string | null;
  bottom_right: string[] | null;
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase.from("settings").select("*").single();
    if (error) {
      toast.error("Error fetching settings");
    } else {
      setSettings(data);
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className='bg-gray-50 bg-gradient-to-r dark:from-gray-400 dark:to-red-300'>
        <CardHeader className="flex justify-between items-center">
            <CardTitle className='text-gray-900'>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {settings.logo && (
            <div className='mb-4'>
              <div className="flex justify-between items-center space-x-2">
                <p className="font-medium text-lg text-gray-900">Main Logo:</p>
                <Image
                 src={supabase.storage.from("receipts").getPublicUrl(settings.logo).data.publicUrl} 
                 alt="Logo" 
                 className="h-20 w-auto"
                  width={256}
                  height={64} 
                />
              </div>
            </div>
          )}   

          <div className='flex items-center p-4 text-lg text-gray-900'>Footer Section</div>  

            <footer className="bg-gray-900 text-white playfair-display p-4">
              <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Company Info */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-25 h-25 rounded-lg flex items-center justify-center">
                        {settings.logo_blk && (
                          <Image
                            src={supabase.storage.from("receipts").getPublicUrl(settings.logo_blk).data.publicUrl}
                            alt="Annhurst Transport"
                            className="h-20 w-auto"
                            width={256}
                            height={64}
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 max-w-md">
                      {settings.footer_write ||
                        "Your trusted partner in bus higher purchase solutions."}
                    </p>
                    <div className="space-y-2 text-sm text-gray-300">
                      {settings.phone?.map((ph: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{ph}</span>
                        </div>
                      ))}
                      {settings.email?.map((em: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{em}</span>
                        </div>
                      ))}
                      {settings.address && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{settings.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Quick Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      {settings.footer_head || "Quick Links"}
                    </h3>
                  </div>
                  
                  {/* Services */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      {settings.footer_head2 || "Services"}
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      {settings.services?.map((srv: string, i: number) => (
                        <li key={i}>{srv}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                  
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-300 text-sm">
                      © {new Date().getFullYear()} {settings.bottom_left || "Company"}
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                      {settings.bottom_right?.map((link: string, i: number) => (
                        <Link
                          key={i}
                          href="/terms"
                          className="text-gray-300 hover:text-white text-sm transition-colors"
                        >
                          {link}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </footer>                 
        </CardContent>

        <CardFooter>
            <Button
             onClick={() => router.push("/admin/settings/edit/1")}
             className="bg-primary text-gray-200 hover:bg-primary-dark hover:text-gray-100 dark:hover:bg-primary-light"
            >
              Edit Settings
            </Button>
        </CardFooter>
    </Card>

  )
} 