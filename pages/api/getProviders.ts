import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Provider, Prisma } from "@prisma/client";
const SITCOM = process.env.SITCOM === "true";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { service, location } = req.query;

    const filterOptions: {
      approved: boolean;
      is_sitcom: boolean;
      services?: Prisma.StringNullableListFilter;
      location?: Prisma.StringNullableListFilter;
    } = {
      approved: true,
      is_sitcom: SITCOM ? true : false,
    };

    if (service) {
      filterOptions.services = { has: service as string };
    }

    if (location) {
      filterOptions.location = { has: location as string };
    }

    const providers = await prisma.provider.findMany({
      where: filterOptions,
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