"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Product } from "../types/product";

interface Props {
  item: Product;
  currentUserId: string;
  token: string; // JWT token
  onUpdate?: (updated: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<Props> = ({ item, currentUserId, token, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOwner = currentUserId === item.ownerId;

  const toggleSold = async () => {
    if (!isOwner) return alert("Only owner can update!");
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: item._id, sold: !item.sold }),
      });
      const updated = await res.json();
      onUpdate && onUpdate(updated);
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  const handleDelete = async () => {
    if (!isOwner) return alert("Only owner can delete!");
    if (!confirm("Delete this product?")) return;
    try {
      await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: item._id }),
      });
      onDelete && onDelete(item._id!);
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  const handleBuy = () => {
    if (!isOwner && !item.sold) alert("Purchase request sent! (mock)");
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} className="bg-[#1a1a1a] rounded-2xl p-4 shadow-md border border-gray-800 flex flex-col items-center w-full max-w-sm mx-auto">
        <img src={item.image} alt={item.title} className="rounded-lg object-cover w-full h-48" />
        <div className="w-full mt-2 flex justify-between items-center text-sm">
          <span className="font-semibold">{item.title}</span>
          <button onClick={() => setIsModalOpen(true)} className="text-gray-400 hover:text-[#EC4899] font-medium">View Details</button>
        </div>
        <div className="w-full mt-3 flex justify-between items-center">
          <span className="text-gray-300 font-semibold">${item.price}</span>
          {isOwner ? (
            <div className="flex gap-2">
              <button onClick={toggleSold} className={`px-3 py-1 rounded-md bg-[#EC4899] hover:bg-[#d63684] transition`}>
                {item.sold ? "Mark Available" : "Mark Sold"}
              </button>
              <button onClick={handleDelete} className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition">Delete</button>
            </div>
          ) : (
            <button
              disabled={item.sold}
              onClick={handleBuy}
              className={`px-3 py-1 rounded-md transition ${item.sold ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"}`}
            >
              {item.sold ? "Sold" : "Buy"}
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex justify-center items-center z-50" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-[#1a1a1a] p-8 rounded-3xl w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto shadow-xl relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold">✕</button>
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-2xl mb-6" />
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <p className="text-lg font-semibold text-[#EC4899] mb-2">Price: ${item.price}</p>
              <p className="text-gray-400 text-sm">Category: {item.category}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
