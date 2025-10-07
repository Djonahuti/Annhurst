'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

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

export default function ContactPhone({ page }: { page: FormData }) {
  return (
    <div className="playfair-display h-full overflow-y-auto bg-white dark:bg-gray-800">
    {/* Hero Section */}
    <div className="relative bg-gradient-to-r from-gray-100 to-red-200 dark:from-gray-400 dark:to-red-300">
      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {page.hero_big_black} <span className="text-primary dark:text-primary-light">{page.hero_big_primary}</span>
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-700 max-w-3xl mx-auto">
            {page.hero_text}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            size="lg"
            className="w-full border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary-dark dark:hover:bg-primary-light hover:text-gray-200 dark:hover:text-gray-100 transform transition duration-300 ease-in-out hover:scale-105"
          >
            {page.hero_year}
          </Button>
        </div>
      </div>
    </div>

    {/* Contact Form & Info */}
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 mb-6">
              {page.body_heading}
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="name">{page.body_first_text}</Label>
                  <Input id="name" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">{page.box_head9}</Label>
                  <Input id="email" className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="phone">{page.team_img}</Label>
                  <Input id="phone" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="company">{page.team_text}</Label>
                  <Input id="company" className="mt-2" />
                </div>
              </div>

              <div>
                <Label htmlFor="service">{page.team_role}</Label>
                <Input id="service" className="mt-2" placeholder="Bus Higher Purchase" />
              </div>

              <div>
                <Label htmlFor="message">{page.team_img2}</Label>
                <Textarea id="message" rows={6} className="mt-2" />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full hover:bg-primary-dark text-gray-200"
              >
                Send Message
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 mb-6">
              {page.body_heading2}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300">Phone</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <a href="tel:+2341234567890" className="hover:text-primary">
                      {page.hero_year_span}
                    </a>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <a href="tel:+2349876543210" className="hover:text-primary">
                      {page.hero_100}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300">Email</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <a href="mailto:info@annhurstglobal.com" className="hover:text-primary">
                      {page.hero_100_span}
                    </a>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <a href="mailto:sales@annhurstglobal.com" className="hover:text-primary">
                      {page.hero_24_span}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300">Office Address</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {page.box_text8}
                    <br />
                    {page.box_head8}
                    <br />
                    {page.box_text9}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300">Business Hours</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {page.box_head6}
                    <br />
                    {page.box_text7}
                    <br />
                    {page.box_head7}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-300/5 rounded-2xl">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-4">
                {page.box_head5}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {page.box_text5}
              </p>
              <div className="flex flex-col gap-4">
                <Button className="w-full bg-primary text-gray-200 hover:bg-primary-dark">
                  <Phone className="h-4 w-4 mr-2" />
                  {page.hero_primary_button}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full border-2 border-primary text-primary hover:bg-primary-dark hover:text-gray-200"
                >
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
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-sm font-semibold leading-7 text-primary dark:text-primary-light">Find Us</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            {page.body_heading3}
          </p>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
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
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-sm font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading4}</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            {page.body_heading4}
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-3">
                {page.box_head}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {page.box_text}
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-3">
                {page.box_head2}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {page.box_text2}
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-3">
                {page.box_head3}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {page.box_text3}
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-3">
                {page.box_head4}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
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