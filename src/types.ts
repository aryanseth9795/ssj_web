// Live price data from SSE
export interface LivePrice {
  symbol: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercentage: string;
  expDate: string;
}

export interface LivePriceData {
  heading: string;
  lastUpdated: string;
  list: LivePrice[];
}

// Static bhav item with value and individual timestamp
export interface StaticBhavItem {
  value: number;
  updated_at: string;
}

// Static bhav data from API
export interface StaticBhavData {
  silver_bhav: StaticBhavItem;
  gold_995_bhav: StaticBhavItem;
  gold_999_bhav: StaticBhavItem;
  rtgs_bhav: StaticBhavItem;
}

// Category from API
export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Product variant
export interface IVariant {
  _id: string;
  size?: string;
  weight?: string;
  images?: string[];
}

// Product from API
export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  category: {
    _id: string;
    name: string;
  };
  variants: IVariant[];
  createdAt: string;
  updatedAt: string;
}
