import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../client.js";

type ProviderData = {
  id: string;
  name: string;
  description: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description } = req.body;

  const { data, error } = await supabase
    .from('providers_intermediate')
    .insert([{ name, description }])
    .select();

  if (error) {
    res.status(500).json({ error });
  } else {
    if (data && data.length > 0) {
      const userId = (data[0] as ProviderData).id; // Assuming the 'id' field is the userId in your table
      res.status(200).json({ userId });
    } else {
      res.status(500).json({ error: "Unexpected response from the database" });
    }
  }
};
