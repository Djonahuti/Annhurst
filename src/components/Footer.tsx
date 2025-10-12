'use client'
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import { Avatar, AvatarImage } from './ui/avatar';

type Settings = {
  logo?: string;
  logo_blk?: string;
  footer_write?: string;
  footer_head?: string;
  email?: string[];
  phone?: string[];
  address?: string;
  footer_head2?: string;
  services?: string[];
  bottom_right?: string[];
  bottom_left?: string;
};

export default function Footer() {
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
      <footer className="bg-gray-900 text-white playfair-display p-8 text-center">
        <p>Loading footer...</p>
      </footer>
    );
  }

  const logoUrl = settings.logo_blk
    ? supabase.storage.from("receipts").getPublicUrl(settings.logo_blk).data.publicUrl
    : "/logo/logo.png"; // fallback


  return (
    <footer className="bg-gray-900 text-white playfair-display">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-25 h-25 rounded-lg flex items-center justify-center">
                <Image src={logoUrl} width={256} height={64} alt="Annhurst Transport" className="h-20 w-auto" />
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
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
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
          <div className="flex justify-item-between space-x-3">
            <Link
             href="https://x.com/i/flow/login?redirect_after_login=%2FAnnhurstGSL" 
             className="text-center"
             target="_blank"
             rel="noopener noreferrer"
            >
              <p className='mx-auto h-9 w-9 bg-gradient-to-b from-primary to-primary/80 shadow-md shadow-primary/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/50'>
                  {/* Glossy highlight overlay */}
                <span
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-transparent via-white/30 to-white/70
                    opacity-40
                    rounded-full
                  "
                ></span>
                <IconBrandX stroke={2} className='h-5 w-5 text-white relative z-10' />
              </p>
            </Link>

            <Link
             href="https://web.facebook.com/people/Annhurst-Global-Services/100068235036574/?_rdc=1&_rdr#" 
             className="text-center"
             target="_blank"
             rel="noopener noreferrer"
            >
              <p className='mx-auto h-9 w-9 bg-gradient-to-b from-primary to-primary/80 shadow-md shadow-primary/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/50'>
                  {/* Glossy highlight overlay */}
                <span
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-transparent via-white/30 to-white/70
                    opacity-40
                    rounded-full
                  "
                ></span>
                <IconBrandFacebook className='h-5 w-5 text-white relative z-10' />
              </p>
            </Link>

            <Link
             href="https://www.instagram.com/annhurst_transport_services/" 
             className="text-center"
             target="_blank"
             rel="noopener noreferrer"
            >
              <p className='mx-auto h-9 w-9 bg-gradient-to-b from-primary to-primary/80 shadow-md shadow-primary/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/50'>
                  {/* Glossy highlight overlay */}
                <span
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-transparent via-white/30 to-white/70
                    opacity-40
                    rounded-full
                  "
                ></span>
                <IconBrandInstagram stroke={2} className='h-5 w-5 text-white relative z-10' />
              </p>
            </Link>

            <Link
             href="https://annhurst-gsl.com" 
             className="text-center"
             target="_blank"
             rel="noopener noreferrer"
            >
              <p className='mx-auto h-9 w-9 bg-gray-200 shadow-md shadow-primary/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-30/50'>

                <Avatar className='h-8 w-8 relative z-10'>
                  <AvatarImage src="/ann-logo.png" alt="logo" />
                </Avatar>
              </p>
            </Link>
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
  )
} 