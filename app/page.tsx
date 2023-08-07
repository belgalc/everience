"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { JobType } from "@/app/types/Jobs";
import dynamic from "next/dynamic";
import axios from "axios";

const DynamicLoading = dynamic(() => import("./loading"));
const DynamicJob = dynamic(() => import("@/app/components/Job"));
export default function Home() {
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
    <div className="w-full">
      <video
        className="w-full h-screen object-cover absolute top-0"
        muted
        autoPlay
        loop
        src="/Script1.mp4"
      />
      <div className=" w-full h-screen bg-black bg-opacity-60 absolute top-0"></div>

      <section className=" h-screen flex justify-center items-end text-3xl font-bold "></section>
      <section className="h-screen text-4xl font-thin relative -mt-20 ">
        <div className="w-full absolute h-screen flex items-center justify-center mx-auto text-center">
          <p className="leading-relaxed w-2/3">
            <span className="border-b-4 border-orange-400 font-bold">
              Lorem ipsum dolor sit amet
            </span>{" "}
            consectetur adipisicing elit. Sapiente maxime rerum et officia
            repellendus placeat culpa nobis error architecto, optio, ea
            laboriosam esse voluptatibus minus quas ratione.
          </p>
        </div>
      </section>
      <section className="h-screen text-xl font-light relative  bg-gradient-to-tr from-blue-100 via-white to-white">
        <div className="w-full absolute h-screen flex items-center justify-around pl-6">
          <p className="w-96 leading-relaxed">
            <span className="border-b-4 border-blue-400 font-bold">
              Lorem ipsum dolor sit amet
            </span>{" "}
            adipisicing elit. Sapiente maxime rerum et officia repellendus
            placeat culpa nobis error architecto, optio, ea laboriosam esse
            voluptatibus minus quas ratione, ducimus vel minima?
          </p>
          <Image
            src="/MADI0071.JPG"
            alt=""
            loading="lazy"
            width="600"
            height="600"
          />
        </div>
      </section>
      <section className="h-screen text-xl font-light relative ">
        <div className="w-full absolute h-screen flex flex-col items-center justify-start gap-44 ">
          <div className="font-bold text-6xl border-b-4 border-red-400 mt-16">
            Dernières offres d'emploi
          </div>
          <section className="grid grid-cols-3 gap-16 ">
            {data?.map((job: JobType) => (
              <DynamicJob key={job.id} id={job.id} title={job.title} />
            ))}
          </section>
        </div>
      </section>
      <section className="h-screen text-xl font-light relative bg-gradient-to-bl from-red-100 via-white to-white">
        <div className="w-full absolute h-screen flex items-center justify-around ">
          <Image
            src="/_DSC0030-2.jpg"
            alt=""
            loading="lazy"
            width="600"
            height="600"
          />
          <p className="leading-relaxed w-96">
            <span className="border-b-4 border-red-400 font-bold">
              Lorem ipsum dolor sit amet
            </span>{" "}
            consectetur adipisicing elit. Sapiente maxime rerum et officia
            repellendus placeat culpa nobis error architecto, optio, ea
            laboriosam esse voluptatibus minus quas ratione, ducimus vel minima?
          </p>
        </div>
      </section>
    </div>
  );
}
