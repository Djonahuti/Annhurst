"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Smile } from "lucide-react"
import Link from 'next/link';
import { Button } from "./ui/button"
import { supabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

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
  body_first_text: string | null
  body_second_text: string | null
  body_heading2: string | null
  body_sub_heading2: string | null
  body_heading3: string | null
  body_sub_heading3: string | null
  body_heading4: string | null
  body_sub_heading4: string | null
  section_text: string | null
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
}

export default function HeroSection() {
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
<section className="relative bg-gradient-to-r from-gray-100 to-red-200 dark:from-gray-400 dark:to-red-300 py-20">
  <div className="container mx-auto px-6 lg:px-12">
    <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
      {/* Text Content */}
      <div className="max-w-2xl flex-1">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          {page.hero_big_black}{" "}
          <span className="text-primary underline decoration-primary dark:text-primary-light dark:decoration-primary-light">
            {page.hero_big_primary}
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-700">
          {page.hero_text}
        </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-3 mt-8">
        <Link href="/services">
          <Button size="lg" className="bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-primary-dark hover:to-primary-dark transform transition duration-300 ease-in-out hover:scale-105">
            {page.hero_primary_button}
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost" size="lg" className="border-2 border-primary text-primary hover:bg-primary-dark hover:text-gray-200 dark:hover:text-gray-200 dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light hover:border-none transform transition duration-300 ease-in-out hover:scale-105">
            {page.hero_secondary_button}
          </Button>
        </Link>
      </div> 
      </div>

      {/* Cards Row */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 justify-center lg:justify-end">
        {/* Investment Success Card */}
        <Card className="w-64 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary dark:text-primary-light" />
              <h3 className="font-semibold">{page.text}</h3>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-primary dark:text-primary-light font-semibold">{page.body_second_text}</span>
              <span className="text-gray-500 dark:text-gray-200">{page.team_img}</span>
            </div>
            <Progress value={80} className="mt-3" />
          </CardContent>
        </Card>

        {/* Customer Satisfaction Card */}
        <Card className="w-64 shadow-md">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Smile className="w-6 h-6 text-primary dark:text-primary-light" />
              <h3 className="font-semibold">{page.team_text}</h3>
              <p className="text-3xl font-bold text-primary dark:text-primary-light">{page.team_role}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Metrics Row */}
    <div className="mt-14 flex gap-12 text-primary dark:text-primary-light font-bold text-2xl">
      <div className="text-center">{page.hero_year}<br />
          <span className="text-gray-600 underline decoration-primary text-xs">
            {page.hero_year_span}
          </span>
      </div>
      <div className="text-center">{page.hero_100} <br/>
          <span className="text-gray-600 underline decoration-primary text-xs">
              {page.hero_100_span}
          </span>
      </div>
      <div className="text-center">{page.hero_24} <br/>
          <span className="text-gray-600 underline decoration-primary text-xs">
              {page.hero_24_span}
          </span>
      </div>     
    </div>
  </div>
</section>

  )
}