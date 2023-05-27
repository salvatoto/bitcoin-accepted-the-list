import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const SITCOM = process.env.SITCOM === 'true'; 

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const providers = await prisma.provider.findMany({
      where: {
        approved: true,
        is_sitcom: SITCOM ? true : false
      },
    });
    
    const modifiedProviders = providers.map((provider) => {
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
