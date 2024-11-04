'use client'
import ReverseIPOCalculator from '@/components/reverse-ipo-calculator'

export default function IpoCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">IPO Calculator</h1>
      <ReverseIPOCalculator />
    </main>
  )
}