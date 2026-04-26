import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setPyqs } from '../redux/userSlice'

function useGetPyqs() {
    const dispatch=useDispatch()
  useEffect(()=>{
    const fetchpyq=async ()=>{
        try{
            const result=await axios.get(`${serverUrl}/api/resources/get-pyqs`,{withCredentials:true})
            dispatch(setPyqs(result.data))
        }catch(error){
            console.log(error)
        }
    }
    fetchpyq()
  },[dispatch])
}

export default useGetPyqs
