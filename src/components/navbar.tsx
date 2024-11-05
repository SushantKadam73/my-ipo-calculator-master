'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">IPO Dalal</Link>
          <div className="hidden md:flex space-x-4">
            {[
              ['IPO Dashboard', '/dashboard'],
              ['GMP Data', '/gmp-data'],
              ['Subscription Data', '/subscription-data'],
              ['Funding Calculator', '/funding-calculator'],
              ['IPO Allocation Optimizer', '/allocation-optimizer'],
              ['Historical Data', '/historical-data'],
              ['About Us', '/about']
            ].map(([title, url]) => (
              <Button key={url} variant="ghost" asChild>
                <Link href={url}>{title}</Link>
              </Button>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {/* Mobile menu items */}
          </div>
        )}
      </div>
    </nav>
  )
}