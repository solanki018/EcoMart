"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const HowToUsePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white">
      <Navbar />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow max-w-4xl mx-auto px-6 py-20"
      >
        <h1 className="text-5xl font-extrabold text-center mb-12">
          How to <span className="text-[#EC4899]">Use</span> This Platform
        </h1>

        {/* Selling Guide */}
        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Selling Products</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Go to the <span className="text-[#EC4899]">Sell Page</span>.</li>
            <li>Fill in your product details: title, description, price, category, and upload an image.</li>
            <li>Click <span className="text-[#EC4899]">Upload Product</span> to make it visible to everyone.</li>
            <li>Once your product is uploaded, you can see it under <span className="text-[#EC4899]">My Products</span>.</li>
            <li>You can mark your product as <span className="text-[#EC4899]">Sold</span> or delete it anytime.</li>
          </ul>
        </div>

        {/* Buying Guide */}
        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Buying Products</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Go to the <span className="text-[#EC4899]">Home / Products</span> page.</li>
            <li>Browse through available products listed by other users.</li>
            <li>Click the <span className="text-[#EC4899]">Buy</span> button on a product you like.</li>
            <li>An email notification will be sent to the product owner with your interest.</li>
            <li>You can then communicate with the seller to finalize the purchase.</li>
            <li>Once the product is bought, the owner will mark it as <span className="text-[#EC4899]">Sold</span> on the site.</li>
          </ul>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default HowToUsePage;
