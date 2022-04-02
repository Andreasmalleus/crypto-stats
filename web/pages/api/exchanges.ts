import { NextApiResponse, NextApiRequest } from "next";

export default async (_ : NextApiRequest, res : NextApiResponse ) => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/exchanges?per_page=100",
    {
      method: "GET",
    }
  );
  const data = await response.json();
  if(!data){
    res.status(500).send("Error");  
  }
  res.send(data);
} 