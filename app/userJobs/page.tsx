"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../styles/globals.css";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import("@/app/loading"));
const DynamicJob = dynamic(() => import("../components/Job"));
type userJob = {
  job: {
    id: string;
    title: string;
  };
};
const userJobs = () => {
  const getUserJobs = async () => {
    const res = await axios.get("/api/users/getJobsApplied");
    return res.data;
  };
  const { data, error, isLoading } = useQuery({
    queryFn: getUserJobs,
    queryKey: ["userJobs"],
  });
  if (error) return error;
  if (isLoading) return <DynamicLoading />;
  return (
    <div className="text-center min-h-screen">
      <p className=" my-10 font-extrabold text-5xl">Mes emplois</p>
      {!data?.length ? (
        <div className="mt-6 font-light text-lg">No applied jobs</div>
      ) : (
        <div className="grid grid-cols-3 gap-10 px-10 mb-10">
          {data?.map((dt: userJob) => (
            <DynamicJob key={dt.job.id} title={dt.job.title} id={dt.job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default userJobs;
