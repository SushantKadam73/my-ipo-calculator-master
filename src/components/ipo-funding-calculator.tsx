'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { companies } from '@/data/ipo-data'

const IpoFundingCalculator = () => {
  const [selectedIPO, setSelectedIPO] = useState<string>('Custom')
  const [ipoDetails, setIpoDetails] = useState({
    price: 0,
    gmp: 0,
    lotSize: 0,
    shareholderDiscount: 0,
    employeeDiscount: 0,
    subscriptionRates: {
      BHNI: 0,
      SHNI: 0,
      Retail: 0,
      Shareholder: 0,
      Employee: 0
    }
  })
  const [interestRate, setInterestRate] = useState(10)
  const [loanDays, setLoanDays] = useState(7)
  const [lots, setLots] = useState({
    BHNI: 0,
    SHNI: 0,
    Retail: 0,
    Shareholder: 0,
    Employee: 0
  })
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    if (selectedIPO !== 'Custom') {
      const selected = companies.find(ipo => ipo.name === selectedIPO)
      if (selected) {
        const category = selected.categories[0];
        setIpoDetails({
          price: category.effectivePrice,
          gmp: category.gmp,
          lotSize: category.lotSize,
          shareholderDiscount: category.discount,
          employeeDiscount: category.discount,
          subscriptionRates: {
            BHNI: category.subscriptionRate,
            SHNI: category.subscriptionRate,
            Retail: category.subscriptionRate,
            Shareholder: category.subscriptionRate,
            Employee: category.subscriptionRate
          }
        })
      }
    }
  }, [selectedIPO])

  const calculateFunding = () => {
    // Implement your funding calculation logic here
    // Use the data from companies array
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>IPO Funding Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Select IPO</Label>
          <Select value={selectedIPO} onValueChange={setSelectedIPO}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose an IPO" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Custom">Custom</SelectItem>
              {companies.map((ipo) => (
                <SelectItem key={ipo.name} value={ipo.name}>{ipo.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Add your funding calculator form fields here */}
        
        <Button onClick={calculateFunding} className="w-full">
          Calculate Funding Requirements
        </Button>

        {results && (
          <div className="space-y-4">
            {/* Add your results display here */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IpoFundingCalculator;