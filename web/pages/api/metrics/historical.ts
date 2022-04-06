import { NextApiResponse, NextApiRequest } from "next";

export default async (req : NextApiRequest, res : NextApiResponse ) => {
  const {currency, days, slug} = req.query;
  if(currency == 'undefined' || days == 'undefined' || slug == 'undefined'){
    return;
  }
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=${currency}&days=${days}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  if(!data || data.error){
    res.status(500).send("Error");  
  }
  res.send(data);
} 