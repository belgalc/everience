"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/User";
import axios from "axios";
const userData = () => {
  const getUser = async () => {
    const res = await axios.get("/api/users/getUser");
    return res.data;
  };
  const { data, error, isLoading } = useQuery<User>({
    queryFn: getUser,
    queryKey: ["user"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  return data;
};

export default userData;
