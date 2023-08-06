"use client";

import { motion } from "framer-motion";
import "../../../styles/globals.css";
import { useState, useEffect } from "react";
import useUserDataFetcher from "@/app/hooks/useUserDataFetcher";
import Link from "next/link";
import toast from "react-hot-toast";
import { User } from "@/app/types/User";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import("@/app/loading"));
const DynamicDeleteIcon = dynamic(() => import("@mui/icons-material/Delete"));
const DynamicKeyboardBackspaceIcon = dynamic(
  () => import("@mui/icons-material/KeyboardBackspace")
);

const UserEductaion = () => {
  const { data, error, isLoading } = useUserDataFetcher();
  let taostJobId: string = "hello";
  const [universities, setUniversities] = useState(() => {
    if (data?.study && data.study.length === 0) {
      return [
        {
          name: "",
          diploma: "",
          startDate: "",
          endDate: "",
        },
      ];
    }
    return data?.study?.map(({ id, ...rest }) => rest) || [];
  });

  useEffect(() => {
    localStorage.setItem("universities", JSON.stringify(universities));
  }, [universities]);
  useEffect(() => {
    const savedUniversities = localStorage.getItem("universities");
    if (savedUniversities) {
      setUniversities(JSON.parse(savedUniversities));
    }
  }, []);

  const handleUniversitiesAdd = () => {
    setUniversities((prevUniversities) => [
      ...prevUniversities,
      { name: "", diploma: "", startDate: "", endDate: "" },
    ]);
  };
  const handleUniversityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setUniversities((prevUniversities) =>
      prevUniversities.map((university, i) => {
        if (i === index) {
          return {
            ...university,
            [name]: value,
          };
        }
        return university;
      })
    );
  };
  const handleUniversityRemove = (index: number) => {
    const updatedUniversities = [...universities];
    updatedUniversities.splice(index, 1);
    setUniversities(updatedUniversities);
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
      study: universities,
    };
    mutate(updatedUser);
    console.log(universities);
    localStorage.clear();
  };
  if (error) return error;
  if (isLoading) return <DynamicLoading />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="flex flex-col items-center mt-9 "
    >
      <h1 className="font-bold text-5xl mb-5">Education</h1>
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
        {universities.map((university, index) => (
          <div
            key={index}
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center gap-5 transition duration-300 mt-9"
          >
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <label htmlFor={university.name}>Nom de l'établissement</label>
                <div
                  onClick={() => handleUniversityRemove(index)}
                  className="cursor-pointer hover:opacity-70 transition duration-300"
                >
                  <DynamicDeleteIcon fontSize="small" />
                </div>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={university.name}
                type="text"
                name="name"
                placeholder="Nom de l'établissement "
                value={university.name}
                onChange={(e) => handleUniversityInputChange(e, index)}
                required
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor={university.diploma}>Diplome</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={university.diploma}
                type="text"
                name="diploma"
                placeholder="Nom de diplome"
                value={university.diploma}
                onChange={(e) => handleUniversityInputChange(e, index)}
                required
              />
            </div>
            <div className="flex items-center gap-12 mr-20">
              <label className="w-44" htmlFor="startDate">
                Date de début
              </label>
              <input
                id="startDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="startDate"
                placeholder="date de début "
                value={university.startDate}
                onChange={(e) => handleUniversityInputChange(e, index)}
                required
              />
            </div>
            <div className="flex items-center gap-12 mr-20">
              <label className="w-44" htmlFor="endDate">
                Date de Fin
              </label>
              <input
                id="endDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="endDate"
                placeholder="date de fin "
                value={university.endDate}
                onChange={(e) => handleUniversityInputChange(e, index)}
                required
              />
            </div>
          </div>
        ))}
        <div
          onClick={handleUniversitiesAdd}
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

export default UserEductaion;
