"use client";

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import "../../styles/globals.css";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import("@/app/loading"));
const DynamicDetails = dynamic(() => import("@/app/components/JobDetails"));
type URL = {
  params: {
    slug: string;
  };
  searchParams: string;
};

export default function JobDetail(url: URL) {
  let taostJobId: string = "hello";
  const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/jobs/${slug}`);
    return response.data;
  };
  const { mutate } = useMutation(
    async (jobId: string) =>
      await axios.post("/api/users/applyToJob", { jobId: jobId }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: taostJobId });
        }
      },
      onSuccess: () => {
        toast.success("Done", { id: taostJobId });
      },
    }
  );

  const handleJobApply = async (jobId: string) => {
    taostJobId = toast.loading("Loading...", {
      id: taostJobId,
    });
    mutate(jobId);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["detail-job"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return <DynamicLoading />;
  console.log(data);
  return (
    <div>
      <DynamicDetails
        id={data?.id}
        title={data?.title}
        description={data?.description}
        profiles={data?.profiles}
        missions={data?.missions}
        jobApply={() => handleJobApply(data?.id || "")}
      />
    </div>
  );
}
