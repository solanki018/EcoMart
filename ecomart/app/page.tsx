"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const navigatedRef = useRef(false);

  useEffect(() => {
    // Automatically trigger slide up animation and navigate
    const timer = setTimeout(() => {
      if (navigatedRef.current) return;
      navigatedRef.current = true;

      // Navigate after animation completes
      setTimeout(() => {
        router.push("/login");
      }, 1200); // match duration of slide up animation
    }, 3000); // 3s initial animation

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white overflow-hidden relative">
      {/* Wrapper for sliding everything up */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-120vh" }} // slide up entire content
        transition={{ duration: 1.2, ease: "easeInOut", delay: 3 }}
        className="absolute w-full flex flex-col items-center justify-center"
      >
        {/* Soft glow behind text */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-[#EC4899]/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Brand Name */}
        <h1 className="text-7xl md:text-8xl font-extrabold relative z-10 text-center">
          Eco
          <span className="text-[#EC4899] drop-shadow-[0_0_15px_#EC4899]">M</span>
          art
        </h1>

        {/* Tagline */}
        <motion.p
          className="mt-6 text-lg text-gray-400 z-10 text-center px-4 md:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Buy • Sell • Save — Only at{" "}
          <span className="text-[#EC4899]">EcoMart</span>
        </motion.p>

        {/* Random floating dots */}
        {Array.from({ length: 25 }).map((_, i) => {
          const size = Math.random() * 4 + 2;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const moveX = Math.random() * 200 - 100;
          const moveY = Math.random() * 200 - 100;
          const duration = Math.random() * 8 + 4;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#EC4899] shadow-[0_0_12px_#EC4899]"
              style={{
                width: size,
                height: size,
                top: `${startY}%`,
                left: `${startX}%`,
              }}
              animate={{
                x: [0, moveX, -moveX, 0],
                y: [0, moveY, -moveY, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </motion.div>

      {/* Scroll Icon stays bottom center */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-[#EC4899]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </main>
  );
}
