import { NextApiResponse, NextApiRequest } from "next";

export default async (req : NextApiRequest, res : NextApiResponse ) => {
  const {slug} = req.query;
  if(slug == 'undefined'){
    return;
  }
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${slug}&convert=EUR`,
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