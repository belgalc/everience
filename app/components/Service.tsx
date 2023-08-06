"use client";
import dynamic from "next/dynamic";

const DynamicSupportAgentIcon = dynamic(
  () => import("@mui/icons-material/SupportAgent")
);

type data = {
  titre: string;
  id: string;
};
const Service = ({ titre, id }: data) => {
  return (
    <div className="shadow-md w-60 h-60 border-b-2 relative border-b-red-400 flex flex-col items-center justify-center gap-5 cursor-pointer hover:opacity-70 transition duration-500 hover:-translate-y-5">
      <div>
        {" "}
        <DynamicSupportAgentIcon sx={{ fontSize: 60, color: "gray" }} />
      </div>
      <div className="text-lg font-semibold ">{titre}</div>
      <div className="absolute bottom-0 left-0 bg-red-400 text-white p-3 text-base font-semibold">
        {id}
      </div>
    </div>
  );
};

export default Service;
