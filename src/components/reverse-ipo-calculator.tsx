'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { companies } from '@/data/ipo-data';

interface AccountApplication {
  id: number;
  company: string;
  retailLots: number;
  shniLots: number;
  bhniLots: number;
  shareholderLots: number;
  employeeLots: number;
}

const ReverseIPOCalculator = () => {
  const [applications, setApplications] = useState<AccountApplication[]>([
    { id: 1, company: '', retailLots: 0, shniLots: 0, bhniLots: 0, shareholderLots: 0, employeeLots: 0 }
  ]);
  const [results, setResults] = useState<any>(null);

  const addAccount = () => {
    setApplications([
      ...applications,
      { 
        id: applications.length + 1,
        company: '',
        retailLots: 0,
        shniLots: 0,
        bhniLots: 0,
        shareholderLots: 0,
        employeeLots: 0
      }
    ]);
  };

  const updateApplication = (id: number, field: keyof AccountApplication, value: string | number) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const calculateRequirements = () => {
    let totalCapital = 0;
    let totalExpectedGain = 0;
    let companyWiseBreakdown: any = {};

    applications.forEach(app => {
      if (!app.company) return;

      const company = companies.find(c => c.name === app.company);
      if (!company) return;

      let companyTotal = 0;
      let companyGain = 0;

      // Calculate for each category
      company.categories.forEach(cat => {
        let lots = 0;
        switch (cat.category) {
          case 'Retail': lots = app.retailLots; break;
          case 'S-HNI': lots = app.shniLots; break;
          case 'B-HNI': lots = app.bhniLots; break;
          case 'Shareholder': lots = app.shareholderLots; break;
          case 'Employee': lots = app.employeeLots; break;
        }

        const investment = lots * cat.lotSize * cat.effectivePrice;
        const expectedGain = (lots * cat.lotSize * (cat.gmp + cat.discount)) / cat.subscriptionRate;

        companyTotal += investment;
        companyGain += expectedGain;
      });

      totalCapital += companyTotal;
      totalExpectedGain += companyGain;

      companyWiseBreakdown[app.company] = {
        investment: companyTotal,
        expectedGain: companyGain
      };
    });

    setResults({
      totalCapital,
      totalExpectedGain,
      companyWiseBreakdown
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reverse IPO Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="border p-4 rounded-lg space-y-4">
              <h3>Account {app.id}</h3>
              <select
                className="w-full border rounded p-2"
                value={app.company}
                onChange={(e) => updateApplication(app.id, 'company', e.target.value)}
              >
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={company.name} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Input fields for lots */}
                <div>
                  <label>Retail Lots</label>
                  <Input
                    type="number"
                    min="0"
                    value={app.retailLots}
                    onChange={(e) => updateApplication(app.id, 'retailLots', parseInt(e.target.value))}
                  />
                </div>
                {/* Similar inputs for other categories */}
              </div>
            </div>
          ))}

          <Button onClick={addAccount} variant="outline" className="w-full">
            Add Another Account
          </Button>

          <Button onClick={calculateRequirements} className="w-full">
            Calculate Requirements
          </Button>

          {results && (
            // Display results table here
            <div className="space-y-4 mt-4">
              {/* Add your results display logic */}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReverseIPOCalculator;
