'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { companies } from '@/data/ipo-data'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface CategoryInput {
  lots: number;
  price: number;
  expectedAllotment: number;
}

interface FundingResult {
  investment: number;
  interest: number;
  totalCost: number;
  sharesApplied: number;
  expectedShares: number;
  breakeven: number;
  expectedGain: number;
  netProfit: number;
  roi: number;
}

export function IPOFundingCalculator() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0].name)
  const [interestRate, setInterestRate] = useState(10)
  const [loanDays, setLoanDays] = useState(7)
  const [categoryInputs, setCategoryInputs] = useState<{ [key: string]: CategoryInput }>({})

  const company = companies.find(c => c.name === selectedCompany) || companies[0]

  useEffect(() => {
    // Reset category inputs when company changes
    const initialInputs: { [key: string]: CategoryInput } = {};
    company.categories.forEach(cat => {
      initialInputs[cat.category] = {
        lots: 0,
        price: cat.effectivePrice,
        expectedAllotment: calculateExpectedAllotment(cat.category, 1)
      };
    });
    setCategoryInputs(initialInputs);
  }, [selectedCompany]);

  const calculateExpectedAllotment = (category: string, lots: number) => {
    const cat = company.categories.find(c => c.category === category);
    if (!cat) return 0;

    // Default credited lots based on category
    let creditedLots = 1; // Default for Retail, Shareholder, Employee
    if (category === 'B-HNI') creditedLots = 14;
    else if (category === 'S-HNI') creditedLots = Math.min(lots, cat.maxAppLots || lots);

    return (creditedLots * cat.lotSize) / cat.subscriptionRate;
  };

  const calculateFundingDetails = (): FundingResult => {
    let totalInvestment = 0;
    let totalSharesApplied = 0;
    let totalExpectedShares = 0;

    // Calculate investment and shares
    Object.entries(categoryInputs).forEach(([category, input]) => {
      if (input.lots > 0) {
        const cat = company.categories.find(c => c.category === category);
        if (cat) {
          totalInvestment += input.lots * cat.lotSize * cat.effectivePrice;
          totalSharesApplied += input.lots * cat.lotSize;
          totalExpectedShares += calculateExpectedAllotment(category, input.lots);
        }
      }
    });

    // Calculate funding costs
    const interest = (totalInvestment * (interestRate / 100) * (loanDays / 365));
    const totalCost = totalInvestment + interest;

    // Calculate expected gains
    const gmp = company.categories[0].gmp; // Using first category's GMP
    const expectedGain = totalExpectedShares * gmp;
    const netProfit = expectedGain - interest;
    const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;

    return {
      investment: totalInvestment,
      interest: interest,
      totalCost: totalCost,
      sharesApplied: totalSharesApplied,
      expectedShares: totalExpectedShares,
      breakeven: totalExpectedShares > 0 ? totalCost / totalExpectedShares : 0,
      expectedGain: expectedGain,
      netProfit: netProfit,
      roi: roi
    };
  };

  const results = calculateFundingDetails();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>IPO Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select IPO</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an IPO" />
              </SelectTrigger>
              <SelectContent>
                {companies.map(company => (
                  <SelectItem key={company.name} value={company.name}>
                    {company.name} ({company.priceRange})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Interest Rate (% p.a.)</Label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div>
              <Label>Loan Period (days)</Label>
              <Input
                type="number"
                value={loanDays}
                onChange={(e) => setLoanDays(Number(e.target.value))}
                min="1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category-wise Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.categories.map(category => (
              <div key={category.category} className="space-y-2">
                <Label>{category.category}</Label>
                <div className="text-sm text-muted-foreground">
                  Lot Size: {category.lotSize} | Price: ₹{category.effectivePrice}
                </div>
                <div className="text-sm text-muted-foreground">
                  Min: {category.minAppLots} | Max: {category.maxAppLots || '∞'} lots
                </div>
                <Input
                  type="number"
                  min={0}
                  max={category.maxAppLots}
                  value={categoryInputs[category.category]?.lots || 0}
                  onChange={(e) => {
                    const lots = Number(e.target.value);
                    setCategoryInputs(prev => ({
                      ...prev,
                      [category.category]: {
                        ...prev[category.category],
                        lots: lots
                      }
                    }));
                  }}
                  placeholder="Number of lots"
                />
                <div className="text-sm text-muted-foreground">
                  Investment: ₹{((categoryInputs[category.category]?.lots || 0) * category.lotSize * category.effectivePrice).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funding Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="font-medium">Investment Details</div>
                  <div>Total Investment: ₹{results.investment.toLocaleString()}</div>
                  <div>Interest Cost: ₹{results.interest.toLocaleString()}</div>
                  <div>Total Cost: ₹{results.totalCost.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-medium">Allotment Details</div>
                  <div>Shares Applied: {results.sharesApplied.toLocaleString()}</div>
                  <div>Expected Shares: {results.expectedShares.toFixed(2)}</div>
                  <div>Breakeven Price: ₹{results.breakeven.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-medium">Profit Analysis</div>
                  <div>Expected Gain: ₹{results.expectedGain.toLocaleString()}</div>
                  <div>Net Profit: ₹{results.netProfit.toLocaleString()}</div>
                  <div>ROI: {results.roi.toFixed(2)}%</div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}