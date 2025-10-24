"use client";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed w-full z-50 flex justify-between items-center px-6 md:px-8 py-4 bg-black/90 backdrop-blur-lg border-b border-gray-800"
    >
      {/* Logo */}
      <Link href="/home" className="text-2xl font-bold tracking-wide">
        Eco
        <span className="text-[#EC4899] drop-shadow-[0_0_10px_#EC4899]">M</span>
        art
      </Link>

      {/* Desktop Links - Centered */}
      <ul className="hidden md:flex space-x-8 text-sm absolute left-1/2 transform -translate-x-1/2 items-center">
        <li>
          <Link href="/howtouse" className="hover:text-[#EC4899] transition">
            How to Use
          </Link>
        </li>
        <li>
          <Link href="/sell1" className="hover:text-[#EC4899] transition">
            Sell
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-[#EC4899] transition">
            Contact Us
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-[#EC4899] transition">
            About Us
          </Link>
        </li>
      </ul>

      {/* Profile Icon - Right */}
      <div className="hidden md:flex items-center">
        <Link href="/profil">
          <UserCircle className="w-6 h-6 cursor-pointer hover:text-[#EC4899]" />
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 border-b border-gray-800 flex flex-col md:hidden p-4 space-y-3"
          >
            <Link href="/howtouse" className="hover:text-[#EC4899] transition" onClick={() => setMenuOpen(false)}>
              How to Use
            </Link>
            <Link href="/sell1" className="hover:text-[#EC4899] transition" onClick={() => setMenuOpen(false)}>
              Sell
            </Link>
            <Link href="/contact" className="hover:text-[#EC4899] transition" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
            <Link href="/about" className="hover:text-[#EC4899] transition" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/profil" className="hover:text-[#EC4899] transition flex items-center" onClick={() => setMenuOpen(false)}>
              <UserCircle className="w-6 h-6 mr-2" /> Profile
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
