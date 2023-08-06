import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please login" });
    try {
      const userJobs = await prisma.userJob.findMany({
        where: {
          userEmail: session.user?.email || "",
        },
        include: {
          job: {
            select: {
              title: true,
              id: true,
            },
          },
        },
      });
      res.status(200).json(userJobs);
    } catch (error) {
      res.status(500).json({ message: "arja3 ghodwa" });
    }
  }
}
