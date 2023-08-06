import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (req.method === "GET") {
    try {
      const jobData = await prisma.job.findMany();
      res.status(200).json(jobData);
    } catch (error) {
      res.status(500).json({ message: "arja3 ghodwa" });
    }
  }
}
