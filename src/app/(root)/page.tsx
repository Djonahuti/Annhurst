'use client'
import Link from 'next/link';
import { Bus, Shield, Clock, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HeroSection from '@/components/HeroSection'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface Page {
  id: string
  title: string
  slug: string
  is_published: boolean
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
  section_secondary_btn: string | null
  team_img: string | null
  team_text: string | null
  team_role: string | null
  team_text2: string | null
  team_role2: string | null
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
  section_head: string | null
  section_primary_btn: string | null
}

export default function HomePage() {
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPage()
  }, [])

  const fetchPage = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'home')
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

  return (
    <div className="playfair-display">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-light">{page.body_sub_heading}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
              {page.body_heading}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">{page.body_first_text}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">
                  <Shield className="h-5 w-5 flex-none text-primary dark:text-primary-light" aria-hidden="true" />
                  {page.box_head}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">
                    {page.box_text}
                  </p>
                </dd>
              </div>
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">
                  <Clock className="h-5 w-5 flex-none text-primary dark:text-primary-light" aria-hidden="true" />
                  {page.box_head2}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">
                    {page.box_text2}
                  </p>
                </dd>
              </div>
              <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">
                  <Users className="h-5 w-5 flex-none text-primary dark:text-primary-light" aria-hidden="true" />
                  {page.box_head3}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">
                    {page.box_text3}
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading2}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
              {page.body_heading2}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-primary">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary dark:bg-primary-light">
                    <Bus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head4}</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {page.box_text4}
                </p>
                <div className="mt-6">
                  <Link href="/services" className="text-primary dark:text-primary-light hover:text-primary-dark font-medium">
                    {page.section_secondary_btn} →
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-primary">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary dark:bg-primary-light">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head5}</h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {page.box_text5}
                </p>
                <div className="mt-6">
                  <Link href="/services" className="text-primary dark:text-primary-light hover:text-primary-dark font-medium">
                    {page.section_secondary_btn} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
                {page.body_heading3}
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                {page.body_sub_heading3}
              </p>
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

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-600 to-primary-light shimmer-effect">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {page.section_head}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
              {page.section_text}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-white hover:to-white hover:text-primary transform transition duration-300 ease-in-out hover:scale-105">
                  {page.section_primary_btn}
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" size="lg" className="border-2 border-white text-gray-200 dark:hover:bg-gray-200 dark:hover:text-primary hover:bg-gray-200 hover:text-primary hover:border-none transform transition duration-300 ease-in-out hover:scale-105">
                  {page.section_secondary_btn}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 