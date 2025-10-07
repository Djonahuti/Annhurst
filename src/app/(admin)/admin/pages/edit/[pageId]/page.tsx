'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import EditPhone from '@/components/Shared/Admin/EditPhone'

interface Page {
  id: string
  title: string
  slug: string
  is_published: boolean
  meta_description: string | null
  text: string | null
  hero_big_black: string | null
  hero_big_primary: string | null
  hero_text: string | null
  hero_year: string | null
  hero_year_span: string | null
  hero_100: string | null
  hero_100_span: string | null
  hero_24: string | null
  hero_24_span: string | null
  hero_primary_button: string | null
  hero_secondary_button: string | null
  body_heading: string | null
  body_sub_heading: string | null
  body_first_text: string | null
  body_second_text: string | null
  body_heading2: string | null
  body_sub_heading2: string | null
  body_heading3: string | null
  body_sub_heading3: string | null
  body_heading4: string | null
  body_sub_heading4: string | null
  section_text: string | null
  section_head: string | null
  section_primary_btn: string | null
  section_secondary_btn: string | null
  team_img: string | null
  team_text: string | null
  team_role: string | null
  team_img2: string | null
  team_text2: string | null
  team_role2: string | null
  team_img3: string | null
  team_text3: string | null
  team_role3: string | null
  box_head: string | null
  box_text: string | null
  box_head2: string | null
  box_text2: string | null
  box_head3: string | null
  box_text3: string | null
  box_head4: string | null
  box_text4: string | null
  box_head5: string | null
  box_text5: string | null
  box_head6: string | null
  box_text6: string | null
  box_head7: string | null
  box_text7: string | null
  box_head8: string | null
  box_text8: string | null
  box_head9: string | null
  box_text9: string | null
}

type FormData = Partial<Page>

export default function PageEdit() {
  const params = useParams()
  const id = params.pageId
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPage()
    } else {
      setIsLoading(false)
    }
  }, [id])

  const fetchPage = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from('pages').select('*').eq('id', id).single()
    if (error) {
      toast.error("Error fetching page")
    } else if (data) {
      setFormData(data)
    }
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (id === 'new') {
      const { error } = await supabase.from('pages').insert([formData])
      if (error) toast.error("Error creating page")
      else {
        toast.success("Page created successfully")
        router.push('/admin/pages')
      }
    } else {
      const { error } = await supabase.from('pages').update(formData).eq('id', id)
      if (error) toast.error("Error updating page")
      else {
        toast.success("Page updated successfully")
        router.push('/admin/pages')
      }
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value } as FormData))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-screen-2xl mx-auto p-8">
      {/* Left: Edit Form */}
      <div className="flex-1 space-y-6 lg:max-w-3xl">
        <h1 className="text-2xl font-bold">{id === 'new' ? "Create Page" : "Edit Page"}</h1>
        {id !== 'new' && (
          <div className="text-sm text-gray-500">
            Editing page ID: {id}
          </div>
        )}

        <Accordion type="single" collapsible className="w-full space-y-4">
          {/* Basic Info */}
          <AccordionItem value="basic">
            <AccordionTrigger>Basic Info</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <Input placeholder="Title" value={formData.title || ''} onChange={(e) => handleChange('title', e.target.value)} />
              <Input placeholder="Slug" value={formData.slug || ''} onChange={(e) => handleChange('slug', e.target.value)} />
              <Textarea placeholder="Meta Description" value={formData.meta_description || ''} onChange={(e) => handleChange('meta_description', e.target.value)} />
              <Textarea placeholder="Main Text" value={formData.text || ''} onChange={(e) => handleChange('text', e.target.value)} rows={5} />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_published || false}
                  onChange={(e) => handleChange('is_published', e.target.checked)}
                />
                <span>Published</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Hero Section */}
          <AccordionItem value="hero">
            <AccordionTrigger>Hero Section</AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-4">
              <Input placeholder="Hero Big Black" value={formData.hero_big_black || ''} onChange={(e) => handleChange('hero_big_black', e.target.value)} />
              <Input placeholder="Hero Big Primary" value={formData.hero_big_primary || ''} onChange={(e) => handleChange('hero_big_primary', e.target.value)} />
              <Textarea placeholder="Hero Text" value={formData.hero_text || ''} onChange={(e) => handleChange('hero_text', e.target.value)} />
              <Input placeholder="Hero Primary Button" value={formData.hero_primary_button || ''} onChange={(e) => handleChange('hero_primary_button', e.target.value)} />
              <Input placeholder="Hero Secondary Button" value={formData.hero_secondary_button || ''} onChange={(e) => handleChange('hero_secondary_button', e.target.value)} />
              <Input placeholder="Hero Year" value={formData.hero_year || ''} onChange={(e) => handleChange('hero_year', e.target.value)} />
              <Input placeholder="Hero Year Span" value={formData.hero_year_span || ''} onChange={(e) => handleChange('hero_year_span', e.target.value)} />
              <Input placeholder="Hero 100" value={formData.hero_100 || ''} onChange={(e) => handleChange('hero_100', e.target.value)} />
              <Input placeholder="Hero 100 Span" value={formData.hero_100_span || ''} onChange={(e) => handleChange('hero_100_span', e.target.value)} />
              <Input placeholder="Hero 24" value={formData.hero_24 || ''} onChange={(e) => handleChange('hero_24', e.target.value)} />
              <Input placeholder="Hero 24 Span" value={formData.hero_24_span || ''} onChange={(e) => handleChange('hero_24_span', e.target.value)} />
            </AccordionContent>
          </AccordionItem>

          {/* Body Section */}
          <AccordionItem value="body">
            <AccordionTrigger>Body Section</AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-4">
              <Input placeholder="Body Heading" value={formData.body_heading || ''} onChange={(e) => handleChange('body_heading', e.target.value)} />
              <Input placeholder="Body Sub Heading" value={formData.body_sub_heading || ''} onChange={(e) => handleChange('body_sub_heading', e.target.value)} />
              <Textarea placeholder="Body First Text" value={formData.body_first_text || ''} onChange={(e) => handleChange('body_first_text', e.target.value)} />
              <Textarea placeholder="Body Second Text" value={formData.body_second_text || ''} onChange={(e) => handleChange('body_second_text', e.target.value)} />
              <Input placeholder="Body Heading 2" value={formData.body_heading2 || ''} onChange={(e) => handleChange('body_heading2', e.target.value)} />
              <Input placeholder="Body Sub Heading 2" value={formData.body_sub_heading2 || ''} onChange={(e) => handleChange('body_sub_heading2', e.target.value)} />
              <Input placeholder="Body Heading 3" value={formData.body_heading3 || ''} onChange={(e) => handleChange('body_heading3', e.target.value)} />
              <Input placeholder="Body Sub Heading 3" value={formData.body_sub_heading3 || ''} onChange={(e) => handleChange('body_sub_heading3', e.target.value)} />
              <Input placeholder="Body Heading 4" value={formData.body_heading4 || ''} onChange={(e) => handleChange('body_heading4', e.target.value)} />
              <Input placeholder="Body Sub Heading 4" value={formData.body_sub_heading4 || ''} onChange={(e) => handleChange('body_sub_heading4', e.target.value)} />
            </AccordionContent>
          </AccordionItem>

          {/* Box Features */}
          <AccordionItem value="boxes">
            <AccordionTrigger>Box Features</AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Input
                    placeholder={`Box Head ${i+1}`}
                    value={formData[`box_head${i+1}` as keyof typeof formData] as string || ''}
                    onChange={(e) => handleChange(`box_head${i+1}`, e.target.value)}
                  />
                  <Textarea
                    placeholder={`Box Text ${i+1}`}
                    value={formData[`box_text${i+1}` as keyof typeof formData] as string || ''}
                    onChange={(e) => handleChange(`box_text${i+1}`, e.target.value)}
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Team Section */}
          <AccordionItem value="team">
            <AccordionTrigger>Team Section</AccordionTrigger>
            <AccordionContent className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => {
                const imgField = i === 0 ? 'team_img' : `team_img${i+1}`
                const textField = i === 0 ? 'team_text' : `team_text${i+1}`
                const roleField = i === 0 ? 'team_role' : `team_role${i+1}`
                
                return (
                  <div key={i} className="space-y-2">
                    <Input
                      placeholder={`Team Img ${i+1}`}
                      value={formData[imgField as keyof typeof formData] as string || ''}
                      onChange={(e) => handleChange(imgField, e.target.value)}
                    />
                    <Input
                      placeholder={`Team Text ${i+1}`}
                      value={formData[textField as keyof typeof formData] as string || ''}
                      onChange={(e) => handleChange(textField, e.target.value)}
                    />
                    <Input
                      placeholder={`Team Role ${i+1}`}
                      value={formData[roleField as keyof typeof formData] as string || ''}
                      onChange={(e) => handleChange(roleField, e.target.value)}
                    />
                  </div>
                )
              })}
            </AccordionContent>
          </AccordionItem>

          {/* CTA Section */}
          <AccordionItem value="cta">
            <AccordionTrigger>CTA Section</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <Input placeholder="Section Head" value={formData.section_head || ''} onChange={(e) => handleChange('section_head', e.target.value)} />
              <Textarea placeholder="Section Text" value={formData.section_text || ''} onChange={(e) => handleChange('section_text', e.target.value)} />
              <Input placeholder="Section Primary Btn" value={formData.section_primary_btn || ''} onChange={(e) => handleChange('section_primary_btn', e.target.value)} />
              <Input placeholder="Section Secondary Btn" value={formData.section_secondary_btn || ''} onChange={(e) => handleChange('section_secondary_btn', e.target.value)} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Save Buttons */}
        <div className="flex space-x-4 pt-6">
          <Button variant="outline" onClick={() => router.push('/admin/pages')}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      {/* Right: Preview Sidebar (iPhone 15 Pro Max Prototype) */}
      <EditPhone page={formData} />
    </div>
  )
}