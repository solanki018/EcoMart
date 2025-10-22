"use client";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="/panda.jpeg"
        alt="EcoMart Mascot"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
          Your Campus Thrift Zone
        </h2>
        <p className="mt-2 text-base md:text-lg text-gray-300">
          Buy · Sell · Reuse — Sustainably on Campus
        </p>
      </div>
    </motion.section>
  );
};

export default HeroSection;
