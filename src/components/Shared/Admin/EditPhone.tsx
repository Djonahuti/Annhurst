'use client'

import AboutPhone from "./AboutPhone"
import ContactPhone from "./ContactPhone"
import HomePhone from "./HomePhone"
import ServicePhone from "./ServicePhone"

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
  hp?: string[] | null
  fm?: string[] | null
}

type FormData = Partial<Page>

export default function EditPhone({ page }: { page: FormData }) {
  const renderPhoneComponent = () => {
    switch (page.slug) {
      case 'home':
        return <HomePhone page={page} />
      case 'services':
        return <ServicePhone page={page} />
      case 'contact':
        return <ContactPhone page={page} />
      case 'about':
        return <AboutPhone page={page} />
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400">
            No preview available for this page
          </div>
        )
    }
  }

  return (
    <div className="w-[430px] sticky top-8 self-start">
      <div className="relative mx-auto w-[430px] h-[932px] bg-black rounded-[60px] shadow-2xl border-4 border-gray-900">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[30px] bg-black rounded-b-[20px] border-b-4 border-gray-900"></div>
        {/* Side Buttons */}
        <div className="absolute right-[-4px] top-[100px] w-[4px] h-[60px] bg-gray-700 rounded-r"></div> {/* Volume */}
        <div className="absolute right-[-4px] top-[180px] w-[4px] h-[60px] bg-gray-700 rounded-r"></div> {/* Volume */}
        <div className="absolute right-[-4px] top-[300px] w-[4px] h-[80px] bg-gray-700 rounded-r"></div> {/* Power */}
        <div className="absolute left-[-4px] top-[150px] w-[4px] h-[40px] bg-gray-700 rounded-l"></div> {/* Action Button */}
        {/* Screen */}
        <div className="absolute inset-[15px] bg-white overflow-hidden rounded-[50px] border border-gray-300">
          {renderPhoneComponent()}
        </div>
      </div>
    </div>
  )
}