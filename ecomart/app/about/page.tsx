"use client";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white">
      <Navbar />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow max-w-5xl mx-auto px-6 py-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          About <span className="text-[#EC4899]">EcoMart</span>
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
          EcoMart is your campus thrift marketplace — built by students, for students.  
          We make buying, selling, and reusing easy, sustainable, and fun.  
          Our mission is to reduce waste and promote a circular economy within the campus community.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[#EC4899] mb-3">Our Mission</h3>
            <p className="text-gray-400">
              Encourage sustainable habits and reduce waste by promoting campus-level reselling.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[#EC4899] mb-3">Our Vision</h3>
            <p className="text-gray-400">
              Build a connected community where every product finds a new home — sustainably.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[#EC4899] mb-3">Our Team</h3>
            <p className="text-gray-400">
              A passionate group of IIT students dedicated to promoting sustainable campus culture.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutPage;
