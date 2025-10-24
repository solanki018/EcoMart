"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert(data.error || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="grid gap-6 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899] text-white"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899] text-white"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899] text-white"
            required
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-[#EC4899] text-white font-semibold py-3 rounded-lg hover:bg-[#d63684] transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.section>

      <Footer />
    </div>
  );
};

export default ContactPage;
