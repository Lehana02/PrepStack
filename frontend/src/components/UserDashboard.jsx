import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FaBook, FaFilePdf, FaUpload, FaTasks, FaUserGraduate, FaCalendarAlt, FaRegLightbulb } from "react-icons/fa";
import { TbBulb } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import Footer from "./Footer";
import { GiProgression } from "react-icons/gi";

function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-white pt-16">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-20 blur-3xl"></div>

        <div className="relative max-w-4xl flex flex-col gap-6 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Study Smarter <br /> Track Better 
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Your all-in-one platform to manage study resources, track progress,
            and stay consistent with your goals.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button
              onClick={() => navigate("/track-progress")}
              className="bg-linear-to-r from-indigo-500 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              🚀 Start Tracking
            </button>

            <button
              onClick={() => navigate("/pyqs")}
              className="border border-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              📚 Explore Resources
            </button>
          </div>
        </div>
      </section>

      {/* ================= TRACK SECTION ================= */}
      <section className="py-16 px-4 sm:px-6 md:px-12 mx-2 sm:mx-6 my-12 rounded-3xl bg-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <p className="uppercase tracking-widest text-indigo-400 text-sm">
              Productivity
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-300 flex items-center gap-4">
              Track Your Study Progress <GiProgression className="text-6xl md:text-7xl text-white/80" />
            </h2>

            <p className="text-gray-300 text-base sm:text-lg">
              Break your syllabus into small tasks, set deadlines, and track your
              daily performance easily.
            </p>

            <ul className="text-gray-400 space-y-2 text-sm sm:text-base">
              <li>✔ Create tasks with deadlines</li>
              <li>✔ Track subtopics completion</li>
              <li>✔ Monitor real-time progress</li>
            </ul>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => navigate("/track-progress")}
                className="bg-indigo-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition"
              >
                Start Tracking
              </button>

              <button
                onClick={() => navigate("/add-task")}
                className="border border-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-white hover:text-black transition"
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <FaTasks className="text-[100px] sm:text-[120px] md:text-[140px] text-indigo-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-300">
              Powerful Features ⚡
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Everything you need for efficient studying
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 p-6 sm:p-8 rounded-2xl text-center hover:scale-105 transition">
              <IoSearchSharp size={40} className="mx-auto mb-3 sm:mb-4 text-indigo-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Smart Search</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Quickly find notes, books, and PYQs with filters.
              </p>
            </div>

            <div className="bg-white/10 p-6 sm:p-8 rounded-2xl text-center hover:scale-105 transition">
              <FaFilePdf size={40} className="mx-auto mb-3 sm:mb-4 text-pink-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">PDF Access</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Download organized study materials instantly.
              </p>
            </div>

            <div className="bg-white/10 p-6 sm:p-8 rounded-2xl text-center hover:scale-105 transition">
              <TbBulb size={40} className="mx-auto mb-3 sm:mb-4 text-yellow-300" />
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Study Tips</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Improve efficiency with smart strategies.
              </p>
            </div>

            <div className="bg-white/10 p-6 sm:p-8 rounded-2xl text-center hover:scale-105 transition">
              <CgNotes size={40} className="mx-auto mb-3 sm:mb-4 text-green-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Notes Manager</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Keep all your study notes in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 px-4 sm:px-6 bg-linear-to-r from-indigo-800 to-purple-900 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-300 text-sm sm:text-base mb-8 sm:mb-12">
          Start improving your productivity in 3 simple steps
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl">
            <FaCalendarAlt className="mx-auto mb-3 sm:mb-4 text-purple-400" size={40} />
            <h3 className="text-lg sm:text-xl font-bold">1. Plan</h3>
            <p className="text-gray-300 text-sm sm:text-base">Create tasks and schedule.</p>
          </div>

          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl">
            <FaUserGraduate className="mx-auto mb-3 sm:mb-4 text-indigo-400" size={40} />
            <h3 className="text-lg sm:text-xl font-bold">2. Learn</h3>
            <p className="text-gray-300 text-sm sm:text-base">Access organized resources.</p>
          </div>

          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl">
            <FaRegLightbulb className="mx-auto mb-3 sm:mb-4 text-yellow-300" size={40} />
            <h3 className="text-lg sm:text-xl font-bold">3. Track</h3>
            <p className="text-gray-300 text-sm sm:text-base">Monitor progress daily.</p>
          </div>
        </div>
      </section>

{/* ================= TESTIMONIALS ================= */}
<section className="py-16 px-4 sm:px-6">
  <div className="text-center mb-10">
    <h2 className="text-3xl sm:text-4xl font-bold text-indigo-300">
      What Students Say 💬
    </h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {[
      {
        name: "Aakash",
        feedback: "This platform improved my study consistency! The task tracker helps me stay on top of my daily goals."
      },
      {
        name: "Meera",
        feedback: "I love how easy it is to find resources and PYQs. It saved me so much time and kept my notes organized."
      },
      {
        name: "Rohan",
        feedback: "The progress tracking feature is amazing. I can clearly see which topics I need to focus on."
      },
      {
        name: "Priya",
        feedback: "Study tips and organized notes have boosted my efficiency. I feel more confident before exams now."
      }
    ].map((student, i) => (
      <div
        key={i}
        className="bg-white/10 p-4 sm:p-6 rounded-xl text-center hover:scale-105 transition"
      >
        <p className="text-gray-300 mb-2 sm:mb-4 text-sm sm:text-base">
          "{student.feedback}"
        </p>
        <p className="font-bold">{student.name}</p>
        <p className="text-gray-400 text-xs sm:text-sm">Student</p>
      </div>
    ))}
  </div>
</section>

      {/* ================= QUICK ACTIONS ================= */}
      <section className="py-12 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-300">
            Quick Actions ⚡
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Access important sections instantly
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <div
            onClick={() => navigate("/pyqs")}
            className="bg-white/10 p-4 sm:p-6 rounded-xl text-center cursor-pointer hover:scale-105 transition"
          >
            <IoSearchSharp size={30} className="mx-auto mb-1 sm:mb-2 text-blue-400" />
            Browse PYQs
          </div>

          <div
            onClick={() => navigate("/books")}
            className="bg-white/10 p-4 sm:p-6 rounded-xl text-center cursor-pointer hover:scale-105 transition"
          >
            <FaBook size={30} className="mx-auto mb-1 sm:mb-2 text-red-400" />
            Books
          </div>

          <div
            onClick={() => navigate("/upload")}
            className="bg-white/10 p-4 sm:p-6 rounded-xl text-center cursor-pointer hover:scale-105 transition"
          >
            <FaUpload size={30} className="mx-auto mb-1 sm:mb-2 text-green-400" />
            Upload
          </div>

          <div
            onClick={() => navigate("/track-progress")}
            className="bg-white/10 p-4 sm:p-6 rounded-xl text-center cursor-pointer hover:scale-105 transition"
          >
            <FaTasks size={30} className="mx-auto mb-1 sm:mb-2 text-indigo-400" />
            Track Tasks
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default UserDashboard;
