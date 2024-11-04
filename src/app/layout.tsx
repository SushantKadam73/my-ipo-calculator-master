import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/nav' // Changed from Nav to Navigation

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IPO Calculator & Optimizer',
  description: 'Calculate and optimize your IPO investments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation /> {/* Changed from Nav to Navigation */}
        {children}
      </body>
    </html>
  )
}