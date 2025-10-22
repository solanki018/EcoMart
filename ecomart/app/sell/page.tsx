"use client";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const SellPage: React.FC = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // Mock user data (to be replaced with actual user context later)
  const user = {
    name: "Sourabh Solanki",
    email: "sourabhsolanki1404@gmail.com",
    contact: "+91 XXXXX XXXXX",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product details submitted:", { ...product, user });
    alert("Product uploaded successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white">
      <Navbar />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow max-w-4xl mx-auto px-6 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10">
          Sell Your <span className="text-[#EC4899]">Product</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 shadow-lg grid gap-6"
        >
          {/* User Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <input
              type="text"
              value={user.name}
              readOnly
              className="bg-[#111] border border-gray-700 p-3 rounded-lg text-gray-400"
            />
            <input
              type="email"
              value={user.email}
              readOnly
              className="bg-[#111] border border-gray-700 p-3 rounded-lg text-gray-400"
            />
            <input
              type="text"
              value={user.contact}
              readOnly
              className="bg-[#111] border border-gray-700 p-3 rounded-lg text-gray-400"
            />
          </div>

          {/* Product Info */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={product.title}
            onChange={handleChange}
            className="bg-[#111] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899]"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            rows={4}
            value={product.description}
            onChange={handleChange}
            className="bg-[#111] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899]"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              value={product.price}
              onChange={handleChange}
              className="bg-[#111] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899]"
            />

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="bg-[#111] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-[#EC4899]"
            >
              <option value="">Select Category</option>
              <option value="cycles">Cycles</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="misc">Miscellaneous</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-gray-400 mb-2 block">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="bg-[#111] border border-gray-700 p-3 rounded-lg cursor-pointer focus:outline-none focus:border-[#EC4899] w-full"
              onChange={(e) =>
                setProduct({
                  ...product,
                  image: e.target.files ? e.target.files[0].name : "",
                })
              }
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-4 bg-[#EC4899] text-white font-semibold py-3 rounded-lg hover:bg-[#d63684] transition"
          >
            Upload Product
          </motion.button>
        </form>
      </motion.section>

      <Footer />
    </div>
  );
};

export default SellPage;
