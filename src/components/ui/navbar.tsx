import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">IPO Dalal</Link>
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">IPO Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/gmpData">GMP Data</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/subscriptionData">Subscription Data</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/ipoCalculator">IPO Calculator</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/ipoFundingCalculator">Funding Calculator</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/ipoAllocationCalculator">Allocation Optimizer</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/historicalData">Historical Data</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/about">About Us</Link>
            </Button>
          </div>
          <Button variant="outline" className="md:hidden">Menu</Button>
        </div>
      </div>
    </nav>
  )
}