import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setNotes } from '../redux/userSlice'

function useGetNotes() {
    const dispatch=useDispatch()
  useEffect(()=>{
    const fetchnotes=async ()=>{
        try{
            const result=await axios.get(`${serverUrl}/api/resources/get-notes`,{withCredentials:true})
            dispatch(setNotes(result.data))
        }catch(error){
            console.log(error)
        }
    }
    fetchnotes()
  },[dispatch])
}

export default useGetNotes
