import axios from "axios";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { serverUrl } from "../App";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/userSlice"; // Import your action

const AddSubtopic = () => {
    const {taskId}=useParams()
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [subName, setSubName] = useState("");
  const [durationDays, setDurationDays] = useState(0);
  const [hoursPerDay, setHoursPerDay] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subName) return setErr("Subtopic name required");
    if (durationDays < 0) return setErr("Days cannot be negative");
    if (!hoursPerDay || hoursPerDay < 1) return setErr("Hours per day must be at least 1");

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/task/add-sub-topic`,
        {
          taskId,
          name: subName,
          durationDays: Number(durationDays),
    hoursPerDay: Number(hoursPerDay)
        },
        { withCredentials: true }
      );

      dispatch(updateTask(result.data.task));

      // Clear inputs
      setSubName("");
      setDurationDays(0);
      setHoursPerDay(1);
      setErr("");
      navigate("/track-progress"); 
    } catch (error) {
      console.log(error);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] flex justify-center items-center p-6">
      <form
        className="w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Add Subtopic
        </h1>

        <div className="mb-5">
          <label className="text-gray-300 text-sm">Subtopic Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 rounded bg-white/20 text-white outline-none"
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mb-5">
          <div className="w-1/2">
            <label className="text-gray-300 text-sm">Duration (Days)</label>
            <input
              type="number"
              min="0"
              className="w-full mt-1 p-3 rounded bg-white/20 text-white outline-none"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
            />
            <p className="text-xs text-gray-400 mt-1">0 = same day completion</p>
          </div>

          <div className="w-1/2">
            <label className="text-gray-300 text-sm">Hours / Day</label>
            <input
              type="number"
              min="1"
              max="24"
              className="w-full mt-1 p-3 rounded bg-white/20 text-white outline-none"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
            />
            <p className="text-xs text-gray-400 mt-1">Min 1 hour required</p>
          </div>
        </div>

        {err && <p className="text-red-500 text-center mb-2">{err}</p>}

        <button
          type="submit"
          className="cursor-pointer w-full mt-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-2xl transition"
          disabled={loading}
        >
          {loading ? <ClipLoader color="white" size={20} /> : <span className="flex justify-center items-center gap-2"><FaPlus /> Add Subtopic</span>}
        </button>
      </form>
    </div>
  );
};

export default AddSubtopic;