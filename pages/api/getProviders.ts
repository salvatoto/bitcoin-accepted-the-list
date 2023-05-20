import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //TODO: Temp pulling from `providers_intermediate` until chron job is set up
    const providers = await prisma.providers_intermediate.findMany();

      const modifiedProviders = providers.map(provider => {
        return {
          ...provider,
          id: provider.id.toString(),
        };
      });

    res.status(200).json({ providers: modifiedProviders });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};