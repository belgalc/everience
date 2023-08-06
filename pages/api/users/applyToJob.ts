import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please login" });
    try {
      const { jobId } = req.body;

      // Check if the user has already applied to this job
      const appliedJob = await prisma.userJob.findUnique({
        where: {
          jobId_userEmail: {
            jobId,
            userEmail: session.user?.email || "",
          },
        },
        include: {
          job: true,
        },
      });
      if (appliedJob)
        return res
          .status(401)
          .json({ message: "You have already applied to this job" });
      const userJob = await prisma.userJob.create({
        data: {
          userEmail: session?.user?.email || "",
          jobId: jobId,
        },
      });
      res.status(200).json(userJob);
    } catch (error) {
      res.status(500).json({ message: "arja3 ghodwa" });
    }
  }
}
