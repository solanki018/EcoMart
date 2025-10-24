"use client";

import { motion } from "framer-motion";

const categories: string[] = ["All", "Cycles", "Books", "Electronics", "Misc"];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 sm:space-x-6 font-medium text-gray-300 mt-8">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
            activeCategory === cat
              ? "text-[#EC4899] bg-[#1a1a1a] border border-[#EC4899]"
              : "hover:text-[#EC4899]"
          }`}
        >
          {cat}
          {activeCategory === cat && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-xl bg-[#EC4899]/10"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryTabs;
