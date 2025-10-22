"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Product } from "../types/product";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#1a1a1a] rounded-2xl p-4 shadow-md border border-gray-800 flex flex-col items-center"
    >
      <img
        src={item.image}
        alt={item.name}
        className="rounded-lg object-cover"
      />
      <div className="w-full mt-2 flex justify-between items-center text-sm">
        <span>{item.name}</span>
        <a
          href="#"
          className="text-gray-400 hover:text-[#EC4899] flex items-center gap-1"
        >
          view details <ExternalLink size={14} />
        </a>
      </div>
      <div className="w-full mt-3 flex justify-between items-center">
        <span className="text-gray-300">${item.price}</span>
        <button className="bg-[#2563EB] text-white px-3 py-1 rounded-md hover:bg-[#1D4ED8] transition">
          Buy
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
