"use client";

import JobProfiles from "@/app/components/JobsProfiles";
import Missions from "@/app/components/Missions";
import { JobType } from "@/app/types/Jobs";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
const Jobs = () => {
  const [jobData, setJobData] = useState<JobType>({
    title: "",
    description: "",
    missions: [],
    status: true,
    profiles: [],
  });

  const handleProfilesChange = (profiles: string[]) => {
    const updatedData = profiles.map((item) => ({ profile: item }));
    setJobData((prevData) => ({
      ...prevData,
      profiles: updatedData,
    }));
  };
  const handleMissionsChange = (missions: string[]) => {
    const updatedData = missions.map((item) => ({ mission: item }));
    setJobData((prevData) => ({
      ...prevData,
      missions: updatedData,
    }));
  };
  let taostJobId: string = "hello";
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData((prevJobData) => ({
      ...prevJobData,
      [name]: value,
    }));
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData((prevJobData) => ({
      ...prevJobData,
      [name]: value,
    }));
  };
  const { mutate } = useMutation(
    async (jobData: JobType) => await axios.post("/api/jobs/addJob", jobData),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: taostJobId });
          console.log(error.response);
        }
      },
      onSuccess: (data) => {
        toast.success(`${data.data.jobData.title} ajouté`, { id: taostJobId });
        setJobData({
          title: "",
          description: "",
          missions: [],
          status: true,
          profiles: [],
        });
      },
    }
  );
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    taostJobId = toast.loading("Loading...", {
      id: taostJobId,
    });
    mutate(jobData);
    console.log(jobData);
  };
  return (
    <div>
      <div className="flex flex-col items-center mt-20">
        <form
          onSubmit={submit}
          className="flex flex-col items-center gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-20 w-2/5"
        >
          <h1 className="text-lg text-slate-400">Ajouter un emploi</h1>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            placeholder="titre"
            value={jobData.title}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            placeholder="description"
            value={jobData.description}
            onChange={(e) => handleTextareaChange(e)}
            cols={30}
            rows={10}
            required
          ></textarea>

          <div className="w-full">
            <Missions onMissionsChange={handleMissionsChange} />
          </div>
          <div className="w-full">
            <JobProfiles onProfilesChange={handleProfilesChange} />
          </div>
          <button
            type="submit"
            className="max-w-fit bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};
export default Jobs;
