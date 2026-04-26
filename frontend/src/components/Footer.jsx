import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaLayerGroup, FaUpload, FaUsers } from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white/10 backdrop-blur-xl text-white py-12 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2
            className="text-3xl font-bold cursor-pointer mb-4 text-indigo-300 hover:text-indigo-400 transition"
            onClick={() => navigate("/")}
          >
            PrepStack
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            One platform for all your study resources — PYQs, books, notes, and uploads, organized and easy to navigate.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-xl mb-2 text-indigo-300">Resources</h3>
          <ul className="space-y-2 text-white/80">
            <li className="hover:text-indigo-400 cursor-pointer" onClick={() => navigate("/pyqs")}>Previous Year Questions</li>
            <li className="hover:text-indigo-400 cursor-pointer" onClick={() => navigate("/books")}>Reference Books</li>
            <li className="hover:text-indigo-400 cursor-pointer" onClick={() => navigate("/notes")}>Notes</li>
            <li className="hover:text-indigo-400 cursor-pointer" onClick={() => navigate("/upload")}>Upload PDF</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="font-semibold text-xl mb-2 text-indigo-300">Community</h3>
          <ul className="space-y-2 text-white/80">
            <li className="hover:text-indigo-400 cursor-pointer" onClick={() => navigate("/about")}>About PrepStack</li>
            <li className="hover:text-indigo-400 cursor-pointer" onClick={() => navigate("/signin")}>Join Community</li>
            <li className="hover:text-indigo-400 cursor-pointer">Help & Support</li>
            <li className="hover:text-indigo-400 cursor-pointer">Feedback</li>
          </ul>
        </div>

        {/* Highlights */}
        <div className="flex flex-col gap-6">
          <h3 className="font-semibold text-xl mb-2 text-indigo-300">Highlights</h3>
          <div className="flex items-center gap-3 text-white/80 hover:text-indigo-400 transition">
            <FaBookOpen size={24} /> Curated PYQs
          </div>
          <div className="flex items-center gap-3 text-white/80 hover:text-indigo-400 transition">
            <FaLayerGroup size={24} /> Organized Books
          </div>
          <div className="flex items-center gap-3 text-white/80 hover:text-indigo-400 transition">
            <FaUpload size={24} /> Upload PDFs
          </div>
          <div className="flex items-center gap-3 text-white/80 hover:text-indigo-400 transition">
            <FaUsers size={24} /> Community Driven
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-white/70 mt-10 text-sm sm:text-base">
        © {new Date().getFullYear()} PrepStack. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;