import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../client";
import { Stream } from 'stream';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ error: "Missing required parameters" });
    return;
  }

  console.log(`Fetching image for userId: ${userId}`);
  
  const { data, error } = await supabase.storage
    .from("profile-photos")
    .download(`${userId}/profile-photo.jpg`);

  if (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error });
  } else {
    const buffer = await data.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64Data}`;
    res.status(200).json({ imageUrl });
  }
};