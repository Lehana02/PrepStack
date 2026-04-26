import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setBooks } from '../redux/userSlice'

function useGetBooks() {
    const dispatch=useDispatch()
  useEffect(()=>{
    const fetchbooks=async ()=>{
        try{
            const result=await axios.get(`${serverUrl}/api/resources/get-books`,{withCredentials:true})
            dispatch(setBooks(result.data))
        }catch(error){
            console.log(error)
        }
    }
    fetchbooks()
  },[dispatch])
}

export default useGetBooks
