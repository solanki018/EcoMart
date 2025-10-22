"use client";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Content Section */}
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center w-full px-4 mt-12 sm:mt-16"
      >
        {/* Category Tabs */}
        <CategoryTabs />

        {/* Product Section */}
        <div className="mt-12 w-full max-w-7xl px-4 md:px-8">
          <h3 className="text-lg tracking-wider text-gray-300 uppercase mb-4">
            Featured Items
          </h3>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
