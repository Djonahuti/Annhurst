"use client"
import { supabase } from '@/lib/supabase/client'
import { Bus, Target, Eye, Users, Award, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Page {
  id: string
  title: string
  slug: string
  is_published: boolean
  text: string | null
  hero_big_black: string | null
  hero_big_primary: string | null
  hero_text: string | null
  body_heading: string | null
  body_first_text: string | null
  body_second_text: string | null
  body_heading2: string | null
  body_sub_heading2: string | null
  body_heading3: string | null
  body_sub_heading3: string | null
  body_heading4: string | null
  body_sub_heading4: string | null
  section_text: string | null
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
}

export default function AboutPage() {
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
      .eq('slug', 'about')
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
    return <div className="p-12 text-center text-red-500">About page not found.</div>
  }

  return (
    <div className='playfair-display'>
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