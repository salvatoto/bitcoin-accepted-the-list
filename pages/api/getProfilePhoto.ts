import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ error: "Missing required parameters" });
    return;
  }

  const { data, error } = await supabase.storage
    .from("profile-photos")
    .download(`user/${userId}/profile-photo.jpg`);

  if (error) {
    res.status(500).json({ error });
  } else {
    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).send(data);
  }
};
