"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
const HandleVisitor = ({ip}: {ip: string}) => {

 
    
    const [message, setMessage] = useState(true);

    useEffect(() => {
      const getAsyncVisitor = async () => {
        try {
          const res = await axios.post("/api/check_visitor", { ip });
          console.log(res.data);
  
          // Check the response and update the message state accordingly
          if (res.data === "Already 3 views") {
            setMessage(false);
          } 
        } catch (error) {
          console.error('Error while fetching visitor data:', error);
        }
      };
  
      getAsyncVisitor();
    }, [ip]);
    
    

  return (
      <div>
          {message === false && (
              <div>Subscribe for mor content</div>
          )}
    </div>
  )
}

export default HandleVisitor