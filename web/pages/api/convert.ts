import { NextApiRequest, NextApiResponse } from "next";

export default async (req : NextApiRequest, res : NextApiResponse ) => {
  const {id, convertTo, amount} = req.query
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=${amount}&id=${id}&convert=${convertTo}`,
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