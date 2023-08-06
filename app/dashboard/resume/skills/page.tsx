"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useUserDataFetcher from "@/app/hooks/useUserDataFetcher";
import Link from "next/link";
import toast from "react-hot-toast";
import { User } from "@/app/types/User";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import "../../../styles/globals.css";
import dynamic from "next/dist/shared/lib/dynamic";

const DynamicLoading = dynamic(() => import("@/app/loading"));
const DynamicDeleteIcon = dynamic(() => import("@mui/icons-material/Delete"));
const DynamicKeyboardBackspaceIcon = dynamic(
  () => import("@mui/icons-material/KeyboardBackspace")
);
const UserSkills = () => {
  const { data, error, isLoading } = useUserDataFetcher();
  let taostJobId: string = "hello";
  const [skills, setSkills] = useState(() => {
    if (data?.skills && data.skills.length === 0) {
      return [
        {
          name: "",
        },
      ];
    }
    return data?.skills?.map(({ id, ...rest }) => rest) || [];
  });

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);
  useEffect(() => {
    const savedSkills = localStorage.getItem("skills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }
  }, []);

  const handleSkillsAdd = () => {
    setSkills((prevSkills) => [...prevSkills, { name: "" }]);
  };
  const handleSkillsInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) => {
        if (i === index) {
          return {
            ...skill,
            [name]: value,
          };
        }
        return skill;
      })
    );
  };
  const handleSkillRemove = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };
  const { mutate } = useMutation(
    async (user: User) => await axios.post("/api/users/addUserData", user),
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
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    taostJobId = toast.loading("Loading...", {
      id: taostJobId,
    });
    const updatedUser: User = {
      ...data,
      skills: skills,
    };
    mutate(updatedUser);
    localStorage.clear();
  };
  if (error) return error;
  if (isLoading) return <DynamicLoading />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="flex flex-col items-center mt-9 min-h-screen"
    >
      <h1 className="font-bold text-5xl mb-5">Compétences</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-20 w-2/5 transition duration-300"
      >
        <Link href="/dashboard/resume">
          <div
            className="cursor-pointer transition duration-300 hover:opacity-70 ml-96 "
            onClick={() => localStorage.clear()}
          >
            <DynamicKeyboardBackspaceIcon />
          </div>
        </Link>
        {skills.map((skill, index) => (
          <div
            key={index}
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center gap-5 transition duration-300 mt-9 w-full"
          >
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between gap-5">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={skill.name}
                  type="text"
                  name="name"
                  placeholder="compétence"
                  value={skill.name}
                  onChange={(e) => handleSkillsInputChange(e, index)}
                  required
                />
                <div
                  onClick={() => handleSkillRemove(index)}
                  className="cursor-pointer hover:opacity-70 transition duration-300"
                >
                  <DynamicDeleteIcon fontSize="small" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          onClick={handleSkillsAdd}
          className=" font-bold text-blue-500 hover:text-blue-700 duration-300 cursor-pointer mr-80 border-2 border-slate-200 rounded-md p-1 w-28 text-center align-middle"
        >
          <span className="text-xl">+</span> Ajouter
        </div>
        <div className="flex gap-5">
          <button
            type="submit"
            className="max-w-fit bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserSkills;
