'use client'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'

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

interface AccordionPageProps {
  formData: FormData
  handleChange: (field: string, value: string | boolean) => void
}

export default function AccordionHome({ formData, handleChange }: AccordionPageProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {/* Basic Info */}
      <AccordionItem value="basic">
        <AccordionTrigger>Home Basic Info</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <Input placeholder="Title" value={formData.title || ''} onChange={(e) => handleChange('title', e.target.value)} />
          <Input placeholder="Slug" value={formData.slug || ''} onChange={(e) => handleChange('slug', e.target.value)} />
          <Textarea placeholder="Meta Description" value={formData.meta_description || ''} onChange={(e) => handleChange('meta_description', e.target.value)} />
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
        <AccordionContent className="space-y-4 space-x-2">
          <div className='p-2 space-y-2 space-x-2'>
            <Label>Heading</Label>
            <Input placeholder="Hero Big Black" value={formData.hero_big_black || ''} onChange={(e) => handleChange('hero_big_black', e.target.value)} className='w-70' />
            <Input placeholder="Hero Big Primary" value={formData.hero_big_primary || ''} onChange={(e) => handleChange('hero_big_primary', e.target.value)} className='w-30' />
          </div>

          <div className='p-2 space-y-2'>
            <Label>Hero Text</Label>
            <Textarea placeholder="Hero Text" value={formData.hero_text || ''} onChange={(e) => handleChange('hero_text', e.target.value)} />
          </div>

          <div className='p-2 space-y-2 space-x-2'>
            <Label>Buttons</Label>
            <Input placeholder="Hero Primary Button" value={formData.hero_primary_button || ''} onChange={(e) => handleChange('hero_primary_button', e.target.value)} className='w-50' />
            <Input placeholder="Hero Secondary Button" value={formData.hero_secondary_button || ''} onChange={(e) => handleChange('hero_secondary_button', e.target.value)} className='w-30' />
          </div>
          
          <div className='p-2 space-y-2 space-x-2'>
            <Label>Investment Card</Label>
            <Input placeholder="Hero Year" value={formData.text || ''} onChange={(e) => handleChange('text', e.target.value)} />
            <Input placeholder="Hero Year Span" value={formData.body_second_text || ''} onChange={(e) => handleChange('body_second_text', e.target.value)} />
            <Input placeholder="Hero 100" value={formData.team_img || ''} onChange={(e) => handleChange('team_img', e.target.value)} />
          </div>
          <div className='p-2 space-y-2 space-x-2'>
            <Label>Customer Card</Label>
            <Input placeholder="Hero Year" value={formData.team_text || ''} onChange={(e) => handleChange('team_text', e.target.value)} className='w-40' />
            <Input placeholder="Hero 100" value={formData.team_role || ''} onChange={(e) => handleChange('team_role', e.target.value)} className='w-40' />
          </div>
          <div className='p-2 space-y-2 space-x-2'>
            <Label>Metrics Row</Label>
            <Input placeholder="Hero Year" value={formData.hero_year || ''} onChange={(e) => handleChange('hero_year', e.target.value)} className='w-40' />
            <Input placeholder="Hero Year Span" value={formData.hero_year_span || ''} onChange={(e) => handleChange('hero_year_span', e.target.value)} className='w-40' />
            <Input placeholder="Hero 100" value={formData.hero_100 || ''} onChange={(e) => handleChange('hero_100', e.target.value)} className='w-40' />
            <Input placeholder="Hero Year" value={formData.hero_100_span || ''} onChange={(e) => handleChange('hero_100_span', e.target.value)} className='w-40' />
            <Input placeholder="Hero Year Span" value={formData.hero_24 || ''} onChange={(e) => handleChange('hero_24', e.target.value)} className='w-40' />
            <Input placeholder="Hero 100" value={formData.hero_24_span || ''} onChange={(e) => handleChange('hero_24_span', e.target.value)} className='w-40' />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Features Section */}
      <AccordionItem value="body">
        <AccordionTrigger>Features Section</AccordionTrigger>
        <AccordionContent className="grid grid-col gap-4">
          <Input placeholder="Body Sub Heading" value={formData.body_sub_heading || ''} onChange={(e) => handleChange('body_sub_heading', e.target.value)} className='w-40' />
          <Input placeholder="Body Heading" value={formData.body_heading || ''} onChange={(e) => handleChange('body_heading', e.target.value)} className='w-70' />
          <Textarea placeholder="Body First Text" value={formData.body_first_text || ''} onChange={(e) => handleChange('body_first_text', e.target.value)} />
          <Input placeholder="Body Second Text" value={formData.box_head || ''} onChange={(e) => handleChange('box_head', e.target.value)} className='w-40' />
          <Textarea placeholder="Body Heading 2" value={formData.box_text || ''} onChange={(e) => handleChange('box_text', e.target.value)} />
          <Input placeholder="Body Second Text" value={formData.box_head2 || ''} onChange={(e) => handleChange('box_head2', e.target.value)} className='w-40' />
          <Textarea placeholder="Body Heading 2" value={formData.box_text2 || ''} onChange={(e) => handleChange('box_text2', e.target.value)} />
          <Input placeholder="Body Second Text" value={formData.box_head3 || ''} onChange={(e) => handleChange('box_head3', e.target.value)} className='w-40' />
          <Textarea placeholder="Body Heading 2" value={formData.box_text3 || ''} onChange={(e) => handleChange('box_text3', e.target.value)} />
        </AccordionContent>
      </AccordionItem>

      {/* Services Overview */}
      <AccordionItem value="boxes">
        <AccordionTrigger>Services Overview</AccordionTrigger>
        <AccordionContent className="grid grid-col gap-4">
          <Input placeholder="Body Heading" value={formData.body_sub_heading2 || ''} onChange={(e) => handleChange('body_sub_heading2', e.target.value)} className='w-40' />
          <Input placeholder="Body First Text" value={formData.body_heading2 || ''} onChange={(e) => handleChange('body_heading2', e.target.value)} className='w-80' />
          <Input placeholder="Body Second Text" value={formData.box_head4 || ''} onChange={(e) => handleChange('box_head4', e.target.value)} className='w-40' />
          <Textarea placeholder="Body Heading 2" value={formData.box_text4 || ''} onChange={(e) => handleChange('box_text4', e.target.value)} />
          <Input placeholder="Body Second Text" value={formData.section_secondary_btn || ''} onChange={(e) => handleChange('section_secondary_btn', e.target.value)} className='w-40' />
          <Input placeholder="Body Heading 2" value={formData.box_head5 || ''} onChange={(e) => handleChange('box_head5', e.target.value)} className='w-40' />
          <Textarea placeholder="Body Second Text" value={formData.box_text5 || ''} onChange={(e) => handleChange('box_text5', e.target.value)} />
        </AccordionContent>
      </AccordionItem>

      {/* Stats Section */}
      <AccordionItem value="team">
        <AccordionTrigger>Stats Section</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <Input placeholder="Body Heading" value={formData.body_heading3 || ''} onChange={(e) => handleChange('body_heading3', e.target.value)} className='w-80' />
          <Textarea placeholder="Body First Text" value={formData.body_sub_heading3 || ''} onChange={(e) => handleChange('body_sub_heading3', e.target.value)} />
          <div className='space-y-2 space-x-2'>
            <Input placeholder="Body Second Text" value={formData.box_head6 || ''} onChange={(e) => handleChange('box_head6', e.target.value)} className='w-20' />
            <Input placeholder="Body Heading 2" value={formData.box_text6 || ''} onChange={(e) => handleChange('box_text6', e.target.value)} className='w-40' />
            <Input placeholder="Body Second Text" value={formData.box_head7 || ''} onChange={(e) => handleChange('box_head7', e.target.value)} className='w-20' />
            <Input placeholder="Body Heading 2" value={formData.box_text7 || ''} onChange={(e) => handleChange('box_text7', e.target.value)} className='w-40' /> 
            <Input placeholder="Body Second Text" value={formData.box_head8 || ''} onChange={(e) => handleChange('box_head8', e.target.value)} className='w-20' />
            <Input placeholder="Body Heading 2" value={formData.box_text8 || ''} onChange={(e) => handleChange('box_text8', e.target.value)} className='w-40' />  
            <Input placeholder="Body Second Text" value={formData.box_head9 || ''} onChange={(e) => handleChange('box_head9', e.target.value)} className='w-20' />
            <Input placeholder="Body Heading 2" value={formData.box_text9 || ''} onChange={(e) => handleChange('box_text9', e.target.value)} className='w-40' /> 
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* CTA Section */}
      <AccordionItem value="cta">
        <AccordionTrigger>CTA Section</AccordionTrigger>
        <AccordionContent className="space-y-2">
          <div className='p-2 space-y-2'>
            <Label>Heading</Label>
            <Input placeholder="Section Head" value={formData.section_head || ''} onChange={(e) => handleChange('section_head', e.target.value)} />
          </div>
          <div className='p-2 space-y-2'>
            <Label>Main Write-Up</Label>
            <Textarea placeholder="Section Text" value={formData.section_text || ''} onChange={(e) => handleChange('section_text', e.target.value)} />
          </div>
          <div className='p-2 space-y-2 space-x-2'>
            <Label>CTA Buttons</Label>
            <Input placeholder="Section Primary Btn" value={formData.section_primary_btn || ''} onChange={(e) => handleChange('section_primary_btn', e.target.value)} className='w-40' />
            <Input placeholder="Section Secondary Btn" value={formData.section_secondary_btn || ''} onChange={(e) => handleChange('section_secondary_btn', e.target.value)} className='w-40' />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
