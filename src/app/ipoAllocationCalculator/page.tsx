'use client'
import IPOAllocationCalculator from '@/components/ipo-allocation-calculator'

export default function IpoAllocationCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">IPO Allocation Optimizer</h1>
      <IPOAllocationCalculator />
    </main>
  )
}