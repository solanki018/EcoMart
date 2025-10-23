"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; token: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      setCurrentUser({ id: userData.id, name: userData.name, token });
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error("Error loading products:", err);
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <motion.main initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center w-full px-4 mt-12 sm:mt-16">
        <CategoryTabs />
        <div className="mt-12 w-full max-w-7xl px-4 md:px-8">
          <h3 className="text-lg tracking-wider text-gray-300 uppercase mb-4">Featured Items</h3>
          {loading ? (
            <p className="text-gray-400 text-center">Loading products...</p>
          ) : error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : products.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
              {products.map((item) => (
                <ProductCard key={item._id} item={item} currentUserId={currentUser?.id || ""} token={currentUser?.token || ""} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center col-span-full">No products available yet.</p>
          )}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default HomePage;
