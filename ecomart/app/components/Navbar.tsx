"use client";
import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-lg border-b border-gray-800"
    >
      {/* Logo */}
      <Link href="/home" className="text-2xl font-bold tracking-wide">
        Eco
        <span className="text-[#EC4899] drop-shadow-[0_0_10px_#EC4899]">M</span>
        art
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-sm">
        <li>
          <Link
            href="/sell"
            className="hover:text-[#EC4899] transition cursor-pointer"
          >
            Sell
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-[#EC4899] transition cursor-pointer"
          >
            Contact Us
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-[#EC4899] transition cursor-pointer"
          >
            About Us
          </Link>
        </li>
      </ul>

      {/* Profile Icon */}
      <Link href="/profile">
        <UserCircle className="w-6 h-6 cursor-pointer hover:text-[#EC4899]" />
      </Link>
    </motion.nav>
  );
};

export default Navbar;
