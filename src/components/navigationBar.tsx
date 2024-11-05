'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavigationBar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'IPO Dashboard', href: '/' },
    { label: 'GMP Data', href: '/gmp-data' },
    { label: 'Subscription Data', href: '/subscription-data' },
    { label: 'IPO Calculator', href: '/ipo-calculator' },
    { label: 'Funding Calculator', href: '/funding-calculator' },
    { label: 'Allocation Optimizer', href: '/allocation-optimizer' },
    { label: 'Historical Data', href: '/historical-data' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            IPO Dalal
          </Link>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-gray-300 transition-colors ${
                  pathname === item.href ? 'text-blue-400' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;