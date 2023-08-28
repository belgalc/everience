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
      <div className=" w-full h-screen absolute top-0 "></div>
      {/* <div className="z-100 text-white absolute top-1/3 px-24 ">
        <p className="font-bold text-6xl mb-7">Bienvenue chez everience</p>
        <p className="font-semibold text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div> */}

      <section className=" h-screen flex justify-center items-end text-3xl font-bold "></section>
      <section className="h-screen text-4xl font-thin relative -mt-20 ">
        <div className="w-full absolute h-screen flex items-center justify-center mx-auto text-center">
          <p className="leading-relaxed w-2/3 text-gray-700">
            <span className="border-b-4 border-pink-500 font-bold ">
              Lorem ipsum dolor sit amet
            </span>{" "}
            consectetur adipisicing elit. Sapiente maxime rerum et officia
            repellendus placeat culpa nobis error architecto, optio, ea
            laboriosam esse voluptatibus minus quas ratione.
          </p>
          <div>
            <Image
              src="/undraw_career_progress_ivdb.png"
              width="400"
              height="400"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="h-screen text-xl font-light relative  bg-gradient-to-br from-pink-500 to-pink-200 ">
        <div className="w-full absolute h-screen  pl-6">
          <p className="w-2/5 leading-9 absolute top-1/2 right-24 font-medium p-5 rounded-md z-40 bg-white -translate-y-1/2 text-gray-700 flex flex-col gap-8 text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab amet
            expedita dolorem nostrum, deleniti suscipit. Obcaecati cumque minima
            id consequuntur itaque tempora a! Nulla cum ut harum expedita saepe
            magni? Obcaecati cumque minima id consequuntur itaque tempora a!
            Nulla cum ut harum expedita saepe magni?
          </p>
          <div className="absolute top-1/2 left-24 -translate-y-1/2">
            <Image
              src="/MADI0071.JPG"
              alt=""
              loading="lazy"
              width="700"
              height="600"
            />
          </div>
        </div>
      </section>
      <section className="h-screen text-xl font-light relative ">
        <div className="w-full absolute h-screen flex flex-col items-center justify-start gap-32">
          <div className="font-bold text-gray-700 text-6xl border-b-4 border-blue-500 mt-16">
            Dernières offres d'emploi
          </div>
          <section className="grid grid-cols-3 gap-16 ">
            {data?.map((job: JobType) => (
              <DynamicJob key={job.id} id={job.id} title={job.title} />
            ))}
          </section>
        </div>
        <div className="absolute bottom-4 right-4">
          <Image
            src="/undraw_Work_from_anywhere_re_s2i6.png"
            width="320"
            height="120"
            alt=""
          />
        </div>
      </section>
      <section className="h-screen text-xl font-light relative bg-gradient-to-tl from-amber-400 to bg-amber-100">
        <div className="w-full absolute h-screen flex items-center justify-around ">
          <div className="absolute top-1/2 right-24 -translate-y-1/2">
            <Image
              src="/_DSC0030-2.jpg"
              alt=""
              loading="lazy"
              width="700"
              height="600"
            />
          </div>
          <p className="w-2/5 leading-9 absolute top-1/2 left-24 font-medium p-5 rounded-md z-40 bg-white -translate-y-1/2 text-gray-700 flex flex-col gap-8 text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab amet
            expedita dolorem nostrum, deleniti suscipit. Obcaecati cumque minima
            id consequuntur itaque tempora a! Nulla cum ut harum expedita saepe
            magni? Obcaecati cumque minima id consequuntur itaque tempora a!
            Nulla cum ut harum expedita saepe magni?
          </p>
        </div>
      </section>
      {/* <section className="h-screen text-xl font-light relative ">
        <div className="w-full absolute h-screen flex flex-col items-center justify-start gap-44 ">
          <div className="font-bold text-gray-700 text-6xl border-b-4 border-blue-400 mt-16">
            
          </div>
          <section className="grid grid-cols-3 gap-16 ">
            {data?.map((job: JobType) => (
              <DynamicJob key={job.id} id={job.id} title={job.title} />
            ))}
          </section>
        </div>
      </section> */}
      {/* <section className="h-screen text-xl font-light relative bg-gradient-to-br from-blue-500 to-blue-200">
        <div className="w-full absolute h-screen flex items-center justify-around ">
          <p className="w-2/5 leading-loose text-white flex flex-col gap-8 text-lg">
            <span className="font-bold text-4xl ">
              Lorem ipsum dolor sit amet
            </span>{" "}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab amet
            expedita dolorem nostrum, deleniti suscipit. Obcaecati cumque minima
            id consequuntur itaque tempora a! Nulla cum ut harum expedita saepe
            magni?
          </p>
          <Image
            src="/DSC05151-2.jpg"
            alt=""
            loading="lazy"
            width="600"
            height="600"
          />
        </div>
      </section> */}
    </div>
  );
}
