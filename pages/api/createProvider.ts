import { PrismaClient, Provider } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const SITCOM = process.env.SITCOM === 'true';
const prisma = new PrismaClient();

//TODO: Need to add rest of fields
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    location,
    services,
    phone,
    email,
    website,
    nostr,
    twitter,
    instagram,
    languages,
    description,
    profile_url,
  } = req.body;

  try {
    const provider: Provider = await prisma.provider.create({
      data: {
        name,
        location,
        services,
        phone,
        email,
        website,
        nostr,
        twitter,
        instagram,
        languages,
        profile_url,
        description,
        is_sitcom: SITCOM,
      },
    });

    res.status(200).json({ userId: provider.id.toString() });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
