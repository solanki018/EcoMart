"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

const SellPage: React.FC = () => {
  const [product, setProduct] = useState<Omit<Product, "_id" | "sold">>({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    ownerId: "",
    ownerName: "",
  });

  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; token: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const userData = JSON.parse(atob(token.split(".")[1]));
    setCurrentUser({ id: userData.id, name: userData.name, token });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const fetchMyProducts = async () => {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data: Product[] = await res.json();
      setMyProducts(data.filter((p) => p.ownerId === currentUser.id));
    };
    fetchMyProducts();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProduct({ ...product, image: url });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert("Please login first.");
    try {
      const body = { ...product, ownerId: currentUser.id, ownerName: currentUser.name, sold: false };
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${currentUser.token}` },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        alert("✅ Product uploaded!");
        setProduct({ title: "", description: "", price: 0, category: "", image: "", ownerId: "", ownerName: "" });
        window.location.reload();
      } else {
        const errorText = await res.text();
        console.error("Upload failed:", errorText);
        alert("❌ Failed to upload product.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ An error occurred while uploading the product.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white">
      <Navbar />
      <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex-grow max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-extrabold text-center mb-12">Sell Your <span className="text-[#EC4899]">Product</span></h1>
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-12 rounded-3xl border border-gray-800 shadow-xl grid gap-8">
          <input type="text" name="title" placeholder="Product Title" value={product.title} onChange={handleChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl text-lg" />
          <textarea name="description" placeholder="Description" rows={5} value={product.description} onChange={handleChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl text-lg" />
          <div className="grid md:grid-cols-2 gap-8">
            <input type="number" name="price" placeholder="Price ($)" value={product.price} onChange={handleChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl text-lg" />
            <select name="category" value={product.category} onChange={handleChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl text-lg">
              <option value="">Select Category</option>
              <option value="cycles">Cycles</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="misc">Miscellaneous</option>
            </select>
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl cursor-pointer" />
          <motion.button whileHover={{ scale: 1.05 }} type="submit" className="mt-6 bg-[#EC4899] text-white font-semibold py-4 text-lg rounded-xl hover:bg-[#d63684] transition">Upload Product</motion.button>
        </form>

        {myProducts.length > 0 && currentUser && (
          <div className="mt-20">
            <h2 className="text-4xl font-bold mb-10 text-center">My Products</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {myProducts.map((p) => (
                <ProductCard key={p._id} item={p} currentUserId={currentUser.id} token={currentUser.token} onUpdate={(upd) => setMyProducts((prev) => prev.map((pr) => (pr._id === upd._id ? upd : pr)))} onDelete={(id) => setMyProducts((prev) => prev.filter((pr) => pr._id !== id))} />
              ))}
            </div>
          </div>
        )}
      </motion.section>
      <Footer />
    </div>
  );
};

export default SellPage;
``
