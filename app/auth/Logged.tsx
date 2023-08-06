"use client";

import { signOut } from "next-auth/react";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UserDropdown } from "../utils/userDropdown";
import Link from "next/link";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Logout = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex justify-center gap-10 mr-5 relative">
      <div className="cursor-pointer border-b-2 border-transparent flex transition duration-300 items-center p-2 hover:opacity-70 ">
        <MessageIcon fontSize="medium" sx={{ fontSize: 25, color: "white" }} />
      </div>
      <div className="cursor-pointer border-b-2 border-transparent flex transition duration-300 items-center px-2 hover:opacity-70 ">
        <NotificationsIcon
          fontSize="medium"
          sx={{ fontSize: 25, color: "white" }}
        />
      </div>
      <div
        onClick={() => setToggle((prevToggle) => !prevToggle)}
        className="cursor-pointer border-b-2 border-transparent flex transition duration-300 items-center px-2 hover:opacity-70 "
      >
        <PersonIcon fontSize="medium" sx={{ fontSize: 25, color: "white" }} />
      </div>
      {toggle && (
        <ul className="absolute bg-white right-0 mt-14 py-2 px-4 rounded-md transition duration-300 shadow-lg border border-zinc-500 w-full z-50">
          <div className="-rotate-90 absolute -top-3.5 right-3">
            <PlayArrowIcon sx={{ fontSize: 20, color: "white" }} />
          </div>
          {UserDropdown.map((item) => (
            <Link href={item.path} key={item.title}>
              <li
                className="cursor-pointer block p-2 text-gray-800 hover:bg-gray-200 transition duration-300 "
                onClick={() => setToggle((prevToggle) => !prevToggle)}
              >
                {item.title}
              </li>
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="  cursor-pointer block p-2 text-gray-800 hover:bg-gray-200 transition duration-300"
          >
            Se déconnecter
          </button>
        </ul>
      )}
    </div>
  );
};

export default Logout;
