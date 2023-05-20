import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const providers = await prisma.providers.findMany();

    res.status(200).json({ providers: providers });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};