'use client'
import { Button } from '@/components/ui/button'
import { Bus, Users, Headphones, FileText, Shield, Clock, Calculator, TrendingUp } from 'lucide-react'

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
  hp: string[] | null
  fm: string[] | null
}

type FormData = Partial<Page>

export default function ServicePhone({ page }: { page: FormData }) {
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
      </div>
    </div>

    {/* Main Services */}
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading}</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            {page.body_heading}
          </p>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
            {page.body_first_text}
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-1 gap-8">
            {/* Higher Purchase */}
            <div className="bg-white dark:bg-gray-300/5 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-2 hover:border-primary">
              <div className="flex items-center gap-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary dark:bg-primary-light">
                  <Bus className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head}</h3>
              </div>
              <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 mb-4">
                {page.box_text}
              </p>
              <ul className="space-y-2 mb-4">
                {page.hp?.map((item, index) => (
                  <li key={index} className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-300">{page.text}</span>
                <Button className="w-full bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-primary-dark hover:to-primary-dark transform transition duration-300 ease-in-out hover:scale-105">
                  {page.hero_primary_button}
                </Button>
              </div>
            </div>

            {/* Fleet Management */}
            <div className="bg-white dark:bg-gray-300/5 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-2 hover:border-primary">
              <div className="flex items-center gap-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-primary-light">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head2}</h3>
              </div>
              <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 mb-4">
                {page.box_text2}
              </p>
              <ul className="space-y-2 mb-4">
                {page.fm?.map((item, index) => (
                  <li key={index} className="flex items-center gap-x-3">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-gray-600 to-primary-light"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-300">{page.hero_year}</span>
                <Button
                  variant="ghost"
                  className="w-full border-2 border-primary text-primary hover:bg-primary-dark hover:text-gray-200 transform transition duration-300 ease-in-out hover:scale-105"
                >
                  {page.hero_secondary_button}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Process Section */}
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 text-primary dark:text-primary-light">How It Works</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            Simple 4-step process
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-1 gap-y-12">
            <div className="flex flex-col items-center text-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg hover:border-2 hover:border-primary hover:p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <span className="text-lg font-bold text-white">1</span>
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head3}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text3}
              </p>
            </div>
            <div className="flex flex-col items-center text-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg hover:border-2 hover:border-primary hover:p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <span className="text-lg font-bold text-white">2</span>
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head4}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text4}
              </p>
            </div>
            <div className="flex flex-col items-center text-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg hover:border-2 hover:border-primary hover:p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head5}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text5}
              </p>
            </div>
            <div className="flex flex-col items-center text-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg hover:border-2 hover:border-primary hover:p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <span className="text-lg font-bold text-white">4</span>
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head6}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text6}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Features */}
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading3}</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            {page.body_heading3}
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-1 gap-y-12">
            <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg hover:border-2 hover:border-primary hover:p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary mb-4">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head7}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text7}
              </p>
            </div>
            <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg hover:border-2 hover:border-primary hover:p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary mb-4">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head8}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text8}
              </p>
            </div>
            <div className="flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:rounded-lg hover:border-2 hover:border-primary hover:p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary mb-4">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.box_head9}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.box_text9}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Additional Services */}
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 text-primary dark:text-primary-light">{page.body_sub_heading4}</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            {page.body_heading4}
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white dark:bg-gray-300/5 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-2 hover:border-primary">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary mb-4">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.team_role}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.team_text}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-300/5 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-2 hover:border-primary">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary mb-4">
                <Headphones className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.team_role2}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.team_text2}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-300/5 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-2 hover:border-primary">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary mb-4">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300">{page.team_role3}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {page.team_text3}
              </p>
            </div>
          </div>
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
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-blue-100">
            {page.section_text}
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-white hover:to-white hover:text-primary transform transition duration-300 ease-in-out hover:scale-105"
            >
              {page.hero_primary_button}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full border-2 border-white text-gray-200 hover:bg-gray-200 hover:text-primary hover:border-none transform transition duration-300 ease-in-out hover:scale-105"
            >
              {page.hero_secondary_button}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}