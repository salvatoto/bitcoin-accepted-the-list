import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { deleteAllProviders, deleteProvidersWithNoServices } from "@/dev/deleteProviders";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //TODO: Temp pulling from `ProviderStaging` until chron job is set up
    const providers = await prisma.providerStaging.findMany();

    const modifiedProviders = providers.map((provider) => {
      return {
        ...provider,
        id: provider.id.toString(),
      };
    });

    deleteProvidersWithNoServices();

    res.status(200).json({ providers: modifiedProviders });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
