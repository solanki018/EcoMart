"use client";

import { motion } from "framer-motion";

const categories: string[] = ["All", "Cycles", "Books", "Electronics", "Misc"];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 font-medium text-[#2F3E2F] mt-8">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2.5 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "text-white bg-[#5A7F51] shadow-[0_4px_12px_#A28E74] border border-[#5A7F51]"
                  : "text-[#2F3E2F] bg-[#FAF9F6] border border-[#C9D7A7] hover:bg-[#C9D7A7] hover:text-[#2F3E2F]"
              }`}
          >
            {cat}

            {/* Active glow shape */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl bg-[#5A7F51]/20 -z-10"
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
