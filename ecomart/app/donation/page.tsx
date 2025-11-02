"use client";

import { motion } from "framer-motion";
import { Heart, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DonationPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#F4F3EF] to-[#D8E3C7] overflow-hidden text-[#2F3E2F]">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center px-6 py-24 relative">
        {/* Floating Coins Animation */}
        <motion.div
          className="absolute top-20 left-10 text-4xl opacity-40"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💰
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-3xl opacity-40"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🪙
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/40 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center border border-[#A28E74]/40 w-11/12 md:w-1/2"
        >
          <div className="flex justify-center mb-4">
            <Heart className="w-10 h-10 text-[#5A7F51] animate-pulse" />
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-3 tracking-wide"
          >
            Donation Portal
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-semibold text-[#5A7F51] mb-2"
          >
            Coming Soon...
          </motion.h2>

          <p className="text-base text-[#2F3E2F]/80 mt-2 leading-relaxed">
            We’re working hard to create a way for you to contribute and make an impact.  
            Stay tuned for updates and be ready to make a difference!
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-8 inline-flex items-center gap-2 bg-[#C9D7A7] text-[#2F3E2F] px-6 py-3 rounded-full shadow-md border border-[#A28E74]"
          >
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Launching Soon</span>
          </motion.div>
        </motion.div>

        {/* Glow Effect */}
        <div className="absolute w-[300px] h-[300px] bg-[#5A7F51]/30 rounded-full blur-3xl bottom-10 right-20 animate-pulse"></div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DonationPage;
