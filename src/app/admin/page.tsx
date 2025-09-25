'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type PageRow = { id: number; slug: string; text: string | null };

export default function AdminDashboard() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    supabase
      .from('pages')
      .select('id, slug, text')
      .then(({ data }) => setPages((data as PageRow[]) || []));
  }, []);

  const handlePageSelect = async (slug: string) => {
    setSelectedPage(slug);
    const { data } = await supabase
      .from('pages')
      .select('text')
      .eq('slug', slug)
      .single();
    setContent(((data as PageRow) ?? { text: '' }).text || '');
  };

  const handleSavePage = async () => {
    await supabase.from('pages').update({ text: content, updated_at: new Date().toISOString() }).eq('slug', selectedPage);
  };

  return (
    <div className="p-8">
      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="buses">Buses</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Edit Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={handlePageSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page: PageRow) => (
                    <SelectItem key={page.id} value={page.slug}>
                      {page.slug}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                className="mt-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
              <Button className="mt-4" onClick={handleSavePage}>
                Save
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
            </CardHeader>
            <CardContent>{/* Add user management table/form */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buses">
          <Card>
            <CardHeader>
              <CardTitle>Manage Buses</CardTitle>
            </CardHeader>
            <CardContent>{/* Add bus management table/form */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}