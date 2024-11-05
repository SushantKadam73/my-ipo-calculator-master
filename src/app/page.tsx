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

interface IPO {
  name: string
  symbol?: string
  price: string
  priceRange?: string
  gmp?: number
  subscriptionRate?: number
  issueSize: string
  openDate?: string
  closeDate?: string
  boaDate?: string
  listingDate: string
  listingPrice?: string
  currentPrice?: string
  status?: 'active' | 'closed'
}

export default function Component() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - replace with actual API calls
  const ongoingIPOs: IPO[] = [
    {
      name: 'Tech Innovators Inc.',
      price: '450-500',
      gmp: 50,
      subscriptionRate: 3.5,
      issueSize: '₹1,000 Cr',
      closeDate: '2024-02-15',
      boaDate: '2024-02-18',
      listingDate: '2024-02-20',
      status: 'active',
    },
  ]

  const upcomingIPOs: IPO[] = [
    {
      name: 'Green Energy Solutions',
      price: '300-350',
      gmp: 30,
      issueSize: '₹800 Cr',
      openDate: '2024-02-20',
      closeDate: '2024-02-22',
      boaDate: '2024-02-25',
      listingDate: '2024-02-28',
    },
  ]

  const pastIPOs: IPO[] = [
    {
      name: 'Digital Payments Ltd',
      price: '280',
      symbol: 'DIGIPAY',
      priceRange: '250-280',
      issueSize: '₹600 Cr',
      listingDate: '2024-01-15',
      listingPrice: '₹310',
      currentPrice: '₹325',
    },
  ]

  const handleRefresh = async () => {
    setIsLoading(true)
    // Add actual data fetching logic here
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">IPO Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Last updated: {format(lastUpdated, 'MMM d, yyyy HH:mm:ss')}
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

      <Card>
        <CardHeader>
          <CardTitle>Upcoming IPOs</CardTitle>
          <CardDescription>IPOs opening for subscription soon</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>GMP</TableHead>
                <TableHead>Issue Size</TableHead>
                <TableHead>Open Date</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead>BoA Date</TableHead>
                <TableHead>Listing Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingIPOs.map((ipo) => (
                <TableRow key={ipo.name}>
                  <TableCell className="font-medium">{ipo.name}</TableCell>
                  <TableCell>₹{ipo.price}</TableCell>
                  <TableCell>{ipo.gmp ? `+${ipo.gmp}` : '-'}</TableCell>
                  <TableCell>{ipo.issueSize}</TableCell>
                  <TableCell>{format(new Date(ipo.openDate!), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(ipo.closeDate!), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(ipo.boaDate!), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(ipo.listingDate), 'MMM d, yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                  <TableCell>₹{ipo.priceRange}</TableCell>
                  <TableCell>{ipo.issueSize}</TableCell>
                  <TableCell>{format(new Date(ipo.listingDate), 'MMM d, yyyy')}</TableCell>
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