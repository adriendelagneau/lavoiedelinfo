"use client"

import React, { useEffect, useState } from 'react'

const FetchIp = () => {

  const [ip, setIp] = useState()
  
    useEffect(() => {
        const getIpAsync = async () => {
      
        
          const res = await fetch("http://localhost:3000/api/test", {
            method: 'GET', // or 'POST', 'PUT', etc. depending on your API
            headers: {
              'Content-Type': 'application/json',
              // You can add more headers as needed
            },
          });
          const result = await res.json();
          
          console.log(result)
    
            
        }
        getIpAsync()
      }, []);
  
  
    return (
    <div>FetchIp</div>
  )
}

export default FetchIp