import { NextApiResponse, NextApiRequest } from "next";

export default async (req : NextApiRequest, res : NextApiResponse ) => {
  const {slug} = req.query;
  if(slug == 'undefined'){
    return;
  }
  const response = await fetch(
    `https://api.coingecko.com/api/v3/exchanges/${slug}`,
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