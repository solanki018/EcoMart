"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";

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

  // Load current user from token
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

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err: any) {
        console.error("Error loading products:", err);
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle category filter
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All") setFiltered(products);
    else
      setFiltered(
        products.filter((p) => p.category?.toLowerCase() === cat.toLowerCase())
      );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center w-full px-4 mt-12 sm:mt-16 pb-28"
      >
        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Products Grid */}
        <div className="mt-12 w-full max-w-7xl px-4 md:px-8">
          <h3 className="text-lg tracking-wider text-gray-300 uppercase mb-4">
            {selectedCategory === "All"
              ? "Featured Items"
              : `${selectedCategory} Items`}
          </h3>

          {loading ? (
            <p className="text-gray-400 text-center">Loading products...</p>
          ) : error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : filtered.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center"
              >
                {filtered.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    currentUserId={currentUser?.id || ""}
                    token={currentUser?.token || ""}
                    currentUserName={currentUser?.name || ""}
                    currentUserEmail={currentUser?.email || ""}
                    setMyProducts={setProducts} // ✅ Pass the setter here
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No products found for this category.
            </p>
          )}
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default HomePage;
