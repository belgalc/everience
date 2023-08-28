"use client";
import { JobType } from "../types/Jobs";
import Link from "next/link";
const Job = ({ title, id }: JobType) => {
  return (
    <Link href={{ pathname: `/emplois/${id}` }}>
      <div className="shadow-md bg-blue-500 relative p-7 flex flex-col items-center rounded-md justify-center gap-5 cursor-pointer hover:opacity-90 transition duration-700 hover:-translate-y-3">
        <p className="font-light text-lg first-letter:uppercase text-white">
          {title}
        </p>
        <p className="text-sm text-white  right-3 bottom-0">Voir plus {">"}</p>
      </div>
    </Link>
  );
};

export default Job;
