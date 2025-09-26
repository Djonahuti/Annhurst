import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Toaster } from 'sonner'


export default function RootLayout({
   children 
}: {
   children: React.ReactNode 
}) { 

  return (
          <>
            <Navbar />
              {children}
              <Footer />
              <Toaster />
          </>
  )
}
