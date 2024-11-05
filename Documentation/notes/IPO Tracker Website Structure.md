# IPO Tracker Website Structure

Phase One : Home Page, Calculator

Phase Two : GMP Aggregator, subscription Aggregator, Social Media Automation

Phase Three : IPO Details, IPO Performance

Phase Four : My Account, Forum, Historical Data

Phase Five : New Issues, Good Reads, About Us, Docs

Phase Six : Additional Features, Maintenance, Upgradation

IPO Tracker

Pages:

1. Home Page
2. Calculator
3. GMP Aggregator
4. Subscription Aggregator


- Database
- Scraping data from InvsetorGain, IPOWatch, NSE, BSE, SEBI

# Home Page

IPO Dashboard (home page)

1. home page should consist of Ongoing , past and upcoming ipo's
2. it should show when was the data last refreshed or updated. Also add a refresh button!
3. Ongoing ipos table should have - Name,	Price,	GMP,	Subscription Rate,	Issue Size,	Close Date,	BoA Date,	Listing Date,	Status.
4. Upcoming ipos table should have - Name,	Price,	GMP,	Issue Size,	Open Date,	Close Date,	BoA Date	, Listing Date,
5. Closed/past ipos should have - Name,	Symbol,	Price Range,	Issue Size,	Listing Date,	Listing Price,	Current Price.
6. [https://v0.dev/chat/mwjNNg8juPn?b=b_hN1E3VvmpoB](https://v0.dev/chat/mwjNNg8juPn?b=b_hN1E3VvmpoB)   v3

# Calculator

3 types

1. Funding calculator: **Capital** Required + **Interest** on that Capital
2. Expected gain calculator: Based on the **GMP** and **Subscription** rate for a category
3. Allotment Optimizer: This will give us the best combination of **IPOs to apply** and in which **Category to apply** based on the **GMP**, **Subscription** and the available **Capital**. 


## Calculator formulae.


total variables: ( make fields for all variables)

calculator - 3 types

1. Capital Required calculator
2. Expected gain calculator
3. Allotment Optimizer - work In progress. 

phase one - 1 and 2 calc execution   

total variables: 

IPO Name (custom or take from the current or upcoming list of ipos) ( default - custom; which means share price, shares per lot, gmp, subscription rate, shareholder discount, employee discount  will be entered by the user or else if a company name is selected then these details will be prefetched)

Share Price (default = 0)
shares per lot (default = 0)
shareholder discount (d
efault = 0)
employee discount (default = 0)

no of Lots (default = 0, for all categories)
 
category ( retail, shni, bhni, shareholder, employee) (all categories should be mentioned )
subscription rate ( unique for every category) (default = 0 for all categories)

Interest Rate (per annum) (default = 10% )
Number of Days (loan period)(default = 7 days)

application applied through - single or multiple account (default - single)
use live subscription - yes or no (default - no )
shareholder quota eligible - yes or no (default no)
employee quota eligible - yes or no (default no)
gmp(default = 0)
 

## formulae
 

price/value of one lot = share price  * shares per lot
shareholder price = share price - shareholder discount
employee price = share price - employee discount



## Funding Calculator:

Capital/principle  required = ∑ lots applied * share price ( here lots applied in shareholder and employee  will  be  multiplied  by  the  respective  share  price  while the retail, shni and the bhni lots will be multiplied with the actual share price)  

Interest  = principle * (Interest rate/100) * (days/365)


Expected Gain = ∑(Probability of Outcome i × Gain/Loss in Outcome i)

Expected Gain = ∑( Lots applied in a category/ subscription rate of that particular category * (gmp + diacount for that category)) (here for the retail, shni and bhni the profit/loss is the gmp but for shareholder and employee category the net gain/loss is the gmp+discount) 


# Subscription Aggregator

Subscription data from NSE, BSE will be shown.

Consolidated, NSE and BSE subscription, Bid Details, No of Application for closed and listed companies.  

Graph of Subscription pattern, like for smaller IPOs it will be 20x on first day itself, but it just because everytime we generally see a fixed number of money going on first day second day… this money inflow chart. 

# GMP Aggregator

GMP, Kostak, Subject to Sauda rates from different sources like InvestorGain, IPO Central, IPO Watch, IPO Premium etc… 

Graph of GMP manipulation or fluctuations etc…


# UI/UX Design

## Points To remember

theme of the page will be aesthetic and minimalistic.
there should be light and dark theme.
Indian numbering system and using of **₹** symbol everywhere


Colour: 
Your selected colors:

    Text: #f9eee7 - rgb(249, 238, 231) - hsl(23, 60%, 94%)
    Background: #0d0d0d - rgb(13, 13, 13) - hsl(0, 0%, 5%)
    Primary: #28bdb3 - rgb(40, 189, 179) - hsl(176, 65%, 45%)
    Secondary: #ab4465 - rgb(171, 68, 101) - hsl(341, 43%, 47%)
    Accent: #59acb1 - rgb(89, 172, 177) - hsl(183, 36%, 52%)


tailwind.config.js

colors: {
 'text': 'var(--text)',
 'background': 'var(--background)',
 'primary': 'var(--primary)',
 'secondary': 'var(--secondary)',
 'accent': 'var(--accent)',
},


main.css
@layer base {
  :root {
    --text: #131514;
    --background: #e6f0eb;
    --primary: #226242;
    --secondary: #78e8b0;
    --accent: #07cf6b;
  }
  .dark {
    --text: #e9ebea;
    --background: #0f1914;
    --primary: #9bdcbb;
    --secondary: #17864f;
    --accent: #31f894;
  }
},


CSS

@media (prefers-color-scheme: light) {
  :root {
    --text: #131514;
    --background: #e6f0eb;
    --primary: #226242;
    --secondary: #78e8b0;
    --accent: #07cf6b;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    --text: #e9ebea;
    --background: #0f1914;
    --primary: #9bdcbb;
    --secondary: #17864f;
    --accent: #31f894;
  }
}


Font :

Tailwind css;


fontSize: {
  sm: '0.750rem',
  base: '1rem',
  xl: '1.333rem',
  '2xl': '1.777rem',
  '3xl': '2.369rem',
  '4xl': '3.158rem',
  '5xl': '4.210rem',
},
fontFamily: {
  heading: 'Space Grotesk',
  body: 'Josefin Sans',
},
fontWeight: {
  normal: '400',
  bold: '700',
},

or css font 

@import url('https://fonts.googleapis.com/css?family=Space%20Grotesk:700|Josefin%20Sans:400');

body {
  font-family: 'Josefin Sans';
  font-weight: 400;
}

h1, h2, h3, h4, h5 {
  font-family: 'Space Grotesk';
  font-weight: 700;
}

html {font-size: 100%;} /* 16px */

h1 {font-size: 4.210rem; /* 67.36px */}

h2 {font-size: 3.158rem; /* 50.56px */}

h3 {font-size: 2.369rem; /* 37.92px */}

h4 {font-size: 1.777rem; /* 28.48px */}

h5 {font-size: 1.333rem; /* 21.28px */}

small {font-size: 0.750rem; /* 12px */}



