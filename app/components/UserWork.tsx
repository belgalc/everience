"use client";

import { User } from "../types/User";
import { motion } from "framer-motion";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";

type Data = {
  data?: User;
  setVisibility: Function;
  updateUserData: Function;
};
const UserWork = ({ data, setVisibility, updateUserData }: Data) => {
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

  const handleFormSubmit = () => {
    updateUserData(companies);
  };
  useEffect(() => {
    const savedCompanies = localStorage.getItem("companies");
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    }
  }, []);
  const handleVisibilityChange = () => {
    setVisibility("second");
    localStorage.setItem("companies", JSON.stringify(companies));
  };
  const handleWorkAdd = () => {
    setCompanies((prevCompanies) => [
      ...prevCompanies,
      { name: "", job: "", startDate: "", endDate: "" },
    ]);
  };

  const handleWorkInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setCompanies((prevCompanies) =>
      prevCompanies.map((comapny, i) => {
        if (i === index) {
          return {
            ...comapny,
            [name]: value,
          };
        }
        return comapny;
      })
    );
  };
  const handleCompanyRemove = (index: number) => {
    const updatedCompanies = [...companies];
    updatedCompanies.splice(index, 1);
    setCompanies(updatedCompanies);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="flex flex-col items-center mt-20 "
    >
      <div className="flex flex-col items-center gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-20 w-2/5 transition duration-300">
        <h1 className="text-lg text-slate-400">Expérience professionnelle</h1>
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-5 transition duration-300"
          >
            {index !== 0 && (
              <div onClick={() => handleCompanyRemove(index)}>d</div>
            )}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Nom de l'entreprise "
              value={company.name}
              onChange={(e) => handleWorkInputChange(e, index)}
              required
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="job"
              placeholder="Poste"
              value={company.job}
              onChange={(e) => handleWorkInputChange(e, index)}
              required
            />
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
                onChange={(e) => handleWorkInputChange(e, index)}
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
                onChange={(e) => handleWorkInputChange(e, index)}
                required
              />
            </div>
          </div>
        ))}
        <div
          onClick={handleWorkAdd}
          className=" font-bold text-blue-500 hover:text-blue-700 duration-300 cursor-pointer mr-80 border-2 border-slate-200 rounded-md p-1 w-28 text-center align-middle"
        >
          <span className="text-xl">+</span> Ajouter
        </div>
        <div className="flex gap-5">
          <button
            onClick={handleVisibilityChange}
            type="button"
            className="max-w-fit bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Précédent
          </button>
          <button
            onClick={handleFormSubmit}
            type="button"
            className="max-w-fit bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirmer
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserWork;
