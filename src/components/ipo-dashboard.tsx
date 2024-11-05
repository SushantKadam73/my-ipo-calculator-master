'use client'

import { useState, useEffect } from 'react'
import { RefreshCcw } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { dashboardData, lastUpdated as initialLastUpdated } from '@/data/ipo-data'

// Verify the data is imported correctly
console.log('Imported dashboardData:', dashboardData);

export function IpoDashboard({ lastUpdated, onRefresh }: { lastUpdated: Date | null, onRefresh: () => void }) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Last updated: {lastUpdated ? format(lastUpdated, 'MMM d, yyyy HH:mm:ss') : 'Never'}
      </p>
      <Button
        variant="outline"
        onClick={onRefresh}
      >
        Refresh
      </Button>
    </div>
  );
}

export default function IPODashboard() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date(initialLastUpdated))
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">IPO Dashboard</h1>
        <IpoDashboard lastUpdated={lastUpdated} onRefresh={handleRefresh} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ongoing IPOs</CardTitle>
          <CardDescription>Currently active IPO subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>GMP</TableHead>
                <TableHead>Subscription Rate</TableHead>
                <TableHead>Issue Size</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead>BoA Date</TableHead>
                <TableHead>Listing Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardData.ongoingIPOs.map((ipo) => (
                <TableRow key={ipo.name}>
                  <TableCell className="font-medium">{ipo.name}</TableCell>
                  <TableCell>₹{ipo.price}</TableCell>
                  <TableCell>{ipo.gmp ? `+${ipo.gmp}` : '-'}</TableCell>
                  <TableCell>
                    {ipo.subscriptionRate ? `${ipo.subscriptionRate}x` : '-'}
                  </TableCell>
                  <TableCell>{ipo.issueSize}</TableCell>
                  <TableCell>{format(new Date(ipo.closeDate!), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(ipo.boaDate!), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(ipo.listingDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={ipo.status === 'active' ? 'default' : 'secondary'}>
                      {ipo.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Similar cards for Upcoming and Past IPOs */}
      {/* ... Rest of the component code remains the same as the example ... */}
    </div>
  )
}