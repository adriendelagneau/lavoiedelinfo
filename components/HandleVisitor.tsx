"use client"

import React, { useEffect } from 'react'
import axios from "axios"
const HandleVisitor = ({ip}: {ip: string}) => {

 
    
    useEffect(() => {
        // Check if visitor exists
        const getAsyncVisitor = async () => {
          try {
            const res = await axios.post("/api/check_visitor", { ip });
            console.log(res.data); // Assuming you want to log the response data
          } catch (error) {
            console.error('Error while fetching visitor data:', error);
          }
        };
    
        getAsyncVisitor();
      }, [ip]);
    
    

  return (
    <div>HandleVisitor</div>
  )
}

export default HandleVisitor