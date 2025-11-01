"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [exitAnim, setExitAnim] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExitAnim(true);
      setTimeout(() => router.push("/login"), 1000); // smooth delay
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AnimatePresence>
      {!exitAnim && (
        <motion.main
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="min-h-screen flex flex-col items-center justify-center 
          bg-[#FAF9F6] text-[#2F3E2F] overflow-hidden relative"
        >
          {/* Smooth background waves */}
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute w-[200%] h-[45%] bg-[#D6E4C3] 
            rounded-t-[45%] bottom-[0%]"
          />
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="absolute w-[200%] h-[40%] bg-[#A9C48E] 
            rounded-t-[50%] bottom-[-3%]"
          />

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-8xl font-bold z-10"
          >
            <span className="text-[#5A7F51]">Eco</span>Mart
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl mt-4 z-10"
          >
            A new life to old things 🌿
          </motion.p>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
