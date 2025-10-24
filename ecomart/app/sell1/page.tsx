"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

const SellPage: React.FC = () => {
  const [product, setProduct] = useState<Omit<Product, "_id" | "sold" | "ownerId" | "ownerName" | "ownerEmail" | "ownerPhone">>({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    token: string;
  } | null>(null);

  // Decode user info from JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const userData = JSON.parse(atob(token.split(".")[1]));
    setCurrentUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      token,
    });
  }, []);

  // Fetch current user's products
  useEffect(() => {
    if (!currentUser) return;
    const fetchMyProducts = async () => {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data: Product[] = await res.json();
      setMyProducts(data.filter((p) => p.ownerId === currentUser.id));
    };
    fetchMyProducts();
  }, [currentUser]);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setProduct({ ...product, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  // Submit product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert("Please login first.");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        const newProduct = await res.json();
        setMyProducts((prev) => [...prev, newProduct]);
        setProduct({ title: "", description: "", price: 0, category: "", image: "" });
        alert("✅ Product uploaded!");
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
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12">
          Market<span className="text-[#EC4899]">Place</span>
        </h1>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 sm:p-12 rounded-3xl border border-gray-800 shadow-xl grid gap-6">
          <input type="text" name="title" placeholder="Product Title" value={product.title} onChange={handleChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl text-lg w-full" required />
          <textarea name="description" placeholder="Description" rows={5} value={product.description} onChange={handleChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl text-lg w-full" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl text-lg w-full" required />
            <select name="category" value={product.category} onChange={handleChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl text-lg w-full" required>
              <option value="">Select Category</option>
              <option value="cycles">Cycles</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="misc">Miscellaneous</option>
            </select>
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="bg-[#111] border border-gray-700 p-4 rounded-xl cursor-pointer w-full" required />
          <motion.button whileHover={{ scale: 1.05 }} type="submit" className="mt-4 sm:mt-6 bg-[#EC4899] text-white font-semibold py-4 text-lg rounded-xl hover:bg-[#d63684] transition w-full">
            Upload Product
          </motion.button>
          <p className="text-red-500 text-sm text-center mt-1">
            *Name, email, and phone will be automatically used from your profile
          </p>
        </form>

        {/* My Products Section */}
        {myProducts.length > 0 && currentUser && (
          <div className="mt-12 sm:mt-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">My Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myProducts.map((p) => (
                <ProductCard key={p._id} item={p} currentUserId={currentUser.id} token={currentUser.token} currentUserName={currentUser.name} currentUserEmail={currentUser.email} setMyProducts={setMyProducts} />
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
