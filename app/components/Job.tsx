"use client";
import { useRouter } from "next/navigation";
import { JobType } from "../types/Jobs";
import Link from "next/link";
const Job = ({ title, id }: JobType) => {
  return (
    <Link href={{ pathname: `/emplois/${id}` }}>
      <div className="flex flex-col py-7 text-center border-2 border-gray-500 rounded-sm">
        <p className="font-bold first-letter:uppercase">{title}</p>
      </div>
    </Link>
  );
};

export default Job;
