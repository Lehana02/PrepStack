import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { auth } from '../../firebase'
import { setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

function SignIn() {
    const navigate=useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const dispatch=useDispatch()
    const location=useLocation()
    const from=location.state?.from||'/'

    const handleSignIn=async ()=>{
        setLoading(true)
        try{
            const result=await axios.post(`${serverUrl}/api/auth/signin`,{email,password},{withCredentials:true})
            dispatch(setUserData(result.data))
            setTimeout(()=>{

              navigate(from,{replace:true})
            },0)
            setError("")
            setLoading(false)
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const handleGoogleSignIn=async()=>{
        setGoogleLoading(true)
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        try {
            const { data } = await axios.post(
                `${serverUrl}/api/auth/google-auth`,
                { fullName: result.user.displayName, email: result.user.email },
                { withCredentials: true }
            );
            dispatch(setUserData(data));
            navigate(from)
            setError("")
            setGoogleLoading(false);
        } catch (error) {
            setError(error?.message||"Google Sign In failed");
            setGoogleLoading(false);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In to PrepStack</h2>
        <button type='button' disabled={googleLoading} onClick={handleGoogleSignIn} className="w-full font-semibold flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-100 cursor-pointer transition">
            {googleLoading ? <ClipLoader className='text-white' size={20}/> : <><FcGoogle size={20} /> Sign In with Google</>}
        </button>
        <div className="flex items-center gap-2 mb-4">
          <hr className="grow border-gray-300" />
          <span className="text-gray-500">or</span>
            <hr className="grow border-gray-300" />
        </div>
        <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          type="email"
            placeholder="Email" required
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className='relative'>

        <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword?"text":"password"}
                placeholder="Password" required
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                              <button
                                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                              </button>
                </div>
        <button type='button' disabled={loading} onClick={handleSignIn} className="w-full font-semibold rounded-lg bg-blue-500 text-white py-2 duration-200 cursor-pointer hover:bg-blue-600 transition mb-2">
          {loading?<ClipLoader className='text-white' size={20}/>:"Sign In"}
        </button>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>

  )
}

export default SignIn
