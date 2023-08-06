"use client";

import { useState, useEffect } from "react";

const JobMissions = ({ onMissionsChange }: any) => {
  const [missions, setMissions] = useState([{ mission: "" }]);
  const handleMissionAdd = () => {
    setMissions((prevMissions) => [...prevMissions, { mission: "" }]);
    onMissionsChange(missions); // Pass the updated missions state to the parent
  };
  useEffect(() => {
    onMissionsChange(missions);
  }, [missions]);
  const handleJobInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setMissions((prevMissions) =>
      prevMissions.map((comapny, i) => {
        if (i === index) {
          return {
            ...comapny,
            [name]: value,
          };
        }
        return comapny;
      })
    );
    onMissionsChange(missions);
  };
  const handleJobRemove = (index: number) => {
    const updatedMissions = [...missions];
    updatedMissions.splice(index, 1);
    setMissions(updatedMissions);
    onMissionsChange(missions);
  };
  return (
    <div>
      <div className="flex flex-col items-start gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full transition duration-300">
        <h1 className="text-lg text-slate-400">Ajouter une mission</h1>
        {missions.map((mission, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-5 transition duration-300"
          >
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="mission"
              placeholder="mission"
              value={mission.mission}
              onChange={(e) => handleJobInputChange(e, index)}
              required
            />
          </div>
        ))}
        <div
          onClick={handleMissionAdd}
          className=" font-bold text-blue-500 hover:text-blue-700 duration-300 cursor-pointer border-2 border-slate-200 rounded-md p-1 w-28 text-center align-middle"
        >
          <span className="text-xl">+</span> Ajouter
        </div>
      </div>
    </div>
  );
};

export default JobMissions;
