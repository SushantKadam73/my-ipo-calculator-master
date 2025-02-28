'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { companies, lastUpdated } from '@/data/ipo-data';

interface Category {
  category: string;
  effectivePrice: number;
  lotSize: number;
  subscriptionRate: number;
  gmp: number;
  discount: number;
  minAppLots: number;
  maxAppLots?: number;
  sharesPerLot: number;
  creditedLots?: number;
}

interface Company {
  name: string;
  categories: Category[];
}

interface UserInput {
  totalCapital: string;
  numAccounts: string;
  selectedCompanies: { [key: string]: boolean };
  companyEligibility: {
    [key: string]: {
      numShareholderAccounts: string;
      numEmployeeAccounts: string;
    };
  };
}

interface AllocationResult {
  company: string;
  category: string;
  applicationAmount: number;
  expectedGainPerRupee: number;
  expectedGain: number;
  lotsApplied: number;
  minLotsExpected: number;
}

interface Results {
  allocations: AllocationResult[];
  remainingCapital: number;
  totalExpectedGain: number;
}

const IPOAllocationCalculator = () => {
  const [userInput, setUserInput] = useState<UserInput>(getInitialUserInput());
  const [results, setResults] = useState<Results | null>(null);
  const [selectedCategories, setSelectedCategories] = useState({
    retail: true,
    shni: true,
    bhni: true,
    shareholder: true,
    employee: true
  });
  const [calculationPreference, setCalculationPreference] = useState('expectedGain');
  const [reuseCapital, setReuseCapital] = useState(false);

  function getInitialUserInput(): UserInput {
    return {
      totalCapital: '',
      numAccounts: '',
      selectedCompanies: Object.fromEntries(companies.map(c => [c.name, false])),
      companyEligibility: Object.fromEntries(
        companies.map(c => [c.name, {
          numShareholderAccounts: '',
          numEmployeeAccounts: ''
        }])
      )
    };
  }

  const handleRefresh = () => {
    setUserInput(getInitialUserInput());
    setResults(null);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const calculateMetrics = (data: Category) => {
    const lotValue = data.effectivePrice * data.lotSize;
    const applicationAmount = data.minAppLots * lotValue;
    const gainPerShare = data.gmp + data.discount;
    const gainPerLot = gainPerShare * data.lotSize;
    
    let creditedLots;
    if (data.category === "Retail" || data.category === "Shareholder" || data.category === "Employee") {
      creditedLots = 1;
    } else if (data.category === "B-HNI") {
      creditedLots = 14;
    } else {
      creditedLots = data.minAppLots;
    }
    
    const gainForCreditedLots = gainPerLot * creditedLots;
    const expectedGain = gainForCreditedLots / data.subscriptionRate;
    const expectedGainPerRupee = expectedGain / applicationAmount;

    return {
      lotValue,
      applicationAmount,
      expectedGainPerRupee,
      expectedGain,
      lotsApplied: data.minAppLots,
      creditedLots
    };
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  const calculateAllocation = (preference?: string) => {
    const capital = parseFloat(userInput.totalCapital);
    const numAccounts = parseInt(userInput.numAccounts);
    
    if (isNaN(capital) || isNaN(numAccounts) || capital <= 0 || numAccounts <= 0) {
      alert('Please enter valid capital and number of accounts');
      return;
    }

    let availableCapital = capital;
    const allocations: AllocationResult[] = [];
    let investmentOptions: AllocationResult[] = [];

    // Generate all possible investment options with their metrics
    companies.forEach(company => {
      company.categories.forEach(category => {
        // Skip employee categories if not eligible
        if (category.category === "Employee") {
          if (!userInput.selectedCompanies[company.name]) {
            return;
          }
        }
        
        // Skip shareholder categories if not eligible
        if (category.category === "Shareholder") {
          if (!userInput.selectedCompanies[company.name]) {
            return;
          }
        }

        const metrics = calculateMetrics(category);
        investmentOptions.push({
          company: company.name,
          category: category.category,
          applicationAmount: metrics.applicationAmount,
          expectedGainPerRupee: metrics.expectedGainPerRupee,
          expectedGain: metrics.expectedGain,
          lotsApplied: metrics.lotsApplied,
          minLotsExpected: metrics.creditedLots
        });
      });
    });

    // Sort options by expected gain per rupee
    investmentOptions.sort((a, b) => b.expectedGainPerRupee - a.expectedGainPerRupee);

    // Track used accounts per company
    const usedAccountsPerCompany: { [key: string]: { regular: number; shareholder: number; employee: number } } = {};
    companies.forEach(company => {
      usedAccountsPerCompany[company.name] = {
        regular: 0,  // for Retail, S-HNI, B-HNI
        shareholder: 0,
        employee: 0
      };
    });

    // Allocate capital based on constraints
    investmentOptions.forEach(option => {
      if (availableCapital >= option.applicationAmount) {
        const company = option.company;
        
        // Check if we can invest in this category
        let canInvest = false;
        
        if (option.category === "Shareholder") {
          // Can invest if eligible and haven't used shareholder quota
          canInvest = (userInput.selectedCompanies[company] && usedAccountsPerCompany[company].shareholder < parseInt(userInput.companyEligibility[company].numShareholderAccounts));
        }
        else if (option.category === "Employee") {
          // Can invest if eligible and haven't used employee quota
          canInvest = (userInput.selectedCompanies[company] && usedAccountsPerCompany[company].employee < parseInt(userInput.companyEligibility[company].numEmployeeAccounts));
        }
        else {
          // For Retail, S-HNI, B-HNI categories
          // Can invest if we have available accounts and haven't used all for this company
          canInvest = usedAccountsPerCompany[company].regular < numAccounts;
        }

        if (canInvest) {
          // Update tracking
          if (option.category === "Shareholder") {
            usedAccountsPerCompany[company].shareholder++;
          }
          else if (option.category === "Employee") {
            usedAccountsPerCompany[company].employee++;
          }
          else {
            usedAccountsPerCompany[company].regular++;
          }

          // Record allocation
          allocations.push(option);
          availableCapital -= option.applicationAmount;
        }
      }
    });

    setResults({
      allocations,
      remainingCapital: availableCapital,
      totalExpectedGain: allocations.reduce((sum, curr) => sum + curr.expectedGain, 0)
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>IPO Capital Allocation Calculator</CardTitle>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Capital and Accounts Input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Total Capital (₹)</label>
              <Input 
                type="number"
                min="0" 
                value={userInput.totalCapital}
                onChange={(e) => setUserInput(prev => ({...prev, totalCapital: e.target.value}))}
                placeholder="Enter total capital"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Accounts</label>
              <Input 
                type="number"
                min="1" 
                value={userInput.numAccounts}
                onChange={(e) => setUserInput(prev => ({...prev, numAccounts: e.target.value}))}
                placeholder="Enter number of accounts"
              />
            </div>
          </div>

          {/* More Customization Options */}
          <div className="space-y-4 border p-4 rounded-md">
            <h3 className="text-lg font-medium">More Customization</h3>
            
            {/* Calculation Preference */}
            <div>
              <label className="block text-sm font-medium mb-2">Calculation Preference:</label>
              <select 
                className="w-full p-2 border rounded"
                value={calculationPreference}
                onChange={(e) => setCalculationPreference(e.target.value)}
              >
                <option value="gmp">Grey Market Premium (GMP)</option>
                <option value="subscription">Subscription Rate</option>
                <option value="capital">Capital Optimization</option>
                <option value="roi">Return on Investment</option>
                <option value="expectedGain">Expected Gain</option>
              </select>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Categories to Apply:</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={selectedCategories.retail}
                    onCheckedChange={(checked) => 
                      setSelectedCategories(prev => ({...prev, retail: checked as boolean}))}
                  />
                  <label>Retail</label>
                </div>
                {/* Add similar checkboxes for other categories */}
              </div>
            </div>

            {/* Capital Reuse Option */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={reuseCapital}
                onCheckedChange={(checked) => setReuseCapital(checked as boolean)}
              />
              <label>Allow capital reuse for upcoming IPOs</label>
            </div>
          </div>

          {/* Company Sections */}
          {companies.map(company => (
            <div key={company.name} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={userInput.selectedCompanies[company.name]}
                  onCheckedChange={(checked) => setUserInput(prev => ({
                    ...prev,
                    selectedCompanies: {
                      ...prev.selectedCompanies,
                      [company.name]: checked as boolean
                    }
                  }))}
                />
                <h3 className="text-lg font-medium">{company.name} Accounts</h3>
              </div>
              {userInput.selectedCompanies[company.name] && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Shareholder Accounts</label>
                    <Input 
                      type="number"
                      min="0"
                      value={userInput.companyEligibility[company.name].numShareholderAccounts}
                      onChange={(e) => setUserInput(prev => ({
                        ...prev,
                        companyEligibility: {
                          ...prev.companyEligibility,
                          [company.name]: {
                            ...prev.companyEligibility[company.name],
                            numShareholderAccounts: e.target.value
                          }
                        }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Employee Accounts</label>
                    <Input 
                      type="number"
                      min="0"
                      value={userInput.companyEligibility[company.name].numEmployeeAccounts}
                      onChange={(e) => setUserInput(prev => ({
                        ...prev,
                        companyEligibility: {
                          ...prev.companyEligibility,
                          [company.name]: {
                            ...prev.companyEligibility[company.name],
                            numEmployeeAccounts: e.target.value
                          }
                        }
                      }))}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Calculate Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => calculateAllocation()} className="w-full">
              Calculate Optimal Allocation
            </Button>
            <Button onClick={() => calculateAllocation()} className="w-full">
              Calculate by {calculationPreference.charAt(0).toUpperCase() + calculationPreference.slice(1)}
            </Button>
          </div>

          {results && (
            <div className="space-y-4 mt-4">
              <Alert>
                <AlertDescription>
                  <div className="font-medium">Summary:</div>
                  <div>Total Expected Gain: {formatCurrency(results.totalExpectedGain)}</div>
                  <div>Remaining Capital: {formatCurrency(results.remainingCapital)}</div>
                </AlertDescription>
              </Alert>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Company</th>
                      <th className="p-2 text-left">Category</th>
                      <th className="p-2 text-right">Lots Applied</th>
                      <th className="p-2 text-right">Min Lots Expected</th>
                      <th className="p-2 text-right">Investment Amount (₹)</th>
                      <th className="p-2 text-right">Cumulative Investment (₹)</th>
                      <th className="p-2 text-right">Expected Gain (₹)</th>
                      <th className="p-2 text-right">Expected Gain/₹</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.allocations.map((allocation, idx) => {
                      const cumulativeInvestment = results.allocations
                        .slice(0, idx + 1)
                        .reduce((sum, curr) => sum + curr.applicationAmount, 0);
                      return (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-2">{allocation.company}</td>
                          <td className="p-2">{allocation.category}</td>
                          <td className="p-2 text-right">{allocation.lotsApplied}</td>
                          <td className="p-2 text-right">{allocation.minLotsExpected}</td>
                          <td className="p-2 text-right">{formatCurrency(allocation.applicationAmount)}</td>
                          <td className="p-2 text-right">{formatCurrency(cumulativeInvestment)}</td>
                          <td className="p-2 text-right">{formatCurrency(allocation.expectedGain)}</td>
                          <td className="p-2 text-right">{allocation.expectedGainPerRupee.toFixed(4)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


export default IPOAllocationCalculator;