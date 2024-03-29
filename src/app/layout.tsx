import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Emotico',
  description: 'I can change metadata in root layout.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <section className='border-2'>
          <NavBar></NavBar>
        </section>

        <section className="relative xl:pl-20 xl:pr-20 pl-10 pr-10">
          {children}
        </section>
        
        <section>
          <Footer></Footer>
        </section>
      </body>
    </html>
  )
}
