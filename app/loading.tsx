"use client";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="bg-purple-700 w-full h-screen flex items-center justify-center z-50 absolute top-0">
      <motion.div
        className="w-32 h-32 bg-slate-100 rounded-sm"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </div>
  );
};

export default Loading;
