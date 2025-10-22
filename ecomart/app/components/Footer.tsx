"use client";

const Footer: React.FC = () => {
  return (
    <footer className="text-sm mt-16 text-gray-400 border-t border-gray-800 py-4 flex flex-col md:flex-row justify-between items-center px-8">
      <p>
        Designed & Built with 💖 by{" "}
        <span className="text-[#EC4899]">Sourabh Solanki</span>
      </p>
      <p>Local time: XX:XX PM IST</p>
      <p className="flex items-center gap-2">
        📧 sourabhsolanki1404@gmail.com
      </p>
    </footer>
  );
};

export default Footer;
