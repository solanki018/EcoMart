"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Upload, Tag, UserCheck } from "lucide-react";

const colors = {
  bgTop: "#FAF9F6",
  bgBottom: "#D8CAB3",
  primary: "#5A7F51",
  secondary: "#C9D7A7",
  shadow: "#A28E74",
  text: "#2F3E2F",
};

const HowToUsePage: React.FC = () => {
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow max-w-5xl mx-auto px-6 py-20"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          How to <span style={{ color: colors.primary }}>Use</span> This Platform
        </h1>

        {/* Selling */}
        <div
          className="p-8 rounded-3xl shadow-md mb-12 transition"
          style={{
            backgroundColor: "white",
            border: `1px solid ${colors.shadow}`,
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <Upload style={{ color: colors.primary }} />
            <h2 className="text-2xl font-bold">Selling Products</h2>
          </div>

          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>
              Visit the <span style={{ color: colors.primary }}>Sell Page</span>.
            </li>
            <li>
              Upload a product with title, price, image & details.
            </li>
            <li>
              Click <span style={{ color: colors.primary }}>Upload Product</span> to publish it.
            </li>
            <li>
              Manage your items from{" "}
              <span style={{ color: colors.primary }}>My Products</span>.
            </li>
            <li>
              Update product as{" "}
              <span style={{ color: colors.primary }}>Sold</span> when sold.
            </li>
          </ul>
        </div>

        {/* Buying */}
        <div
          className="p-8 rounded-3xl shadow-md transition"
          style={{
            backgroundColor: "white",
            border: `1px solid ${colors.shadow}`,
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <ShoppingBag style={{ color: colors.primary }} />
            <h2 className="text-2xl font-bold">Buying Products</h2>
          </div>

          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>
              Browse items on the{" "}
              <span style={{ color: colors.primary }}>Home / Products</span> page.
            </li>
            <li>Find something you love and view its details.</li>
            <li>
              Click <span style={{ color: colors.primary }}>Buy</span> to send your request.
            </li>
            <li>Seller receives your info & contacts you.</li>
            <li>
              Once confirmed, seller marks the item as{" "}
              <span style={{ color: colors.primary }}>Sold</span>.
            </li>
          </ul>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default HowToUsePage;
