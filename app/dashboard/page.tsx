"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/User";
import axios from "axios";
import Link from "next/link";
import "../styles/globals.css";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import("../loading"));
const DynamicArrow = dynamic(
  () => import("@mui/icons-material/ArrowForwardIos")
);
const DynamicPersonIcon = dynamic(() => import("@mui/icons-material/Person"));
const DynamicCalendarMonthIcon = dynamic(
  () => import("@mui/icons-material/CalendarMonth")
);
const DynamicEmailIcon = dynamic(() => import("@mui/icons-material/Email"));
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
    <div className="flex items-center mt-9 gap-14 flex-col min-h-screen">
      <p className="font-bold text-5xl">Profile</p>
      <section className="w-2/5 flex flex-col gap-4">
        <span className="font-bold text-xl">Informations personnelles</span>
        <Link href="/dashboard/coordonnees">
          <section className="flex justify-between p-5 rounded-md border hover:bg-opacity-100 bg-opacity-60 bg-neutral-300 w-full gap-2 cursor-pointer transition duration-300">
            <section className="flex flex-col gap-2 ">
              <div className="flex items-center gap-3">
                <DynamicPersonIcon fontSize="small" />
                <span className="text-sm">{data?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <DynamicEmailIcon fontSize="small" />
                <span className="text-sm">{data?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <DynamicCalendarMonthIcon fontSize="small" />
                <span className="text-sm">{data?.birthdate}</span>
              </div>
            </section>
            <div className="mt-6">
              <DynamicArrow sx={{ fontSize: 15 }} />
            </div>
          </section>
        </Link>
      </section>
      <section className="w-2/5 flex flex-col gap-4">
        <span className="font-bold text-xl">Résumé</span>
        <Link href="/dashboard/resume">
          <section className="flex justify-between p-5 rounded-md border bg-neutral-300 w-full gap-2 cursor-pointer hover:bg-opacity-100 bg-opacity-60 transition duration-300">
            <section className="flex flex-col gap-2 ">
              <span className="font-semibold">Résumé Everience</span>
              <span className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </section>
            <div className="mt-3">
              <DynamicArrow sx={{ fontSize: 15 }} />
            </div>
          </section>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
