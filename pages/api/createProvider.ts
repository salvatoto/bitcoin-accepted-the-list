import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../client.js";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description } = req.body;

  const { data, error } = await supabase
    .from('providers_intermediate')
    .insert([{ name, description }]);

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json({ data });
  }
};