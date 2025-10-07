'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import { Bus, Target, Eye, Users, Award, Globe } from 'lucide-react'

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

function AboutPreview({ page }: { page: FormData }) {
  // Render the AboutPage content using the provided page data
  return (
    <div className='playfair-display h-full overflow-y-auto bg-white dark:bg-gray-800'>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-100 to-red-200 dark:from-gray-400 dark:to-red-300">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {page.hero_big_black} <span className='text-primary dark:text-primary-light'>{page.hero_big_primary}</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-700 max-w-3xl mx-auto">
              {page.hero_text}
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-primary-light sm:text-4xl">
                  {page.body_heading}
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">{page.body_first_text}</p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">{page.body_second_text}</p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gray-900/5 dark:bg-gray-300/5 object-cover">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-text-primary/20 to-blue-800/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bus className="w-32 h-32 text-primary dark:text-primary-light" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading2}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
              {page.body_heading2}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:p-4 hover:rounded-lg hover:bg-white dark:hover:bg-gray-300/5">
                <div className="flex items-center gap-x-3 mb-4">
                  <Target className="h-8 w-8 text-primary dark:text-primary-light" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">{page.box_head}</h3>
                </div>
                <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
                  {page.box_text}
                </p>
              </div>
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:p-4 hover:rounded-lg hover:bg-white dark:hover:bg-gray-300/5">
                <div className="flex items-center gap-x-3 mb-4">
                  <Eye className="h-8 w-8 text-primary dark:text-primary-light" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">{page.box_head2}</h3>
                </div>
                <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
                  {page.box_text2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading3}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
              {page.body_heading3}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:p-4 hover:rounded-lg hover:bg-white dark:hover:bg-gray-300/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-text-primary mb-4">
                  <Users className="h-6 w-6 text-primary dark:text-primary-light" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head3}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {page.box_text3}
                </p>
              </div>
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:p-4 hover:rounded-lg hover:bg-white dark:hover:bg-gray-300/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-text-primary mb-4">
                  <Award className="h-6 w-6 text-primary dark:text-primary-light" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head4}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {page.box_text4}
                </p>
              </div>
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:p-4 hover:rounded-lg hover:bg-white dark:hover:bg-gray-300/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-text-primary mb-4">
                  <Globe className="h-6 w-6 text-primary dark:text-primary-light" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head5}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {page.box_text5}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading4}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
              {page.body_heading4}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {page.section_text}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">{page.team_role}</h3>
                <p className="text-gray-600 dark:text-gray-400">{page.team_text}</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">{page.team_role2}</h3>
                <p className="text-gray-600 dark:text-gray-400">{page.team_text2}</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">{page.team_role3}</h3>
                <p className="text-gray-600 dark:text-gray-400">{page.team_text3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
                {page.text}
              </h2>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-gray-400/5 p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">{page.box_text6}</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary dark:text-primary-light">{page.box_head6}</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">{page.box_text7}</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary dark:text-primary-light">{page.box_head7}</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">{page.box_text8}</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary dark:text-primary-light">{page.box_head8}</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">{page.box_text9}</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-primary dark:text-primary-light">{page.box_head9}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

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
      <div className="hidden lg:block w-[430px] sticky top-8 self-start">
        <div className="relative mx-auto w-[430px] h-[932px] bg-black rounded-[60px] shadow-2xl border-4 border-gray-900">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[30px] bg-black rounded-b-[20px] border-b-4 border-gray-900"></div>
          {/* Side Buttons (optional simulation) */}
          <div className="absolute right-[-4px] top-[100px] w-[4px] h-[60px] bg-gray-700 rounded-r"></div> {/* Volume */}
          <div className="absolute right-[-4px] top-[180px] w-[4px] h-[60px] bg-gray-700 rounded-r"></div> {/* Volume */}
          <div className="absolute right-[-4px] top-[300px] w-[4px] h-[80px] bg-gray-700 rounded-r"></div> {/* Power */}
          <div className="absolute left-[-4px] top-[150px] w-[4px] h-[40px] bg-gray-700 rounded-l"></div> {/* Action Button */}
          {/* Screen */}
          <div className="absolute inset-[15px] bg-white overflow-hidden rounded-[50px] border border-gray-300">
            <AboutPreview page={formData} />
          </div>
        </div>
      </div>
    </div>
  )
}