import { NextApiRequest, NextApiResponse } from "next";

export default async (req : NextApiRequest, res : NextApiResponse ) => {
  const {slug} = req.query
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=4&exlimit=1&titles=${slug}&explaintext=1&format=json`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  if(!data){
    res.status(500).send("Error");
  }
  res.json(data);
}