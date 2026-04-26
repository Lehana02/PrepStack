import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import useGetCurrentUser from "./hooks/useGetCurrentUser"
import About from "./pages/About"
import Books from "./pages/Books"
import Notes from "./pages/Notes"
import Pyqs from "./pages/Pyqs"
import Upload from "./pages/Upload"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetPyqs from "./hooks/useGetPyqs"
import useGetNotes from "./hooks/useGetNotes"
import useGetBooks from "./hooks/useGetBooks"
import TrackProgress from "./pages/trackProgress"
import { useDispatch, useSelector } from "react-redux"
import useGetTasks from "./hooks/useGetTasks"
import AddTask from "./pages/AddTask"
import EditTask from "./pages/EditTask"
import AddSubtopic from "./pages/AddSubtopic"
import { useEffect } from "react"
import { io } from 'socket.io-client'
import { setSocket } from "./redux/userSlice"
import EditSubtopic from "./pages/EditSubtopic"

export const serverUrl="http://localhost:8000"
function App() {
  useGetCurrentUser()
  useGetPyqs()
  useGetNotes()
  useGetBooks()
  useGetTasks()


  const {userData}=useSelector(state=>state.user)

  const dispatch=useDispatch()

  useEffect(()=>{
    const socketInstance=io(serverUrl,{withCredentials:true})
    dispatch(setSocket(socketInstance))
    socketInstance.on('connect',()=>{
      if(userData){
        socketInstance.emit('identity',{userId:userData._id})
      }
    })
    return ()=>{
      socketInstance.disconnect()
    }
  },[userData?._id])

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/books" element={<Books />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/pyqs" element={<Pyqs />} />
      <Route path="/upload" element={userData?<Upload />:<SignIn/>} />
      <Route path="/track-progress" element={userData?<TrackProgress />:<SignIn/>} />
      <Route path="/add-task" element={userData?<AddTask />:<SignIn/>} />
      <Route path="/edit-task/:taskId" element={userData?<EditTask />:<SignIn/>} />
      <Route path="/add-topic/:taskId" element={userData?<AddSubtopic />:<SignIn/>} />
      <Route path="/edit-subtopic/:taskId/:subId" element={userData?<EditSubtopic />:<SignIn/>} />
    </Routes>
    <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>
    </>

  )
}

export default App
