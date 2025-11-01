"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    token: string;
    email: string;
  } | null>(null);

  // 🔹 Load current user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      setCurrentUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token,
      });
    }
  }, []);

  // 🔹 Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setFiltered(
      cat === "All"
        ? products
        : products.filter(
            (p) => p.category?.toLowerCase() === cat.toLowerCase()
          )
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F3EF] text-[#2F3E2F] transition-all">
      <Navbar />

      <HeroSection />

      <motion.main
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center pb-28"
      >
        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="mt-16 w-full">
          <h3 className="text-xl font-semibold tracking-wide text-[#5A7F51] mb-6 pl-1">
            {selectedCategory === "All"
              ? "🌿 Recommended Products"
              : `🌱 ${selectedCategory}`}
          </h3>

          {/* Product Display Area */}
          {loading ? (
            <p className="text-[#2F3E2F]/50 text-center py-14">
              Loading products...
            </p>
          ) : error ? (
            <p className="text-red-600 text-center py-14">{error}</p>
          ) : filtered.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {filtered.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    currentUserId={currentUser?.id || ""}
                    token={currentUser?.token || ""}
                    currentUserName={currentUser?.name || ""}
                    currentUserEmail={currentUser?.email || ""}
                    setMyProducts={setProducts}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <p className="text-[#2F3E2F]/50 text-center py-14">
              No products available here yet.
            </p>
          )}
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default HomePage;
