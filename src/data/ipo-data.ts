export const lastUpdated = "2024-01-08 10:00 AM IST";

export interface Category {
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

export interface Company {
  name: string;
  categories: Category[];
}

export const companies: Company[] = [
  {
    name: "Western Carriers (India)",
    categories: [
      {
        category: "Retail",
        effectivePrice: 172,
        lotSize: 87,
        subscriptionRate: 26.92,
        gmp: 16,
        discount: 0,
        minAppLots: 1,
        maxAppLots: 13,
        sharesPerLot: 87
      },
      {
        category: "Shareholder",
        effectivePrice: 170,
        lotSize: 87,
        subscriptionRate: 3,
        gmp: 16,
        discount: 2,
        minAppLots: 1,
        maxAppLots: 13,
        sharesPerLot: 87
      },
      {
        category: "Employee",
        effectivePrice: 167,
        lotSize: 87,
        subscriptionRate: 2,
        gmp: 16,
        discount: 5,
        minAppLots: 1,
        maxAppLots: 13,
        sharesPerLot: 87
      },
      {
        category: "S-HNI",
        effectivePrice: 172,
        lotSize: 87,
        subscriptionRate: 56.73,
        gmp: 16,
        discount: 0,
        minAppLots: 14,
        maxAppLots: 66,
        sharesPerLot: 87
      },
      {
        category: "B-HNI",
        effectivePrice: 172,
        lotSize: 87,
        subscriptionRate: 8.33,
        gmp: 16,
        discount: 0,
        minAppLots: 67,
        sharesPerLot: 87,
        creditedLots: 14
      }
    ]
  },
  {
    name: "Northern Arc Capital",
    categories: [
      {
        category: "Retail",
        effectivePrice: 263,
        lotSize: 57,
        subscriptionRate: 32.01,
        gmp: 25,
        discount: 0,
        minAppLots: 1,
        maxAppLots: 13,
        sharesPerLot: 57
      },
      {
        category: "Shareholder",
        effectivePrice: 260,
        lotSize: 57,
        subscriptionRate: 3,
        gmp: 25,
        discount: 3,
        minAppLots: 1,
        maxAppLots: 13,
        sharesPerLot: 57
      },
      {
        category: "Employee",
        effectivePrice: 255,
        lotSize: 57,
        subscriptionRate: 2,
        gmp: 25,
        discount: 8,
        minAppLots: 1,
        maxAppLots: 13,
        sharesPerLot: 57
      },
      {
        category: "S-HNI",
        effectivePrice: 263,
        lotSize: 57,
        subscriptionRate: 121.79,
        gmp: 25,
        discount: 0,
        minAppLots: 14,
        maxAppLots: 66,
        sharesPerLot: 57
      },
      {
        category: "B-HNI",
        effectivePrice: 263,
        lotSize: 57,
        subscriptionRate: 32.096,
        gmp: 25,
        discount: 0,
        minAppLots: 67,
        sharesPerLot: 57,
        creditedLots: 14
      }
    ]
  }
];
