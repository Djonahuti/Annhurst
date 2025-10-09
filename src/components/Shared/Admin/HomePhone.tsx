'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Bus, Users, TrendingUp, Star, Smile, Shield, Clock } from 'lucide-react'

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

export default function HomePhone({ page }: { page: FormData }) {
  return (
    <div className="playfair-display h-full overflow-y-auto bg-white dark:bg-gray-800">
    {/* Hero Section */}
    <section className="relative bg-gradient-to-r from-gray-100 to-red-200 dark:from-gray-400 dark:to-red-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {/* Text Content */}
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {page.hero_big_black}{" "}
              <span className="text-primary underline decoration-primary dark:text-primary-light dark:decoration-primary-light">
                {page.hero_big_primary}
              </span>
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-700">
              {page.hero_text}
            </p>
            <div className="flex flex-col gap-4 mt-6">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-primary-dark hover:to-primary-dark transform transition duration-300 ease-in-out hover:scale-105"
              >
                {page.hero_primary_button}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="w-full border-2 border-primary text-primary hover:bg-primary-dark hover:text-gray-200 dark:hover:text-gray-200 dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light hover:border-none transform transition duration-300 ease-in-out hover:scale-105"
              >
                {page.hero_secondary_button}
              </Button>
            </div>
          </div>

          {/* Cards Row */}
          <div className="flex flex-col gap-6">
            {/* Investment Success Card */}
            <Card className="w-full max-w-sm mx-auto shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary dark:text-primary-light" />
                  <h3 className="text-base font-semibold">{page.text}</h3>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-primary dark:text-primary-light font-semibold">{page.body_second_text}</span>
                  <span className="text-gray-500 dark:text-gray-200">{page.team_img}</span>
                </div>
                <Progress value={80} className="mt-3" />
              </CardContent>
            </Card>

            {/* Customer Satisfaction Card */}
            <Card className="w-full max-w-sm mx-auto shadow-md">
              <CardContent className="p-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Smile className="w-5 h-5 text-primary dark:text-primary-light" />
                  <h3 className="text-base font-semibold">{page.team_text}</h3>
                  <p className="text-2xl font-bold text-primary dark:text-primary-light">{page.team_role}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metrics Row */}
          <div className="mt-8 flex flex-col gap-6 text-primary dark:text-primary-light font-bold text-xl text-center">
            <div>
              {page.hero_year}
              <br />
              <span className="text-gray-600 underline decoration-primary text-xs">
                {page.hero_year_span}
              </span>
            </div>
            <div>
              {page.hero_100}
              <br />
              <span className="text-gray-600 underline decoration-primary text-xs">
                {page.hero_100_span}
              </span>
            </div>
            <div>
              {page.hero_24}
              <br />
              <span className="text-gray-600 underline decoration-primary text-xs">
                {page.hero_24_span}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 text-primary-light">{page.body_sub_heading}</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            {page.body_heading}
          </p>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">{page.body_first_text}</p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <dl className="grid grid-cols-1 gap-y-12">
            <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">
                <Shield className="h-5 w-5 flex-none text-primary dark:text-primary-light" aria-hidden="true" />
                {page.box_head}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                <p className="flex-auto">{page.box_text}</p>
              </dd>
            </div>
            <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">
                <Clock className="h-5 w-5 flex-none text-primary dark:text-primary-light" aria-hidden="true" />
                {page.box_head2}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                <p className="flex-auto">{page.box_text2}</p>
              </dd>
            </div>
            <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:rounded-lg hover:p-4">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">
                <Users className="h-5 w-5 flex-none text-primary dark:text-primary-light" aria-hidden="true" />
                {page.box_head3}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                <p className="flex-auto">{page.box_text3}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    {/* Services Overview */}
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading2}</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            {page.body_heading2}
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-primary">
              <div className="flex items-center gap-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary dark:bg-primary-light">
                  <Bus className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head4}</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text4}
              </p>
              <div className="mt-4">
                <p className="text-primary dark:text-primary-light hover:text-primary-dark font-medium">
                  {page.section_secondary_btn} →
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-primary">
              <div className="flex items-center gap-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary dark:bg-primary-light">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head5}</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text5}
              </p>
              <div className="mt-4">
                <p className="text-primary dark:text-primary-light hover:text-primary-dark font-medium">
                  {page.section_secondary_btn} →
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Stats Section */}
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
              {page.body_heading3}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
              {page.body_sub_heading3}
            </p>
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-4 text-center">
            <div className="flex flex-col bg-gray-400/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg">
              <dt className="text-xs font-semibold leading-6 text-gray-600 dark:text-gray-400">{page.box_text6}</dt>
              <dd className="order-first text-2xl font-bold tracking-tight text-primary dark:text-primary-light">{page.box_head6}</dd>
            </div>
            <div className="flex flex-col bg-gray-400/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg">
              <dt className="text-xs font-semibold leading-6 text-gray-600 dark:text-gray-400">{page.box_text7}</dt>
              <dd className="order-first text-2xl font-bold tracking-tight text-primary dark:text-primary-light">{page.box_head7}</dd>
            </div>
            <div className="flex flex-col bg-gray-400/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg">
              <dt className="text-xs font-semibold leading-6 text-gray-600 dark:text-gray-400">{page.box_text8}</dt>
              <dd className="order-first text-2xl font-bold tracking-tight text-primary dark:text-primary-light">{page.box_head8}</dd>
            </div>
            <div className="flex flex-col bg-gray-400/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg">
              <dt className="text-xs font-semibold leading-6 text-gray-600 dark:text-gray-400">{page.box_text9}</dt>
              <dd className="order-first text-2xl font-bold tracking-tight text-primary dark:text-primary-light">{page.box_head9}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-gradient-to-r from-gray-600 to-primary-light shimmer-effect">
      <div className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {page.section_head}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-red-100">
            {page.section_text}
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-white hover:to-white hover:text-primary transform transition duration-300 ease-in-out hover:scale-105"
            >
              {page.section_primary_btn}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full border-2 border-white text-gray-200 dark:hover:bg-gray-200 dark:hover:text-primary hover:bg-gray-200 hover:text-primary hover:border-none transform transition duration-300 ease-in-out hover:scale-105"
            >
              {page.section_secondary_btn}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}