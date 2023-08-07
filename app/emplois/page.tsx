"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { JobType } from "../types/Jobs";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import Image from "next/image";
const DynamicLoading = dynamic(() => import("@/app/loading"));
const DynamicJob = dynamic(() => import("../components/Job"));

const Emplois = () => {
  const getJobs = async () => {
    const res = await axios.get("/api/jobs/getJobs");
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: getJobs,
    queryKey: ["jobs"],
  });
  if (error) return error;
  if (isLoading) return <DynamicLoading />;
  return (
    <div className="text-center h-full mb-52 min-h-screen ">
      <section className="h-screen text-xl font-light relative bg-gradient-to-br from-orange-100 via-white to-white -mt-8">
        <div className="w-full absolute h-screen flex items-center justify-around ">
          <p className="leading-relaxed w-96 text-3xl text-left">
            <span className="border-b-4 border-orange-400 font-bold">
              Lorem ipsum dolor sit amet
            </span>{" "}
            consectetur adipisicing elit. Sapiente maxime rerum et officia
            repellendus placeat culpa nobis error architecto, optio, ea
            laboriosam esse voluptatibus minus quas ratione, ducimus vel minima?
          </p>
          <Image
            src="/DSC05151-2.jpg"
            alt=""
            loading="lazy"
            width="600"
            height="600"
          />
        </div>
      </section>
      <section className="h-64 text-xl font-light relative ">
        <div className="w-full absolute flex flex-col items-center justify-start gap-32 ">
          <div className="font-bold text-6xl border-b-4 border-red-400 ">
            Nos emplois
          </div>
          <section className="grid grid-cols-3 gap-16 ">
            {data?.map((job: JobType) => (
              <DynamicJob key={job.id} id={job.id} title={job.title} />
            ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Emplois;
