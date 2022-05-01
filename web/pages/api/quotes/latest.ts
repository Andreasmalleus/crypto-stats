import { NextApiResponse, NextApiRequest } from "next";

export default async (req : NextApiRequest, res : NextApiResponse ) => {
  const {slug, id} = req.query;
  let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert=EUR`
  if(slug && id == 'undefined'){
    return;
  }
  //if query contains slug append slug as parameter
  if(slug){
    url += `&slug=${slug}`
  }
  //if query contains id append id as parameter
  if(id){
    url += `&id=${id}`
  }
  const response = await fetch(
    url,
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