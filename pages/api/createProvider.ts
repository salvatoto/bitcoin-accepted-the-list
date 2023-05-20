import { PrismaClient, providers_intermediate } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description } = req.body;

  try {
    const provider: providers_intermediate = await prisma.providers_intermediate.create({
      data: {
        name,
        description
      },
    });

    res.status(200).json({ userId: provider.id.toString() });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};