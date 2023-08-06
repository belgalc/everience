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
const UserExperience = () => {
  const { data, error, isLoading } = useUserDataFetcher();
  let taostJobId: string = "hello";
  const [companies, setCompanies] = useState(() => {
    if (data?.work && data.work.length === 0) {
      return [
        {
          name: "",
          job: "",
          startDate: "",
          endDate: "",
        },
      ];
    }
    return data?.work?.map(({ id, ...rest }) => rest) || [];
  });

  useEffect(() => {
    localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies]);
  useEffect(() => {
    const savedCompanies = localStorage.getItem("companies");
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    }
  }, []);

  const handleCompaniesAdd = () => {
    setCompanies((prevCompanies) => [
      ...prevCompanies,
      { name: "", job: "", startDate: "", endDate: "" },
    ]);
  };
  const handleCompanyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setCompanies((prevCompanies) =>
      prevCompanies.map((company, i) => {
        if (i === index) {
          return {
            ...company,
            [name]: value,
          };
        }
        return company;
      })
    );
  };
  const handleCompanyRemove = (index: number) => {
    const updatedCompanies = [...companies];
    updatedCompanies.splice(index, 1);
    setCompanies(updatedCompanies);
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
      work: companies,
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
        {companies.map((company, index) => (
          <div
            key={index}
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center gap-5 transition duration-300 mt-9"
          >
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <label htmlFor={company.name}>Nom de l'entreprise</label>
                <div
                  onClick={() => handleCompanyRemove(index)}
                  className="cursor-pointer hover:opacity-70 transition duration-300"
                >
                  <DynamicDeleteIcon fontSize="small" />
                </div>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={company.name}
                type="text"
                name="name"
                placeholder="Nom de l'entreprise "
                value={company.name}
                onChange={(e) => handleCompanyInputChange(e, index)}
                required
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor={company.job}>Poste</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={company.job}
                type="text"
                name="diploma"
                placeholder="Poste"
                value={company.job}
                onChange={(e) => handleCompanyInputChange(e, index)}
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
                value={company.startDate}
                onChange={(e) => handleCompanyInputChange(e, index)}
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
                value={company.endDate}
                onChange={(e) => handleCompanyInputChange(e, index)}
                required
              />
            </div>
          </div>
        ))}
        <div
          onClick={handleCompaniesAdd}
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

export default UserExperience;
