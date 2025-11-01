"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const colors = {
  bgTop: "#F4F3EF",
  bgBottom: "#D8CAB3",
  primary: "#5A7F51",
  secondary: "#C9D7A7",
  brown: "#A28E74",
  text: "#2F3E2F",
};

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
        alert(data.error || "Failed to send");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(to bottom, ${colors.bgTop}, ${colors.bgBottom})`,
        color: colors.text,
      }}
    >
      <Navbar />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow max-w-4xl mx-auto px-6 py-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Contact <span style={{ color: colors.primary }}>Us</span>
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-10">
          Have questions, feedback, or ideas?  
          We’d love to hear from you! 💬  
          Our team will reply as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            style={{
              backgroundColor: "white",
              borderColor: colors.brown,
              color: colors.text,
            }}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 text-sm"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            style={{
              backgroundColor: "white",
              borderColor: colors.brown,
              color: colors.text,
            }}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 text-sm"
            required
          />

          <textarea
            placeholder="Your Message"
            rows={6}
            value={message}
            style={{
              backgroundColor: "white",
              borderColor: colors.brown,
              color: colors.text,
            }}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 text-sm"
            required
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            className="text-white font-semibold py-3 rounded-lg shadow-md transition"
            style={{ backgroundColor: colors.primary }}
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
