export const prices: Tickers = {
  GOOG: {
    name: 'Alphabet Inc.',
    price: [300, 301, 333, 555, 232, 124, 133, 123, 444, 234],
  },
  AAPL: {
    name: 'Apple Inc.',
    price: [291, 281, 333, 654, 211, 132, 433, 321, 145, 213],
  },
  MSFT: {
    name: 'Microsoft Corporation',
    price: [123, 123, 123, 123, 123, 123, 123, 123, 123, 123],
  },
  AMZN: {
    name: 'Amazon.com, Inc.',
    price: [123, 123, 123, 123, 123, 123, 123, 123, 123, 123],
  },
  FB: {
    name: 'Facebook, Inc.',
    price: [123, 123, 123, 123, 123, 123, 123, 123, 123, 123],
  },
};

export interface Tickers {
  [key: string]: TickerItem;
}

export interface TickerItem {
  name: string;
  price: number[];
}
