import axios from "axios";
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { serverUrl } from "../App";
import ClipLoader from "react-spinners/ClipLoader";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/userSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const dispatch=useDispatch()

  const [subTopics, setSubTopics] = useState([
    { name: "", durationDays: "0", hoursPerDay: "1" },
  ]);

  const navigate=useNavigate()

  const addSubTopic = () => {
    setSubTopics([
      ...subTopics,
      { name: "", durationDays: "0", hoursPerDay: "1" },
    ]);
  };

  const formattedSubTopic=subTopics.map(sub => ({
  name: sub.name,
  durationDays: Number(sub.durationDays),
  hoursPerDay: Number(sub.hoursPerDay),
}));

  const removeSubTopic = (index) => {
    if (subTopics.length === 1) return;
    setSubTopics(subTopics.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...subTopics];
    updated[index][field] = value;
    setSubTopics(updated);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (!title || !deadline) {
      return setErr("Title & Deadline required")
    }

    if (deadline < today) {
      return setErr("Past date not allowed ❌")
    }

    for (let s of subTopics) {
      if (!s.name) {
        return setErr("Subtopic name required")
      }
      if (s.durationDays < 0) {
        return setErr("Days cannot be negative")
      }
      if (!s.hoursPerDay || s.hoursPerDay < 1) {
        return setErr("Hours per day must be at least 1")
      }
    }
    setLoading(true)
    try{
      const result=await axios.post(`${serverUrl}/api/task/add-task`,{title,deadline,subTopics:formattedSubTopic},{withCredentials:true})

      dispatch(addTask(result.data.task))
      setErr("")
      navigate("/track-progress")
    }catch(error){
      console.log(error)
      setErr(error.message)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] flex justify-center items-center p-6">
      <form
        className="w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 
        rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create New Task
        </h1>

        {/* Title */}
        <div className="mb-5">
          <label className="text-gray-300 block mb-1">
            Task Title
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Deadline */}
        <div className="mb-6">
          <label className="text-gray-300 block mb-1">
            Deadline
          </label>
          <input
            type="date"
            className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        {/* Subtopics Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl text-white font-semibold">
            Subtopics
          </h2>
          <button
            type="button"
            onClick={addSubTopic}
            className="text-indigo-400 hover:scale-110 transition"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {/* Subtopics */}
        {subTopics.map((sub, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/20 p-4 rounded-xl mb-4 relative"
          >
            {/* Delete */}
            {subTopics.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubTopic(index)}
                className="absolute top-2 right-2 text-red-400 hover:scale-110"
              >
                <FaTrash />
              </button>
            )}

            {/* Name */}
            <div className="mb-3">
              <label className="text-gray-300 text-sm">
                Subtopic Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 rounded bg-white/20 text-white"
                value={sub.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
              />
            </div>



            <div className="flex gap-3">

              {/* Days */}
              <div className="w-1/2">
                <label className="text-gray-300 text-sm">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full mt-1 p-2 rounded bg-white/20 text-white"
                  value={sub.durationDays}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "durationDays",
                      e.target.value
                    )
                  }
                />
                <p className="text-xs text-gray-400 mt-1">
                  0 = same day completion
                </p>
              </div>

              {/* Hours */}
              <div className="w-1/2">
                <label className="text-gray-300 text-sm">
                  Hours / Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  className="w-full mt-1 p-2 rounded bg-white/20 text-white"
                  value={sub.hoursPerDay}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "hoursPerDay",
                      e.target.value
                    )
                  }
                />
                <p className="text-xs text-gray-400 mt-1">
                  Min 1 hour required
                </p>
              </div>

            </div>
          </div>
        ))}

        <p className="text-red-500 text-center text-md">{err}</p>
        {/* Submit */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="cursor-pointer w-full mt-4 bg-linear-to-r from-indigo-500 to-purple-600 
          text-white py-3 rounded-xl font-semibold
          hover:scale-105 hover:shadow-2xl transition"
          disabled={loading}
        >
          {loading?<ClipLoader/>:"🚀 Create Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;