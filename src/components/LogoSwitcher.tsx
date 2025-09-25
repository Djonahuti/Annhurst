'use client';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { useTheme } from 'next-themes';

type LogoSwitcherProps = {
  logo?: string | null;
  logo_blk?: string | null;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
};

export default function LogoSwitcher({
  logo,
  logo_blk,
  className,
  width = 256,
  height = 64,
  alt = 'Logo',
}: LogoSwitcherProps) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [lightUrl, setLightUrl] = useState<string | null>(null);
  const [darkUrl, setDarkUrl] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Resolve public URLs from Supabase Storage if we have paths
    if (logo) {
      const { data } = supabase.storage.from('receipts').getPublicUrl(logo);
      setLightUrl(data.publicUrl);
    } else {
      setLightUrl(null);
    }
    if (logo_blk) {
      const { data } = supabase.storage.from('receipts').getPublicUrl(logo_blk);
      setDarkUrl(data.publicUrl);
    } else {
      setDarkUrl(null);
    }
  }, [logo, logo_blk]);

  const activeSrc = useMemo(() => {
    const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
    return theme === 'dark' ? darkUrl ?? lightUrl : lightUrl ?? darkUrl;
  }, [resolvedTheme, lightUrl, darkUrl]);

  if (!isMounted) {
    return null;
  }

  if (!activeSrc) {
    return null;
  }

  return (
    <Image
      src={activeSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}


