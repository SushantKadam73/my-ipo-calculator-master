'use client'

import { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { format } from 'date-fns'
import { companies, lastUpdated } from '@/data/ipo-data'
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

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)

  // Filter companies based on status
  const ongoingIPOs = companies.filter(c => c.status === 'active').map(c => ({
    name: c.name,
    price: c.priceRange,
    gmp: c.categories[0].gmp,
    subscriptionRate: c.categories[0].subscriptionRate,
    issueSize: `₹${(c.categories[0].effectivePrice * c.categories[0].lotSize * 1000000).toLocaleString('en-IN')} Cr`,
    closeDate: '2024-02-15', // You might want to add these dates to your data model
    boaDate: '2024-02-18',
    listingDate: '2024-02-20',
    status: c.status
  }))

  const pastIPOs = companies.filter(c => c.status === 'closed').map(c => ({
    name: c.name,
    symbol: c.symbol,
    priceRange: c.priceRange,
    issueSize: `₹${(c.categories[0].effectivePrice * c.categories[0].lotSize * 1000000).toLocaleString('en-IN')} Cr`,
    listingDate: '2024-01-15', // Add to data model
    listingPrice: `₹${c.listingPrice}`,
    currentPrice: `₹${c.currentPrice}`
  }))

  const handleRefresh = async () => {
    setIsLoading(true)
    // Add actual data fetching logic here
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">IPO Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Ongoing IPOs */}
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
              {ongoingIPOs.map((ipo) => (
                <TableRow key={ipo.name}>
                  <TableCell className="font-medium">{ipo.name}</TableCell>
                  <TableCell>{ipo.price}</TableCell>
                  <TableCell>{ipo.gmp ? `+${ipo.gmp}` : '-'}</TableCell>
                  <TableCell>{ipo.subscriptionRate ? `${ipo.subscriptionRate}x` : '-'}</TableCell>
                  <TableCell>{ipo.issueSize}</TableCell>
                  <TableCell>{ipo.closeDate}</TableCell>
                  <TableCell>{ipo.boaDate}</TableCell>
                  <TableCell>{ipo.listingDate}</TableCell>
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

      {/* Past IPOs */}
      <Card>
        <CardHeader>
          <CardTitle>Past IPOs</CardTitle>
          <CardDescription>Recently listed IPOs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Issue Size</TableHead>
                <TableHead>Listing Date</TableHead>
                <TableHead>Listing Price</TableHead>
                <TableHead>Current Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastIPOs.map((ipo) => (
                <TableRow key={ipo.name}>
                  <TableCell className="font-medium">{ipo.name}</TableCell>
                  <TableCell>{ipo.symbol}</TableCell>
                  <TableCell>{ipo.priceRange}</TableCell>
                  <TableCell>{ipo.issueSize}</TableCell>
                  <TableCell>{ipo.listingDate}</TableCell>
                  <TableCell>{ipo.listingPrice}</TableCell>
                  <TableCell>{ipo.currentPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}