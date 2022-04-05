export type FieldError = {
    field: string;
    message: string;
  } | null;


export type Listing = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform?: any;
  cmc_rank: number;
  self_reported_circulating_supply?: any;
  self_reported_market_cap?: any;
  last_updated: Date;
  quote : Quote
}

export type Quote = {
  EUR : {
    price: number;
        volume_24h: number;
        volume_change_24h: number;
        percent_change_1h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_60d: number;
        percent_change_90d: number;
        market_cap: number;
        market_cap_dominance: number;
        fully_diluted_market_cap: number;
        last_updated: Date;
  }
}

export type Exchange = {
  id: number;
  image: string;
  name: string;
  trust_score: number;
  trade_volume_24h_btc: number;
  country : string;
  year_established : string;
}