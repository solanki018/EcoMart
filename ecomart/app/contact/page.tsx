"use client";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white">
      <Navbar />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow max-w-4xl mx-auto px-6 py-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Contact <span className="text-[#EC4899]">Us</span>
        </h1>
        <p className="text-gray-300 mb-10">
          Have questions, feedback, or ideas? We’d love to hear from you!  
          Fill out the form below and our team will get back to you soon.
        </p>

        <form className="grid gap-6 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-[#1a1a1a] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899] text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-[#1a1a1a] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899] text-white"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="bg-[#1a1a1a] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899] text-white"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#EC4899] text-white font-semibold py-3 rounded-lg hover:bg-[#d63684] transition"
          >
            Send Message
          </motion.button>
        </form>
      </motion.section>

      <Footer />
    </div>
  );
};

export default ContactPage;
