"use client";

import { User } from "../types/User";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/globals.css";
type Data = {
  data?: User;
  setVisibility: Function;
  updateUserData: Function;
};
const UserInfos = ({ data, setVisibility, updateUserData }: Data) => {
  const [birthdate, setInfos] = useState(data?.birthdate || "");
  const handleVisibilityChange = () => {
    setVisibility("second");
    updateUserData(birthdate);
    localStorage.setItem("infos", JSON.stringify(birthdate));
  };
  useEffect(() => {
    const savedDate = localStorage.getItem("infos");
    if (savedDate) {
      setInfos(JSON.parse(savedDate));
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="flex flex-col items-center mt-20 "
    >
      <div
        // onSubmit={submit}
        className="flex flex-col items-center gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-20 w-2/5 transition duration-300"
      >
        <h1 className="text-lg text-slate-400">Coordonnées</h1>
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
        <button
          onClick={handleVisibilityChange}
          type="button"
          className="max-w-fit bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Suivant
        </button>
      </div>
    </motion.div>
  );
};

export default UserInfos;
