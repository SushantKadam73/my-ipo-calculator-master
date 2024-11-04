'use client'
import IpoFundingCalculator from '@/components/ipo-funding-calculator'

export default function IpoFundingCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">IPO Funding Calculator</h1>
      <IpoFundingCalculator />
    </main>
  )
}