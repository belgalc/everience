"use client";

import { User } from "../types/User";
import { motion } from "framer-motion";
import "../styles/globals.css";
import { useEffect, useState } from "react";

type Data = {
  data?: User;
  setVisibility: Function;
  updateUserData: Function;
};
const UserEductaion = ({ data, setVisibility, updateUserData }: Data) => {
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
    const savedUniversities = localStorage.getItem("universities");
    if (savedUniversities) {
      setUniversities(JSON.parse(savedUniversities));
    }
  }, []);
  const handleVisibilityChange = () => {
    setVisibility("third");
    updateUserData(universities);
    localStorage.setItem("universities", JSON.stringify(universities));
  };
  const handleVisibilityChangeBack = () => {
    setVisibility("first");
  };
  const handleUniversitiesAdd = () => {
    setUniversities((prevUniversities) => [
      ...prevUniversities,
      { name: "", diploma: "", startDate: "", endDate: "" },
    ]);
  };
  console.log(data);
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="flex flex-col items-center mt-20 "
    >
      <div className="flex flex-col items-center gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-20 w-2/5 transition duration-300">
        <h1 className="text-lg text-slate-400">Education</h1>
        {universities.map((university, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-5 transition duration-300"
          >
            {index !== 0 && (
              <div onClick={() => handleUniversityRemove(index)}>d</div>
            )}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Nom de l'établissement "
              value={university.name}
              onChange={(e) => handleUniversityInputChange(e, index)}
              required
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="diploma"
              placeholder="Nom de diplome"
              value={university.diploma}
              onChange={(e) => handleUniversityInputChange(e, index)}
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
            onClick={handleVisibilityChangeBack}
            type="button"
            className="max-w-fit bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Précédent
          </button>
          <button
            onClick={handleVisibilityChange}
            type="button"
            className="max-w-fit bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Suivant
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserEductaion;
