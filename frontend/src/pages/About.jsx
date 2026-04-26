import React from "react";
import { FaBook, FaFilePdf, FaUpload, FaSearch, FaDownload, FaClipboardList, FaFolderOpen, FaUsers, FaChalkboardTeacher, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {
  const navigate = useNavigate();
const {userData}=useSelector(state=>state.user)
  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome to PrepStack</h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          Your ultimate college resources platform. Access PYQs, Notes, Books, and more in one organized place.
        </p>

        {/* Info Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg my-6 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Choose PrepStack?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            PrepStack is designed for students by students. Our platform brings all essential study materials together—organized, easy to find, and ready to use. 
            Save time, improve your preparation, and track your progress. 
            From first-year learners to final-year exam takers, PrepStack supports every stage of your academic journey.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mt-4">
          <button
            onClick={() => navigate(userData?"/books":"/signin")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/upload")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition cursor-pointer"
          >
            Upload Material
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Features of PrepStack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            { icon: <FaClipboardList />, title: "Previous Year Questions (PYQs)", desc: "Access a collection of past exam papers to practice.", color: "bg-blue-500" },
            { icon: <FaBook />, title: "Notes", desc: "Find well-structured notes uploaded by students and educators.", color: "bg-green-500" },
            { icon: <FaFilePdf />, title: "Books", desc: "Browse and download textbooks and reference materials in PDF format.", color: "bg-red-500" },
            { icon: <FaUpload />, title: "Upload & Share", desc: "Contribute by uploading your own PDFs for others to benefit.", color: "bg-purple-500" },
            { icon: <FaSearch />, title: "Filter & Search", desc: "Quickly find the resources you need with our advanced filtering system.", color: "bg-yellow-500" },
            { icon: <FaDownload />, title: "Preview & Download", desc: "Preview PDFs directly on the site or download them for offline access.", color: "bg-indigo-500" },
            { icon: <FaFolderOpen />, title: "Organized Categories", desc: "Resources are neatly organized by subject, year, and type, making navigation simple.", color: "bg-teal-500" },
            { icon: <FaUsers />, title: "Track Progress", desc: "Monitor your learning journey and see how you're improving over time.", color: "bg-pink-500" },
            { icon: <FaChalkboardTeacher />, title: "Monitor Deadlines", desc: "Keep track of important dates and deadlines for your assignments and exams.", color: "bg-orange-500" },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-start p-6 rounded-xl shadow-lg hover:shadow-2xl transition bg-white">
              <div className={`p-4 rounded-full mb-4 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}

        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto px-4 py-12 bg-white rounded-xl shadow-lg my-12 hover:shadow-2xl transition">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          At PrepStack, our mission is to empower students with easy access to reliable academic resources. 
          We believe in collaborative learning and aim to build a community where knowledge is shared freely and efficiently. 
          Our goal is to simplify your study process and make quality educational materials accessible to everyone.
        </p>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Explore PrepStack?</h2>
        <p className="text-gray-700 text-lg mb-8">
          Start using PrepStack today — browse resources, upload your materials, and track your progress!
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => navigate("/pyqs")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Browse PYQs
          </button>
          <button
            onClick={() => navigate("/notes")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition cursor-pointer"
          >
            Explore Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;