"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/types/User";
import axios from "axios";
import Link from "next/link";
import "../../styles/globals.css";
import dynamic from "next/dist/shared/lib/dynamic";
const DynamicKeyboardBackspaceIcon = dynamic(
  () => import("@mui/icons-material/KeyboardBackspace")
);
const DynamicLoading = dynamic(() => import("@/app/loading"));
const DynamicEditIcon = dynamic(() => import("@mui/icons-material/Edit"));

const Dashboard = () => {
  const getUser = async () => {
    const res = await axios.get("/api/users/getUser");
    return res.data;
  };
  const { data, error, isLoading } = useQuery<User>({
    queryFn: getUser,
    queryKey: ["user"],
  });
  if (error) return error;
  if (isLoading) return <DynamicLoading />;
  return (
    <div className="flex items-center mt-9 gap-14 flex-col min-h-screen mb-10">
      <p className="font-bold text-5xl">Résumé</p>
      <Link href="/dashboard">
        <div
          className="cursor-pointer transition duration-300 hover:opacity-70 ml-96 -mt-24 "
          onClick={() => localStorage.clear()}
        >
          <DynamicKeyboardBackspaceIcon />
        </div>
      </Link>
      <section className="w-2/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">Education</span>
          <Link href="/dashboard/resume/education">
            <div className="cursor-pointer hover:opacity-70 transition duration-300">
              <DynamicEditIcon fontSize="small" />
            </div>
          </Link>
        </div>

        <section className="flex flex-col gap-5">
          {!data?.study?.length ? (
            <div>Ajouter des universités</div>
          ) : (
            data?.study?.map((uni) => (
              <div
                key={uni.id}
                className="flex flex-col p-5 rounded-md border hover:bg-opacity-100 bg-opacity-60 bg-neutral-300 w-full gap-2 transition duration-300"
              >
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">Nom de l'établissement:</p>
                  <span>{uni.name}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">Diplome:</p>
                  <span>{uni.diploma}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">Date de début:</p>
                  <span>{uni.startDate}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">Date de fin:</p>
                  <span>{uni.endDate}</span>
                </div>
              </div>
            ))
          )}
        </section>
      </section>
      <section className="w-2/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">Expérience professionnelle</span>
          <Link href="/dashboard/resume/experience">
            <div className="cursor-pointer hover:opacity-70 transition duration-300">
              <DynamicEditIcon fontSize="small" />
            </div>
          </Link>
        </div>

        <section className="flex flex-col gap-5">
          {!data?.work?.length ? (
            <div>Ajouter des emplois</div>
          ) : (
            data?.work?.map((ste) => (
              <div
                key={ste.id}
                className="flex flex-col p-5 rounded-md border hover:bg-opacity-100 bg-opacity-60 bg-neutral-300 w-full gap-2 transition duration-300"
              >
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">Nom de l'entreprise:</p>
                  <span>{ste.name}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">Poste:</p>
                  <span>{ste.job}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">Date de début:</p>
                  <span>{ste.startDate}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">Date de fin:</p>
                  <span>{ste.endDate}</span>
                </div>
              </div>
            ))
          )}
        </section>
      </section>
      <section className="w-2/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">Compétences</span>
          <Link href="/dashboard/resume/skills">
            <div className="cursor-pointer hover:opacity-70 transition duration-300">
              <DynamicEditIcon fontSize="small" />
            </div>
          </Link>
        </div>
        <section className="flex gap-5">
          {!data?.skills?.length ? (
            <div>Ajouter des compétences</div>
          ) : (
            data?.skills?.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col p-5 rounded-md border hover:bg-opacity-100 bg-opacity-60 bg-neutral-300 w-full gap-2 transition duration-300"
              >
                <span>{skill.name}</span>
              </div>
            ))
          )}
        </section>
      </section>
      <section className="w-2/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">Langues</span>
          <Link href="/dashboard/resume/langues">
            <div className="cursor-pointer hover:opacity-70 transition duration-300">
              <DynamicEditIcon fontSize="small" />
            </div>
          </Link>
        </div>
        <section className="flex gap-5">
          {!data?.languages?.length ? (
            <div>Ajouter des langues</div>
          ) : (
            data?.languages?.map((langue) => (
              <div
                key={langue.id}
                className="flex flex-col p-5 rounded-md border hover:bg-opacity-100 bg-opacity-60 bg-neutral-300 w-full gap-2 transition duration-300"
              >
                <div className="flex gap-1">
                  {" "}
                  <span className="first-letter:uppercase">
                    {langue.name} -
                  </span>
                  <span className="first-letter:uppercase">
                    {" "}
                    {langue.level}
                  </span>
                </div>
              </div>
            ))
          )}
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
