'use client'
import IPOAllocationCalculator from '../components/ipo-allocation-calculator'
import IPOAnalysisTable from '../components/ipo-analysis-table-final'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto">
        <section>
          <h2 className="text-3xl font-bold mb-6">IPO Analysis</h2>
          <IPOAnalysisTable />
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6">IPO Allocation Calculator</h2>
          <IPOAllocationCalculator />
        </section>
      </div>
    </main>
  )
}

