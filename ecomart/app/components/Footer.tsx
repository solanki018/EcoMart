"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Clock } from "lucide-react";

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      };
      setTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-0 left-0 w-full h-20 border-t border-gray-800 bg-gradient-to-r from-black via-[#0a0a0a] to-black text-gray-400 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 text-sm shadow-lg backdrop-blur-md z-50"
    >
      {/* Left */}
      <motion.p
        whileHover={{ scale: 1.05 }}
        className="text-center md:text-left"
      >
        Designed & Built with{" "}
        <span className="text-[#EC4899] animate-pulse font-semibold">💖</span>{" "}
        by <span className="text-[#EC4899] font-semibold">Sourabh Solanki</span>
      </motion.p>

      {/* Center */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-xl border border-gray-700 text-gray-300 shadow-md"
      >
        <Clock size={16} className="text-[#EC4899]" />
        <span>{time} IST</span>
      </motion.div>

      {/* Right */}
      <motion.a
        href="mailto:sourabhsolanki1404@gmail.com"
        whileHover={{ scale: 1.05, color: "#EC4899" }}
        className="flex items-center gap-2 hover:text-[#EC4899] transition-all"
      >
        <Mail size={16} /> sourabhsolanki1404@gmail.com
      </motion.a>
    </motion.footer>
  );
};

export default Footer;
