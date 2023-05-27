import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing "id" query parameter' });
    return;
  }

  try {
    const provider = await prisma.provider.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!provider) {
      res.status(404).json({ error: "Provider not found" });
      return;
    }

    res
      .status(200)
      .json({ provider: { ...provider, id: String(provider.id) } });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
