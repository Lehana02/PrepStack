import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/userSlice";

// Status colors
const statusColors = {
  pending: "bg-red-500",
  half: "bg-yellow-400",
  done: "bg-green-500",
};

// Progress bar color
const getProgressColor = (percent) => {
  if (percent <= 33) return "bg-red-500";
  if (percent <= 66) return "bg-yellow-400";
  return "bg-green-500";
};

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editingSub, setEditingSub] = useState(null);
  const [subName, setSubName] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${serverUrl}/api/task/delete-task/${task._id}`, { withCredentials: true });
      dispatch(deleteTask(task._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (taskId, subId, status) => {
    try {
      const result = await axios.patch(`${serverUrl}/api/task/change-status`,
        { taskId, subTopicId: subId, status },
        { withCredentials: true }
      );
      dispatch(updateTask(result.data.task));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSub = async (subId) => {
    try {
      const result = await axios.delete(`${serverUrl}/api/task/delete-sub-topic/${task._id}/subTopics/${subId}`, { withCredentials: true });
      dispatch(updateTask(result.data.task));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSub = (sub) => {
    navigate(`/edit-subtopic/${task._id}/${sub._id}`);
  };


  const isTaskComplete = task.stats?.progressPercent === 100;
const today = new Date();
const deadlineDate = new Date(task.deadline);

// normalize time 
today.setHours(0,0,0,0);
deadlineDate.setHours(0,0,0,0);

const diffTime = deadlineDate - today;
const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

const isDeadlinePassed = daysLeft < 0;
const isUrgent = daysLeft >= 0 && daysLeft <= 2;
  return (
    <motion.div
      whileHover={{ scale: isTaskComplete ? 1 : 1.02 }}
      className={`rounded-3xl border shadow-2xl transition-all duration-500 ${
        isTaskComplete
          ? "bg-green-500/10 border-green-400 p-4 md:p-6"
          : "bg-white/10 border-white/20 p-6"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h2 className={`text-xl md:text-2xl font-bold mb-1 ${isTaskComplete ? "text-green-300" : "text-indigo-300"}`}>
            {task.title} {isTaskComplete && "✅ Completed"}
          </h2>

        </div>
        {!isTaskComplete && (
          <div className="flex gap-3">
            <button onClick={() => navigate(`/edit-task/${task._id}`)} className="text-blue-400 hover:text-blue-600 transition cursor-pointer"><FaEdit /></button>
            <button onClick={handleDeleteTask} className="text-red-400 hover:text-red-600 transition cursor-pointer"><FaTrash /></button>
          </div>
        )}
      </div>
                      {!isTaskComplete && isDeadlinePassed && (
  <p className="text-red-400  text-center text-2xl mb-3 font-semibold">
    ⚠ Deadline has passed!
  </p>
)}

{!isTaskComplete && !isDeadlinePassed && isUrgent && (
  <p className="text-red-400 text-center mb-3 text-2xl font-semibold">
    ⚠ Complete this task soon ({daysLeft} day{daysLeft !== 1 && "s"} left)
  </p>
)}
          {!isTaskComplete && <p className="text-gray-300 text-sm mb-2">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>}



      {/* PROGRESS BAR */}
      {!isTaskComplete && (
        <div className="mb-4">
          <div className="w-full h-5 bg-white/20 rounded-full overflow-hidden">
            <div className={`h-5 transition-all duration-500 ${getProgressColor(task.stats?.progressPercent || 0)}`} style={{ width: `${task.stats?.progressPercent || 0}%` }}></div>
          </div>
          <div className="flex justify-between text-gray-300 text-sm mt-1">
            <span>{task.stats?.progressPercent || 0}% Complete</span>
            <span>Needed: {task.stats?.dailyHoursNeeded || 0}h/day</span>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-300 text-sm mb-4">
        <div>Total: {task.stats?.totalHours || 0}h</div>
        <div>Done: {task.stats?.completedHours || 0}h</div>
        <div>Left: {task.stats?.remainingHours || 0}h</div>
        <div>Days Left: {isDeadlinePassed ? 0 : daysLeft}</div>
      </div>

      {/* SUBTOPICS */}
      <div className="space-y-2">
        {task.subTopics?.map(sub => (
          <div key={sub._id} className="bg-white/10 rounded-xl p-2 flex justify-between items-center hover:bg-white/20 transition">
            <div className="flex-1">
              <p className="text-indigo-300 font-semibold">{sub.name}</p>
              <p className="text-gray-300 text-sm">{sub.durationDays} days | {sub.hoursPerDay}h/day</p>
            </div>
            <div className="flex gap-2">
              <select
                value={sub.status || "pending"}
                onChange={e => handleStatusChange(task._id, sub._id, e.target.value)}
                className="px-2 py-1 rounded text-white cursor-pointer"
                style={{
                  backgroundColor:
                    sub.status === "pending" ? "#f87171" :
                    sub.status === "half" ? "#facc15" :
                    "#22c55e"
                }}
              >
                <option value="pending" style={{ backgroundColor: "#f87171", color: "white" }}>Pending</option>
                <option value="half" style={{ backgroundColor: "#facc15", color: "black" }}>Half</option>
                <option value="done" style={{ backgroundColor: "#22c55e", color: "white" }}>Done</option>
              </select>

              {!isTaskComplete && (
<>
                      <button onClick={() => handleEditSub(sub)} className="text-blue-400 cursor-pointer hover:text-blue-600 transition"><FaEdit /></button>
                      <button onClick={() => handleDeleteSub(sub._id)} className="text-red-400 cursor-pointer hover:text-red-600 transition"><FaTrash /></button>
</>
              )}
            </div>
          </div>
        ))}
      </div>

        <button onClick={() => navigate(`/add-topic/${task._id}`)} className="flex cursor-pointer items-center gap-2 mt-3 text-blue-400 font-semibold hover:text-blue-600 transition">
          <FaPlus /> Add Subtopic
        </button>

    </motion.div>
  );
};

export default TaskCard;