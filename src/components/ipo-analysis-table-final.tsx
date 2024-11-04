import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { companies, lastUpdated } from '@/data/ipo-data';

const IPOAnalysisTable = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  interface CategoryData {
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

  const calculateMetrics = (data: CategoryData) => {
    // Basic lot calculations
    const lotValue = data.effectivePrice * data.lotSize;
    const applicationAmount = data.minAppLots * lotValue;
    
    // Gain calculations
    const gainPerShare = data.gmp + data.discount;
    const gainPerLot = gainPerShare * data.lotSize;
    
    // Credited lots calculation
    let creditedLots;
    if (data.category === "Retail" || data.category === "Shareholder" || data.category === "Employee") {
      creditedLots = 1;
    } else if (data.category === "B-HNI") {
      creditedLots = 14;
    } else {
      creditedLots = data.minAppLots;
    }
    
    // Gain for credited lots
    const gainForCreditedLots = gainPerLot * creditedLots;
    
    // Expected gain calculations
    const expectedGain = gainForCreditedLots / data.subscriptionRate;
    const expectedGainPerRupee = expectedGain / applicationAmount;

    return {
      lotValue: lotValue.toFixed(2),
      applicationAmount: applicationAmount.toFixed(2),
      minAppLots: data.minAppLots,
      maxAppLots: data.maxAppLots || "No limit",
      creditedLots,
      gainPerShare: gainPerShare.toFixed(2),
      gainPerLot: gainPerLot.toFixed(2),
      gainForCreditedLots: gainForCreditedLots.toFixed(2),
      subscriptionRate: data.subscriptionRate.toFixed(2),
      gmp: data.gmp,
      expectedGain: expectedGain.toFixed(2),
      expectedGainPerRupee: expectedGainPerRupee.toFixed(4)
    };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Complete IPO Analysis with Calculation Details</CardTitle>
          <div className="text-sm text-gray-500">
            Last Updated: {lastUpdated}
            <Button variant="outline" size="sm" className="ml-2" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Company</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-right">Price (₹)</th>
                <th className="p-2 text-right">GMP (₹)</th>
                <th className="p-2 text-right">Min Lots (Applied)</th>
                <th className="p-2 text-right">Max Lots</th>
                <th className="p-2 text-right">App. Amount (₹) [Price × Lot Size × Min Lots]</th>
                <th className="p-2 text-right">Credited Lots</th>
                <th className="p-2 text-right">Gain/Share (₹) [GMP + Discount]</th>
                <th className="p-2 text-right">Gain/Lot (₹) [Gain/Share × Lot Size]</th>
                <th className="p-2 text-right">Gain for Credited Lots (₹) [Gain/Lot × Credited Lots]</th>
                <th className="p-2 text-right">Sub. Rate</th>
                <th className="p-2 text-right">Exp. Gain (₹) [Gain for Credited Lots ÷ Sub Rate]</th>
                <th className="p-2 text-right">Exp. Gain/₹ [Exp. Gain ÷ App. Amount]</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                company.categories.map((category, idx) => {
                  const metrics = calculateMetrics(category);
                  return (
                    <tr key={`${company.name}-${category.category}`} 
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-2">{company.name}</td>
                      <td className="p-2">{category.category}</td>
                      <td className="p-2 text-right">{category.effectivePrice}</td>
                      <td className="p-2 text-right">{metrics.gmp}</td>
                      <td className="p-2 text-right">{metrics.minAppLots}</td>
                      <td className="p-2 text-right">{metrics.maxAppLots}</td>
                      <td className="p-2 text-right">{metrics.applicationAmount}</td>
                      <td className="p-2 text-right">{metrics.creditedLots}</td>
                      <td className="p-2 text-right">{metrics.gainPerShare}</td>
                      <td className="p-2 text-right">{metrics.gainPerLot}</td>
                      <td className="p-2 text-right">{metrics.gainForCreditedLots}</td>
                      <td className="p-2 text-right">{metrics.subscriptionRate}x</td>
                      <td className="p-2 text-right">{metrics.expectedGain}</td>
                      <td className="p-2 text-right">{metrics.expectedGainPerRupee}</td>
                    </tr>
                  );
                })
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOAnalysisTable;
