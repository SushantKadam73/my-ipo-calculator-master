"use client";

import { companies } from '@/data/ipo-data';
import IPOAnalysisTable from '@/components/ipo-analysis-table-final';
import IPOAllocationCalculator from '@/components/ipo-allocation-calculator';

export default function AllocationOptimizer() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">IPO Allocation Optimizer</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">IPO Analysis</h2>
        <IPOAnalysisTable />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">IPO Allocation Calculator</h2>
        <IPOAllocationCalculator />
      </div>
    </div>
  );
}
