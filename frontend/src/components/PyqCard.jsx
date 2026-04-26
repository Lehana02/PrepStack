import axios from "axios";
import React, { useState } from "react";
import { FaBook, FaDownload, FaEye, FaFileAlt } from "react-icons/fa";
import { serverUrl } from "../App";
import { BsCalendar2DateFill } from "react-icons/bs";
import { incrementPyqsDownloadCount } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function PyqCard({ pyq }) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [err, setErr] = useState("");

  // Construct URLs
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const previewUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${pyq.path}.pdf`;
  const pdfUrl = `https://res.cloudinary.com/${cloudName}/image/upload/fl_attachment:document/${pyq.path}.pdf`;
  const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/image/upload/pg_1,c_scale,w_300/${pyq.path}.png`;

  const handleDownload = async () => {
    if (!userData) {
      setErr("Please login to download!");
      return;
    }
    const link=document.createElement("a")
    link.href=pdfUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    dispatch(incrementPyqsDownloadCount(pyq._id));
    try {
      const result = await axios.post(
        `${serverUrl}/api/resources/download`,
        { resourceId: pyq._id },
        { withCredentials: true },
      );

      setErr("")
    } catch (error) {
      console.log(error);
      setErr("Failed to download. Please try again.")
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-transform transform ${
        hovered ? "scale-105" : "scale-100"
      } w-80 mx-auto`}
    >
      {/* Thumbnail */}
      <div className="w-full h-48 mb-4 overflow-hidden rounded-xl border border-gray-200 flex items-center justify-center bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={`${pyq.subject} thumbnail`}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Subject & Topic */}
            <h3 className="text-xl md:text-2xl font-bold line-clamp-2 mb-2 flex items-center gap-2">
        <FaBook /> {pyq.subject}
      </h3>
      <p className="text-sm text-gray-500 font-semibold flex items-center gap-2 mb-1">
        <BsCalendar2DateFill  /> {pyq.year}
      </p>


      {/* Extra Info */}
      <div className="flex justify-center gap-20">
        <p className="text-gray-600 text-sm mb-1">
          Resource: <span className="font-semibold">PYQs</span>
        </p>
        <p className="text-gray-600 text-sm mb-4">
          Downloads: <span className="font-semibold">{pyq.downloads}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {/* Preview */}
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-2xl hover:bg-indigo-700 transition font-medium shadow-md hover:shadow-lg"
        >
          <FaEye /> Preview
        </a>

        {/* Direct Download */}
        <button
          onClick={handleDownload}
          className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-2xl hover:bg-green-600 transition font-medium shadow-md hover:shadow-lg"
        >
          <FaDownload /> Download
        </button>
      </div>
      {err&&<p className="text-center mt-2 text-red-500 text-sm">{err}</p>}
    </div>
  );
}

export default PyqCard;
