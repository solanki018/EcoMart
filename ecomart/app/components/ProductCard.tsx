"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Product } from "../types/product";

interface Props {
  item: Product;
  currentUserId: string;
  token: string;
  currentUserName: string;
  currentUserEmail: string;
  setMyProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductCard: React.FC<Props> = ({
  item,
  currentUserId,
  token,
  currentUserName,
  currentUserEmail,
  setMyProducts,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isOwner = currentUserId === item.ownerId;

  const toggleSold = async () => {
    if (!isOwner) return alert("Only owner can update!");
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: item._id, sold: !item.sold }),
      });
      const updated = await res.json();
      setMyProducts((prev) => prev.map((p) => (p._id === item._id ? updated : p)));
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: item._id }),
      });
      setMyProducts((prev) => prev.filter((p) => p._id !== item._id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  const handleBuyClick = () => {
    if (!isOwner && !item.sold) setIsBuyModalOpen(true);
  };

  const handleBuySubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: currentUserName,
          buyerEmail: currentUserEmail,
          productId: item._id,
          productTitle: item.title,
          message,
          ownerId: item.ownerId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsBuyModalOpen(false);
        setMessage("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000); // auto hide after 2s
      } else {
        alert(data.error || "Failed to send purchase request");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending purchase request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-[#1a1a1a] rounded-2xl p-4 shadow-md border border-gray-800 flex flex-col items-center w-full max-w-sm mx-auto"
      >
        <img src={item.image} alt={item.title} className="rounded-lg object-cover w-full h-48" />
        <div className="w-full mt-2 flex justify-between items-center text-sm">
          <span className="font-semibold">{item.title}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-400 hover:text-[#EC4899] font-medium text-xs"
          >
            View Details
          </button>
        </div>
        <div className="w-full mt-3 flex justify-between items-center">
          <span className="text-gray-300 font-semibold text-sm">Rs. {item.price}</span>
          {isOwner ? (
            <div className="flex gap-2">
              <button
                onClick={toggleSold}
                className="px-2 py-1 text-xs rounded-md bg-[#EC4899] hover:bg-[#d63684] transition"
              >
                {item.sold ? "Available" : "Mark Sold"}
              </button>
              <button
                onClick={handleDelete}
                className="px-2 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              disabled={item.sold}
              onClick={handleBuyClick}
              className={`px-3 py-1 text-sm rounded-md transition ${
                item.sold
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
              }`}
            >
              {item.sold ? "Sold" : "Buy"}
            </button>
          )}
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#1a1a1a] p-8 rounded-3xl w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-2xl mb-6" />
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <p className="text-lg font-semibold text-[#EC4899] mb-2">Price: Rs {item.price}</p>
              <p className="text-gray-400 text-sm mb-1">Category: {item.category}</p>
              <p className="text-gray-400 text-sm mb-1">Owner: {item.ownerName}</p>
              <p className="text-gray-400 text-sm mb-1">📧 Email: {item.ownerEmail || "Not provided"}</p>
              <p className="text-gray-400 text-sm">📞 Phone: {item.ownerPhone || "Not provided"}</p>
            </motion.div>
          </motion.div>
        )}

        {isBuyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            onClick={() => setIsBuyModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#1a1a1a] p-8 rounded-3xl w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsBuyModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">Send Purchase Request</h2>
              <input
                type="text"
                value={currentUserName}
                disabled
                className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white"
              />
              <input
                type="email"
                value={currentUserEmail}
                disabled
                className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message to owner"
                className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white"
              />
              <button
                onClick={handleBuySubmit}
                disabled={loading}
                className="w-full bg-[#10B981] hover:bg-[#059669] py-3 rounded-xl font-semibold text-white"
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Animated Success Popup */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="bg-[#111] p-8 rounded-3xl flex flex-col items-center shadow-xl"
              >
                {/* Tick Animation */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                  className="w-16 h-16 mb-4"
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                    d="M14 27 l7 7 l17 -17"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                </motion.svg>
                <p className="text-white text-lg font-semibold">Message Sent!</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
