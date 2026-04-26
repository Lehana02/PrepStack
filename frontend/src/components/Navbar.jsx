import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaBookOpen, FaClipboardList, FaUpload, FaInfoCircle, FaMoon, FaSun, FaBars, FaTimes, FaSign, FaSignInAlt, FaSignOutAlt, FaList, FaBook } from "react-icons/fa";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { CgNotes } from "react-icons/cg";
import { GiProgression } from "react-icons/gi";
import { PiExam } from "react-icons/pi";

function Navbar() {
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  const materialdropdownRef = useRef();

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [dropDown, setDropDown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [materialDropDown, setMaterialDropDown] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
      if (
        materialdropdownRef.current &&
        !materialdropdownRef.current.contains(event.target)
      ) {
        setMaterialDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 bg-opacity-95 backdrop-blur-3xl text-[#FFFFFF] shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 md:px-8 lg:px-10">
        <div
          className="flex items-center gap-6 lg:gap-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-4xl font-black tracking-tight text-white">
            PrepStack
          </span>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-white/20 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <div className="flex-wrap hidden lg:flex items-center justify-end min-w-0 max-w-2xl overflow-x-auto">
          <div
            className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-md hover:bg-white/20 transition"
            onClick={() => navigate("/")}
          >
            <FaHome size={16} />
            <span className="font-semibold">Home</span>
          </div>

          <div
            className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-md hover:bg-white/20 transition"
            onClick={() => navigate("/about")}
          >
            <FaInfoCircle size={16} />
            <span className="font-semibold">About</span>
          </div>

          <div ref={materialdropdownRef}>
            <div
                  className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-md hover:bg-white/20 transition"
                  onClick={() => setMaterialDropDown(!materialDropDown)}
                >
                  <FaBookOpen size={16} />
                  <span className="font-semibold">Study Material</span>
                </div>

            {materialDropDown && (
              <div className="absolute right-40 xl:right-70 mt-4 mr-4 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                <div
                  className="pl-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => navigate("/pyqs")}
                >
                  <PiExam size={16} />
                  <span>PYQs</span>
                </div>

                <div
                  className="pl-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => navigate("/books")}
                >
                  <FaBook size={16} />
                  <span>Books</span>
                </div>

                <div
                  className="pl-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => navigate("/notes")}
                >
                  <CgNotes size={16} />
                  <span>Notes</span>
                </div>
              </div>
            )}
          </div>

          <div
            className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-md hover:bg-white/20 transition"
            onClick={() => navigate("/upload")}
          >
            <FaUpload size={16} />
            <span className="font-semibold">Upload</span>
          </div>

           <div
            className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-md hover:bg-white/20 transition"
            onClick={() => navigate("/track-progress")}
          >
            <GiProgression size={16} />
            <span className="font-semibold">Track Progress</span>
          </div>

          {!userData && (
            <div
              className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-md hover:bg-white/20 transition"
              onClick={() => navigate("/signin", { state: { from: location.pathname } })}
            >
              <FaSignInAlt size={16} />
              <span className="whitespace-nowrap font-semibold">Sign In</span>
            </div>
          )}
          {userData && (
            <div ref={dropdownRef}>
              <div
                onClick={() => setDropDown(!dropDown)}
                className="bg-linear-to-r bg-indigo-700 w-10 h-10 flex justify-center items-center rounded-full font-bold text-lg ml-2"
              >
                {userData?.fullName.charAt(0)}
              </div>

              {dropDown && (
                <div className="absolute right-0 mt-4 mr-4 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-2 font-semibold border-b">
                    {userData?.fullName}
                  </div>
                  <div
                    onClick={() => {
                      navigate("/track-progress");
                      setDropDown(false);
                    }}
                    className="pl-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <GiProgression />
                    Track Your Progress
                  </div>

                  <div
                    onClick={() => {
                      handleLogout();
                      setDropDown(false);
                    }}
                    className="pl-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaSignOutAlt />
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden w-full bg-white dark:bg-gray-900 border-t border-gray-200">
          <div className="flex flex-col px-4 py-3 space-y-2">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/");
                setMobileOpen(false);
              }}
            >
              <FaHome />
              <span>Home</span>
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/about");
                setMobileOpen(false);
              }}
            >
              <FaInfoCircle />
              <span>About</span>
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/pyqs");
                setMobileOpen(false);
              }}
            >
              <PiExam />
              <span>PYQs</span>
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/books");
                setMobileOpen(false);
              }}
            >
              <FaBook />
              <span>Books</span>
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/notes");
                setMobileOpen(false);
              }}
            >
              <CgNotes />
              <span>Notes</span>
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/upload");
                setMobileOpen(false);
              }}
            >
              <FaUpload />
              <span>Upload</span>
            </div>

            {!userData ? (
              <>
              
              <div
                  onClick={() => {
                    navigate("/track-progress");
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
                >
                  <GiProgression /> Track Progress
                </div>

                <div
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/signin", { state: { from: location.pathname } });
                  setMobileOpen(false);
                }}
              >
                <FaSignInAlt /> Sign In
              </div>
                </>
            ) : (
              <div className="text-black">
                <div className="mt-6 flex items-center font-semibold text-lg py-1 px-2">
                  {userData.fullName}
                </div>
                <div
                  onClick={() => {
                    navigate("/track-progress");
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
                >
                  <GiProgression /> Track Your Progress
                </div>
                <div
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 active:bg-gray-100 cursor-pointer"
                >
                  <FaSignOutAlt /> Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
