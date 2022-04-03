export type FieldError = {
    field: string;
    message: string;
  } | null;


export type Listing = {
  id : number;
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  last_updated: string;
  max_supply: number;
  name: string;
  num_market_pairs: number;
  slug: string;
  symbol: string;
  tags : string[];
  total_supply: number;
  quote : ListingQuote
}

export type ListingQuote = {
  USD : {
    price: number;
    volume_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    market_cap: number;
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