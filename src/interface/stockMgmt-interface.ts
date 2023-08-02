export interface pageSizeDTO {
  pageSize: number;
  offset: number;
}

export interface createStockDTO {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  currentPrice: number;
  dailyHigh: number;
  dailyLow: number;
  volume: number;
  averageVolume: number;
  marketCap: number;
  description: string;
  country: string;
}
