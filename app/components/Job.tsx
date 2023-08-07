"use client";
import { JobType } from "../types/Jobs";
import Link from "next/link";
const Job = ({ title, id }: JobType) => {
  return (
    <Link href={{ pathname: `/emplois/${id}` }}>
      <div className="shadow-xl border-b-2 relative p-7 border-b-red-400 flex flex-col items-center justify-center gap-5 cursor-pointer hover:opacity-70 transition duration-700 hover:-translate-y-3">
        <p className="font-light text-lg first-letter:uppercase">{title}</p>
      </div>
    </Link>
  );
};

export default Job;
