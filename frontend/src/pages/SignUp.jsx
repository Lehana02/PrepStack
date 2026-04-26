import axios from "axios";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { auth } from "../../firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const location=useLocation()
  const from=location.state?.from||'/'


  const [error, setError] = useState("");

  const handleSignup = async () => {
    setloading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setloading(false);
      return;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(setUserData(result.data));
      navigate(from)
      setError("");
      setloading(false);
    } catch (err) {
      setError(err?.response?.data?.message);
      setloading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        { fullName: result.user.displayName, email: result.user.email },
        { withCredentials: true },
      );
      dispatch(setUserData(data));
      navigate(from)
      setError("");
      setGoogleLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
        <p className="text-gray-600 mb-6 text-[16px]">
          Create your account to access all your college resources in one place.
        </p>
        <form>
           <button
            className="border border-gray-300 rounded-md py-2 font-semibold w-full mb-4 transition duration-200 hover:bg-gray-100 flex items-center justify-center gap-2 cursor-pointer"
            disabled={googleLoading}
            onClick={handleGoogleSignup}
            type="button"
          >
            {googleLoading ? (
              <ClipLoader className='text-white' size={20}/>
            ) : (
              <>
                <FcGoogle size={20} /> Sign Up with Google
              </>
            )}
          </button>
           <div className="flex items-center gap-2 mb-1">
          <hr className="grow border-gray-300" />
          <span className="text-gray-500">or</span>
            <hr className="grow border-gray-300" />
        </div>
          <div className="mb-3">
            <label className="block text-gray-700 mb-1" htmlFor="fullname">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="fullname"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
              />
              <button
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <div className='relative'>
            <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type={showConfirmPassword?"text":"password"} id="confirmPassword" placeholder="Confirm your password" />
            <button className='absolute right-3 top-3.5 text-gray-500 cursor-pointer' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>{!showConfirmPassword?<FaRegEye/> : <FaRegEyeSlash/>}</button>
            </div>
          </div>

          <button
            className="mb-2 font-semibold rounded-lg w-full bg-blue-500 text-white py-2 transition duration-200 hover:bg-blue-600 cursor-pointer"
            disabled={loading}
            onClick={handleSignup}
            type="button"
          >
            {loading ? <ClipLoader className='text-white' size={20}/> : "Sign Up"}
          </button>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        </form>
        <p className="mt-2 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
