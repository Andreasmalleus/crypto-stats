import { NextApiResponse, NextApiRequest } from "next";

export default async (_ : NextApiRequest, res : NextApiResponse ) => {
  const response = await fetch(
    "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
    {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY!,
      },
    }
  );
  const data = await response.json();
  if(!data){
    res.status(500).send("Error");  
  }
  res.send(data);
} 