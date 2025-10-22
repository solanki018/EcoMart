"use client";

const categories: string[] = ["All", "Cycles", "Books", "Electronics", "Misc"];

const CategoryTabs: React.FC = () => {
  return (
    <div className="flex justify-center space-x-6 font-medium text-gray-300 mt-8">
      {categories.map((cat) => (
        <button
          key={cat}
          className="hover:text-[#EC4899] transition duration-300"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
