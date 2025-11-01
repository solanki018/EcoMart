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
      className="fixed bottom-0 left-0 w-full border-t border-[#A28E74]
        bg-[#F4F3EF]/80 backdrop-blur-xl
        text-[#2F3E2F] flex flex-col md:flex-row justify-center md:justify-between 
        items-center gap-3 md:gap-0
        px-6 md:px-12 py-4 md:py-3
        text-sm shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-50"
    >
      {/* Left Text */}
      <motion.p
        whileHover={{ scale: 1.05 }}
        className="hidden md:flex text-left font-medium"
      >
        Designed & Built by{" "}
        <span className="text-[#5A7F51] font-semibold ml-1">
          IIT Ropar Students
        </span>
      </motion.p>

      {/* Clock */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="flex items-center gap-2 bg-[#C9D7A7] px-5 py-2 rounded-xl 
          border border-[#A28E74] text-[#2F3E2F] shadow-md
          my-2 md:my-0"   // 👈 Adds top & bottom space on mobile
      >
        <Clock size={16} className="text-[#2F3E2F]" />
        <span className="font-semibold">{time} IST</span>
      </motion.div>

      {/* Contact */}
      <motion.a
        href="mailto:2023chb1084@iitrpr.ac.in"
        whileHover={{ scale: 1.05 }}
        className="hidden md:flex items-center gap-2 transition-all 
          text-[#2F3E2F] hover:text-[#5A7F51] font-medium"
      >
        <Mail size={16} /> Reach Us
      </motion.a>
    </motion.footer>
  );
};

export default Footer;
