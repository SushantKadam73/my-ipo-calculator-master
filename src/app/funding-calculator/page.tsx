'use client'

import { IPOFundingCalculator } from '@/components/ipo-funding-calculator'

export default function FundingCalculatorPage() {  // Changed function name and made it a proper React component
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">IPO Funding Calculator</h1>
      <IPOFundingCalculator />
    </div>
  )
}
