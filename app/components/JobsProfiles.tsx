"use client";

import { useState, useEffect } from "react";

const JobProfiles = ({ onProfilesChange }: any) => {
  const [profiles, setProfiles] = useState([{ profile: "" }]);
  const handleProfileAdd = () => {
    setProfiles((prevProfiles) => [...prevProfiles, { profile: "" }]);
    onProfilesChange(profiles); // Pass the updated profiles state to the parent
  };
  useEffect(() => {
    onProfilesChange(profiles);
  }, [profiles]);
  const handleJobInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setProfiles((prevProfiles) =>
      prevProfiles.map((comapny, i) => {
        if (i === index) {
          return {
            ...comapny,
            [name]: value,
          };
        }
        return comapny;
      })
    );
    onProfilesChange(profiles);
  };
  const handleJobRemove = (index: number) => {
    const updatedProfiles = [...profiles];
    updatedProfiles.splice(index, 1);
    setProfiles(updatedProfiles);
    onProfilesChange(profiles);
  };
  return (
    <div>
      <div className="flex flex-col items-start gap-5 bg-white shadow-md rounded px-8 pt-6 pb-8 w-full transition duration-300">
        <h1 className="text-lg text-slate-400">Ajouter un profile</h1>
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-5 transition duration-300"
          >
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="profile"
              placeholder="profile"
              value={profile.profile}
              onChange={(e) => handleJobInputChange(e, index)}
              required
            />
          </div>
        ))}
        <div
          onClick={handleProfileAdd}
          className=" font-bold text-blue-500 hover:text-blue-700 duration-300 cursor-pointer border-2 border-slate-200 rounded-md p-1 w-28 text-center align-middle"
        >
          <span className="text-xl">+</span> Ajouter
        </div>
      </div>
    </div>
  );
};

export default JobProfiles;
