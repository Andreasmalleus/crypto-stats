import { NextApiRequest, NextApiResponse } from "next";

export default async (_ : NextApiRequest, res : NextApiResponse ) => {
  
  const response = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
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
  res.json(data);
}