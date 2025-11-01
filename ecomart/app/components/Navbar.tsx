"use client";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, Menu, X, HandHeart, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  // 🧹 Handle logout and session clear
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    setShowLogoutConfirm(false);
    router.push("/login"); // 👈 redirect to login page
  };

  return (
    <>
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
            { name: "Donation", link: "/donation" },
            { name: "Contact Us", link: "/contact" },
            { name: "About Us", link: "/about" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.link}
                className="hover:text-[#5A7F51] transition font-medium flex items-center gap-1"
              >
                {item.name === "Donation" && (
                  <HandHeart className="w-4 h-4 text-[#5A7F51]" />
                )}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile + Logout */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/profil">
            <UserCircle className="w-7 h-7 cursor-pointer hover:text-[#5A7F51] transition" />
          </Link>

          {/* 🚪 Logout Icon */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="hover:text-[#5A7F51] transition"
            title="Logout"
          >
            <LogOut className="w-6 h-6 cursor-pointer" />
          </button>
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
                { name: "Donation", link: "/donation" },
                { name: "Contact Us", link: "/contact" },
                { name: "About Us", link: "/about" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="hover:text-[#5A7F51] transition flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name === "Donation" && (
                    <HandHeart className="w-5 h-5 text-[#5A7F51]" />
                  )}
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

              {/* 🚪 Logout inside mobile */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="flex items-center gap-2 hover:text-[#5A7F51] transition"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 🔒 Logout Confirmation Popup */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black/50 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#F4F3EF] p-8 rounded-3xl shadow-2xl text-center border border-[#A28E74]"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              <h2 className="text-xl font-bold mb-3 text-[#2F3E2F]">
                Confirm Logout?
              </h2>
              <p className="text-[#2F3E2F]/70 mb-6">
                Are you sure you want to end your session?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: "#5A7F51" }}
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-6 py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: "#A28E74" }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
