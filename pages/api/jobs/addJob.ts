import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;
    const jobData = await prisma.job.create({
      data: {
        ...data,
        profiles: { set: data.profiles },
      },
    });
    res.status(200).json({ jobData });
  } catch (error) {
    res.status(500).json({ message: "arja3 ghodwa" });
    console.log(error);
  }
}
