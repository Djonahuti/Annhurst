import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type PageContent = {
  title: string;
  text: string;
  hero_big_black?: string;
  hero_big_primary?: string;
  hero_text?: string;
  hero_primary_button?: string;
  hero_secondary_button?: string;
};

type Settings = {
  logo?: string;
  footer_write?: string;
  footer_head?: string;
  email?: string[];
  phone?: string[];
};

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data: page } = await supabase
    .from('pages')
    .select('title, text, hero_big_black, hero_big_primary, hero_text, hero_primary_button, hero_secondary_button')
    .eq('slug', 'home')
    .eq('is_published', true)
    .single();
  const { data: settings } = await supabase
    .from('settings')
    .select('logo, footer_write, footer_head, email, phone')
    .single();

  const pageContent: PageContent = page || {
    title: 'Welcome to Annhurst Transport',
    text: 'Providing reliable bus hire purchase solutions in Nigeria.',
    hero_big_black: 'Annhurst Transport Limited',
    hero_big_primary: 'Your Journey, Our Commitment',
    hero_text: 'Explore our hire purchase options for buses and join our community of drivers.',
    hero_primary_button: 'Get Started',
    hero_secondary_button: 'Learn More',
  };
  const settingsContent: Settings = settings || {};

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="container mx-auto">
          {settingsContent.logo && (
            <img
              src={settingsContent.logo}
              alt="Annhurst Logo"
              className="mx-auto mb-4 h-16"
            />
          )}
          <h1 className="text-4xl font-bold">{pageContent.hero_big_black}</h1>
          <h2 className="text-2xl text-secondary-foreground mt-2">
            {pageContent.hero_big_primary}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto">{pageContent.hero_text}</p>
          <div className="mt-6 space-x-4">
            <Button asChild>
              <Link href="/auth/signup">{pageContent.hero_primary_button}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">{pageContent.hero_secondary_button}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{pageContent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{pageContent.text}</p>
          </CardContent>
        </Card>
      </section>

      {/* Contact Info */}
      {settingsContent.email || settingsContent.phone ? (
        <section className="container mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              {settingsContent.email && (
                <p>Email: {settingsContent.email.join(', ')}</p>
              )}
              {settingsContent.phone && (
                <p>Phone: {settingsContent.phone.join(', ')}</p>
              )}
            </CardContent>
          </Card>
        </section>
      ) : null}
    </div>
  );
}