"use client"

import React, { useEffect } from 'react'
import axios from "axios"
const HandleVisitor = ({ip}: {ip: string}) => {

 
    
  useEffect(() => {
    // Check if visitor exists
    const getAsyncVisitor = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/check_visitor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ip }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.text();
  
        // Check if the response contains data
        if (data) {
          try {
            const jsonData = JSON.parse(data);
            console.log(jsonData); // Assuming you want to log the response data
          } catch (jsonError) {
            console.error('Error parsing JSON data:', jsonError);
          }
        } else {
          console.warn('Empty response from the server');
        }
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