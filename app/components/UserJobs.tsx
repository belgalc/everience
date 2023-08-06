"use client ";
import { JobType } from "../types/Jobs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UserJobs = () => {
  const getJobs = async () => {
    const res = await axios.get("/api/users/getJobsApplied");
    return res.data;
  };
  const { data, error, isLoading } = useQuery<JobType[]>({
    queryFn: getJobs,
    queryKey: ["userJobs"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  const jjj = data?.map((a, i) => {
    <div key={i}>{a.title}</div>;
  });
  return {
    jjj,
  };
};

export default UserJobs;
