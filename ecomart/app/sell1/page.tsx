"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

const colors = {
  bgTop: "#FAF9F6",
  bgBottom: "#E2DACC",
  primary: "#5A7F51",
  accent: "#7BA66A",
  shadow: "#A28E74",
  text: "#2F3E2F",
};

const SellPage: React.FC = () => {
  const [product, setProduct] = useState<
    Omit<Product, "_id" | "sold" | "ownerId" | "ownerName" | "ownerEmail" | "ownerPhone">
  >({
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

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // ✅ Load token + decode user
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

  // ✅ Fetch current user's products
  useEffect(() => {
    if (!currentUser) return;
    const fetchMyProducts = async () => {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data: Product[] = await res.json();
      setMyProducts(data.filter((p) => p.ownerId === currentUser.id));
    };
    fetchMyProducts();
  }, [currentUser]);

  // ✅ Form handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onloadend = () => setProduct({ ...product, image: reader.result as string });
    reader.readAsDataURL(e.target.files[0]);
  };

  // ✅ Submit form (with animated notification instead of alert)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setNotification({ type: "error", message: "Please login first." });
      return;
    }

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
        setMyProducts([...myProducts, newProduct]);
        setProduct({ title: "", description: "", price: 0, category: "", image: "" });
        setNotification({ type: "success", message: "✅ Product uploaded successfully!" });

        setTimeout(() => setNotification(null), 2500);
      } else {
        setNotification({ type: "error", message: "❌ Failed to upload product." });
        setTimeout(() => setNotification(null), 2500);
      }
    } catch (err) {
      setNotification({ type: "error", message: "❌ Something went wrong!" });
      setTimeout(() => setNotification(null), 2500);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(to bottom, ${colors.bgTop}, ${colors.bgBottom})`,
        color: colors.text,
      }}
    >
      <Navbar />

      {/* ✅ Notification Card (moved near top) */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-2xl shadow-xl text-white text-lg font-semibold z-50 ${
              notification.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow max-w-4xl mx-auto px-6 py-16"
      >
        <h1 className="text-5xl font-extrabold text-center mb-12">
          Market<span style={{ color: colors.primary }}>Place</span>
        </h1>

        {/* ✅ Upload Form */}
<form
  onSubmit={handleSubmit}
  className="p-10 rounded-3xl shadow-xl grid gap-6 mt-8" // <-- added mt-8 for top spacing
  style={{ background: "#FFFFFF", border: `1px solid ${colors.shadow}` }}
>
  <input
    type="text"
    name="title"
    placeholder="Product Title"
    value={product.title}
    onChange={handleChange}
    className="border rounded-xl px-4 py-3 w-full"
    style={{ borderColor: colors.shadow }}
    required
  />

  <textarea
    name="description"
    rows={5}
    placeholder="Description"
    value={product.description}
    onChange={handleChange}
    className="border rounded-xl px-4 py-3 w-full"
    style={{ borderColor: colors.shadow }}
    required
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="number"
      name="price"
      placeholder="Price (₹)"
      value={product.price}
      onChange={handleChange}
      className="border rounded-xl px-4 py-3 w-full"
      style={{ borderColor: colors.shadow }}
      required
    />

    <select
      name="category"
      value={product.category}
      onChange={handleChange}
      className="border rounded-xl px-4 py-3 w-full"
      style={{ borderColor: colors.shadow }}
      required
    >
      <option value="">Select Category</option>
      <option value="cycles">Cycles</option>
      <option value="electronics">Electronics</option>
      <option value="books">Books</option>
      <option value="misc">Others</option>
    </select>
  </div>

  <div>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="border rounded-xl px-4 py-3 cursor-pointer w-full"
      style={{ borderColor: colors.shadow }}
      required
    />
    {/* ✅ Size note below upload */}
    <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
      📸 Please upload an image under <span className="font-medium text-gray-800">1 MB</span>.
    </p>
  </div>

  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    type="submit"
    className="rounded-xl py-3 text-lg font-semibold w-full text-white"
    style={{ background: colors.primary }}
  >
    Upload Product
  </motion.button>

  <p className="text-sm text-center opacity-80">
    * Profile details will be used automatically
  </p>
</form>

        {/* ✅ My Products */}
        {myProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-center mb-8">My Products</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {myProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  item={p}
                  currentUserId={currentUser?.id || ""}
                  token={currentUser?.token || ""}
                  currentUserName={currentUser?.name || ""}
                  currentUserEmail={currentUser?.email || ""}
                  setMyProducts={setMyProducts}
                />
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
