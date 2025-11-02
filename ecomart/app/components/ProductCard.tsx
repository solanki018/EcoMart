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

const colors = {
  bgLight: "#F4F3EF",
  primary: "#5A7F51",
  secondary: "#C9D7A7",
  beige: "#D8CAB3",
  brown: "#A28E74",
  text: "#2F3E2F",
};

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
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<"delete" | "sold" | null>(null);

  const isOwner = currentUserId === item.ownerId;

  // 🔁 Mark Sold or Available
  const toggleSold = async () => {
    if (!isOwner) return;
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: item._id, sold: !item.sold }),
      });

      if (res.ok) {
        const updated = await res.json();
        setMyProducts((prev) =>
          prev.map((p) => (p._id === item._id ? updated : p))
        );
        setSuccessMessage(item.sold ? "Product marked as Available!" : "Product marked as Sold!");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          window.location.reload();
        }, 1500);
      }
    } catch {
      alert("Error updating product");
    }
  };

  // ❌ Delete Product
  const handleDelete = async () => {
    if (!isOwner) return;
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: item._id }),
      });

      if (res.ok) {
        setMyProducts((prev) => prev.filter((p) => p._id !== item._id));
        setSuccessMessage("Product deleted successfully!");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          window.location.reload();
        }, 1500);
      }
    } catch {
      alert("Error deleting product");
    }
  };

  // 💬 Buy Request Submit
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

      if (res.ok) {
        setIsBuyModalOpen(false);
        setMessage("");
        setSuccessMessage("Purchase request sent successfully!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        alert("Failed to send request");
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmHandler = () => {
    if (confirmAction === "delete") handleDelete();
    else if (confirmAction === "sold") toggleSold();
    setConfirmAction(null);
  };

  return (
    <>
      {/* 🛒 Product Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="rounded-2xl p-4 shadow-lg border mx-auto w-full max-w-sm"
        style={{
          backgroundColor: colors.bgLight,
          borderColor: colors.secondary,
          color: colors.text,
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="rounded-lg object-cover w-full h-48 border"
          style={{ borderColor: colors.beige }}
        />

        <div className="w-full mt-3 flex justify-between items-center">
          <span className="font-bold">{item.title}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm underline hover:opacity-70"
            style={{ color: colors.primary }}
          >
            View Details
          </button>
        </div>

        <div className="w-full mt-3 flex justify-between items-center">
          <span className="font-semibold" style={{ color: colors.primary }}>
            ₹ {item.price}
          </span>

          {isOwner ? (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmAction("sold")}
                style={{
                  backgroundColor: item.sold ? colors.secondary : colors.primary,
                  color: colors.text,
                }}
                className="px-2 py-1 text-xs rounded-md hover:opacity-80"
              >
                {item.sold ? "Mark Available" : "Mark Sold"}
              </button>

              <button
                onClick={() => setConfirmAction("delete")}
                className="px-2 py-1 text-xs rounded-md hover:opacity-80"
                style={{ backgroundColor: colors.brown, color: "white" }}
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsBuyModalOpen(true)}
              disabled={item.sold}
              className="px-3 py-1 text-sm rounded-md hover:opacity-90"
              style={{
                backgroundColor: item.sold ? "#BABABA" : colors.primary,
                color: item.sold ? "#666" : "white",
              }}
            >
              {item.sold ? "Sold" : "Buy"}
            </button>
          )}
        </div>
      </motion.div>

      {/* 🪟 View Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="p-6 rounded-3xl w-11/12 md:w-1/2 relative"
              style={{
                backgroundColor: colors.bgLight,
                color: colors.text,
              }}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-lg font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>

              <div className="w-full flex justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-contain rounded-xl border"
                  style={{ borderColor: colors.beige }}
                />
              </div>

              <div className="text-left">
                <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="font-semibold text-lg mb-4 text-green-700">
                  Price: ₹{item.price}
                </p>

                <div className="text-sm space-y-1 border-t border-gray-300 pt-3 mt-3">
                  <p><strong>Category:</strong> {item.category || "Not specified"}</p>
                  <p><strong>Owner:</strong> {item.ownerName || "Unknown"}</p>
                  <p><strong>📧 Email:</strong> {item.ownerEmail || "Not provided"}</p>
                  <p><strong>📞 Phone:</strong> {item.ownerPhone || "Not provided"}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {item.sold ? (
                      <span className="text-red-600 font-semibold">Sold</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Available</span>
                    )}
                  </p>
                </div>

                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧾 Confirmation Popup */}
      <AnimatePresence>
        {confirmAction && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="p-8 rounded-3xl text-center w-11/12 md:w-1/3"
              style={{ backgroundColor: colors.bgLight, color: colors.text }}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              <h2 className="text-xl font-bold mb-3">
                {confirmAction === "delete"
                  ? "Delete this product?"
                  : "Mark this product as sold?"}
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to continue?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmHandler}
                  className="px-6 py-2 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: "white" }}
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmAction(null)}
                  className="px-6 py-2 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.brown, color: "white" }}
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💬 Buy Modal */}
      <AnimatePresence>
        {isBuyModalOpen && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBuyModalOpen(false)}
          >
            <motion.div
              className="p-8 rounded-3xl w-11/12 md:w-1/2 relative"
              style={{ backgroundColor: colors.bgLight, color: colors.text }}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-lg font-bold"
                onClick={() => setIsBuyModalOpen(false)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4">Purchase Request</h2>

              <textarea
                placeholder="Write your message..."
                className="w-full p-3 rounded-lg border mb-4 text-sm"
                style={{ borderColor: colors.brown }}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                onClick={handleBuySubmit}
                className="w-full py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: colors.primary,
                  color: "white",
                }}
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ✅ Custom Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              key="toast"
              className="fixed top-24 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-2xl text-white font-semibold shadow-2xl z-50 text-center"
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
