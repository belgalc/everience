"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
const DynamicLocation = dynamic(() => import("@mui/icons-material/LocationOn"));
const DynamicFacebook = dynamic(() => import("@mui/icons-material/Facebook"));
const DynamicInstagram = dynamic(() => import("@mui/icons-material/Instagram"));
const DynamicTwitter = dynamic(() => import("@mui/icons-material/Twitter"));
const DynamicLinkedIn = dynamic(() => import("@mui/icons-material/LinkedIn"));
const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 px-24 h-20 w-full flex justify-between items-center">
      <div className="text-center">
        <Image
          src="/cropped-Everience-logo-final.png"
          alt="everience"
          width="180"
          height="60"
          placeholder="blur"
          blurDataURL="URL"
        />
      </div>
      <section className="flex mr-56">
        <DynamicLocation sx={{ color: "gray" }} />
        <p>21 rue Jérusalem، SANA Business Center, Tunis 1002</p>
      </section>
      <section className="flex gap-3">
        <div className="opacity-75 cursor-pointer hover:opacity-100 transition duration-300">
          <DynamicFacebook sx={{ color: "gray" }} />
        </div>
        <div className="opacity-75 cursor-pointer hover:opacity-100 transition duration-300">
          <DynamicInstagram sx={{ color: "gray" }} />
        </div>
        <div className="opacity-75 cursor-pointer hover:opacity-100 transition duration-300">
          <DynamicTwitter sx={{ color: "gray" }} />
        </div>
        <div className="opacity-75 cursor-pointer hover:opacity-100 transition duration-300">
          <DynamicLinkedIn sx={{ color: "gray" }} />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
