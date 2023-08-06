import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (req.method === "POST") {
    if (!session)
      return res.status(401).json({ message: "Please login first" });
    console.log(req.body);
  }
  try {
    const data = req.body;
    const userData = await prisma.user.update({
      data: {
        ...data,
        study: { set: data.study },
        work: { set: data.work },
        // cv: { set: data.cv },
      },
      where: {
        email: session?.user?.email || "",
      },
    });
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: "arja3 ghodwa" });
  }
}
