"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <button
      onClick={() => signIn()}
      className=" bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ml-28 duration-300"
    >
      S'identifier
    </button>
  );
};

export default Login;
