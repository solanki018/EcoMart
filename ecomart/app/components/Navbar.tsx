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
      className="fixed w-full z-50 flex justify-between items-center 
      px-6 md:px-8 py-4 
      bg-[#F4F3EF]/70 backdrop-blur-xl 
      border-b border-[#A28E74] 
      text-[#2F3E2F] shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
    >
      {/* Logo */}
      <Link href="/home" className="text-2xl font-bold tracking-wide">
        Eco
        <span className="text-[#5A7F51] font-extrabold">M</span>
        art
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-10 text-sm absolute left-1/2 transform -translate-x-1/2">
        {[
          { name: "How to Use", link: "/howtouse" },
          { name: "Sell", link: "/sell1" },
          { name: "Contact Us", link: "/contact" },
          { name: "About Us", link: "/about" },
        ].map((item) => (
          <li key={item.name}>
            <Link
              href={item.link}
              className="hover:text-[#5A7F51] transition font-medium"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Profile */}
      <div className="hidden md:flex items-center">
        <Link href="/profil">
          <UserCircle className="w-7 h-7 cursor-pointer hover:text-[#5A7F51] transition" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full 
            bg-[#FAF9F6]/95 border-b border-[#A28E74] 
            text-[#2F3E2F] flex flex-col md:hidden 
            p-4 space-y-5 font-medium"
          >
            {[
              { name: "How to Use", link: "/howtouse" },
              { name: "Sell", link: "/sell1" },
              { name: "Contact Us", link: "/contact" },
              { name: "About Us", link: "/about" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="hover:text-[#5A7F51] transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/profil"
              className="flex items-center gap-2 hover:text-[#5A7F51] transition"
              onClick={() => setMenuOpen(false)}
            >
              <UserCircle className="w-6 h-6" /> Profile
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
