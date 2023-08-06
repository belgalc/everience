// "use client";
// import UserEductaion from "@/app/components/UserEductaion";
// import UserInfos from "../../components/UserInfos";
// import useUserDataFetcher from "../../hooks/useUserDataFetcher";
// import { useState } from "react";
// import UserWork from "@/app/components/UserWork";
// import { User } from "@/app/types/User";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import "../../styles/globals.css";
// const userData = () => {
//   const [visibility, setVisibility] = useState("first");
//   const { data, error, isLoading } = useUserDataFetcher();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     birthdate: "",
//     study: [],
//     work: [],
//   });

//   let taostJobId: string = "hello";
//   const { mutate } = useMutation(
//     async (formData: User) =>
//       await axios.post("/api/users/addUserData", formData),
//     {
//       onError: (error) => {
//         if (error instanceof AxiosError) {
//           toast.error(error?.response?.data.message, { id: taostJobId });
//         }
//       },
//       onSuccess: () => {
//         toast.success("Done", { id: taostJobId });
//         // setTimeout(() => {
//         //   router.push("/dashboard");
//         // }, 1500);
//       },
//     }
//   );
//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     taostJobId = toast.loading("Loading...", {
//       id: taostJobId,
//     });
//     mutate(formData);
//     console.log(formData);
//     localStorage.clear();
//   };
//   const handleDataUpdate = (data: User, section: string) => {
//     let updatedData;
//     // Serialize the data if it's an array
//     if (Array.isArray(data)) {
//       updatedData = data.map((item) => JSON.stringify(item));
//     } else {
//       updatedData = data;
//     }
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: data,
//     }));
//   };
//   const renderedComponent = () => {
//     if (visibility === "first")
//       return (
//         <UserInfos
//           data={data}
//           setVisibility={setVisibility}
//           updateUserData={(data: User) => handleDataUpdate(data, "birthdate")}
//         />
//       );
//     if (visibility === "second")
//       return (
//         <UserEductaion
//           data={data}
//           setVisibility={setVisibility}
//           updateUserData={(data: User) => handleDataUpdate(data, "study")}
//         />
//       );
//     if (visibility === "third")
//       return (
//         <UserWork
//           data={data}
//           setVisibility={setVisibility}
//           updateUserData={(data: User) => handleDataUpdate(data, "work")}
//         />
//       );
//   };
//   if (error) return error;
//   if (isLoading) return "Loading...";
//   return (
//     <form onSubmit={submit}>
//       {renderedComponent()} <button type="submit">aaaaa</button>
//     </form>
//   );
// };

// export default userData;

"use client";

const UserJobs = () => {
  return <div></div>;
};

export default UserJobs;
