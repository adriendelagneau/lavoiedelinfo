"use client"

import React, { useEffect, useState } from 'react'
import { handleVisitor } from '@/actions/VisitorActions';
const HandleVisitor = ({ip}: {ip: string}) => {

 const [canBeView, setCanBeView] = useState(true)
    
  useEffect(() => {
    // Check if visitor exists
    const getAsyncVisitor = async () => {
      try {
        const response = await handleVisitor({ip})
        console.log(response)
        
        if (response.msg === "Already 3 views") {
          setCanBeView(false)
        }
      } catch (error) {
        console.error('Error while fetching visitor data:', error);
      }
    };
  
    getAsyncVisitor();
  }, [ip]);
  
  
    
    

  return (
    <>
    <div>HandleVisitor</div>
      {canBeView === false && (
        <div>limit 3 viws/day subscibe for more content</div>
    )}
    </>
  )
}

export default HandleVisitor