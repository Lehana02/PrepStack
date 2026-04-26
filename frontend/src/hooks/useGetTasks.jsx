import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks } from '../redux/userSlice'

function useGetTasks() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
    const fetchTasks=async ()=>{
        try{
            const result=await axios.get(`${serverUrl}/api/task/get-tasks`,{withCredentials:true})
            dispatch(setTasks(result.data.tasks))
        }catch(error){
            console.log(error)
        }
    }
    fetchTasks()
  },[userData])
}

export default useGetTasks
