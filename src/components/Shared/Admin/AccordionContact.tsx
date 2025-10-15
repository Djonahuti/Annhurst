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

export default function AccordionContact({ formData, handleChange }: AccordionPageProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {/* Basic Info */}
      <AccordionItem value="basic">
        <AccordionTrigger>Contact Basic Info</AccordionTrigger>
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
        <AccordionContent className="grid grid-col gap-4">
          <div className='p-2 space-y-2'>
            <Label>Header</Label>
            <div className='flex justify-between space-x-2'>
              <Input placeholder="Hero Big Black" value={formData.hero_big_black || ''} onChange={(e) => handleChange('hero_big_black', e.target.value)} />
              <Input placeholder="Hero Big Primary" value={formData.hero_big_primary || ''} onChange={(e) => handleChange('hero_big_primary', e.target.value)} className='w-20' />
            </div>
          </div>
          
          <div className='p-2 space-y-2'>
            <Label>Main Write-Up</Label>
            <Textarea placeholder="Hero Text" value={formData.hero_text || ''} onChange={(e) => handleChange('hero_text', e.target.value)} />
          </div>
          
          <div className='flex justify-between space-x-2 p-2'>
            <Label>Button: </Label>
            <Input placeholder="Hero Year" value={formData.hero_year || ''} onChange={(e) => handleChange('hero_year', e.target.value)} className='w-40' />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Contact Form & Info Section */}
      <AccordionItem value="body">
        <AccordionTrigger>Contact Form & Info</AccordionTrigger>
        <AccordionContent className="grid grid-col gap-4">
          <div className='p-2 space-y-2'>
            <Label>Header</Label>
            <Input placeholder="Body Heading" value={formData.body_heading || ''} onChange={(e) => handleChange('body_heading', e.target.value)} />
          </div>       

          <div className='p-2 space-y-2'>
            <Label>Form Informations</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Body First Text" value={formData.body_first_text || ''} onChange={(e) => handleChange('body_first_text', e.target.value)} />
              <Input placeholder="Body Second Text" value={formData.box_head9 || ''} onChange={(e) => handleChange('box_head9', e.target.value)} />
              <Input placeholder="Body Heading 2" value={formData.team_img || ''} onChange={(e) => handleChange('team_img', e.target.value)} />
              <Input placeholder="Body Sub Heading 2" value={formData.team_text || ''} onChange={(e) => handleChange('team_text', e.target.value)} />
              <Input placeholder="Body Heading 3" value={formData.team_role || ''} onChange={(e) => handleChange('team_role', e.target.value)} />
              <Input placeholder="Body Sub Heading 3" value={formData.team_img2 || ''} onChange={(e) => handleChange('team_img2', e.target.value)} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Contact Informations */}
      <AccordionItem value="boxes">
        <AccordionTrigger>Contact Information</AccordionTrigger>
        <AccordionContent className="grid grid-col gap-4">
          <div className='p-2 space-y-2'>
            <Label>Header</Label>
            <Input placeholder="Body Heading" value={formData.body_heading2 || ''} onChange={(e) => handleChange('body_heading2', e.target.value)} />
          </div>
          <div className='p-2 space-y-2'>
            <Label>Phones</Label>
            <Input placeholder="Body First Text" value={formData.hero_year_span || ''} onChange={(e) => handleChange('hero_year_span', e.target.value)} />
            <Input placeholder="Body Second Text" value={formData.hero_100 || ''} onChange={(e) => handleChange('hero_100', e.target.value)} />
          </div>
          <div className='p-2 space-y-2'>
            <Label>Emails</Label>
            <Input placeholder="Body Heading 2" value={formData.hero_100_span || ''} onChange={(e) => handleChange('hero_100_span', e.target.value)} />
            <Input placeholder="Body Sub Heading 2" value={formData.hero_24_span || ''} onChange={(e) => handleChange('hero_24_span', e.target.value)} />
          </div>
          <div className='p-2 space-y-2'>
            <Label>Office Address</Label>
            <Input placeholder="Body Heading 3" value={formData.box_text8 || ''} onChange={(e) => handleChange('box_text8', e.target.value)} />
            <Input placeholder="Body Sub Heading 3" value={formData.box_head8 || ''} onChange={(e) => handleChange('box_head8', e.target.value)} />
            <Input placeholder="Body Sub Heading 3" value={formData.box_text9 || ''} onChange={(e) => handleChange('box_text9', e.target.value)} />
          </div>
          <div className='p-2 space-y-2'>
            <Label>Business Hours</Label>
            <Input placeholder="Body Heading 3" value={formData.box_head6 || ''} onChange={(e) => handleChange('box_head6', e.target.value)} />
            <Input placeholder="Body Sub Heading 3" value={formData.box_text7 || ''} onChange={(e) => handleChange('box_text7', e.target.value)} />
            <Input placeholder="Body Sub Heading 3" value={formData.box_head7 || ''} onChange={(e) => handleChange('box_head7', e.target.value)} />
          </div>

          <div className='p-2 space-y-2'>
            <Label>Call to Action</Label>
            <Input placeholder="Body Sub Heading 3" value={formData.box_head5 || ''} onChange={(e) => handleChange('box_head5', e.target.value)} />
            <Textarea placeholder="Body Heading 3" value={formData.box_text5 || ''} onChange={(e) => handleChange('box_text5', e.target.value)} />
          </div> 

          <div className='p-2 space-y-2'>
            <Label>Button Section</Label>
            <Input placeholder="Body Sub Heading 3" value={formData.hero_primary_button || ''} onChange={(e) => handleChange('hero_primary_button', e.target.value)} />
            <Input placeholder="Body Sub Heading 3" value={formData.hero_secondary_button || ''} onChange={(e) => handleChange('hero_secondary_button', e.target.value)} />
          </div>

        </AccordionContent>
      </AccordionItem>

      {/* Map Section */}
      <AccordionItem value="team">
        <AccordionTrigger>Map Section</AccordionTrigger>
        <AccordionContent className="grid grid-col gap-4">
            <Input placeholder="Body Heading" value={formData.body_sub_heading3 || ''} onChange={(e) => handleChange('body_sub_heading3', e.target.value)} />
            <Input placeholder="Body Heading" value={formData.body_heading3 || ''} onChange={(e) => handleChange('body_heading3', e.target.value)} />
            <Textarea placeholder="Body First Text" value={formData.text || ''} onChange={(e) => handleChange('text', e.target.value)} />            
        </AccordionContent>
      </AccordionItem>

      {/* FAQ Section */}
      <AccordionItem value="cta">
        <AccordionTrigger>FAQ Section</AccordionTrigger>
        <AccordionContent className="grid grid-col gap-4">
          <div className='p-2 space-y-2'>
            <Label>Header</Label>
            <Input placeholder="Body Sub Heading 3" value={formData.body_sub_heading4 || ''} onChange={(e) => handleChange('body_sub_heading4', e.target.value)} />
            <Input placeholder="Body Heading 3" value={formData.body_heading4 || ''} onChange={(e) => handleChange('body_heading4', e.target.value)} />
          </div>

          <div className='p-2 space-y-2'>
            <Label>Question: </Label><Input placeholder="Body Sub Heading 3" value={formData.box_head || ''} onChange={(e) => handleChange('box_head', e.target.value)} />
            <Label>Anwser: </Label><Textarea placeholder="Body Sub Heading 3" value={formData.box_text || ''} onChange={(e) => handleChange('box_text', e.target.value)} />
          </div>

          <div className='p-2 space-y-2'>
            <Label>Question: </Label><Input placeholder="Body Second Text" value={formData.box_head2 || ''} onChange={(e) => handleChange('box_head2', e.target.value)} />
            <Label>Anwser: </Label><Textarea placeholder="Body Heading 2" value={formData.box_text2 || ''} onChange={(e) => handleChange('box_text2', e.target.value)} />
          </div>

          <div className='p-2 space-y-2'>
            <Label>Question: </Label><Input placeholder="Body Sub Heading 3" value={formData.box_head3 || ''} onChange={(e) => handleChange('box_head', e.target.value)} />
            <Label>Anwser: </Label><Textarea placeholder="Body Sub Heading 3" value={formData.box_text3 || ''} onChange={(e) => handleChange('box_text', e.target.value)} />
          </div>

          <div className='p-2 space-y-2'>
            <Label>Question: </Label><Input placeholder="Body Sub Heading 3" value={formData.box_head4 || ''} onChange={(e) => handleChange('box_head', e.target.value)} />
            <Label>Anwser: </Label><Textarea placeholder="Body Sub Heading 3" value={formData.box_text4 || ''} onChange={(e) => handleChange('box_text', e.target.value)} />
          </div>
        </AccordionContent>
      </AccordionItem>      
    </Accordion>
  )
}
