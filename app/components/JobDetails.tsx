"use client";
import { JobType } from "../types/Jobs";
const Job = ({
  id,
  title,
  description,
  missions,
  profiles,
  jobApply,
}: JobType) => {
  const handleClick = () => {
    if (jobApply) jobApply(id);
  };
  return (
    <div className="flex flex-col p-5 text-center gap-4">
      <p className="font-bold first-letter:uppercase text-5xl">{title}</p>
      <div className="flex flex-col p-5 text-left gap-4">
        <div className="font-bold text-2xl">Description:</div>
        <div>{description}</div>
        <div className="font-bold text-2xl">Profiles demandés:</div>
        {profiles?.map((profile, index) => (
          <ul key={index}>
            <li className="list-disc">{Object.values(profile.profile)}</li>
          </ul>
        ))}
        <div className="font-bold text-2xl">Vos missions:</div>
        {missions?.map((mission, index) => (
          <ul key={index}>
            <li className="list-disc">{Object.values(mission.mission)}</li>
          </ul>
        ))}
        <button
          onClick={handleClick}
          className="max-w-fit bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {" "}
          Postuler
        </button>
      </div>
    </div>
  );
};

export default Job;
