"use client";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Leaf, Recycle, Users } from "lucide-react";

const colors = {
  bgTop: "#FAF9F6",
  bgBottom: "#E2DACC",
  primary: "#5A7F51",
  accent: "#7BA66A",
  shadow: "#A28E74",
  text: "#2F3E2F",
};

const AboutPage: React.FC = () => {
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
        className="flex-grow max-w-5xl mx-auto px-6 py-20 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-10">
          About <span style={{ color: colors.primary }}>EcoMart</span>
        </h1>

        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          EcoMart is an{" "}
          <span style={{ color: colors.primary, fontWeight: 600 }}>
            on-campus sustainability initiative
          </span>{" "}
          developed at IIT Ropar that promotes the reuse and responsible
          exchange of pre-owned items among students, staff, and faculty. The
          idea is simple —{" "}
          <span style={{ color: colors.accent, fontWeight: 600 }}>
            “give a new life to old things.”
          </span>
        </p>

        <p className="mt-6 text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
          Through EcoMart, people can donate, exchange, or purchase used goods
          such as books, cycles, electronics, furniture, and more — all in good
          condition. It’s a digital thrift platform designed especially for IIT
          Ropar to minimize waste while making essentials accessible and
          affordable.
        </p>

        <p className="mt-6 text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
          At its core, EcoMart aims to create a{" "}
          <span style={{ color: colors.primary, fontWeight: 600 }}>
            self-sustaining circular economy
          </span>{" "}
          inside the institute — where one person’s unused item becomes another
          person’s useful resource.
        </p>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-10 mt-20">
          {[
            {
              title: "Sustainability",
              icon: <Recycle size={42} />,
              desc: "Reduce waste and promote reuse across the campus.",
            },
            {
              title: "Affordability",
              icon: <Leaf size={42} />,
              desc: "Pre-owned items in great condition at fair, student-friendly prices.",
            },
            {
              title: "Community",
              icon: <Users size={42} />,
              desc: "Bringing IIT Ropar together through mindful exchange.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl shadow-xl border transition-all"
              style={{
                background: "#FFFFFF",
                borderColor: colors.shadow,
                boxShadow: `0 8px 16px rgba(90, 127, 81, 0.1)`,
              }}
            >
              <div
                className="mb-4 flex justify-center"
                style={{ color: colors.primary }}
              >
                {card.icon}
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: colors.primary }}
              >
                {card.title}
              </h3>
              <p className="text-sm opacity-80">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-xl italic opacity-90"
          style={{ color: colors.text }}
        >
         
        </motion.p>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutPage;
