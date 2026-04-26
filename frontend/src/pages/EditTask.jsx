import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { serverUrl } from "../App";
import ClipLoader from "react-spinners/ClipLoader";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/userSlice";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const {tasks}=useSelector(state=>state.user)

  const {taskId}=useParams()
  useEffect(() => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      setTitle(task.title);
      setDeadline(task.deadline.split("T")[0]);
    }
  }, [tasks, taskId]);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleSubmit = async (e) => {

    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (!title || !deadline) {
      return setErr("Title & Deadline required")
    }

    if (deadline < today) {
      return setErr("Past date not allowed ❌")
    }

    setLoading(true)
    try{
      const result=await axios.patch(`${serverUrl}/api/task/edit-task/${taskId}`,{title,deadline},{withCredentials:true})
      dispatch(updateTask(result.data.task))

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
          Edit Task
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
          {loading?<ClipLoader/>:"🚀 Edit Task"}
        </button>
      </form>
    </div>
  );
};

export default EditTask;