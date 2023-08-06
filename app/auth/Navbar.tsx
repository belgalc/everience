"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import Logout from "./Logged";

import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import getScrollY from "../utils/getScrollY";
interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const pathname = usePathname();
  const scrollY = getScrollY();
  const display = () => {
    if (pathname === "/") {
      return scrollY >= 90 ? "bg-slate-500 h-16" : "h-24";
    } else return "bg-slate-500 h-16";
  };

  return (
    <header
      className={`flex justify-between items-center px-24 w-full  ${display()} sticky top-0 z-50 transition duration-400 `}
    >
      <Link href="https://everience.com" target="_blank">
        <Image
          src="/colored-logo-everience-white.png"
          alt="everience"
          width="180"
          height="60"
          placeholder="blur"
          blurDataURL="URL"
          style={{ width: "70%", height: "auto" }}
        />
      </Link>
      <nav className="mr-96 ">
        <ul className="flex flex-row gap-12">
          <li className=" border-transparent text-white hover:text-blue-400 transition duration-300">
            <Link href="/">Accueil</Link>
          </li>
          <li className="border-transparent text-white hover:text-blue-400 transition duration-300">
            <Link href="emplois">Emplois</Link>
          </li>
        </ul>
      </nav>
      {session?.user ? <Logout /> : <Login />}
    </header>
  );
};
export default Navbar;
