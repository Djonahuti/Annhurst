"use client"

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import Link from 'next/link';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabase/client'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

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

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
  service: z.string().optional()
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: "higher-purchase"
    }
  })

  useEffect(() => {
    fetchPage()
  }, [])

  const fetchPage = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'contact')
      .eq('is_published', true)
      .single()

    if (error) {
      console.error('Error fetching page:', error.message)
    } else {
      setPage(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!page) {
    return <div className="p-12 text-center text-red-500">Nothing to see here.</div>
  }

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.from("contact_us").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          subject: data.subject ?? data.service,
          message: data.message,
        }
      ])

      if (error) {
        console.error(error)
        toast.error("Something went wrong. Please try again.")
        return
      }

      toast.success("Message sent successfully! We'll get back to you soon.")
      reset()
    } catch (err) {
      console.error(err)
      toast.error("Unexpected error occurred.")
    }
  }

  return (
    <div className="playfair-display">
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
          <div className='mt-8 flex justify-center'>
            <Link href="/login">
              <Button
                variant="ghost"
                size="lg"
                className="border-2 flex-1 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary-dark dark:hover:bg-primary-light hover:text-gray-200 dark:hover:text-gray-100 transform transition duration-300 ease-in-out hover:scale-105"
              >
                {page.hero_year}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 mb-8">
              {page.body_heading}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">{page.body_first_text}</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input id="name" {...field} className="mt-2" />
                      )}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">{page.box_head9}</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input id="email" type="email" {...field} className="mt-2" />
                      )}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">{page.team_img}</Label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input id="phone" type="tel" {...field} className="mt-2" />
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">{page.team_text}</Label>
                    <Controller
                      name="company"
                      control={control}
                      render={({ field }) => (
                        <Input id="company" type="text" {...field} className="mt-2" />
                      )}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">{page.team_role}</Label>
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-2 w-full">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Services</SelectLabel>
                            <SelectItem
                              value="higher-purchase"
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                            >
                              Bus Higher Purchase
                            </SelectItem>
                            <SelectItem
                              value="fleet-management"
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                            >
                              Fleet Management
                            </SelectItem>
                            <SelectItem
                              value="consulting"
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                            >
                              Business Consulting
                            </SelectItem>
                            <SelectItem
                              value="other"
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                            >
                              Other Services
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="message">{page.team_img2}</Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea id="message" rows={6} {...field} className="mt-2" />
                    )}
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full hover:bg-primary-dark text-gray-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 mb-8">
              {page.body_heading2}
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Phone</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      <a href="tel:+2341234567890" className="hover:text-primary">
                      {page.hero_year_span}
                      </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="tel:+2349876543210" className="hover:text-primary">
                      {page.hero_100}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Email</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      <a href="mailto:info@annhurstglobal.com" className="hover:text-primary">
                      {page.hero_100_span}
                      </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="mailto:sales@annhurstglobal.com" className="hover:text-primary">
                      {page.hero_24_span}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Office Address</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {page.box_text8}<br />
                    {page.box_head8}<br />
                    {page.box_text9}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Business Hours</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {page.box_head6}<br />
                    {page.box_text7}<br />
                    {page.box_head7}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-300/5 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-4">
                {page.box_head5}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                {page.box_text5}
                </p>
                <div className="flex space-x-4">
                  <Button className="flex-1 bg-primary text-gray-200 hover:bg-primary-dark">
                    <Phone className="h-4 w-4 mr-2" />
                    {page.hero_primary_button}
                  </Button>
                  <Button variant="ghost" className="border-2 flex-1 border-primary text-primary hover:bg-primary-dark hover:text-gray-200">
                    <Mail className="h-4 w-4 mr-2" />
                    {page.hero_secondary_button}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading3}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
            {page.body_heading3}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            {page.text}
            </p>
          </div>
          
          {/* Placeholder for map */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="AnnHurst Global Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.389721507043!2d3.437834379081!3d6.4457033684787985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4f9137e9329%3A0xfcc2ef66eb8f604b!2s13B%20Obafemi%20Anibaba%20St%2C%20Island%2C%20Lagos%20105102%2C%20Lagos!5e0!3m2!1sen!2sng!4v1756320380727!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading4}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
            {page.body_heading4}
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-3">
                {page.box_head}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                {page.box_text}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-3">
                {page.box_head2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                {page.box_text2}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-3">
                {page.box_head3}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                {page.box_text3}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-3">
                {page.box_head4}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                {page.box_text4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 