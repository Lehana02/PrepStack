import React, { useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TaskCard from "../components/TaskCard";
import { addTask, setTasks } from "../redux/userSlice";
import { IoMdArrowRoundBack } from "react-icons/io";

const TrackProgress = () => {
  const { tasks, userData, socket } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const hasTasks = tasks && tasks.length > 0;

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

useEffect(() => {
  if (!userData?._id) return;

  const handler = (data) => {
    dispatch(addTask(data.task));
  };

  socket.on("newTask", handler);

  return () => {
    socket.off("newTask", handler);
  };
}, [userData, dispatch]);
const handleBack=()=>{
  navigate("/")
}
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] px-6 py-10 text-white">
      
      {/* ================= HEADER ================= */}
      {hasTasks && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex justify-between items-center mb-8 max-w-6xl mx-auto"
        ><div className="flex gap-2 justify-center items-center"><IoMdArrowRoundBack className="cursor-pointer" onClick={handleBack} size={40}/>
          <h1 className="text-3xl font-bold text-indigo-300">
            Your Tasks 📋
          </h1></div>

          <button
            onClick={() => navigate("/add-task")}
            className="bg-linear-to-r from-indigo-500 to-purple-600 cursor-pointer 
            px-6 py-2 rounded-lg font-medium
            shadow-lg hover:scale-105 hover:shadow-2xl 
            active:scale-95 transition-all duration-300"
          >
            ➕ Add Task
          </button>
        </motion.div>
      )}

      {/* ================= TASK LIST ================= */}
      {hasTasks && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto flex flex-col gap-6"
        >
          {tasks.map((task, index) => (
            <TaskCard
              task={task}
              key={task._id || index}
            />
          ))}
        </motion.div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!hasTasks && (
        <div className="flex flex-col items-center justify-center text-center min-h-[75vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 
            rounded-3xl p-10 shadow-2xl max-w-lg"
          >
            <h1 className="text-4xl font-bold mb-6">
              Add Your First Task 📭
            </h1>

            <div className="relative mb-8">
              <div className="absolute inset-0 blur-3xl opacity-40 bg-indigo-500 rounded-full animate-pulse"></div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaClipboardList className="relative text-indigo-400 text-[110px] mx-auto drop-shadow-lg" />
              </motion.div>
            </div>

            <p className="text-gray-300 text-lg mb-8">
              No task yet! Start by adding your first task and begin tracking your study progress.
            </p>

            <button
              onClick={() => navigate("/add-task")}
              className="bg-linear-to-r from-indigo-500 to-purple-600 
              px-8 py-3 rounded-xl text-lg font-semibold
              shadow-lg hover:scale-105 hover:shadow-2xl 
              active:scale-95 transition-all duration-300"
            >
              ➕ Add Task
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TrackProgress;