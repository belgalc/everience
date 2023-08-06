"use client";

import { User } from "../../types/User";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useUserDataFetcher from "@/app/hooks/useUserDataFetcher";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "../../styles/globals.css";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import("@/app/loading"));
const UserInfos = () => {
  const router = useRouter();
  const { data, error, isLoading } = useUserDataFetcher();
  let taostJobId: string = "hello";
  const [birthdate, setInfos] = useState(data?.birthdate || "");
  useEffect(() => {
    localStorage.setItem("universities", JSON.stringify(birthdate));
  }, [birthdate]);
  useEffect(() => {
    const savedDate = localStorage.getItem("infos");
    if (savedDate) {
      setInfos(JSON.parse(savedDate));
    }
  }, []);
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
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
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
      birthdate: birthdate,
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
      className="flex flex-col items-center mt-20 "
    >
      <h1 className="font-bold text-5xl mb-5">Coordonnées</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-20 w-2/5 transition duration-300"
      >
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          placeholder="Nom et prénom"
          value={data?.name}
          disabled
          required
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="titre"
          placeholder="Adresse mail"
          value={data?.email}
          disabled
          required
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          name="bdate"
          placeholder="Date de naissance"
          value={birthdate}
          onChange={(e) => setInfos(e.target.value)}
          required
        />
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

export default UserInfos;
